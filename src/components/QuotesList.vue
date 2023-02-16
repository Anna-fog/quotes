<script setup lang="ts">
import { computed, defineProps, onMounted } from "vue";
import type { Quote } from "@/models/Quotes";
import { useQuotesStore } from "@/stores";
import { useRouter } from "vue-router";

const router = useRouter()

const authorName = computed(() => router.currentRoute.value.meta.author)

const props = defineProps({
  quotes: {
    required: true
  },
  filter: {
    type: String,
    required: false
  },
})

const store = useQuotesStore()

const filteredQuotes = computed((): Partial<Quote>[] => store.filteredQuotes as [])

const nothingFoundResponse = computed(() => {
  const numberOfWords = props.filter?.includes(' ') ? 'словами' : 'словом'
  return `Ничего со ${numberOfWords} "${props.filter}" не найдено`
})

onMounted(() => {
  store.filterValue = props.filter
  store.filterQuotes(authorName.value as string)
})
</script>

<template>
  <ul class="quotes-list">
    <li v-for="quote in props.quotes" :key="quote.id" class="quotes-list__item">
      <pre>{{ quote.text }}</pre>
      <div> {{ quote.details }} </div>
    </li>
  </ul>

  <div v-if="props.filter && !filteredQuotes?.length">{{ nothingFoundResponse }}</div>
  <div v-else-if="!props.filter && !quotes?.length">Раздел в процессе разработки, скоро здесь что-нибудь появится</div>
</template>

<style scoped lang="scss">
.quotes-list {
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