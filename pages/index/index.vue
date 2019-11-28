<template>
	<view>
		<view>
			<van-search value="" placeholder="请输入搜索关键词" @focus="focus" />
		</view>
		<view>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<van-tabs @click="onClick">  
				<van-tab title="失物寻物">
					<view style="border: #F0FFF0">
						<view class="cu-card dynamic isCard?'no-card':''">
							<view class="cu-item shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);" ></view>
										<view class="content flex-sub">
											<view>小麻</view>
											<view class="text-gray text-sm flex justify-between">
												2019年12月3日
											</view>
										</view>
									</view>
								</view>
								<!-- <view @click="getToinfo()"> -->
									<view class="text-content">
										{{name}}
									</view>
									<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'">
										<view class="bg-img isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
										</view>
									</view>
								<!-- </view>	 -->						
								<view class="text-gray text-sm text-right padding">
								      <text class="cuIcon-attentionfill margin-lr-xs" @click="add1()">{{browser}}</text> 
								      <text class="cuIcon-appreciatefill margin-lr-xs" @click="add2()">{{likenum}}</text>
								      <text class="cuIcon-messagefill margin-lr-xs" @click="add3()">{{reply}}</text>
								</view>
							</view>
						</view>
					</view>
				</van-tab>
				<van-tab title="拾物寻主">
					<view style="border: #F0FFF0">
						<view class="cu-card dynamic isCard?'no-card':''">
							<view class="cu-item shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
										<view class="content flex-sub">
											<view>小黃</view>
											<view class="text-gray text-sm flex justify-between">
												2019年11月3日
											</view>
										</view>
									</view>
								</view>
								<!-- <view  @click="getToinfo()"> -->
									<view class="text-content">
										折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
									</view>
									<view class="grid flex-sub padding-lr isCard?'col-3 grid-square':'col-1'">
										<view class="bg-img isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
										</view>
									</view>
								<!-- </view> -->							
								<view class="text-gray text-sm text-right padding">
								      <text class="cuIcon-attentionfill margin-lr-xs" @click="add1()">{{browser}}</text>
								      <text class="cuIcon-appreciatefill margin-lr-xs" @click="add2()">{{likenum}}</text>
								      <text class="cuIcon-messagefill margin-lr-xs" @click="add3()">{{reply}}</text>
								</view>
							</view>
						</view>
					</view>
				</van-tab>
			</van-tabs>
		</view>
		<!--<div class="dialog">
		      <div class="dialog-cover back"  v-if="isShow"  @click="closeMyself"></div>
		      <transition name="drop">
		        <div class="dialog-content" :style="{top:topDistance+'%',width:widNum+'%',left:leftSite+'%'}"  v-if="isShow">
		          <div class="dialog_head back">
		              <slot name="header">提示信息</slot>
		          </div>
		          <div class="dialog_main" :style="{paddingTop:pdt+'px',paddingBottom:pdb+'px'}">
		            <slot name="main">弹窗内容</slot>
		          </div>
		          <div  class="foot_close" @click="closeMyself">
		              <div class="close_img back"></div>
		          </div>
		        </div>
		    </transition>
		  </div>-->
		<view class="popup window">
			<van-cell title="完善信息才能发布帖子,点击完善" is-link @click="getToperfect"  position:margin-top/>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 'home',
				cardCur: 0,
				
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/images/test1.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				browser:"0",
				likenum:"0",
				reply:"0",
				name:"嘿嘿嘿"
			}
		},
		methods: {
			focus: function() {
				uni.redirectTo({
					url: "/pages/search/search"
				})
			},
			onClick: function() {

			},
			getToinfo:function(){  // 用来跳转到物品的详细信息的页面
				uni.navigateTo({
					url:"/pages/introduction/introduction"
				})
			},
			getToperfect:function(){//用来跳转到信息完善界面
			   uni.navigateTo({
					url:"/pages/perfect/perfect"
				})
			},
			perfect:function(){
				
				// if(status==2||3)({
				// 	show="true"
				// })
			},
			add1:function(){
				this.browser++;
			},
			add2:function(){
				this.likenum++;
			},
			add3:function(){
				this.reply++;
			},
			requestData(){
				this.$api.getPost({   //用来获取
					id:"1"
				}).then(
					res=>{
						this.name = res.data.details
						console.log(res)
					}
				)
			}
		},
		created(){
			this.requestData()
		}
	}
</script>
<style>
	/* .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100rpx - 150rpx);
		z-index: var(--index);
	} */
	
	 // 最外层 设置position定位 
	  .dialog {
	    position: relative;
	    color: #2e2c2d;
	    font-size: 16px;
		show:true;
		
	  }
	  // 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
	  .dialog-cover {
	    background: rgba(0,0,0, 0.8);
	    position: fixed;
	    z-index: 200;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	  }
	  // 内容层 z-index要比遮罩大，否则会被遮盖，
	  .dialog-content{
	    position: fixed;
	    top: 35%;
	    // 移动端使用felx布局 
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    z-index: 300;
	 }
	
</style>
