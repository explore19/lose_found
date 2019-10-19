<template>
	<view>
		<view>
			<van-search value="" placeholder="请输入搜索关键词" use-action-slot="true" :search="onSearch">
				<view slot="action" @click="onSearch">取消</view>
			</van-search>

		</view>
		<view class="tags">
			<van-tag plain size="large">标签</van-tag>
			<van-tag plain type="primary" size="large">标签</van-tag>
			<van-tag plain type="success" size="large">标签</van-tag>
			<van-tag plain type="danger" size="large">标签</van-tag>
			<van-tag plain type="warning" size="large">标签</van-tag>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onSearch: function() {
				uni.switchTab({
					url: "/pages/index/index"
				})
				console.log(1)
			}
		}
	}
</script>

<style>
	.tags {
		padding-left: 20px;
	}
</style>
