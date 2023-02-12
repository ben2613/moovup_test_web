import { flushPromises, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useFriendsStore } from '@/stores/friends'
import { vi } from 'vitest'

import DetailsView from '@/views/DetailsView.vue'

vi.mock('vue-router', () => ({
    useRoute: vi.fn().mockImplementationOnce(() => ({
        params: {
            id: 3
        }
    })),
}))

test('id3 should contain Valentine Diaz', async () => {
    const pinia = createTestingPinia()
    // initial the store and wait all promise finished
    fds = useFriendsStore()
    await flushPromises()
    console.log(fds)
    const wrapper = mount(DetailsView, {
        global: {
            plugins: [pinia],
        }
    })
    expect(wrapper.find('.v-list-item-title').text()).toBe('Valentine Diaz')
})
