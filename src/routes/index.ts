import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'index',
    },
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('@/pages/Index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    };
  },
  routes,
});

export {
  router,
};
