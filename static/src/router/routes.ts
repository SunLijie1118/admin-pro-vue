import BasicLayout from '@/layouts/BasicLayout.vue'
import RouteView from '@/layouts/RouteView.vue'
import {
  FieldTimeOutlined,
  HeartOutlined,
} from '@ant-design/icons-vue';
export const routes = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/workplace',
    children: [
      {
        path: '/workplace',
        name: 'workplace',
        meta: { title: '工作台', icon: FieldTimeOutlined },
        component: () => import('@/views/workplace/Workplace.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/welcome',
        component: RouteView,
        meta: { title: '仪表盘', icon: HeartOutlined },
        children: [
          {
            path: '/dashboard/welcome',
            name: 'welcome',
            meta: { title: '欢迎页', icon: FieldTimeOutlined },
            component: () => import('@/views/dashboard/Welcome.vue'),
          },
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: '分析页', icon: HeartOutlined },
            component: () => import('@/views/dashboard/Analysis.vue'),
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            meta: { title: '监控页', icon: HeartOutlined },
            component: () => import('@/views/dashboard/Monitor.vue'),
          },
        ]
      }
    ]
  }
];
