<script setup lang="ts">
import { computed, watch } from "vue";
import { useRouter } from 'vue-router'

import { useQuotesStore } from "@/stores";

import QuotesList from '@/components/QuotesList.vue'
import BreadCrumbs from '@/components/Navigation/BreadCrumbs.vue'
import RandomImage from '@/components/RandomImage.vue'

const router = useRouter()

const store = useQuotesStore()

const props = defineProps({
  pageName: String,
})

const authorName = computed(() => router.currentRoute.value.meta.author)

const filter = computed(() => router.currentRoute?.value.query?.filter ?
  router.currentRoute?.value.query?.filter.toString().toLowerCase() : null)

const quotes = computed(() => store.quotesToShow(filter.value, router.currentRoute.value, authorName.value as string))

watch(filter, () => {
  store.filterQuotes(authorName.value as string)
})
</script>

<template>
  <div class="quotes container">
    <Transition appear>
      <random-image/>
    </Transition>

    <Transition appear>
      <div class="quotes__main">
        <bread-crumbs :filter="filter" :pageName="props.pageName"/>

        <quotes-list :quotes="quotes" :filter="filter"/>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.quotes {
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;

  @media (max-width: 1180px) {
    display: block;
  }

  &__main {
    padding-right: 40px;

    @media (max-width: 1180px) {
      padding-right: 0;
    }
  }
}
</style>