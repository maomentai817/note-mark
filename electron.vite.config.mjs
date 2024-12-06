import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Markdown from 'unplugin-vue-markdown/vite'
// import markdownItPrism from 'markdown-it-prism'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    assetsInclude: './resources/**',
    resolve: {
      alias: {
        '@/lib': resolve('src/main/lib')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    base: './',
    assetsInclude: ['src/renderer/assets/**', './resources/**'],
    resolve: {
      alias: {
        // '@renderer': resolve('src/renderer/src')
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/] // <-- allows Vue to compile Markdown files
      }),
      UnoCSS(),
      // Markdown({
      //   // 配置 Markdown-it
      //   markdownItOptions: {
      //     html: true, // 支持 HTML
      //     linkify: true, // 自动识别链接
      //     typographer: true // 启用 typographer
      //   },
      //   // 自定义 Markdown 配置，例如使用 markdown-it 插件
      //   markdownItSetup(md) {
      //     md.use(markdownItPrism) // 支持代码高亮
      //   },
      //   assetsInclude: ['**/*.md']
      // }),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      Components({
        // resolvers: [ElementPlusResolver()]
        // 配置 element-plus 采用 sass 主题配色方案
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 1. 高版本 element-plus 及 sass^1.77.7 以上版本报错问题
          api: 'modern-compiler',
          // 2. 自动导入定制化样式文件进行样式覆盖
          additionalData: `
          @use "@/styles/element/index.scss" as *; $SASS_WARN_DEPRECATION: false;
        `
        }
      }
    }
  }
})
