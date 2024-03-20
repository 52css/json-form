<script lang="ts">
import { type JsonFormProps, type CommonOption, type Model } from '../types'

export interface ElementPlusJsonFormActionProps extends JsonFormProps {
  prop1?: string
  onSubmit?: any
  model?: Model
  loading?: boolean
}
export const ElementPlusJsonFormActionDefault = {}
export interface ElementPlusJsonFormActionEmits {
  (event: 'event1'): void
}
export default {
  name: 'ElementPlusJsonFormAction',
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<ElementPlusJsonFormActionProps>(), ElementPlusJsonFormActionDefault)
defineEmits<ElementPlusJsonFormActionEmits>()
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
        option: (val.options as CommonOption[])[index],
        request: val.request,
      };
    }
  }

  return;
})
const model = ref<{ [key: string]: any }>({})
const getIsSteps = computed(() => {
  if (!props.inputs) {
    return;
  }

  for (const [prop, val] of Object.entries(props.inputs)) {
    if (val && typeof val !== 'string' && val.type === 'steps') {
      const index = (val.options as CommonOption[])?.findIndex(x => x.value === model.value[prop])
      return {
        index: index as number,
        prop,
        options: (val.options as CommonOption[]),
        option: (val.options as CommonOption[])[index],
        request: val.request,
      };
    }
  }

  return;
})

watch(() => props.model, (val: Model) => {
  model.value = val
}, {
  immediate: true
})


</script>

<template>
  <div class="t-design-json-form-action">
    <template v-if="getIsSteps">
      <el-button
        v-if="getIsSteps.index !== 0"
        theme="default"
        @click="() => {
          if (model && getIsSteps) {
            model[getIsSteps.prop] = getIsSteps.options[getIsSteps.index - 1].value
          }
        }"
      >
        上一步
      </el-button>
      <el-button
        :disabled="loading"
        :loading="loading"
        style="width: 74px; margin-left: 1rem;"
        theme="primary"
        @click="onSubmit"
      >
        {{ getIsSteps.index === getIsSteps.options.length - 1 ? '保存' : '下一步' }}
      </el-button>
    </template>
    <template v-else-if="getIsTabsLeft">
      <el-button type="primary" :loading="loading" style="margin-right: 0.5rem" @click="onSubmit">
        提交
      </el-button>
      <el-button type="default" variant="outline">
        重置
      </el-button>
    </template>
    <template v-else-if="request">
      <el-button type="primary" :loading="loading" style="margin-right: 0.5rem" @click="onSubmit">
        提交
      </el-button>
      <el-button type="default" variant="outline">
        重置
      </el-button>
    </template>
  </div>
</template>

<style scoped lang="scss">
.t-design-json-form-action {
}
</style>
