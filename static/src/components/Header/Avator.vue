<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight" overlayClassName="header-icon">
    <div class="avator flex align-middle">
      <a-avatar src="/image/user.png" :size="24" />
      <span class="ml-1 inline-block">{{ currentUser.name }}</span>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item @click="handleToCenter">
          <UserOutlined />个人中心
        </a-menu-item>
        <a-menu-item @click="handleToSettings">
          <SettingOutlined />个人设置
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="handleLogout">
          <LogoutOutlined />退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-if="!currentUser || !currentUser.name">
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script lang="ts" setup>
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';
const props = defineProps({
  currentUser: {
    type: Object,
    default: () => null
  },
});

const handleToCenter = () => {
  console.log('跳转到个人中心');
}

const handleToSettings = () => {
  console.log('跳转到个人设置');
}

const handleLogout = () => {
  console.log('跳转到登录页面');
}

</script>

<style lang="less" scoped>
.avator {
  padding: 0 12px;
  display: inline-block;
  cursor: pointer;
}

.avator:hover {
  background-color: rgba(0, 0, 0, 0.025);
}
</style>
