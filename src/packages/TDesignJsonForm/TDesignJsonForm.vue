<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, JsonFormDefault, type Inputs, type Model } from '../types'
import { getLabelAlignByLayout, getLayoutByLayout } from '../utils'
import TDesignFormItem from './TDesignFormItem.vue'
import { FormProps } from 'tdesign-vue-next'
import { cloneDeep, set } from 'lodash'

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
    console.log('Success: ', model.value, getFlatModel.value);
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
const tableData = ref()
const paginationTotal = ref(0)
const formItemRef = ref()
// const obj = {};

// set(obj, 'abc.efg', 123)

// console.log('obj', obj)
const setFlatModel = (inputs: Inputs, flatModel: Model) => {
  for (const [key, inputField] of Object.entries(inputs)) {
    const show = inputField.if ? inputField.if(model) : true

    if (show) {
      console.log('key', key, typeof key, model.value[key])
      debugger
      set(flatModel, key, model.value[key])
      // set(flatModel, 'tab2.input129999', 123)
      // set(flatModel, 'abc.efg', 123)
      if (inputField.type === 'tabs') {
        inputField.options.forEach(x => setFlatModel(x.inputs, flatModel))
      }
    } else {
      // delete flatModel[key]
    }
  }
}
const getFlatModel = computed(() => {
  const flatModel = cloneDeep(model.value)
  const inputs = formItemRef.value?.inputFieldMap

  setFlatModel(inputs, flatModel)

  // set(flatModel, 'abc.efg', 123)

  // console.log('aaa', flatModel)

  return flatModel;
})
const init = () => {
  if (props.request && props.columns) {
    props.request(model.value).then(({total, rows}) => {
      tableData.value = rows ?? []
      paginationTotal.value = total ?? 0
    })
  }
}

defineExpose({
  init
})
</script>

<template>
  <div class="json-form">
    <!-- {{ model }} -->
    <!-- {{ defaultModel }} -->
    <t-form
      v-if="inputs"
      v-bind="$attrs"
      :data="model"
      :disabled="disabled"
      :label-align="getLabelAlignByLayout(layout)"
      :layout="getLayoutByLayout(layout)"
      label-width="auto"
      class="json-form__form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <TDesignFormItem ref="formItemRef" :inputs="inputs" :model="model" :default-model="defaultModel" :span="span">
        <template v-for="(_value, name) in $slots" #[name]="scopeData">
          <slot :name="(name as string)" v-bind="scopeData" />
        </template>
      </TDesignFormItem>
      <t-form-item v-if="request">
        <t-button theme="primary" type="submit" style="margin-right: 8px">
          {{ (layout === 'inline' || columns ) ? '查询' : '提交' }}
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