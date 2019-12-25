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
				<text class="cuIcon-attentionfill margin-lr-xs">{{data.post.browsePoints}}</text>
				<text class="cuIcon-appreciatefill margin-lr-xs">{{data.praiseNumber}}</text> 
				<text class="cuIcon-messagefill margin-lr-xs" @click="reply">{{data.replyNumber}}</text>
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
		<view class="cu-bar input reply" >
			<view class="cu-avatar round" :style="'background-image:url('+headPortrait+');'"></view>
			
			<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" class="solid-bottom" maxlength="300" cursor-spacing="10" v-model="detail"></input>
			
			<button class="cu-btn bg-green shadow-blur" @click="subreply()">发送</button>
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
				userId: "",
				replys: [],
				postId: '',
				datas: [],
				lisAAt: [],
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
					id: this.$global.postId
				}).then(res => {
					if(res.status===0){
						this.data=res.data
						this.image = res.data.post.image.split("&&&")
						this.hasImg=res.data.post.image==null?false:true
					}			
				})

				this.$api.queryPostReply({ //根据帖子的id查询所有的回复
					postId: 1
				}).then(res => {
					console.log(res.data)
					this.test(res.data)
				})
			},
			test: function(node) {
				if (node.reply.status === null) { //-null代表根节点
					if (node.children == null) {
						return
					}
					for (var i = 0; i < node.children.length; i++) {
						this.test(node.children[i])
					}
					return
				}
				if (node.reply.status === 0) { //0代表回复帖子的回复
					this.str.info = node.reply.reply.info
					this.str.replierPortrait = node.reply.headPortrait
					this.str.replierName = node.reply.replyedUserNickName
					this.str.createTime = node.reply.reply.createTime
					
				}else{   //回复回复的回复
					let replyss={}
					// replyss.userId= node.userId
					replyss.createTime = node.reply.reply.createTime
					// this.replyss.replyId = node.replyId
					replyss.info = node.reply.reply.info
					replyss.nickName=node.reply.replyedUserNickName
					this.str.replys.push(replyss)
				}
				if (node.children == null) {
					return
				}
				for (var i = 0; i < node.children.length; i++) {
					this.test(node.children[i])
				}
				if(node.reply.status == 0){
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
				// this.$api.addReply({
				// 	info:this.detail
				// }).then(res => {
				// 	console.log(res)
				// })
			},
			
			onClose: function() { //关闭弹出层的方法
				this.show = false
			},
			subreply: function(e) { //提交回复内容的方法
				this.$api.addReply({
					userId:1,
					postId:1,
					type:0,
					replyId:null,
					info:this.detail
				}).then(res => {
					console.log(res)
				})
				
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}


		},
		created() {
			console.log(this.$postId)
			this.requestData()
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
