<template>
	<view>
		<van-dropdown-menu>
		  <van-dropdown-item  :options="option1" title="物品种类" v-on:change="onChange()"/>
		  <van-dropdown-item  :options="option2" title="排序" v-on:change="onChange()"/>
		</van-dropdown-menu>
	</view>
</template>

<script>
	
	export default {
			data() {
				return {
					option1: [
					     { text: '不限', value: 0 },
					     { text: '地点', value: 1 },
					     { text: '物品类型2', value: 2 }
					   ],
					option2: [
					   { text: '默认排序', value: '3' },
					   { text: '好评排序', value: '4' },
					   { text: '销量排序', value: '5' }
					],				
				}
			},
			methods: {
				
			}
		}
</script>

<style>
</style>
