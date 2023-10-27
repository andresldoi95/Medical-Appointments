<template>
  <v-app :theme="appStore.currentTheme">
    <NavigationDrawer v-if="userStore.loggedIn" />
    <default-bar />
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue';
  import DefaultView from './DefaultView.vue';
  import NavigationDrawer from './NavigationDrawer.vue';
  import { useUserStore } from '@/store/user';
  import { useAppStore } from '@/store/app';
  const userStore = useUserStore();
  const appStore = useAppStore();
</script>
