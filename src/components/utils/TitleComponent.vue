<template>
  <div class="text-h5 q-mb-md text-weight-bold">{{ props.label }}</div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>