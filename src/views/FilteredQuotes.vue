<script setup lang="ts">
import { allQuotes } from "@/data/quotes";
import { computed, onMounted, ref, watch } from "vue";
import router from "@/router";

const props = defineProps({
  pageName: String
})

const numberOfPictures = 26

const randomPicture = computed(() => {
  return `/src/assets/images/image_${Math.floor(Math.random() * numberOfPictures) + 1}.jpg`
})

const filter = computed(() => router.currentRoute.value.query.filter)

const filteredQuotes = ref()

const filterAllQuotes = () => {
  filteredQuotes.value = allQuotes.filter(item => item.text.includes(filter.value))
}

const filterBooks = () => allQuotes.filter(item => item.bookName === router.currentRoute.value.params.id)

const filterThemes = () => allQuotes.filter(item => item.theme === router.currentRoute.value.params.id)

const chooseRandomQuote = () => [allQuotes[Math.floor(Math.random() * allQuotes.length)]];

const currentPage = computed(() => {
  if (router.currentRoute.value.name === 'books' || router.currentRoute.value.name === 'themes') {
    return router.currentRoute.value.params.id
  } else return props.pageName
})

const quotes = computed(() => {
  if (filteredQuotes.value?.length) {
    return filteredQuotes.value
  } else if (router.currentRoute.value.name === 'books') {
    return filterBooks()
  } else if (router.currentRoute.value.name === 'themes') {
    return filterThemes()
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
      </div>
      <ul>
        <li v-for="quote in quotes" :key="quote.id">
          {{ quote.text }} <br>
          {{ quote.details }}
        </li>
      </ul>
    </div>
    <img class="quotes__image" :src="randomPicture" alt="image">
  </div>
</template>

<style lang="scss" scoped>
.quotes {
  padding: 40px 0;
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
    height: 500px;
    width: auto;
    margin-top: 50px;
    filter: saturate(0.7);
  }
}
</style>