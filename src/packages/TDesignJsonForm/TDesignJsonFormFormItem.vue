<script lang="ts">
import { type Inputs, type Model, type Layout, type Columns, type CommonOption } from '../types'
import { getInputsByInputs, setOutputs, getOptionIndex } from '../utils'
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
import { registerJsonFormFieldComponents } from '../index'
import TDesignJsonFormForm from './TDesignJsonFormForm.vue'

export interface TDesignJsonFormFormItemProps {
  inputs?: Inputs
  model: Model,
  span?: number,
  layout?: Layout,
  disabled?: boolean,
  columns?: Columns,
}
export const TDesignFormItemDefault = {}
export interface TDesignFormItemEmits {
  (event: 'event1'): void
}
export const pascalCase = (string: string) => _.upperFirst(_.camelCase(string));
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<TDesignJsonFormFormItemProps>(), TDesignFormItemDefault)
const slots = defineSlots()
defineEmits<TDesignFormItemEmits>()
defineOptions({
  name: 'TDesignJsonFormFormItem',
})
const componentMap: Record<string, Component> = {
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
let inputFieldMap = getInputsByInputs(props.inputs as Inputs, props.model)
const loading = ref(false)
const jsonFormRef = ref()
const onConfirm = (model: Model, prop: string, options: CommonOption[]) => {
  const val = model[prop]
  const index = getOptionIndex(val, options)
  const item = options[index]
  const stepJsonFormRef = jsonFormRef.value[index]
  let stepModel = {}
  jsonFormRef.value.forEach((item: any) => {
    stepModel = {...stepModel, ...item.model()}
  })
  const stepNext = () => {
    if (index < options.length - 1) {
      model[prop] = options[index + 1].value
    }
  }

  stepJsonFormRef.formRef.validate().then((res: any) => {
    if (!res) {
      return;
    }

    if (item.request) {
      loading.value = true
      item
        .request(stepModel)
        .then(stepNext)
        .finally(() => {
          loading.value = false
        })
    } else {
      stepNext()
    }
  })
}

watch(() => props.model, () => {
  inputFieldMap = getInputsByInputs(props.inputs as Inputs, props.model)
})

defineExpose({
  inputFieldMap,
  jsonFormRef,
})
</script>

<template>
  <template v-for="(inputField, prop) in inputFieldMap" :key="prop">
    <template v-if="(inputField._if ? inputField._if(model): true)">
      <component
        v-if="registerJsonFormFieldComponents[pascalCase(inputField.type as string)]"
        v-bind="inputField"
        :is="registerJsonFormFieldComponents[pascalCase(inputField.type as string)]"
        :data-span="inputField.span ?? span"
        class="json-form-form__form__form-item"
      />
      <t-tabs
        v-else-if="inputField.type === 'tabs'"
        v-model="model[prop]"
        :theme="inputField.theme"
        :placement="inputField.placement"
        style="width: 100%;"
      >
        <t-tab-panel
          v-for="option in inputField.options"
          :label="option?.label"
          :value="(option?.value as string)"
          :key="(option?.value as string)"
          :destroy-on-hide="false"
          :style="`padding-${((inputField.placement ?? 'top') === 'top') ? 'block' : 'inline'}: 1rem;`"
        >
          <t-design-json-form-form
            v-if="option.request"
            ref="jsonFormRef"
            :inputs="option.inputs"
            :request="option.request"
            :model="model"
            :layout="layout"
            :disabled="disabled"
            :span="inputField.span ?? span"
          >
            <template v-for="(_value, name) in slots" #[name]="scopeData">
              <slot :name="(name as string)" v-bind="scopeData" />
            </template>
          </t-design-json-form-form>
          <div v-else style="display: flex; flex-wrap: wrap;">
            <t-design-json-form-form-item
              :inputs="(option.inputs as Inputs)"
              :model="model"
              :span="span"
            >
              <template v-for="(_value, name) in slots" #[name]="scopeData">
                <slot :name="name" v-bind="scopeData" />
              </template>
            </t-design-json-form-form-item>
          </div>
        </t-tab-panel>
      </t-tabs>
      <template v-else-if="inputField.type === 'steps'">
        <t-steps v-model="model[prop]" :style="`margin: 30px ${100 / (inputField.options.length + 2)}%`">
          <t-step-item v-for="option in inputField.options" :title="option.label" :value="option.value" :key="option.value" />
        </t-steps>
        <!-- {{ model[prop] }} -->
        <div style="width: 100%">
          <!-- aaa: {{ model[prop] }} {{ typeof model[prop] }} -->
          <!-- bbb: {{ inputField.options }} -->
          <t-design-json-form-form
            v-for="(option, optionIndex) in inputField.options"
            v-show="model[prop] === option.value"
            ref="jsonFormRef"
            :key="option.value"
            :inputs="option.inputs"
            :request="option.request"
            :model="model"
            :layout="layout"
            :disabled="disabled"
            :span="inputField.span ?? span"
          >
            <template v-for="(_value, name) in slots" #[name]="scopeData">
              <slot :name="(name as string)" v-bind="scopeData" />
            </template>
            <template #extra>
              <t-button
                v-if="optionIndex !== 0"
                theme="default"
                @click="() => {
                  model[prop] = inputField.options[optionIndex - 1].value
                }"
              >
                上一步
              </t-button>
              <t-button
                :disabled="loading"
                :loading="loading"
                style="width: 74px; margin-left: 1rem;"
                theme="primary"
                @click="onConfirm(model, prop, inputField.options)"
              >
                {{ optionIndex === inputField.options.length - 1 ? '保存' : '下一步' }}
              </t-button>
            </template>
          </t-design-json-form-form>
        </div>
      </template>
      <t-form-item
        v-else
        :label="inputField?.label"
        :name="prop"
        :rules="[{
          required: inputField?.required,
        }]"
        :data-span="inputField.span ?? span"
        :data-prop="prop"
        class="json-form-form__form__form-item"
      >
        <!-- {{ inputField }} -->
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
          @blur="(...args: any[]) => {
            if (inputField._onBlur) {
              inputField._onBlur(model, ...args);
            }
          }"
          @change="(...args: any[]) => {
            if (inputField._onChange) {
              inputField._onChange(model, ...args);
            }
            setOutputs(model, inputField, args);
          }"
          @clear="(...args: any[]) => {
            if (inputField._onClear) {
              inputField._onClear(model, ...args);
            }
          }"
          @click="(...args: any[]) => {
            if (inputField._onClick) {
              inputField._onClick(model, ...args);
            }
          }"
          @compositionend="(...args: any[]) => {
            if (inputField._onCompositionend) {
              inputField._onCompositionend(model, ...args);
            }
          }"
          @compositionstart="(...args: any[]) => {
            if (inputField._onCompositionstart) {
              inputField._onCompositionstart(model, ...args);
            }
          }"
          @enter="(...args: any[]) => {
            if (inputField._onEnter) {
              inputField._onEnter(model, ...args);
            }
          }"
          @focus="(...args: any[]) => {
            if (inputField._onFocus) {
              inputField._onFocus(model, ...args);
            }
          }"
          @keydown="(...args: any[]) => {
            if (inputField._onKeydown) {
              inputField._onKeydown(model, ...args);
            }
          }"
          @keypress="(...args: any[]) => {
            if (inputField._onKeypress) {
              inputField._onKeypress(model, ...args);
            }
          }"
          @keyup="(...args: any[]) => {
            if (inputField._onKeyup) {
              inputField._onKeyup(model, ...args);
            }
          }"
          @mouseenter="(...args: any[]) => {
            if (inputField._onMouseenter) {
              inputField._onMouseenter(model, ...args);
            }
          }"
          @mouseleave="(...args: any[]) => {
            if (inputField._onMouseleave) {
              inputField._onMouseleave(model, ...args);
            }
          }"
          @paste="(...args: any[]) => {
            if (inputField._onPaste) {
              inputField._onPaste(model, ...args);
            }
          }"
          @validate="(...args: any[]) => {
            if (inputField._onValidate) {
              inputField._onValidate(model, ...args);
            }
          }"
          @wheel="(...args: any[]) => {
            if (inputField._onWheel) {
              inputField._onWheel(model, ...args);
            }
          }"
        />
      </t-form-item>
    </template>
  </template>
</template>

<style scoped lang="scss">
.t-design-form-item {
}
</style>
