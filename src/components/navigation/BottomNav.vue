<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600" @click="State.state.postMenu = false; State.alert.addModal.pop = false"
  >
    <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
      <router-link
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        to="/home" replace
      >
        <svg
          class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          :fill="page === 'homePage' ? '#456cbf' : 'currentColor'"
          viewBox="0 0 20 20"
        >
          <path
            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
          />
        </svg>
        <span
          class="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500"
          :class="page == 'homePage' ? 'text-blue-600' : 'text-gray-500'"
          >Home</span
        >
      </router-link>
      <router-link
        class="relative inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        to="/chats"
        replace
      >
      <!-- NOTIFICATIONS -->
      <div v-show="chatSum > 0" class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 end-[28%] dark:border-gray-900">8</div>
      <!-- END -->
        <svg
          class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          :fill="page === 'chats' ? '#456cbf' : 'currentColor'"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
            clip-rule="evenodd"
          />
        </svg>

        <span
          class="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500"
          :class="page == 'chats' ? 'text-blue-600' : 'text-gray-500'"
          >Chats</span
        >
      </router-link>
      <router-link
        class="inline-flex relative flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        to="/notifications"
        replace
      >
      <!-- NOTIFICATIONS -->
      <div v-show="notifSum > 0" class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 end-[28%] dark:border-gray-900">{{ notifSum }}</div>
      <!-- END -->
        <svg
          class="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          :fill="page === 'notif' ? '#456cbf' : 'currentColor'"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"
          />
        </svg>

        <span
          class="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500"
          :class="page == 'notif' ? 'text-blue-600' : 'text-gray-500'"
          >Notifications</span
        >
      </router-link>
      <router-link
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        to="/profile"
        replace
      >
        <svg
          class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          :fill="page === 'profile' ? '#456cbf' : 'currentColor'"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
          />
        </svg>
        <span
          class="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500"
          :class="page == 'profile' ? 'text-blue-600' : 'text-gray-500'"
          >{{ username || "profile" }}</span
        >
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { useUser } from "@/stores/auth";
import { useState } from "@/stores/state";
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  const route = useRoute();
  const User = useUser();
  const State = useState();
  const username = computed(() => {
    return User.state.userData.username;
  });

  const notifSum = computed(() => {
    if(User.state.userData) {
      return User.notifications.all.filter(notif => notif.seen === false).length;
    }
  });
  const chatSum = computed(() => {
    if(User.state.userData) return [];
  });
  const page = computed(() => {
    return route.name;
  });
</script>
