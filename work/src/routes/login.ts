import { RoutePath } from '@/constant/route'
import type { RouteRecordRaw } from 'vue-router'
export const loginRoute: RouteRecordRaw[] = [
  //   {
  //     name: '风采展示',
  //     path: RoutePath.Show,
  //     component: () => import('@/views/home/show/index.vue'),
  //   },
  {
    name: 'Login',
    path: RoutePath.Login,
    component: () => import('@/views/login.vue')
  }
]
