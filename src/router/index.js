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
      redirect: '/admin/analyse',
      beforeEnter: (to, from, next) => {
        var val = sessionStorage.getItem('userInfo')
        if(val != undefined && JSON.stringify(val).roleId == '1' )next()
        else next('/main')
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
        path: '/user/:userId',
        component: () => import('@/views/main/user')
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
      redirect: '/sittings/analyse',
      children: [{
        path: '/sittings/account',
        component: () => import('@/views/sittings/account')
      }, {
        path: '/sittings/block',
        component: () => import('@/views/sittings/block')
      }, {
        path: '/sittings/user',
        component: () => import('@/views/sittings/user')
      },{
        path: '/sittings/concern',
        component: () => import('@/views/sittings/concern')
      }, {
        path: '/sittings/collect',
        component: () => import('@/views/sittings/collection')
      }, {
        path: '/sittings/analyse',
        component: () => import('@/views/sittings/analyse')
      }, {
        path: '/sittings/blog',
        component: () => import('@/views/sittings/blog')
      }]
    },
    {
      path: '*',
      redirect: '/main'
    }
  ]
})
