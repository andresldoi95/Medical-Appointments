<template>
  <v-card class="mx-auto px-6" width="400" prepend-icon="mdi-account">
    <template v-slot:title> Login user </template>
    <form @submit.prevent="doLogin">
      <v-text-field v-model="userLoginForm.username" label="Username"></v-text-field>

      <v-text-field type="password" v-model="userLoginForm.password" label="Password"></v-text-field>

      <v-checkbox value="1" label="Remember Me" type="checkbox"></v-checkbox>

      <v-btn color="primary" block class="me-4 mb-4" type="submit"> Login </v-btn>

      <v-btn @click="redirecToForgotPassword" block class="me-4 mb-4" type="button"> Forgot my password! </v-btn>
    </form>
    <v-snackbar
      v-model="showSnackbar"
      multi-line
    >
      {{ snackbarMessage }}

      <template v-slot:actions>
        <v-btn
          :color="snackbarColor"
          variant="text"
          @click="showSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script setup>
  import router from '@/router/index';
  import axios from '@/http/default-axios';
  import { ref } from 'vue';

  import { useUserStore } from '@/store/user';

  import usersService from '@/services/general/users';

  const urlOauth2 = import.meta.env.VITE_OAUTH2_LOGIN;
  const clientIdOauth2 = import.meta.env.VITE_OAUTH2_CLIENT_ID;
  const clientSecretOauth2 = import.meta.env.VITE_OAUTH2_CLIENT_SECRET;

  const userLoginForm = ref({
    username: 'andresleondoylet@gmail.com',
    password: 'Password.1'
  });

  const redirecToForgotPassword = () => {
    router.push({
      name: 'ForgotPassword'
    })
  };

  const snackbarMessage = ref('');

  const showSnackbar = ref(false);

  const snackbarColor = ref('red');

  const setSnackbar = (color, message, open) => {
    snackbarColor.value = color;
    snackbarMessage.value = message;
    showSnackbar.value = open;
  };

  const userStore = useUserStore();

  const doLogin = () => {
    axios.post(urlOauth2, {
      grant_type: 'password',
      client_id: clientIdOauth2,
      client_secret: clientSecretOauth2,
      username: userLoginForm.value.username,
      password: userLoginForm.value.password
    }).then(({data}) => {
      localStorage.setItem('token', data.access_token);
      usersService.getLoggedInUser().then(({data}) => {
        setSnackbar( 'green', 'User authenticated successfully!', true);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userName', data.name);
        userStore.setUser({
          id: data.id,
          name: data.name
        });
        router.push({name: 'Home'});
      }).catch(() => {
        setSnackbar( 'red', 'There was an error, try logging in again!', true);
        localStorage.clear();
      });

    }).catch(({response}) => {
      let status = response.status;
      if (status === 400) {
        setSnackbar( 'red', 'Invalid credentials!', true);
      }
    });
  };
</script>
@/store/user
