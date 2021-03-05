import axios from "axios"
import Element from "element-ui"
import store from './store'
import router from './router'

// 引入axios.js需要在main.js中import "./axios"
axios.defaults.baseURL = "http://localhost:5000"

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
        let res = response.data;
        console.log(res)

        // 状态码 200 时，表示没有问题，直接return即可（不做任何操作）
        if (res.code === 200) {
            return response

        }
        // 状态码不为 200 时，表示出现问题，则通过弹窗提示错误

        else {

            // 弹窗本来是通过this.$message.error(response.data.msg, {duration: 2 * 1000})
            // 但是这里是js，所以通过 import Element from "element-ui"来使用
            Element.Message.error(response.data.msg, {duration: 2 * 1000})

            // 异常提示之后，组织前端进入别的页面
            return Promise.reject(response.data.msg)
        }

    }
    ,
    // 产生报错后，即error发生后，执行下面的操作

    error => {
        console.log(error)
        if (error.response.status === 400) {
            store.commit("REMOVE_INFO")
            router.push("/")
        }
        Element.Message.error(error.response.data.msg, {duration: 2 * 1000})
        return Promise.reject(error)
    })