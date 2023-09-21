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
              {{ $t('footer.notifyNewsletter') }}
            </template>
          </Newsletter>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
          <FooterMenu v-for="(m, index) in menus" :key="index" :menu="m.menu" :title="m.title" />
        </div>
      </div>
      <hr class="my-6 border-$border-input lg:my-8 sm:mx-auto">
      <div class="sm:center content-center justify-center sm:flex sm:items-center">
        <span class="text-sm text-$text-muted sm:text-center">© {{ $config.public.siteName }} <i18n-t keypath="footer.tagLine">
          <template #love>
            <Icon name="mdi:heart" class="text-ctp-latte-red dark:text-ctp-frappe-red" />
          </template>
          <template #matcha>
            <Icon name="simple-icons:gitea" class="text-ctp-latte-green dark:text-ctp-frappe-green" />
          </template>
          <template #japan>
            <Icon name="fxemoji:japanflag" />
          </template>
        </i18n-t></span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const i18n = useI18n()

const menus = computed<Array<{
  title: string
  menu: Array<{
    label: string
    path: string
  }>
}>>(() => [{
  title: i18n.t('footer.resources'),
  menu: [
    {
      label: i18n.t('footer.manifesto'),
      path: '/manifesto/',
    },
    {
      label: i18n.t('footer.codeOfConduct'),
      path: '/code-conduct/',
    },
    {
      label: i18n.t('footer.getInTouch'),
      path: '/contact/',
    },
    {
      label: i18n.t('footer.faq'),
      path: '/faq/',
    },
  ],
},
{
  title: i18n.t('footer.followUs'),
  menu: [
    {
      label: i18n.t('footer.instagram'),
      path: 'https://instagram.com/TODO',
    },
    {
      label: i18n.t('footer.twitter'),
      path: 'https://twitter.com/TODO',
    },
  ],
},
{
  title: i18n.t('footer.legal'),
  menu: [
    {
      label: i18n.t('footer.privacyPolicy'),
      path: '/privacy-policy/',
    },
    {
      label: i18n.t('footer.termsAndConditions'),
      path: '/terms-and-conditions/',
    },
    {
      label: i18n.t('footer.licence'),
      path: '/licence/',
    },
  ],
},
])
</script>
