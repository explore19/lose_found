import request from 'utils/request.js'

const api = {}

//用户信息api接口
api.getUserInfo=() => request.get('/user/get_user_info')


export default api