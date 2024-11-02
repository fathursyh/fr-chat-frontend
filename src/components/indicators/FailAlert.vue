<template>
  <div v-if="State.alert.danger.pop"
    class="p-4 mb-4 text-base w-screen text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute top-12 z-40 text-center"
    role="alert"
  >
    <span class="font-medium">{{ State.alert.danger.subject }}</span> {{ State.alert.danger.text }}
  </div>
</template>

<script setup>
    import { useState } from '@/stores/state';
    const State = useState();
</script>