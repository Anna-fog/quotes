<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useDark, useToggle } from "@vueuse/core";
import IconClear from '@/components/icons/IconClear.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconSun from '@/components/icons/IconSun.vue'
import { useQuotesStore } from "@/stores";

const store = useQuotesStore()

const router = useRouter()

const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)

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

const setInitialDarkMode = () => {
  toggleDark()
  localStorage.setItem('initial-mode', 'dark-mode')
}

onMounted(async () => {
  await router.isReady()
  store.filterValue = router.currentRoute.value.query?.filter?.toString()

  if (!localStorage.getItem('initial-mode')) {
    setInitialDarkMode()
  }
})
</script>

<template>
  <header class="header">
    <div class="header__content container">
      <RouterLink to="/">
        <img src="../assets/images/enso.png" class="header__logo" alt="enso">
      </RouterLink>
      <div class="header__actions">
        <div class="header__search">
          <div class="header__input">
            <input v-model="store.filterValue" v-lower-case @keyup.enter="filterQuotes" type="text">
            <IconClear v-if="store.filterValue" class="clear-icon" @click="clearFilter"/>
          </div>
          <button @click="filterQuotes">
            <IconSearch class="search-icon" />
          </button>
        </div>
        <div :class="['sun-icon', {'sun-icon_sunset': isDark}]" @click="toggleDark()">
          <IconSun class="sun-icon__svg"></IconSun>
        </div>
      </div>
    </div>
  </header>
</template>


<style scoped lang="scss">
.header {
  background-color: var(--color-header-background);

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
    transition: 9s transform ease;
    width: 34px;

    &:hover {
      transform: scale(0.1) rotate(-240deg);
    }
    
    @media (max-width: 560px) {
      &:hover {
        transform: none;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 560px) {
      gap: 15px;
    }
  }

  &__search {
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

  .clear-icon {
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

  .search-icon {
    color: var(--color-icon);
    transition: .3s all;

    @media (max-width: 560px) {
      width: 18px;
      height: 18px;
    }
  }

  .sun-icon {
    cursor: pointer;
    position: absolute;
    right: 20px;

    @media (max-width: 1240px) {
      position: relative;
      right: 0;
    }

    &__svg {
      position: relative;
      top: 2px;
      color: var(--color-sun-background);
      transition: .6s all ease;

      &:hover {
        transform: rotate(180deg);

      }
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 24px;
      height: 14px;
      background-color: transparent;
      border-top: 1px solid transparent;
      bottom: -10px;
      transition: .6s bottom;
    }

    &_sunset {
      &:after {
        background-color: var(--color-header-background);
        border-top: 1px solid var(--mine-shaft);
        bottom: -3px;
      }

      .sun-icon__svg {
        top: 5px;
        color: var(--color-sun-background);
      }
    }
  }

  button {
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