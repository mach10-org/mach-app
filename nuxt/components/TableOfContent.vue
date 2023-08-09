<template>
  <div id="toc">
    <nav class="">
      <h2 class="mb-4 font-medium tracking-widest uppercase">
        Table of content
      </h2>
      <nav class="mt-4 flex">
        <ul class="space-y-4">
          <li
            v-for="{ id, text } in tocLinks"
            :id="`toc-${id}`"
            :key="id"
            class="cursor-pointer text-sm"
            :class="{ 'underline underline-dashed underline-$primary': id === activeTocId }"
            @click="onClick(id)"
          >
            {{ text }}
          </li>
        </ul>
      </nav>
    </nav>
  </div>
</template>

<script setup lang="ts">

defineProps({
  tocLinks: {
    type: Array,
    required: true,
  },
  activeTocId: {
    type: String,
    default: null,
  },
})

const router = useRouter()

const onClick = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    router.push({ hash: `#${id}` })
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>
