<template>
  <page-view :showBread="false">
    <a-row>
      <a-col :span="18">
        <a-card title="活动实时交易情况" :bordered="false" class="mt-6 ml-6 mr-6">
          <a-row>
            <a-col :span="6">
              <a-statistic title="今日交易总额" :value="124543233" :suffix="'元'" />
            </a-col>
            <a-col :span="6">
              <a-statistic title="销售目标完成率" :value="'92%'" />
            </a-col>
            <a-col :span="6">
              <a-statistic-countdown title="活动剩余时间" :value="deadline" @finish="onFinish" />
            </a-col>
            <a-col :span="6">
              <a-statistic title="每秒交易总额" :value="234" :suffix="'元'" />
            </a-col>
            <div class="map-chart">
              <map-scatter :echartsMap="echartsMap" class="map"></map-scatter>
            </div>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="活动情况预测" :bordered="false" class="mt-6 mr-6">
          <a-statistic title="目标评估" :value="'有望达到预期'" />
          <div class="echarts pl-4 pr-4">
            <line-custom :lineCustom="visitLine"></line-custom>
          </div>
          <div class="dashed-line">
            <div class="line"></div>
          </div>
          <p class="active-number mb-4">{{ goalNumber }}亿元</p>
          <div class="dashed-line">
            <div class="line"></div>
          </div>
          <p class="active-number mb-4">{{ activeNumber }}亿元</p>
          <div class="active-chart-legend">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:00</span>
          </div>
        </a-card>
        <a-card title="券核效率" :bordered="false" class="mt-6 mr-6">
          <div class="echarts" style="height: 205px;">
            <gauge :echartsGauge="echartsGauge"></gauge>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <a-card title="各品类占比" :bordered="false" class="m-6 mr-0">
          <div class="echarts-b">
            <multi-pie :echartsMultiPie="echartsMultiPie"></multi-pie>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="热门搜索" :bordered="false" class="m-6 mr-0">
          <div class="echarts-b">
            <wordcloud :echartsWordcloud="echartsWordcloud"></wordcloud>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="资源剩余" :bordered="false" class="m-6">
          <div class="echarts-b">
            <liquidfill :echartsLiquidfill="echartsLiquidfill"></liquidfill>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </page-view>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as dayjs from 'dayjs';
import PageView from '@/layouts/PageView.vue';
import MapScatter from '@/components/Chart/MapScatter.vue';
import LineCustom from '@/components/Chart/LineCustom.vue';
import Gauge from '@/components/Chart/Gauge.vue';
import Wordcloud from '@/components/Chart/Wordcloud.vue';
import Liquidfill from '@/components/Chart/Liquidfill.vue';
import MultiPie from '@/components/Chart/MultiPie.vue';
import { getTags } from '@/api/message';

const deadline = Date.now() + 1000 * 60 * 60 * 1;
const onFinish = () => {
  console.log('finished !');
}

const echartsMap = ref<any>({
  mapType: '世界',
  data: [
    { name: '中国', value: 10000 },
    { name: '加拿大', value: 800 },
    { name: '美国', value: 100 },
    { name: '澳大利亚', value: 300 }
  ]
});

let intervalId: any = null;
const visitLine = ref<any>({
  name: '活动情况',
  axisData: [],
  seriesData: []
});
const goalNumber = ref<number>();
const activeNumber = ref<number>();

const echartsGauge = ref<any>({
  name: '券核效率',
  value: 87.0,
});

const echartsWordcloud = ref<any>({
  name: '热门搜索',
  data: []
});

const echartsLiquidfill = ref<any>({
  name: '补贴资金剩余',
  data: [0.34]
});

const echartsMultiPie = ref<any>({
  series: [
    {
      name: '品类一',
      value: 28,
    },
    {
      name: '品类二',
      value: 22,
    },
    {
      name: '品类三',
      value: 32,
    }
  ]
});
// 制造图形绘制需要的假数据
const calValue = () => {
  const LEN = 24;
  visitLine.value.axisData.length = 0;
  visitLine.value.seriesData.length = 0;
  for (let i = 0; i < LEN; i++) {
    const axis = dayjs().startOf('date').add(i, 'hour').format('YYYY-MM-DD HH:MM:ss');
    visitLine.value.axisData.push(axis);
    visitLine.value.seriesData.push(Math.round(Math.random() * 10) + 3 * i);
  }
  goalNumber.value = visitLine.value.seriesData[LEN - 1];
  activeNumber.value = visitLine.value.seriesData[LEN / 2];
}

const getHotTags = () => {
  getTags().then((resp) => {
    echartsWordcloud.value.data = resp.data.default.list;
  });
}

onMounted(() => {
  calValue();
  if (!intervalId) {
    intervalId = setInterval(() => {
      calValue();
    }, 1000 * 3);
  }
  getHotTags();
});

onUnmounted(() => {
  intervalId = null;
})
</script>

<style lang="less">
.map-chart {
  height: 500px;
  width: 100%;
}

.map {
  display: block;
  width: 100%;
  height: 100%;
}

.echarts {
  width: 100%;
  height: 60px;
}

.dashed-line {
  position: relative;
  height: 1px;
  width: 100%;

  .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, transparent 50%, #e9e9e9 50%);
    background-size: 6px;
  }
}

.active-chart-legend {
  height: 20px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  @apply mt-6;
}

.echarts-b {
  width: 100%;
  height: 128px;
}
</style>
