<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, JsonFormDefault, type Inputs, type CommonOption, type Columns } from '../types'
import { getColumnsByColumns, getLabelAlignByLayout, getLayoutByLayout, setOutputs } from '../utils'
import TDesignJsonFormFormItem from './TDesignJsonFormFormItem.vue'
import { FormValidateResult, PageInfo, PrimaryTableCol, TableRowData, TdPaginationProps, } from 'tdesign-vue-next'
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
const slots = defineSlots()
defineEmits<TDesignJsonFormEmits>()
defineOptions({
  name: 'TDesignJsonFormForm',
})
const model = ref<{ [key: string]: any }>({})
const loading = ref(false);
const getIsTabsLeft = computed(() => {
  if (!props.inputs) {
    return ;
  }

  for (const [prop, val] of Object.entries(props.inputs)) {
    if (val && typeof val !== 'string' && val.type === 'tabs' && val.placement === 'left') {
      const index = (val.options as CommonOption[])?.findIndex(x => x.value === model.value[prop])
      return {
        index,
        prop,
        options: val.options,
        option: (val.options as CommonOption[])[index]
      };
    }
  }

  return;
})
const getIsSteps = computed(() => {
  if (!props.inputs) {
    return;
  }

  for (const [prop, val] of Object.entries(props.inputs)) {
    if (val && typeof val !== 'string' && val.type === 'steps') {
      const index = (val.options as CommonOption[])?.findIndex(x => x.value === model.value[prop])
      return {
        index,
        prop,
        options: val.options,
        option: (val.options as CommonOption[])[index]
      };
    }
  }

  return;
})

interface SubmitParams {
  validateSuccess?: () => void
  requestSuccess?: () => void
  requestComplete?: () => void
}
const noop = () => {}
const onSubmit = async ({validateSuccess, requestSuccess, requestComplete}: SubmitParams) => {
  // 如果inputs下的属性，有tabsLeft, 即 type=tabs, 并且placement=left, 验证选中的tabs的form
  if (getIsTabsLeft.value) {
    formItemRef.value.jsonFormFormRef[getIsTabsLeft.value.index].onSubmit({
      validateSuccess,
      noop,
      requestComplete,
    })
    return;
  }

  // 判断type=steps, 验证当前选中的form
  if (getIsSteps.value) {
    const option = getIsSteps.value?.option;
    const options = getIsSteps.value?.options as CommonOption[];
    const prop = getIsSteps.value?.prop;
    const index = getIsSteps.value?.index;
    const stepRequest = option.request;
    const validateResult: FormValidateResult<FormData> = await formItemRef.value.jsonFormFormRef[index].formRef.validate()

    if (validateResult === true) {
      loading.value = true;
      validateSuccess && validateSuccess();
      let stepModel = {}
      const stepNext = () => {
        if (index < options.length - 1) {
          model.value[prop] = options[index + 1].value
        } else {
          requestSuccess && requestSuccess();
        }
      }

      for (let i = 0; i <= index; i++) {
        stepModel = {...stepModel, ...formItemRef.value.jsonFormFormRef[i].getFlatModel}
      }

      if (stepRequest) {
        loading.value = true
        stepRequest(stepModel)
          .then(() => {
            MessagePlugin.success('保存成功');
            stepNext();
          })
          .finally(() => {
            loading.value = false;
            requestComplete && requestComplete();
          })
      } else {
        stepNext()
        requestComplete && requestComplete();
      }
    } else {
      console.log('Errors: ', validateResult);
    }
    return;
  }

  // 普通表单 或者 tabs + placement=top, 验证整个大form
  const validateResult: FormValidateResult<FormData> = await formRef.value?.validate()
  if (validateResult === true) {
    loading.value = true;
    validateSuccess && validateSuccess();
    return props.request && props.request(getFlatModel.value).then(() => {
      MessagePlugin.success('提交成功');
      requestSuccess && requestSuccess();
    }).finally(() => {
      loading.value = false;
      requestComplete && requestComplete();
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
const onReset = () => {
  // 重新变更model，用于重置掉outputs的值
  model.value = cloneDeep(initModel.value)
}
const initModel = ref()

watch(() => props.model, (val) => {
  model.value = val

  // 初始化model，用于重置掉outputs的值
  if (!initModel.value) {
    initModel.value = cloneDeep(val)
  }
}, {
  immediate: true
})

init();

defineExpose({
  init,
  onSubmit,
  getFlatModel,
  formRef,
  formItemRef,
})
</script>

<template>
  <div flex flex-col gap-2>
    <!-- {{ model }} -->
    <!-- t-form model => data -->
    <t-form
      v-if="inputs"
      ref="formRef"
      v-bind="$attrs"
      :data="model"
      :model="model"
      :disabled="disabled"
      :label-align="getLabelAlignByLayout(columns ? 'inline' : layout)"
      :layout="getLayoutByLayout(columns ? 'inline' : layout)"
      :label-width="(columns ? 'inline' : layout) === 'inline' ? 'auto' : '240px'"
      reset-type="initial"
      class="json-form-form__form"
      @reset="onReset"
    >
      <TDesignJsonFormFormItem
        ref="formItemRef"
        :inputs="inputs"
        :request="request"
        :model="model"
        :span="span"
        :layout="layout"
        :disabled="disabled"
        :columns="columns"
        :onSubmit="onSubmit"
      >
        <template v-for="(_value, name) in slots" #[name]="scopeData">
          <slot :name="(name as string)" v-bind="scopeData" />
        </template>
      </TDesignJsonFormFormItem>
      <t-form-item v-if="request && columns"  :class="[{'w-full': !columns}]">
        <t-button theme="primary" :loading="loading" style="margin-right: 0.5rem" @click="onSubmit">
          查询
        </t-button>
        <t-button theme="default" variant="outline" type="reset">
          重置
        </t-button>
        <!-- <template v-if="columns">
        </template>
        <template v-else>
          <t-button theme="primary" :loading="loading" style="margin-right: 0.5rem" @click="onSubmit">
            提交
          </t-button>
          <t-button theme="default" variant="outline" type="reset">
            重置
          </t-button>
        </template> -->
      </t-form-item>
      <slot v-if="!getIsTabsLeft && !getIsSteps" name="extra" />
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