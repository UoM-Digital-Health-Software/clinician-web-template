<template>
  <q-dialog v-model = "showUp" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">{{ message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
export default {
  name: 'WarningDialog',
  props: ['message' ],
  data: function () {
    return {
      showUp:  ref(false),
      show(){
        this.showUp = true
      }
    };
  },
  
}
</script>