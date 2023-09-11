import { describe, expect, test } from 'vitest'
import SongItemVue from '../SongItem.vue'
import { RouterLinkStub, mount, shallowMount } from '@vue/test-utils'
import { RouterLink } from 'vue-router'

describe('Router', () => {
  test('renders router link', () => {
    const song = {
      docId: 'abc'
    }

    const wrapper = shallowMount(SongItemVue, {
      props: { song },
      global: {
        // No needed, it seems recent versions of Vue already mocked it
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.findComponent(RouterLink).props().to).toEqual({
      name: 'song',
      params: { id: song.docId }
    })
  })
})
