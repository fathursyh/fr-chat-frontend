import { defineStore } from 'pinia'
// import { computed, reactive } from 'vue';
// import { state, socket } from '@/socket';
// import { decrypt, encrypt } from "../../encrypt";
// import { useUser } from './auth';

// export const useChat = defineStore('chat', () => {
//   const chat = reactive({
//     messages: [],
//     message: '',
//     room: '',
//   });
  
//   const User = useUser();
//   const getMessage = computed(() => chat.messages);

//   const joinRoom = (room) => {
//     socket.emit('join room', room, User.user.id);
//     chat.room = room;
//   };

//   const fetchMessage = () => {
//     console.log('Fetching message');
//     socket.emit('fetch messages');
//     socket.on('get messages', (data)=>{
//       chat.messages = data;
//       console.log(data);
//     })
//   }

//   const sendMessage = async() => {
//     if(state.state.connected) {
//       const enkripsi = await encrypt(chat.message);
//       socket.emit('chat message', enkripsi, );
//     }
//     chat.message = '';
//    };

//    const decryptMessage = async(msg) => {
//     const dekripsi = await decrypt(msg.ciphertext, msg.iv, msg.key)
//     chat.messages.push(dekripsi);
//    };

//   return {joinRoom, chat, fetchMessage, getMessage, sendMessage, decryptMessage}
// });