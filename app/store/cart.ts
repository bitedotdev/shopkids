import { defineStore } from 'pinia'

export const useCart = defineStore('cart', () => {
  const storage = ref<ProductCart[]>([])

  function add(product: ProductCart) {
    if (storage.value.some(item => item._id === product._id))
      return

    storage.value.push(product)
  }

  function remove(id: string) {
    storage.value = storage.value.filter(p => p._id !== id)
  }

  function clearStorage() {
    storage.value = []
  }

  return {
    storage,
    add,
    remove,
    clearStorage,
  }
}, {
  persist: true,
})
