<template>
  <div class="cm-wrap mb-4 flex flex-col items-center justify-center justify-between" :class="{fullscreen: isFullScreen}">
    <div class="ͼo w-full flex-1">
      <div class="h-full flex flex-col">
        <div class="cm-header w-full flex items-center justify-between bg-slate-900 p-2">
          <h5 class="title m-0 font-bold text-slate-400">
            {{ title }}
          </h5>
          <div class="flex space-x-2">
            <n-button type="primary" :loading="isRunning" @click="() => run(true, true)">
              {{ $t('compiler.run') }}
            </n-button>
            <n-button type="info" :loading="isFormatting" @click="() => run(false, true)">
              {{ $t('compiler.format') }}
            </n-button>
            <n-button type="info" @click="isFullScreen = !isFullScreen">
              <template #icon>
                <Icon v-if="!isFullScreen" name="heroicons:arrows-pointing-out" />
                <Icon v-else name="heroicons:arrows-pointing-in" />
              </template>
            </n-button>
          </div>
        </div>
        <div ref="widget" class="w-full grow border-b border-t border-slate-500 pt-2" />
      </div>
    </div>
    <div class="cm-footer ctp-frappe w-full flex-1 shadow-xl" :class="{'mt-4': !isFullScreen}">
      <div class="h-full flex flex-col">
        <div class="fakeMenu w-full flex justify-end bg-$ctp-crust p-1.5 space-x-1.5" :class="{'rounded-t': !isFullScreen}">
          <div class="fakeButtons bg-slate-600" />
          <div class="fakeButtons bg-slate-600" />
          <div class="fakeButtons bg-slate-600" />
        </div>
        <div class="terminalScreen w-full grow bg-$ctp-base px-4 pb-4" :class="{'rounded-b': !isFullScreen}">
          <div class="header-bar flex flex-col justify-between pt-2 md:flex-row">
            <div class="flex">
              <span class="truncate whitespace-nowrap bg-$ctp-sapphire px-4 pt-1 lowercase">{{ name }}@mach10 ~</span>
              <span class="arrow-right h-full !border-l-$ctp-sapphire" />
            </div>
            <div class="flex">
              <span class="arrow-left h-full !border-r-slate-400" />
              <span class="bg-slate-400 px-4 pt-1">{{ time }}</span>
            </div>
          </div>
          <div class="cm-result log-wrapper py-3 text-lg text-$ctp-flamingo space-y-2">
            <div class="goRun">
              <span ref="goRun" />
            </div>
            <div class="goBinary">
              <span ref="goBinary" />
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="pl-5 text-$ctp-green" v-html="binaryResult" />
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
  initialState?: string
}
const props = defineProps<Props>()

const profile = useProfileStore()
const supabase = useSupabaseClient<Database>()
const { $dayjs } = useNuxtApp()

const initialStateComputed = computed(() => props.initialState)

const name = computed(() => profile.full_name || 'user')
const time = ref('10:30:00')

const widget = ref<HTMLDivElement | null>(null)
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
    strings: ['<span class=\'text-$ctp-teal\'>$</span> go build programe.go'],
    typeSpeed: 50,
    onComplete: (self: Typed) => {
      self.cursor.remove()
      resolve(true)
    },
  })
})

const writeGoBinary = () => new Promise((resolve) => {
  typedGoBinary.value = new Typed(goBinary.value, {
    strings: ['<span class=\'text-$ctp-teal\'>$</span> ./programe.go'],
    typeSpeed: 50,
    onComplete: (self: Typed) => {
      self.cursor.remove()
      resolve(true)
    },
  })
})

onMounted(async () => {
  time.value = $dayjs().format('HH:MM:ss')

  await until(initialStateComputed).not.toBeUndefined()

  const myTheme = EditorView.baseTheme({
    '&.cm-editor': {
      fontSize: '16px',
    },
  })

  const tabSize = new Compartment()

  const state = EditorState.create({
    doc: props.initialState,
    extensions: [basicSetup, StreamLanguage.define(go), tabSize.of(EditorState.tabSize.of(2)), oneDark, myTheme],
  })

  await until(widget).not.toBeNull()

  if (widget.value) {
    editorView.value = new EditorView({
      state,
      parent: widget.value,
    })
  }
})
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');

.ctp-frappe {
  --ctp-rosewater: rgb(242, 213, 207);
  --ctp-flamingo: rgb(238, 190, 190);
  --ctp-pink: rgb(244, 184, 228);
  --ctp-mauve: rgb(202, 158, 230);
  --ctp-red: rgb(231, 130, 132);
  --ctp-maroon: rgb(234, 153, 156);
  --ctp-peach: rgb(239, 159, 118);
  --ctp-yellow: rgb(229, 200, 144);
  --ctp-green: rgb(166, 209, 137);
  --ctp-teal: rgb(129, 200, 190);
  --ctp-sky: rgb(153, 209, 219);
  --ctp-sapphire: rgb(133, 193, 220);
  --ctp-blue: rgb(140, 170, 238);
  --ctp-lavender: rgb(186, 187, 241);
  --ctp-text: rgb(198, 208, 245);
  --ctp-subtext1: rgb(181, 191, 226);
  --ctp-subtext0: rgb(165, 173, 206);
  --ctp-overlay2: rgb(148, 156, 187);
  --ctp-overlay1: rgb(131, 139, 167);
  --ctp-overlay0: rgb(115, 121, 148);
  --ctp-surface2: rgb(98, 104, 128);
  --ctp-surface1: rgb(81, 87, 109);
  --ctp-surface0: rgb(65, 69, 89);
  --ctp-base: rgb(48, 52, 70);
  --ctp-mantle: rgb(41, 44, 60);
  --ctp-crust: rgb(35, 38, 52);
}
.cm-output:before {
  content: '›';
  opacity: 0.8;
  margin-left: -1.35rem;
  width: 0.5rem;
  position: absolute;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5rem;
}
.fullscreen {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
}

.terminalScreen {
  font-family: 'IBM Plex Mono', monospace;
  box-sizing: border-box;
  margin: 0 auto;
  min-height: 200px;
}

.fakeMenu {
  height: 25px;
  margin: 0 auto;
}
.fakeButtons {
  height: 13px;
  width: 13px;
  border-radius: 50%;
  display: inline-block;
}

.typed-cursor {
  display: inline-block;
  width: 8px;
  background: var(--ctp-flamingo) !important;
  border: none;
  margin-left: 5px;
}
.arrow-right {
  width: 0;
  height: 0;
  border-width: 18px 0 18px 15px;
  border-color: transparent;
  border-style: solid;
}

.arrow-left {
  width: 0;
  height: 0;
  border-width: 18px 15px 18px 0;
  border-color: transparent;
  border-style: solid;
}
</style>
