let timer;

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
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
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
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

      const tokenExpiresIn = +responseData.expiresIn * 1000;
      const futureTokenExpiration = new Date().getTime() + tokenExpiresIn;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', futureTokenExpiration);

      // ...auto logout user after token expiration
      timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, tokenExpiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      // ..set auto logout timer to remaining token time
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const tokenRemTime = +tokenExpiration - new Date().getTime();

      if (tokenRemTime < 0) {
        return;
      }
      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, tokenRemTime)

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
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

      context.commit('setUser', {
        token: null,
        userId: null,
      })
    },
    autoLogout(context) {
      context.dispatch('logout');
      context.commit('setAutoLogout');
    }
  },
}