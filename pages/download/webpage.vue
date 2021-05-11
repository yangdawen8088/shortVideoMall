<template>
	<web-view :src="url" style="position: fixed;width:750upx;" :style="[{height:system.windowHeight+'px'}]"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				system:{},
				url:''
			}
		},
		mounted(){
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.model);
					console.log(res.pixelRatio);
					console.log(res.windowWidth);
					console.log(res.windowHeight);
					console.log(res.language);
					console.log(res.version);
					console.log(res.platform);
					this.system = res;
					
				}
			});
		},
		onLoad(option) {
			this.url = decodeURIComponent(option.url);
		}
	}
</script>

<style>
</style>
