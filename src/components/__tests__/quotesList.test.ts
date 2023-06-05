import { mount, VueWrapper } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import { useRouter } from "vue-router";

import QuotesList from "../QuotesList.vue";

let wrapper: VueWrapper

const FILTER_VALUE = 'testing quotes'
const EMPTY_PAGE_TEXT = 'Раздел в процессе разработки, скоро здесь что-нибудь появится'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: {
      value: {
        query: {
          filter: FILTER_VALUE
        },
        meta: ''
      }
    }
  }))
}))

describe('QuotesList', () => {
  beforeAll(() => {
    wrapper = mount(QuotesList, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('shows correct "Nothing Found" response if filtered quotes list is empty filter value includes two words', async () => {
    expect(wrapper.html().includes(`Ничего со словами "${FILTER_VALUE}" не найдено`)).toBe(true)
  })

  it('shows correct "Nothing Found" response if filtered quotes list is empty and filter value includes one word', async () => {
    const ONE_WORD_FILTER_VALUE = 'test'

    // @ts-ignore
    useRouter.mockImplementationOnce(() => ({
      currentRoute: {
        value: {
          query: {
            filter: ONE_WORD_FILTER_VALUE
          },
          meta: ''
        }
      }
    }))

    wrapper = mount(QuotesList, { global: { plugins: [createTestingPinia()] } })

    expect(wrapper.html().includes(`Ничего со словом "${ONE_WORD_FILTER_VALUE}" не найдено`)).toBe(true)
  })

  it('shows empty page message if the quotes list is empty', () => {
    // @ts-ignore
    useRouter.mockImplementationOnce(() => ({
      currentRoute: {
        value: {
          query: {
            filter: ''
          },
          meta: ''
        }
      }
    }))

    wrapper = mount(QuotesList, { global: { plugins: [createTestingPinia()] } })

    expect(wrapper.html().includes(EMPTY_PAGE_TEXT)).toBe(true)
  })

  it('shows list of quotes', () => {
    // @ts-ignore
    useRouter.mockImplementationOnce(() => ({
      currentRoute: {
        value: {
          query: {
            filter: ''
          },
          meta: '',
          name: 'all random'
        }
      }
    }))

    wrapper = mount(QuotesList, { global: { plugins: [createTestingPinia({stubActions: false})] } })

    expect(wrapper.findAll('li').length).toEqual(1)
  })
})