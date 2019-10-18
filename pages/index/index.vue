<template>
	<view class="content">
		<view class="text-area">
			  
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 active: 'home'
				}
		},
		methods: {
			
			/*onChange:function(event) {
				if (event.detail == "search"){  //跳转到发布的界面
					this.$data.active = 'search'
					uni.navigateTo({
						url: '/pages/announce/announce',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				else if (event.detail == "friends"){  //跳转到消息的界面
					this.$data.active = 'friends',
					uni.navigateTo({
						url:'/pages/message/message'
					})
				}
				else if (event.detail == "setting"){  //跳转到用户的界面
					this.$data.active = 'setting',
					uni.navigateTo({
						url:'/pages/user/user'
					})
				} 
		}*/
		
	},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
