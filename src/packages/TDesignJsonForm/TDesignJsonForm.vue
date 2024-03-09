<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, type Inputs, JsonFormDefault, CommonOption } from '../types'
import { getInputsByInputs, getLabelAlignByLayout, getLayoutByLayout } from '../utils'
import { type CheckboxGroupValue, type TreeOptionData } from 'tdesign-vue-next'

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
    <!-- {{ formData }} -->
    <t-form
      v-if="inputs"
      :data="formData"
      :disabled="disabled"
      :label-align="getLabelAlignByLayout(layout)"
      :layout="getLayoutByLayout(layout)"
      label-width="auto"
      class="json-form"
    >
      <template v-for="(inputField, prop) in getInputsByInputs(inputs as Inputs, formData)" :key="prop">
        <t-form-item
          v-if="(inputField.$if ? inputField.$if(formData): true)"
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
            :model="formData[prop]"
            :field="inputField"
          />
          <t-auto-complete
            v-else-if="inputField?.type === 'text' && inputField.autocomplete"
            v-model="(formData[prop] as string)"
            :disabled="inputField?.disabled"
            :placeholder="inputField?.placeholder"
            :clearable="inputField?.clearable"
            :maxlength="inputField?.maxlength"
            :options="inputField?.options"
            :filterable="inputField?.filterable"
          />
          <t-cascader
            v-else-if="inputField?.type === 'select' && inputField.cascader"
            v-model="(formData[prop] as string)"
            :disabled="inputField?.disabled"
            :placeholder="inputField?.placeholder"
            :clearable="inputField?.clearable"
            :options="(inputField?.options as TreeOptionData<string | number>[])"
            :filterable="inputField?.filterable"
          />
          <t-checkbox-group
            v-else-if="inputField?.type === 'checkbox'"
            v-model="(formData[prop] as unknown as CheckboxGroupValue)"
            :options="inputField?.options"
          />
          <t-color-picker
            v-else-if="inputField?.type === 'color'"
            v-model="(formData[prop] as string)"
            format="CSS"
          />
          <t-date-picker
            v-else-if="inputField?.type === 'date'"
            v-model="(formData[prop] as string)"
            allow-input
            clearable
          />
          <t-date-range-picker
            v-else-if="inputField?.type === 'daterange'"
            v-model="(formData[prop] as string[])"
            allow-input
            clearable
          />
          <t-date-picker
            v-else-if="inputField?.type === 'datetime'"
            v-model="(formData[prop] as string)"
            allow-input
            clearable
          />
          <t-date-range-picker
            v-else-if="inputField?.type === 'datetimerange'"
            v-model="(formData[prop] as string[])"
            allow-input
            clearable
          />
          <t-date-picker
            v-else-if="inputField?.type === 'year'"
            v-model="(formData[prop] as string)"
            mode="year"
            allow-input
            clearable
          />
          <t-date-range-picker
            v-else-if="inputField?.type === 'yearrange'"
            v-model="(formData[prop] as string[])"
            mode="year"
            allow-input
            clearable
          />
          <t-date-picker
            v-else-if="inputField?.type === 'month'"
            v-model="(formData[prop] as string)"
            mode="month"
            allow-input
            clearable
          />
          <t-date-range-picker
            v-else-if="inputField?.type === 'monthrange'"
            v-model="(formData[prop] as string[])"
            mode="month"
            allow-input
            clearable
          />
          <t-date-picker
            v-else-if="inputField?.type === 'quarter'"
            v-model="(formData[prop] as string)"
            mode="quarter"
            allow-input
            clearable
          />
          <t-date-range-picker
            v-else-if="inputField?.type === 'quarterrange'"
            v-model="(formData[prop] as string[])"
            mode="quarter"
            allow-input
            clearable
          />
          <t-date-picker
            v-else-if="inputField?.type === 'week'"
            v-model="(formData[prop] as string)"
            mode="week"
            allow-input
            clearable
          />
          <t-date-range-picker
            v-else-if="inputField?.type === 'weekrange'"
            v-model="(formData[prop] as string[])"
            mode="week"
            allow-input
            clearable
          />
          <t-input
            v-else-if="inputField?.type === 'text' && !inputField.autocomplete"
            v-model="(formData[prop] as string)"
            :placeholder="inputField?.placeholder"
            :clearable="inputField?.clearable"
            :disabled="inputField?.disabled"
            :maxlength="inputField?.maxlength"
          />
          <t-input-number
            v-else-if="inputField?.type === 'number'"
            v-model="(formData[prop] as number)"
            :min="inputField?.min"
            :max="inputField?.max"
            :step="inputField?.step"
            :precision="inputField?.precision"
          />
          <t-radio-group
            v-else-if="inputField?.type === 'radio'"
            v-model="formData[prop]"
            :options="inputField?.options"
          />
          <t-select
            v-else-if="inputField?.type === 'select' && !inputField.cascader && !inputField.tree"
            v-model="formData[prop]"
            :options="inputField?.options"
          />
          <t-slider
            v-else-if="inputField?.type === 'range'"
            v-model="formData[prop]"
            :min="inputField.min"
            :max="inputField.max"
            :step="inputField.step"
            :marks="inputField.marks"
          />
          <t-switch
            v-else-if="inputField?.type === 'switch'"
            v-model="formData[prop]"
          />
          <t-textarea
            v-else-if="inputField?.type === 'textarea'"
            v-model="formData[prop]"
          />
          <t-transfer
            v-else-if="inputField?.type === 'textarea'"
            v-model="formData[prop]"
            :data="(inputField?.options as CommonOption[])"
          />
          <t-time-picker
            v-else-if="inputField?.type === 'time'"
            v-model="formData[prop]"
          />
          <t-tree-select
            v-else-if="inputField?.type === 'select' && inputField.tree"
            v-model="formData[prop]"
            :options="inputField?.options"
          />
        </t-form-item>
      </template>
      <t-form-item>
        <t-button theme="primary" type="submit" style="margin-right: 8px">
          {{ layout === 'inline' ? '查询' : '提交' }}
        </t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="scss">
.t-design-json-form {
}
</style>