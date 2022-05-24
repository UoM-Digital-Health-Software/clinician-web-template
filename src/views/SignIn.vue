<template>
  <div class="q-pa-md" style="max-width: 500px; margin: auto">
    <q-form ref="signInForm" standout @submit="signin" class="q-gutter-md">
      <q-input
        required
        v-model="username"
        label="User Name"
        label-color="black"
        aria-required="ture"
        name="username"
      />
      <q-input
        v-model="password"
        label="Password"
        label-color="black"
        required
        type="password"
        name="password"
        autocomplete="on"
      />
      <div class="failure" v-show="failure">
        Could not log in, please check your details and try again.
      </div>
      <div>
        <q-btn label="Log in" type="submit" color="primary"/>
      </div>
      <router-link to="/account-reset-init">Did you forget your password?</router-link>
    </q-form>
  </div>
</template>

<script>
import { AuthService } from '@/services/auth.service';
import router from '@/router';
import { mapActions } from 'vuex';

export default {
  data: function () {
    return {
      username: '',
      password: '',
      failure: false,
    };
  },
  mounted(){
    this.hideNav()
  },
  methods: {
    ...mapActions(["hideNav"]),
    async signin() {
      this.failure = false;
      const success = await AuthService.signIn(this.username, this.password);
      if (success) {
        router.replace('/');
      } else {
        this.failure = true;
      }
    },
  },
};
</script>
