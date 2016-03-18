import Vue from 'vue'
import Utils from './utils'

// URL and endpoint constants
const API_URL = 'http://127.0.0.1/api/'
const LOGIN_URL = API_URL + 'auth/token/'
const SIGNUP_URL = API_URL + 'account/signup'

var Auth = {
    user: {},

    login(context, creds, redirect) {
        context.$http.post(LOGIN_URL, creds, (data) => {
            localStorage.setItem('token', data.token)

            this.user.authenticated = true
            this.setUserDataFromToken(data.token)

            context.$root.alert('success', "Welcome back, " + this.user.username + "!")

            if (redirect) {
                context.$route.router.go(redirect)
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
                context.$route.router.go(redirect)
            }
        }).error((err) => {
            context.errors = err
        })
    },

    logout(context) {
        localStorage.removeItem('token')
        this.user.authenticated = false
        this.resetUserData()
        context.alert('success', "You've been logged out.")
    },

    check() {
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

Auth.check()

module.exports = Auth
