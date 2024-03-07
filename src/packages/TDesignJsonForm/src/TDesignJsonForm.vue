<script lang="ts">
export interface TDesignJsonFormProps {
  prop1?: string
}
export const TDesignJsonFormDefault = {}
export interface TDesignJsonFormEmits {
  (event: 'event1'): void
}
</script>
<script setup lang="ts">
withDefaults(defineProps<TDesignJsonFormProps>(), TDesignJsonFormDefault)
defineEmits<TDesignJsonFormEmits>()
defineOptions({
  name: 'TDesignJsonForm',
})
</script>

<template>
  <div class="TDesignJsonForm">
    TDesignJsonForm
  </div>
</template>

<style scoped lang="scss">
.TDesignJsonForm {
}
</style>
