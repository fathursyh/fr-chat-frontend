import { defineStore } from "pinia";
import { onUpdated, reactive } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import { usePost } from "./post";
import { socket } from "@/socket";

export const useUser = defineStore('user', () => {
const serverURL = 'https://d0468pxs-3006.asse.devtunnels.ms';
  const Post = usePost();
  /* *********** STATE ************ */
  const state = reactive({
    token: null,
    tokenExpirationDate: null,
    userData: {},
    isLogin: false,
    welcome: true,
  })
  //
  const notifications = reactive({
    comments: [],
    likes: [],
    all: [],
  })

  /* *********** MUTATIONS ************ */
  const setToken = (idToken) => {
    state.token = idToken;
    state.tokenExpirationDate = (new Date(Date.now() + 24 * 60 * 60 * 1000)).toISOString();
    Cookies.set('tokenExpirationDate', state.tokenExpirationDate, {expires: 1});
    Cookies.set('jwt2', state.token, {expires: 1});
  };
  const setUserLogin = ({userData, loginStatus}) => {
    state.userData = userData;
    state.isLogin = loginStatus
  };
  const setUserLogout = () => {
    state.token = null;
    state.userData = {};
    state.isLogin = false;
    state.tokenExpirationDate = null;
    Cookies.remove('jwt');
    Cookies.remove('jwt2');
    Cookies.remove('tokenExpirationDate');
    Cookies.remove('UID');
    localStorage.removeItem('user');
  };

  /* *********** ACTIONS ************ */
  // REGISTER LOGIC
  const getUserRegister = async(payload) => {
    try {
      const response = await axios.post(`${serverURL}/api/users/register/verify`,{
        email: payload.email, password: payload.password, username: payload.username, bio: payload.bio
      }, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      })
      return response.status === 200 ? true : false;
    } catch(err) {}
  };

  // LOGIN LOGIC
  const getUserLogin = async(payload) => {
    try {
      const response = await axios.post(`${serverURL}/api/users/login/verify`, {
        email: payload.email, password: payload.password
      },
    {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    }
  );
      if (response.data == 'failed') {
        return 401;
      }
      else {
        Cookies.set('UID', response.data.userData.id, {expires: 1});
        setToken(response.data.token);
        setUserLogin({userData: response.data.userData, isLogin: true});
        state.isLogin = true;
        return 200;
      }
    } catch (err) {
      return 500;
    }
  };

  // LOGOUT
  const userLogout = () => {
    alert('Goodbye!');
    setUserLogout();
  }
// PERSISTENT LOGIN
  const getUserData = async() => {
    notifications.likes = [];
    notifications.comments = [];
    try {
      const response = await axios.get(`${serverURL}/api/users/login/getUser`,
        {
          withCredentials: true,
        }
      );
      state.userData = response.data.userData;
      notifications.all = response.data.notifications;
      state.isLogin = true;
    } catch (err) {
      console.log(err);
    }
  };

  /* VALIDATIONS SECTION */
  const checkEmail = async(email) => {
    const result = await axios.post(`${serverURL}/api/users/register/checkEmail`, {email: email},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    if(result.data.message == 'taken') {
      return true;
    } else {
      return false;
    }
  };
  const checkUsername = async(username) => {
    const result = await axios.post(`${serverURL}/api/users/register/checkUsername`, {username: username}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    if (result.data.message == 'taken') {
      return true;
    } else {
      return false;
    }
  };
  /* END OF VALIDATIONS */

  // EDIT
  const editData = async(email, payload, key) => {
    await axios.patch(`${serverURL}/api/users/profile/edit`, {
      email: email,
      data: payload,
      key: key
    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(async()=>{
      await getUserData()
      Post.posts.profileLoad = false;
    });
  };

  const addFriend = async(id, friendId) => {
    console.log('send new fr');
    socket.emit('friend request', {id, friendId});
    Post.updated();
  }

  const uploadPP = async(formdata) => {
    const upload = await axios.post(`${serverURL}/api/posts/uploadProfilePicture`, formdata, {headers: {"Content-Type": 'multipart/form-data'}, withCredentials: true});
    if (upload) {
      Post.updated();
      return true;
    } else {
      return false;
    }
  };

  const readPP = (image) => {
    const imageData = `data:${image.contentType};base64,${image.data}`;
    return imageData;
  };

  const markNotif = async(notifId) => {
    socket.emit('seen notif', notifId);
  }

  return {state, notifications, setToken, getUserRegister, getUserLogin, userLogout, getUserData, checkEmail, checkUsername, editData, markNotif, uploadPP, addFriend, readPP};
});