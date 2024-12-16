import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
// 配置封装后 pinia
import pinia from '@/stores'
// 引入全局组件
import { componentPlugin } from '@/components'
// 引入懒加载指令
import { lazyPlugin } from '@/directives'
import '@/styles/index.css'
// UnoCSS
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
// 配置中文组件
import ELementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 创建 app
const app = createApp(App)
app.use(router)
app.use(pinia)
// 挂载全局组件
app.use(componentPlugin)
// 注册自定义插件
app.use(lazyPlugin)
// 挂载中文组件
app.use(ELementPlus, {
  locale: zhCn
})

// const head = createHead()
// app.use(head)

app.mount('#app')
