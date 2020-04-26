import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chat from '../components/chat/chat.vue'
import User from '../components/user/user.vue'
import Edit from '../components/edit/edit.vue'
import ChatDefault from '../components/chat/chat_default.vue'

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
            name: 'ChatDefault',
            component: ChatDefault
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '/edit',
            name: 'Edit',
            component: Edit
        },
        {
            path: '/home/:roomname',
            name: 'roomname',
            component: Chat
        }

    ]
})
