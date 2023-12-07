import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Params } from '@/types';


export const useMenuStore = defineStore('menu', () => {
  // 折叠
  const collapsed = ref(false);
  function toggleCollapsed() {
    collapsed.value = !collapsed.value;
  };
  // 语言
  const currentLang = ref('zh-CN');
  function setLang(lang: string) {
    currentLang.value = lang;
  }
  // 面包屑导航
  const breadcrumbMap = ref<Params>({});
  function setBreadcrumbMap(map: Params) {
    breadcrumbMap.value = map;
  }
  return {
    collapsed,
    currentLang,
    breadcrumbMap,
    toggleCollapsed,
    setLang,
    setBreadcrumbMap
  }
})
