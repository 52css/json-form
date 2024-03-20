<script lang="ts">
import { type Inputs, type Model, type Layout, type Columns } from '../types'
import { getInputsByInputs, setOutputs } from '../utils'
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
import ElementPlusJsonFormForm from './ElementPlusJsonFormForm.vue'

export interface ElementPlusJsonFormFormItemProps {
  inputs?: Inputs
  model: Model,
  span?: number,
  layout?: Layout,
  disabled?: boolean,
  columns?: Columns,
  onSubmit?: any
}
export const TDesignFormItemDefault = {}
export interface TDesignFormItemEmits {
  (event: 'event1'): void
}
export const pascalCase = (string: string) => _.upperFirst(_.camelCase(string));
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<ElementPlusJsonFormFormItemProps>(), TDesignFormItemDefault)
const slots = defineSlots()
defineEmits<TDesignFormItemEmits>()
defineOptions({
  name: 'ElementPlusJsonFormFormItem',
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
const elementPlusJsonFormFormRef = ref()

watch(() => props.model, () => {
  inputFieldMap = getInputsByInputs(props.inputs as Inputs, props.model)
})

defineExpose({
  inputFieldMap,
  elementPlusJsonFormFormRef,
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
      <el-tabs
        v-else-if="inputField.type === 'tabs'"
        v-model="model[prop]"
        :theme="inputField.theme"
        :placement="inputField.placement"
        style="width: 100%;"
      >
        <el-tab-pane
          v-for="option in inputField.options"
          :label="option?.label"
          :value="(option?.value as string)"
          :key="(option?.value as string)"
          :destroy-on-hide="false"
          :style="`padding-${((inputField.placement ?? 'top') === 'top') ? 'block' : 'inline'}: 1rem;`"
        >
          <ElementPlusJsonFormForm
            v-if="option.request"
            ref="elementPlusJsonFormFormRef"
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
          </ElementPlusJsonFormForm>
          <div v-else style="display: flex; flex-wrap: wrap;">
            <ElementPlusJsonFormFormItem
              :inputs="(option.inputs as Inputs)"
              :model="model"
              :span="span"
            >
              <template v-for="(_value, name) in slots" #[name]="scopeData">
                <slot :name="name" v-bind="scopeData" />
              </template>
            </ElementPlusJsonFormFormItem>
          </div>
        </el-tab-pane>
      </el-tabs>
      <template v-else-if="inputField.type === 'steps'">
        <el-steps v-model="model[prop]" :style="`margin: 30px ${100 / (inputField.options.length + 2)}%`">
          <el-step v-for="option in inputField.options" :title="option.label" :value="option.value" :key="option.value" />
        </el-steps>
        <!-- {{ model[prop] }} -->
        <div style="width: 100%">
          <!-- aaa: {{ model[prop] }} {{ typeof model[prop] }} -->
          <!-- bbb: {{ inputField.options }} -->
          <ElementPlusJsonFormForm
            v-for="(option) in inputField.options"
            v-show="model[prop] === option.value"
            ref="ElementPlusJsonFormFormRef"
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
          </ElementPlusJsonFormForm>
        </div>
      </template>
      <el-form-item
        v-else
        :label="inputField?.label"
        :prop="prop"
        :name="prop"
        :rules="[{
          required: inputField?.required,
          message: inputField?.label + '必填',
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
      </el-form-item>
    </template>
  </template>
</template>

<style scoped lang="scss">
.t-design-form-item {
}
</style>
