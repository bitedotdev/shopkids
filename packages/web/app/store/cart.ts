import { defineStore } from 'pinia'

export const useCart = defineStore('cart', () => {
  const STORAGE_KEY = 'cart'
  const storage = ref<Product[]>([])

  function loadFromStorage() {
    if (!import.meta.client)
      return
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      storage.value = saved ? JSON.parse(saved) : []
    }
    catch (e) {
      console.error(e)
      storage.value = []
    }
  }

  function saveToStorage() {
    if (!import.meta.client)
      return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage.value))
  }

  function add(product: Product) {
    if (storage.value.some(item => item._id === product._id))
      return
    storage.value.push(product)
    saveToStorage()
  }

  function remove(id: string) {
    storage.value = storage.value.filter(p => p._id !== id)
    saveToStorage()
  }

  function clearStorage() {
    storage.value = []
    saveToStorage()
  }

  return {
    storage,
    loadFromStorage,
    add,
    remove,
    clearStorage,
  }
})
