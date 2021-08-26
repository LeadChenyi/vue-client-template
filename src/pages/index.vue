<template>
    <div class="index-page">首页</div>
</template>

<script>
export default {
    name: "Index",
    data() {
        return {
            message: "",
        };
    },
    mounted() {
        this.$axios({
            method: "get",
            url: "/api/photos",
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        console.log(this.$code.calcMath(0.1 + 0.2, 2));
    },
};
</script>

<style>
</style>