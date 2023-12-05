<template>
  <a-layout style="min-height: 100vh">
    <SiderMenu :title="'Admin Pro'"/>
    <a-layout style="min-height: 100vh">
      <Header />
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>

import SiderMenu from '@/components/SiderMenu/SiderMenu.vue';
import Header from '@/components/Header/Header.vue';

</script>
