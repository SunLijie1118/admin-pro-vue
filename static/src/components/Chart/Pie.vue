<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  echartsPie: {
    type: Object,
    required: true
  }
});

const container = ref(null);
let chart: any = null;
const resizeNamespace = '' + Date.now();

watch(props.echartsPie, () => {
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
    tooltip: {
      trigger: 'item',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 20,
      top: 'center'
    },
    series: [
      {
        name: props.echartsPie.name,
        type: 'pie',
        radius: ['60%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 28,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [...props.echartsPie.seriesData],
      }
    ]
  };
  if (props.echartsPie.customFunc && typeof props.echartsPie.customFunc === 'function') {
    props.echartsPie.customFunc(option);
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
