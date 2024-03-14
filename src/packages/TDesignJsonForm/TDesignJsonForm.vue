<script lang="ts">
import { type JsonFormProps, JsonFormDefault } from '../types'
import TDesignJsonFormForm from './TDesignJsonFormForm.vue'

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
withDefaults(defineProps<TDesignJsonFormProps>(), TDesignJsonFormDefault)
const slots = defineSlots()
defineEmits<TDesignJsonFormEmits>()
defineOptions({
  name: 'TDesignJsonForm',
})
const jsonFormFormRef = ref()
const onConfirm = () => {
  const formRef = jsonFormFormRef.value?.formRef

  // formRef
  formRef.validate().then((res: any) => {
    if (!res) {
      return;
    }

    // if (item.request) {
    //   loading.value = true
    //   item
    //     .request(stepModel)
    //     .then(stepNext)
    //     .finally(() => {
    //       loading.value = false
    //     })
    // } else {
    //   stepNext()
    // }
  })
}
// const onOuterSubmit = () => {
//   const formRef = jsonFormFormRef.value?.formRef

//   // formRef
//   formRef.submit()
// }
</script>

<template>
  <template v-if="container === 'dialog'">
    <t-dialog v-bind="$attrs" @confirm="onConfirm">
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