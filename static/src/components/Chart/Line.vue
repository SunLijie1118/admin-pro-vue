<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  echartsLine: {
    type: Object,
    required: true
  }
});

const container = ref(null);
let chart: any = null;
const resizeNamespace = '' + Date.now();

watch(props.echartsLine, () => {
  if (!chart) {
    initChart();
  }
  renderChart();
});
onMounted(() => {
  initChart();
  renderChart();
});

onUnmounted(() => {
  relieve();
});

const initChart = () => {
  chart = echarts.init(container.value);
  window.addEventListener(`resize.${resizeNamespace}`, function () {
    chart.resize();
  });
}

const relieve = () => {
  window.removeEventListener(`resize.${resizeNamespace}`, function () {
    chart.resize();
  });
  if (chart) {
    chart.dispose();
  }
}
const renderChart = () => {
  const option = {
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: false,
    },
    color: ['#B78FED'],
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [...props.echartsLine.axisData],
      axisLine: {
        show: false,
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      max: Math.max(...props.echartsLine.seriesData),
    },
    series: [
      {
        name: props.echartsLine.name,
        type: 'line',
        data: [...props.echartsLine.seriesData],
        areaStyle: {},
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        smooth: true,
      }
    ]
  };
  if (props.echartsLine.customFunc && typeof props.echartsLine.customFunc === 'function') {
    props.echartsLine.customFunc(option);
  }
  chart.setOption(option);
}

</script>
<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
