<template>
  <Line :echartsLine="customLine" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Line from './Line.vue';
const props = defineProps({
  lineCustom: {
    type: Object,
    required: true
  }
});
const customLine = ref(props.lineCustom);
const setCustomParams = () => {
  customLine.value = {
    ...props.lineCustom,
    customFunc: (params: any) => {
      params.color = ['#0099FF'];
      params.series[0].lineStyle.width = 2;
      params.series[0].areaStyle.opacity = 0.2;
    }
  };
}
setCustomParams();
</script>
