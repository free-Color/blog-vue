import router from ".";
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requireAuth) &&
        (sessionStorage.getItem('userInfo') == 'null' || sessionStorage.getItem('userInfo') == '')){
        next('/signin')
    }else{
        next()
    }
})
