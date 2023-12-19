<template>
  <page-view :showBread="false">
    <a-card class="welcome-card">
      <div class="content-title">
        {{ timeFix() }}，{{ currentUser.name }}<span class="welcome-text">，{{ welcome() }}</span>
      </div>
      <div>蚂蚁金服 - 某某某事业群 - 某某平台部 - 某某技术部 - UED</div>
    </a-card>
    <a-row class="page-content">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card class="mt-6 ml-6">
          <a-row>
            <a-col :span="6">
              <a-statistic title="我的待办" :value="8" class="spec-stat">
                <template #suffix>
                  个任务
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic title="本周任务平均处理时间" :value="32" class="spec-stat">
                <template #suffix>
                  分钟
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic title="本周完成任务数" :value="24" class="spec-stat">
                <template #suffix>
                  个任务
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic title="异常（个）" :value="1" class="spec-stat border-none" />
            </a-col>
          </a-row>
        </a-card>
        <a-card title="动态" class="mt-6 ml-6">
          <a-list>
            <a-list-item v-for="item in activities" :key="item.id">
              <a-list-item-meta>
                <template #avatar>
                  <a-avatar :src="item.user.avatar" />
                </template>
                <template #description>
                  <a @click="gotoUser(item)" class="pr-2 a-color">{{ item.user.name }}</a>
                  <span v-html="parseTemplate(item)"></span>
                </template>
              </a-list-item-meta>
              <div class="project-item">
                <span class="datetime">{{ $dateToToday(item.updatedAt) }}</span>
              </div>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card class="ml-6 mt-6 mr-6">
          <template #cover>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png" alt="">
          </template>
        </a-card>
        <a-card class="mt-6 ml-6 mr-6" :tab-list="tabListTitle" :active-tab-key="titleKey"
          @tabChange="(key: string) => onTabChange(key)">
          <div class="members">
            <a-row>
              <a-col :span="12" v-for="(item, index) in projects" :key="index">
                <a :href="item.href">
                  <a-avatar size="small" :src="item.logo" />
                  <span class="member">{{ item.member }}</span>
                </a>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </page-view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import PageView from '@/layouts/PageView.vue';
import { timeFix, welcome } from '@/utils/utils';
import type { activity, project } from '@/types';
import { getActivities, getProjectNotice } from '@/api/message';
const currentUser = ref<{ name: string; avatar: string }>({
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
});
const activities = ref<Array<activity>>([]);
const projects = ref<Array<project>>([]);
const tabListTitle = [
  {
    key: 'team',
    tab: '团队',
  },
  {
    key: 'collection',
    tab: '我的收藏',
  },
];
const titleKey = ref('team');
const onTabChange = (key: string) => {
  titleKey.value = key;
}
const getActivitiesData = () => {
  getActivities().then((data: any) => {
    activities.value = data.data.default;
  })
}
const parseTemplate = (item: any) => {
  return item.template.replace(/@\{(\w+)\}/g, (match: any, key: string) => {
    if (item[key] && item[key].name && item[key].link) {
      return `<a href="${item[key].link}" style="color: #1677ff">${item[key].name}</a>`;
    }
    return match;
  });
}

const gotoUser = (item: activity) => {
  console.log(item);
}

const getProjectNoticeData = () => {
  getProjectNotice().then((data: any) => {
    projects.value = data.data.default;
  });
}
onMounted(() => {
  getActivitiesData();
  getProjectNoticeData();
});
</script>
<style lang="less" scoped>
.welcome-card {
  @apply mt-6 ml-6 mr-6;
  background-color: #27a6fe;
  color: #fff;
  font-size: 14px;
  line-height: 2;

  .content-title {
    font-size: 24px;
    @apply mb-2;
  }
}

.project-item {
  display: flex;
  margin-top: 12px;
  overflow: hidden;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  margin-left: 48px;

  a {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    flex: 1 1 0;

    &:hover {
      color: #1890ff;
    }
  }

  .datetime {
    color: rgba(0, 0, 0, 0.25);
    flex: 0 0 auto;
    float: right;
  }
}

.a-color {
  color: #1677ff;
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.spec-stat {
  text-align: center;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
}

.border-none {
  @apply border-r-0;
}
</style>
