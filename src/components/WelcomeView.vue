<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-icon size="350" icon="mdi-medical-cotton-swab" />

      <div class="text-body-2 font-weight-light mb-n1">
        Welcome {{ userStore.name }} to
      </div>

      <h1 class="text-h2 font-weight-bold mt-2">{{ appName }}</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col v-if="!userStore.loggedIn" cols="auto">
          <v-btn
            color="primary"
            :to="{ name: 'Login' }"
            min-width="164"
            variant="text"
          >
            <v-icon icon="mdi-account" size="large" start />

            Login
          </v-btn>
        </v-col>

        <v-col v-if="userStore.loggedIn" cols="auto">
          <v-btn :to="{ name: 'Home' }" color="primary" min-width="164" variant="flat">
            <v-icon icon="mdi-view-dashboard" size="large" start />

            Get Started
          </v-btn>
        </v-col>
        <v-col v-if="userStore.loggedIn" cols="auto">
          <v-btn @click="logoutUser" min-width="164" variant="flat">
            <v-icon icon="mdi-exit-to-app" size="large" start />

            Logout
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import usersService from "@/services/general/users";
import { useUserStore } from "@/store/user";
import router from "@/router";

const appName = import.meta.env.VITE_APP_NAME;
const userStore = useUserStore();
const logoutUser = () => {
  usersService.logout();
  router.push({ name: "Login" });
};
</script>
@/store/user
