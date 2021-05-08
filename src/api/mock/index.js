import Mock from 'mockjs'
import BaseURL from '../baseURL'

Mock.setup({
    timeout: '1000-1500'
})

Mock.mock(`${BaseURL.v1}/index/projects`, {
    "statusCode": 200,
    "statusText": "request:ok",
    "data": [
        {
            title: "Forum - 活力贴",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-1drkl6bpt7rp8b95ea/1b6c5800-643d-11eb-8d54-21c4ca4ce5d7.png",
        },
        {
            title: "AliveUI - 活力组件库",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-1drkl6bpt7rp8b95ea/1a855360-643d-11eb-8d54-21c4ca4ce5d7.png",
        },
        {
            title: "Mall - 活力商城",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-1drkl6bpt7rp8b95ea/1c1b5cb0-643d-11eb-b680-7980c8a877b8.png",
        },
        {
            title: "Video - 活力短视频",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-1drkl6bpt7rp8b95ea/19cadd00-643d-11eb-b997-9918a5dda011.png",
        }
    ]
});