import { createRouter, createWebHistory } from 'vue-router';

const DeveloperDetails = () => import('./pages/developers/DeveloperDetails.vue');
const DevelopersList = () => import('./pages/developers/DevelopersList.vue');
const DeveloperRegistration = () => import('./pages/developers/DeveloperRegistration');
const ReceivedOffers = () => import('./pages/offers/ReceivedOffers.vue');
const SendOffer = () => import('./pages/offers/SendOffer.vue');
const NotFound = () => import('./pages/NotFound.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
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
