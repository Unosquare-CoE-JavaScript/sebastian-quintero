import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '../../stores/user'
import { beforeEach, describe, expect, vi } from 'vitest'

vi.mock('@/includes/fake-server', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve()
  }
}))

describe('stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('authenticate user', async () => {
    const store = useUserStore()

    expect(store.isLoggedIn).toBe(false)

    await store.authenticate({})
    expect(store.isLoggedIn).toBe(true)
  })
})
