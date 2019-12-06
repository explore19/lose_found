<template>
	<view>
		<view>
			<!-- <van-search label="你好" value="" placeholder="请输入搜索关键词" use-action-slot="true" @search="onSearch">
				<view slot="action" @click="onCancel">取消</view>
			</van-search> -->
			
			<view class="cu-form-group">
				<van-dropdown-menu>
					<van-dropdown-item :options="option3" title="种类" v-on:change="onChange()"/>
				</van-dropdown-menu>	
				<van-field placeholder="请输入要查询的内容" border="true"/>
				<button class="cu-btn bg-white" @click="onSearch()">搜索</button>
				<!-- <van-icon name="search" @click="onSearch()"/> -->
			</view>

			<van-dropdown-menu>
			  <van-dropdown-item  :options="option1" title="物品种类" v-on:change="onChange()"/>
			  <van-dropdown-item  :options="option2" title="排序" v-on:change="onChange()"/>
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
					   { text: '默认排序', value: '3' },
					   { text: '好评排序', value: '4' },
					   { text: '销量排序', value: '5' }
					],
					option3:[{
						text:'第一个',value:'a'
					},{
						text:'第二个',value:'b'
					},{
						text:'第三个',value:'c'
					}]
			}
		},
		methods: {
			onSearch:function(){ //用来跳转物品详情页
				uni.navigateTo({
					url:"/pages/list/list"
				})
			},
			onChange:function(e){
				console.log(e.detail)
			}
				
		}
	}
</script>

<style>
	.tags {
		padding-left: 20px;
	}
</style>
