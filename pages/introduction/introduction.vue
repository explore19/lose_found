<template>
	<view class="cu-card dynamic" :class="isCard?'no-card':''">
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url('+headPortrait+');'"></view>
					<view class="content flex-sub">
						<view>{{nickName}}</view>
						<view class="text-gray text-sm flex justify-between">
							{{createTime}}
						</view>
					</view>
				</view>
			</view>
			<view class="flex-sub text-left">
				<view class="solid-bottom text-lg padding">
					<text class="text-black text-bold">{{form.name}}</text>
				</view>
				<view style="margin:10upx 30upx;">丢失地点：{{form.lostPlace}}</view>
				<view style="margin:10upx 30upx;">丢失时间：{{form.loseTime}}</view>
				<view style="margin:10upx 30upx;">联系方式：{{form.contact}}</view>
				<view style="margin:10upx 30upx;">物品类型：{{form.type}}</view>
				<view class="padding">详情：{{form.details}}</view>
				<view class="grid flex-sub padding-lr col-3 grid-square">
					<view class="bg-img" :style="'background-image:url('+item.post.image+');'" v-for="(item,index) in 6" :key="index">
					</view>
				</view>
			</view>
		
			<view class="text-gray text-sm text-right padding">
				<text class="cuIcon-attentionfill margin-lr-xs"></text>{{form.browsePoints}}
				<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{form.praisePoints}}
				<text class="cuIcon-messagefill margin-lr-xs" @click="reply"></text>
			</view>



			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item" v-for="(item,index) in replyList" :key="index">
					<view class="cu-avatar round" :style="'background-image:url('+item.replierPortrait+');'"></view>
					<view class="content">
						<view class="text-grey">{{item.replierName}}</view>
						<view class=" text-gray text-content text-df">
							{{item.info}}
						</view>
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm" v-for="(item2,index2) in item.replys" :key = "index2">
							<view class="flex">
								<view>{{item2.nickName}}:</view>
								<view class="flex-sub">{{item2.info}}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.createTime}}</view>		
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: true,
				nickName: "",
				detail: "",
				createTime: "",
				img: "",
				headPortrait: "",
				form: {
					name: '',
					loseTime: '',
					lostPlace: '',
					contact: '',
					image: [],
					details: '',
					browsePoints: 0,
					praisePoints: 0,
					type: ''
				},
				userId: "",
				replys: [],
				postId: '',
				datas: [],
				list: [],
				// str: '',
				str:{
					replierPortrait:'',
					replierName:'',
					info:'',
					createTime:'',
					replys:[]	
				},
				replyss:{
					userId:'',
					replyId:'',
					info:'',
					createTime:''
				},
				replyList:[]
			};
		},
		methods: {
			requestData() {
				this.$api.getPost({
					id: 1
				}).then(res => {

					this.headPortrait = res.data.headPortrait
					this.nickName = res.data.nickName
					this.createTime = res.data.post.createTime
					this.form.details = res.data.post.details
					this.form.contact = res.data.post.contact
					this.form.loseTime = res.data.post.loseTime
					this.form.lostPlace = res.data.post.lostPlace
					this.form.name = res.data.post.name
					this.form.type = res.data.post.type
					this.userId = res.data.post.id;
				})

				this.$api.queryPostReply({ //根据帖子的id查询所有的回复
					postId: 1
				}).then(res => {
					
					let testData={
						status:-1,
						children:[]
					}
					for(var i =0;i<5;i++){
						testData.children.push({
							status:0,
							nickName:'黄培培',
							createTime:'2019年12月12日',
							info:"11111111111",
							children:[]
						})
					}
				
					for(var i =0;i<2;i++){
						testData.children[i].children.push({
								status:1,
								nickName:'高来来',
								createTime:'2019年12月13日',
								info:"2222222222",
								children:[]
							})
					}
					for(var i =2;i<5;i++){
						testData.children[i].children.push({
								status:1,
								nickName:'李斌',
								createTime:'2019年12月13日',
								info:"33333333333",
								children:[]
							})
					}
					this.test(testData)
					console.log(this.replyList)
					
					let result = res.data
					for (var i = 0; i < result.length; i++) { //分类根据reply的replyId是否等于 发帖人的id
						if (result[i].reply.replyId == this.userId) {
							var len = this.replys.push(result[i])
						} else {
							var len = this.list.push(result[i])
						}
					}
					for (var i = 0; i < this.list.length; i++) { //筛选
						for (var j = 0; j < this.replys.length; j++) {
							if (this.list[i].reply.replyId == this.replys[j].reply.userId) {
								this.list[i].nickName = this.list[i].nickName + " 回复:" + this.replys[j].nickName
								this.replys.splice(j + 1, 0, this.list[i])
							}
						}
					}
					
				})
			},
			test: function(node) {
				if (node.status === -1) { //-1代表根节点
					if (node.children == null) {
						return
					}
					for (var i = 0; i < node.children.length; i++) {
						this.test(node.children[i])
					}
					return
				}
				if (node.status === 0) { //0代表回复帖子的回复
					this.str.info = node.info
					this.str.replierPortrait = node.headPortrait
					this.str.replierName = node.nickName
					this.str.createTime = node.createTime
					
				}else{   //回复回复的回复
					let replyss={}
					replyss.userId= node.userId
					replyss.createTime = node.createTime
					// this.replyss.replyId = node.replyId
					replyss.info = node.info
					replyss.nickName=node.nickName
					this.str.replys.push(replyss)
				}
				if (node.children == null) {
					return
				}
				for (var i = 0; i < node.children.length; i++) {
					this.test(node.children[i])
				}
				if(node.status == 0){
					this.replyList.push(this.str)
					this.str ={
						replierPortrait:'',
						replierName:'',
						info:'',
						createTime:'',
						replys:[]	
					}
				}
				
			},
			reply: function() { //回复消息的方法
				this.show = true
				console.log("欢迎你")
			},
			onClose: function() { //关闭弹出层的方法
				this.show = false
			},
			submit: function(e) { //提交回复内容的方法
				this.$api.addReply({
					id: 7,
					info: e.detail.value
				}).then(res => {
					console.log(res)
				})
				console.log(e)
			}


		},
		created() {
			this.requestData()
		}

	}
</script>

<style>
</style>
