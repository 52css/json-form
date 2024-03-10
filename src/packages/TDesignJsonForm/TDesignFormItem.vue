<script lang="ts">
import { type Inputs, type Model, CommonOption } from '../types'
import { getInputsByInputs } from '../utils'
import { type CheckboxGroupValue, type TreeOptionData } from 'tdesign-vue-next'

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
    <template v-if="(inputField.$if ? inputField.$if(model): true)">
      <t-tabs
        v-if="inputField.type === 'group'"
        v-model="model[prop]"
        theme="card"
        class="json-form__item"
        :data-span="inputField.span ?? span"
      >
        <t-tab-panel
          v-for="option in inputField.options"
          :label="option?.label"
          :value="(option?.value as string)"
          :key="(option?.value as string)">
          <TDesignFormItem :inputs="option.inputs" :model="model" :span="span" />
        </t-tab-panel>
      </t-tabs>
      <t-form-item
        :label="inputField?.label"
        :name="prop"
        :rules="[{
          required: inputField?.required,
          message: inputField?.label + '必填',
        }]"
        class="json-form__item"
        :data-span="inputField.span ?? span"
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
          :disabled="inputField?.disabled"
          :placeholder="inputField?.placeholder"
          :clearable="inputField?.clearable"
          :maxlength="inputField?.maxlength"
          :options="inputField?.options"
          :filterable="inputField?.filterable"
        />
        <t-cascader
          v-else-if="inputField?.type === 'select' && inputField.cascader"
          v-model="(model[prop] as string)"
          :disabled="inputField?.disabled"
          :placeholder="inputField?.placeholder"
          :clearable="inputField?.clearable"
          :options="(inputField?.options as TreeOptionData<string | number>[])"
          :filterable="inputField?.filterable"
        />
        <t-checkbox-group
          v-else-if="inputField?.type === 'checkbox'"
          v-model="(model[prop] as unknown as CheckboxGroupValue)"
          :options="inputField?.options"
        />
        <t-color-picker
          v-else-if="inputField?.type === 'color'"
          v-model="(model[prop] as string)"
          format="CSS"
        />
        <t-date-picker
          v-else-if="inputField?.type === 'date'"
          v-model="(model[prop] as string)"
          allow-input
          clearable
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'daterange'"
          v-model="(model[prop] as string[])"
          allow-input
          clearable
        />
        <t-date-picker
          v-else-if="inputField?.type === 'datetime'"
          v-model="(model[prop] as string)"
          allow-input
          clearable
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'datetimerange'"
          v-model="(model[prop] as string[])"
          allow-input
          clearable
        />
        <t-date-picker
          v-else-if="inputField?.type === 'year'"
          v-model="(model[prop] as string)"
          mode="year"
          allow-input
          clearable
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'yearrange'"
          v-model="(model[prop] as string[])"
          mode="year"
          allow-input
          clearable
        />
        <t-date-picker
          v-else-if="inputField?.type === 'month'"
          v-model="(model[prop] as string)"
          mode="month"
          allow-input
          clearable
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'monthrange'"
          v-model="(model[prop] as string[])"
          mode="month"
          allow-input
          clearable
        />
        <t-date-picker
          v-else-if="inputField?.type === 'quarter'"
          v-model="(model[prop] as string)"
          mode="quarter"
          allow-input
          clearable
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'quarterrange'"
          v-model="(model[prop] as string[])"
          mode="quarter"
          allow-input
          clearable
        />
        <t-date-picker
          v-else-if="inputField?.type === 'week'"
          v-model="(model[prop] as string)"
          mode="week"
          allow-input
          clearable
        />
        <t-date-range-picker
          v-else-if="inputField?.type === 'weekrange'"
          v-model="(model[prop] as string[])"
          mode="week"
          allow-input
          clearable
        />
        <t-input
          v-else-if="inputField?.type === 'text' && !inputField.autocomplete"
          v-model="(model[prop] as string)"
          :placeholder="inputField?.placeholder"
          :clearable="inputField?.clearable"
          :disabled="inputField?.disabled"
          :maxlength="inputField?.maxlength"
        />
        <t-input-number
          v-else-if="inputField?.type === 'number'"
          v-model="(model[prop] as number)"
          :min="inputField?.min"
          :max="inputField?.max"
          :step="inputField?.step"
          :precision="inputField?.precision"
        />
        <t-radio-group
          v-else-if="inputField?.type === 'radio'"
          v-model="model[prop]"
          :options="inputField?.options"
        />
        <t-select
          v-else-if="inputField?.type === 'select' && !inputField.cascader && !inputField.tree"
          v-model="model[prop]"
          :options="inputField?.options"
        />
        <t-slider
          v-else-if="inputField?.type === 'range'"
          v-model="model[prop]"
          :min="inputField.min"
          :max="inputField.max"
          :step="inputField.step"
          :marks="inputField.marks"
        />
        <t-switch
          v-else-if="inputField?.type === 'switch'"
          v-model="model[prop]"
        />
        <t-textarea
          v-else-if="inputField?.type === 'textarea'"
          v-model="model[prop]"
        />
        <t-transfer
          v-else-if="inputField?.type === 'textarea'"
          v-model="model[prop]"
          :data="(inputField?.options as CommonOption[])"
        />
        <t-time-picker
          v-else-if="inputField?.type === 'time'"
          v-model="model[prop]"
        />
        <t-tree-select
          v-else-if="inputField?.type === 'select' && inputField.tree"
          v-model="model[prop]"
          :options="inputField?.options"
        />
      </t-form-item>
    </template>
  </template>
</template>

<style scoped lang="scss">
.TDesignFormItem {
}
</style>
