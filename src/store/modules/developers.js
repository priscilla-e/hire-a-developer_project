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
  },
  mutations: {},
  actions: {},
};
