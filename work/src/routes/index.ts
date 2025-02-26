// import { homeRoute } from './home'
// import { loginRoute } from './login'
// import { registerRoute } from './register'
// import { resetRoute } from './reset'

// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { registerRuntimeCompiler } from 'vue'
// const Layout = import('@/components/main-layout/index.vue')
// const NotPermission = import('@/components/not-permission-page/index.vue')

// export const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     component: Layout,
//     children: [...homeRoute, ...loginRoute,...registerRoute,...resetRoute],
//   },
//   {
//     path: '/403',
//     component: NotPermission,
//     meta: {
//       permissionKey: null,
//     },
//   },
// ]
// import { createRouter, createWebHistory } from 'vue-router';


// routes.forEach((_to, _from, next) => {
//   navigator.permissions.query({ name: 'notifications' }).then((permissionStatus) => {
//     if (permissionStatus.state === 'granted') {
//       // 权限已授予，继续路由
//       next();
//     } else {
//       // 处理权限未授予的情况
//       next(false);
//     }
//   });
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/home.vue';
import LoginPage from '../views/login.vue';
import registerPage from '../views/register.vue';
import resetPage from '../views/reset.vue';
import aiPage from '../views/QMathify.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: registerPage
  },
  {
    path: '/reset',
    name: 'reset',
    component: resetPage
  },
  {
    path: '/QMathify',
    name: 'QMathify',
    component: aiPage
  }
];

// 定义 router 变量
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 这里可以使用 router 进行后续操作，比如添加导航守卫
router.beforeEach((to, from, next) => {
  // 守卫逻辑
  next();
});

export default router;