import Cookies from "js-cookie";
import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import RegisterPage from "./components/pages/RegisterPage.vue";
import ChatPage from "./components/pages/ChatPage.vue";
import ProfilePage from "./components/pages/ProfilePage.vue";
import NotificationsPage from "./components/pages/NotificationsPage.vue";
import LandingPage from "./components/pages/LandingPage.vue";
import { useUser } from "./stores/auth";
import PostDetailPage from "./components/pages/PostDetailPage.vue";
import ProfilePageGuest from "./components/pages/ProfilePageGuest.vue";

export const routes = [
    {meta: {landing: 'slide-top'}, path: '/', name: 'landingPage', component: LandingPage, beforeEnter: (to, from, next) => {
      checkAuth() ? next({name: 'homePage'}) : next();
    }},
    {meta: {transition: 'landing'}, path: '/register', name: 'register', component: RegisterPage, beforeEnter: (to, from, next) => {
      checkAuth() ? next({name: 'homePage'}) : next();
    }},
    {meta: {transition: 'landing'}, path: '/login', name: 'login', component: LoginPage, beforeEnter: (to, from, next) => {
      checkAuth() ? next({name: 'homePage'}) : next();
    }},
    {meta: {home: 'home'}, path: '/home', name: 'homePage', component: HomePage, beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ path: '/login', query: { redirect: to.fullPath } });
    }},
    {meta: {home: 'home'}, path: '/chats', name: 'chats', component: ChatPage, beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ path: '/login', query: { redirect: to.fullPath } });
    }},
    {meta: {home: 'fade-up'}, path: '/notifications', name: 'notif', component: NotificationsPage, beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ path: '/login', query: { redirect: to.fullPath } });
    }},
    {meta: {home: 'home'}, path: '/profile', name: 'profile', component: ProfilePage, beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ path: '/login', query: { redirect: to.fullPath } });
    }},
    {meta: {home: 'home'}, path: '/profile/:username', name: 'profile-guest', component: ProfilePageGuest, beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ path: '/login', query: { redirect: to.fullPath } });
    }},
    {meta: {home: 'home'}, path: '/post/detail', name: 'post-detail', component: PostDetailPage, beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ path: '/login', query: { redirect: to.fullPath } });
    }},
  ];
  const checkAuth = () => {
    const jwtCookie = Cookies.get('jwt2');
    const expirationDate = new Date(Cookies.get('tokenExpirationDate'));
    const userId = Cookies.get('UID');
    const Auth = useUser();
    if(jwtCookie) {
      if(new Date().getTime() < expirationDate.getTime()) {
        // logged in
        if(!Auth.state.isLogin){
          Auth.getUserData();
        }
        return true;
      } else {
        // logged out
        return false;
      }
      return true;
    } else {
      // no token
      return false
    }
  };
