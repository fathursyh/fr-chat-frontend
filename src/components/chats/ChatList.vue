<!-- <template>
  <div class="p-6">
    <h3 class="font-Audiowide font-semibold text-2xl text-center my-8 mb-14">Contacts</h3>
    <div>
      <ul
        class="max-w-md max-h-[70vh] divide-y divide-gray-400 dark:divide-gray-500  rounded-md overflow-y-auto"
      >
        <li class="py-5 cursor-pointer active:shadow active:bg-gray-700" @click="menuClicked('chat')" v-for="contact in chatList" :key="contact">
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <div class="flex-shrink-0">
              <img class="w-8 h-8 rounded-full" alt="Neil image" :src="contact.img"/>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-lg font-medium text-gray-300">{{ contact.username }}</p>
              <p class="text-sm text-gray-400 truncate dark:text-gray-400">
                  {{ contact.lastchat }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template> -->

<script setup>
// import { socket } from '@/socket';
// // import { useChat } from '@/stores/chat';

//   const emit = defineEmits(["changeComponent"]);
//   const Chat = useChat();
//   const chatList = [
//     {
//       username: 'user1',
//       lastchat: 'hey aku sedang',
//       img: '/'
//     },
//   ]

//   const fetchChat = () => {
//     const contactId = Math.floor(Math.random() * 3);
//     console.log(contactId);
//     socket.emit('initialize chat', contactId)
//   };

//   const menuClicked = (option) => {
//     if (option == 'chat') {
//       fetchChat();
//     } 
//       emit("changeComponent", option);
//   };
</script>
