<script setup lang="ts">
import { computed } from "vue";
import AuthorsMenu from '@/components/Navigation/AuthorsMenu.vue'

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

    <Transition appear>
      <img src="@/assets/images/image_nav_page.jpg" class="main__image">
    </Transition>

  </main>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;

  &__image {
    margin-top: 40px;
    margin-left: 10px;
    height: 500px;
    width: auto;
    filter: saturate(0.7);
    border-radius: 4px;

    @media (max-width: 720px) {
      width: 40%;
      height: fit-content;
    }
  }
}
</style>
