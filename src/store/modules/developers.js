export default {
  namespaced: true,
  state() {
    return {
      developers: [
        {
          id: 'pc1',
          firstName: 'Priscilla',
          lastName: 'Emasoga',
          profilePicture: 'https://www.fillmurray.com/640/360',
          areas: ['frontend', 'backend', 'graphics'],
          description:
            'Hello! i am a developer feel free to send me a message if you are interested in working with me. I will get back to you as soon as possible. ',
          hourlyRate: 30,
        },
        {
          id: 'pc2',
          firstName: 'Pamela',
          lastName: 'Johnson',
          profilePicture: 'https://www.fillmurray.com/640/360',
          areas: ['backend', 'graphics'],
          description: 'Hello i am a developer feel free to send me a message',
          hourlyRate: 25,
        },
        {
          id: 'pc3',
          firstName: 'Joane',
          lastName: 'Doe',
          profilePicture: 'https://www.fillmurray.com/640/360',
          areas: ['frontend'],
          description: 'Hello i am a developer feel free to send me a message',
          hourlyRate: 21,
        },
      ],
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
      return developers.some(dev => dev.id === userId)
    },
  },
  mutations: {
    addDeveloper(state, payload) {
      state.developers.push(payload);
    },
  },
  actions: {
    addDeveloper(context, data) {
      const userData = {
        id: context.rootGetters.userId,
        firstName: data.first,
        lastName: data.last,
        profilePicture: '../../assets/default-pic.png',
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
      };
      context.commit('addDeveloper', userData);
    },
  },
};
