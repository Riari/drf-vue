import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from './routes'
import Auth from './auth'

// Plug in the plugins
Vue.use(VueRouter)
Vue.use(VueResource)

// Define a root component to represent the app
var App = Vue.extend({
    data: function () {
        return {
            user: Auth.user,
            alerts: []
        }
    },
    methods: {
        logout: function () {
            Auth.logout()
            this.alerts.push({ type: 'success', message: "You've been logged out." })
            //Materialize.toast("You've been logged out.", 4000)
        }
    }
})

// Create a router instance
var router = new VueRouter({
    linkActiveClass: 'active'
})

// Define routes
router.map(Routes)

router.afterEach(function (transition) {
    console.log(App)
})

// Start the app
router.start(App, '#app')
