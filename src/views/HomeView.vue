<script setup lang="ts">
import { computed } from "vue";

import AuthorsMenu from '@/components/Navigation/AuthorsMenu.vue'
import FlipBoxImage from '@//components/AnimatedImages/FlipBoxImage.vue'
import { allQuotes } from "@/data/quotes";

const authors = computed(() => allQuotes.authors)

</script>

<template>
  <main class="main container">
    <Transition appear>
      <div>
        <authors-menu v-for="author in authors" :key="author.id" :author="author"/>
      </div>
    </Transition>

    <Transition>
      <flip-box-image/>
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
}
</style>
