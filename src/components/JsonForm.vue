<script lang="ts">
export interface JsonFormProps {
  prop1?: string
}
export const JsonFormDefault = {}
export interface JsonFormEmits {
  (event: 'event1'): void
}
</script>
<script setup lang="ts">
withDefaults(defineProps<JsonFormProps>(), JsonFormDefault)
defineEmits<JsonFormEmits>()
defineOptions({
  name: 'JsonForm',
})
</script>

<template>
  <div class="json-form">
    JsonForm
  </div>
</template>

<style scoped lang="scss">
.json-form {
}
</style>
