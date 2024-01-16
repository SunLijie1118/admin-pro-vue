<template>
  <a-spin :spinning="loading">
    <div class="number-card">
      <div class="number-card-header">
        <div class="meta">
          <span class="number-card-title">
            <slot name="title">
              {{ title }}
            </slot>
          </span>
          <span class="number-card-action">
            <slot name="action"></slot>
          </span>
        </div>
        <div class="total">
          <slot name="total">
            <span>{{ (typeof total === 'function' && total() || total) }}</span>
          </slot>
        </div>
      </div>
      <div class="number-card-content">
        <div class="content-fix">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false,
  },
  total: {
    type: [Function, Number, String],
    required: false,
    default: null
  }
});
</script>
<style lang="less" scoped>
.number-card-header {
  position: relative;
  overflow: hidden;
  width: 100%;

  .meta {
    position: relative;
    overflow: hidden;
    width: 100%;
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    line-height: 22px;
  }

  .number-card-action {
    cursor: pointer;
    margin-left: 8px;
  }

  .total {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: #000;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 30px;
    line-height: 38px;
    height: 38px;
  }
}

.number-card-content {
  margin-bottom: 12px;
  height: 60px;
  width: 100%;

  .content-fix {
    width: 100%;
    height: 100%;
  }
}
</style>
