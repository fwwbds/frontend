import { RoutePath } from '@/constant/route'
import type { RouteRecordRaw } from 'vue-router'
export const resetRoute: RouteRecordRaw[] = [
  //   {
  //     name: '风采展示',
  //     path: RoutePath.Show,
  //     component: () => import('@/views/home/show/index.vue'),
  //   },
  {
    name: 'Reset',
    path: RoutePath.Reset,
    component: () => import('@/views/reset.vue')
  }
]
