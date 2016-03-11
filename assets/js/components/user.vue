<template>
  <h1 class="red">{{msg}}</h1>
</template>

<script>
module.exports = {
    props: ['user'],
    template: '<p>{{ user.username }}</p>',
    created: function () {
        var self = this
        this.$http({ url: '/api/users/' + this.$route.params.user_id + '/', method: 'GET' }).then(function (response) {
            self.$data.user = response.data
        }, function (response) {
            alert('ohnoes :O')
        });
    }
}
</script>
