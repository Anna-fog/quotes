import { mount, VueWrapper, RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import AuthorsMenu from "../Navigation/AuthorsMenu.vue";

let wrapper: VueWrapper

const NUMBER_OF_STANDARD_MENU_ITEMS = 2
const NUMBER_OF_BOOKS = 15
const NUMBER_OF_THEMES = 29

describe('AuthorsMenu', () => {
  beforeAll(() => {
    wrapper = mount(AuthorsMenu, {
      global: {
        plugins: [createTestingPinia()],
        components: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        author: {
          name: '',
          route: ''
        }
      },
    })
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('does not show menu dropdown for author without booksFilter or themesFilter ', () => {
    expect(wrapper.findAll('li').length).toBe(NUMBER_OF_STANDARD_MENU_ITEMS)
  })

  it('shows menu dropdown with correct number of items for author with booksFilter', async () => {
    await wrapper.setProps({ author: {
        booksFilter: true,
        themesFilter: false
      }
    })

    expect(wrapper.findAll('li').length).toBe(NUMBER_OF_BOOKS)
  })

  it('shows menu dropdown with correct number of items for author with themesFilter', async () => {
    await wrapper.setProps({ author: {
        booksFilter: false,
        themesFilter: true
      }
    })

    expect(wrapper.findAll('li').length).toBe(NUMBER_OF_THEMES)
  })
});