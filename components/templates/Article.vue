<template>
  <div class="flex-1 flex flex-col">
    <div class="max-w-6xl w-full py-12 px-4 mx-auto">
      <article class="">
        <div class="flex flex-col dark:text-white/80">
          <div class="flex flex-1 items-center text-sm dark:text-gray-500">
            <div>{{ blog?.author.username }}</div>
            <div class="mx-1">·</div>
            <div class="text-gray-500">{{ blog?.created_at.slice(0,10) }}</div>
          </div>
          <div class="flex flex-1 items-start break-words justify-between mt-3">
            <div class="flex flex-col">
              <div class="text-2xl font-semibold">{{ blog?.title }}</div>
              <div class="mt-2 dark:text-white/80" v-html="blog?.text"></div>
              <div class="flex my-8">
                <atoms-category v-if="blog" :category="blog?.category" :active="true"/>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IBlogResponse } from '@/types/index'
import { useRoute } from 'vue-router'
const { $api } = useNuxtApp();
const blog = ref<IBlogResponse>()

const route = useRoute()

const getBlog = async () => {
  try {
    const response = await $api.blog.getBlog(Number(route.params.id));
    blog.value = response
  } catch (error) {
    console.error(error);
  }
}

await getBlog()
</script>
