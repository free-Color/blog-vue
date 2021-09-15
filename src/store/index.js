import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

// eslint-disable-next-line no-irregular-whitespace
  state: {
// eslint-disable-next-line no-irregular-whitespace
    token: '',
    userInfo: {},
    isLogin: false
// eslint-disable-next-line no-irregular-whitespace
  },
// eslint-disable-next-line no-irregular-whitespace
  mutations: {
    status(state, user) {
        if(user){
            state.isLogin = true
            state.userInfo = user
            sessionStorage.setItem('userInfo', user)
        }else if(user == null){
            sessionStorage.setItem('userInfo', null)
            state.userInfo = null
            state.isLogin = false
        }
    },
    refresh(state, string) {
        state.userInfo = JSON.parse(string)
    },
    setUserInfo (state, userInfo)  {
        state.loginFlag = true
        state.userInfo = userInfo
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    removeInfo (state) {
        state.token = ''
        state.userInfo = {}
        localStorage.setItem("token", '')
        sessionStorage.setItem("userInfo", JSON.stringify(''))
    }
// eslint-disable-next-line no-irregular-whitespace
  },
  getters: {},
// eslint-disable-next-line no-irregular-whitespace
  actions: {},
// eslint-disable-next-line no-irregular-whitespace
  modules: {}
})
