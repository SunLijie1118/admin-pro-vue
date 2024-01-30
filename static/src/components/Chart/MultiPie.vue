<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  echartsMultiPie: {
    type: Object,
    required: true
  }
});

const container = ref(null);
let chart: any = null;
const resizeNamespace = '' + Date.now();

watch(props.echartsMultiPie, () => {
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
  const option: any = {
    series: []
  };
  const colors: string[] = ['#58AFFF', '#5DDECF', '#33D564'];
  props.echartsMultiPie.series.forEach((item: any, index: number) => {
    const serie = {
      name: item.name,
      type: 'pie',
      center: item.center || [15 + (100 / props.echartsMultiPie.series.length * index) + '%', '50%'],
      radius: ['70%', '90%'],
      hoverAnimation: false,
      itemStyle: {
        color: colors[index % 3],
        shadowColor: colors[index % 3],
        shadowBlur: 0,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
      },
      data: [{
        value: item.value,
        label: {
          formatter: function (params: any) {
            return params.value + '%';
          },
          position: 'center',
          show: true,
          textStyle: {
            fontSize: 20,
          }
        },
      }, {
        value: 100 - item.value,
        name: '',
        itemStyle: {
          color: '#F4F6F8'
        }
      }]
    };
    option.series.push(serie);
  });
  if (props.echartsMultiPie.customFunc && typeof props.echartsMultiPie.customFunc === 'function') {
    props.echartsMultiPie.customFunc(option);
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
