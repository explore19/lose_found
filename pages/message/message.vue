<template>
	<view>
		<view class="cu-bar bg-white solid-bottom margin-top">
		    <view class="action">
		      <text class="cuIcon-title text-orange "></text> 消息列表
		    </view>
		  </view>

			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item" v-for="(item,index) in data" :key="index">
					<view class="cu-avatar round" :style="'background-image:url('+item.message.headPortrait+');'"></view>
					<view class="content">
						<view class="text-grey">{{item.message.nickName}}</view>
						<view  @click="otherReply(item.message.reply.id)" class=" text-gray text-content text-df">
							{{item.message.reply.info}}
						</view>
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm" >
							<view  class="flex">
								<view v-if="item.type===0">{{item.data.details}}</view>
								<view v-if="item.type===1">我:</view>
								<view  class="flex-sub">{{item.data.info}}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.message.reply.createTime}}</view>		
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
				data:[]
			};
		},
		methods:{
			requestData(){
				this.$api.getUserMessage().then(res =>{
					if(res.status===0){
						this.data=res.data
					}
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
