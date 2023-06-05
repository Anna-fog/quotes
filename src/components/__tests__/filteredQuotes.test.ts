import { shallowMount, VueWrapper } from "@vue/test-utils";

import FilteredQuotes from "../../views/FilteredQuotes.vue";

let wrapper: VueWrapper

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: {
      value: {
        query: {
          filter: ''
        },
      }
    }
  }))
}))

describe('FilteredQuotes', () => {
  beforeAll(() => {
    wrapper = shallowMount(FilteredQuotes)
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })
})