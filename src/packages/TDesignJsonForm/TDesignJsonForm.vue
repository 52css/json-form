<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, type Inputs, JsonFormDefault } from '../types'
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
        <slot v-if="$slots[prop]" :name="prop" :prop="prop" :model="formData[prop]" :field="inputField" />
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
        <t-input
          v-else-if="inputField?.type === 'text' && !inputField.autocomplete"
          v-model="(formData[prop] as string)"
          :placeholder="inputField?.placeholder"
          :clearable="inputField?.clearable"
          :disabled="inputField?.disabled"
          :maxlength="inputField?.maxlength"
        />
      </t-form-item>
      <t-form-item v-if="submission">
        <t-button theme="primary" type="submit" style="margin-right: 8px">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<style scoped lang="scss">
.t-design-json-form {
}
</style>