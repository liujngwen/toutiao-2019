// 导出一个配置好的axios对象
import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'

import JSONBIG from 'json-bigint'

// 对axios进行配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置默认的请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 拦截成功 往header中加token
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  // 在发送请求之前做些什么
  return config
}, function (err) {
  // 对请求错误做些什么
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 对响应数据做点什么
  // 获取响应状态码
  // 如果是401 返回登录页
  if (err.response.status === 401) {
    return router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(err)
})

// axios.defaults.transformResponse = [(data) => {
//   return JSONBIG.parse(data)
// }]

axios.defaults.transformResponse = [(data) => {
  // 对data进行格式转换  data就是后台响应的json字符串
  // 如果没数据呢？data === null 使用JSONBIG.parse(null) 报错
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

export default axios
