<template><i class="iconfont" :class="'icon-' + type"></i></template>
<style src="./font/iconfont.css"></style>
<script>
    export default {
        name: 'iconfont',
        props: ['type']
    }
</script>