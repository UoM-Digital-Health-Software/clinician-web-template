<template>
  <div class="reset password finish">
    <div class="warning" v-if="success">
      <span class="q-ml-sm">Your password has been reset. Please <router-link to="/SignIn">Sign in</router-link></span>
    </div>
    <div class="q-pa-md" v-if="!success" style="max-width: 500px; margin: auto">
      <q-form @submit.prevent="confirmReset" class="q-gutter-md" standout>
        <q-input
          v-model="newPassword"
          label="New Password"
          label-color="black"
          required
          type="password"
          name="password"
          :rules="[rules.password]"
        />
        <q-input
          v-model="confirmPassword"
          label="New Password Confirmation"
          label-color="black"
          required
          type="password"
          name="confirmPassword"
        />
        <span class="q-ml-sm" v-if="displayErrorMessage">{{errorMessage}}</span>
        <q-btn label="reset password"  type="submit" color="primary"/>
      </q-form>
    </div>
  </div>
</template>

<script>
import { AuthService } from '@/services/auth.service';
import ApiService from '../services/api.service'
import { mapActions } from 'vuex';

export default {
  name: 'PasswordResetFinish',
  data () {
    return {
      key: '',
      newPassword: '',
      confirmPassword: '',
      success: false,
      displayErrorMessage: false,
      errorMessage: '',
      rules: {
        password: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min 8 characters with at least one capital character, one lower-case character, a number and a special character."
          );
        }
      }
    }
  },
  mounted(){
    this.hideNav()
  },
  methods: {
    ...mapActions(["hideNav"]),
    async confirmReset () {
      this.clearErrors()
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'The password and its confirmation do not match!'
        this.displayErrorMessage = true
      } else {
        AuthService.resetPasswordFinish(this.$route.query.key, this.newPassword).then(() => {
          this.success = true
        }).catch((error) => {
          this.setErrorMessage(error)
        })
      }
    },
    clearErrors: function () {
      this.displayErrorMessage = false
      this.errorMessage = ''
    },
    setErrorMessage (error) {
      this.errorMessage = ApiService.extractErrorMessage(error)
      this.displayErrorMessage = true
    }
  }
}
</script>

<style scoped>

</style>
