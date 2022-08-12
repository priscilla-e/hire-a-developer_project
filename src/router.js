import { createRouter, createWebHistory } from 'vue-router';

import DeveloperDetails from './pages/developers/DeveloperDetails.vue';
import DevelopersList from './pages/developers/DevelopersList.vue';
import DeveloperRegistration from './pages/developers/DeveloperRegistration';
import ReceivedOffers from './pages/offers/ReceivedOffers.vue';
import SendOffer from './pages/offers/SendOffer.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/developers' },
    { path: '/developers', component: DevelopersList },
    {
      path: '/developers/:id',
      props: true,
      component: DeveloperDetails,
      children: [{ path: 'send-offer', component: SendOffer }],
    },
    { path: '/register', component: DeveloperRegistration, meta: { requiresAuth: true } },
    { path: '/offers', component: ReceivedOffers, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/auth');
  }
  else if (to.meta.requiresUnauth && store.getters.isAuth) {
    next('/developers');
  } else {
    next();
  }
})

export default router;
