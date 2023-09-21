<template>
  <div class="bg-$background-base">
    <div class="grid mx-auto py-8 container lg:grid-cols-12 lg:gap-12 xl:gap-0 lg:py-16">
      <div class="mr-auto place-self-center lg:col-span-7 xl:col-span-8">
        <h1 class="mb-4 max-w-2xl super-text-gradient text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h1>
        <p class="mb-6 max-w-2xl font-light lg:mb-8 lg:text-xl md:text-lg">
          <ContentSlot :use="$slots.description" unwrap="p" />
        </p>
        <slot />
      </div>
      <div class="hidden items-center lg:col-span-5 xl:col-span-4 lg:mt-0 lg:flex dark:opacity-70">
        <nuxt-img
          src="/img/home-hero.jpg"
          alt=""
          sizes="xs:406px"
          densities="x1 x2"
        />
      </div>
    </div>
  </div>
</template>
