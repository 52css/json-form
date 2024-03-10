<script lang="ts">
import { type Inputs, type Model } from '../types'
import { getInputsByInputs } from '../utils'
import _ from 'lodash'
import { 
  AutoComplete as TAutoComplete,
  Cascader as TCascader,
  CheckboxGroup as TCheckboxGroup,
  ColorPicker as TColorPicker,
  DatePicker as TDatePicker,
  DateRangePicker as TDateRangePicker,
  Input as TInput,
  InputNumber as TInputNumber,
  RadioGroup as TRadioGroup,
  Select as TSelect,
  Slider as TSlider,
  Switch as TSwitch,
  Textarea as TTextarea,
  TimePicker as TTimePicker,
  TreeSelect as TTreeSelect,
  Transfer as TTransfer,
  Upload as TUpload,
} from 'tdesign-vue-next'

export interface TDesignFormItemProps {
  inputs?: Inputs
  model: Model,
  defaultModel: Model,
  span?: number,
}
export const TDesignFormItemDefault = {}
export interface TDesignFormItemEmits {
  (event: 'event1'): void
}
export const pascalCase = (string: string) => _.upperFirst(_.camelCase(string));
export default {
  name: 'TDesignFormItem',
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<TDesignFormItemProps>(), TDesignFormItemDefault)
defineEmits<TDesignFormItemEmits>()
const componentMap = {
  TAutoComplete,
  TCascader,
  TCheckboxGroup,
  TColorPicker,
  TDatePicker,
  TDateRangePicker,
  TInput,
  TInputNumber,
  TRadioGroup,
  TSelect,
  TSlider,
  TSwitch,
  TTextarea,
  TTimePicker,
  TTreeSelect,
  TTransfer,
  TUpload,
}
const inputFieldMap = getInputsByInputs(props.inputs as Inputs, props.model, props.defaultModel)
</script>

<template>
  <template v-for="(inputField, prop) in inputFieldMap" :key="prop">
    <template v-if="(inputField._if ? inputField._if(model): true)">
      <t-tabs
        v-if="inputField.type === 'tabs'"
        v-model="model[prop]"
        :data-span="inputField.span ?? span"
        :theme="inputField.theme"
        :placement="inputField.placement"
        class="json-form__item"
      >
        <t-tab-panel
          v-for="option in inputField.options"
          :label="option?.label"
          :value="(option?.value as string)"
          :key="(option?.value as string)"
          :destroy-on-hide="false"
        >
          <TDesignFormItem :inputs="(option.inputs as Inputs)" :model="model" :default-model="defaultModel" :span="span" />
        </t-tab-panel>
      </t-tabs>
      <t-form-item
        :label="inputField?.label"
        :name="prop"
        :rules="[{
          required: inputField?.required,
        }]"
        :data-span="inputField.span ?? span"
        :data-prop="prop"
        class="json-form__item"
      >
        <slot
          v-if="$slots[prop]"
          :name="prop"
          :prop="prop"
          :model="model[prop]"
          :field="inputField"
        />
        <component
          v-else
          :is="componentMap[pascalCase(`t-${inputField.type}`) as keyof typeof componentMap]"
          v-model="(model[prop] as any)"
          v-bind="(inputField as any)"
          :label="inputField?.prefix"
        />
      </t-form-item>
    </template>
  </template>
</template>

<style scoped lang="scss">
.TDesignFormItem {
}
</style>
