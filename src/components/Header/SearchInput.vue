<script setup lang="ts">
import { useQuotesStore } from "@/stores";
import { useRouter } from "vue-router";
import IconClear from '@/components/icons/IconClear.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const store = useQuotesStore()

const router = useRouter()

const vLowerCase = {
  updated: (el: HTMLInputElement) => {
    el.value = el.value.toLowerCase()
  }
}

const handleFilterQuotes = () => {
  const authorName = router.currentRoute.value.meta.author as string
  const noAuthorDivision = router.currentRoute.value.name === 'home' || router.currentRoute.value.name === 'all random'
  const nextRouteName = noAuthorDivision ? 'filterAll' : authorName

  if (store.filterValue) {
    router.push({ name: nextRouteName as string, query: { filter: store.filterValue } })
  } else {
    router.push(router.currentRoute.value.path)
  }

  store.filterQuotes(authorName)
}

const clearFilter = () => {
  if (!store.filterValue) return

  store.filterValue = ''
  handleFilterQuotes()
}
</script>

<template>
  <div class="search-input">
    <div class="search-input__input">
      <input v-model="store.filterValue" v-lower-case @keyup.enter="handleFilterQuotes" type="text">
      <IconClear v-if="store.filterValue" class="search-input__clear-icon" @click="clearFilter"/>
    </div>
    <button @click="handleFilterQuotes" class="search-input__button">
      <IconSearch class="search-input__search-icon" />
    </button>
  </div>
</template>

<style lang="scss">
.search-input {
  display: flex;
  justify-content: center;
  align-items: center;

  &__input {
    position: relative;

    input {
      height: 24px;
      width: 220px;
      border-radius: 2px 0 0 2px;
      border: none;
      padding: 4px 26px 4px 8px;
      font-size: 14px;
      color: var(--color-input);
      background-color: var(--color-input-background);

      &:focus-visible {
        outline: 2px solid var(--color-input);
      }

      @media (max-width: 560px) {
        width: 200px;
        height: 30px;
        padding-right: 32px;
        font-size: 16px;
      }
    }
  }

  &__clear-icon {
    position: absolute;
    width: 12px;
    height: 12px;
    right: 8px;
    top: 6px;
    cursor: pointer;
    color: var(--color-icon);
    transition: .3s all;

    &:hover {
      color: var(--color-icon-hover);
      transform: scale(1.2);
    }

    @media (max-width: 560px) {
      top: 7px;
      width: 16px;
      height: 16px;
      transform: none;
    }
  }

  &__search-icon {
    color: var(--color-icon);
    transition: .3s all;

    @media (max-width: 560px) {
      width: 18px;
      height: 18px;
    }
  }

  &__button {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 2px 2px 0;
    border: none;
    margin-left: 2px;
    padding: 4px;
    background-color: var(--color-header-button);
    cursor: pointer;
    transition: .3s all;

    &:hover {
      background-color: var(--color-header-button-hover);

      .search-icon {
        color: var(--color-icon-hover);
      }
    }

    @media (max-width: 560px) {
      height: 30px;

      &:hover {
        background-color: var(--color-header-button);

        .search-icon {
          color: var(--color-icon);
        }
      }
    }
  }
}
</style>