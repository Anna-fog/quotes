import { mount, VueWrapper, RouterLinkStub } from "@vue/test-utils";
import { beforeAll, describe, expect } from "vitest";
import { createTestingPinia } from "@pinia/testing";

import { useRouter } from "vue-router";

import BreadCrumbs from "../Navigation/BreadCrumbs.vue";

import { useQuotesStore } from "../../stores";

let wrapper: VueWrapper

const NUMBER_OF_MANDATORY_LINKS = 2

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    currentRoute: {
      value: {
        meta: {
          author: 'castaneda'
        },
        name: '',
        params: {
          id: ''
        }
      }
    }
  }))
}))

describe('BreadCrumbs', () => {
  beforeAll(() => {
    wrapper = mount(BreadCrumbs, {
      global: {
        plugins: [createTestingPinia({stubActions: false})],
        components: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        filter:  '',
        pageName: ''
      },
    })
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('shows mandatory links and link with author name if author anf filter value are not defined', () => {
    expect(wrapper.findAll('a').length).toBe(NUMBER_OF_MANDATORY_LINKS + 1)
  })

  it('shows additional link with filter value', async () => {
    const store = useQuotesStore()
    store.filteredQuotes = [{ id: '1' }, { id: '2' }]

    await wrapper.setProps({filter: 'filter value'})
    expect(wrapper.findAll('a').length).toBe(NUMBER_OF_MANDATORY_LINKS + 2)
  })

  it('clears filter value by clicking on redirect link', async () => {
    const store = useQuotesStore()
    const authorLink = wrapper.findAll('a')[1]

    store.filterValue = 'test value'
    expect(store.filterValue).toEqual('test value')

    await authorLink.trigger('click')
    expect(store.filterValue).toEqual('')
  })

  it('clears filter value by clicking on current page name link', async () => {
    const store = useQuotesStore()
    const currentPageLink = wrapper.findAll('a')[2]

    store.filterValue = 'test value'
    expect(store.filterValue).toEqual('test value')

    await currentPageLink.trigger('click')
    expect(store.filterValue).toEqual('')
  })

  it('shows correct current page name', async () => {
    const currentPageLink = wrapper.findAll('a')[2]

    await wrapper.setProps({pageName: 'test page name'})
    expect(currentPageLink.html().includes('test page name')).toBe(true)
  })

  it('shows correct current page name with filtering params', () => {
    const BOOK_NAME = 'example book'

    useRouter.mockImplementationOnce(() => ({
      push: vi.fn(),
      currentRoute: {
        value: {
          meta: {
            author: 'castaneda'
          },
          name: 'books',
          params: {
            id: BOOK_NAME
          }
        }
      }
    }))

    wrapper = mount(BreadCrumbs, {
      global: {
        plugins: [createTestingPinia({stubActions: false})],
        components: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        filter:  '',
        pageName: ''
      },
    })

    expect(wrapper.html().includes(BOOK_NAME)).toBe(true)
  })

  it('shows correct current page name without filtering params', () => {
    const PAGE_NAME = 'example page name'

    useRouter.mockImplementationOnce(() => ({
      push: vi.fn(),
      currentRoute: {
        value: {
          meta: {
            author: 'castaneda'
          },
          name: '',
          params: {
            id: ''
          }
        }
      }
    }))

    wrapper = mount(BreadCrumbs, {
      global: {
        plugins: [createTestingPinia({stubActions: false})],
        components: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        filter:  '',
        pageName: PAGE_NAME
      },
    })

    expect(wrapper.html().includes(PAGE_NAME)).toBe(true)
  })

  it('reloads page with random quote by clicking on the link', () => {
    const PAGE_NAME = 'example page name'

    useRouter.mockImplementationOnce(() => ({
      push: vi.fn(),
      currentRoute: {
        value: {
          meta: {
            author: ''
          },
          name: 'random',
          params: {
            id: ''
          }
        }
      }
    }))

    wrapper = mount(BreadCrumbs, {
      global: {
        plugins: [createTestingPinia({stubActions: false})],
        components: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        filter:  '',
        pageName: PAGE_NAME
      },
    })

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: { reload: vi.fn() } }
    });

    location.reload = vi.fn()


    const currentPageNameLink = wrapper
      .findAll('a')
      .find(link => link.html().includes(PAGE_NAME))

    currentPageNameLink!.trigger('click')

    expect(location.reload).toHaveBeenCalled()
  })
})