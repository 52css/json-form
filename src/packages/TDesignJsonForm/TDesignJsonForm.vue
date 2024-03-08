<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, type Inputs, JsonFormDefault } from '../types'
import { getInputsByInputs, getLabelAlignByLayout, getLayoutByLayout } from '../utils'
import { type InputValue, type CheckboxGroupValue } from 'tdesign-vue-next'

export interface TDesignJsonFormProps extends JsonFormProps {
  prop1?: string
}
export const TDesignJsonFormDefault = {
  ...JsonFormDefault
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
    <t-form :data="formData" v-if="inputs" :label-align="getLabelAlignByLayout(layout)" :layout="getLayoutByLayout(layout)" label-width="auto">
      <t-form-item
        v-for="(inputField, prop) in getInputsByInputs(inputs as Inputs, formData)"
        :label="inputField?.label"
        :name="prop"
        :key="prop"
        :rules="[{
          required: inputField?.required,
        }]"
      >
        <t-auto-complete
          v-if="inputField?.type === 'text' && inputField.autocomplete"
          v-model="(formData[prop] as string)"
          :options="inputField?.options"
          :filterable="inputField?.filterable"
          :placeholder="inputField?.placeholder"
          :clearable="inputField?.clearable"
          :disabled="inputField?.disabled"
          :maxlength="inputField?.maxlength"
        />
        <t-input
          v-if="inputField?.type === 'text'"
          v-model="(formData[prop] as string)"
          :placeholder="inputField?.placeholder"
          :clearable="inputField?.clearable"
          :disabled="inputField?.disabled"
          :maxlength="inputField?.maxlength"
        />
        <t-checkbox-group
          v-else-if="inputField?.type === 'checkbox'"
          v-model="(formData[prop] as unknown as CheckboxGroupValue)"
          :options="inputField?.options"
        />
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="scss">
.t-design-json-form {
}
</style>