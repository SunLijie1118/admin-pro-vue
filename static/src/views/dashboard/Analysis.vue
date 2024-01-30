<template>
  <page-view :showBread="false">
    <a-row class="mt-6 ml-6 mr-6">
      <a-col :span="6">
        <chart-card class="mr-6" total="￥126,560" title="总销售额">
          <template #action>
            <a-tooltip>
              <template #title>指标说明</template>
              <InfoCircleOutlined />
            </a-tooltip>
          </template>
          <div>
            <Trend term="周同比" :percentage="12" :fixed="0" :type="true" class="mr-6"></Trend>
            <Trend term="日同比" :percentage="11" :fixed="0" :type="false"></Trend>
          </div>
          <template #footer>
            日销售额<span class="px-3">￥ 12,423</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :span="6">
        <chart-card class="mr-6" total="￥8,846" title="访问量">
          <template #action>
            <a-tooltip>
              <template #title>指标说明</template>
              <InfoCircleOutlined />
            </a-tooltip>
          </template>
          <div style="height: 46px;">
            <Line :echartsLine="visitLine" />
          </div>
          <template #footer>
            日访问量<span class="px-3">￥ 12,423</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :span="6">
        <chart-card class="mr-6" total="￥6,560" title="支付笔数">
          <template #action>
            <a-tooltip>
              <template #title>指标说明</template>
              <InfoCircleOutlined />
            </a-tooltip>
          </template>
          <div style="height: 46px;">
            <Bar :echartsBar="countBar" />
          </div>
          <template #footer>
            转化率<span class="px-3">60%</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :span="6">
        <chart-card total="78%" title="运营活动效果">
          <div>
            <mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="78" height="8px" />
          </div>
          <template #footer>
            <Trend term="周同比" :percentage="12" :fixed="0" :type="true" class="mr-6"></Trend>
            <Trend term="日同比" :percentage="11" :fixed="0" :type="false"></Trend>
          </template>
        </chart-card>
      </a-col>
    </a-row>
    <a-card class="mt-6 ml-6 mr-6" :tab-list="tabListTitle" :active-tab-key="titleKey" @tabChange="onTabChange">
      <a-row>
        <a-col :span="15">
          <p v-if="titleKey === '销售额'">
            销售趋势
          </p>
          <p v-else-if="titleKey === '访问量'">
            访问量趋势
          </p>
          <div class="echarts">
            <Bar :echartsBar="middleBar" />
          </div>
        </a-col>
        <a-col :span="9">
          <rank-list :title="rankTitle" :list="rankList"></rank-list>
        </a-col>
      </a-row>
      <template #tabBarExtraContent>
        <div class="extra-item">
          <a-radio-group v-model:value="dateValue" @change="dateChange">
            <a-radio-button value="today">今日</a-radio-button>
            <a-radio-button value="week">本周</a-radio-button>
            <a-radio-button value="mouth">本月</a-radio-button>
            <a-radio-button value="year">全年</a-radio-button>
          </a-radio-group>
        </div>
        <a-range-picker v-model:value="datePickerValue" @change="rangePickerChange" />
      </template>
    </a-card>
    <a-row class="mt-6 ml-6 mr-6">
      <a-col :span="12">
        <a-card title="线上热门搜索" class="mr-3">
          <template #extra>
            <a-dropdown>
              <a @click.prevent>
                <EllipsisOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">操作一</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">操作二</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <a-row>
            <a-col :span="12" class="pr-3">
              <number-info class="mr-6" total="12,321" title="搜索用户数">
                <template #action>
                  <a-tooltip>
                    <template #title>指标说明</template>
                    <InfoCircleOutlined />
                  </a-tooltip>
                </template>
                <template #total>
                  <span class="mr-6">12,321</span>
                  <Trend term="" :percentage="17.1" :fixed="1" :type="true" class="mr-6"></Trend>
                </template>
                <template #content>
                  <line-custom :lineCustom="visitLine"></line-custom>
                </template>
              </number-info>
            </a-col>
            <a-col :span="12" class="pl-3">
              <number-info class="mr-6" total="2.7" title="人均搜索次数">
                <template #action>
                  <a-tooltip>
                    <template #title>指标说明</template>
                    <InfoCircleOutlined />
                  </a-tooltip>
                </template>
                <template #total>
                  <span class="mr-6">2.7</span>
                  <Trend term="" :percentage="26.2" :fixed="1" :type="false"></Trend>
                </template>
                <template #content>
                  <line-custom :lineCustom="visitLine"></line-custom>
                </template>
              </number-info>
            </a-col>
            <a-col :span="24">
              <a-table :columns="table.columns" :data-source="table.data" :loading="middleSpinning" size="small"
                :pagination="{ defaultPageSize: 5 }">
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'keyword'">
                    <a href="#">
                      {{ record.keyword }}
                    </a>
                  </template>
                  <template v-if="column.key === 'range'">
                    <span>{{ record.range }}</span>
                    <span :class="['trend-icon', record.status ? 'up' : 'down']">
                      <CaretUpOutlined v-if="record.status" />
                      <CaretDownOutlined v-if="!record.status" />
                    </span>
                  </template>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="销售额类别占比" class="ml-3">
          <template #extra>
            <a-radio-group v-model:value="typeValue" @change="typeChange" class="mr-3">
              <a-radio-button value="all">全部渠道</a-radio-button>
              <a-radio-button value="online">线上</a-radio-button>
              <a-radio-button value="offline">门店</a-radio-button>
            </a-radio-group>
            <a-dropdown>
              <a @click.prevent>
                <EllipsisOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">操作一</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">操作二</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <div class="echarts" style="height: 425px;">
            <pie :echartsPie="saleTypeData"></pie>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <div class="m-6">
      <a-card :loading="middleSpinning" :tab-list="tabStore" :active-tab-key="storeKey" @tabChange="onStoreTabChange">
        <template #customTab="item">
          <p class="numberInfoTitle">{{ item.tab }}</p>
          <p class="numberInfoSubTitle">转化率</p>
          <p class="numberInfoValue">{{ item.cvr }}</p>
        </template>
        <div class="echarts" style="height: 400px;">
          <line-multi :echartsLineMulti="echartsLineMulti"></line-multi>
        </div>
      </a-card>
    </div>
  </page-view>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import {
  InfoCircleOutlined,
  EllipsisOutlined,
  CaretUpOutlined,
  CaretDownOutlined
} from '@ant-design/icons-vue';
import * as dayjs from 'dayjs';
import PageView from '@/layouts/PageView.vue';
import ChartCard from '@/components/Chart/ChartCard.vue';
import Trend from '@/components/Chart/Trend.vue';
import Line from '@/components/Chart/Line.vue';
import Bar from '@/components/Chart/Bar.vue';
import MiniProgress from '@/components/Chart/MiniProgress.vue';
import RankList from '@/components/RankList.vue';
import Pie from '@/components/Chart/Pie.vue';
import NumberInfo from '@/components/NumberInfo.vue';
import LineCustom from '@/components/Chart/LineCustom.vue';
import LineMulti from '@/components/Chart/LineMulti.vue';
import { FakeChartData } from '@/api/message';
import type { analysisTableType } from '@/types/project';

