module.exports = {
    devServer: {
        proxy: {
            '/api': {          // 以/api开头的请求执行服务器代理
                target: 'http://jsonplaceholder.typicode.com',
                ws: true,      // 支持 webScokit
                changeOrigin: true,
                secure: false,
                pathRewrite: {  // 不保留/api这个路径
                    "^/api": "/"
                }
            }
        }
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import '@/assets/css/variables.scss';`
            }
        }
    }
}