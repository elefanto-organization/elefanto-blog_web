<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    width?: number | string;
    height?: number | string;
  }>(),
  {
    width: 22,
    height: 22,
  }
);
const currentIcon = computed(() =>
  defineAsyncComponent({
    loader: () => import(`../../assets/icons/${props.name}.svg`),
    loadingComponent: {
      template: "<span style='{width: 22px; height: 22px}'>123</span>",
    },
    errorComponent: {
      template: "<span>error</span>",
    },
    delay: 200,
    timeout: 3000,
    suspensible: true,
  })
);
const attrs = useAttrs();
</script>

<template>
  <div class="icon">
    <client-only>
      <component
        :is="currentIcon"
        :height="height"
        :width="width"
        :class="attrs.class" />
      <template #fallback> </template>
    </client-only>
  </div>
</template>
