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

const isRandomPage = computed(() => {
  return router.currentRoute.value.name?.toString().includes('random')
})

const redirect = (author: string = '') => {
  store.filterValue = ''

  if (isRandomPage.value && author === '') {
    location.reload()
  } else {
    router.push({ name: authorName.value as string })
  }
}

const currentPageName = computed(() => {
  const routerName = router.currentRoute.value.name
  const hasFilteringParams = routerName === 'books' || routerName === 'themes'

  return hasFilteringParams ? router.currentRoute.value.params.id : props.pageName
})

const quotesAuthorName = computed(() => {
  return authorName.value && store.getAuthor(authorName.value as string)?.name
})

</script>

<template>
  <div class="quotes__breadcrumbs">
    <router-link to="/">главная /</router-link>
    <a v-if="quotesAuthorName" @click="redirect('author')">{{ quotesAuthorName }} /</a>
    <a @click="redirect()">{{ currentPageName }}</a>
    <a v-if="props.filter && filteredQuotes?.length" @click.prevent href="">
       / {{ props.filter }} ({{ filteredQuotes.length }})
    </a>
  </div>
</template>

<style scoped lang="scss">
.quotes__breadcrumbs {
  margin-bottom: 30px;

  @media (max-width: 1180px) {
    position: absolute;
    margin-right: 20px;
  }

  a {
    margin-right: 2px;
    color: var(--color-light-text);
    cursor: pointer;
  }
}
</style>