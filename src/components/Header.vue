<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import IconClear from '@/components/icons/IconClear.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { useQuotesStore } from "@/stores";

const store = useQuotesStore()

const router = useRouter()

const filterQuotes = async () => {
  store.filterValue
    ? router.push({ name: 'castaneda', query: { filter: store.filterValue } })
    : router.push(router.currentRoute.value.path)
}

const clearFilter = () => {
  if (!store.filterValue) return

  store.filterValue = ''
  filterQuotes()
}

const vLowerCase = {
  updated: (el: HTMLInputElement) => {
    el.value = el.value.toLowerCase()
  }
}

onMounted(async () => {
  await router.isReady()
  store.filterValue = router.currentRoute.value.query?.filter?.toString()
})
</script>

<template>
  <header class="header">
    <div class="header__content container">
      <RouterLink to="/">
        <img src="../assets/images/enso.png" class="header__logo" alt="enso">
      </RouterLink>
      <div class="header__search">
        <div class="header__input">
          <input v-model="store.filterValue" v-lower-case @keyup.enter="filterQuotes" type="text">
          <IconClear class="clear-icon" @click="clearFilter"/>
        </div>
        <button @click="filterQuotes">
          <IconSearch class="search-icon" />
        </button>
      </div>
    </div>
  </header>
</template>


<style scoped lang="scss">
.header {
  background-color: var(--rolling-stone);

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    margin: 0 auto;

    a {
      display: flex;
    }
  }

  &__logo {
    cursor: pointer;
    transition: 14s transform;
    width: 34px;

    &:hover {
      transform: scale(0.1) rotate(94deg);
    }
  }

  &__search {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__input {
    position: relative;
  }

  input {
    height: 24px;
    width: 220px;
    border-radius: 4px 0 0 4px;
    border: none;
    padding: 4px 8px;
    color: var(--mine-shaft);
    background-color: var(--submarine);

    &:focus-visible {
      outline: 2px solid var(--mine-shaft);
    }
  }

  .clear-icon {
    position: absolute;
    right: 8px;
    top: 7px;
    cursor: pointer;
    color: var(--rolling-stone);
    transition: .3s all;

    &:hover {
      color: var(--mine-shaft);
    }
  }

  .search-icon {
    color: var(--rolling-stone);
    transition: .3s all;
  }

  button {
    height: 24px;
    border-radius: 0 4px 4px 0;
    border: none;
    margin-left: 2px;
    padding: 4px;
    background-color: var(--submarine);
    cursor: pointer;
    transition: .3s all;

    &:hover {
      background-color: var(--gray-chateau);

      .icon {
        color: var(--shuttle-gray);
      }
    }
  }
}
</style>