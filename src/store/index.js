import { createStore } from 'vuex';

import developersModule from './modules/developers.js';
import offersModule from './modules/offers.js';

const store = createStore({
  modules: {
    developers: developersModule,
    offers: offersModule,
  },
  state() {
    const { v4: uuidv4 } = require('uuid');
    return {
      userId: uuidv4(),
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
