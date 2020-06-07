import { mount } from '@vue/test-utils'
import Banner from '@/components/HeroBanner.vue'

describe('Banner', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Banner)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
