<template>
  <div class="button-container">
    <q-btn unelevated no-caps v-close-popup color="deep-orange" :disable="props.disable" @click="handleClick">{{
      props.label }}
    </q-btn>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'click', event: Event): void;
}

const emit = defineEmits<Emits>();

const handleClick = (event: Event) => {
  emit('click', event);
};

interface Props {
  label: string;
  disable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
.button-container {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
