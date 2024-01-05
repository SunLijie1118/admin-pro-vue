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
            <a-col :span="12">
              <chart-card class="mr-6" total="12,321" title="搜索用户数">
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
            <a-col :span="12"></a-col>
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
          <div class="echarts">
            <pie :echartsPie="saleTypeData"></pie>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </page-view>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { InfoCircleOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import PageView from '@/layouts/PageView.vue';
import ChartCard from '@/components/Chart/ChartCard.vue';
import Trend from '@/components/Chart/Trend.vue';
import Line from '@/components/Chart/Line.vue';
import Bar from '@/components/Chart/Bar.vue';
import MiniProgress from '@/components/Chart/MiniProgress.vue';
import * as dayjs from 'dayjs';
import { FakeChartData } from '@/api/message';
import RankList from '@/components/RankList.vue';
import Pie from '@/components/Chart/Pie.vue';

const visitLine = ref<any>({
  name: '访问量',
  axisData: [],
  seriesData: []
});

const countBar = ref<any>({
  name: '支付笔数',
  axisData: [],
  seriesData: []
});

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
const middleSpinning = ref(false);

for (let i = 0; i < 15; i++) {
  const axis = dayjs().subtract(15 - i, 'day').format('YYYY-MM-DD');
  visitLine.value.axisData.push(axis);
  countBar.value.axisData.push(axis);
  visitLine.value.seriesData.push(Math.round(Math.random() * 20));
  countBar.value.seriesData.push(Math.round(Math.random() * 100));
}

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

const getFakeChartData = () => {
  middleSpinning.value = true;
  middleBar.value.axisData = [];
  middleBar.value.seriesData = [];
  FakeChartData().then((data: any) => {
    middleSpinning.value = false;
    const temp = data.data.default.salesData;
    console.log(data.data.default);
    temp.map((item: any) => {
      middleBar.value.axisData.push(item.x);
      middleBar.value.seriesData.push(item.y);
    });
  })
}

const rankTitle = ref<string>('门店销售额排名');
const rankList = ref<Array<any>>([]);
for (let i = 0; i < 7; i++) {
  rankList.value.push({
    name: '工专路 ' + i + ' 号店',
    total: 323234
  })
}
const typeValue = ref<'all' | 'online' | 'offline'>('all');
const saleTypeData = ref<any>({
  name: '销售额',
  seriesData: []
});
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
const typeChange = () => {
  getSaleTypeData();
}
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
</style>
