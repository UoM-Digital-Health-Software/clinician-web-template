<template>
  <div class="q-pa-md">
    <q-layout class="rounded-borders">
      <Navigation>
        <router-view/>
      </Navigation>
     </q-layout>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'app',
  components: {
    'Navigation': Navigation,
  }
}
</script>
