<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRouter } from 'vue-router'
import TheHeader from './components/Header/TheHeader.vue'
import TheTumbleweed from '@/components/AnimatedImages/TheTumbleweed.vue'
import OakLeaf from '@/components/AnimatedImages/OakLeaf.vue'

const router = useRouter()

const shouldShowTumbleweed = computed(() => {
  return router.currentRoute.value.name === 'random'
})

const shouldShowOakLeaf= computed(() => {
  const routeName = router.currentRoute.value.name
  return routeName === 'nisargadatta random' || routeName === 'all random'
})
</script>

<template>
  <div class="app-wrapper">
    <the-header/>
    <router-view/>
    <the-tumbleweed v-if="shouldShowTumbleweed"/>
    <oak-leaf v-if="shouldShowOakLeaf"/>
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
