// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Storeflex | Dxbrunners.com',
      meta: [
        { name: 'description', content: 'Find it on Amazon.ae | noon.com & buy it from DxbRunners' }
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  components: [
    '~/components'
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    "vue3-carousel-nuxt",
  ],
  runtimeConfig: {
    public: {
      appName: '',
      baseURL: '',
      woocommerceDomain: '',
    },
  }
})