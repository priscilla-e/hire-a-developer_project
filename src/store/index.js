import { createStore } from 'vuex';

import developersModule from './modules/developers.js';
import offersModule from './modules/offers.js';

const store = createStore({
  modules: {
    developers: developersModule,
    offers: offersModule,
  },
});

export default store;
