<template>
	<view class=" ">
		<van-cell-group>
		
			<view class="cu-form-group margin-top">
				<view class="title">学号（工号）</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">真实姓名</view>
				<input name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">性别</view>
					<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">QQ</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">宿舍号</view>
				<input name="input"></input>
			</view>
			<van-button type="primary" size="large" >提交</van-button>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		
		
			</van-popup>
		</van-cell-group>
	</view>
</template>

<script>
</script>

<style>
</style>
