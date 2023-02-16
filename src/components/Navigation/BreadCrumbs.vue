<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuotesStore } from "@/stores"
import { computed } from "vue"
import type { Quote } from "@/models/Quotes"

const router = useRouter()

const store = useQuotesStore()

const props = defineProps({
  filter: {
    type: String,
    required: false
  },
  pageName: {
    type: String,
  },
})

const authorName = computed(() => router.currentRoute.value.meta.author)

const filteredQuotes = computed((): Quote[] => store.filteredQuotes as [])

const goToPage = (author: string) => {
  if (router.currentRoute.value.name?.toString().includes('random') && author !== 'author') {
    location.reload()
  } else {
    router.push({ name: authorName.value as string })
  }
}

const currentPageName = computed(() => {
  if (router.currentRoute.value.name === 'books' || router.currentRoute.value.name === 'themes') {
    return router.currentRoute.value.params.id
  } else return props.pageName
})

const quotesAuthorName = computed(() => {
  return authorName.value && store.getAuthor(authorName.value as string)?.name
})

</script>

<template>
  <div class="quotes__breadcrumbs">
    <router-link to="/">главная /</router-link>
    <a v-if="quotesAuthorName" @click="goToPage('author')">{{ quotesAuthorName }} /</a>
    <a @click="goToPage">{{ currentPageName }}</a>
    <a v-if="props.filter && filteredQuotes?.length" @click.prevent href="">
       / {{ props.filter }} ({{ filteredQuotes.length }})
    </a>
  </div>
</template>

<style scoped lang="scss">
.quotes__breadcrumbs {
  margin-bottom: 30px;

  a {
    margin-right: 2px;
    color: var(--color-light-text);
    cursor: pointer;
  }
}
</style>