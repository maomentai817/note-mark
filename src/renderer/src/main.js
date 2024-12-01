import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
// 配置封装后 pinia
import pinia from '@/stores'
// 引入全局组件
import { componentPlugin } from '@/components'
// 引入懒加载指令
import { lazyPlugin } from '@/directives'
// UnoCSS
import 'virtual:uno.css'

// 创建 app
const app = createApp(App)
app.use(router)
app.use(pinia)
// 挂载全局组件
app.use(componentPlugin)
// 注册自定义插件
app.use(lazyPlugin)

app.mount('#app')
