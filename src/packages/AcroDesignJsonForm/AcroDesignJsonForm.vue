<script lang="ts">
import { Form as AForm, FormItem as AFormItem, Input as AInput, CheckboxGroup as ACheckboxGroup, type CheckboxOption } from '@arco-design/web-vue'
import { ref } from 'vue'
import { type JsonFormProps, type Inputs, JsonFormDefault } from '../types'
import { getInputsByInputs } from '../utils'


export interface AcroDesignJsonFormProps extends JsonFormProps {
  prop1?: string
}
export const AcroDesignJsonFormDefault = {
  ...JsonFormDefault
}
export interface AcroDesignJsonFormEmits {
  (event: 'event1'): void
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<AcroDesignJsonFormProps>(), AcroDesignJsonFormDefault)
defineEmits<AcroDesignJsonFormEmits>()
defineOptions({
  name: 'AcroDesignJsonForm',
})
const formData = ref(props.model ?? {})
</script>

<template>
  <a-form
    v-if="inputs"
    :model="formData"
    :layout="layout"
  >
    <a-form-item
      v-for="(inputField, prop) in getInputsByInputs(inputs as Inputs, formData)"
      :label="inputField?.label"
      :field="prop"
      :key="prop"
      :rules="[{
        required: inputField?.required,
        message: inputField?.label + '必填',
      }]"
    >
      <a-input
        v-if="inputField?.type === 'input'"
        v-model="(formData[prop] as string)"
        :placeholder="inputField?.placeholder ?? '请输入'"
        :clearable="inputField?.clearable"
        :disabled="inputField?.disabled"
        :maxlength="inputField?.maxlength"
      />
      <a-checkbox-group
        v-else-if="inputField?.type === 'checkbox'"
        v-model="(formData[prop] as unknown as string[])"
        :options="(inputField?.options as CheckboxOption[])"
      />
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss">
.AcroDesignJsonForm {
}
</style>
