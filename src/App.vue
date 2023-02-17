<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRouter } from 'vue-router'
import Header from './components/Header/Header.vue'
import TheTumbleweed from '@/components/AnimatedImages/TheTumbleweed.vue'
import OakLeaf from '@/components/AnimatedImages/OakLeaf.vue'

const router = useRouter()

const showTumbleweed = computed(() => {
  return router.currentRoute.value.name === 'random'
})

const showOakLeaf= computed(() => {
  return router.currentRoute.value.name === 'nisargadatta random' || router.currentRoute.value.name === 'all random'
})
</script>

<template>
  <div class="app-wrapper">
    <Header/>
    <RouterView/>
    <the-tumbleweed v-if="showTumbleweed"/>
    <oak-leaf v-if="showOakLeaf"/>
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  color: var(--color-main-text);
  min-height: 100vh;
  padding-bottom: 30px;
  background-color: var(--color-background);
}
</style>
