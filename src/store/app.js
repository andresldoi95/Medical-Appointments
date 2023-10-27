// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    openedDrawer: false,
    currentTheme: 'dark'
  }),
  actions: {
    setOpenedDrawer(){
      this.openedDrawer = !this.openedDrawer;
    },
    setCurrentTheme() {
      this.currentTheme = this.currentTheme === 'dark'?'light':'dark';
    }
  },
})
