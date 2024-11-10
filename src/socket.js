import { io } from "socket.io-client";
import { useState } from "./stores/state";
import { createPinia } from "pinia";
import { usePost } from "./stores/post";
import { useUser } from "./stores/auth";

const URL = "https://fathursyh.my.id";

export const socket = io(URL, {
  withCredentials: true,
  autoConnect: true,
    reconnection: true,
  timeout: 5000,
});

// on connect event handler
socket.on("connect", () => {
  const State = useState();
  const User = useUser();
  State.changeState();
  setTimeout(async() => {
    try {
      socket.emit('user connected', User.state.userData.id);
    } catch (err) {await User.getUserData();}
  }, 400);

  socket.on("new notif", (data) => {
    data.type === 'like' ?
      User.notifications.likes.push(data)
      : 
      User.notifications.comments.push(data)
    User.notifications.all.unshift(data);
    State.showMessageToast(true, '1 new notification')
  })
  
  socket.on("new friend request", (notif) => {
    User.notifications.all.unshift(notif);
    State.showMessageToast(true, '1 new friend request');
  });

  socket.on("accept response", (data) => {
    State.showMessageToast(true, `You are now friends with ${data}`);
  });
  
});
// on disconnect event handler
// socket.on("disconnect", () => {
//   State.changeState();
// });


// socket.on('getMessage', async(msg) => {
//   const chat = useChat()
//   chat.decryptMessage(msg);
// });




