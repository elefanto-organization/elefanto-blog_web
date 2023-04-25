<template>
  <div class="flex-1 flex flex-col">
    <div class="max-w-6xl w-full py-12 px-4 mx-auto">
      <div class="flex flex-col-reverse justify-between md:flex-row">
        <div class="flex flex-col">
          <input  v-model="blog.title" class="my-12 w-80 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="title" required />
          <quill-editor class="dark:text-white/80" style="height: 550px" theme="snow" toolbar="full" v-model:content="blog.text" contentType="html" />
          <button @click="postArticle()" class="mt-7 w-52 bg-black text-white px-6 py-2 text-sm rounded-3xl dark:bg-gray-100 dark:text-black">Submit</button>
        </div>
        <molecules-categories :categories="categories" @onSelectCategory="selectCategory" />
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ICategory, IBlogInput } from '@/types/index'
import { useRouter } from 'vue-router'
export default {
  async setup() {
    if (!process.server) {
      const { QuillEditor } = await import('@vueup/vue-quill');
      const { vueApp } = useNuxtApp();
      if (!vueApp._context.components.QuillEditor) vueApp.component('QuillEditor', QuillEditor);
    }

    const blog = reactive<IBlogInput>({
      category: 0,
      title: '',
      text: '',
    })
    const { $api } = useNuxtApp();
    const categories = ref<ICategory[]>()

    const getCategories = async () => {
      try {
        const response = await $api.blog.getCategories();
        categories.value = response
      } catch (error) {
        console.error(error);
      }
    }
    await getCategories()

    const selectCategory = (category: ICategory) => {
      blog.category = category.id
    }

    const router  = useRouter()

    const postArticle = async () => {
      try {
        const response = await $api.blog.postBlog(blog);
        console.log(response)
        router.push('/')
      } catch (error) {
        console.error(error);
      }
    }
    return { blog, categories, selectCategory, postArticle }
  },
};
</script>
