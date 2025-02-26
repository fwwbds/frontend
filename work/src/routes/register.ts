import { RoutePath } from '@/constant/route'
import type { RouteRecordRaw } from 'vue-router'
export const registerRoute: RouteRecordRaw[] = [
  //   {
  //     name: '风采展示',
  //     path: RoutePath.Show,
  //     component: () => import('@/views/home/show/index.vue'),
  //   },
  {
    name: 'Register',
    path: RoutePath.Register,
    component: () => import('@/views/register.vue')
  }
]
