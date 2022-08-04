import { createRouter, createWebHistory } from 'vue-router';

import DevelopersDetails from './pages/developers/DevelopersDetails.vue';
import DevelopersList from './pages/developers/DevelopersList.vue';
import DeveloperRegistration from './pages/developers/DevelopersRegistration';
import ReceivedOffers from './pages/offers/ReceivedOffers.vue';
import SendOffer from './pages/offers/SendOffer.vue';
import NotFound from './pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/developers' },
    { path: '/developers', component: DevelopersDetails },
    {
      path: '/developers/:id',
      component: DevelopersList,
      children: [{ path: 'send-offer', component: SendOffer }],
    },
    { path: '/register', component: DeveloperRegistration },
    { path: '/offers', component: ReceivedOffers },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
