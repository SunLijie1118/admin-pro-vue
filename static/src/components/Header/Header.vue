<template>
  <a-layout-header class="header">
    <div class="trigger flex align-middle" @click="toggle">
      <menu-unfold-outlined v-if="collapsed" />
      <menu-fold-outlined v-else />
    </div>
    <div style="flex: 1 1 0%;"></div>
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
<style lang="less" scoped>
.header {
  background-color: #fff;
  padding: 0 16px;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  z-index: 2;
}

.trigger {
  margin-left: 8px;
  font-size: 20px;
  cursor: pointer;
}
</style>
