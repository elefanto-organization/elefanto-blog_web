import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  let localToken = null
  if (process.client && localStorage.getItem('token')) {
    localToken = localStorage.getItem('token')
  }
  const token = ref<string|null>(localToken)
  const username = ref('')

  function setToken(value: string | null) {
    token.value = value
  }
  function setUsername(value: string) {
    username.value = value
  }
  return { setToken, setUsername, token, username }
})