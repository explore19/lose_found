import request from 'utils/request.js'

const api = {}

//用户信息api接口
api.getUserInfo=() => request.get('/user/get_user_info')



//用于修改用户的信息的api
api.updateInfo=(data) => request.post('/user/update_info',data)

// api.updateInfo=up
// function up(data){
// 	request.post('/user/update_info',data)
// }
// 

//帖子信息的api接口
api.getPost=(data) => request.get('/post',data)



//用于上传帖子的api
api.savePost=(data) => request.post('/post',data)


//用于删除贴子的api
api.removePost=(data) => request.delete('/post',data)


export default api