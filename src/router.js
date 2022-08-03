import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory,
  routes: [
    { path: '/', redirect: '/developers' },
    { path: '/developers', component: null },
    {
      path: 'developers/:id',
      component: null,
      children: [{ path: 'send-offer', component: null }],
    },
    { path: '/register', component: null },
    { path: '/offers', component: null },
    { path: '/:notFound(.*)', component: null },
  ],
});

export default router;
