import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from './router'
import Auth from './auth'
import AlertComponent from './components/alert.vue'

// Plug in the plugins
Vue.use(VueResource)

// Define a root component to represent the app
var App = Vue.extend({
    data() {
        return {
            user: {
                authenticated: false,
                id: 0,
                username: 'guest'
            },
            alerts: []
        }
    },
    components: {
        'alert': AlertComponent
    },
    methods: {
        alert(type, message) {
            this.alerts.push({type: type, message: message})
        },
        logout() {
            Auth.logout(this)
        }
    },
    ready() {
        this.user = Auth.user
    }
})

// Start the app
Router.start(App, '#app')
