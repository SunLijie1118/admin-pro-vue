<template>
  <page-view>
    <div class="page-header-heading" style="padding-top: 0;">高级表单</div>
    <div class="page-header-content">高级表单常见于一次性输入和提交大批量数据的场景。</div>
    <a-card class="m-6" title="仓库管理">
      <common-form :conditions="conditions0" @fieldValueChange="fieldValueChange0">
        <template #domain="{ condition }">
          <a-form-item :label="condition.label" :name="condition.field" :required="condition.required">
            <a-input v-model:value="formValue0.domain" addon-before="http://" addon-after=".com" />
          </a-form-item>
        </template>
      </common-form>
    </a-card>
    <a-card class="m-6" title="任务管理">
      <common-form :conditions="conditions1" @fieldValueChange="fieldValueChange1">
      </common-form>
    </a-card>
    <a-card class="m-6" title="成员管理">
      <a-table :columns="columns" :data-source="dataSource" :pagination="false">
        <template #bodyCell="{ column, text, record }">
          <template v-if="['name', 'number', 'department'].includes(column.dataIndex)">
            <div>
              <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
                :placeholder="column.dataIndex === 'name' ? '成员姓名' : (column.dataIndex === 'number' ? '工号' : '所属部门')"
                style="margin: -5px 0" />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.key]">
                <span v-if="!editableData[record.key].newFlag">
                  <a-typography-link @click="save(record.key)">保存</a-typography-link>
                  <a-divider type="vertical" class="ml-2 mr-2" />
                  <a-popconfirm title="确定取消吗?" @confirm="cancel(record.key)">
                    <a>取消</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a-typography-link @click="addSave(record.key)">添加</a-typography-link>
                  <a-divider type="vertical" class="ml-2 mr-2" />
                  <a-popconfirm title="确定删除吗?" @confirm="deleteData(record.key)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              </span>
              <span v-else>
                <a @click="edit(record.key)">编辑</a>
                <a-divider type="vertical" class="ml-2 mr-2" />
                <a-popconfirm title="确定删除吗?" @confirm="deleteData(record.key)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </div>
          </template>
        </template>
      </a-table>
      <a-divider />
      <a-button type="dashed" style="width: 100%;" @click="add()">
        <template #icon>
          <PlusOutlined />
        </template>
        新增成员</a-button>
    </a-card>
  </page-view>
  <a-affix :offset-bottom="0">
    <div class="form-bottom"><a-button type="primary">提交</a-button></div>
  </a-affix>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import PageView from '@/layouts/PageView.vue';
import type { CommonFromCondition, Params } from '@/types';
import { isEmpty } from '@/utils/base';
import { message } from 'ant-design-vue';

// 仓库管理
const conditions0 = ref<Array<CommonFromCondition>>(
  [
    {
      type: 'input',
      show: true,
      span: 8,
      field: 'name',
      label: '仓库名',
      placeholder: '请输入仓库名称',
      value: '',
      required: true
    },
    {
      type: '',
      show: true,
      span: 8,
      field: 'domain',
      label: '仓库域名',
      placeholder: '请输入',
      value: '',
      required: true
    },
    {
      type: 'select',
      options: [{
        value: '王同学',
        label: '王同学'
      }],
      show: true,
      span: 8,
      field: 'manager',
      label: '仓库管理员',
      value: '',
      placeholder: '请选择管理员',
    },
    {
      type: 'select',
      options: [{
        value: '王同学',
        label: '王同学'
      }],
      show: true,
      span: 8,
      field: 'auditor',
      label: '审批人',
      value: '',
      placeholder: '请选择审批员',
    },
    {
      type: 'time',
      picker: 'date',
      show: true,
      span: 8,
      field: 'time',
      label: '生效日期',
      value: [],
    },
    {
      type: 'select',
      options: [{
        value: '公开',
        label: '公开'
      }, {
        value: '私密',
        label: '私密'
      }],
      show: true,
      span: 8,
      field: 'type',
      label: '仓库类型',
      value: '',
      placeholder: '请选择仓库类型',
    },
  ]
);
let formValue0 = reactive<Params>({});
let formRef0 = ref();
const fieldValueChange0 = (event: any) => {
  formValue0 = event.value;
  formRef0.value = event.form.value;
}

