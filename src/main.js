import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiService from '@/services/api.service';
import { AuthService } from '@/services/auth.service';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

ApiService.init();
AuthService.init();

createApp(App).use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .mount('#app');
