import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import pkg from './package.json'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

const { name, version, description } = pkg
const __APP_INFO__ = {
  pkg: { name, version, description },
  lastBuildTime: dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('swiper-')
        }
      }
    }),
    AutoImport({
      imports: ['vue', 'pinia']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true // 监听所有地址
  },
  define: {
    'process.env': JSON.stringify({
      ...process.env,
      ...__APP_INFO__
    })
  }
})
