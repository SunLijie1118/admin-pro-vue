<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  echartsRadar: {
    type: Object,
    required: true
  }
});

const container = ref(null);
const chart = ref<any>(null);
const resizeNamespace = '' + Date.now();
watch(props.echartsRadar, () => {
  if (!chart.value) {
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
  chart.value = echarts.init(container.value);
  window.addEventListener(`resize.${resizeNamespace}`, function () {
    chart.value.resize();
  });
}

const relieve = () => {
  window.removeEventListener(`resize.${resizeNamespace}`, function () {
    chart.value.resize();
  });
  if (chart.value) {
    chart.value.dispose();
  }
}
const renderChart = () => {
  const option = {
    tooltip: {
      show: true,
    },
    legend: {
      show: false,
      data: [...props.echartsRadar.legend]
    },
    radar: {
      indicator: [...props.echartsRadar.indicator],
      splitArea: {
        show: false,
      },
      axisLine: { //指向外圈文本的分隔线样式
        lineStyle: {
          color: '#eaeaea',
          type: 'dashed'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#eaeaea', // 分隔线颜色
          width: 1,
        }
      },
      axisName: {
        show: false
      }
    },
    series: [
      {
        name: props.echartsRadar.name,
        type: 'radar',
        data: [...props.echartsRadar.seriesData],
      }
    ]
  };
  chart.value.setOption(option);
}

</script>
<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
