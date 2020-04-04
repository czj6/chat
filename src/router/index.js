import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chat from '../components/chat/chat.vue'
import User from '../components/user/user.vue'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'HelloWorld',
        //     component: HelloWorld
        // },
        {
            path: '/home',
            name: 'Chat',
            component: Chat
        },
        {
            path: '/user',
            name: 'User',
            component: User
        }

    ]
})