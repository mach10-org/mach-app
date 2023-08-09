<template>
  <footer class="py-4 sm:pb-6 sm:pt-14">
    <div class="container">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <Brand size="lg" />
        </div>
        <div class="mb-16 px-0 md:mb-0 md:px-8">
          <Newsletter label="Email address" placeholder="Enter your email" button-text="Notify me" input-id="email-newsletter-footer">
            <template #description>
              We’ll notify you when our first course is ready. First course starting in 2023.
            </template>
          </Newsletter>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
          <FooterMenu :menu="i18n.tm('footer.menu_1')" menu-index="1" />
          <FooterMenu :menu="i18n.tm('footer.menu_2')" menu-index="2" />
          <FooterMenu :menu="i18n.tm('footer.menu_3')" menu-index="3" />
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
</script>
