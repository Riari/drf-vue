import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from './components/pages/home.vue'
import BarComponent from './components/pages/bar.vue'
import FooComponent from './components/pages/foo.vue'
import UserComponent from './components/pages/user.vue'
import LoginComponent from './components/pages/login.vue'
import Auth from './auth'

Vue.use(VueRouter)

// Create a router instance
var Router = new VueRouter({
    history: true,
    linkActiveClass: 'active'
})

// Define routes
Router.map({
    '/': {
        name: 'home',
        component: HomeComponent
    },
    '/bar': {
        name: 'bar',
        component: BarComponent,
        auth: true
    },
    '/foo': {
        name: 'foo',
        component: FooComponent
    },
    '/account/login': {
        name: 'account.login',
        component: LoginComponent,
        guest: true
    },
    '/user/:user_id': {
        name: 'user',
        component: UserComponent
    }
})

Router.beforeEach(function (transition) {
    if (transition.to.auth && !Auth.user.authenticated) {
        transition.redirect('/account/login')
    } else if (transition.to.guest && Auth.user.authenticated) {
        transition.redirect('/')
    } else {
        transition.next()
    }
})

module.exports = Router
