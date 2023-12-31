<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  echartsBar: {
    type: Object,
    required: true
  }
});

const container = ref(null);
let chart: any = null;
const resizeNamespace = '' + Date.now();

watch(props.echartsBar, () => {
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
    color: ['#3AA1FF'],
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: [...props.echartsBar.axisData],
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
    },
    series: [
      {
        name: props.echartsBar.name,
        type: 'bar',
        data: [...props.echartsBar.seriesData],
        barWidth: '60%'
      }
    ]
  };
  if (props.echartsBar.customFunc && typeof props.echartsBar.customFunc === 'function') {
    props.echartsBar.customFunc(option);
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
