<template>
	<view>
	
		<van-loading class="loding" type="spinner" color="blue" vertical >
			<view slots="default" >加载中</view>
		</van-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		created()  {   //生命周期函数
		   wx.login({
		   	success: (res) => {
				wx.request({
					url:"http://localhost:8080/user/login?code="+res.code,
					method:'POST',
					success: (res) => {
						if(res.data.status===0){
							wx.request({
								url: "http://localhost:8080/user/get_user_info",
								method: 'GET',
								success: res => {
									let user = res.data.data
									if(user.status===3){
										wx.getUserInfo({
											success: (res) => {
												
											}
										})
									}
									if(user.status===2){
									 																	
									}
									
								},
								
							});
							
						}
					}
				})
		   	}
		   })
		}
	}
</script>

<style >
.loding{
margin:auto 0;
}
</style>
