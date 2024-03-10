<script lang="ts">
import { type Inputs, type Model, CommonOption } from '../types'
import { getInputsByInputs } from '../utils'
import { type CheckboxGroupValue } from 'tdesign-vue-next'

export interface TDesignFormItemProps {
  inputs?: Inputs
  model?: Model,
  span?: number,
}
export const TDesignFormItemDefault = {}
export interface TDesignFormItemEmits {
  (event: 'event1'): void
}
export default {
  name: 'TDesignFormItem',
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<TDesignFormItemProps>(), TDesignFormItemDefault)
defineEmits<TDesignFormItemEmits>()
const model = ref(props.model ?? {})
</script>

<template>
  <template v-for="(inputField, prop) in getInputsByInputs(inputs as Inputs, model)" :key="prop">
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
          <TDesignFormItem :inputs="(option.inputs as Inputs)" :model="model" :span="span" />
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
        <t-auto-complete
          v-else-if="inputField?.type === 'text' && inputField.autocomplete"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
        />
        <t-cascader
          v-else-if="inputField?.type === 'select' && inputField.cascader"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
        />
        <t-checkbox-group
          v-else-if="inputField?.type === 'checkbox'"
          v-model="(model[prop] as unknown as CheckboxGroupValue)"
          v-bind="(inputField as any)"
        />
        <t-color-picker
          v-else-if="inputField?.type === 'color'"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
        />
        <t-date-picker
          v-else-if="inputField?.type === 'date'"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'date-range'"
          v-model="(model[prop] as string[])"
          v-bind="(inputField as any)"
        />
        <t-date-picker
          v-else-if="inputField?.type === 'datetime'"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
          enable-time-picker
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'datetime-range'"
          v-model="(model[prop] as string[])"
          v-bind="(inputField as any)"
          enable-time-picker
        />
        <t-date-picker
          v-else-if="inputField?.type === 'year'"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
          mode="year"
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'year-range'"
          v-model="(model[prop] as string[])"
          v-bind="(inputField as any)"
          mode="year"
        />
        <t-date-picker
        v-bind="(inputField as any)"
          v-else-if="inputField?.type === 'month'"
          v-model="(model[prop] as string)"
          mode="month"
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'month-range'"
          v-bind="(inputField as any)"
          v-model="(model[prop] as string[])"
          mode="month"
        />
        <t-date-picker
          v-else-if="inputField?.type === 'quarter'"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
          mode="quarter"
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'quarter-range'"
          v-model="(model[prop] as string[])"
          v-bind="(inputField as any)"
          mode="quarter"
        />
        <t-date-picker
          v-else-if="inputField?.type === 'week'"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
          mode="week"
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'week-range'"
          v-model="(model[prop] as string[])"
          v-bind="(inputField as any)"
          mode="week"
        />
        <t-input
          v-else-if="inputField?.type === 'text' && !inputField.autocomplete"
          v-model="(model[prop] as string)"
          v-bind="(inputField as any)"
          :label="inputField?.prefix"
        />
        <t-input-number
          v-else-if="inputField?.type === 'number'"
          v-model="(model[prop] as number)"
          v-bind="(inputField as any)"
        />
        <t-radio-group
          v-else-if="inputField?.type === 'radio'"
          v-model="model[prop]"
          v-bind="(inputField as any)"
        />
        <t-select
          v-else-if="inputField?.type === 'select' && !inputField.cascader && !inputField.tree"
          v-model="model[prop]"
          v-bind="(inputField as any)"
        />
        <t-slider
          v-else-if="inputField?.type === 'range'"
          v-model="model[prop]"
          v-bind="(inputField as any)"
        />
        <t-switch
          v-else-if="inputField?.type === 'switch'"
          v-model="model[prop]"
          v-bind="(inputField as any)"
        />
        <t-textarea
          v-else-if="inputField?.type === 'textarea'"
          v-model="model[prop]"
          v-bind="(inputField as any)"
        />
        <t-transfer
          v-else-if="inputField?.type === 'textarea'"
          v-model="model[prop]"
          v-bind="(inputField as any)"
          :data="(inputField?.options as CommonOption[])"
        />
        <t-time-picker
          v-else-if="inputField?.type === 'time'"
          v-model="model[prop]"
          v-bind="(inputField as any)"
        />
        <t-tree-select
          v-else-if="inputField?.type === 'select' && inputField.tree"
          v-model="model[prop]"
          v-bind="(inputField as any)"
        />
      </t-form-item>
    </template>
  </template>
</template>

<style scoped lang="scss">
.TDesignFormItem {
}
</style>
