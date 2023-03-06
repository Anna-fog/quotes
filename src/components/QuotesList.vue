<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { Quote } from "@/models/Quotes";
import { useQuotesStore } from "@/stores";
import { useRouter } from "vue-router";

const router = useRouter()

const authorName = computed(() => router.currentRoute.value.meta.author)

const store = useQuotesStore()

const filter = computed(() => {
  return router.currentRoute?.value.query?.filter
    ? router.currentRoute?.value.query?.filter.toString().toLowerCase()
    : ''
})

const quotes = computed(() => {
  return store.quotesToShow(filter.value, router.currentRoute.value, authorName.value as string)
})

const filteredQuotes = computed((): Partial<Quote>[] => store.filteredQuotes as [])

const nothingFoundResponse = computed(() => {
  const numberOfWords = filter.value?.includes(' ') ? 'словами' : 'словом'
  return `Ничего со ${numberOfWords} "${filter.value}" не найдено`
})

onMounted(() => {
  store.filterValue = filter.value
  store.filterQuotes(authorName.value as string)
})
</script>

<template>
  <ul class="quotes-list">
    <li v-for="quote in quotes" :key="quote?.id" class="quotes-list__item">
      <pre>{{ quote?.text }}</pre>
      <div v-if="quote?.details"> {{ quote.details }} </div>
    </li>
  </ul>

  <div v-if="filter && !filteredQuotes?.length">{{ nothingFoundResponse }}</div>
  <div v-else-if="!filter && !quotes?.length">Раздел в процессе разработки, скоро здесь что-нибудь появится</div>
</template>

<style scoped lang="scss">
.quotes-list {
  @media (max-width: 1180px) {
    padding-top: 40px;
  }

  @media (max-width: 560px) {
    padding-top: 54px;
  }

  &__item {
    list-style: none;
    margin-bottom: 20px;

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }

    @media (max-width: 560px) {
      font-size: 17px;
      line-height: 22px;
    }

    &:after {
      content: '***';
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }

    &::selection {
      background-color: var(--color-selection);
    }

    div {
      margin-top: 6px;
      font-style: italic;
      opacity: .7;
    }
  }
}

</style>