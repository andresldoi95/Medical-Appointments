// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultPage.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/LoginUser.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue')
      },
      {
        path: 'patients',
        name: 'Patients',
        component: () => import('@/views/patients/PatientsPage.vue')
      },
      {
        path: 'appointments',
        name: 'Appointments',
        component: () => import('@/views/appointments/AppointmentsPage.vue')
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
