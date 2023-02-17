<script setup lang="ts">
import { type PropType, ref } from "vue";

interface MenuItem {
  name: string,
  id: number,
  year: number
}

const props = defineProps({
  itemName: {
    type: String,
    required: true
  },
  items: {
    type: Array as PropType<Partial<MenuItem>[]>,
    required: true
  },
  route: {
    type: String,
    required: true
  },
})

const showItems = ref(false)

const toggleDropdown = () => {
  showItems.value = !showItems.value
}

const generateRoute = (filter: string | undefined) => `/${props.route}/${filter}`

</script>

<template>
  <li @click.self="toggleDropdown" class="menu-dropdown">
    {{ props.itemName }}
    <ul v-show="showItems" class="menu-dropdown__list">
      <li v-for="item in items" :key="item.id" class="menu-dropdown__item">
        <router-link
          :to="generateRoute(item.name)"
          :filter="item.name">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </li>
</template>

<style lang="scss">
.menu-dropdown {
  &__list {
    margin-top: 4px;
  }

  a {
    color: var(--color-main-text);
  }

  &__item {
    list-style-type: circle;
    margin-left: 30px;
    padding-left: 0;
    margin-top: 4px;

    position: relative;
    transition: .3s all ease-in-out;

    &:hover {
      margin-left: 35px;
    }

    @media (max-width: 720px) {
      margin-top: 10px;
      margin-left: 24px;

      &:hover {
        margin-left: 24px;
      }
    }
  }
}
</style>