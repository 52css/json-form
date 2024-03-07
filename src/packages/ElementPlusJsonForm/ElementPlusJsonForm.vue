<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, type Inputs, JsonFormDefault } from '../types'
import { getInputsByInputs, getLabelAlignByLayout } from '../utils'

export interface ElementPlusJsonFormProps extends JsonFormProps {
  prop1?: string
}
export const ElementPlusJsonFormDefault = {
  ...JsonFormDefault
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
  <el-form :model="formData" v-if="props.inputs" :label-position="getLabelAlignByLayout(layout)" :inline="layout === 'inline'">
    <el-form-item
      v-for="(inputField, prop) in getInputsByInputs(inputs as Inputs, formData)"
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
        v-model="(formData[prop] as string)"
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
