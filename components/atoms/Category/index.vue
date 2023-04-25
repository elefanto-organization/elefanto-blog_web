<template>
  <div class="hover:bg-gray-200 py-2 px-4 bg-gray-100  dark:bg-gray-600 cursor-pointer leading-5  rounded-3xl text-normal flex-grow-0">{{ category.name }}</div>
</template>
<script setup lang="ts">
import { ICategory } from "~/types/index";
const props = defineProps<{
  category: ICategory;
}>();
</script>