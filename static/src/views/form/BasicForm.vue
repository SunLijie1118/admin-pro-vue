<template>
  <page-view>
    <div class="page-header-heading" style="padding-top: 0;">基础表单</div>
    <div class="page-header-content">表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</div>
    <a-card class="m-6">
      <div class="content-center basic-form">
        <common-form :conditions="conditions" @fieldValueChange="fieldValueChange">
          <template #btns>
            <div class="search-container">
              <a-button type="primary" @click="submit()">提 交</a-button>
              <a-button @click="save()">保 存</a-button>
            </div>
          </template>
        </common-form>
      </div>
    </a-card>
  </page-view>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import PageView from '@/layouts/PageView.vue';
import CommonForm from '@/components/Form/CommonForm.vue';
import type { CommonFromCondition } from '@/types';

const conditions = ref<Array<CommonFromCondition>>(
  [
    {
      type: 'input',
      show: true,
      span: 24,
      field: 'title',
      label: '标题',
      placeholder: '给目标起个名字',
      value: '',
      required: true
    },
    {
      type: 'time',
      picker: 'date',
      show: true,
      span: 24,
      field: 'time',
      label: '起止日期',
      value: [],
      required: true
    },
    {
      type: 'textarea',
      show: true,
      span: 24,
      field: 'goal',
      label: '目标描述',
      placeholder: '请输入你的阶段性工作目标',
      value: '',
      required: true
    },
    {
      type: 'textarea',
      show: true,
      span: 24,
      field: 'standard',
      label: '衡量标准',
      placeholder: '请输入衡量标准',
      value: '',
      required: true
    },
    {
      type: 'input',
      show: true,
      span: 24,
      field: 'client',
      label: '客户',
      placeholder: '请描述你服务的客户，内部客户直接 姓名/工号',
      tooltip: '目标的服务对象',
      value: '',
    },
    {
      type: 'input',
      show: true,
      span: 24,
      field: 'invited_judges',
      label: '邀评人',
      placeholder: '请直接 姓名/工号，最多可邀请5人',
      value: '',
    },
    {
      type: 'input',
      show: true,
      span: 24,
      field: 'weight',
      label: '权重',
      placeholder: '请输入',
      value: '',
    },
    {
      type: 'radio',
      options: [{
        value: 'a',
        label: '公开'
      }, {
        value: 'b',
        label: '部分公开'
      }, {
        value: 'c',
        label: '不公开'
      }],
      show: true,
      span: 24,
      field: 'disclosure',
      label: '目标公开',
      placeholder: '请输入',
      value: 'a',
    },
    {
      type: '',
      show: true,
      span: 24,
      field: 'btns',
      label: '',
    },
  ]
);

let formValue = reactive({});
const fieldValueChange = (event: any) => {
  formValue = event.value;
}
const submit = () => {
  console.log(formValue);
}

const save = () => {
  console.log(formValue);
}
</script>

<style lang="less" scoped></style>
