
import Vue from 'vue'
import App from './App'


import '@/assets/css/main.css'
import '@/assets/font/iconfont.css'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'

import moment from 'moment'
import router from './router'
import axios from '@/api/axios'
import ElementUI from 'element-ui'
import * as echarts from "echarts";

import mavonEditor from 'mavon-editor'

import '@/router/permission'

let Markdown = require('markdown-it')

Vue.prototype.$axios = axios
Vue.prototype.$markdown = new Markdown()
Vue.prototype.$echarts = echarts
Vue.prototype.$image = axios.defaults.baseURL + '/static/userImage/uploadPictureFile/'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.filter('dateFormat', function (dateStr,pattern = "YYYY-MM-DD HH:mm") {
  return moment(dateStr).format(pattern);
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
