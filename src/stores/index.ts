import { defineStore } from 'pinia'
import type { Quote } from "@/models/Quotes";
import { allQuotes } from "@/data/quotes";

interface QuotesState {
  filterValue: string | null | undefined,
  filteredQuotes: Partial<Quote>[] | undefined
}

export const useQuotesStore = defineStore('quotes',  {
  state: (): QuotesState => ({
    filterValue: '',
    filteredQuotes: []
  }),

  getters: {
    allAuthorsQuotes() {
      // @ts-ignore
      return allQuotes.authors.map(author => [...author.quotes]).flat()
    }
  },

  actions: {
    getAuthor(authorName: string) {
      return allQuotes.authors.find(author => author.route === authorName)
    },

    filterQuotes(authorName: string = '') {
      const quotesToFilter = authorName ? this.getAuthor(authorName)?.quotes : this.allAuthorsQuotes

      this.filteredQuotes = quotesToFilter!.filter((item: Partial<Quote>) =>
        this.filterValue &&
        item.text?.toLowerCase().includes(this.filterValue.toLowerCase()))
    },

    filterBooks(book: string, authorName: string) {
      return this.getAuthor(authorName)?.quotes.filter((item: Partial<Quote>) =>
        item.bookName!.toLowerCase() === book.toLowerCase())
    },

    filterTags(theme: string, authorName: string) {
      return this.getAuthor(authorName)?.quotes.filter((item: Partial<Quote>) =>
        item.tags && item.tags.includes(theme.toLowerCase()))
    },

    chooseRandomQuote(authorName: string) {
      const numberOfQuotes = this.getAuthor(authorName)?.quotes.length || 0
      return [this.getAuthor(authorName)?.quotes[Math.floor(Math.random() * numberOfQuotes)]]
    },

    chooseRandomQuoteFromAllAuthors() {
      return [this.allAuthorsQuotes[Math.floor(Math.random() * this.allAuthorsQuotes.length)]]
    },

    quotesToShow(filter: string | null, route: any, authorName: string) {
      if (filter) {
        return this.filteredQuotes?.length ? this.filteredQuotes : []
      }

      if (route.name === 'all random') {
        return this.chooseRandomQuoteFromAllAuthors()
      } else if (route.name === 'filterAll') {
        return this.allAuthorsQuotes
      } else if (route.name.includes('books')) {
        return this.filterBooks(route.params.id, authorName)
      } else if (route.name.includes('themes')) {
        return this.filterTags(route.params.id, authorName)
      } else if (route.name.includes('random')) {
        return this.chooseRandomQuote(authorName)
      } else {
        return this.getAuthor(authorName)?.quotes
      }
    }
  }
})
