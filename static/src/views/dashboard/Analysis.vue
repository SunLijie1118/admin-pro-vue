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
  </page-view>
</template>
<script lang="ts" setup>
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import PageView from '@/layouts/PageView.vue';
import ChartCard from '@/components/Chart/ChartCard.vue';
import Trend from '@/components/Chart/Trend.vue';
import Line from '@/components/Chart/Line.vue';
import Bar from '@/components/Chart/Bar.vue';
import MiniProgress from '@/components/Chart/MiniProgress.vue';
import * as dayjs from 'dayjs';

const visitLine: any = {
  name: '访问量',
  axisData: [],
  seriesData: []
};

const countBar: any = {
  name: '支付笔数',
  axisData: [],
  seriesData: []
};

for (let i = 0; i < 15; i++) {
  const axis = dayjs().subtract(15 - i, 'day').format('YYYY-MM-DD');
  visitLine.axisData.push(axis);
  countBar.axisData.push(axis);
  visitLine.seriesData.push(Math.round(Math.random() * 20));
  countBar.seriesData.push(Math.round(Math.random() * 100));
}
</script>
