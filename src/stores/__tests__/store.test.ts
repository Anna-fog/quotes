import { setActivePinia, createPinia } from "pinia";

import { useQuotesStore } from "../index";
import { beforeEach, expect } from "vitest";

vi.mock('@/data/quotes', () => ({
  allQuotes: {
    authors: [
      {
        name: 'Author Number One',
        id: '1',
        route: 'test author',
        booksFilter: true,
        themesFilter: true,
        quotes: [
          {
            text: 'This is the first quote',
            details: 'first quote details',
            bookName: 'first book name',
            tags: ['test'],
            id: '1'
          },
          {
            text: 'This is the second quote',
            details: 'second quote details',
            bookName: 'second book name',
            tags: ['tag'],
            id: '2'
          }
        ]
      },
      {
        name: 'Author Number Two',
        id: '2',
        route: 'another test author',
        booksFilter: false,
        themesFilter: false,
        quotes: [
          {
            text: 'This is the first quote of the second author',
            details: 'first quote details of the second author',
            bookName: 'first book name of the second author',
            tags: ['test', 'tag'],
            id: 'a1'
          },
          {
            text: 'This is the second quote of the second author',
            details: 'second quote details of the second author',
            bookName: 'second book name of the second author',
            tags: ['tag'],
            id: 'a2'
          }
        ]
      }
    ],
  }
}))

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('filters quotes without author name', () => {
    const store = useQuotesStore()
    store.filterValue = 'the first quote'
    store.filterQuotes()

    expect(store.filteredQuotes?.length).toBeTruthy()
  })

  it('filters quotes with author name', () => {
    const store = useQuotesStore()
    store.filterValue = ''
    store.filterQuotes('test author')

    expect(store.filteredQuotes?.length).toBeTruthy()
  })

  it('returns empty array if the quotes are not found with the set filter', () => {
    const store = useQuotesStore()
    store.filterValue = 'not existing text'
    store.filterQuotes()

    expect(store.filteredQuotes).toEqual([])
  })

  it('filters quotes by book name', () => {
    const store = useQuotesStore()

    const results = store.filterBooks('first book name', 'test author')

    expect(results?.length).toBeTruthy()
  })

  it('filters quotes by tag', () => {
    const store = useQuotesStore()

    const results = store.filterTags('test', 'test author')

    expect(results?.length).toBeTruthy()
  })

  it('chooses random quotes from the author ', () => {
    const store = useQuotesStore()

    const randomQuote = store.chooseRandomQuote('test author')

    expect(randomQuote?.id).toBeTruthy()
  })

  it('chooses random quotes from all authors', () => {
    const store = useQuotesStore()

    const randomQuote = store.chooseRandomQuoteFromAllAuthors()

    expect(randomQuote?.id).toBeTruthy()
  })

  it('returns filtered quotes if there are matches by the filter', () => {
    const store = useQuotesStore()
    store.filterValue = 'first quote'
    store.filterQuotes('test author')

    const filteredQuotes = store.showFilteredQuotes()

    expect(filteredQuotes.length).toBeTruthy()
  })

  it('returns empty array if there are no matches by the filter', () => {
    const store = useQuotesStore()
    store.filterValue = 'not existing text'
    store.filterQuotes('test author')

    const filteredQuotes = store.showFilteredQuotes()

    expect(filteredQuotes.length).toBeFalsy()
  })

  it('shows correctly filtered list of quotes', () => {
    const store = useQuotesStore()
    store.filterValue = 'first quote'
    store.filterQuotes('test author')

    const route = { query: { filter: 'first quote' }, meta: '', name: 'all random' }
    const quotes = store.quotesToShow('test author', route, 'test author')

    expect(quotes?.length).toBe(1)
  })

  it('shows correct list of quotes for "filterAll" route', () => {
    const store = useQuotesStore()
    store.filterValue = ''

    const NUMBER_OF_MOCKED_QUOTES = 4
    const route = { query: { filter: '' }, meta: '', name: 'filterAll' }
    const quotes = store.quotesToShow('', route, '')

    expect(quotes?.length).toBe(NUMBER_OF_MOCKED_QUOTES)
  })

  it('shows correct list of quotes for "books" route', () => {
    const store = useQuotesStore()

    const bookName = 'second book name'
    const route = { query: { filter: '' }, meta: '', name: 'books', params: { id: bookName } }
    const quotes = store.quotesToShow('', route, 'test author')

    // @ts-ignore
    const quotesOfOneBook = quotes?.every(quote => quote.bookName === bookName)

    expect(quotesOfOneBook).toBe(true)
  })

  it('shows correct list of quotes for "themes" route', () => {
    const store = useQuotesStore()

    const tagName = 'test'
    const route = { query: { filter: '' }, meta: '', name: 'themes', params: { id: tagName } }
    const quotes = store.quotesToShow('', route, 'test author')

    // @ts-ignore
    const quotesOfOneTheme = quotes?.every(quote => quote.tags.includes(tagName))

    expect(quotesOfOneTheme).toBe(true)
  })

  it('shows correct list of quotes for "random" route', () => {
    const store = useQuotesStore()

    const tagName = 'test'
    const route = { query: { filter: '' }, meta: '', name: 'random', params: { id: tagName } }
    const quotes = store.quotesToShow('', route, 'another test author')

    expect(quotes?.length).toBe(1)
    expect(quotes?.[0]?.id).toBeTruthy()
  })

  it('shows quotes of the chosen author', () => {
    const store = useQuotesStore()

    const route = { query: { filter: '' }, meta: '', name: '', params: { id: '' } }
    const quotes = store.quotesToShow('', route, 'another test author')
    const NUMBER_OF_QUOTES_OF_THE_SECOND_AUTHOR = 2

    expect(quotes?.length).toBe(NUMBER_OF_QUOTES_OF_THE_SECOND_AUTHOR)
  })
})