// 接口请求的加载状态
const middleSpinning = ref(false);

// 第一层卡片折线图
const visitLine = ref<any>({
  name: '访问量',
  axisData: [],
  seriesData: []
});

// 第一层柱状图配置
const countBar = ref<any>({
  name: '支付笔数',
  axisData: [],
  seriesData: []
});



// 第二层柱状图配置
const middleBar = ref<any>({
  name: '销售趋势',
  axisData: [],
  seriesData: [],
  customFunc: (option: any) => {
    option.xAxis.axisLine = {
      show: true
    };
    option.yAxis = {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    };
    option.grid = {
      top: 30,
      bottom: 10,
      left: 10,
      right: 0,
      containLabel: true,
    };
  }
});

// 第二层卡片tab页签的配置
const tabListTitle = [
  {
    key: '销售额',
    tab: '销售额',
  },
  {
    key: '访问量',
    tab: '访问量',
  },
];
const titleKey = ref<'销售额' | '访问量'>('销售额');
const onTabChange = (key: '销售额' | '访问量') => {
  titleKey.value = key;
  middleBar.value.name = key;
  getFakeChartData();
  rankTitle.value = `门店${key}排名`;
}

// 第二层日期的配置
const dateValue = ref<string>('today');
const datePickerValue = ref([dayjs(), dayjs()]);
const dateChange = () => {
  switch (dateValue.value) {
    case 'today':
      datePickerValue.value = [dayjs(), dayjs()];
      break;
    case 'week':
      datePickerValue.value = [dayjs().subtract(7, 'day'), dayjs()];
      break;
    case 'mouth':
      datePickerValue.value = [dayjs().subtract(30, 'day'), dayjs()];
      break;
    case 'year':
      datePickerValue.value = [dayjs().subtract(365, 'day'), dayjs()];
      break;
    default:
      datePickerValue.value = [];
      break;
  }
}
const rangePickerChange = () => {
  dateValue.value = '';
}



