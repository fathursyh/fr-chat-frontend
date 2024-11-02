<template>
  <div>
    <div
      @click="userMenu = !userMenu"
      class="fixed z-30 top-6 right-4 bg-white/15 rounded-full active:bg-green-400/50 p-2"
    >
      <svg
        class="w-10 h-10 text-white dark:text-white"
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
          stroke-width="2"
          d="M12 6h.01M12 12h.01M12 18h.01"
        />
      </svg>
    </div>
    <transition name="fade" mode="in-out">
      <div
        class="w-44 h-28 max-h-fit bg-white fixed z-40 right-14 top-16 rounded shadow"
        v-show="userMenu"
      >
        <ul
          class="w-full h-full flex flex-col text-lg font-Poppins font-semibold justify-center items-center gap-4"
        >
          <li class="hover:text-blue-500 cursor-pointer" @click="''">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white inline"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
                clip-rule="evenodd"
              />
            </svg>

            Setting
          </li>
          <li class="hover:text-blue-500 cursor-pointer" @click="logout">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white inline"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 19V5h4a1 1 0 0 1 1 1v11h1a1 1 0 0 1 0 2h-6Z" />
              <path
                fill-rule="evenodd"
                d="M12 4.571a1 1 0 0 0-1.275-.961l-5 1.428A1 1 0 0 0 5 6v11H4a1 1 0 0 0 0 2h1.86l4.865 1.39A1 1 0 0 0 12 19.43V4.57ZM10 11a1 1 0 0 1 1 1v.5a1 1 0 0 1-2 0V12a1 1 0 0 1 1-1Z"
                clip-rule="evenodd"
              />
            </svg>
            Logout
          </li>
        </ul>
      </div>
    </transition>
    <profile-header @click="userMenu = false"></profile-header>
    <div class="pb-28 pt-2" @click="userMenu = false">
      <spinning v-if="!Post.posts.profileLoad"></spinning>
      <posts v-else :postList="postsData"></posts>
    </div>
  </div>
</template>

<script setup>
import ProfileHeader from "../profile/ProfileHeader.vue";
import Spinning from "../indicators/Spinning.vue";
import Posts from "../social/Posts.vue";
import { usePost } from "@/stores/post";
import { computed, onMounted, onUpdated, ref } from "vue";
import { useUser } from "@/stores/auth";
import { useRouter } from "vue-router";
const Post = usePost();
const User = useUser();

const userMenu = ref(false);
const router = useRouter();

const fetchData = async () => {
  try {
    setTimeout(async() => {
      await Post.getPostFromUserId(User.state.userData.id);
    }, 600);
  } catch (e) {
    console.error(e);
  }
};
const postsData = computed(() => {
  return Post.posts.profilePosts || [];
});

const logout = () => {
  User.userLogout();
  router.push("/");
};

onMounted(async () => {
  if (!Post.posts.profileLoad) {
    fetchData();
  }
});
onUpdated(async () => {
  if (!Post.posts.profileLoad) {
    fetchData();
  }
});
</script>
