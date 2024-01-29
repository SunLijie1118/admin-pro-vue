<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  echartsLineMulti: {
    type: Object,
    required: true
  }
});

const container = ref(null);
let chart: any = null;
const resizeNamespace = '' + Date.now();

watch(props.echartsLineMulti, () => {
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
  const series: any = [];
  Object.keys(props.echartsLineMulti.seriesData).forEach((key: string) => {
    series.push(
      {
        name: key,
        type: 'line',
        data: [...props.echartsLineMulti.seriesData[key]],
        showSymbol: false,
      }
    );
  });
  const option = {
    grid: {
      top: 60,
      bottom: 60,
      left: 20,
      right: 20,
      containLabel: true,
    },
    color: ['#1790FF', '#1BC4C4'],
    tooltip: {
      trigger: 'axis',
    },
    legend: { show: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [...props.echartsLineMulti.axisData],
      axisLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0.85)'
        }
      },

    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0.85)'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    dataZoom: [{}],
    series: [...series]
  };
  if (props.echartsLineMulti.customFunc && typeof props.echartsLineMulti.customFunc === 'function') {
    props.echartsLineMulti.customFunc(option);
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
