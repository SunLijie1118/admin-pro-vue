<template>
  <page-view :showBread="false">
    <a-row>
      <a-col :span="18">
        <a-card title="活动实时交易情况" :bordered="false" class="mt-6 ml-6 mr-6">
          <a-row>
            <a-col :span="6">
              <a-statistic title="今日交易总额" :value="124543233" />
              <template #suffix>
                元
              </template>
            </a-col>
            <a-col :span="6">
              <a-statistic title="销售目标完成率" :value="'92%'" />
              <template #suffix>
                元
              </template>
            </a-col>
            <a-col :span="6">
              <a-statistic-countdown title="活动剩余时间" :value="deadline" @finish="onFinish" />
            </a-col>
            <a-col :span="6">
              <a-statistic title="每秒交易总额" :value="234" />
              <template #suffix>
                元
              </template>
            </a-col>
            <div class="map-chart">
              <map-scatter :echartsMap="echartsMap" class="map"></map-scatter>
            </div>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="活动情况预测" :bordered="false" class="mt-6 mr-6">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card>
        <a-card title="券核效率" :bordered="false" class="mt-6 mr-6">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card>
      </a-col>
    </a-row>

  </page-view>
</template>
<script lang="ts" setup>
import PageView from '@/layouts/PageView.vue';
import MapScatter from '@/components/Chart/MapScatter.vue';

const deadline = Date.now() + 1000 * 60 * 60 * 1;
const onFinish = () => {
  console.log('finished !');
}

const echartsMap = {
  mapType: '世界',
  data: [
    { name: '中国', value: 10000 },
    { name: '加拿大', value: 800 },
    { name: '美国', value: 100 },
    { name: '澳大利亚', value: 300 }
  ]
};

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
</style>
