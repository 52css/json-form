<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, type Inputs } from '../types'
import { getInputs } from '../utils'
import { type InputValue } from 'tdesign-vue-next'

export interface TDesignJsonFormProps extends JsonFormProps {
  prop1?: string
}
export const TDesignJsonFormDefault = {
  model: () => ({})
}
export interface TDesignJsonFormEmits {
  (event: 'event1'): void
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<TDesignJsonFormProps>(), TDesignJsonFormDefault)
defineEmits<TDesignJsonFormEmits>()
defineOptions({
  name: 'TDesignJsonForm',
})
const formData = ref(props.model ?? {})
</script>

<template>
  <div class="t-design-json-form">
    <t-form :data="formData" v-if="props.inputs">
      <t-form-item
        v-for="(inputField, prop) in getInputs(inputs as Inputs, formData)"
        :label="inputField?.label"
        :name="prop"
        :key="prop"
        :rules="[{
          required: inputField?.required,
        }]"
      >
        <t-input
          v-if="inputField?.type === 'text'"
          v-model="(formData[prop] as InputValue)"
          :placeholder="inputField?.placeholder"
          :clearable="inputField?.clearable"
          :disabled="inputField?.disabled"
          :maxlength="inputField?.maxlength"
        />
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="scss">
.t-design-json-form {
}
</style>
../types../utils