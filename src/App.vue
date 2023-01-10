<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="app-wrapper">
    <Header/>
    <RouterView/>
    <img
      v-if="router.currentRoute.value.name === 'random'"
      src="@/assets/images/tumbleweed.png"
      class="tumbleweed"
      alt="">
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  color: var(--color-main-text);
  min-height: 100vh;
  background-color: var(--color-background);
}

.tumbleweed {
  position: absolute;
  left: -100px;
  bottom: 0;
  width: 100px;
  height: auto;
  animation: wind ease-in-out 5s;

  @media (max-width: 560px) {
    bottom: 50px;
  }
}

@keyframes wind {
  0% {
    left: -100px;
    transform: rotate(0);
  }
  99% {
    display: block;
  }
  100% {
    left: calc(100% + 100px);
    transform: rotate(380deg);
    display: none;
  }
}
</style>
