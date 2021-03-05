import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  /*
  * store/index.js中的内容对应 Login.vue 中的
    _this.$store.commit("SET_TOKEN",jwt)
    _this.$store.commit("SET_USERINFO",userInfo)
  *
  * */

  // state：放置全局属性，私有
  state: {

      token: '',
      userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
    },

  // mutations：设置 state 中私有变量的 set 方法
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userInfo",JSON.stringify(''))
    }
  },

  // getters：获取 state 中私有变量的 get 方法
  getters: {
    getUser:state => {
      return state.userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
