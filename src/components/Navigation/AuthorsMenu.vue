<script setup lang="ts">
import { onMounted } from 'vue'

import { castanedaBookNames } from "@/data/castanedaBookNames";
import { castanedaTags } from "@/data/castanedaTags";
import { useQuotesStore } from "@/stores";

import MenuItemsDropdown from '@/components/Navigation/MenuItemDropdown.vue'

const props = defineProps({
  author: {
    type: Object,
    required: true
  }
})

const store = useQuotesStore()

onMounted(() => {
  store.filterValue = ''
})
</script>

<template>
  <nav class="authors-menu">
    <div class="authors-menu__main">
      {{ props.author.name }}
    </div>

    <ul class="authors-menu__sections">
      <li><router-link :to="`/${props.author.route}`">Все цитаты</router-link></li>
      <li><router-link :to="`/${props.author.route}/random`">Рандом</router-link></li>

      <menu-items-dropdown
        v-if="props.author.booksFilter"
        :route="`${props.author.route}/books`"
        :items="castanedaBookNames"
        item-name="По книгам"/>
      <menu-items-dropdown
        v-if="props.author.themesFilter"
        :route="`${props.author.route}/themes`"
        :items="castanedaTags"
        item-name="По темам"/>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.authors-menu {
  padding-top: 40px;
  cursor: pointer;

  @media (max-width: 560px) {
    font-size: 17px;
    line-height: 22px;
  }

  &__main {
    margin-bottom: 6px;
    cursor: context-menu;
    width: fit-content;
    font-size: 18px;

    @media (max-width: 720px) {
      margin-bottom: 10px;
    }
  }

  a {
    color: var(--color-main-text);
  }

  li {
    list-style-type: none;
    padding-left: 20px;

    @media (max-width: 720px) {
      padding-left: 12px;
    }
  }

  &__sections {
    li {
      &:after {
        content: '';
        display: block;
        width: 1px;
        height: 8px;
        position: relative;
        left: 30px;
        top: 4px;
        margin-bottom: 4px;
        background-color: var(--color-section-separator);
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }

  &__nested-li {
    ul {
      margin-top: 4px;
    }

    li {
      list-style-type: circle;
      margin-left: 30px;
      padding-left: 0;
      margin-top: 4px;

      &:after {
        display: none;
      }
    }
  }
}
</style>