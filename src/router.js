import { createRouter, createWebHistory } from 'vue-router';

import DeveloperDetails from './pages/developers/DeveloperDetails.vue';
import DevelopersList from './pages/developers/DevelopersList.vue';
import DeveloperRegistration from './pages/developers/DeveloperRegistration';
import ReceivedOffers from './pages/offers/ReceivedOffers.vue';
import SendOffer from './pages/offers/SendOffer.vue';
import NotFound from './pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/developers' },
    { path: '/developers', component: DevelopersList },
    {
      path: '/developers/:id',
      component: DeveloperDetails,
      children: [{ path: 'send-offer', component: SendOffer }],
    },
    { path: '/register', component: DeveloperRegistration },
    { path: '/offers', component: ReceivedOffers },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
