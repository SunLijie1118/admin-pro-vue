<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  echartsGauge: {
    type: Object,
    required: true
  }
});

const container = ref(null);
let chart: any = null;
const resizeNamespace = '' + Date.now();

watch(props.echartsGauge, () => {
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
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [props.echartsGauge.value / 100, '#1677FF'],
              [1, '#F7F9FC']
            ]
          }
        },
        pointer: {
          width: 8,
          itemStyle: {
            color: 'auto'
          }
        },
        splitNumber: 5,
        axisTick: {
          show: false
        },
        splitLine: {
          distance: -12,
          length: 17,
          lineStyle: {
            color: '#1677FF',
            width: 2
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 20,
          formatter: (value: any) => {
            switch (value) {
              case 20:
                return '差';
              case 40:
                return '中';
              case 60:
                return '良';
              case 80:
                return '优';
              default:
                break;
            }
          }
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: 'rgba(0,0,0,0.65)',
          fontSize: 20,
          offsetCenter: [0, '70%'],
        },
        markPoint: {
          data: [{
            x: "50%",
            y: "50%",
            symbol: 'circle',
            symbolSize: 7,
            itemStyle: {
              color: "#fff"
            },
          }]
        },
        data: [
          {
            value: props.echartsGauge.value
          }
        ]
      }
    ]
  };
  if (props.echartsGauge.customFunc && typeof props.echartsGauge.customFunc === 'function') {
    props.echartsGauge.customFunc(option);
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
