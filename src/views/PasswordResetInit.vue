<template>
  <div class="reset password content">
    <div class="success" v-if="success">
      <span class="q-ml-sm">Check your emails for details on how to reset your password.</span>
    </div>

    <div class="q-pa-md" v-if="!success" style="max-width: 500px; margin: auto">
    <div class="warning" v-if="!success">
      Enter the email address you used to register.
    </div>
      <q-form @submit.prevent="resetPassword" class="q-gutter-md" standout>
        <q-input
        required
        v-model="email"
        label="Your Email Address"
        label-color="black"
        aria-required="ture"
        name="email"
        />
        <p class="error-message" v-if="displayErrorMessage">{{errorMessage}}</p>
        <q-btn label="reset" type="submit" color="primary"/>
      </q-form>
    </div>
  </div>
</template>

<script>
import { AuthService } from '@/services/auth.service';
import { RESOURCE_NOT_EXIST } from '../services/config'
import { mapActions } from 'vuex';

export default {
  name: 'PasswordReset',
  data () {
    return {
      email: '',
      success: false,
      displayErrorMessage: false,
      errorMessage: ''
    }
  },
  mounted(){
    this.hideNav()
  },
  methods: {
    ...mapActions(["hideNav"]),
    async resetPassword () {
      this.clearErrors()
      AuthService.resetPasswordInit(this.email).then(() => {
        this.success = true
      }).catch((error) => {
        this.setErrorMessage(error)
      })
    },
    clearErrors: function () {
      this.displayErrorMessage = false
      this.errorMessage = ''
    },
    setErrorMessage (error) {
      if (error.response.status === RESOURCE_NOT_EXIST) {
        this.errorMessage = 'Email address not registered'
      } else {
        this.errorMessage = 'Failed to reset password. Please contact support team.'
      }
      this.displayErrorMessage = true
    }
  }
}

</script>

