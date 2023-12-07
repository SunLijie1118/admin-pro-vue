<template>
  <a-layout style="min-height: 100vh">
    <SiderMenu :title="'Admin Pro'" />
    <a-layout style="min-height: 100vh">
      <Header />
      <a-layout-content>
        <RouteView></RouteView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>

import SiderMenu from '@/components/SiderMenu/SiderMenu.vue';
import Header from '@/components/Header/Header.vue';
import RouteView from './RouteView.vue';

</script>

<style lang="less" scoped>
.ant-layout-content {
  margin: 24px;
}
</style>
