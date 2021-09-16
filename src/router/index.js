import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/sign/signin')
    }, {
      path: '/test',
      name: 'test',
      component: () => import('@/components/test')
    }, {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/sign/signup')
    },

    {
      path: '/admin',
      component: () => import('@/views/admin'),
      beforeEnter: (to, from, next) => {
        next()
        // if(JSON.parse(sessionStorage.getItem('userInfo')).roleId=='1')next()
        // else next('/main')
      },
      children: [{
        path: '/admin/log',
        name: 'log',
        component: () => import('@/views/admin/table/log')
      },{
        path: '/admin/user',
        component: () => import('@/views/admin/table/user')
      },{
        path: '/admin/blog',
        component: () => import('@/views/admin/table/blog')
      },{
        path: '/admin/echarts',
        component: () => import('@/views/admin/charts/echarts')
      },{
        path: '/admin/map',
        component: () => import('@/views/admin/charts/china')
      },{
        path: '/admin/analyse',
        component: () => import('@/views/admin/charts/analyse')
      },{
        path: '/admin/china',
        component: () => import('@/views/admin/charts/china')
      },{
        path: '/admin/tag',
        component: () => import('@/views/admin/table/tag')
      }]
    },

    {
      path: '/logout',
      beforeEnter: (to, from, next) => {
        sessionStorage.setItem('userInfo', '')
        sessionStorage.setItem('userId', '')
        ElementUI.Message('已注销')
        next('/signin')
      }
    },

    {
      path: '/',
      name: 'index',
      component: () => import('@/views/main/index'),
      redirect: '/main',
      children: [{
        path: '/blog/:blogId',
        name: 'blog',
        component: () => import('@/views/main/blog')
      }, {
        path: '/main',
        component: () => import('@/views/main/main')
      }, {
        path: '/search',
        component: () => import('@/views/main/search')
      }, {
        path: '/editor',
        name: 'editor',
        component: () => import('@/views/main/editor'),
        meta: {requireAuth: true}
      }]
    },

    {
      path: '/sittings',
      name: 'sittings',
      component: () => import('@/views/sittings'),
      meta: { requireAuth: true },
      redirect: '/sittings/accout',
      children: [{
        path: '/sittings/accout',
        name: 'account',
        component: () => import('@/views/sittings/accout')
      }, {
        path: '/sittings/block',
        name: '博客详情',
        component: () => import('@/views/sittings/block')
      }, {
        path: '/sittings/user',
        name: '欢迎组件',
        component: () => import('@/views/sittings/user')
      },{
        path: '/sittings/concern',
        component: () => import('@/views/sittings/concern')
      }, {
        path: '/sittings/blog',
        component: () => import('@/views/sittings/blog')
      }]
    },

    {
      path: '/user',
      component: () => import('@/views/user'),
      children: [{
        path: '/user/blog',
        component: () => import('@/views/user/blog')
      },{
        path: '/user/concern',
        component: () => import('@/views/user/concern')
      },{
        path: '/user/tag',
        component: () => import('@/views/user/tag')
      },{
        path: '/user/collection',
        component: () => import('@/views/user/collection')
      }]
    },

    // {
    //   path: '*',
    //   redirect: '/404'
    // },
    // {
    //   path: '/404',
    //   component: () => import('@/views/error-page/404')
    // }
  ]
})
