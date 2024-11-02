<template>
  <div>
    <button v-if="!isFriend && !isLoading"
      @click="addFriend"
      class="fixed z-30 top-6 right-4 bg-gradient-to-l from-indigo-400 to-blue-800 text-white rounded text-sm py-2 px-4"
    > 
     + Add friend
    </button>
    <profile-header-guest :userData="userProfile.user" v-if="!isLoading"></profile-header-guest>
    <div class="bg-gray-50 pb-28">
      <spinning v-if="isLoading" class="h-screen"></spinning>
      <posts v-else :postList="userProfile.posts"></posts>
    </div>
  </div>
</template>

<script setup>
import ProfileHeaderGuest from '../profile/ProfileHeaderGuest.vue'
import Spinning from "../indicators/Spinning.vue";
import Posts from "../social/Posts.vue";
import { usePost } from "@/stores/post";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useUser } from '@/stores/auth';
import { useState } from '@/stores/state';
const Post = usePost();
const User = useUser();
const State = useState();
const route = useRoute();
const isLoading = ref(true);
const userProfile = ref();
const isFriend = ref(false);
const fetchData = async () => {
  try {
    userProfile.value = await Post.getPostFromUsername(route.params.username);
    if (User.state.userData.friends.includes(userProfile.value.user._id)) isFriend.value = true;
  } catch (e) {
    console.error(e);
  } finally {isLoading.value = false}
};

onBeforeMount(async () => {
  fetchData();
});

const addFriend = () => {
  User.addFriend(User.state.userData.id, userProfile.value.user._id);
  isFriend.value = true;
  State.showMessageToast(true, 'Friend request has been sent.')
}
</script>
