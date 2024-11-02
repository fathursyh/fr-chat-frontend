import { defineStore } from 'pinia'
import { computed, reactive } from 'vue';

export const useState = defineStore('state', () => {
  const state = reactive({
    connected: false,
    homePosition: 'feed',
    postMenu : false,
    postMenuId: '',
    postMenuBelong: '',
    postMenuLike: false,
    postMenuEdit: true,
    deleteConfirm : false,
  });

  const alert = reactive({
    welcome: false,
    danger: {
      pop: false,
      subject: '',
      text: ''
    },
    addModal: {
      pop: false,
      edit: false,
      body: '',
    },
    MessageToast: {
      pop: false,
      success: false,
      text: ''
    }
  })

  const showMessageToast = (status, text) => {
    alert.MessageToast.text = text;
    alert.MessageToast.success = status
    alert.MessageToast.pop = true;
    setTimeout(() => {
      alert.MessageToast.pop = false;
    }, 1400);
  }

  const showDanger = (subject, text) => {
    alert.danger.subject = subject;
    alert.danger.text = text;
    alert.danger.pop = true;
    setTimeout(() => {
      alert.danger.pop = false;
      alert.danger.subject = '';
      alert.danger.text = '';
    }, 4000);
  }

  const status = computed(()=>state.connected);


  const changeState = () => {
    state.connected = !state.connected;
  };

  return {alert, state, status, changeState, showMessageToast, showDanger};
  
});