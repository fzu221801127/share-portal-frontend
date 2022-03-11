import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/Detail',
    name: 'Detail',
    component: () => import('@/views/post/Detail.vue')
  },

  {
    path: '/',
    component: Layout,
    redirect: '/shearch',
    children: [{
      path: 'shearch',
      name: 'Shearch',
      component: () => import('@/views/shearch/index'),
      meta: { title: '搜索资源', icon: 'dashboard' }
    }]
  },

  {
    path: '/hot',
    component: Layout,
    redirect: '/hot/menu1',
    name: 'Hot',
    meta: {
      title: '热榜',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/hot/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '热门资源' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/hot/menu2/index'),
        name: 'Menu2',
        meta: { title: '热门搜索' }
      }
    ]
  },

  {
    path: '/create',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Create',
        component: () => import('@/views/post/UserCreatePost'),
        meta: { title: '发布资源', icon: 'form' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/center',
    name: 'User',
    meta: { title: '个人中心', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'center',
        name: 'Center',
        component: () => import('@/views/user/center/index'),
        meta: { title: '个人中心', icon: 'table' }
      },
      {
        path: 'collection',
        name: 'Collection',
        component: () => import('@/views/user/collection/index'),
        meta: { title: '我的收藏', icon: 'tree' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        // path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        path: 'https://github.com/fzu221801127/share-portal-frontend',
        meta: { title: '参与建设', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
