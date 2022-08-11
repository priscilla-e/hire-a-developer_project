export default {
  state() {
    // const { v4: uuidv4 } = require('uuid');
    return {
      userId: null,
      token: null,
      tokenExpiration: null
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
    }
  },
  actions: {
    async signup(context, payload) {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWuCGlVQzjpZf98SjUBvoz6ROkK6hH - w0', {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      });

      const responseData = response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to authenticate');
        throw error;
      }

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      })
    }
  }
}