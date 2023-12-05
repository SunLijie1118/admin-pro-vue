import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useMenuStore = defineStore('menu', () => {
  const collapsed = ref(false);
  function toggleCollapsed() {
    collapsed.value = !collapsed.value;
  };
  const currentLang = ref('zh-CN');
  function setLang(lang: string) {
    currentLang.value = lang;
  }
  return {
    collapsed,
    currentLang,
    toggleCollapsed,
    setLang
  }
})
