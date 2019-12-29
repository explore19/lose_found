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
				<view style="margin:10upx 30upx;">联系方式：{{data.post.contact}}</view>
				<view v-if="data.post.type" style="margin:10upx 30upx;">物品类型：{{data.post.type}}</view>
				<view class="padding">详情：{{data.post.details}}</view>
				<view class="grid flex-sub padding-lr col-3 grid-square" v-if="hasImg" >
					<view class="bg-img" :style="'background-image:url('+item+');'" v-for="(item,index) in image" :key="index">
						
					</view>
				</view>
			</view>

		
			<view class="text-gray text-sm text-right padding">
				<text style="font-size:130%" class="cuIcon-attentionfill margin-lr-xs">{{data.post.browsePoints}}</text>
				<text style="font-size:130%"  @click="perfect(data.post.id)" :class="'cuIcon-appreciatefill '+(data.isPraise?'text-red':'')" >{{data.praiseNumber}}</text> 
				<text  @click="postReply" style="font-size:130%" class="cuIcon-messagefill margin-lr-xs "  >{{data.replyNumber}}</text>
			</view>



			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item" v-for="(item,index) in replyList" :key="index">
					<view class="cu-avatar round" :style="'background-image:url('+item.replyUserPortrait+');'"></view>
					<view class="content">
						<view class="text-grey">{{item.replyUserName}}</view>
						<view  @click="otherReply(item.id)" class=" text-gray text-content text-df">
							{{item.info}}
						</view>
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm" v-for="(item2,index2) in item.replys" :key = "index2">
							<view  class="flex">
								<view v-if="item.id==item2.reply.replyId">{{item2.nickName}}:</view>
								<view v-if="item.id!=item2.reply.replyId">{{item2.nickName}}回复{{item2.replyedUserNickName}}:</view>
								<view @click="otherReply(item2.reply.id)" class="flex-sub">{{item2.reply.info}}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.reply.createTime}}</view>		
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar input reply" >
			<view class="cu-avatar round" :style="'background-image:url('+data.headPortrait+');'"></view>
			
			<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" class="solid-bottom" maxlength="300" cursor-spacing="10" v-model="replyForm.info"></input>
			
			<button :adjust-position="true" class="cu-btn bg-green shadow-blur" @click="subreply()">发送</button>
		</view>
		<view class="blank">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasImg:false,
				isCard: true,
				image:[],
				data:{},
				replyId:-1,
				firstFloorReply:{
					replyUserPortrait:'',
					replyUserName:'',
					info:'',
					createTime:'',
					replys:[]	
				},
				replyForm:{
					replyId:-1,
					type:0,
					postId:this.$global.postId,
					info:''
				},
				replyList:[]
			};
		},
		methods: {
			requestData() {
				this.$api.getPost({
					id: this.$global.postId
				}).then(res => {
					if(res.status===0){
						this.data=res.data
						if(res.data.post.image==null){
							this.hasImg=false
						}else{
							this.hasImg=true
							this.image = res.data.post.image.split("&&&")
						}
						
						
					}			
				})

				
			},
			requestReply(){
				this.$api.queryPostReply({ //根据帖子的id查询所有的回复
					postId: this.$global.postId
				}).then(res => {
					if(res.status==0){
						let replyList = []
						this.recursionReply(res.data,replyList)
						console.log(replyList)
						this.replyList=replyList
					}
					
				})
			},
			recursionReply: function(node,replyList) {
				if (node.reply.status === null) { //-null代表根节点
					if (node.children == null) {
						return
					}
					for (var i = 0; i < node.children.length; i++) {
						this.recursionReply(node.children[i],replyList)
					}
					return
				}
			
				if (node.reply.status === 0) { //0代表回复帖子的回复
					this.firstFloorReply.info = node.reply.reply.info
					this.firstFloorReply.replyUserPortrait = node.reply.headPortrait
					this.firstFloorReply.replyUserName = node.reply.nickName
					this.firstFloorReply.createTime = node.reply.reply.createTime
					this.firstFloorReply.id = node.reply.reply.id
					
				}else{   //回复回复的回复
					this.firstFloorReply.replys.push(node.reply)
				}
				if (node.children == null) {
					return
				}
				for (var i = 0; i < node.children.length; i++) {
					this.recursionReply(node.children[i],replyList)
				}
				if(node.reply.status == 0){
					replyList.push(this.firstFloorReply)
					this.firstFloorReply ={
						replyUserPortrait:'',
						replyUserName:'',
						info:'',
						createTime:'',
						replys:[]	
					}
				}
				
			},
			perfect: function(postId) {
				this.$api.praise(postId).then((res) => {
					this.requestData()
				})
			},
			otherReply: function(replyId) { //回复消息的方法
			console.log(replyId)
				this.show = true
				this.replyForm.replyId=replyId
				this.replyForm.type=1
			},
			postReply:function(){
				this.show = true
				this.replyForm.replyId=-1
				this.replyForm.type = 0
			},
			onClose: function() { //关闭弹出层的方法
				this.show = false
			},
			subreply: function(e) { //提交回复内容的方法
				this.$api.addReply(this.replyForm).then(res => {
					if(res.status===0){
						this.requestReply()
						this.resetForm()
					}
				})
				
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			resetForm(){
				this.replyForm={
					replyId:-1,
					type:0,
					postId:this.$global.postId,
					info:''
				}
			}


		},
		created() {
			this.requestData()
			this.requestReply()
		}

	}
</script>

<style>
	.reply{
		position:fixed;
		bottom: 0;
		width: 100%;
	}
	.black{
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		position: absolute;
	}
</style>
