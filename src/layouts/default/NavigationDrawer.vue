<template>
  <v-navigation-drawer
    :model-value="appStore.openedDrawer"
    app
    clipped
    hide-overlay
  >
    <v-list-item prepend-icon="mdi-medical-cotton-swab" :title="appName" :subtitle="userStore.name"></v-list-item>
    <v-list-item :active="router.currentRoute.value.name === 'Home'" link :to="{ name: 'Home' }" title="Dashboard"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="Appointments"></v-list-item>
    <v-list-item :active="router.currentRoute.value.name === 'Patients'" link :to="{name: 'Patients'}" title="Patients"></v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import router from "@/router";
const userStore = useUserStore();
const appStore = useAppStore();
const appName = import.meta.env.VITE_APP_NAME;
</script>
