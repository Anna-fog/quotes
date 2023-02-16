<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  itemName: {
    type: String,
    required: true
  },
  items: {
    type: Array,
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

const generateRoute = (filter: string) => `/${props.route}/${filter}`

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
  }
}
</style>