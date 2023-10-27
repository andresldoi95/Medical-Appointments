<template>
  <v-app-bar elevate-on-scroll color="primary" flat>
    <v-app-bar-nav-icon v-if="userStore.loggedIn" @click.stop="appStore.setOpenedDrawer()"></v-app-bar-nav-icon>

    <v-app-bar-title>
      <v-icon icon="mdi-medical-cotton-swab" />

      {{ appName }}
    </v-app-bar-title>
    <v-app-bar-nav-icon @click.stop="appStore.setCurrentTheme()" icon="mdi-theme-light-dark"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-if="userStore.loggedIn" @click.stop="logoutUser" icon="mdi-exit-to-app"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script setup>
  import { useAppStore } from '@/store/app';
  import { useUserStore } from '@/store/user';
  import usersService from '@/services/general/users';
  import router from '@/router';
  const appName = import.meta.env.VITE_APP_NAME;
  const appStore = useAppStore();
  const userStore = useUserStore();
  const logoutUser = () => {
    usersService.logout();
    router.push({name: 'Login'});
  };
</script>
