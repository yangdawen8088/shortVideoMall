<template>
	<view class="content bg-gradual-black" style="position: fixed;width: 100%;height: 100%;">
		<scroll-view scroll-y="true"   style="position: fixed; padding-top: 0;padding-bottom: 0;width: 100%;height: 100%;">
			<view class="flex flex-direction text-center">
				<view class="flex-sub padding-xl">
					<image style="width: 400upx;height: 142upx;" src="../../static/img/logofull.png"></image>
				</view>
				<!--view class="flex-sub text-bold " style="font-size: 50upx;">
					<text>
						短视频社交购物APP
					</text>
				</view-->
				<view class="flex-sub text-xl">
					<text style="color: #e3c77f;">
						优质 ● 创意 ● 轻奢
					</text>
				</view>
				<view class="flex-sub padding-xl">
					
						<button @tap="download" class="cu-btn round text-bold shadow text-xl" style="width: 80%;height: 80upx;background-color: #e3c77f;color: #222222;" >下载客户端</button>
					
				</view>
				
				<view class="flex-sub padding-xl">
					
					<image :src="'http://www.dpsoft.top/image_miniqrcode.jsp?videoId='+videoId" style="width: 400upx;height: 400upx;border-radius: 200upx;"></image>
					<text style="display: block;color: gray;">
						长按识别小程序
					</text>
				</view>
				
				<view class="flex-sub padding-xl">
					
					<image :src="'http://www.dpsoft.top/goodshowres/wx_qrcode.jpg'" style="width: 400upx;height: 400upx;"></image>
					<text style="display: block;color: gray;">
						关注好物动态
					</text>
				</view>
				
				
			</view>
			<!-- #ifdef H5 -->
			<view class="text-center" style="color: gray;">
				<text @tap="tomain" class="text-center">>>>访问触屏版<<<</text>
			</view>
			<!-- #endif -->
			<view class="text-center padding" style="position: relative;left: 0; bottom: 0;top: unset;width: 100%;z-index: 100;color: gray;">
				<text class="text-center text-sm">2019 © 好物短视频  | 地帕（杭州）网络科技有限公司</text>
			</view>
		
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				system:this.systemInfo(),
				videoId:''
			}
		},
		onLoad(option){
			this.videoId = option.videoId;
			window.open('goodshow://video/'+this.videoId);
		},
		methods: {
			download(){
				if(this.system.platform == 'ios'){
					window.location.href ="https://www.dpsoft.top/openapp.jsp?videoId"+this.videoId;
				}else{
					window.location.href ="https://www.dpsoft.top/download.jsp";
				}
			},
			tomain(){
				uni.switchTab({
					url:"/pages/video/main?scene="+this.videoId
				});
			}
		}
	}
</script>

<style>
.content{
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}
</style>
