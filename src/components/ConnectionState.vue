<template>
  <p :style="{color: state.status?'green' : 'red'}">{{ state.status ? 'Connected' : 'Offline' }}</p>
</template>

<script setup>
  import { state } from '@/socket';
</script>