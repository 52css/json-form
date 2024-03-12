<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, JsonFormDefault, type Inputs, type CommonOption, type CommonInput } from '../types'
import { getLabelAlignByLayout, getLayoutByLayout } from '../utils'
import TDesignFormItem from './TDesignFormItem.vue'
import { FormProps } from 'tdesign-vue-next'
import { set } from 'lodash'

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
const model = ref({})
const onSubmit: FormProps['onSubmit'] = ({ validateResult }) => {
  if (validateResult === true) {
    props.request && props.request(getFlatModel.value).then(() => {
      MessagePlugin.success('提交成功');
    })
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
const onReset: FormProps['onReset'] = () => {
}
const tableData = ref()
const paginationTotal = ref(0)
const formItemRef = ref()

const getCanSet = (inputs: Inputs, setKey: string) => {
  for (const [key, inputField] of Object.entries(inputs)) {

    if (typeof inputField === 'string') {
      return true;
    }

    if (key === setKey) {
      return inputField._if ? inputField._if(model) : true;
    }

    if (inputField.type === 'tabs') {
      type TabOptions = (CommonOption & {
          inputs: Record<string, CommonInput>;
      })[];
      for (const tab of inputField.options as TabOptions) {
        if (getCanSet(tab.inputs, setKey)) {
          return true;
        }
      }
      // inputField.options.forEach(x => setFlatModel(x.inputs, flatModel))
    }
  }
}
const getFlatModel = computed(() => {
  const flatModel = {};
  const inputs = formItemRef.value?.inputFieldMap

  for (const [key, val] of Object.entries(toRaw(model.value))) {
    const canSet  = getCanSet(inputs, key);
    // 判断是否可以set
    if (canSet) {
      set(flatModel, key, val)
    }
  }

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

watch(() => props.model, (val) => {
  model.value = val
}, {
  immediate: true
})

defineExpose({
  init,
  model: () => getFlatModel.value,
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
      :label-width="layout === 'inline' ? 'auto' : '240px'"
      reset-type="initial"
      class="json-form__form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <TDesignFormItem ref="formItemRef" :inputs="inputs" :model="model" :span="span">
        <template v-for="(_value, name) in $slots" #[name]="scopeData">
          <slot :name="(name as string)" v-bind="scopeData" />
        </template>
      </TDesignFormItem>
      <t-form-item v-if="request" class="json-form__form__action">
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