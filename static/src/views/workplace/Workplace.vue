<template>
  <page-view :showBread="false">
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
    <a-row class="page-content">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card title="进行中的项目">
          <template #extra><a href="#">全部项目</a></template>
          <a-card-grid style="width: calc(100% / 3);" v-for="item in projects" :key="item.id">
            <a-card-meta :title="item.title" :description="item.description">
              <template #avatar>
                <a-avatar :src="item.logo" />
              </template>
            </a-card-meta>
            <div class="project-item">
              <a :href="item.href">{{ item.member }}</a>
              <span class="datetime">{{ $dateToToday(item.updatedAt) }}</span>
            </div>
          </a-card-grid>
        </a-card>
        <a-card title="动态" class="mt-6">
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
        <a-card title="快速开始 / 便捷导航" class="ml-6">
          <div class="item-group">
            <a>操作一</a>
            <a>操作二</a>
            <a>操作三</a>
            <a>操作四</a>
            <a>操作五</a>
            <a>操作六</a>
            <a-button size="small" type="primary" ghost>
              <template #icon>
                <PlusOutlined style="position: relative;top: -2px;" />
              </template>添加
            </a-button>
          </div>
        </a-card>
        <a-card title="XX 指数" class="mt-6 ml-6">
          <a-spin :spinning="radarSpinning">
            <div style="height: 360px;">
              <radar v-if="!radarSpinning && radarData.legend.length" :echartsRadar="radarData" />
            </div>
          </a-spin>
        </a-card>
        <a-card title="团队" class="mt-6 ml-6">
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
import { PlusOutlined } from '@ant-design/icons-vue';
import PageView from '@/layouts/PageView.vue';
import { timeFix, welcome } from '@/utils/utils';
import { getProjectNotice, getActivities, FakeChartData } from '@/api/message';
import type { project, activity } from '@/types';
import Radar from '@/components/Chart/Radar.vue';

const currentUser = ref<{ name: string; avatar: string }>({
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
});

const projects = ref<Array<project>>([]);
const activities = ref<Array<activity>>([]);
let radarData: any = {
  name: 'XX 指数',
  indicator: [],
  legend: [],
  seriesData: []
};
const radarSpinning = ref<boolean>(false);
const getProjectNoticeData = () => {
  getProjectNotice().then((data: any) => {
    projects.value = data.data.default;
  });
}
const getActivitiesData = () => {
  getActivities().then((data: any) => {
    activities.value = data.data.default;
  })
}

const getFakeChartData = () => {
  radarSpinning.value = true;
  FakeChartData().then((data: any) => {
    radarSpinning.value = false;
    const temp = data.data.default.radarData;
    const legend = Object.keys(temp);
    const seriesData: any = [];
    const indicatorTemp: any = {};
    legend.forEach(key => {
      const values: number[] = [];
      temp[key].forEach((item: { name: string; value: number }) => {
        values.push(item.value);
        indicatorTemp[item.name] = true;
      });
      seriesData.push({
        name: key,
        value: values
      });
    });
    const indicator: any = [];
    Object.keys(indicatorTemp).forEach((key: string) => {
      indicator.push({
        name: key
      });
    })
    radarData = {
      ...radarData,
      legend,
      indicator,
      seriesData
    };
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

onMounted(() => {
  getProjectNoticeData();
  getActivitiesData();
  getFakeChartData();
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

.page-content {
  @apply m-6;
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

.item-group {

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
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
</style>
