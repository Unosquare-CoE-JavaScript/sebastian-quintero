import { shallowMount } from '@vue/test-utils'
import { describe, expect } from 'vitest'
import SongItemVue from '../SongItem.vue'

describe('Snapshots SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docId: 'abc',
      modified_name: 'test',
      display_name: 'test',
      comment_count: 5
    }

    const wrapper = shallowMount(SongItemVue, {
      props: { song }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