// 任务管理
const conditions1 = ref<Array<CommonFromCondition>>(
  [
    {
      type: 'input',
      show: true,
      span: 8,
      field: 'name',
      label: '任务名',
      placeholder: '请输入任务名称',
      value: '',
      required: true
    },
    {
      type: 'input',
      show: true,
      span: 8,
      field: 'des',
      label: '任务描述',
      placeholder: '请输入任务描述',
      value: '',
      required: true
    },
    {
      type: 'select',
      options: [{
        value: '王同学',
        label: '王同学'
      }],
      show: true,
      span: 8,
      field: 'executor',
      label: '执行人',
      value: '',
      placeholder: '请选择执行人',
      required: true
    },
    {
      type: 'select',
      options: [{
        value: '王同学',
        label: '王同学'
      }],
      show: true,
      span: 8,
      field: 'responsor',
      label: '责任人',
      value: '',
      placeholder: '请选择责任人',
      required: true
    },
    {
      type: 'single-time',
      picker: 'date',
      show: true,
      span: 8,
      field: 'time',
      label: '提醒时间',
      value: '',
      placeholder: '请选择时间',
      required: true
    },
    {
      type: 'select',
      options: [{
        value: '公开',
        label: '公开'
      }, {
        value: '私密',
        label: '私密'
      }],
      show: true,
      span: 8,
      field: 'type',
      label: '任务类型',
      value: '',
      placeholder: '请选择任务类型',
      required: true
    },
  ]
);
let formValue1 = reactive<Params>({});
let formRef1 = ref();
const fieldValueChange1 = (event: any) => {
  formValue1 = event.value;
  formRef1.value = event.form.value;
}

// 成员管理
const columns = [
  {
    title: '成员姓名',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '工号',
    dataIndex: 'number',
    width: '15%',
  },
  {
    title: '所属部门',
    dataIndex: 'department',
    width: '40%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
interface DataItem {
  newFlag?: boolean;
  key: string;
  name: string;
  number: string;
  department: string;
}
const data: DataItem[] = [
  {
    key: '1',
    name: '小明',
    number: '001',
    department: '行政部'
  },
  {
    key: '2',
    name: '李莉',
    number: '002',
    department: 'IT部'
  },
  {
    key: '3',
    name: '王小帅',
    number: '003',
    department: '财务部'
  }
];
const dataSource = ref<DataItem[]>(data);
const editableData: Params = reactive({});
const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = (key: string) => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = (key: string) => {
  delete editableData[key];
};

const deleteData = (key: string) => {
  const result: DataItem[] = [];
  dataSource.value.forEach((item: DataItem) => {
    if (item.key !== key) {
      result.push(item);
    }
  });
  dataSource.value = result;
}
const add = () => {
  const newData = {
    newFlag: true,
    key: new Date().getMilliseconds().toString(),
    name: '',
    number: '',
    department: ''
  };
  dataSource.value.push(newData);
  editableData[newData.key] = cloneDeep(newData);
}

const addSave = (key: string) => {
  if (isEmpty(editableData[key].name) || isEmpty(editableData[key].name) || isEmpty(editableData[key].name)) {
    return message.error('请填写完整成员信息。');
  }
  delete editableData[key].newFlag;
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
}

const cloneDeep = (data: any) => {
  return JSON.parse(JSON.stringify(data));
}
</script>
<style lang="less">
.editable-row-operations a {
  color: #1677ff;
}

.form-bottom {
  padding: 0 24px;
  height: 45px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid rgba(5, 5, 5, 0.06);
  box-shadow: 0 6px 16px rgba(0, 0, 0, .08), 0 3px 6px -4px rgba(0, 0, 0, .12), 0 9px 28px 8px rgba(0, 0, 0, .05);
}
</style>
