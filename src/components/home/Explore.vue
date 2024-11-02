<template>
  <div class="pb-28">
    <spinning v-if="!Post.posts.exploreLoad" class="h-[80dvh]"></spinning>
    <posts v-if="Post.posts.exploreLoad" :postList="postData"></posts>
  </div>
</template>

<script setup>
  import Spinning from '../indicators/Spinning.vue'
  import { computed, onMounted, onUpdated, ref } from 'vue';
  import Posts from '../social/Posts.vue'
  import { usePost } from '@/stores/post';
  const Post = usePost();

  const postData = computed(() => {
    return Post.posts.allPosts;
  });

  onMounted(async()=>{
    await Post.getAllPosts();
  });
  
  onUpdated(async()=>{
    if(!Post.posts.exploreLoad) {
      await Post.getAllPosts();
    }
  });

</script>