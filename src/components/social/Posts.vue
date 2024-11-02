<template>
  <div class="container h-full w-full py-2 divide-y-2 shadow">
    <div class="w-full max-h-max" v-for="post in postList" :key="post._id">
      <div class="grid grid-cols-6 min-h-24 hover:bg-gray-200">
        <div class="col-span-1 flex justify-center py-2">
          <img
            @click="post.userId._id === User.state.userData.id? $router.replace('/profile') : $router.push(`/profile/${post.userId.username}`)"
            class="w-10 h-10 rounded-full cursor-pointer"
            :src="
              post.userId.profilePicture
                ? User.readPP(post.userId.profilePicture) 
                : '/person.jpg'
            "
            alt="profile picture"
          />
        </div>
        <div
          class="col-span-5 flex flex-col pe-6 py-2 cursor-pointer"
          @click="checkPost(post._id)"
          @click.right.prevent="openMenu(post)"
          @touchstart.prevent="handleTouchStart(post)"
          @touchend.prevent="handleTouchEnd(post._id)"
          @touchcancel.prevent="handleTouchEnd(post._id)"
        >
          <h5
            class="font-semibold text-base font-Poppins flex items-center gap-1"
          >
            {{ post.userId.fullName || "Nama Lengkap" }}
            <span
              class="font-light text-sm ms-1 text-gray-500 font-Sniglet opacity-90"
              >@{{ post.userId.username || "username" }}</span
            ><span class="font-light text-xs ms-auto text-black">{{
              Post.timeAgo(new Date(post.createdAt))
            }}</span>
          </h5>
          <p
            class="text-pretty text-base font-Poppins"
            v-html="post.content.replace(/\n/g, '<br>')"
          ></p>
          <div class="flex flex-row justify-end gap-2 mt-auto">
            <div class="flex flex-row items-center gap-0.5">
              <p class="text-xs font-semibold">
                {{ !post.comments ? "0" : post.comments.length }}
              </p>
              <svg
                class="w-3 h-3 text-gray-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="flex flex-row items-center gap-0.5">
              <p class="text-xs font-semibold">
                {{ !post.likes ? "0" : post.likes.length }}
              </p>
              <svg
                class="w-3 h-3 dark:text-white"
                :class="
                  post.likes.some(
                    (like) => like.userId == User.state.userData.id
                  )
                    ? 'text-red-500'
                    : 'text-gray-600'
                "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { checkHistory } from "@/main";
import { useUser } from "@/stores/auth";
import { usePost } from "@/stores/post";
import { useState } from "@/stores/state";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const Post = usePost();
const User = useUser();
const router = useRouter();
const State = useState();
const props = defineProps({
  postList: { type: Array, required: true },
});

const touchTimer = ref(null);
const isTouchHold = ref(false);

const handleTap = (postId) => {
  checkPost(postId);
};

const handleTouchHold = (post, postBelong, text) => {
  openMenu(post, postBelong, text);
};

const handleTouchStart = (post, postBelong, text) => {
  isTouchHold.value = false; // Reset touch-hold flag
  touchTimer.value = setTimeout(() => {
    isTouchHold.value = true;
    handleTouchHold(post, postBelong, text);
  }, 500);
};

const handleTouchEnd = (postId) => {
  clearTimeout(touchTimer.value);
  if (!isTouchHold.value) {
    handleTap(postId);
  }
  touchTimer.value = null;
};

const getLimit = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  if (postDate.getDate() + 1 <= now.getDate() ) {
    return false;
  } else {
    return true;
  }
};

const openMenu = (post) => {
  State.alert.addModal.body = post.content;
  State.state.postMenu = true;
  State.state.postMenuId = post._id;
  State.state.postMenuBelong = post.userId._id;
  State.state.postMenuLike = post.likes.some(
    (like) => like.userId == User.state.userData.id
  )
    ? true
    : false;
  if (post.userId._id === User.state.userData.id) {
    State.state.postMenuEdit = getLimit(post.createdAt);
  }
};
const checkPost = (id) => {
  Post.posts.postDetail = id;
  router.push({ name: "post-detail", query: { postId: id } });
};
</script>
