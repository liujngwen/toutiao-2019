// 提供 存储用户信息的相关API
// 约定：key=h-toutiao-2019-pc-user-key
const KEY = 'h-toutiao-2019-pc-user-key'
const local = {
  // 存储
  setUser (user) {
    // 把 user对象转换成json字符串
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  // 清除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }

}

export default local
