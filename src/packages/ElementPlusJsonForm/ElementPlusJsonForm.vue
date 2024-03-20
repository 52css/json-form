<script lang="ts">
import { type JsonFormProps, JsonFormDefault } from '../types'
import ElementPlusJsonFormForm from './ElementPlusJsonFormForm.vue'
import ElementPlusJsonFormAction from './ElementPlusJsonFormAction.vue'
import { useVModel } from '@vueuse/core'

export interface ElementPlusJsonFormProps extends JsonFormProps {
  prop1?: string
}
export const ElementPlusJsonFormDefault = {
  ...JsonFormDefault
}
export interface ElementPlusJsonFormEmits {
  (event: 'update:visible', visible: boolean): void
  (event: 'close'): void
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<ElementPlusJsonFormProps>(), ElementPlusJsonFormDefault)
const slots = defineSlots()
const emit = defineEmits<ElementPlusJsonFormEmits>()
defineOptions({
  name: 'ElementPlusJsonForm',
})
const jsonFormFormRef = ref()
const loading = ref(false)
const visible = useVModel(props, 'visible', emit)
const onSubmit = async () => {
  jsonFormFormRef.value?.onSubmit({
    validateSuccess() {
      loading.value = true;
    },
    requestSuccess() {
      visible.value = false;
    },
    requestComplete() {
      loading.value = false;
    }
  })
}
watch(() => visible.value, (val) => {
  if (!val) {
    emit('close')
  }
})

// console.log('props.request', props.request)
</script>

<template>
  <template v-if="container === 'dialog'">
    <el-dialog
      v-bind="$attrs"
      v-model:visible="visible"
      :size="size"
    >
      <ElementPlusJsonFormForm
        ref="jsonFormFormRef"
        :inputs="inputs"
        :request="request"
        :model="model"
        :layout="layout"
        :disabled="disabled"
        :span="span"
        :columns="columns"
      >
        <template v-for="(_value, name) in slots" #[name]="scopeData">
          <slot :name="(name as string)" v-bind="scopeData" />
        </template>
        <template #extra></template>
      </ElementPlusJsonFormForm>
      <template #footer>
        <ElementPlusJsonFormAction
          :inputs="inputs"
          :model="model"
          :loading="loading"
          :request="request"
          @submit="onSubmit"
        />
      </template>
    </el-dialog>
  </template>
  <template v-else-if="container === 'drawer'">
    <el-drawer
      v-bind="$attrs"
      v-model:visible="visible"
      :size="size"
    >
      <ElementPlusJsonFormForm
        ref="jsonFormFormRef"
        :inputs="inputs"
        :request="request"
        :model="model"
        :layout="layout"
        :disabled="disabled"
        :span="span"
        :columns="columns"
      >
        <template v-for="(_value, name) in slots" #[name]="scopeData">
          <slot :name="(name as string)" v-bind="scopeData" />
        </template>
        <template #extra></template>
      </ElementPlusJsonFormForm>
      <template #footer>
        <ElementPlusJsonFormAction
          :inputs="inputs"
          :model="model"
          :loading="loading"
          :request="request"
          @submit="onSubmit"
        />
      </template>
    </el-drawer>
  </template>
  <template v-else>
    <ElementPlusJsonFormForm
      v-bind="$attrs"
      ref="jsonFormFormRef"
      :inputs="inputs"
      :request="request"
      :model="model"
      :layout="layout"
      :disabled="disabled"
      :span="span"
      :columns="columns"
    >
      <template v-for="(_value, name) in slots" #[name]="scopeData">
        <slot :name="(name as string)" v-bind="scopeData" />
      </template>
      <template v-if="!columns" #extra>
        <el-form-item flex items-center justify-center w-full>
          <ElementPlusJsonFormAction
            :inputs="inputs"
            :model="model"
            :loading="loading"
            :request="request"
            @submit="onSubmit"
          />
        </el-form-item>
      </template>
    </ElementPlusJsonFormForm>
  </template>
</template>

<style scoped lang="scss">
</style>