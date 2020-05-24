<template>
	<view class="cu-card dynamic" :class="isCard?'no-card':''">
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url('+data.headPortrait+');'"></view>
					<view class="content flex-sub">
						<view>{{data.nickName}}</view>
						<view class="text-gray text-sm flex justify-between">
							{{data.post.createTime}}
						</view>
					</view>
				</view>
			</view>
			<view class="flex-sub text-left">
				<view class="solid-bottom text-lg padding">
					<text class="text-black text-bold">{{data.post.name}}</text>
				</view>
				<view style="margin:10upx 30upx;">丢失地点：{{data.post.lostPlace}}</view>
				<view style="margin:10upx 30upx;">丢失时间：{{data.post.loseTime}}</view>
				<view v-if="data.post.contact" style="margin:10upx 30upx;">联系方式：{{data.post.contact}}</view>
				<view v-if="data.post.type" style="margin:10upx 30upx;">物品类型：{{data.post.type}}</view>
				<view style="margin:10upx 30upx;">详情：{{data.post.details}}</view>
				<view class="grid flex-sub padding-lr col-3 grid-square" v-if="hasImg">
					<view class="bg-img" :style="'background-image:url('+item+');'" v-for="(item,index) in image" :key="index">
					</view>
					<!-- <view v-for="(item,index) in image" :key="index">
						<image :src="item" mode="aspectFit"></image>
					</view> -->
				</view>
			</view>
			

			<view class="text-gray text-sm text-right padding">
				<text style="font-size:130%" class="cuIcon-attentionfill margin-lr-xs">{{data.post.browsePoints}}</text>
				<text style="font-size:130%" @click="perfect(data.post.id,data.isPraise)" :class="'cuIcon-appreciatefill '+(data.isPraise?'text-red':'')">{{data.praiseNumber}}</text>
				<text @click="postReply" style="font-size:130%" class="cuIcon-messagefill margin-lr-xs ">{{data.replyNumber}}</text>
			</view>



			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item" v-for="(item,index) in replyList" :key="index">
					<view class="cu-avatar round " :style="'background-image:url('+item.replyUserPortrait+');'"></view>
					<view class="content">
						<view class="text-grey">{{item.replyUserName}}</view>
							<view hover-class="wsui-btn__hover_list" @click="otherReply(item.id, item.replyUserName)" class=" text-content text-df">
								{{item.info}}
							</view>
							
						<view class="margin-top-sm  text-sm" v-for="(item2,index2) in item.replys" :key="index2">
							<view hover-class="wsui-btn__hover_list" class="flex">
								<!-- <view class="cu-avatar round sm" :style="'background-image:url('+item2.replyUserPortrait+');'"></view> -->
								<view class=" text-purple margin-lr-ms" v-if="item.id==item2.reply.replyId">{{item2.nickName}}:</view>
								<view  class="margin-lr-ms" v-if="item.id!=item2.reply.replyId"><text class="text-purple margin-lr-ms">{{item2.nickName}}</text>回复 <text class="text-purple margin-lr-ms">{{item2.replyedUserNickName}}</text>:</view>
								<view @click="otherReply(item2.reply.id, item2.nickName)" class="flex-sub">{{item2.reply.info}}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.reply.createTime}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="blank">

			<view class="cu-bar input reply">
				<view class="cu-avatar round" :style="'background-image:url('+data.headPortrait+');'"></view>

				<input id="input1"  :adjust-position="true" class="solid-bottom "  maxlength="300" :placeholder="placeholderText"
				cursor-spacing="500rpx"  v-model="replyForm.info"></input>

				<button :adjust-position="true" class="cu-btn bg-green shadow-blur" @click="subreply()">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				hasImg: false,
				isCard: true,
				image: [],
				data: {},
				replyId: -1,
				firstFloorReply: {
					replyUserPortrait: '',
					replyUserName: '',
					info: '',
					createTime: '',
					replys: []
				},
				replyForm: {
					replyId: -1,
					type: 0,
					postId: this.$global.postId,
					info: ''
				},
				replyList: [],
				userStatus:"", 
				placeholderText: "说点什么吧..."
				
			};
		},
		methods: {
			requestData() {
				let result
				this.$api.getAllType().then(res => {
					result = res.data
					})
					
				this.$api.getPost({
					id: this.$global.postId
				}).then(res => {
					if (res.status === 0) {
						this.data = res.data
						if(this.data.post.type != null){
							this.data.post.type = result[res.data.post.type].name
						}
						if (this.data.post.image === null) {
							this.hasImg = false
						} else {
							this.hasImg = true
							this.image = this.data.post.image.split("&&&")
						}
					}0
				})


			},
			requestReply() {
				this.$api.queryPostReply({ //根据帖子的id查询所有的回复
					postId: this.$global.postId
				}).then(res => {
					if (res.status == 0) {
						let replyList = []
						this.recursionReply(res.data, replyList)
						this.replyList = replyList
					}

				})
			},
			recursionReply: function(node, replyList) {
				if (node.reply.status === null) { //-null代表根节点
					if (node.children == null) {
						return
					}
					for (var i = 0; i < node.children.length; i++) {
						this.recursionReply(node.children[i], replyList)
					}
					return
				}

				if (node.reply.status === 0) { //0代表回复帖子的回复
					this.firstFloorReply.info = node.reply.reply.info
					this.firstFloorReply.replyUserPortrait = node.reply.headPortrait
					this.firstFloorReply.replyUserName = node.reply.nickName
					this.firstFloorReply.createTime = node.reply.reply.createTime
					this.firstFloorReply.id = node.reply.reply.id

				} else { //回复回复的回复
					this.firstFloorReply.replys.push(node.reply)
				}
				if (node.children == null) {
					return
				}
				for (var i = 0; i < node.children.length; i++) {
					this.recursionReply(node.children[i], replyList)
				}
				if (node.reply.status == 0) {
					replyList.push(this.firstFloorReply)
					this.firstFloorReply = {
						replyUserPortrait: '',
						replyUserName: '',
						info: '',
						createTime: '',
						replys: []
					}
				}

			},
			perfect: function(postId,isPraise) {
				this.$api.praise(postId).then((res) => {
					if(res.status===0){
						this.data.isPraise=!isPraise
						if(isPraise){
							this.data.praiseNumber--
						}else{
							this.data.praiseNumber++
						}
					}
				})
			},
			otherReply: function(replyId, replyUsername) { //回复消息的方法
				console.log(replyId)
				console.log(replyUsername)
				this.show = true
				this.replyForm.replyId = replyId
				this.replyForm.type = 1
				this.placeholderText = "回复: " + replyUsername
			},
			postReply: function() {
				this.show = true
				this.replyForm.replyId = -1
				this.replyForm.type = 0
			},
			onClose: function() { //关闭弹出层的方法
				this.show = false
			},
			subreply: function(e) { //提交回复内容的方法
			
			if(this.userStatus == 3){
				uni.showToast({
					title: "请先登录再发表回复！",
					icon: "none"
					
				});
			}
			else if(this.replyForm.info===""){
				uni.showToast({
					title: "回复消息不能为空",
					icon: "none"
				});
			}else{
				this.$api.addReply(this.replyForm).then(res => {
					if (res.status === 0) {
						this.requestReply()
						this.resetForm()
					}
				})
			}


			},
			resetForm() {
				this.replyForm = {
					replyId: -1,
					type: 0,
					postId: this.$global.postId,
					info: ''
				}
			}

		},
		created() {
			this.requestData()
			this.requestReply()
		
			this.$api.getUserInfo().then(res =>{
				this.userStatus = res.data.status
				
			})
		}

	}
</script>

<style>
	.wsui-btn__hover_list {
	    opacity: 0.9;
	    background: #f7f7f7;
	}
	
	.reply {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.blank {
		height: 98rpx;
	}
</style>
