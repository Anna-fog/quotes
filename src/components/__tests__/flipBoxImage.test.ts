import { beforeAll, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { useRouter } from "vue-router";

import FlipBoxImage from "../AnimatedImages/FlipBoxImage.vue";

let wrapper: VueWrapper

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}))
describe('RandomImage', () => {
  beforeAll(() => {
    wrapper = mount(FlipBoxImage)
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('goes to route with random image by clicking on "flip-box" element', () => {
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({ push }))

    wrapper = mount(FlipBoxImage)
    wrapper.find('.flip-box').trigger('click')

    expect(push).toHaveBeenCalledWith({ name: 'all random' })
  })
})