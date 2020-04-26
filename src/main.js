// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
Vue.use(ElementUI);
// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)
    // Vue.http.options.root = 'http://101.200.157.252'
    // Vue.http.options.root = 'http://101.200.157.252'
    // vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state: {
        username: '',
        userimg: '',
        phone: '',
        email: ''
    },
    mutations: {
        modify(state, name) {
            state.username = name
        },
        modifyImg(state, imgurl) {
            state.userimg = imgurl
        },
        modifyPhone(state, phone) {
            state.phone = phone
        },
        modifyEmail(state, email) {
            state.userimg = email
        }
    },
    getters: {
        getName(state) {
            return state.username
        },
        getImg(state) {
            return state.userimg
        },
        getPhone(state) {
            return state.phone
        },
        getEmail(state) {
            return state.email
        },
    }
})

// const socket = io('/');
// socket.on('connect', () => {
//     console.log(socket.connected); // true
// });
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('/'), //地址/http://101.200.157.252
    path: ''
}))

Vue.config.productionTip = false

Vue.directive('scroll', {
    bind: function(el) {
        console.log("滚动条")
        el.scrollTop = el.scrollHeight
    },
    componentUpdated: function(el) {
        console.log(el.scrollHeight)
        console.log(el.scrollTop)
        el.scrollTop = el.scrollHeight
    }
})


// 定义一个全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MMM-DD HH:mm:ss") {
        return moment(dataStr).format(pattern)
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store,
})