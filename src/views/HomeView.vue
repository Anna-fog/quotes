<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { bookNames } from "@/data/bookNames";
import { themes } from "@/data/themes";
import { useQuotesStore } from "@/stores";

const store = useQuotesStore()

const showBooks = ref(false)
const showThemes = ref(false)

const toggleBooksDropdown = () => {
  showBooks.value = !showBooks.value
}

const toggleThemesDropdown = () => {
  showThemes.value = !showThemes.value
}

const generateRoute = (filter: string, type: string) => `/castaneda/${type}/${filter}`

onMounted(() => {
  store.filterValue = ''
})

</script>

<template>
  <main class="main container">
    <nav class="navigation ">
      <div class="navigation__main">
        Карлос Кастанеда
      </div>
      <ul class="navigation__sections">
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
                :to="generateRoute(book.name, 'books')"
                :filter="book.name">{{ book.name }}</router-link>
            </li>
          </ul>
        </li>
        <li @click="toggleThemesDropdown">
          По темам
          <ul v-show="showThemes">
            <li v-for="theme in themes" :key="theme.id">
              <router-link :to="generateRoute(theme.name, 'themes')">{{ theme.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <img src="src/assets/images/image_nav_page.jpg" class="main__image">
  </main>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;

  &__image {
    margin-top: 40px;
    height: 500px;
    width: auto;
    filter: saturate(0.7);
    border-radius: 4px;
  }
}

.navigation {
  padding: 40px 0;
  min-height: calc(100vh - 60px);
  cursor: pointer;

  &__main {
    margin-bottom: 10px;
    cursor: context-menu;
  }

  a {
    color: var(--color-main-text);
  }

  li {
    list-style-type: none;
    padding-left: 20px;
  }

  &__sections {
    li {
      &:after {
        content: '';
        display: block;
        width: 1px;
        height: 8px;
        left: 30px;
        top: 4px;
        margin-bottom: 4px;
        background-color: var(--rolling-stone);
      }

      &:last-child {
        &:after {
          display: none;
        }
      }

      ul {
        margin-top: 4px;

        li {
          margin-bottom: 2px;

          &:after {
            display: none;
          }
        }
      }
    }
  }
}

</style>
