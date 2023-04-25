<template>
  <div class="w-full md:w-72 flex flex-col dark:text-white/80 ml-[0] mb-12 md:ml-36">
    <div class="font-medium mb-4">Recommended topics</div>
    <div class="flex flex-wrap items-start gap-2">
      <atoms-category 
        v-for="category in categories" 
        :key="category.id" 
        :category="category" 
        @click="$emit('onSelectCategory', category)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ICategory } from "~/types/index";
const props = defineProps<{
  categories: ICategory[] | undefined;
}>();
</script>