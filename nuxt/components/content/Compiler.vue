<template>
  <div>
    <div ref="initialState">
      <slot />
    </div>
    <div class="ͼo w-full flex-1">
      <div class="h-full flex flex-col">
        <div class="cm-header w-full flex items-center justify-between bg-slate-900 p-2">
          <h5 class="title m-0 font-bold text-slate-400">
            {{ title }}
          </h5>
          <div class="menu space-x-2">
            <n-button type="primary" :loading="isRunning" @click="() => run(true, true)">
              {{ $t('compiler.run') }}
            </n-button>
            <n-button :loading="isFormatting" @click="() => run(false, true)">
              {{ $t('compiler.format') }}
            </n-button>
            <n-button @click="isFullScreen = !isFullScreen">
              <template #icon>
                <Icon v-if="isFullScreen" name="heroicons:arrows-pointing-out" />
                <Icon v-else name="heroicons:arrows-pointing-in" />
              </template>
            </n-button>
          </div>
        </div>
        <div ref="widget" class="w-full grow border-b border-t border-slate-500 pt-2" />
      </div>
    </div>
    <div class="cm-footer ctp-frappe mt-4 w-full flex-1 shadow-xl">
      <div class="h-full flex flex-col">
        <div class="fakeMenu bg-ctp-crust w-full flex justify-end p-1.5 space-x-1.5">
          <div class="fakeButtons bg-slate-600" />
          <div class="fakeButtons bg-slate-600" />
          <div class="fakeButtons bg-slate-600" />
        </div>
        <div class="terminalScreen bg-ctp-base w-full grow px-4 pb-4">
          <div class="header-bar flex flex-col justify-between pt-2 md:flex-row">
            <div class="flex">
              <span class="bg-ctp-sapphire user truncate whitespace-nowrap px-4 lowercase">{{ name }}@mach10 ~</span>
              <span class="arrow-right border-l-ctp-sapphire h-full" />
            </div>
            <div class="flex">
              <span class="arrow-left h-full border-r-slate-400" />
              <span class="time bg-slate-400 px-4">{{ time }}</span>
            </div>

            <!-- <div class='bg-ctp-green'>02</div> -->
          </div>
          <div class="text-ctp-flamingo cm-result log-wrapper py-3 text-lg space-y-2">
            <div class="goRun">
              <span ref="goRun" />
            </div>
            <div class="goBinary">
              <span ref="goBinary" />
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="text-ctp-green pl-5" v-html="binaryResult" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { Compartment, EditorState } from '@codemirror/state'
import { StreamLanguage } from '@codemirror/language'
import { go } from '@codemirror/legacy-modes/mode/go'
import { oneDark } from '@codemirror/theme-one-dark'
import htmlToFormattedText from 'html-to-formatted-text'
import Typed from 'typed.js'
import { useProfileStore } from '~/stores/profile'
import { Database } from '~/types/database.types'

interface GoCompilerRunEvent {
  Message: string;
  Kind: string;
  Delay: number;
}
interface GoCompilerRun {
  Errors: string;
  Events: GoCompilerRunEvent[];
  Error: string;
}
interface GoCompilerFMT {
  Body: string;
  Error: string;
}
interface GoCompiler {
  events: GoCompilerRun;
  formated: GoCompilerFMT;
}

interface Props {
  title?: string
}
defineProps<Props>()

const profile = useProfileStore()
const supabase = useSupabaseClient<Database>()
const { $dayjs } = useNuxtApp()

const name = computed(() => profile.full_name || 'user')
const time = ref('10:30:00')

const widget = ref<HTMLDivElement | null>(null)
const initialState = ref<HTMLDivElement | null>(null)
const goRun = ref<HTMLSpanElement | null>(null)
const typedGoRun = ref<Typed | null>(null)
const goBinary = ref<HTMLSpanElement | null>(null)
const typedGoBinary = ref<Typed | null>(null)
const binaryResult = ref('')
const isRunning = ref(false)
const isFormatting = ref(false)
const isFullScreen = ref(false)

const editorView = ref<EditorView | null>(null)

const run = async (compile: boolean, format: boolean) => {
  isRunning.value = compile
  isFormatting.value = !compile && format

  if (editorView.value) {
    const code = editorView.value.state.doc.toString()
    const body = { code, compile, fmt: format }

    binaryResult.value = ''

    const promises: Promise<any>[] = [supabase.functions.invoke<GoCompiler>('go-compile', { body })]

    if (compile) {
      promises.push(writeGoRun())
    }

    const promisesRes = await Promise.all(promises)
    const { data, error } = promisesRes[0]

    if (data) {
      if (data.formated.Body) {
        editorView.value.dispatch({ changes: { from: 0, to: editorView.value.state.doc.length, insert: data.formated.Body } })
      }

      if (compile) {
        await writeGoBinary()

        const resultEvents = data?.events?.Events?.map(e => '<p class="m-0">' + e.Message.split('\n').join('<br>') + '</p>')
        const resultErrors = data?.events?.Errors ? '<p class="m-0 text-rose-500">' + data.events.Errors.split('\n').join('<br>') + '</p>' : ''

        binaryResult.value = data?.events?.Events ? resultEvents.join('') : resultErrors
        console.log(resultEvents, binaryResult.value)
      }
    }
  }

  isRunning.value = false
  isFormatting.value = false
}

const writeGoRun = () => new Promise((resolve) => {
  if (typedGoRun.value) {
    typedGoRun.value.destroy()
  }
  if (typedGoBinary.value) {
    typedGoBinary.value.destroy()
  }
  typedGoRun.value = new Typed(goRun.value, {
    strings: ['<span class=\'text-ctp-teal\'>$</span> go build programe.go'],
    typeSpeed: 50,
    onComplete: (self: Typed) => {
      self.cursor.remove()
      resolve(true)
    },
  })
})

const writeGoBinary = () => new Promise((resolve) => {
  typedGoBinary.value = new Typed(goBinary.value, {
    strings: ['<span class=\'text-ctp-teal\'>$</span> ./programe.go'],
    typeSpeed: 50,
    onComplete: (self: Typed) => {
      self.cursor.remove()
      resolve(true)
    },
  })
})

onMounted(() => {
  time.value = $dayjs().format('HH:MM:ss')

  const myTheme = EditorView.baseTheme({
    // '&.cm-editor': {
    //   fontSize: '16px'
    // },
    // '.cm-scroller': {
    //   fontFamily: 'Jet Brains Mono, monospace'
    // }
  })

  const tabSize = new Compartment()

  const state = EditorState.create({
    doc: htmlToFormattedText(initialState.value?.innerHTML),
    extensions: [basicSetup, StreamLanguage.define(go), tabSize.of(EditorState.tabSize.of(2)), oneDark, myTheme],
  })

  if (widget.value) {
    editorView.value = new EditorView({
      state,
      parent: widget.value,
    })
  }

  initialState.value?.remove()
})
</script>
