import Axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const axios = Axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

// request interceptor
axios.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['Authorization'] = getToken()
    // }
    // if (config.method === 'post' || config.method === 'put') {
    //   // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    //   config.data = JSON.stringify(config.data)
    // }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default axios
