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
									</view>
								</view>
								<view @click="goToInfo(item.post.id)">
								<view class="text-content" style="margin: 20upx 30upx;">
									{{item.post.details}}
								</view>
								<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'" v-if="img" :img = "item.post.image!=null?'true':'false'" >
									<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
									</view>
								</view>
								<view class="text-gray text-sm text-right padding">
									<text class="cuIcon-attentionfill margin-lr-xs">{{item.post.browsePoints}}</text>
									<text class="cuIcon-appreciatefill margin-lr-xs">{{item.praiseNumber}}</text>
									<text class="cuIcon-messagefill margin-lr-xs">{{item.replyNumber}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				</view>
		</view>
				
				<view class="text-gray text-xl text-center padding margin-top" v-else>
					<text class="cuIcon-emoji margin-lr-ms">您未上传过帖子</text>
				</view>
				</view>
</template>

<script>
	export default {
		data() {
			return {
				exist:false,
				data:[]
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

</style>
