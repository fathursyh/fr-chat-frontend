<template>
  <div class="flex items-start gap-2.5" :class="sender==1? 'justify-start trans' : 'justify-end'">
    <img class="w-8 h-8 rounded-full" :class="sender==2? 'order-1' : null" alt="Jese image" />
    <div class="flex flex-col gap-1 max-w-[320px]">
      <div class="flex items-center gap-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-white" :class="sender==2? 'order-1' : null">{{ sender == 1 ? 'hihi' : 'haha'}}</span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
          >11:46</span
        >
      </div>
      <div
        class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 active:bg-gray-400 rounded-b-xl  dark:bg-gray-700"
        :class="sender==1 ? 'rounded-se-xl' : 'rounded-s-xl'"
      >
        <p class="text-sm font-normal text-gray-900 dark:text-white">
          <slot></slot>
        </p>
      </div>
      <span v-if="sender==1"
        class="text-sm font-normal"
        :class="{
          'text-green-500': true,
        }"
        >Delivered</span
      >
    </div>
  </div>
</template>

<script setup>

  const props = defineProps({
    sender: { type: Number, required: true },
    index: { type: Number, required: true },
    participants: { type: Array, required: true}
  });

  
</script>
