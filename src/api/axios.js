
import axios from 'axios'
import ElementUI from 'element-ui'

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://172.29.3.44:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use((config) => {
    if(config.method === 'post' && config.headers.post['Content-Type'] == 'application/json;charset=UTF-8'){
        config.data = JSON.stringify(config.data)
    }
    return config
},(error) => {
    ElementUI.Message.error(error.message)
})

axios.interceptors.response.use((response) => {
    if(response.data.code == 200) return response
    else ElementUI.Message.error(response.data.msg)
},(error) => {
    if(error.message.includes('timeout')){
        ElementUI.Message.error('请求超时，请稍后重试')
    }else ElementUI.Message.error(error.message)
})

export default axios
