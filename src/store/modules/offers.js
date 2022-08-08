export default {
  namespaced: true,
  state() {
    return {
      offers: [],
    };
  },
  getters: {
    offers(state, _, _2, rootGetters) {
      const devId = rootGetters.userId;
      return state.offers.filter(offer => offer.devId === devId)
    },
    hasOffers(_, getters) {
      return getters.offers && getters.offers.length > 0;
    }
  },
  mutations: {
    addOffer(state, payload) {
      state.offers.push(payload);
    },
  },
  actions: {
    sendOffer(context, data) {
      const { v4: uuidv4 } = require('uuid');
      const newOffer = {
        id: uuidv4(),
        devId: data.devId,
        email: data.email,
        message: data.message,
      };
      context.commit('addOffer', newOffer);
    },
  },
};
