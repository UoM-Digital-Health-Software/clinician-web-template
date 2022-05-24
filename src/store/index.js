import { createStore } from "vuex";

export default createStore({
  state: {
    authenticationToken: null,
    authenticated: false,
    authenticatedUser: null,
    showNavs: true,  
  },
  mutations: {
    hideNav(state){
      state.showNavs = false
    },
    showNav(state){
      state.showNavs = true
    },
    authenticationToken(state, token){
      state.authenticationToken = token
    },
    authenticated(state, authenticated){
      state.authenticated = authenticated
    },
    authenticatedUser(state, user){
      state.authenticatedUser = user
    }
  },
  actions: {
    setAuthenticated(context, token){
      context.commit("authenticationToken", token)
      context.commit("authenticated", true)
    },

    setAuthenticatedUser({ commit }, user){
      commit("authenticatedUser", user)
    },

    clearAuthenticated({ commit }){
      commit("authenticationToken", null)
      commit("authenticated", false)
      commit("authenticatedUser", null)
    },
    hideNav(context){
      context.commit("hideNav")
    },
    showNav(context){
      context.commit("showNav")
    }
  },
  getters: {},
});
