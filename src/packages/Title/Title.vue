<script lang="ts">
export interface TitleProps {
  label?: string
}
export const TitleDefault = {}
export interface TitleEmits {
  (event: 'event1'): void
}
export default {
  name: 'Title',
}
</script>
<script setup lang="ts">
withDefaults(defineProps<TitleProps>(), TitleDefault)
defineEmits<TitleEmits>()
</script>

<template>
  <div class="title">
    {{ label }}
  </div>
</template>

<style scoped lang="scss">
.title {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    left: -10px;
    height: 14px;
    width: 4px;
    border-radius: 5px;
    background-color: #0052d9;
  }
  &::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: -8px;
    height: 1px;
    background-color: #d7d7d7;
  }
}
</style>
