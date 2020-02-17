<template>
	<view v-if="exist">
		<view class="cu-list menu-avatar comment solids-top">
			<view @click="toPostInfo(item.myReply.reply.postId)" class="cu-item" v-for="(item,index) in data" :key="index">
				<view class="cu-avatar round" :style="'background-image:url('+item.myReply.headPortrait+');'"></view>
				<view class="content">
					<view class="text-grey">{{item.myReply.nickName}}</view>
					<view  @click="otherReply(item.myReply.reply.id)" class=" text-gray text-content text-df">
						{{item.myReply.reply.info}}
					</view>
					<view class=" padding-sm radius margin-top-sm  text-sm" style="background: #F1F1F1;">
						<view  class="flex">
							<view v-if="item.type===0">{{item.data.details}}</view>
							<view v-if="item.type===1">{{item.myReply.replyedUserNickName}}</view>
							<view  v-if="item.type===1" class="flex-sub">{{item.data.info}}</view>
						</view>
					</view>
					<view class="margin-top-sm flex justify-between">
						<view class="text-gray text-df">{{item.myReply.reply.createTime}}</view>		
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="text-gray text-xl text-center padding margin-top" v-else>
		<text class="cuIcon-emoji margin-lr-ms">您未有回复</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exist:true,
				data:[]
			};
		},
		methods:{
			requestData(){
				this.$api.getUserReply().then(res =>{
					console.log(res)
					if(res.data.length===0){
						this.exist = false
					}
					else{
						this.exist = true
						if(res.status===0){
						this.data=res.data
					}
					}
					
				})
			},
			toPostInfo(postId){
			this.$global.setPostId(postId)
			uni.navigateTo({
				url: "/pages/introduction/introduction"
			})
			}
		},
		created()  {   //生命周期函数
			this.requestData()
		}
	}
</script>

<style>

</style>
