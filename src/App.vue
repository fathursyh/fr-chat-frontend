<script setup>
  import DeleteConfirmation from "./components/indicators/DeleteConfirmation.vue";
  import FailAlert from "./components/indicators/FailAlert.vue";
  import MessageToast from "./components/indicators/MessageToast.vue";
  import AddModal from "./components/forms/AddModal.vue";
  import Floating from "./buttons/Floating.vue";
  import BottomNav from "./components/navigation/BottomNav.vue";
  import { computed } from "vue";
  import { useState } from "./stores/state";
  import WelcomeModal from "./components/indicators/WelcomeModal.vue";
  import PostMenu from "./components/social/PostMenu.vue";

  const State = useState();
  const currentAlert = computed(() => {
    if (State.alert.addModal.pop) return AddModal;
    if (State.alert.MessageToast.pop) return MessageToast;
    if (State.alert.danger.pop) return FailAlert;
    if (State.alert.welcome) return WelcomeModal;
  });

</script>

<template>
  <div
    class="min-h-100vh min-w-fit"
    :class="{
      'bg-maroon-theme': ['landingPage', 'register', 'login', 'TOS'].includes(
        $route.name
      ),
    }"
  >
    <delete-confirmation v-if="State.state.deleteConfirm"></delete-confirmation>
    <post-menu></post-menu>
    <router-view v-slot="{ Component, route }">
      <transition
        mode="default"
        :name="route.meta.landing || route.meta.home || route.meta.transition"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <floating
    v-if="!['landingPage', 'register', 'login', 'TOS'].includes($route.name)"
  ></floating>
  <transition name="fade" mode="in-out">
    <component :is="currentAlert"></component>
  </transition>
  <BottomNav
    v-if="!['landingPage', 'register', 'login', 'TOS'].includes($route.name)"
  ></BottomNav>
</template>
