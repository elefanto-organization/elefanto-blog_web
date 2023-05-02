<template>
  <div class="flex-1 flex flex-col">
    <div class="max-w-6xl w-full py-12 px-4 mx-auto flex justify-center items-center">
      <div class="flex flex-col items-center w-80 mt-28 dark:text-white/80">
        <div class="text-3xl leading-8 mb-4">Sign in with email</div>
        <input 
        v-model="form.username"
        class="mt-12 w-80 mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="username" required />
        <input 
        v-model="form.password"
        type="password" class="w-80 mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="password" required />
        <button @click="handleSubmit()" class="mt-7 w-52 bg-black text-white px-6 py-2 text-sm rounded-3xl dark:bg-gray-100 dark:text-black">Sign in</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ILoginInput } from '@/types/index'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
const { $api } = useNuxtApp();

const form = reactive<ILoginInput>({
  username: '',
  password: '',
});
const router = useRouter()
const authStore = useAuthStore()
const { setToken } = authStore

const handleSubmit = async () => {
  try {
        const credentials: ILoginInput = {
          username: form.username,
          password: form.password,
        };
  
        const response = await $api.auth.login(credentials);
        setToken(response.token)
        localStorage.setItem('token', response.token)
        router.push('/')
    } catch (error) {
        console.error(error);
    }

}
</script>
<style>
#text-editor {
  border: 1px solid #808080;
  }
</style>