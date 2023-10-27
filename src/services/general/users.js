import axios from '@/http/oauth2-axios';

const urlOauth2 = import.meta.env.VITE_OAUTH2_API;

import { useUserStore } from '@/store/user';

const userStore = useUserStore();

function getLoggedInUser() {
  return axios.get(urlOauth2 + '/user');
}

function logout() {
  userStore.setUser({
    id: '',
    name: ''
  });
  localStorage.clear();
}

const usersService = { getLoggedInUser, logout };

export default usersService;
