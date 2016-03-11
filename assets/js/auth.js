import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import Utils from './utils'
Vue.use(VueRouter)

var router = new VueRouter()
router.map(Routes)

// URL and endpoint constants
const API_URL = 'http://127.0.0.1/api/'
const LOGIN_URL = API_URL + 'auth/token/'
const SIGNUP_URL = API_URL + 'account/signup'

export default {
    user: {
        authenticated: false,
        id: 0,
        username: 'guest'
    },

    login(context, creds, redirect) {
        context.$http.post(LOGIN_URL, creds, (data) => {
            localStorage.setItem('token', data.token)

            this.user.authenticated = true
            this.setUserDataFromToken(data.token)

            // Redirect to a specified route
            if (redirect) {
                router.go(redirect)
            }
        }).error((err) => {
            context.errors = err
        })
    },

    signup(context, creds, redirect) {
        context.$http.post(SIGNUP_URL, creds, (data) => {
            localStorage.setItem('token', data.token)

            this.user.authenticated = true
            this.setUserDataFromToken(data.token)

            if (redirect) {
                router.go(redirect)
            }
        }).error((err) => {
            context.errors = err
        })
    },

    logout() {
        localStorage.removeItem('token')
        this.user.authenticated = false
        this.resetUserData()
    },

    checkAuth() {
        var jwt = localStorage.getItem('token')
        if (jwt) {
            this.user.authenticated = true
            this.setUserDataFromToken(jwt)
        } else {
            this.user.authenticated = false
            this.resetUserData()
        }
    },

    setUserDataFromToken(token) {
        var data = Utils.jwt_decode(token)
        this.user.id = data.user_id
        this.user.username = data.username
    },

    resetUserData() {
        this.user.id = 0
        this.user.username = 'guest'
    },

    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}
