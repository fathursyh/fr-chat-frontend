import './assets/main.css'
import 'flowbite';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import { routes } from './vueRoutes';

export function checkHistory() {
  window.history.length >= 20? true : false;
}
const app = createApp(App)
const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'auto', left: 0 }
    }
  }
})
    router.beforeEach((to, from, next) => {


      if (to.name === 'login' && from.name === 'register') {
        to.meta.transition = 'landing-back';
      }
      next();
    });

    app.use(pinia).use(router);
    app.mount('#app');