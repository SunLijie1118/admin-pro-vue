<template>
  <!-- 没有子菜单则直接渲染 -->
  <a-menu-item v-if="!item.children || !item.children.length" :key="item.path">
    <template #icon>
      <component :is="item.meta.icon" />
    </template>
    <span>{{ item.meta.title }}</span>
  </a-menu-item>
  <!-- 有子菜单 -->
  <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
    <template #icon>
      <component :is="item.meta.icon" />
    </template>
    <template #title>{{ item.meta.title }}</template>
    <!-- 循环渲染子菜单时要判断子菜单是否又包含子菜单，如果包含则调用自身组件递归渲染 -->
    <menu-item v-for="child in item.children" :item="child" :key="child.path" />
  </a-sub-menu>
</template>
<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>
