<template>
	<view class="">
		<web-view v-if="htmlPage" :src="imgUrl"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				htmlPage:true,
				imgUrl:''
			}
		},
		methods:{
			 
		},
		onShow() {
			console.log(this.$global.rotationChartUrl)
			this.imgUrl = this.$global.rotationChartUrl
		}
	}
</script>

<style>
</style>
