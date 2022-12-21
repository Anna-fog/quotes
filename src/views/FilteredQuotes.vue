<script setup lang="ts">
import { allQuotes } from "@/data/quotes";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  pageName: String
})

const numberOfPictures = 35
const randomPicture = computed(() => {
  return `/src/assets/images/random/image_${Math.floor(Math.random() * numberOfPictures) + 1}.jpg`
})

const filter = computed(() => router.currentRoute.value.query.filter)

const filteredQuotes = ref()

const filterAllQuotes = () => {
  filteredQuotes.value = allQuotes.filter(item => item.text.includes(filter.value))
}

const filterBooks = () => allQuotes.filter(item => item.bookName === router.currentRoute.value.params.id)

const filterTags = () => allQuotes.filter(item => {
  return item.tags.includes(router.currentRoute.value.params.id.toString().toLowerCase())
})

const nothingFoundResponse = computed(() => {
  const numberOfWords = filter.value?.includes(' ') ? 'словами' : 'словом'
  return `Ничего со ${numberOfWords} "${filter.value}" не найдено :(`
})

const chooseRandomQuote = () => [allQuotes[Math.floor(Math.random() * allQuotes.length)]];

const currentPage = computed(() => {
  if (router.currentRoute.value.name === 'books' || router.currentRoute.value.name === 'themes') {
    return router.currentRoute.value.params.id
  } else return props.pageName
})

const quotes = computed(() => {
  if (filter.value && !filteredQuotes.value?.length) return

  if (filter.value && filteredQuotes.value?.length) {
    return filteredQuotes.value
  } else if (router.currentRoute.value.name === 'books') {
    return filterBooks()
  } else if (router.currentRoute.value.name === 'themes') {
    return filterTags()
  } else if (router.currentRoute.value.name === 'random') {
    return chooseRandomQuote()
  } else {
    return allQuotes
  }
})

const handlePathClick = () => {
  router.currentRoute.value.name === 'random' && filterAllQuotes()
}

watch(filter, () => {
  filterAllQuotes()
})

onMounted(() => {
  filterAllQuotes()
})
</script>

<template>
  <div class="quotes container">
    <div class="quotes__main">
      <div class="quotes__breadcramps">
        <router-link to="/">главная /</router-link>
        <a @click="handlePathClick">{{ currentPage }}</a>
        <a v-if="filter && filteredQuotes?.length" @click.prevent href="">/ {{ filter }}</a>
      </div>
      <ul>
        <li v-for="quote in quotes" :key="quote.id">
          {{ quote.text }} <br>
          <div> {{ quote.details }} </div>
        </li>
      </ul>
      <div v-if="filter && !filteredQuotes?.length">{{ nothingFoundResponse }}</div>
    </div>
    <img class="quotes__image" :src="randomPicture" alt="image">
  </div>
</template>

<style lang="scss" scoped>
.quotes {
  margin: 40px auto;
  display: flex;
  justify-content: space-between;

  li {
    list-style: none;
    margin-bottom: 20px;

    &:after {
      content: '***';
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }

    &::selection {
      background-color: var(--limes-spuce);
    }

    div {
      margin-top: 6px;
      font-style: italic;
      opacity: .7;
    }
  }

  &__main {
    padding-right: 40px;
  }

  &__breadcramps {
    margin-bottom: 30px;

    a {
      margin-right: 6px;
      color: rgba(167, 186, 190, 0.6);
      cursor: pointer;
    }
  }

  &__image {
    min-width: 330px;
    width: 330px;
    height: fit-content;
    margin-top: 50px;
    border-radius: 4px;
    filter: saturate(0.7);
  }
}
</style>