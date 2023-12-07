<template>
  <PageView :showBread="false">
    <div class="page-header-heading">工作台</div>
    <div class="page-header-content">
      <div class="left-info">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix() }}，{{ currentUser.name }}<span class="welcome-text">，{{ welcome() }}</span>
          </div>
          <div>蚂蚁金服 - 某某某事业群 - 某某平台部 - 某某技术部 - UED</div>
        </div>
      </div>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic title="项目数" :value="56" />
        </div>
        <div class="stat-item">
          <a-statistic title="团队内排名" :value="8" suffix="/ 24" />
        </div>
        <div class="stat-item">
          <a-statistic title="项目访问" :value="2223" />
        </div>
      </div>
    </div>

  </PageView>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import PageView from '@/layouts/PageView.vue';
import { timeFix, welcome } from '@/utils/utils';

const currentUser = ref<{ name: string; avatar: string }>({
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
});

</script>

<style lang="less" scoped>
.page-header-heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  line-height: 32px;
  font-weight: 600;
  background: #fff;
  @apply px-6 pt-5;
}

.page-header-content {
  background: #fff;
  @apply flex justify-between px-6 py-5;

  .left-info {
    @apply flex;
  }

  .avatar {
    flex: 0 1 72px;

    &>span {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 72px;
    }
  }

  .content {
    position: relative;
    top: 4px;
    margin-left: 24px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.65);
    flex: 1 1 auto;

    .content-title {
      margin-bottom: 12px;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}

.extra-content {
  display: flex;

  .stat-item {
    display: inline-block;
    padding: 0 32px;
    position: relative;

    &:not(:last-child)::after {
      position: absolute;
      top: 8px;
      right: 0px;
      width: 1px;
      height: 40px;
      background-color: #e8e8e8;
      content: "";
    }
  }
}
</style>
