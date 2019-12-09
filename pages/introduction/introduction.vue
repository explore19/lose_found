<template>
	<view class="cu-card dynamic" :class="isCard?'no-card':''">
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url('+headPortrait+');'"></view>
					<view class="content flex-sub">
						<view>{{nickName}}</view>
						<view class="text-gray text-sm flex justify-between">
							{{createTime}}
						</view>
					</view>
				</view>
			</view>
			<view class="flex-sub text-left">
				<view class="solid-bottom text-lg padding">
					<text class="text-black text-bold">{{form.name}}</text>
				</view>
				<view class="">
					
				</view>
				<view style="margin:10upx 30upx;">丢失地点：{{form.lostPlace}}</view>
				<view style="margin:10upx 30upx;">丢失时间：{{form.loseTime}}</view>
				<view style="margin:10upx 30upx;">联系方式：{{form.contact}}</view>
				<view style="margin:10upx 30upx;">物品类型：{{form.type}}</view>
				<view class="padding">详情：{{form.details}}</view>
				<view class="grid flex-sub padding-lr col-3 grid-square">
					<view class="bg-img" :style="'background-image:url('+item.post.image+');'"
					 v-for="(item,index) in 6" :key="index">
					</view>
				</view>
			</view>


			<view class="text-gray text-sm text-right padding">
				<text class="cuIcon-attentionfill margin-lr-xs"></text>{{form.browsePoints}}
				<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{form.praisePoints}}
				<text class="cuIcon-messagefill margin-lr-xs"></text> 
			</view>

			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item">
					<view class="cu-avatar round" :style="'background-image:url('+img+');'"></view>
					<view class="content">1
						<view class="text-grey">莫甘娜</view>
						<view class="text-gray text-content text-df">
							凯尔，你被自己的光芒变的盲目。
						</view>
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
							<view class="flex">
								<view>凯尔：</view>
								<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">2018年12月4日</view>
							<view>
								<text class="cuIcon-appreciatefill text-red"></text>
								<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: true,
				nickName: "",
				detail: "",
				createTime: "",
				img: "",
				headPortrait: "",
				form: {
					name: '',
					loseTime: '',
					lostPlace: '',
					contact: '',
					image: [],
					details: '',
					browsePoints: 0,
					praisePoints: 0,
					type:''

				}
			};
		},
		methods: {
			requestData() {
				this.$api.getPost({
					id: 1
				}).then(res => {
					console.log(res)
					this.headPortrait = res.data.headPortrait
					this.nickName = res.data.nickName
					this.createTime = res.data.post.createTime
					this.form.details = res.data.post.details
					this.form.contact = res.data.post.contact
					this.form.loseTime = res.data.post.loseTime
					this.form.lostPlace = res.data.post.lostPlace
					this.form.name = res.data.post.name
					this.form.type = res.data.post.type
				})
			}
		},
		created() {
			this.requestData()
		}

	}
</script>

<style>
</style>
