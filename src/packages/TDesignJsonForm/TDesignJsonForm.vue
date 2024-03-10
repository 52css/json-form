<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, JsonFormDefault } from '../types'
import { getLabelAlignByLayout, getLayoutByLayout } from '../utils'
import TDesignFormItem from './TDesignFormItem.vue'
import { FormProps } from 'tdesign-vue-next'

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
const onSubmit: FormProps['onSubmit'] = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    // MessagePlugin.warning(firstError);
    // // 判断错误在第几个 Tab，而后自动切换到第几个
    // for (let i = 0, len = formData.students.length; i < len; i++) {
    //   const item = formData.students[i];
    //   const keys = Object.keys(item).map((key) => `students[${i}].${key}`);
    //   // 数组数据 key 在 validateResult 中存在，则表示校验不通过
    //   const isInvalid = keys.find((key) => validateResult[key]);
    //   if (isInvalid) {
    //     studentTab.value = item.id;
    //     return;
    //   }
    // }
  }
}
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
      @submit="onSubmit"
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