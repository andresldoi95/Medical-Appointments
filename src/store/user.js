import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: '',
      name: '',
      loggedIn: false
     };
  },
  actions: {
    setUser(user) {
      this.id = user.id;
      this.name = user.name;
      this.loggedIn = this.id !== '' && this.id !== null;
    }
  }
})
