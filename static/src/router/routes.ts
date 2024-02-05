import BasicLayout from '@/layouts/BasicLayout.vue'
import RouteView from '@/layouts/RouteView.vue'
import {
  FieldTimeOutlined,
  HeartOutlined,
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LinkOutlined,
  AppstoreAddOutlined,
  ApartmentOutlined
} from '@ant-design/icons-vue'
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
        component: () => import('@/views/workplace/Workplace.vue')
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
            component: () => import('@/views/dashboard/Welcome.vue')
          },
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: '分析页', icon: HeartOutlined },
            component: () => import('@/views/dashboard/Analysis.vue')
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            meta: { title: '监控页', icon: HeartOutlined },
            component: () => import('@/views/dashboard/Monitor.vue')
          }
        ]
      },
      {
        path: '/form',
        name: 'form',
        redirect: '/form/basic-form',
        component: RouteView,
        meta: { title: '表单页', icon: FormOutlined },
        children: [
          {
            path: '/form/basic-form',
            name: 'basic-form',
            meta: { title: '基础表单' },
            component: () => import('@/views/form/BasicForm.vue')
          },
          {
            path: '/form/step-form',
            name: 'step-form',
            meta: { title: '分步表单' },
            component: () => import('@/views/form/StepForm.vue')
          },
          {
            path: '/form/advanced-form',
            name: 'advanced-form',
            meta: { title: '高级表单' },
            component: () => import('@/views/form/AdvancedForm.vue')
          }
        ]
      },
      {
        path: '/list',
        name: 'list',
        redirect: '/list/table-list',
        component: RouteView,
        meta: { title: '列表页', icon: TableOutlined },
        children: [
          {
            path: '/list/table-list',
            name: 'table-list',
            meta: { title: '查询表格' },
            component: () => import('@/views/form/BasicForm.vue')
          },
          {
            path: '/list/basic-list',
            name: 'basic-list',
            meta: { title: '标准列表' },
            component: () => import('@/views/form/StepForm.vue')
          },
          {
            path: '/list/card-list',
            name: 'card-list',
            meta: { title: '卡片列表' },
            component: () => import('@/views/form/AdvancedForm.vue')
          }
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        redirect: '/profile/basic',
        component: RouteView,
        meta: { title: '详情页', icon: ProfileOutlined },
        children: [
          {
            path: '/profile/basic',
            name: 'profile-basic',
            meta: { title: '基础详情页' },
            component: () => import('@/views/form/BasicForm.vue')
          },
          {
            path: '/profile/advanced',
            name: 'profile-advanced',
            meta: { title: '高级详情页' },
            component: () => import('@/views/form/StepForm.vue')
          }
        ]
      },
      {
        path: '/exception',
        name: 'exception',
        redirect: '/exception/403',
        component: RouteView,
        meta: { title: '异常页', icon: WarningOutlined },
        children: [
          {
            path: '/exception/403',
            name: '403',
            meta: { title: '403' },
            component: () => import('@/views/form/BasicForm.vue')
          },
          {
            path: '/exception/404',
            name: '404',
            meta: { title: '404' },
            component: () => import('@/views/form/StepForm.vue')
          },
          {
            path: '/exception/500',
            name: '500',
            meta: { title: '500' },
            component: () => import('@/views/form/StepForm.vue')
          }
        ]
      },
      {
        path: '/result',
        name: 'result',
        redirect: '/result/success',
        component: RouteView,
        meta: { title: '结果页', icon: CheckCircleOutlined },
        children: [
          {
            path: '/result/success',
            name: 'result-success',
            meta: { title: '成功页' },
            component: () => import('@/views/form/StepForm.vue')
          },
          {
            path: '/result/fail',
            name: 'result-fail',
            meta: { title: '失败页' },
            component: () => import('@/views/form/BasicForm.vue')
          }
        ]
      },
      {
        path: '/account',
        name: 'account',
        redirect: '/account/center',
        component: RouteView,
        meta: { title: '个人页', icon: UserOutlined },
        children: [
          {
            path: '/account/center',
            name: 'account-center',
            meta: { title: '个人中心' },
            component: () => import('@/views/form/StepForm.vue')
          },
          {
            path: '/account/settings',
            name: 'account-settings',
            meta: { title: '个人设置' },
            component: () => import('@/views/form/BasicForm.vue')
          }
        ]
      },
      {
        path: '/system',
        name: 'system',
        redirect: '/system/role-list',
        component: RouteView,
        meta: { title: '系统管理', icon: SettingOutlined },
        children: [
          {
            path: '/system/role-list',
            name: 'role-list',
            meta: { title: '角色管理' },
            component: () => import('@/views/form/StepForm.vue')
          },
          {
            path: '/system/permission-list',
            name: 'permission-list',
            meta: { title: '权限管理' },
            component: () => import('@/views/form/BasicForm.vue')
          }
        ]
      },
      {
        path: '/jump-url',
        name: 'jump-url',
        redirect: '/jump-url/router',
        component: RouteView,
        meta: { title: '跳转', icon: LinkOutlined },
        children: [
          {
            path: '/jump-url/router',
            name: 'jump-router',
            meta: { title: '路由' },
            component: () => import('@/views/form/StepForm.vue')
          },
          {
            path: '/jump-url/outer',
            name: 'jump-outer',
            meta: { title: '外链 Github' },
            component: () => import('@/views/form/BasicForm.vue')
          }
        ]
      },
      {
        path: '/examples',
        name: 'examples',
        redirect: '/examples/button',
        component: RouteView,
        meta: { title: '组件展示', icon: AppstoreAddOutlined },
        children: [
          {
            path: '/examples/button',
            name: 'examples-button',
            meta: { title: '按钮' },
            component: () => import('@/views/form/StepForm.vue')
          },
          {
            path: '/examples/input',
            name: 'examples-input',
            meta: { title: '输入框' },
            component: () => import('@/views/form/BasicForm.vue')
          },
          {
            path: '/examples/rate',
            name: 'examples-rate',
            meta: { title: '评分' },
            component: () => import('@/views/form/BasicForm.vue')
          },
          {
            path: '/examples/permission',
            name: 'examples-permission',
            meta: { title: '权限' },
            component: () => import('@/views/form/BasicForm.vue')
          }
        ]
      },
      {
        path: '/nested',
        name: 'nested',
        redirect: '/nested/menu1/menu1-1',
        component: RouteView,
        meta: { title: '路由嵌套', icon: ApartmentOutlined },
        children: [
          {
            path: '/nested/menu1',
            name: 'nested-menu1',
            meta: { title: 'Menu1' },
            component: RouteView,
            redirect: '/nested/menu1/menu1-1',
            children: [
              {
                path: '/nested/menu1/menu1-1',
                name: 'nested-menu1-menu1-1',
                meta: { title: 'Menu1-1' },
                component: () => import('@/views/form/StepForm.vue')
              },
              {
                path: '/nested/menu1/menu1-2',
                name: 'nested-menu1-menu1-2',
                meta: { title: 'Menu1-2' },
                component: RouteView,
                redirect: '/nested/menu1/menu1-2/menu1-2-1',
                children: [
                  {
                    path: '/nested/menu1/menu1-2/menu1-2-1',
                    name: 'nested-menu1-menu1-2-menu1-2-1',
                    meta: { title: 'Menu1-2-1' },
                    component: () => import('@/views/form/StepForm.vue')
                  }
                ]
              }
            ]
          },
          {
            path: '/nested/menu2',
            name: 'nested-menu2',
            meta: { title: 'Menu2' },
            component: () => import('@/views/form/BasicForm.vue')
          },
          {
            path: '/nested/menu3',
            name: 'nested-menu3',
            meta: { title: 'Menu3' },
            component: RouteView,
            redirect: '/nested/menu3/menu3-1',
            children: [
              {
                path: '/nested/menu3/menu3-1',
                name: 'nested-menu3-menu3-1',
                meta: { title: 'Menu3-1' },
                component: () => import('@/views/form/StepForm.vue')
              }
            ]
          }
        ]
      }
    ]
  }
]
