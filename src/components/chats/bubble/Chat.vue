<template>
  <div class="w-full h-16 bg-white flex items-center px-4">
      <svg @click="menuClicked('chatlist')"
        class="w-6 h-6 text-gray-800"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 12h14M5 12l4-4m-4 4 4 4"
        />
      </svg>
    <h2 class="text-black font-semibold font-Audiowide mx-auto"  @click="console.log(Chat.getMessage)">Chat</h2>
  </div>
  <div class="h-[50vh] p-5 flex flex-col gap-4">
    <bubble
      v-for="(message, index) in Chat.getMessage"
      :key="index"
      :sender="message.sender"
      :index="index"
      >{{ message.message }}</bubble
    >
  </div>
</template>

<script setup>
  // import { useChat } from "@/stores/chat";
import Bubble from "./Bubble.vue";
import { onMounted } from "vue";
  const emit = defineEmits(['changeComponent']);

  const menuClicked = (option) => {
    emit('changeComponent', option);
  };
  // const Chat = useChat();
  
  // onMounted(()=>{
  //   Chat.fetchMessage();
  // })

</script>
