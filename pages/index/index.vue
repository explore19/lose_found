<template>
	<view>
		<view @click="focus">
			<van-search placeholder="请输入搜索关键词" />
		</view>
		<view class="demo">
			<cl-message ref="message" ></cl-message>
		</view>
		<!--加的悬浮菜单栏-->
		<wux-fab-button
			position="bottomRight" 
			theme="balanced" 
			direction="horizontal" 
			spaceBetween="20" 
			sAngle="180" 
			eAngle="270" 
			v-bind:buttons="button" 
			@click="onClick()" 
			v-bind:contact="onContact" 
			v-bind:getuserinfo="onGotUserInfo" 
		/>
		
		<view>
				<swiper class="card-swiper" :indicator-dots="true" :circular="true" :class="dotStyle?'square-dot':'round-dot'"
				 :autoplay="true" interval="5000" duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff" @change="cardSwiper">
					<swiper-item v-for="(item,index) in rotationChartList" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item">
							<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
						</view>
					</swiper-item>
				</swiper>
				<!-- <swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
						 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
						 indicator-active-color="#0081ff">
							<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
								<view class="swiper-item">
									<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
									<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
								
							</swiper-item>
						</swiper> -->
		</view>
		
		<view class="content">
			<load-refresh
			  ref="loadRefresh"
			  :heightReduce="10"
			  :backgroundCover="'#F3F5F5'"
			  :pageNo="page"
			  :totalPageNo="totalPageNo" 
				@loadMore="loadMore" 
			  @refresh="refresh">
				<view slot="content-list">
			<van-tabs @change="onTabChange" swipeable="true">
				<van-tab title="失物寻物">
					<view class="popup window margin-top" v-if="userstatus" style="margin-top: 5upx;">
						<van-cell title="登录完善信息才能发布帖子,点击完善" is-link @click="goToperfect" position:margin-top />
					</view>
					<view v-for="(item,index) in data" :key="index" style="margin-top: 15upx;" >
						<view style="border: #F0FFF0">
							<view class="cu-card dynamic no-card">
								<view class="cu-item shadow">
									<view class="cu-list menu-avatar">
										<view class="cu-item borderLine">
											<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
											<view class="content flex-sub">
												<view>{{item.nickName}}</view>
												<view class="text-gray text-sm flex justify-between">
													{{item.post.createTime}}
												</view>
											</view>
										</view>
										<view @click="goToInfo(item.post.id)">
											
											
												<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'"  v-if="item.post.image!=null">
												<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
												</view>
											</view>
											<view class="text-content" style="margin: 20upx 30upx 10upx;">
												物品名称:{{item.post.name}}
											</view>
											<view  class="text-content" style="margin: 10upx 30upx;">
												物品详情:{{item.post.details}}
											</view>
											
											<view class="text-gray text-sm text-right padding">
												<text  style="font-size:125%" class="cuIcon-attentionfill margin-lr-xs">{{item.post.browsePoints}}</text>
												<text style="font-size:125%" @click.stop="perfect(item.post.id,index)" :class="'cuIcon-appreciatefill margin-lr-xs '+(item.isPraise?'text-red':'') ">{{item.praiseNumber}}</text>
												<text style="font-size:125%" class="cuIcon-messagefill margin-lr-xs">{{item.replyNumber}}</text>
											</view>
											</view>
										</view>
										
									</view>
								</view>
							</view>
						</view>
						
					
					
					
					
					
				</van-tab>
				<van-tab title="拾物寻主">
					<view class="popup window " v-if="userstatus" style="margin-top: 5upx;">
						<van-cell title="登录完善信息才能发布帖子,点击完善" is-link @click="goToperfect" position:margin-top />
					</view>
					<view v-for="(item,index) in data" :key="index" style="margin-top: 15upx;">
						<view style="border: #F0FFF0">
							<view class="cu-card dynamic no-card">
								<view class="cu-item shadow">
									<view class="cu-list menu-avatar">
										<view class="cu-item borderLine">
											<view class="cu-avatar round lg" :style="'background-image:url('+item.headPortrait+');'"></view>
											<view class="content flex-sub">
												<view>{{item.nickName}}</view>
												<view class="text-gray text-sm flex justify-between">
													{{item.post.createTime}}
												</view>
											</view>
										</view>
									</view>
									<view @click="goToInfo(item.post.id)">
										
										<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'"  v-if="item.post.image!=null">
											<view class="bg-img isCard?'':'only-img'" :style="'background-image:url('+item.post.image+');'">
											</view>
										</view>
										<view class="text-content" style="margin: 20upx 30upx 10upx ;">
											物品名称:{{item.post.name}}
										</view>
										<view class="text-content" style="margin: 10upx 30upx;">
											物品详情:{{item.post.details}}
										</view>
										<view class="text-gray text-sm text-right padding">
											<text  style="font-size:125%" class="cuIcon-attentionfill margin-lr-xs" >{{item.post.browsePoints}}</text>
											<text style="font-size:125%" @click.stop="perfect(item.post.id,index)" :class="'cuIcon-appreciatefill margin-lr-xs '+(item.isPraise?'text-red':'') " >{{item.praiseNumber}}</text>
											<text style="font-size:125%" class="cuIcon-messagefill margin-lr-xs">{{item.replyNumber}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
<!-- <view style="margin-bottom: 20upx; margin-top: 20upx;" v-if="reachbto1">
						<text style="font-size:140%" class="cuIcon-emoji align-center kong">到底了</text>
					</view> -->
				</van-tab>
			</van-tabs>
			</view>
			</load-refresh>
		</view>
	</view>
</template>

<script>
	import loadRefresh from '../../components/load-refresh/load-refresh.vue'
	// import clMessage from '../../cool/ui/components/message/message.vue'
	
	export default { 
		components:{loadRefresh},
		data() {
			return {
				data: [],
				active: 'home',
				cardCur: 0,
				awatar: "",
				rotationChartList: [],
				page: 1,
				pageSize: 5,
				totalPageNo: 0,
				postType: 0,
				count: 0,
				total:0,
				img:[],
				userstatus:false,
				reachbto0:false,
				reachbto1:false, 
				dotStyle:true, 
				// 悬浮菜单的元素的信息
				button:[{
						// opnetype 是可以调用小程序自带的api
					    //openType: 'getUserInfo',
					    label: '用户',
						icon:"user.png"
					},
					{
					    //openType: 'share',
					    label: '消息',
						icon:"message.png"
					    //icon,
					},
					{
					    //openType: 'contact',
					    label: '发布',
						icon:"announce.png"
					    //icon,
					},{
						label:"首页",
						icon:"index.png"
					}     
				]
			}
		},
		methods: {
			onTap() {
				this.$refs["message"].open({
						message: "刷新成功", 
						style: "success",
						top: "200rpx", 
						duration: 1000,
				})
			}, 
			
			loadMore(){
				console.log('loadMore')
				// 请求新数据完成后调用 组件内loadOver()方法
				// 注意更新当前页码 currPage
				this.$refs.loadRefresh.loadOver()
			},
			refresh() {
				this.requestData()
				var that = this
				setTimeout(function (){
					that.onTap()
				},"900");
				
				console.log('refresh');
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			focus: function() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			goToInfo: function(postId) { // 用来跳转到物品的详细信息的页面
				this.$global.setPostId(postId)
				uni.navigateTo({
					url: "/pages/introduction/introduction"
				})
			},
			goToperfect: function() { //用来跳转到信息完善界面
				uni.reLaunch({
					url: '../user/user',
				})
			},
			perfect: function(postId,index) {
				this.$api.praise(postId).then((res) => {
					console.log(this.data)
					this.data[index].isPraise = !this.data[index].isPraise
					if(this.data[index].isPraise){
						this.data[index].praiseNumber++
					}else{
						this.data[index].praiseNumber--
					}	
				})
			},
			isBottom() {
				//检查到是否到最底层
				let page = this.page
				let pageSize = this.pageSize
				let total = this.total
				if (page * pageSize < total) {
					return false
				}
				return true
			},
			requestData() {	//用来重复刷新页面 重复像后端获取数据		
				this.$api.queryPost({ //用来批量获取
					page: 1,
					pageSize: this.pageSize,
					postType: this.postType
				}).then(res => {
					if(res.status===0){
						let data = res.data.data
						this.total = res.data.total
						for (var i = 0; i < data.length; i++) {
							if (data[i].post.image != null) {
								let img = data[i].post.image.split("&&&")
								data[i].post.image = img[0]
							} else {
								data[i].post.image = null
							}
						}
						this.data = data
					}
				})
				this.totalPageNo = this.total%this.pageSize==0?(this.total/this.pageSize):(this.total/this.pageSize+1)
			},
			requestRotationChart() {
				this.$api.getRotationChart(5).then((res) => {
					if (res.status === 0) {
						this.rotationChartList = res.data.map((item) => {
							return {
								id: item.id,
								type: "image",
								url: item.image
							}
						})

					}
					
				})
			},
			onTabChange(e) {
				this.postType = e.detail.name
				this.requestData()
			},
			
			
			// 悬浮菜单的调用的方法
			onClick:function(e){
				 console.log("click it ")
				 console.log(e)
				 let index = e.detail.index
				 // 获得点击按钮
				 console.log(index)
				 if (index === 0){user
					 uni.switchTab ({
					 	url:"../user/user",
						success: (res) => {
							console.log("")
						}
					 })
				 }else if(index === 1){
					 uni.switchTab({
					 	url:"../message/message",
							success: (res) => {
								console.log("announce")
							}
					 })
				 }else if(index === 2){
					 uni.switchTab({
					 	url:"../announce/announce",
							success: (res) => {
								console.log("user")
							}
					 })
				 }else if(index === 3){
					 uni.switchTab({
					 	url:"../index/index",
							success: (res) => {
								console.log("index")
							}
						})
				 }
			}
		},
		created() {
			this.requestData()
			this.requestRotationChart()
			this.$api.getUserInfo().then(res =>{
				if(res.data.status == 2){
					this.userstatus=true
				}
				else if(res.data.status==3){
					this.userstatus=true
				}else{
					this.userstatus=false
				}
			})
		},

		onReachBottom() {
		
			if (this.isBottom()) {
				uni.showToast({title:"到底了", icon:"none"});
				return
			}
			wx.showLoading({
				title:'玩命加载中',
			})
			this.page += 1
			this.$api.queryPost({ //用来批量获取
				page: this.page,
				pageSize: this.pageSize,
				postType: this.postType
			}).then(res => {
				if(res.status===0){
					let data = res.data.data
					for (var i = 0; i < data.length; i++) {
						if (data[i].post.image != null) {
							let img = data[i].post.image.split("&&&")
							data[i].post.image = img[0]
						} else {
							data[i].post.image = null
						}
					}
					this.data = this.data.concat(data)
				}
				wx.hideLoading()
			})
		}, 
		/* onLoad:function(options){
			this.requestData()
			setTimeout(function () {
			            console.log('start pulldown');
			        }, 1000);
			        uni.startPullDownRefresh();
		}, 
		onPullDownRefresh() {
		        console.log('refresh');
						this.requestData()
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
						
		    } */

	}
</script>
<style>
	.borderLine {
		border-bottom: none;
	}
	.kong{
		
		 display:flex;                   
		 justify-content: center;        
		 align-items:center;
		  }
</style>
