import { defineStore } from 'pinia'
import type { Quote } from "@/models/Quotes";
import { allQuotes } from "@/data/quotes";

interface QuotesState {
  filterValue: string,
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
      const quotesToFilter = authorName ? this.getAuthor(authorName)!.quotes : this.allAuthorsQuotes

      this.filteredQuotes = quotesToFilter.filter((item: Partial<Quote>) =>
        item.text?.toLowerCase().includes(this.filterValue.toLowerCase()))
    },

    filterBooks(book: string, authorName: string) {
      return this.getAuthor(authorName)?.quotes.filter((item: Partial<Quote>) =>
        item.bookName!.toLowerCase() === book.toLowerCase())
    },

    filterTags(theme: string, authorName: string) {
      return this.getAuthor(authorName)?.quotes.filter((item: Partial<Quote>) =>
        item.tags?.includes(theme.toLowerCase()))
    },

    chooseRandomQuote(authorName: string) {
      const numberOfQuotes = this.getAuthor(authorName)?.quotes.length || 0
      return this.getAuthor(authorName)?.quotes[Math.floor(Math.random() * numberOfQuotes)]
    },

    chooseRandomQuoteFromAllAuthors() {
      return this.allAuthorsQuotes[Math.floor(Math.random() * this.allAuthorsQuotes.length)]
    },

    showFilteredQuotes() {
      return this.filteredQuotes?.length ? this.filteredQuotes : []
    },

    quotesToShow(filter: string | null, route: any, authorName: string) {
      if (filter) {
        return this.showFilteredQuotes()
      }

      switch (true) {
        case route.name === 'all random':
          return [this.chooseRandomQuoteFromAllAuthors()];
        case route.name === 'filterAll':
          return this.allAuthorsQuotes;
        case route.name.includes('books'):
          return this.filterBooks(route.params.id, authorName);
        case route.name.includes('themes'):
          return this.filterTags(route.params.id, authorName);
        case route.name.includes('random'):
          return [this.chooseRandomQuote(authorName)];
        default:
          return this.getAuthor(authorName)?.quotes ?? [];
      }
    }
  }
})
