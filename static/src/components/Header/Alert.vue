<template>
  <a-badge :count="99">
    <BellOutlined />
  </a-badge>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import {
  BellOutlined
} from '@ant-design/icons-vue';
import { getNotices } from '@/api/message';

const getNoticesData = () => {
  getNotices().then(resp => {
    console.log(resp);
  })
};

onMounted(() => {
  getNoticesData()
});
</script>

