export default {
  namespaced: true,
  state() {
    return {
      lastFetchedTimestamp: null,
      developers: [],
    };
  },
  getters: {
    developers(state) {
      return state.developers;
    },
    hasDevelopers(state) {
      return state.developers && state.developers.length > 0;
    },
    isDeveloper(_, getters, _2, rootGetters) {
      const developers = getters.developers;
      const userId = rootGetters.userId;
      return developers.some((dev) => dev.id === userId);
    },
    shouldUpdate(state) {
      // restrict data fetch time to every 1 min
      const lastFetch = state.lastFetchedTimestamp;

      if (!lastFetch) {
        return true;
      }

      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 60;
    }
  },
  mutations: {
    setFetchTimestamp(state) {
      state.lastFetchedTimestamp = new Date().getTime();
    },
    addDeveloper(state, payload) {
      state.developers.push(payload);
    },
    setDevelopers(state, payload) {
      // set developers loaded from database
      state.developers = payload;
    },
  },
  actions: {
    async addDeveloper(context, data) {
      const userId = context.rootGetters.userId;
      const userData = {
        firstName: data.first,
        lastName: data.last,
        profilePicture: '../../assets/default-pic.png',
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
      };

      const response = await fetch(
        `https://hire-a-dev-a1cb2-default-rtdb.firebaseio.com/developers/${userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        // error...
      }

      context.commit('addDeveloper', {
        ...userData,
        id: userId,
      });
    },
    async loadDevelopers(context, payload) {
      if (!payload.forceFetch && !context.getters.shouldUpdate) {
        return;
      }
      const response = await fetch(
        `https://hire-a-dev-a1cb2-default-rtdb.firebaseio.com/developers.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to load data!');
        throw error;
      }

      const developers = [];
      for (const key in responseData) {
        const developer = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          profilePicture: responseData[key].profilePicture,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        developers.push(developer);
      }
      context.commit('setDevelopers', developers);
      context.commit('setFetchTimestamp');
    },
  },
};
