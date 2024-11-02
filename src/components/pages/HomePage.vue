<template>
  <div class="overflow-x-hidden h-screen w-screen relative">
    <home-tab @clickTab="selectTab" :current="tab"></home-tab>
    <transition :name="tab === 'feed' ? 'slide-front' : 'slide-back'">
      <component :is="component" class="mt-16"></component>
    </transition>
  </div>
</template>

<script setup>
import HomeTab from "../home/HomeTab.vue";
import { useUser } from "@/stores/auth";
import { useState } from "@/stores/state";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import Explore from "../home/Explore.vue";
import Feed from "../home/Feed.vue";
import { useRoute } from "vue-router";
const User = useUser();
const State = useState();

const tab = ref(State.state.homePosition);
const selectTab = (e) => {
  tab.value = e;
  State.state.homePosition = e;
};
const component = computed(() => {
  return tab.value === "feed" ? Feed : Explore;
});

onMounted(() => {
  if (!User.state.welcome) {
    setTimeout(() => {
      State.alert.welcome = true;
      User.state.welcome = true;
    }, 400);
  } 
});
const route = useRoute();
onBeforeUnmount(() => {
  if (route.name !== "post-detail") {
    State.state.homePosition = "feed";
  }
});
</script>
