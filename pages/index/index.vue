<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			
			  <van-button type="info"><navigator url="../homepage/homepage">点击</navigator></van-button>
			  <van-tabbar :active="active" @change="onChange">
			    <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
			    <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
			    <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
			    <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
			  </van-tabbar>
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
			onChange:function(event) {
				if (event.detail == "search"){
					this.$data.active = 'search'
					
				}
				else if (event.detail == "friends"){
					this.$data.active = 'friends'
				}
				else if (event.detail == "setting"){
					this.$data.active = 'setting'
				} 
		}
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
