import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomeView from '../../views/HomeView.vue'
import SongItemVue from '../SongItem.vue'

describe('HomeView.vue', () => {
  test('renders list of songs', () => {
    const songs = [{}, {}, {}]

    const component = shallowMount(HomeView, {
      data() {
        return {
          songs
        }
      },
      global: {
        mocks: {
          $t: (message) => message
        }
      }
    })

    const items = component.findAllComponents(SongItemVue)

    expect(items).toHaveLength(3)

    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i])
    })
  })
})
