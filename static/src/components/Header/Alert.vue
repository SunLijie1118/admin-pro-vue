<template>
  <a-popover placement="bottomRight" trigger="click" overlayClassName="header-icon">
    <div class="alert flex align-middle">
      <a-badge :count="count">
        <BellOutlined />
      </a-badge>
    </div>
    <template #content>
      <a-tabs centered style="width: 336px;">
        <a-tab-pane key="notification" tab="Notification">
          <a-spin :spinning="spinning">
            <div class="container" v-if="notification.length">
              <div v-for="data in notification" :key="data.id" class="item" :class="{ read: data.read }"
                @click.prevent="handleItem(data)">
                <div class="item-img">
                  <img :src="data.avatar" alt="" width="30">
                </div>
                <div>
                  <h4 class="">{{ data.title }}</h4>
                  <div>{{ $dateToToday(data.datetime) }}</div>
                </div>
              </div>
            </div>
            <div class="bottomBar" v-if="notification.length">
              <span @click="emptyNoti">Empty Notification</span>
              <span>See more</span>
            </div>
            <a-empty v-if="!notification.length" :description="'You have viewed all notifications'"
              :image="'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'" class="py-10" />
          </a-spin>
        </a-tab-pane>
        <a-tab-pane key="message" tab="Message">
          <a-spin :spinning="spinning">
            <div class="container" v-if="message.length">
              <div v-for="data in message" :key="data.id" class="item" :class="{ read: data.read }"
                @click.prevent="handleItem(data)">
                <div class="item-img">
                  <img :src="data.avatar" alt="" width="30">
                </div>
                <div>
                  <h4 class="">{{ data.title }}</h4>
                  <div>{{ data.description }}</div>
                  <div>{{ $dateToToday(data.datetime) }}</div>
                </div>
              </div>
            </div>
            <div class="bottomBar" v-if="notification.length">
              <span>Empty Message</span>
              <span>See more</span>
            </div>
            <a-empty v-if="!message.length" :description="'You have read all messages'"
              :image="'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'" class="py-10" />
          </a-spin>
        </a-tab-pane>
        <a-tab-pane key="todo" tab="To do">
          <a-spin :spinning="spinning">
            <div class="container" v-if="todo.length">
              <div v-for="data in todo" :key="data.id" class="item" :class="{ read: data.read }"
                @click.prevent="handleItem(data)">
                <div>
                  <h4 class="">{{ data.title }}</h4>
                  <a-tag :color="todoStatusMap[data.status] || 'default'">{{ data.extra }}</a-tag>
                </div>
                <div>{{ data.description }}</div>
              </div>
            </div>
            <div class="bottomBar" v-if="notification.length">
              <span>Empty To do</span>
            </div>
            <a-empty v-if="!todo.length" :description="'You have completed all to-dos'"
              :image="'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'" class="py-10" />
          </a-spin>
        </a-tab-pane>
      </a-tabs>
    </template>
  </a-popover>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  BellOutlined
} from '@ant-design/icons-vue';
import { getNotices } from '@/api/message';
import { type Params } from '@/types/index';
import { todoStatusMap } from '@/config/index';

const count = ref<number>(0);
const spinning = ref<boolean>(false);
const notification = ref<Params[]>([]);
const message = ref<Params[]>([]);
const todo = ref<Params[]>([]);

const getNoticesData = () => {
  spinning.value = true;
  getNotices().then(resp => {
    spinning.value = false;
    const data = resp.data.default;
    const notices = data.filter((item: any) => { return !item.read; });
    count.value = notices.length || 0;
    notification.value = data.filter((item: any) => { return item.type === 'notification'; });
    message.value = data.filter((item: any) => { return item.type === 'message'; });
    todo.value = data.filter((item: any) => { return item.type === 'event'; });
  })
};

const handleItem = (data: any) => {
  if (data.read) {
    return;
  }
  count.value = count.value - 1;
  data.read = true;
}

const emptyNoti = () => {
  const temp = notification.value.filter((item: any) => { return !item.read; });
  count.value = count.value - temp.length || 0;
  notification.value = [];
}

onMounted(() => {
  getNoticesData()
});
</script>

<style lang="less" scoped>
.alert {
  padding: 0 12px;
  display: inline-block;
  cursor: pointer;

  .anticon-bell {
    font-size: 16px;
    padding: 4px;
  }
}

.alert:hover {
  background-color: rgba(0, 0, 0, 0.025);
}

.container {
  @apply max-h-96 overflow-auto;

  .item {
    @apply flex px-6 py-3 cursor-pointer;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);

    &:last-child {
      border-bottom: 0;
    }

    .item-img {
      @apply mr-4;
    }
  }

  .read {
    opacity: 0.4;
  }
}

.bottomBar {
  border-top: 1px solid rgba(5, 5, 5, 0.06);
  @apply flex cursor-pointer;

  span {
    flex: 1;
    line-height: 48px;
    @apply text-center;
  }

  :not(:only-child):last-child {
    border-left: 1px solid rgba(5, 5, 5, 0.06);
  }
}
</style>
@/core/types/index
@/types/index
