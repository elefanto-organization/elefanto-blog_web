<template>
  <div
    v-if="menu"
    :style="menu ? 'display: block;' : 'display: none;'"
    class="fixed inset-0 bg-white dark:bg-gray-900 z-20">
    <div
      class="h-14 px-4 flex items-center justify-between border-b-[1px] dark:boder-gray-100 border-[#F2F2F2]">
      <a
        class="block h-8 w-14 relative dark:text-white font-bold text-2xl opacity-60"
        href="/">
        Elefanto
      </a>
      <button @click="menu = !menu">
        <atoms-icon name="close" />
      </button>
    </div>
    <nav class="px-4 py-6 text-right">
      <ul class="flex flex-col gap-6">
        <li v-for="(tab, i) in tabs" :key="i">
          <nuxt-link
            :to="tab.url"
            class="font-medium py-1 hover:text-gray-900 dark:hover:text-gray-100 text-gray-500 border-transparent"
            @click.prevent="menu = !menu">
            {{ tab.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
  <div
    class="h-14 flex items-center bg-white/80 dark:bg-gray-900/60 backdrop-blur-md sticky border-b-[1px] dark:hover:border-opacity-20 border-[#F2F2F2] top-0 z-10">
    <div class="w-full max-w-7xl px-4 mx-auto flex items-center">
      <div class="font-bold flex-1 text-2xl dark:text-white">
        <nuxt-link to="/" @click="currentTab = undefined"> Elefanto </nuxt-link>
      </div>
      <div class="flex-1 flex gap-4 items-center justify-end">
        <nav class="hidden sm:block ml-auto mr-5">
          <ul class="flex justify-center gap-3">
            <li v-for="(tab, i) in tabs" :key="i">
              <nuxt-link
                :to="tab.url"
                class="flex justify-center gap-2 font-medium py-1 hover:text-gray-900 dark:hover:text-gray-100 text-gray-500 border-transparent"
                :class="
                  currentTab === tab.url &&
                  'underline text-black dark:text-white'
                "
                @click="currentTab = tab.url">
                <atoms-icon v-if="tab.icon" :name="tab.icon" />
                {{ tab.name }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/login"
                class="flex justify-center gap-2 font-medium py-1 hover:text-gray-900 dark:hover:text-gray-100 text-gray-500 border-transparent"
                @click="log()">
                <atoms-icon name="profile"/>
                {{ token ? 'Logout' : 'Login' }}
                </nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="relative">
          <button
            class="p-1 border dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 focus:hover-gray-50 dark:focus:hover-gray-800 hover:border-gray-300 dark:hover:border-gray-600 dark:focus:border-gray-600 text-gray-700 dark:text-gray-300"
            :class="
              isDark
                ? 'text-gray-700 dark:text-gray-300'
                : 'text-gray-400 dark:text-gray-600 hover:text-gray-500 focus:text-gray-500 dark:hover:text-gray-500 dark:focus:text-gray-500'
            "
            @click="toggleDark()">
            <atoms-icon name="sun" class="block dark:hidden w-6 h-6" />
            <atoms-icon name="moon" class="hidden dark:block w-6 h-6" />
          </button>
        </div>
        <button class="sm:hidden" @click="menu = true">
          <atoms-icon name="menu" />
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { useRoute } from "vue-router";

interface tab {
  name: string;
  url: string;
  icon?: string;
}

const isDark = useDark();

const toggleDark = useToggle(isDark);
const route = useRoute();
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

const menu = ref<boolean>(false);
const tabs = ref<tab[]>([
  {
    name: "Write article",
    url: "/write",
    icon: "pen",
  },
]);

const currentPath = route.path;
const currentTab = ref<string | undefined>(undefined);

currentTab.value = tabs.value.find(tab => currentPath.includes(tab.url))?.url;

const authStore = useAuthStore()
const { token } = storeToRefs(authStore)
const { setToken } = authStore

const log = () => {
  if (token) {
    setToken(null)
    localStorage.setItem('token', '')
  } 
}
</script>
