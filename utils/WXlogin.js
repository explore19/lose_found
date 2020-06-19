import api from 'utils/api.js'

const WXlogin = {}

WXlogin.wxlogin = () => {
	var that = this
	 wx.login({
		success: (res) => {
		api.login(res.code).then((res)=>{
			if(res.status===0){
				api.getUserInfo().then((res)=>{
					uni.switchTab({
						url: "/pages/index/index"
					})
				})
			}
		})
		}
	})
}

export default WXlogin