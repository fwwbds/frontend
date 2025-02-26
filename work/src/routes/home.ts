import { RoutePath } from '@/constant/route'
import type { RouteRecordRaw } from 'vue-router'
export const homeRoute: RouteRecordRaw[] = [
  //   {
  //     name: '风采展示',
  //     path: RoutePath.Show,
  //     component: () => import('@/views/home/show/index.vue'),
  //   },
  {
    name: 'Home',
    path: ``,
    component: () => import('@/views/home.vue')
  }
]
// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/home.vue'; // 确保路径正确

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home, // 首页组件
//   },
//   // 其他路由
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;