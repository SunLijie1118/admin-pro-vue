<template>
  <a-form ref="formRef" class="form" :model="formState" :rules="rules">
    <a-row :gutter="24">
      <template v-for="condition in conditions" :key="condition.field">
        <template v-if="condition.type !== ''">
          <a-col :span="condition.span" v-show="condition.show">
            <!-- todo:配置规则 -->
            <a-form-item :name="condition.field" :label="condition.label" :required="condition.required"
              :tooltip="condition.tooltip">
              <!-- 输入框 -->
              <template v-if="condition.type === 'input'">
                <a-input v-model:value="formState[condition.field]"
                  :placeholder="condition.placeholder ? condition.placeholder : condition.label"
                  @change="fieldChange(condition.field)" @pressEnter="fieldChange(condition.field)" />
              </template>
              <!-- 多行输入框 -->
              <template v-if="condition.type === 'textarea'">
                <a-textarea v-model:value="formState[condition.field]"
                  :placeholder="condition.placeholder ? condition.placeholder : condition.label"
                  :rows="condition.rows || 3" :showCount="condition.showCount" @change="fieldChange(condition.field)"
                  @pressEnter="fieldChange(condition.field)" />
              </template>
              <!-- 选择器 -->
              <template v-if="condition.type === 'select'">
                <a-select showSearch allowClear v-model:value="formState[condition.field]"
                  :placeholder="condition.placeholder ? condition.placeholder : condition.label"
                  max-tag-count="responsive" :mode="condition.mode || ''" style="width: 100%"
                  :disabled="condition.disabled" @change="fieldChange(condition.field)">
                  <template v-for="opt in condition.options" :key="opt.value">
                    <a-select-option :value="opt.value" :disabled="opt.disabled">{{ opt.label }}</a-select-option>
                  </template>
                </a-select>
              </template>
              <template v-if="condition.type === 'time'">
                <a-range-picker allowClear show-time v-model:value="formState[condition.field]" style="width: 100%"
                  :picker="condition.picker" @change="fieldChange(condition.field)" />
              </template>
              <template v-if="condition.type === 'single-time'">
                <a-date-picker v-model:value="formState[condition.field]" style="width: 100%" :picker="condition.picker"
                  @change="fieldChange(condition.field)" />
              </template>
              <template v-if="condition.type === 'checkbox'">
                <a-checkbox v-model:value="formState[condition.field]" :disabled="condition.disabled"
                  @change="fieldChange(condition.field)" />
              </template>
              <template v-if="condition.type === 'radio'">
                <a-radio-group v-model:value="formState[condition.field]" :name="condition.field"
                  :options="condition.options" :optionType="condition.optionType || 'default'"
                  @change="fieldChange(condition.field)">
                </a-radio-group>
              </template>
            </a-form-item>
          </a-col>
        </template>
        <template v-if="condition.type === ''">
          <slot :name="condition.field"></slot>
        </template>
      </template>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { CommonFromCondition, Params, CustomValidator, CustomValidateFun } from '@/types';
import type { Rule } from 'ant-design-vue/es/form';
import { isObject } from '@/utils/base';

const props = defineProps<{
  conditions: Array<CommonFromCondition>;
}>();
const emit = defineEmits(['fieldValueChange'])

const formRef = ref<FormInstance>();
const formState = reactive<Params>({});
const rules: Record<string, Rule[]> = {};
const fieldChange = (field: string) => {
  emit('fieldValueChange', {
    field: field,
    value: formState,
    form: formRef
  });
}

watch(props.conditions, () => {
  props.conditions.forEach((item: CommonFromCondition) => {
    if (!(item.field in formState)) {
      formState[item.field] = item.value;
    }
    if (!(item.field in rules)) {
      rules[item.field] = [];
      item.validators?.map(validator => {
        if (!validator) {
          throw new Error('验证器不能为空');
        } else if (isObject(validator) && (validator as CustomValidator).type) {
          validator = validator as CustomValidator;
          switch (validator.type) {
            case 'minLength':
              rules[item.field].push({ min: validator.minLength || 0 });
              break;
            case 'maxLength':
              rules[item.field].push({ max: validator.maxLength || 0 });
              break;
            case 'pattern':
              rules[item.field].push({ pattern: validator.pattern });
              break;
            default:
              console.error(`未识别的验证器: ${validator.type}`);
              break;
          }
        } else {
          rules[item.field].push({ validator: validator as CustomValidateFun });
        }
      })

    }
  });
}, { immediate: true });
</script>
