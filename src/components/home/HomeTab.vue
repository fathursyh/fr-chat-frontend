<template>
<div class="fixed top-0 w-full bg-white z-50 border-b-2 border-gray-200 dark:border-gray-700 shadow-md after:block after:h-0.5 after:bg-blue-500 after:w-[45%] after:transition-all after:duration-700"
  :class="{
    'after:ms-[55%]' : current === 'feed' ? false : true
  }"
>
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 justify-around">
        <li class="me-2 active:bg-gray-200 cursor-pointer"
        >
            <a class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 group font-bold"
              @click="emit('clickTab', 'feed')"
            >
              Your Feed
            </a>
        </li>
        <li class="me-2 active:bg-gray-200 cursor-pointer"
        >
            <a class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 group font-bold"
              @click="emit('clickTab', 'explore')"
            >
              Explore
            </a>
        </li>
    </ul>
</div>
</template>

<script setup>

  const emit = defineEmits(['clickTab']);
  const props = defineProps({
    current: {type: String, Required: true}
  });
</script>


<style>

</style>