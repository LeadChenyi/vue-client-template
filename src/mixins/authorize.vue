<script>
export default {
    mounted() {
        console.log("run mixins authorize!");
        this.authorize();
    },
    methods: {
        authorize() {
            const token = localStorage.getItem("token") ? true : false;
            if (token) {
                console.log("已登录");
            } else {
                console.log("未登录");
            }
        },
    },
};
</script>
