<script lang="ts">
import { type JsonFormProps, JsonFormDefault } from '../types'
import TDesignJsonFormForm from './TDesignJsonFormForm.vue'
import { useVModel } from '@vueuse/core'

export interface TDesignJsonFormProps extends JsonFormProps {
  prop1?: string
}
export const TDesignJsonFormDefault = {
  ...JsonFormDefault
}
export interface TDesignJsonFormEmits {
  (event: 'update:visible', visible: boolean): void
  (event: 'close'): void
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<TDesignJsonFormProps>(), TDesignJsonFormDefault)
const slots = defineSlots()
const emit = defineEmits<TDesignJsonFormEmits>()
defineOptions({
  name: 'TDesignJsonForm',
})
const jsonFormFormRef = ref()
const loading = ref(false)
const visible = useVModel(props, 'visible', emit)
const onConfirm = async () => {
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
</script>

<template>
  <template v-if="container === 'dialog'">
    <t-dialog
      v-bind="$attrs"
      v-model:visible="visible"
      :confirm-btn="{
        content: '确定',
        theme: 'primary',
        loading,
        disabled: loading,
      }"
      @confirm="onConfirm"
    >
      <t-design-json-form-form
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
      </t-design-json-form-form>
    </t-dialog>
  </template>
  <template v-else-if="container === 'drawer'">
    drawer
  </template>
  <template v-else>
    <t-design-json-form-form
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
    </t-design-json-form-form>
    <!-- <div mt-a flex items-center justify-center gap-2>
      <t-button theme="default" variant="base" @click="onOuterSubmit">取消</t-button>
      <t-button @click="onOuterSubmit">保存</t-button>
    </div> -->
  </template>
</template>

<style scoped lang="scss">
.t-design-json-form {
}
</style>./TDesignJsonFormFormItem.vue