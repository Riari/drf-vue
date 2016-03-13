import Alert from './components/alert.vue'

module.exports = {
    jwt_decode: function(token) {
        return JSON.parse(window.atob(token.split('.')[1]))
    },

    show_alert: function(type, message, persist = false) {
        new Alert({type: type, message: message, persist: persist}).$mount().$appendTo('#app .alerts')
    }
}
