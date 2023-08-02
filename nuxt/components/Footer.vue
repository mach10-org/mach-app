<template>
  <footer class="py-4 sm:pb-6 sm:pt-14">
    <div class="mx-auto container">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <Brand size="lg" />
        </div>
        <div class="mb-16 px-0 md:mb-0 md:px-8">
        <!-- <Newsletter label='Email address' placeholder='Enter your email' buttonText='Notify me' inputId='email-newsletter-footer' client:only='vue'>
          <NoTag slot='description'>We’ll notify you when our first course is ready. First course starting in 2023.</NoTag>
        </Newsletter> -->
        </div>
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
          <FooterMenu :menu="menu1" menu-index="1" />
          <FooterMenu :menu="menu2" menu-index="2" />
          <FooterMenu :menu="menu3" menu-index="3" />
        </div>
      </div>
      <hr class="border-border-input my-6 lg:my-8 sm:mx-auto">
      <div class="sm:center content-center justify-center sm:flex sm:items-center">
        <span class="text-text-muted text-sm sm:text-center">© {{ $config.public.siteName }} {{ $t('footer.tagLine') }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const i18n = useI18n()

// TODO better
const localFooter = computed(() => i18n.messages.value[i18n.locale.value].footer)
const menu1 = computed(() => localFooter.value.menu_1)
const menu2 = computed(() => localFooter.value.menu_2)
const menu3 = computed(() => localFooter.value.menu_3)
</script>
