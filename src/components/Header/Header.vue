<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useDark, useToggle } from "@vueuse/core";
import IconSun from '@/components/icons/IconSun.vue'
import SearchInput from '@/components/Header/SearchInput.vue'
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
        <img src="../../assets/images/enso.png" class="header__logo" alt="enso">
      </RouterLink>
      <div class="header__actions">
        <search-input/>
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
}
</style>