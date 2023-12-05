<template>
  <a-layout-sider :collapsed="collapsed" collapsible>
    <div id="logo" class="logo">
      <slot name="menuHeaderRender">
        <router-link to="/">
          <img src="~@/assets/logo.svg" alt="logo">
          <h1 v-if="!collapsed">{{ title }}</h1>
        </router-link>
      </slot>
    </div>
    <template #trigger>
      <div class="trigger" @click="toggleCollapse">
        <menu-unfold-outlined v-if="collapsed" />
        <menu-fold-outlined v-else />
      </div>
    </template>
    <a-menu :selectedKeys="[route.path]" theme="dark" mode="inline" :openKeys="openKeys" @click="handleClick"
      @openChange="handleOpen">
      <MenuItem v-for="item in routes[0].children" :item="item" :key="item.path" />
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
// 导入自定义菜单组件
import MenuItem from './MenuItem.vue';
// 导入菜单路由数据
import { routes } from '@/router/routes';
// 导入menu中collapsed状态
import { useMenuStore } from '@/stores';

const props = defineProps({
  title: {
    type: String,
    default: 'Ant Design Pro'
  },
});

const menuStore = useMenuStore()
const { collapsed } = storeToRefs(menuStore);
const router = useRouter()
const route = useRoute()

const openKeys = ref<string[]>(['']);

const handleClick = (menu: any) => {
  router.push(menu.key);
}

const handleOpen = (keys: string[]) => {
  openKeys.value = keys;
}

const toggleCollapse = () => {
  menuStore.toggleCollapsed();
}

</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  padding: 16px;
  line-height: 32px;
  cursor: pointer;

  >a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;

    img {
      display: inline-block;
      height: 32px;
      vertical-align: middle;
      transition: height .2s;
    }

    h1 {
      display: inline-block;
      height: 32px;
      margin: 0 0 0 12px;
      overflow: hidden;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      line-height: 32px;
      vertical-align: middle;
    }
  }
}
.trigger{
  font-size: 16px;
}
</style>
