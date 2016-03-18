<template>
    <div class="card alert {{ type }}" v-if="show" transition="fade">
        <div class="card-content">
            <i class="fa fa-times" @click="show=false"></i>
            <slot></slot>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['type', 'persist'],
    data() {
        return {
            show: true
        }
    },
    ready() {
        if (!this.persist) {
            setTimeout(() => this.show = false, 4000)
        }
    }
}
</script>
