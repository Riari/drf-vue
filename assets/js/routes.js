import BarComponent from './components/bar.vue'
import FooComponent from './components/foo.vue'
import UserComponent from './components/user.vue'
import LoginComponent from './components/login.vue'

module.exports = {
    '/bar': {
        name: 'bar',
        component: BarComponent
    },
    '/foo': {
        name: 'foo',
        component: FooComponent
    },
    '/account/login': {
        name: 'account.login',
        component: LoginComponent
    },
    '/user/:user_id': {
        name: 'user',
        component: UserComponent
    }
}
