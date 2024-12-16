import { createRouter, createWebHistory } from 'vue-router'
import MarkdowNote from '@/views/MarkdownNote/MarkdowNote.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'LayoutContainer',
      redirect: '/note',
      component: () => import('@/views/LayoutContainer/LayoutContainer.vue'),
      children: [
        {
          path: 'note',
          name: 'MarkdownNote',
          component: MarkdowNote
        }
      ]
    }
  ],
  // 滚动行为
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
