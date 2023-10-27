/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';
import { useUserStore } from '@/store/user';

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    ;

    const userStore = useUserStore();

    const validateLogin = () => {
      if (!userStore.loggedIn) {
        userStore.setUser({
          id: localStorage.getItem('userId'),
          name: localStorage.getItem('userName')
        });
      }
    };

    router.beforeEach((to, from, next) => {
      validateLogin();
      if ((to.name === 'Login' || to.name === 'ForgotPassword') && userStore.loggedIn) next({ name: 'Home' });
      else  if (userStore.loggedIn) next()
      else if (to.name !== 'Login' && to.name !== 'ForgotPassword') next({name: 'Login'});
      else next();
    });
}
