<script>

	
	export default {
		
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}, 

	}
</script>


<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	// 导入wux-weapp的包内置样式
	@import '/wxcomponents/lib/styles/index.wxss';
	@import "cool/ui/static/css/index.scss";
	
</style>

