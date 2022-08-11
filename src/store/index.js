import { createStore } from 'vuex';

import developersModule from './modules/developers.js';
import offersModule from './modules/offers.js';
import authModule from './modules/auth.js';


const store = createStore({
  modules: {
    developers: developersModule,
    offers: offersModule,
    auth: authModule,
  },
});

export default store;
