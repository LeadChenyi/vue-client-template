<template>
    <div class="index-page">首页</div>
</template>

<script>
export default {
    name: "Index",
    mounted() {
        console.log(this.$utils.isMobileOrMiniClient());
    },
};
</script>

<style>
</style>