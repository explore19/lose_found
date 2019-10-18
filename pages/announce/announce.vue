<template>
	<view class="">
		<van-tabs @click="onClick">
			<van-tab title="我是失主">
				<van-cell-group>
					<van-field :value="lostThing" clearable label="失物名称" placeholder="请输入失物名称" :click-icon="onClickIcon" />
					<van-field :value="lostPalce" clearable label="丢失地点" placeholder="请输入丢失地点" :click-icon="onClickIcon" />
					<van-field :value="lostTime" clearable label="丢失时间" placeholder="请输入丢失时间" @focus="showPopup" />
					<van-field :value="phone" clearable label="联系方式" placeholder="请输入手机号码" :click-icon="onClickIcon" />
					<van-field value="" label="失物详情" type="textarea"  autosize :border=" false "  show-confirm-bar/>
					<van-popup :show="show" @click="onClose" position="bottom" @click-overlay="show = false">
					<van-datetime-picker type="datetime" :value="currentDate"  @cancel="show = false" />
					
					</van-popup>
						<van-button type="primary" size="large">发布</van-button>
				</van-cell-group>

			</van-tab>
			<van-tab title="我是拾主">
				<van-cell-group>
					<van-field :value="foundThing" clearable label="拾物名称" placeholder="请输入拾物名称" :click-icon="onClickIcon" />
					<van-field :value="foundPalce" clearable label="拾到地点" placeholder="请输入拾到地点" :click-icon="onClickIcon" />
					<van-field :value="lostTime" clearable label="拾到时间" placeholder="请输入拾到时间" @focus="showPopup" />
					<van-field :value="phone" clearable label="联系方式" placeholder="请输入手机号码" :click-icon="onClickIcon" />
					<van-field value="" label="拾物详情" type="textarea"  autosize :border=" false "  show-confirm-bar/>
					<van-popup :show="show" @click="onClose" position="bottom" @click-overlay="show = false">
						<van-datetime-picker type="datetime" :value="currentDate"  @cancel="show = false" />
						
					</van-popup>
			<van-button type="primary" size="large">发布</van-button>
				</van-cell-group>
			</van-tab>
		</van-tabs>
	</view>



</template>

<script>
	export default {
		data() {
			return {
				// lostname:''
				show: false,
				currentDate: new Date().getTime(),
				lostThing: "",
				lostTime: "",
				lostPlace: ""


			}
		},
		methods: {
			onClick(event) {
				wx.showToast({
					title: `点击标签 ${event.detail.name}`,
					icon: 'none'
				});
			},
			showPopup() {
				this.$data.show = true
			},
			onClose() {
				this.$data.show = false
			},
			// 			onInput(event) {
			// 				this.$data.currentDate = event.detail
			// 			},

		}
	}
</script>

<style>
</style>
