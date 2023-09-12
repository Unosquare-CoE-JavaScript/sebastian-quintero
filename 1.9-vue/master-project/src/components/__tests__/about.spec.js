import { describe, expect, test } from 'vitest'
import AboutView from '../../views/AboutView.vue'
import { mount, shallowMount } from '@vue/test-utils'

describe('AboutView.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(AboutView)
    // const wrapper = mount(AboutView, {
    //   shallow: true
    // })

    expect(wrapper.text()).toContain('About')
  })
})
