<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, JsonFormDefault } from '../types'
import { getLabelAlignByLayout, getLayoutByLayout } from '../utils'
import TDesignFormItem from './TDesignFormItem.vue'

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
</script>

<template>
  <div class="t-design-json-form">
    <t-form
      v-if="inputs"
      :data="model"
      :disabled="disabled"
      :label-align="getLabelAlignByLayout(layout)"
      :layout="getLayoutByLayout(layout)"
      label-width="auto"
      class="json-form"
    >
      <TDesignFormItem :inputs="inputs" :model="model" :span="span" />
      <t-form-item>
        <t-button theme="primary" type="submit" style="margin-right: 8px">
          {{ layout === 'inline' ? '查询' : '提交' }}
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