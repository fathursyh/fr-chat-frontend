<template>
  <!-- Main modal -->
  <div
    id="crud-modal"
    class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/80" @keyup.esc="closeModal"
  >
  <div class="w-full h-full absolute bg-transparent" @click="closeModal"></div>
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-2xl font-Sniglet w-full text-center text-gray-900 dark:text-white">
            {{ State.alert.addModal.edit? 'Edit Post' : 'Create new post' }}
          </h3>
          <button
            type="button" @click="closeModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form class="p-4 md:p-5" @submit.prevent="State.alert.addModal.edit? edit() : add()">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <textarea v-model="postData.body"
                id="postBody"
                name="body"
                rows="4"
                class="block p-2.5 w-full text-base font-medium text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What's on your mind?"
              ></textarea>
            </div>
          </div>
          <div class="w-full flex justify-center">
            <button
              type="submit"
              class="text-white inline-flex items-center bg-green-500 font-medium rounded-lg text-base px-10 py-2.5 text-center"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useUser } from '@/stores/auth';
  import { usePost } from '@/stores/post';
  import { useState } from '@/stores/state';
  import { onMounted, reactive } from 'vue';

  const Auth = useUser();
  const Post = usePost();
  const State = useState();
  const postData = reactive({
    id: '',
    body: '',
  });

  const closeModal = () => {
    State.state.postMenuId = '';
    State.alert.addModal.edit = false;
    State.alert.addModal.pop = false;
    State.alert.addModal.body = '';
  }
  
  onMounted(() => {
    if(State.alert.addModal.edit) {postData.body = State.alert.addModal.body};
    setTimeout(() => {
      postData.id = Auth.state.userData.id;
    }, 400);
  });

  const add = async() => {
    const newPost = await Post.addNewPost(postData.id, postData.body);
    if(newPost == 'ok') {
      State.showMessageToast(true, 'Post added successfully')
    } else {
      State.showMessageToast(false, 'Post failed to be added')
    }
    closeModal();
    postData.body = '';
  }

  const edit = async() => {
    if(postData.body !== State.alert.addModal.body) {
      const edit = await Post.editPost(State.state.postMenuId, postData.body);
      if(edit) {
        State.showMessageToast(true, 'Post edited successfully')
      } else {
        State.showMessageToast(false, 'Post failed to be edited')
      }
    }
    closeModal();
    State.alert.addModal.edit = false;
    postData.body = '';
  };


</script>