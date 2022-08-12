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
    setOffers(state, payload) {
      state.offers = payload;
    }
  },
  actions: {
    async sendOffer(context, payload) {
      const newOffer = {
        email: payload.email,
        message: payload.message,
      };
      
      const response = await fetch(`https://hire-a-dev-a1cb2-default-rtdb.firebaseio.com/offers/${payload.devId}.json`, {
        method: 'POST',
        body: JSON.stringify(newOffer)
      })

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send offer.');
        throw error;
      }

      newOffer.id = responseData.name;      // using firebase id as offer id
      newOffer.devId = responseData.name;

      context.commit('addOffer', newOffer);
    },
    async fetchOffers(context) {
      // fetches offers for active developer
      const devId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      const response = await fetch(`https://hire-a-dev-a1cb2-default-rtdb.firebaseio.com/offers/${devId}.json?auth=` + token);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch offers. Contact Administrator');
        throw error;
      }

      const offers = [];
      for (const key in responseData) {
        const offer = {
          id: key,
          devId: devId,
          email: responseData[key].email,
          message: responseData[key].message,
        }
        offers.push(offer);
      }
      context.commit('setOffers', offers);
    }
  },
};
