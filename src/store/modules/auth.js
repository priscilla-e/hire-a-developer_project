export default {
  state() {
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
    token(state) {
      return state.token;
    },
    isAuth(state) {
      return !!state.token;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
    }
  },
  actions: {
    async auth(context, payload) {
      const mode = payload.mode;

      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWuCGlVQzjpZf98SjUBvoz6ROkK6hH - w0';
      if (mode === 'sign up') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWuCGlVQzjpZf98SjUBvoz6ROkK6hH - w0'
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to authenticate');
        throw error;
      }

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        // tokenExpiration: responseData.expiresIn
      })
    },
    autoLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        context.commit('setUser', {
          token: token,
          userId: userId
        })
      }
    },
    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'sign up'
      })
    },
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login'
      })
    },
    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiration: null
      })
    }
  },

}