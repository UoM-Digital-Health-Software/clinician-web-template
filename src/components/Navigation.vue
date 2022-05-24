<template>
  <div class="q-pa" style="min-height: inherit">
    <q-layout view="hHh Lpr lff" class="rounded-borders">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-btn v-if="showNavs" flat @click="drawer = !drawer" round dense icon="menu" />
          <q-img class="absolute-top" :src="require('@/assets/logo.png')" 
          style="object-fit:cover; height: 50px; width: 50px; margin-left: 50px"></q-img>
          <q-toolbar-title class="q-ml-xl">Project Name</q-toolbar-title>
          <div v-if="showNavs" class="menu-item" v-show="authenticated" >
            <div align="right" @click="signOut">Log out</div>
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer v-show="showNavs"
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit" >
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === this.activeMenu" 
              v-ripple @click="clickMenu(menuItem)">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
        
      </q-drawer>
      <q-page-container>
       <slot></slot>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import { AuthService } from '@/services/auth.service';
import router from '@/router';
import { mapState } from 'vuex';

const menuList = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    separator: true,
    path: '/'
  },
  {
    icon: 'people',
    label: 'Patients',
    separator: false,
    path: '/patients'
  },
  {
    icon: 'analytics',
    label: 'Reports',
    separator: true,
    path: '/reports'
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    path: '/settings'
  }
]

export default {
  setup () {
    return {
      drawer: ref(false),
      menuList
    }
  },

  data() {
    return {
      
      activeMenu: 'Dashboard'
    };
  },
  computed: mapState({
    showNavs: 'showNavs',
    authenticated: 'authenticated'
  }),
  methods: {
    signOut() {
      AuthService.signOut();
      router.push('/signin');
    },
    clickMenu(menuItem){
      this.activeMenu = menuItem.label
      router.push(menuItem.path);
    }
  }
}
</script>
