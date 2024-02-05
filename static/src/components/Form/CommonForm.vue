<template>
  <a-form ref="formRef" class="form" :model="formState">
    <a-row :gutter="24">
      <a-space v-for="condition in conditions" :key="condition.field">

      </a-space>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { CommonFromCondition } from '@/types';

const props = defineProps({
  conditions: {
    type: Array<CommonFromCondition>,
    required: true
  }
});

const formRef = ref<FormInstance>();
const formState = reactive({});

</script>
