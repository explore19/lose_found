<template>
	<view>
		<van-nav-bar
		  title="标题"
		  left-text="返回"
		  left-arrow
		  bind:click-left="onClickLeft"
		/>
	</view>
	<view>
		<van-sidebar active="{{ active }}" bind:change="onChange">
		  <van-sidebar-item title="综合排序" />
		  <van-sidebar-item title="按发布时间排列" />
		  <van-sidebar-item title="按丢失地点距离排列" />
		</van-sidebar>
	</view>
	
	<view>
		<van-skeleton
		  title
		  avatar
		  row="3"
		  loading="loading"
		>
		  <view>帖子1</view>
		</van-skeleton>
	</view>
	<view>
		<van-skeleton
		  title
		  avatar
		  row="3"
		  loading="loading"
		>
		  <view>帖子2</view>
		</van-skeleton>
	</view>
	<view>
		<van-skeleton
		  title
		  avatar
		  row="3"
		  loading="loading"
		>
		  <view>帖子3</view>
		</van-skeleton>
	</view>
	<view>
		<van-skeleton
		  title
		  avatar
		  row="3"
		  loading="loading"
		>
		  <view>帖子4</view>
		</van-skeleton>
	</view>
	<view>
		<van-skeleton
		  title
		  avatar
		  row="3"
		  loading="loading"
		>
		  <view>帖子5</view>
		</van-skeleton>
	</view>
	
</template>

<script>
	export default {
			data() {
				active: 0,
				loading: true
				return {
					
					}
			},
			methods:{
				onClickLeft:function() {
				    wx.showToast({ title: '点击返回', icon: 'none' });
				  },
				  onChange:function(event) {
				  		    wx.showToast({
				  		      icon: 'none',
				  		      title: `切换至第${event.detail}项`
				  		    });
				  		  },
			       onReady:function() {
						      this.setData({
						        loading: false
						      });
						    }
			}
	}
</script>

<style>
</style>
