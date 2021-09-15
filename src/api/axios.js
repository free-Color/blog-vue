
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://172.29.3.43:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use((config) => {
    if(config.method === 'post'){
        config.data = JSON.stringify(config.data)
    }
    return config
},(error) => {
    ElementUI.Message.error(error)
})

axios.interceptors.response.use((response) => {
    if(response.data.code == 200) return response
    else ElementUI.Message.error(response.data.msg)
},(error) => {
    ElementUI.Message(error)
})

export default axios
