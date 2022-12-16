<script setup lang="ts">
import { ref } from 'vue'
import { bookNames } from "@/data/bookNames";
import { themes } from "@/data/themes";

const showBooks = ref(false)
const showThemes = ref(false)

const toggleBooksDropdown = () => {
  showBooks.value = !showBooks.value
}

const toggleThemesDropdown = () => {
  showThemes.value = !showThemes.value
}

const generateRoute = (filter: string, type: string) => {
  return type === 'book' ? `/castaneda/books/${filter}` : `/castaneda/themes/${filter}`
}
</script>

<template>
  <main>
    <nav class="navigation container">
      Карлос Кастанеда
      <ul>
        <li>
          <router-link to="/castaneda">Все цитаты</router-link>
        </li>
        <li>
          <router-link to="/castaneda/random">Рандом</router-link>
        </li>
        <li @click="toggleBooksDropdown">
          По книгам
          <ul v-show="showBooks">
            <li v-for="book in bookNames" :key="book.id">
              <router-link
                :to="generateRoute(book.name, 'book')"
                :filter="book.name">{{ book.name }}</router-link>
            </li>
          </ul>
        </li>
        <li @click="toggleThemesDropdown">
          По темам
          <ul v-show="showThemes">
            <li v-for="theme in themes" :key="theme.id">
              <router-link :to="generateRoute(theme.name, 'theme')">{{ theme.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </main>
</template>

<style lang="scss" scoped>
.navigation {
  padding: 40px 0;
  cursor: pointer;

  a {
    color: var(--color-main-text);
  }

  li {
    list-style-type: none;
    padding-left: 20px;
  }
}

</style>
