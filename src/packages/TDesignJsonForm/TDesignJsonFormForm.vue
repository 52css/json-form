<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, JsonFormDefault, type Inputs, type CommonOption, type Columns } from '../types'
import { getColumnsByColumns, getLabelAlignByLayout, getLayoutByLayout } from '../utils'
import TDesignJsonFormFormItem from './TDesignJsonFormFormItem.vue'
import { FormProps, PageInfo, PrimaryTableCol, TableRowData, TdPaginationProps, } from 'tdesign-vue-next'
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
const slots = defineSlots()
defineEmits<TDesignJsonFormEmits>()
defineOptions({
  name: 'TDesignJsonFormForm',
})
const model = ref<{ [key: string]: any }>({})
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
          if (!tabItem.inputs) {
            continue;
          }
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
const pagination = ref({
  pageSize: 10,
  total: 0,
  current: 1,
  showPageSize: true,
  showJumper: true,
  size: 'medium',
})
const formRef = ref()
const formItemRef = ref()

const getCanSet = (inputs: Inputs, setKey: string) => {
  for (const [key, inputField] of Object.entries(inputs)) {

    if (typeof inputField === 'string') {
      return true;
    }

    if (key === setKey) {
      return inputField._if ? inputField._if(model) : true;
    }

    if (['tabs', 'steps'].includes(inputField.type)) {
      type TabOptions = CommonOption[];
      for (const tab of inputField.options as TabOptions) {
        if (tab.inputs && getCanSet(tab.inputs, setKey)) {
          return true;
        }
      }
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
    props.request({
      ...model.value,
      current: pagination.value.current,
      pageSize: pagination.value.pageSize,
    }).then(({total, rows}) => {
      tableData.value = rows ?? []
      pagination.value.total = total ?? 0
    })
  }
}
// 分页变化
const onPageChange = (pageInfo: PageInfo) => {
  pagination.value.current = pageInfo.current
  pagination.value.pageSize = pageInfo.pageSize
  init()
}

let columnList = getColumnsByColumns(props.columns as Columns)

watch(() => props.model, (val) => {
  model.value = val
}, {
  immediate: true
})

init();

defineExpose({
  init,
  model: () => getFlatModel.value,
  formRef,
  formItemRef,
})
</script>

<template>
  <div flex flex-col gap-2>
    <t-form
      v-if="inputs"
      ref="formRef"
      v-bind="$attrs"
      :data="model"
      :disabled="disabled"
      :label-align="getLabelAlignByLayout(columns ? 'inline' : layout)"
      :layout="getLayoutByLayout(columns ? 'inline' : layout)"
      :label-width="(columns ? 'inline' : layout) === 'inline' ? 'auto' : '240px'"
      reset-type="initial"
      class="json-form-form__form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <t-design-json-form-form-item
        ref="formItemRef"
        :inputs="inputs"
        :request="request"
        :model="model"
        :span="span"
        :layout="layout"
        :disabled="disabled"
        :columns="columns"
      >
        <template v-for="(_value, name) in slots" #[name]="scopeData">
          <slot :name="(name as string)" v-bind="scopeData" />
        </template>
      </t-design-json-form-form-item>
      <t-form-item v-if="slots.extra" flex items-center justify-center w-full>
        <slot name="extra" />
      </t-form-item>
      <t-form-item v-else-if="request" flex items-center justify-center w-full>
        <template v-if="columns">
          <t-button theme="primary" type="submit" style="margin-right: 0.5rem">
            查询
          </t-button>
          <t-button theme="default" variant="outline" type="reset">
            重置
          </t-button>
        </template>
        <template v-else>
          <t-button theme="primary" type="submit" style="margin-right: 0.5rem">
            提交
          </t-button>
          <t-button theme="default" variant="outline" type="reset">
            重置
          </t-button>
        </template>
      </t-form-item>
    </t-form>

    <t-enhanced-table
      v-if="columns"
      v-bind="$attrs"
      :data="tableData"
      :columns="(columnList as PrimaryTableCol<TableRowData>[])"
      :pagination="(pagination as TdPaginationProps)"
      select-on-row-click
      @page-change="onPageChange"
    />
  </div>
</template>

<style scoped lang="scss">
.t-design-json-form {
}
</style>