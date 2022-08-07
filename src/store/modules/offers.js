export default {
  namespaced: true,
  state() {
    return {
      offers: [],
    };
  },
  getters: {},
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
      console.log(newOffer);
    },
  },
};
