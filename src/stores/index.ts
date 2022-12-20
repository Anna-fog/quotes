import { defineStore } from 'pinia'

interface QuotesState {
  filterValue: string | null | undefined
}

export const useQuotesStore = defineStore('quotes',  {
  state: (): QuotesState => ({
    filterValue: ''
  }),
})
