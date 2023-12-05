<template>
  <Alert />
  <Avator :current-user="{ name: 'admin' }" />
  <SelectLang />
</template>

<script lang="ts" setup>
import Alert from '@/components/Header/Alert.vue';
import Avator from '@/components/Header/Avator.vue';
import SelectLang from '@/components/Header/SelectLang.vue';
</script>
