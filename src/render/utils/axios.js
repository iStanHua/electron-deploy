import axios from 'axios'
import store from '@/vuex/store'
import router from '@/router'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    let _token = store.getters.userInfo.token
    if (_token) {
      config.headers.common['authorization'] = _token
    }
    config.withCredentials = true
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)
// http response 拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code === 200) {
    return response.data
  }
  // token 已过期，重定向到登录页面
  else if (response.data.code == 401) {
    store.dispatch('logout')
    // router.replace({
    //     path: '/login',
    //     query: { redirect: router.currentRoute.fullPath }
    // })
    router.replace('/login')
  }
  else {
    console.log('系统异常，请重试')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
/**
 * 请求
 * @param {String} url    地址
 * @param {String} type   类型
 * @param {Object} data   数据
 */
export const fetch = (url, type = 'get', data) => {
  let _options = {
    method: type,
    url: url
  }
  if (type === 'get') {
    _options.params = data
  }
  else if (type === 'post') {
    _options.data = data
  }

  return axios(_options)
}