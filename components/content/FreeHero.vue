<template>
  <div class="mx-auto pb-8 pt-10 text-center container lg:pt-20">
    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-$text-title lg:text-6xl md:text-5xl">
      <ContentSlot :use="$slots.title1" unwrap="p" />
      <div class="from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text font-extrabold text-transparent">
        <ContentSlot :use="$slots.title2" unwrap="p" />
      </div>
    </h1>
    <p class="mb-8 font-light text-$text-muted sm:px-16 xl:px-48 lg:text-xl md:text-lg">
      <ContentSlot :use="$slots.description" unwrap="p" />
    </p>
  </div>
</template>
