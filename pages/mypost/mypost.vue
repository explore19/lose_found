<template>
	<view>
		<view v-if="exist">
			<view v-for="item in data" :key="item.post.id" style="margin-top: 15upx;">
					<view style="border: #F0FFF0">
						<view class="cu-card dynamic no-card">
							<view class="cu-item shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item borderLine">
										<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
										<view class="content flex-sub">
											<view>{{item.nickName}}</view>
											<view class="text-gray text-sm flex justify-between">
												{{item.post.createTime}}
											</view>
										</view>
										<text  style="font-size:125%; z-index: 100;" class=" padding-lr  cuIcon-delete text-gray" @click.stop="delPost(item.post.id)"></text>
									</view>
								</view>
								<view @click="goToInfo(item.post.id)">
								
								<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'"  v-if="item.post.image!=null">
									<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
									</view>
								</view>
								<view class="text-content" style="margin: 20upx 30upx 10upx;">
									物品名称:{{item.post.name}}
								</view>
								<view  class="text-content" style="margin: 10upx 30upx;">
									物品详情:{{item.post.details}}
								</view>
								<view class="text-gray text-sm text-right padding">
									<text  style="font-size:125%" class="cuIcon-attentionfill margin-lr-xs">{{item.post.browsePoints}}</text>
									<text style="font-size:125%" @click.stop="perfect(item.post.id)" :class="'cuIcon-appreciatefill margin-lr-xs '+(item.isPraise?'text-red':'') ">{{item.praiseNumber}}</text>
									<text style="font-size:125%" class="cuIcon-messagefill margin-lr-xs">{{item.replyNumber}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				</view>
		</view>
				
				<view class=" margin-top" v-else>
					<view class="kong">
						<image src="../../static/images/空帖子.png" style="height: 1100upx;"></image>
					</view>
						
						
					</view>
				</view>
				</view>
</template>

<script>
	export default {
		data() {
			return {
				exist:false,
				data:[],
				img:[]
			}
		},
		methods: {
			requestData(){
				this.$api.queryMyPost().then(res=>{
					
					if(res.data.length==0){
						this.exist = false	
					}
					else {
						this.exist = true
						this.data=res.data
						for(var i = 0;i<res.data.length;i++){
							if(res.data[i].post.image!=null){
								this.img = res.data[i].post.image.split("&&&")
							this.data[i].post.image = this.img[0]
							}
							
						}
					}
					
				})
			},
			perfect: function(postId) {
				this.$api.praise(postId).then((res) => {
					this.requestData()
				})
			},
			delPost:function(postId){
				
				uni.showModal({
					content: '确认删除该帖子',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.$api.removePost(postId).then((res) => {
								this.requestData()
							})
						}
					}
				})
			}
		},
		created() {
			this.requestData()
		}
	}
</script>

<style>
.kong{
	
	 display:flex;                   
	 justify-content: center;        
	 align-items:center;
	  }
</style>
