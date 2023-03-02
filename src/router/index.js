import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/login',
            components:()=>import('@/views/login/loginPage')
        },
        // 重定向
        {
            path:'/',
            components:()=>import('@/views/login/loginPage'),
            redirect:'/login'

        }
    ]

})