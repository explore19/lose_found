<template>
	<view>
		<view>
			<!-- <van-search label="你好" value="" placeholder="请输入搜索关键词" use-action-slot="true" @search="onSearch">
				<view slot="action" @click="onCancel">取消</view>
			</van-search> -->
			
			<view class="cu-form-group">
				<van-dropdown-menu>
					<van-dropdown-item :options="option1" title="种类"/>
				</van-dropdown-menu>	
				<van-field placeholder="请输入要查询的内容" border="true" @search="onSearch()"/>
				<button class="cu-btn bg-white" @click="onCancel()">取消</button>
			</view>

			<van-dropdown-menu>
			  <van-dropdown-item  :options="option1" title="物品种类"/>
			  <van-dropdown-item  :options="option2" title="啥啥啥"/>
			</van-dropdown-menu>
		</view>	
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				 option1: [
				      { text: '不限', value: 0 },
				      { text: '物品类型1', value: 1 },
				      { text: '物品类型2', value: 2 }
				    ],
					option2: [
					   { text: '默认排序', value: 'a' },
					   { text: '好评排序', value: 'b' },
					   { text: '销量排序', value: 'c' }
					]
			}
		},
		methods: {
			onCancel: function() {
				uni.switchTab({
					url: "/pages/index/index"
				})
				//console.log(1)
			},
			onClose:function(){
				this.setData({ show: false });
				console.log(1)
			},
			onSearch:function(){
				uni.navigateTo({
					url:"/pages/list/list"
				})
			}
			
				
		}
	}
</script>

<style>
	.tags {
		padding-left: 20px;
	}
</style>
