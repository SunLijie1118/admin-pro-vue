<template>
  <a-dropdown placement="bottomRight" overlayClassName="header-icon">
    <div class="lang flex align-middle">
      <GlobalOutlined />
    </div>
    <template #overlay>
      <a-menu :selectedKeys="[currentLang]">
        <a-menu-item v-for="lang in locales" :key="lang" @click="setLocalesLang(lang)">
          <span class="mr-3 inline-block">{{ languageIcons[lang] }}</span>
          <span>{{ languageLabels[lang] }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {
  GlobalOutlined
} from '@ant-design/icons-vue';
import { useMenuStore } from '@/stores';
import { type Params } from '@/types/index';

const locales = ['zh-CN', 'en-US'];
const languageLabels: Params = {
  'zh-CN': '简体中文',
  'en-US': 'English'
};
const languageIcons: Params = {
  'zh-CN': '🇨🇳',
  'en-US': '🇺🇸'
};

const menuStore = useMenuStore();
const { currentLang } = storeToRefs(menuStore);

const setLocalesLang = (lang: string) => {
  menuStore.setLang(lang);
  console.log('切换至语言', lang);
}
</script>

<style lang="less" scoped>
.lang {
  padding: 0 12px;
  display: inline-block;
  cursor: pointer;

  .anticon-global {
    font-size: 16px;
  }
}

.lang:hover {
  background-color: rgba(0, 0, 0, 0.025);
}
</style>
@/core/types/index
