<template>
  <div
    class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] bg-black/40"
    v-if="State.alert.MessageToast.pop"
  >
    <!-- SUCCESS -->
    <div
      v-if="State.alert.MessageToast.success"
      class="flex items-center w-full max-w-xs p-4 py-6  space-x-4 rtl:space-x-reverse text-gray-800 bg-gray-50 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow fixed"
      role="alert"
    >
      <svg
        class="w-6 h-6 text-green-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 11.917 9.724 16.5 19 7.5"
        />
      </svg>
      <div class="ps-4 text-sm font-normal">{{ State.alert.MessageToast.text }} 😊</div>
    </div>
    <!-- FAILED -->
    <div
      v-else
      class="flex items-center w-full max-w-xs p-4 py-6 space-x-4 rtl:space-x-reverse text-gray-800 bg-gray-50 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow fixed"
      role="alert"
    >
      <svg
        class="w-6 h-6 text-red-500 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      </svg>

      <div class="ps-4 text-sm font-normal">{{ State.alert.MessageToast.text }} 😢</div>
    </div>
  </div>
</template>

<script setup>
  import { useState } from "@/stores/state";
  const State = useState();
</script>
