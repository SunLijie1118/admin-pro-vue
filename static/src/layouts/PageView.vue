<template>
  <div class="page-container">
    <div class="breadcrumb">
      <a-breadcrumb>
        <template v-for="(bread, index) in breadcrumbs" :key="bread.name">
          <a-breadcrumb-item v-if="index !== breadcrumbs.length - 1">
            <router-link :to="bread.path">
              {{ bread.title }}
            </router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-else>{{ bread.title }}</a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import { routes } from '@/router/routes';
import type { breadcrumb } from '@/types';
// 导入menu中breadcrumbMap状态
import { useMenuStore } from '@/stores';

const route = useRoute()
const menuStore = useMenuStore()
const { breadcrumbMap } = storeToRefs(menuStore);
const breadcrumbs = ref<Array<breadcrumb>>([]);

const getBreadcrumbs = (data: any, has: any) => {
  if (data.children && data.children.length) {
    data.children.forEach((item: any) => {
      const bread = {
        name: item.name,
        path: item.path,
        title: item.meta.title
      };
      getBreadcrumbs(item, [...has, bread]);
    });
  } else {
    breadcrumbMap.value[data.path] = has;
  }
}

const getBreadcrumbMap = () => {
  if (JSON.stringify(breadcrumbMap.value) === '{}') {
    routes.forEach(item => {
      getBreadcrumbs(item, [])
    });
    menuStore.setBreadcrumbMap(breadcrumbMap.value);
  }
  breadcrumbs.value = breadcrumbMap.value[route.path];
}

onMounted(() => {
  getBreadcrumbMap()
});
</script>

<style lang="less" scoped>
.page-container {
  margin: -24px -24px 0;
}

.breadcrumb {
  background-color: #fff;
  padding: 20px 24px;
}
</style>
