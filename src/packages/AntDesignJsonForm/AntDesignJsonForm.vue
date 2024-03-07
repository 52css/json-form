<script lang="ts">
import { ref } from 'vue'
import { type JsonFormProps, type Inputs, JsonFormDefault } from '../types'
import { getInputsByInputs } from '../utils'

export interface AntDesignJsonFormProps extends JsonFormProps {
  prop1?: string
}
export const AntDesignJsonFormDefault = {
  ...JsonFormDefault
}
export interface AntDesignJsonFormEmits {
  (event: 'event1'): void
}
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<AntDesignJsonFormProps>(), AntDesignJsonFormDefault)
defineEmits<AntDesignJsonFormEmits>()
defineOptions({
  name: 'AntDesignJsonForm',
})
const formData = ref(props.model ?? {})
</script>

<template>
  <!-- <div class="AntDesignJsonForm">
    AntDesignJsonForm
  </div> -->
  <a-form
    v-if="inputs"
    :model="formData"
    :layout="layout"
  >
    <a-form-item
      v-for="(inputField, prop) in getInputsByInputs(inputs as Inputs, formData)"
      :label="inputField?.label"
      :name="prop"
      :key="prop"
      :rules="[{
        required: inputField?.required,
        message: inputField?.label + '必填',
      }]"
    >
      <a-input
        v-if="inputField?.type === 'text'"
        v-model:value="(formData[prop] as string)"
        :placeholder="inputField?.placeholder ?? '请输入'"
        :clearable="inputField?.clearable"
        :disabled="inputField?.disabled"
        :maxlength="inputField?.maxlength"
      />
    </a-form-item>
  </a-form>
  <!-- {{ formData }} -->
</template>

<style scoped lang="scss">
.AntDesignJsonForm {
}
</style>
