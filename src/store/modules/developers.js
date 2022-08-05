export default {
  namespace: true,
  state() {
    return {
      developers: [
        {
          id: 'pc1',
          firstName: 'Priscilla',
          lastName: 'Emasoga',
          location: 'Sheffield, United Kingdom',
          description: 'Hello i am a developer feel free to send me a message',
          hourlyRate: 30,
        },
        {
          id: 'pc2',
          firstName: 'Pamela',
          lastName: 'Johnson',
          location: 'Manchester, United Kingdom',
          description: 'Hello i am a developer feel free to send me a message',
          hourlyRate: 25,
        },
        {
          id: 'pc3',
          firstName: 'Joane',
          lastName: 'Doe',
          location: 'London, United Kingdom',
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
