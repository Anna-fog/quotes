<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Header from './components/Header/Header.vue'
import TheTumbleweed from '@/components/TheTumbleweed.vue'

const router = useRouter()
</script>

<template>
  <div class="app-wrapper">
    <Header/>
    <RouterView/>
    <the-tumbleweed v-if="router.currentRoute.value.name?.includes('random')"/>
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
