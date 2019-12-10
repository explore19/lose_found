import request from 'utils/request.js'

const api = {}

//用户信息api接口
api.getUserInfo=() => request.get('/user/get_user_info')

//用于修改用户的信息的api
api.updateInfo=(data) => request.post('/user/update_info',data)

//帖子信息的api接口
api.getPost=(data) => request.get('/post',data)
//获得多个帖子
api.queryPost=(data) => request.get('/post/query',data)
//用于上传帖子的api
api.savePost=(data) => request.post('/post',data)
//用于删除贴子的api
api.removePost=(data) => request.delete('/post',data)
//发布帖子的api
api.addPost=(data) => request.post('/post',data)

//根据传入的帖子id 获得对应全部的回复
api.queryPostReply=(data) =>request.get('/post/query_all_reply',data)

//将回复的内容发送到后端的api 
api.addReply=(data) =>request.post('/reply',data)


api.getAllType=() =>request.get('/itemType/getAllType')

export default api