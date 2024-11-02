<template>
  <div class="pb-28">
    <spinning v-if="!Post.posts.feedLoad" class="h-[80dvh]"></spinning>
    <posts v-if="Post.posts.feedLoad" :postList="postData"></posts>
  </div>
</template>

<script setup>
   import Spinning from '../indicators/Spinning.vue'
  import { computed, onMounted, onUpdated } from 'vue';
  import Posts from '../social/Posts.vue'
  import { usePost } from '@/stores/post';
  import { useUser } from '@/stores/auth';
  const User = useUser();
  const Post = usePost();

  const postData = computed(() => {
    return Post.posts.feedPosts;
  });

  onMounted(async()=>{
    if(!Post.posts.feedLoad ) {
      setTimeout(async() => {
        await Post.getFeedPosts(User.state.userData.id);
      }, 600);
    }
  });
  
  onUpdated(async()=>{
    if(!Post.posts.feedLoad) {
      await Post.getFeedPosts(User.state.userData.id);
    }
  });



</script>