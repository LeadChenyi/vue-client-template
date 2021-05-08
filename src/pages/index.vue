<template>
    <div class="index-page">
        <div>首页</div>
        <!-- <div v-authorize="true">状态：已登录</div>
        <div v-authorize="false">状态：未登录</div> -->
        <textarea
            v-model="message"
            placeholder="请输入消息"
            cols="30"
            rows="10"
        ></textarea>
        <button @click="sendMessage">发送消息</button>
        <hr />
        <label>数据同步中：<input :value="getMessage" /></label>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    methods: {
        ...mapActions("app", ["setMessage"]),
        sendMessage() {
            if (!this.message) {
                console.log("请输入消息内容");
                return false;
            }
            this.setMessage(this.message);
        },
    },
    computed: {
        ...mapGetters("app", ["getMessage"]),
    },
};
</script>

<style>
</style>