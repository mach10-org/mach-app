<template>
  <NCard class="mb-4" :class="{fullscreen: isFullScreen, 'mt-9': !isFullScreen}" :style="isFullScreen ? '--n-border-radius: 0; border: 0': ''">
    <template #header>
      <div class="w-full flex items-center justify-between p-2">
        <h5 class="m-0 font-bold text-$text-title">
          {{ title }}
        </h5>
        <div class="flex space-x-2">
          <n-button type="primary" secondary :loading="isRunning" @click="() => run(true, true)">
            {{ $t('compiler.run') }}
          </n-button>
          <n-button type="info" secondary :loading="isFormatting" @click="() => run(false, true)">
            {{ $t('compiler.format') }}
          </n-button>
          <!-- <n-button type="info" secondary @click="isFullScreen = !isFullScreen">
            <template #icon>
              <Icon v-if="!isFullScreen" name="heroicons:arrows-pointing-out" />
              <Icon v-else name="heroicons:arrows-pointing-in" />
            </template>
          </n-button> -->
        </div>
      </div>
    </template>
    <div ref="widget" class="w-full grow shadow-xl" />
    <n-collapse-transition :show="showTerminal" :appear="true">
      <div ref="terminal" class="mt-4 min-h-[280px] shadow-xl" />
    </n-collapse-transition>
  </NCard>
</template>

<script setup lang="ts">
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { Compartment, EditorState } from '@codemirror/state'
import { StreamLanguage } from '@codemirror/language'
import { go } from '@codemirror/legacy-modes/mode/go'
import { oneDark } from '@codemirror/theme-one-dark'
import * as AsciinemaPlayer from 'asciinema-player'
import { promiseTimeout } from '@vueuse/core'
import { useProfileStore } from '~/stores/profile'
import { Database } from '~/types/database.types'
import 'asciinema-player/dist/bundle/asciinema-player.css'

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
  code: string
}
const props = defineProps<Props>()

const profile = useProfileStore()
const supabase = useSupabaseClient<Database>()

const name = computed(() => `\u001B[38;5;49m${(profile.full_name || 'user').toLowerCase()}@mach10$\u001B[0m `)

const widget = ref<HTMLDivElement | null>(null)
const terminal = ref<HTMLDivElement | null>(null)
const binaryResult = ref('')
const isRunning = ref(false)
const isFormatting = ref(false)
const isFullScreen = ref(false)
const showTerminal = ref(false)
const player = ref<any>(null)

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

    if (error) {
      discreteApi.message.error(error.message)
      console.error(error)
    } else if (data) {
      if (data.formated.Body) {
        editorView.value.dispatch({ changes: { from: 0, to: editorView.value.state.doc.length, insert: data.formated.Body } })
      }

      if (compile) {
        const resultEvents = data?.events?.Events?.map(e => e.Message).join('')
        const resultErrors = data?.events?.Errors ? data.events.Errors : ''

        await writeGoBinary(resultEvents, resultErrors)
      }
    }
  }

  isRunning.value = false
  isFormatting.value = false
}

const playerOptions = { theme: 'monokai', idleTimeLimit: 2, autoplay: true, speed: 1, controls: false }

const buildText = computed(() => {
  let time = 0.5
  return [
    { version: 2, width: 80, height: 14 },
    [0, 'o', name.value],
    ...'go build programe.go'.split('').map(c => [(time += 0.05), 'o', c]),
    [time + 1, 'o', `\r\n${name.value}`],
  ]
})

const buildTextEndTime = computed(() => (buildText.value[buildText.value.length - 1] as number[])[0])

const writeGoRun = () => new Promise<void>((resolve) => {
  showTerminal.value = true

  nextTick(async () => {
    if (terminal.value) {
      if (player.value) {
        player.value.dispose()
      }
      player.value = AsciinemaPlayer.create({
        data: buildText.value,
      }, terminal.value,
      playerOptions,
      )

      await promiseTimeout(buildTextEndTime.value * 1000)

      resolve()
    }
  })
})

const writeGoBinary = async (output: string, errorOutput: string) => {
  if (terminal.value) {
    if (player.value) {
      player.value.dispose()
    }
    let time = buildTextEndTime.value

    const computedOutput = (output || `\u001B[38;5;196m${errorOutput}\u001B[0m`).replace(/\n/g, '\r\n')

    player.value = AsciinemaPlayer.create({
      data: [
        ...buildText.value,
        ...'./programe.go\r\n'.split('').map(c => [(time += 0.05), 'o', c]),
        [time += 1, 'o', computedOutput],
      ],
    }, terminal.value,
    { ...playerOptions, startAt: buildTextEndTime.value },
    )

    await promiseTimeout((time - buildTextEndTime.value) * 1000)
  }
}

onMounted(async () => {
  const myTheme = EditorView.baseTheme({
    '&.cm-editor': {
      fontSize: '16px',
      backgroundColor: '#272822',
      padding: '5px',
    },
    '&.cm-editor .cm-gutters': {
      backgroundColor: '#272822',
    },
  })

  const tabSize = new Compartment()

  const state = EditorState.create({
    doc: props.code,
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

const discreteApi = useDiscreteApi()
</script>

<style lang="postcss" scoped>
.fullscreen {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
}
</style>
