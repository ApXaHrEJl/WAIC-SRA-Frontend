import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/:id([a-zA-Z0-9-]+)',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/',
  },
];

export default routes;
