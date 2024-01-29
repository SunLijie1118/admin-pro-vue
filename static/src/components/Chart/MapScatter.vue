<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import axios from "axios";
import { echartsMapService } from './map';
import * as echarts from 'echarts';

const props = defineProps({
  echartsMap: {
    type: Object,
    required: true
  }
});

const container = ref(null);
let chart: any = null;
const resizeNamespace = '' + Date.now();

const mapService = new echartsMapService();
const mapOption = mapService.mapOption;

watch(props.echartsMap, () => {
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
  const mapType = props.echartsMap.mapType;
  // 如果地图已经注册，则不再加载
  if (props.echartsMap.customFunc && typeof props.echartsMap.customFunc === 'function') {
    props.echartsMap.customFunc(mapOption);
  }
  if (mapType !== '中国') {
    mapOption.geo[0].map = mapOption.geo[1].map = mapType;
    mapOption.geo[0].zoom = mapOption.geo[1].zoom = 1;
    delete mapOption.geo[0].center;
    delete mapOption.geo[1].center;
    mapOption.series[0].map = mapOption.series[1].map = mapType;
  }
  if (mapType === '世界') {
    mapOption.geo[1].label.show = false;
  } else if (mapType === '中国') {
    mapOption.geo[0].layoutCenter = ['50%', '45%'];
    mapOption.geo[1].layoutCenter = ['50%', '45%'];
    mapOption.geo[0].layoutSize = '100%';
    mapOption.geo[1].layoutSize = '100%';
    mapOption.geo[0].zoom = 1.2;
    mapOption.geo[1].zoom = 1.2;
  }
  mapOption.series.map((item: any) => {
    item.data = [];
  });
  props.echartsMap.data.forEach((item: any) => {
    let coords = [0, 0];
    if (mapService.mapCoords[item.name]) {
      coords = mapService.mapCoords[item.name];
    } else if (mapService.provinceAlias[item.name]) {
      coords = mapService.mapCoords[mapService.provinceAlias[item.name]];
    }
    let symbolSize = 15;
    let color = 'rgba(186,231,255,0.35)';
    let borderColor = 'rgba(186,231,255,1)';
    if (item.value <= 100) {
      symbolSize = 30;
      color = 'rgba(0,80,179,0.35)';
      borderColor = 'rgba(0,80,179,1)';
    } else if (item.value > 100 && item.value <= 500) {
      symbolSize = 25;
      color = 'rgba(24,144,255,0.35)';
      borderColor = 'rgba(24,144,255,1)';
    } else if (item.value > 500 && item.value <= 1000) {
      symbolSize = 20;
      color = 'rgba(105,192,255,0.35)';
      borderColor = 'rgba(105,192,255,1)';
    } else {
      symbolSize = 15;
      color = 'rgba(186,231,255,0.35)';
      borderColor = 'rgba(186,231,255,1)';
    }
    mapOption.series[6].data.push({
      name: item.name,
      value: [...coords, item.value],
      count: item.value,
      symbolSize: symbolSize,
      itemStyle: {
        color: color,
        borderWidth: 1,
        borderColor: borderColor,
      }
    });
  });
  mapOption.visualMap.pieces = [
    { gt: 1000, label: '大于1000元', color: '#BAE7FF' }, // 不指定 max，表示 max 为无限大（Infinity）。
    { gt: 500, lte: 1000, label: '501~1000元', color: '#69C0FF' },
    { gt: 100, lte: 500, label: '101~500元', color: '#1890FF' },
    { lte: 100, label: '小于100元', color: '#0050B3' }     // 不指定 min，表示 min 为无限大（-Infinity）。
  ];
  mapOption.visualMap.textStyle.color = 'rgba(0,0,0,0.85)';
  mapOption.visualMap.itemSymbol = 'rect';
  mapOption.visualMap.orient = 'horizontal';
  mapOption.visualMap.left = 'center';
  mapOption.visualMap.bottom = 0;
  mapOption.visualMap.itemGap = 100;
  registerMap(mapType, () => {
    chart.setOption(mapOption, false);
  });
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

const registerMap = (mapName: string, callback: () => void) => {
  const geoMapType = mapName === '中国' ? 'china' : mapName;
  mapOption.geo[0].map = mapOption.geo[1].map = geoMapType;
  if (echarts.getMap(geoMapType)) {
    callback();
  } else {
    if (mapName === '中国') {
      Promise.all([
        axios.get('/map/china.json'),
        axios.get('/map/china-outline.json'),
      ]).then((data: any[]) => {
        const map = data[0].data;
        const mapOutline = data[1].data;
        echarts.registerMap('chinaOutline', mapOutline);
        echarts.registerMap(geoMapType, map);
        callback();
      })
    } else {
      axios.get(`/map/${mapService.mapType[mapName]}`).then((map: any) => {
        echarts.registerMap(geoMapType, map.data);
        callback();
      });
    }
  }
}

</script>
<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
