import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Patients from '../views/Patients.vue';
import Reports from '../views/Reports.vue';
import Settings from '../views/Settings.vue';
import SignIn from '../views/SignIn.vue';
import PasswordResetInit from '../views/PasswordResetInit';
import PasswordResetFinish from '../views/PasswordResetFinish'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/account-reset-init',
    name: 'passwordResetInit',
    component: PasswordResetInit,
  },
  {
    path: '/account-reset-finish',
    name: 'passwordResetFinish',
    component: PasswordResetFinish,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticated = store.state.authenticated;
  console.log(authenticated)
  if (to.name !== 'SignIn' && to.name !== 'passwordResetInit' && to.name !== 'passwordResetFinish' && !authenticated) {
    next({
      name: 'SignIn'
    });
  } else {
    store.dispatch('showNav')
    next();
  }
})

export default router;
