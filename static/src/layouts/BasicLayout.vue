<template>
  <a-layout style="min-height: 100vh">
    <SiderMenu :title="'Admin Pro'" />
    <a-layout style="min-height: 100vh">
      <Header />
      <a-layout-content style="max-height: calc(100vh - 48px); overflow: auto;">
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
