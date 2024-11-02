<template>
  <div>
    <button @click="connect" class="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Connect</button>
    <button @click="disconnect" class="focus:outline-none text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Disconnect</button>

  </div>
</template>

<script setup>
  import { socket } from "@/socket";

  const connect = () => {
    socket.connect();
  };
  const disconnect = () => {
    socket.disconnect();
  };
</script>