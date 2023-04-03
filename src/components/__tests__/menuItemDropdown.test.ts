import { mount, VueWrapper, RouterLinkStub } from "@vue/test-utils";
import { beforeAll, expect } from "vitest";

import MenuItemDropdown from "../Navigation/MenuItemDropdown.vue";

let wrapper: VueWrapper

beforeAll(() => {
  wrapper = mount(MenuItemDropdown, {
    global: {
      components: {
        'router-link': RouterLinkStub,
      },
    },
    props: {
      itemName: '',
      items: [],
      route: ''
    },
  })
})

describe('MenuItemDropdown', () => {
  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('does not show dropdown with navigation items by default', () => {
    expect(wrapper.find('ul').isVisible()).toBeFalsy()
  })

  it('shows dropdown with navigation items by clicking on the menu item', async () => {
    const menuItem = wrapper.find('.menu-dropdown')

    await menuItem.trigger('click')

    expect(wrapper.find('ul').isVisible()).toBeTruthy()
  })
})
