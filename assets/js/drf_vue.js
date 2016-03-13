import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from './routes'
import Auth from './auth'
import AlertComponent from './components/alert.vue'

// Plug in the plugins
Vue.use(VueRouter)
Vue.use(VueResource)

// Define a root component to represent the app
var App = Vue.extend({
    data: function () {
        return {
            user: Auth.user,
            alert: null
        }
    },
    components: {
        'alert': AlertComponent
    },
    methods: {
        logout: function () {
            Auth.logout()
            this.alert = {type: 'success', message: "You've been logged out."}
        }
    }
})

// Create a router instance
var router = new VueRouter({
    linkActiveClass: 'active'
})

// Define routes
router.map(Routes)

// Start the app
router.start(App, '#app')
