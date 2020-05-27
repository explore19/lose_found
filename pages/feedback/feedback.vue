<template>
	<view>
		<view class="padding bg-white">
			<view class="text-cut padding radius bg-white" style="width:220px;">您的问题或者建议：</view>
			<textarea class="padding bg-grey" type="text" value="" placeholder="输入个人的意见反馈,字数在200字以内" maxlength="200"/>
			<view class="text-cut padding radius bg-white" style="width:220px;">您的联系方式：</view>
			<view class="padding">
				<input class="bg-grey" type="text" value="" placeholder="输入电话号码" maxlength="30"/>
			</view>
			<view class="padding">
				<input class="bg-grey" type="text" value="" placeholder="输入电子邮箱" maxlength="30"/>
			</view>
			<view class="text-cut padding radius bg-white" >留下的您的联系方式，以便我们了解问题<br>及时反馈和结果，我们会保护好您的隐私</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-cyan lg">提交建议</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default{	
		data(){
			return{
				
			}
		},
		methods:{
			 
		}
	}
</script>

<style>
</style>
