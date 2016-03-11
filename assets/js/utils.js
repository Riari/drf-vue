module.exports = {
    jwt_decode: function(token) {
        return JSON.parse(window.atob(token.split('.')[1]))
    }
}
