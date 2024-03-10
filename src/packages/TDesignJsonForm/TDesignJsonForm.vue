<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, JsonFormDefault } from '../types'
import { getLabelAlignByLayout, getLayoutByLayout } from '../utils'
import TDesignFormItem from './TDesignFormItem.vue'
import { FormProps } from 'tdesign-vue-next'
import {cloneDeep} from 'lodash'

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
const model = ref(props.model ?? {})
const onSubmit: FormProps['onSubmit'] = ({ validateResult }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    const errorKeys = Object.keys(validateResult);
    if (!props.inputs) {
      return;
    }
    tabs: for (const [key, val] of Object.entries(props.inputs)) {
      if (val && typeof val !== 'string' && val.type === 'tabs' && val.options && Array.isArray(val.options)) {
        for (let tabItem of val.options) {
          const tabsInputs = Object.keys(tabItem.inputs)
          const hasKey = errorKeys.some((errorKey) => tabsInputs.includes(errorKey));

          if (hasKey) {
            model.value[key] = tabItem.value;
            break tabs;
          }
        }
      }
    }
  }
}
const defaultModel = ref({})
const onReset: FormProps['onReset'] = () => {
  model.value = cloneDeep(defaultModel.value)
}
</script>

<template>
  <div class="t-design-json-form">
    {{ model }}
    {{ defaultModel }}
    <t-form
      v-if="inputs"
      :data="model"
      :disabled="disabled"
      :label-align="getLabelAlignByLayout(layout)"
      :layout="getLayoutByLayout(layout)"
      label-width="auto"
      class="json-form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <TDesignFormItem :inputs="inputs" :model="model" :default-model="defaultModel" :span="span" />
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