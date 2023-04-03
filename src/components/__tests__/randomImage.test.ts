import { beforeAll, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import RandomImage from "../RandomImage.vue";

let wrapper: VueWrapper
describe('RandomImage', () => {
  beforeAll(() => {
    wrapper = mount(RandomImage)
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('renders random picture', () => {
    expect(wrapper.find('img')).toBeTruthy()
  })
})