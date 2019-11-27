<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 4" :key="index" @tap="tabSelect" :data-id="index">
					{{index}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	export default {
			data() {
				return {
					
					TabCur: 0,
					scrollLeft: 0,
					index:1
				}
			},
			methods: {
				tabSelect(e) {
					this.TabCur = e.currentTarget.dataset.id;
					this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				}
			}
		}
</script>

<style>
</style>
