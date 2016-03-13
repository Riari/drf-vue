<template>
    <div class="card alert {{ type }}" v-if="show">
        <div class="card-content">
            <content></content>
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
