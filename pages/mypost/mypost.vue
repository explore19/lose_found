<template>
	<view>
		<view v-for="item in data" :key="item.post.id">
			<view style="border: #F0FFF0">
				<view class="cu-card dynamic isCard?'no-card':''">
					<view class="cu-item shadow">
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
								<view class="content flex-sub">
									<view>{{item.nickName}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{item.post.createTime}}
								</view>
								</view>
							</view>
						</view>
						<view @click="getToInfo()">
						<view class="text-content" style="margin: 20upx 30upx;">
							{{item.post.details}}
						</view>
						<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'">
							<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
							</view>
						</view>
						</view>	
						<view class="text-gray text-sm text-right padding">
							<text class="cuIcon-attentionfill margin-lr-xs" @click="add()">{{item.post.browsePoints}}</text>
							<text class="cuIcon-appreciatefill margin-lr-xs">{{item.post.praisePoints}}</text>
							<text class="cuIcon-messagefill margin-lr-xs">{{item.post.reply}}</text>
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
				data:[]
			}
		},
		methods: {
			requestData(){
				this.$api.queryMyPost().then(res=>{
					console.log(res)
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
