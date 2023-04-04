import { beforeAll, expect } from "vitest";
import { shallowMount, VueWrapper } from "@vue/test-utils";

import HomeView from "../../views/HomeView.vue";

let wrapper: VueWrapper

describe('HomeView', () => {

  beforeAll(() => {
    wrapper = shallowMount(HomeView)
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })
})