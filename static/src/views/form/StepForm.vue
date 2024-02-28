<template>
  <page-view>
    <div class="page-header-heading" style="padding-top: 0;">分步表单</div>
    <div class="page-header-content">将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</div>
    <a-card class="m-6">
      <div class="content-center step-form">
        <a-steps :current="current" :items="items" style="margin: 16px auto;"></a-steps>
        <div>
          <div v-show="current === 0" class="steps-content">
            <common-form :conditions="conditions0" @fieldValueChange="fieldValueChange0">
              <template #collectionAccount="{ condition }">
                <a-form-item :label="condition.label" :name="condition.field" :required="condition.required"
                  :autoLink="false">
                  <a-input-group compact>
                    <a-select v-model:value="formValue00.accountOpt" style="width: 110px; border-right: 0;">
                      <a-select-option value="option1">支付宝</a-select-option>
                      <a-select-option value="option2">银行账户</a-select-option>
                    </a-select>
                    <a-input v-model:value="formValue0.collectionAccount"
                      @change="fieldValueChange(condition.field, $event)" style="width: calc(100% - 110px);" />
                  </a-input-group>
                </a-form-item>
              </template>
            </common-form>
            <div class="steps-action">
              <a-button type="primary" @click="next">下一步</a-button>
            </div>
          </div>
          <div v-show="current === 1">
            <a-alert message="确认转账后，资金将直接打入对方账户，无法退回。" type="info" closable />
            <div class="steps-content">
              <a-descriptions :column="1">
                <a-descriptions-item label="转账账号">{{ formValue0.payAccount }}</a-descriptions-item>
                <a-descriptions-item label="收款账户">{{ formValue0.collectionAccount }}</a-descriptions-item>
                <a-descriptions-item label="收款人姓名">{{ formValue0.name }}</a-descriptions-item>
                <a-descriptions-item label="转账金额">
                  <a-statistic :value="formValue0.money">
                    <template #suffix>元</template>
                  </a-statistic>
                </a-descriptions-item>
              </a-descriptions>
              <a-divider />
              <common-form :conditions="conditions1" @fieldValueChange="fieldValueChange1">
                <template #password="{ condition }">
                  <a-form-item :label="condition.label" :name="condition.field" :required="condition.required">
                    <a-input-password v-model:value="formValue1.password" :placeholder="condition.placeholder"
                      :visibility-toggle="false" />
                  </a-form-item>
                </template>
              </common-form>
              <div class="steps-action">
                <a-button type="primary" :loading="loading" @click="submit">提 交</a-button>
                <a-button class="ml-4" @click="prev">上一步</a-button>
              </div>
            </div>
          </div>
          <div v-show="current === 2">
            <a-result status="success" title="操作成功" sub-title="预计两小时到账">
              <template #extra>
                <a-button type="primary" @click="more">再转一笔</a-button>
                <a-button>查看账单</a-button>
              </template>
              <a-descriptions :column="1">
                <a-descriptions-item label="转账账号">{{ formValue0.payAccount }}</a-descriptions-item>
                <a-descriptions-item label="收款账户">{{ formValue0.collectionAccount }}</a-descriptions-item>
                <a-descriptions-item label="收款人姓名">{{ formValue0.name }}</a-descriptions-item>
                <a-descriptions-item label="转账金额">
                  <a-statistic :value="formValue0.money">
                    <template #suffix>元</template>
                  </a-statistic>
                </a-descriptions-item>
              </a-descriptions>
            </a-result>
          </div>
        </div>
      </div>
    </a-card>
  </page-view>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import PageView from '@/layouts/PageView.vue';
import CommonForm from '@/components/Form/CommonForm.vue';
import type { CommonFromCondition, Params } from '@/types';

const current = ref<number>(0);
const items = [
  { key: 0, title: '填写转账信息' },
  { key: 1, title: '确认转账信息' },
  { key: 2, title: '完成' }
];
// 第一步：填写转账信息
const conditions0 = ref<Array<CommonFromCondition>>(
  [
    {
      type: 'select',
      options: [{
        value: 'ant-design@alipay.com',
        label: 'ant-design@alipay.com'
      }],
      show: true,
      span: 24,
      field: 'payAccount',
      label: '付款账户',
      value: '',
      required: true
    },
    {
      type: '',
      show: true,
      span: 24,
      field: 'collectionAccount',
      label: '收款账户',
      value: '',
      required: true
    },
    {
      type: 'input',
      show: true,
      span: 24,
      field: 'name',
      label: '收款人姓名',
      placeholder: '请输入收款人姓名',
      value: 'Sendya',
      required: true
    },
    {
      type: 'input',
      show: true,
      span: 24,
      field: 'money',
      label: '转账金额',
      placeholder: '请输入金额',
      value: '500',
      required: true
    },
  ]
);

let formValue0 = reactive<Params>({
  collectionAccount: ''
});
let formValue00 = reactive({
  accountOpt: 'option1',
});
let formRef0 = ref();
const fieldValueChange0 = (event: any) => {
  formValue0 = event.value;
  formRef0.value = event.form.value;
}
const fieldValueChange = (_field: string, _event: any) => {
  formRef0.value.validate();
}
// 第二步：确认转账信息
const conditions1 = ref<Array<CommonFromCondition>>(
  [
    {
      type: '',
      show: true,
      span: 24,
      field: 'password',
      label: '支付密码',
      placeholder: '请输入付款密码',
      value: '',
      required: true,
      validators: [{ required: true, message: '需要支付密码才能进行支付' }]
    },
  ]
);
let formValue1 = reactive<Params>({});
let formRef1 = ref();
const fieldValueChange1 = (event: any) => {
  formValue1 = event.value;
  formRef1.value = event.form.value;
}
const loading = ref<boolean>(false);

const next = () => {
  formRef0.value.validate().then(() => {
    current.value = 1;
  }).catch(() => {

  });

};

const submit = () => {
  formRef1.value.validate().then(() => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      current.value = 2;
    }, 2000);
  }).catch(() => {

  });
};

const prev = () => {
  current.value = 0;
};

const more = () => {
  current.value = 0;
  formRef0.value.resetFields();
  formRef1.value.resetFields();
}
</script>
<style lang="less">
.step-form {
  max-width: 750px;
  margin: 16px auto;
}

.steps-content {
  max-width: 500px;
  margin: 40px auto 0;
}

.steps-action {
  margin-left: 95px;
}
</style>
