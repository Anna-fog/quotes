import { beforeAll, expect } from "vitest";
import { mount, VueWrapper, RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import TheHeader from "../Header/TheHeader.vue";

import { useQuotesStore } from "../../stores";

let wrapper: VueWrapper

let filterValue = 'testing filter'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    isReady: vi.fn(),
    currentRoute: {
      value: {
        query: {
          filter: filterValue
        }
      }
    }
  })
}))

describe('TheHeader', () => {
  beforeAll(() => {
    wrapper = mount(TheHeader, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
        components: {
          'RouterLink': RouterLinkStub,
        },
      }
    })
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('sets initial dark mode by default', () => {
    const body = document.body

    expect(body.getAttribute('color-scheme')).toEqual('dark')
  })

  it('changes color mode by clicking on sun icon', async () => {
    await wrapper.find('.sun-icon').trigger('click')

    const body = document.body

    expect(body.getAttribute('color-scheme')).toEqual('light')
  })

  it('sets filter value from router filter param', () => {
    const store = useQuotesStore()

    expect(store.filterValue).toEqual(filterValue)
  })
})