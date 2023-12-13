<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Chart } from "@antv/g2";

const props = defineProps({
  data: {
    type: Array<{ name: string; label: string; value: any }>,
    required: true
  }
});

const container = ref(null);

onMounted(() => {
  renderBarChart(container.value);
});

const renderBarChart = (container: any) => {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 400
  });
  const position: string[] = [];
  props.data.forEach(item => {
    if (position.indexOf(item.label) === -1) {
      position.push(item.label);
    }
  });
  console.log(position);

  const axis = {
    zIndex: 1,
    labelStroke: '#fff',
    labelStrokeWidth: 5,
    labelFontSize: 10,
    labelStrokeLineJoin: 'round',
    titleStroke: '#fff',
    titleFontSize: 10,
    titleStrokeWidth: 5,
    titleStrokeLineJoin: 'round',
    lineStroke: 'black',
    tickStroke: 'black',
    lineStrokeWidth: 1,
  };

  // chart.coordinate({ type: 'polar' });

  // chart
  //   .data(props.data)
  //   .scale('x', { padding: 0.5, align: 0 })
  //   .scale('y', { tickCount: 5 })
  //   .axis('x', { title: false })
  //   .axis('y', { zIndex: 1, title: false });

  // chart
  //   .line()
  //   .encode('x', 'label')
  //   .encode('y', 'value')
  //   .encode('color', 'name')
  //   .style('lineWidth', 2)
  //   .legend(false);

  // chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });
  chart.coordinate({ type: 'radar' });

  chart
    .line()
    .data(props.data)
    .encode('position', ['引用', '口碑', '产量', '贡献', '热度'])
    .encode('color', 'weight (lb)')
    .style('strokeWidth', 1.5)
    .style('strokeOpacity', 0.4)
    .scale('color', {
      palette: 'brBG',
      offset: (t) => 1 - t,
    })
    .legend(false)
  // .axis('position', axis)
  // .axis('position1', axis)
  // .axis('position2', axis)
  // .axis('position3', axis)
  // .axis('position4', axis)
  // .axis('position5', axis)
  // .axis('position6', axis)
  // .axis('position7', axis);

  chart.interaction('tooltip', { series: false });

  // 渲染可视化
  chart.render();

  return chart;
}

</script>
