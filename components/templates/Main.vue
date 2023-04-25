<template>
  <div class="flex-1 flex flex-col">
    <div class="max-w-6xl w-full py-12 px-4 mx-auto">
      <div class="flex flex-col-reverse justify-between md:flex-row">
        <div class="flex flex-col">
          <organisms-post-preview 
            v-for="blog in blogs" 
            :key="blog?.id" 
            :blog="blog" 
            @click="goToArticle(blog.id)"
            class="cursor-pointer"
          />
        </div>
        <molecules-categories :categories="categories" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IBlogParams, IBlogResponse, ICategory } from '@/types/index'
const { $api } = useNuxtApp();
import { useRouter } from 'vue-router'
const params = reactive<IBlogParams>({
});

const blogs = ref<IBlogResponse[]>()
const categories = ref<ICategory[]>()
const router  = useRouter()

const goToArticle = (id: number) => {
  router.push(`/blog/${id}`)
}

const getBlogs = async () => {
  try {
    const response = await $api.blog.getBlogs(params);
    blogs.value = response
    console.log(response)
  } catch (error) {
    console.error(error);
  }

}

const getCategories = async () => {
  try {
    const response = await $api.blog.getCategories();
    categories.value = response
  } catch (error) {
    console.error(error);
  }
}

await getBlogs()
await getCategories()

</script>