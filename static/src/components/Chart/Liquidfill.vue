<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';
import 'echarts-liquidfill';

const props = defineProps({
  echartsLiquidfill: {
    type: Object,
    required: true
  }
});

const container = ref(null);
let chart: any = null;
const resizeNamespace = '' + Date.now();

watch(props.echartsLiquidfill, () => {
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

const toPercent = (data: number) => {
  return (data * 100).toFixed(2);
}
const renderChart = () => {
  const option = {
    title: [
      {
        text: `${props.echartsLiquidfill.name}`,
        x: '50%',
        y: '20%',
        textAlign: 'center',
        textStyle: {
          fontSize: '14',
          color: 'rgba(0,0,0,0.65)',
          textAlign: 'center',
          fontWeight: 500,
        },
      },
    ],
    tooltip: {
      show: true,
      formatter: (val: any) => {
        return `${props.echartsLiquidfill.name} : ${toPercent(val.data)}%`;
      },
    },
    series: [
      {
        name: props.echartsLiquidfill.name,
        type: 'liquidFill',
        itemStyle: {
          shadowBlur: 0,
        },
        radius: '98%',
        data: props.echartsLiquidfill.data,
        color: props.echartsLiquidfill.color
          ? [props.echartsLiquidfill.color]
          : ['#0099FF'],
        outline: {
          borderDistance: 2,
          itemStyle: {
            color: 'white',
            borderColor: props.echartsLiquidfill.color
              ? props.echartsLiquidfill.color
              : '#0099FF',
            borderWidth: 2,
            shadowBlur: 0, // 去掉阴影
          },
        },
        backgroundStyle: {
          color: 'white',
        },
        label: {
          show: true,
          color: 'rgba(0,0,0,0.85)',
          fontSize: 18,
          fontWeight: '500',
          align: 'center',
          baseline: 'middle',
          position: 'inside',
        },
      }
    ]
  };
  if (props.echartsLiquidfill.customFunc && typeof props.echartsLiquidfill.customFunc === 'function') {
    props.echartsLiquidfill.customFunc(option);
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