// 第三层表格配置
const table = {
  columns: [
    {
      title: '排名',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '搜索关键词',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: '用户数',
      dataIndex: 'count',
      key: 'count',
      sorter: (a: analysisTableType, b: analysisTableType) => a.count - b.count,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '周涨幅',
      key: 'range',
      dataIndex: 'range',
      sorter: (a: analysisTableType, b: analysisTableType) => a.range - b.range,
      sortDirections: ['descend', 'ascend'],
    },
  ],
  data: []
};

// 第三层卡片tab页签的配置
const rankTitle = ref<string>('门店销售额排名');
const rankList = ref<Array<any>>([]);

const typeValue = ref<'all' | 'online' | 'offline'>('all');
const saleTypeData = ref<any>({
  name: '销售额',
  seriesData: []
});
const typeChange = () => {
  getSaleTypeData();
}



// 第四层折线图配置
const echartsLineMulti = ref<any>({
  name: '',
  axisData: [],
  seriesData: {
    '客流量': [],
    '支付笔数': []
  }
})
// 第四层卡片tab页签的配置
const tabStore = ref<Array<{ key: number; tab: string; cvr: string; }>>([]);
const storeKey = ref<number>();
const onStoreTabChange = () => {
  console.log(storeKey.value);
}



// 通过接口获取假数据
const getFakeChartData = () => {
  middleSpinning.value = true;
  middleBar.value.axisData = [];
  middleBar.value.seriesData = [];
  tabStore.value = [];
  FakeChartData().then((data: any) => {
    middleSpinning.value = false;
    const temp = data.data.default.salesData;
    temp.map((item: any) => {
      middleBar.value.axisData.push(item.x);
      middleBar.value.seriesData.push(item.y);
    });
    table.data = data.data.default.searchData;
    data.data.default.offlineData.forEach((item: any, index: number) => {
      tabStore.value.push({
        key: index,
        tab: item.name,
        cvr: (item.cvr * 100).toFixed(0) + '%'
      });
    });
    data.data.default.offlineChartData.forEach((item: any) => {
      echartsLineMulti.value.axisData.push(dayjs(item.x).format('hh:mm'));
      echartsLineMulti.value.seriesData['客流量'].push(item.y1);
      echartsLineMulti.value.seriesData['支付笔数'].push(item.y2);
    });
  })
}
// 通过接口获取假数据
const getSaleTypeData = () => {
  saleTypeData.value.seriesData = [];
  FakeChartData().then((data: any) => {
    let series: any = [];
    switch (typeValue.value) {
      case 'all':
        series = data.data.default.salesTypeData;
        break;
      case 'online':
        series = data.data.default.salesTypeDataOnline;
        break;
      case 'offline':
        series = data.data.default.salesTypeDataOffline;
        break;
      default:
        break;
    }
    series.map((item: any) => {
      saleTypeData.value.seriesData.push({
        name: item.x,
        value: item.y
      });
    });
  })
}



// 制造图形绘制需要的假数据
const calValue = () => {
  for (let i = 0; i < 15; i++) {
    const axis = dayjs().subtract(15 - i, 'day').format('YYYY-MM-DD');
    visitLine.value.axisData.push(axis);
    countBar.value.axisData.push(axis);
    visitLine.value.seriesData.push(Math.round(Math.random() * 20));
    countBar.value.seriesData.push(Math.round(Math.random() * 100));
  }
  for (let i = 0; i < 7; i++) {
    rankList.value.push({
      name: '工专路 ' + i + ' 号店',
      total: 323234
    })
  }
}



// 进入页面后制造各种图形需要的假数据
calValue();

watch(datePickerValue, () => {
  // dateValue.value = '';
});

onMounted(() => {
  getFakeChartData();
  getSaleTypeData();
});

</script>
<style lang="less" scoped>
.extra-item {
  display: inline-block;
  margin-right: 24px;

  a {
    margin-left: 24px;
  }
}

.echarts {
  width: 100%;
  height: 300px;
}

.trend-icon {
  font-size: 14px;

  &.up,
  &.down {
    margin-left: 6px;
    position: relative;
    top: 1px;
  }

  &.up {
    color: #f5222d;
  }

  &.down {
    color: #52c41a;
  }
}

.numberInfoTitle {
  @apply mb-4;
  color: rgba(0, 0, 0, 0.88);
  font-size: 16px;
}

.numberInfoSubTitle {
  height: 22px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.numberInfoValue {
  color: rgba(0, 0, 0, 0.88);
  font-size: 24px;
  line-height: 32px;
  margin-top: 2px;
}
</style>
