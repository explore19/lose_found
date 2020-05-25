<template>
	<view class="">
		<view class="wux-light">Light</view>
		<view class="wux-positive--bg">Positive</view>
		<view>
			<wux-fab-button theme="balanced" position="bottomRight" buttons="button" :click="onClick()"></wux-fab-button>
		</view>
	</view>
</template>

<script>
	// <wux-fab-button position="{{ types[typeIndex] }}" theme="{{ colors[colorIndex] }}" direction="{{ dirs[dirIndex] }}" reverse="{{ reverse }}" spaceBetween="{{ spaceBetween }}" sAngle="{{ sAngle }}" eAngle="{{ eAngle }}" buttons="{{ buttons }}" bind:change="onChange" bind:click="onClick" bind:contact="onContact" bind:getuserinfo="onGotUserInfo" />
	export default{
		data(){
			return{
				button:[{
					openType: 'getUserInfo',
					    label: 'GetUserInfo',
					    //icon,
					},
					{
					    openType: 'share',
					    label: 'Share',
					    //icon,
					},
					{
					    openType: 'contact',
					    label: 'Contact',
					    //icon,
					},
					{
					    label: 'View on Demo',
					    //icon,
					}      
				]
			}
		},
		methods:{
			 onClick(e){
				 console.log(e)
				 console.log("click it ")
			 }
		}
	}
</script>

<style>
</style>
