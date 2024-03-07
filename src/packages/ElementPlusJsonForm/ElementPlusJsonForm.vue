<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, type Inputs } from '../types'
import { getInputs } from '../utils'

export interface ElementPlusJsonFormProps extends JsonFormProps {
  prop1?: string
}
export const ElementPlusJsonFormDefault = {
  model: () => ({})
}
export interface ElementPlusJsonFormEmits {
  (event: 'event1'): void
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<ElementPlusJsonFormProps>(), ElementPlusJsonFormDefault)
defineEmits<ElementPlusJsonFormEmits>()
defineOptions({
  name: 'ElementPlusJsonForm',
})
const formData = ref(props.model ?? {})
</script>

<template>
  <el-form :model="formData" v-if="props.inputs">
    <el-form-item
      v-for="(inputField, prop) in getInputs(inputs as Inputs, formData)"
      :label="inputField?.label"
      :prop="prop"
      :key="prop"
      :rules="[{
        required: inputField?.required,
        message: inputField?.label + '必填',
      }]"
    >
      <el-input
        v-if="inputField?.type === 'text'"
        v-model="formData[prop]"
        :placeholder="inputField?.placeholder ?? '请输入'"
        :clearable="inputField?.clearable"
        :disabled="inputField?.disabled"
        :maxlength="inputField?.maxlength"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.element-plus-json-form {
}
</style>
