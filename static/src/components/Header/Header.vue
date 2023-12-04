<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="trigger" @click="toggle">
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </div>
    <RightContent />
  </a-layout-header>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import RightContent from '@/components/Header/RightContent.vue';
// 导入menu中collapsed状态
import { useMenuStore } from '@/stores';

const menuStore = useMenuStore()
const { collapsed } = storeToRefs(menuStore);
const toggle = () => {
  menuStore.toggleCollapsed();
}
</script>
<style lang="less" scoped></style>
