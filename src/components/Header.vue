<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import Search from '@/assets/icons/search.svg'

const filterValue = ref('')

const filterQuotes = () => {
  if (!filterValue.value) {
    router.push('castaneda')
  } else {
    router.push({ path: 'castaneda', query: { filter: filterValue.value } })
  }
}

onMounted(() => {
  filterQuotes()
})
</script>

<template>
  <header class="header">
    <div class="header__content container">
      <RouterLink to="/">
        <img src="../assets/icons/circle.svg" class="header__logo" alt="circle">
      </RouterLink>
      <div class="header__search">
        <input v-model="filterValue" type="text">
        <button @click="filterQuotes">
          <Search class="icon" />
        </button>
      </div>
    </div>
  </header>
</template>


<style scoped lang="scss">
.header {
  width: 100vw;
  background-color: var(--rolling-stone);

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    margin: 0 auto;
  }

  &__logo {
    cursor: pointer;
  }

  &__search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
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

  .icon {
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