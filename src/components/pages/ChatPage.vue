<template>
    <div class="h-screen flex flex-col gap-10 justify-center items-center">
        <!-- <component :is="component[getRoute]" @changeComponent="changeComponent = $event"></component> -->
         <h1 class="font-Poppins font-bold max-w-[60%] text-center">Feature is still under working progress 😎</h1>
    </div>
</template>

<script setup>

    import { computed, onMounted, ref } from 'vue';
    import Chat from '../chats/bubble/Chat.vue';
    import ContactList from '../chats/ChatList.vue'
    import { socket } from '@/socket';
    const component = {
        'chatlist': ContactList,
        'chat': Chat,
    }
    
    const changeComponent = ref('chatlist');

    const getRoute = computed(()=>{
        return changeComponent.value;
    });

    const online = ref(false);

    // onMounted(()=>{
    //     if(online.value === false) {
    //         socket.connect();
    //         const userId = Math.floor(Math.random() * 2);
    //         console.log(userId);
    //         socket.emit('user connected', userId);
    //         online.value = true;
    //     }
    // })
</script>