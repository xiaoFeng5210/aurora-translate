// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  app: {
    baseURL: '/',
  },
  ssr: false,
  nitro: {
    // 用于客户端代理
    devProxy: {
      '/api': {
        target: 'http://47.100.103.149:8080', // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  compatibilityDate: '2024-04-03', e
  devtools: { enabled: true },
  modules: ['nuxtjs-naive-ui'],
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
              'NDropdown',
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/base.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {

      // apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
})
