<template>
    <h2>Log in</h2>
    <alert v-if="errors.non_field_errors" type="error" persist="true">{{ errors.non_field_errors }}</alert>
    <div class="row">
        <div class="input-field col s12">
            <input id="username" type="text" v-model="credentials.username" @keyup.enter="submit()">
            <label for="username">Username</label>
            <span v-if="errors.username" class="yellow-text text-darken-4">{{ errors.username }}</span>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12">
            <input id="password" type="password" v-model="credentials.password" @keyup.enter="submit()">
            <label for="password" data-success="cheese">Password</label>
            <span v-if="errors.password" class="yellow-text text-darken-4">{{ errors.password }}</span>
        </div>
    </div>
    <div class="right-align">
        <button class="btn btn-large" @click="submit()">Log in</button>
    </div>
</template>

<script>
import Auth from '../../auth'
import AlertComponent from '../alert.vue'

module.exports = {
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            },
            errors: {
                non_field_errors: false,
                username: false,
                password: false
            }
        }
    },
    components: {
        'alert': AlertComponent
    },
    methods: {
        submit() {
            var credentials = {
                username: this.credentials.username,
                password: this.credentials.password
            }

            Auth.login(this, credentials, '/')
        }
    }
}
</script>
