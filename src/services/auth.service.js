import ApiService from '@/services/api.service';
import { AUTH_TOKEN_KEY } from './config';
import store from '../store';

export const AuthService = {

  init() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if(token){
      this.syncAuthentication(token);
    }
  },

  async signIn(username, password) {
    const credentials = {
      username: username,
      password: password,
      rememberMe: true,
    };
    return ApiService.post('authenticate', credentials).then(
      async (response) => {
        const token = response.data.id_token;
        this.storeAuthentication(token);
        return true;
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  },

  signOut() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    store.dispatch('clearAuthenticated');
  },

  storeAuthentication(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    this.syncAuthentication(token)
  },

  syncAuthentication(token){
    ApiService.setAuthentication(token);
    store.dispatch('setAuthenticated',token);
    this.fetchUser()
  },

  async fetchUser(){
    let user = await ApiService.get('account');
    store.dispatch('setAuthenticatedUser', user.data);  
  },

  resetPasswordInit (username) {
    return ApiService.postJson('account/reset-password/init', username)
  },

  resetPasswordFinish (key, newPassword) {
    return ApiService.post('account/reset-password/finish', { 'key': key, 'newPassword': newPassword })
  }
};
