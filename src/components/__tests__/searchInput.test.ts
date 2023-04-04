import { beforeAll, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import SearchInput from "../Header/SearchInput.vue";

import { useQuotesStore } from "../../stores";
import { useRouter } from "vue-router";

let wrapper: VueWrapper

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => vi.fn(),
    currentRoute: {
      value: {
        name: '',
        filter: '',
        meta: {
          author: ''
        }
      }
    }
  }))
}))

const directive = vi.fn()

describe('SearchInput', () => {
  beforeAll(() => {
    wrapper = mount(SearchInput, {
      global: {
        plugins: [createTestingPinia()],
        directives: {
          vLowerCase: directive
        }
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('updates filter value in store according to the entered text', () => {
    const store = useQuotesStore()

    const input = wrapper.find('input')

    input.setValue('filtering text')

    expect(store.filterValue).toEqual('filtering text')
  })

  it('filters quotes by pressing Enter button', () => {
    const store = useQuotesStore()

    const input = wrapper.find('input')

    input.setValue('Filtering Text')
    input.trigger('keyup.enter')

    expect(store.filterQuotes).toHaveBeenCalled()
  })

  it('filters quotes by clicking on Button element', () => {
    const store = useQuotesStore()

    const input = wrapper.find('input')
    const button = wrapper.find('button')

    input.setValue('Filtering Text')
    button.trigger('click')

    expect(store.filterQuotes).toHaveBeenCalled()
  })

  it('redirects to "filterAll" route if the the previous route name is "home" by clicking on Button element', () => {
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push: push,
      currentRoute: {
        value: {
          name: 'home',
          filter: '',
          meta: {
            author: ''
          }
        }
      }
    }))

    wrapper = mount(SearchInput, {
      global: {
        plugins: [createTestingPinia()],
        directives: {
          vLowerCase: directive
        }
      }
    })

    const store = useQuotesStore()
    store.filterValue = 'test'

    const button = wrapper.find('button')
    button.trigger('click')

    expect(push).toHaveBeenCalledWith({ name: 'filterAll', query: { filter: store.filterValue } })
  })

  it('redirects to "filterAll" route if the the previous route name is "all random" by clicking on Button element', () => {
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push: push,
      currentRoute: {
        value: {
          name: 'all random',
          filter: '',
          meta: {
            author: ''
          }
        }
      }
    }))

    wrapper = mount(SearchInput, {
      global: {
        plugins: [createTestingPinia()],
        directives: {
          vLowerCase: directive
        }
      }
    })

    const store = useQuotesStore()
    store.filterValue = 'test'

    const button = wrapper.find('button')
    button.trigger('click')

    expect(push).toHaveBeenCalledWith({ name: 'filterAll', query: { filter: store.filterValue } })
  })

  it('shows clear icon if there is text in the input', async () => {
    const input = wrapper.find('input')

    await input.setValue('Filtering Text')

    expect(wrapper.find('.search-input__clear-icon').exists()).toBe(true)
  })

  it('hides clear icon if the input is empty', async () => {
    const input = wrapper.find('input')

    await input.setValue('')

    expect(wrapper.find('.search-input__clear-icon').exists()).toBeFalsy()
  })

  it('clears filter value and filters quotes back by clicking on clear icon', async () => {
    const store = useQuotesStore()
    const input = wrapper.find('input')
    await input.setValue('Filtering Text')

    const clearIcon = wrapper.find('.search-input__clear-icon')
    await clearIcon.trigger('click')

    expect(store.filterValue).toBe('')
    expect(store.filterQuotes).toHaveBeenCalled()
  })
})