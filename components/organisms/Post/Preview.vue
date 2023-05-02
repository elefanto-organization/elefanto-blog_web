<template>
  <div class="flex flex-col dark:text-white/80">
    <div class="flex flex-1 items-center text-sm dark:text-gray-500">
      <div>{{ blog.author.username }}</div>
      <div class="mx-1">·</div>
      <div class="text-gray-500">{{ blog.created_at.slice(0,10) }}</div>
    </div>
    <div class="flex flex-1 items-start break-words justify-between mt-3">
      <div class="flex flex-col">
        <div class="text-2xl font-semibold">{{ blog.title }}</div>
        <div class="mt-2 dark:text-gray-600" v-html="blog.text.slice(0,50)"></div>
        <div class="flex my-8">
          <atoms-category :category="blog.category" :active="true"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IBlogResponse } from "~/types/index";
const props = defineProps<{
  blog: IBlogResponse;
}>();
</script>