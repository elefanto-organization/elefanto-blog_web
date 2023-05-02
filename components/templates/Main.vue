<template>
  <div class="flex-1 flex flex-col">
    <div class="max-w-6xl w-full py-12 px-4 mx-auto">
      <div class="flex flex-col-reverse justify-between md:flex-row">
        <div class="flex flex-col flex-1 ">
          <organisms-post-preview 
            v-for="blog in blogs" 
            :key="blog?.id" 
            :blog="blog" 
            @click="goToArticle(blog.id)"
            class="cursor-pointer"
          />
        </div>
        <div>
          <div class="flex flex-col gap-4 mb-8 ml-[0] md:ml-36">
            <input 
              v-model="params.author"
              class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="author" required />
              <input 
              v-model="params.search"
              class=" flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="topic" required />
            </div>
          <molecules-categories 
            :categories="categories" 
            :chosen-category="chosenCategory"
            @onSelectCategory="selectCategory"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IBlogParams, IBlogResponse, ICategory } from '@/types/index'
const { $api } = useNuxtApp();
import { useRouter } from 'vue-router'
import { toRaw, watch } from 'vue';
const params = reactive<IBlogParams>({
  author: '',
  search: '',
  category: ''
});

const blogs = ref<IBlogResponse[]>()
const categories = ref<ICategory[]>()
const router  = useRouter()

const goToArticle = (id: number) => {
  router.push(`/blog/${id}`)
}

const chosenCategory = ref<ICategory | null>(null)

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

const selectCategory = (category: ICategory) => {
  chosenCategory.value = category
  params.category = category.name
}

watch(
  () => params,
  async params => {
    // use toRaw here to get a readable console.log result
    await getBlogs()
  },
  { deep: true },
)

await getBlogs()
await getCategories()

</script>