<template>
  <tos-content></tos-content>
</template>

<script setup>
import TosContent from '../auth/TosContent.vue'
import { onMounted } from 'vue';
  onMounted(()=>{
    scrollTo({top: 0});
  })
</script>

<style>
#termsService > h2 {
  font-weight: bold;
}
#termsService > p {
  margin-left: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
