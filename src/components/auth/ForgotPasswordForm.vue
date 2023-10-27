<template>
  <v-card class="mx-auto px-6" width="400" prepend-icon="mdi-key-alert">
    <template v-slot:title> Forgot password </template>
    <form>
      <v-text-field label="Username or E-mail"></v-text-field>

      <v-btn color="primary" block class="me-4 mb-4" type="submit">
        Send reset password link!
      </v-btn>

      <v-btn @click="redirectToLogin" block class="me-4 mb-4" type="button">
        Back to login
      </v-btn>
    </form>
  </v-card>
</template>

<script setup>
import router from "@/router/index";
const redirectToLogin = () => {
  router.push({
    name: "Login",
  });
};
</script>
