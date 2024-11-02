<template>
  <div>
    <post-menu-detail
      :active="open"
      :editable="limit"
      :postData="post"
      v-if="post"
      @onLike="likePost"
      @closeMenu="open = false"
      @onEdit="openEdit"
    ></post-menu-detail>
    <div class="p-4 z-40 fixed bg-white w-full">
      <div class="flex gap-2 cursor-pointer items-center" @click="$router.back">
        <svg
          class="w-6 h-6 text-gray-600 inline"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>

        <p class="text-xl font-Poppins font-bold text-gray-600">Post</p>
      </div>
    </div>
    <div
      class="h-screen w-full bg-gray-100 relative pt-14"
      v-if="loadingStatus"
    >
      <div
        class="grid grid-rows-5 min-h-24 w-full bg-white z-30 divide-y-2 shadow relative"
      >
        <div
          class="row-span-1 flex justify-start p-4 gap-3 bg-maroon-theme text-white font-Poppins"
        >
          <img
            @click="
              post.userId._id === User.state.userData.id
                ? $router.replace('/profile')
                : $router.push(`/profile/${post.userId.username}`)
            "
            class="w-10 h-10 rounded-full cursor-pointer"
            :src="
              post.userId.profilePicture
              ? User.readPP(post.userId.profilePicture)
                : '/person.jpg'
            "
            alt="Neil image"
          />
          <div
            @click="
              post.userId._id === User.state.userData.id
                ? $router.replace('/profile')
                : $router.push(`/profile/${post.userId.username}`)
            "
            class="cursor-pointer"
          >
            <p class="text-sm mb-1">{{ post.userId.fullName }}</p>
            <p class="text-xs italic text-indigo-400">
              @{{ post.userId.username }}
            </p>
          </div>
          <button
            v-show="!isFriend && post.userId._id !== User.state.userData.id"
            @click="addFriend"
            class="font-Poppins ms-auto my-auto px-6 bg-gradient-to-l from-indigo-400 to-blue-800 rounded-lg text-xs text-white h-8"
          >
            + Add friend
          </button>
        </div>
        <div id="contents" class="row-span-2 p-4 text-pretty relative">
          <div
            @click="open = !open"
            aria-label="menu dots"
            class="absolute right-6 bottom-2 active:bg-gray-500 rounded-full"
          >
            <svg
              class="w-8 h-8 text-gray-600 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="3"
                d="M6 12h.01m6 0h.01m5.99 0h.01"
              />
            </svg>
          </div>
          <!-- CONTENT! -->
          <div v-if="edit" class="flex items bg-red-400">
            <textarea
              autofocus
              class="p-2.5 w-10/12 text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-Poppins"
              v-model="editedText"
            ></textarea>
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              @click="editPost"
            >
              Post
            </button>
          </div>
          <p
            v-else
            class="text-pretty text-base font-Poppins"
            v-html="post.content.replace(/\n/g, '<br>')"
          ></p>
        </div>
        <div class="row-span-1 flex items-center justify-center font-Sniglet">
          <!-- TANGGAL -->
          <p class="text-gray-500">
            {{ format(new Date(post.createdAt), "h:mm a") }}
            <span class="mx-2">❤</span>
            {{ format(new Date(post.createdAt), "dd MMM yy") }}
          </p>
        </div>
        <div
          class="row-span-1 px-6 flex flex-row justify-around items-center font-Poppins text-base tracking-wide"
        >
          <!-- LIKE COMMENT -->
          <p
            class="p-2 cursor-default"
            :class="
              likes.some((like) => like.userId == User.state.userData.id)
                ? 'text-red-500'
                : 'text-gray-600'
            "
          >
            <strong>{{ !likes ? "0" : likes.length }}</strong> LIKES
          </p>
          <p
            class="text-gray-500 p-2 cursor-pointer active:text-blue-500 active:ring-2"
            @click="showComment = !showComment"
          >
            <strong>{{ !post.comments ? "0" : post.comments.length }}</strong>
            COMMENTS
          </p>
        </div>
      </div>
      <!-- COMMENTS PLACE -->
      <transition
        :name="showComment ? 'slide-top' : 'slide-bottom'"
        mode="in-out"
      >
        <div class="pb-24 z-0 absolute" v-if="showComment">
          <comments :comments="comments" @addComment="newComment"></comments>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
  import PostMenuDetail from "./PostMenuDetail.vue";
  import Comments from "./Comments.vue";
  import { usePost } from "@/stores/post";
  import { computed, onBeforeMount, onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { format } from "date-fns";
  import { useUser } from "@/stores/auth";
  import { useState } from "@/stores/state";
  import { socket } from "@/socket";
  const route = useRoute();
  const Post = usePost();
  const User = useUser();
  const State = useState();
  const open = ref(false);
  const post = ref();
  const comments = ref();
  const loadingStatus = ref(false);
  const showComment = ref(false);
  const edit = ref(false);
  const editedText = ref();

  const isFriend = ref(true);

  const fetchData = async () => {
    const { postId } = route.query;
    await Post.getPostDetail(postId)
      .then((data) => {
        post.value = data;
        comments.value = post.value.comments;
        editedText.value = post.value.content;
        if (User.state.userData.id) {
          if (!User.state.userData.friends.includes(data.userId._id)) {
            isFriend.value = false;
          }
        }
      })
      .catch((err) => console.error(err)).finally(()=>{
        if(post.value) loadingStatus.value = true;
      })
  };
  const likes = computed(() => {
    if (post.value.likes) return post.value.likes;
  });
  const likePost = async () => {
    await Post.likePost(User.state.userData.id, post.value._id);
    open.value = false;
    fetchData();
  };
  const openEdit = () => {
    edit.value = true;
    open.value = false;
  };

  const editPost = async () => {
    if (post.value.content === editedText.value) {
      edit.value = false;
      return null;
    } else {
      const editing = await Post.editPost(post.value._id, editedText.value);
      if (editing === true) {
        State.showMessageToast(true, "Post edited successfully");
        fetchData();
        edit.value = false;
      } else {
        State.showMessageToast(false, "Post failed to be edited");
        edit.value = false;
      }
    }
  };
  const newComment = async (comment) => {
    await Post.addComment(User.state.userData.id, post.value._id, comment);
    fetchData();
  };

  const limit = computed(() => {
    if (post.value) {
      const now = new Date();
      const postDate = new Date(post.value.createdAt);
      if (postDate.getDate() + 1 <= now.getDate()) {
        return false;
      } else {
        return true;
      }
    }
  });

  const addFriend = () => {
    User.addFriend(User.state.userData.id, post.value.userId._id);
    isFriend.value = true;
    State.showMessageToast(true, "Friend request has been sent.");
  };

  onBeforeMount(async () => {
    fetchData();
  });

  socket.on("new notif", () => {
    fetchData();
  });
</script>
