<template>
	<view class="bg-gradual-pink" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar " style="position: fixed;z-index: 1;width: 100%;">
			<view class="action" @tap="close">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				推荐好物
			</view>
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-top: 100upx;">
		<view class="cu-list menu bg-white">
			<view class="grid text-center col-1">
				<view v-if="goods.goodsTitle==null" class="padding-xl solids-bottom" @tap="selectGoods" >
					<text class="cuIcon-add " style="font-size: 140upx;display: block;line-height: 0.8;">
						
					</text>
					<text>添加商品</text>
				</view>
				
				<view v-if="goods.goodsTitle!=null" @tap="editgoods" class="cu-item order text-left">
					<view class="cu-avatar radius" v-bind:style="{backgroundImage:'url('+goods.goodsImg+')'}">
						
					</view>
					<view class="content">
						
						<view class="text-grey goods-title">{{goods.goodsTitle}}</view>
						<view class="text-gray text-sm goods-seller">
							<text class="">
								<text class="cuIcon-shop text-red  margin-right-xs"></text>
								{{goods.goodsSeller}}
								<text class="fr">{{goods.goodsArea}}</text>
							</text> 
							
						</view>
						<view class="goods-action">
							<text class="text-price text-red text-lg" style="font-size: 40upx;">{{goods.goodsPrice}}</text>
							
							
						</view>
					</view>
					
				</view>
				
				<view v-if="videoPath == ''" class="padding-xl solids-bottom" @tap="selectVideo">
					<text class="cuIcon-add " style="font-size: 140upx;display: block;line-height: 0.8;">
						
					</text>
					<text>上传短视频</text>
				</view>
				<view v-if="videoPath != ''" class="solids-bottom">
					<video @tap="reselectVideo" :src="videoPath" style="height: 500upx;width: 100%;" objectFit="contain"></video>
				</view>
			</view>
			<view class="padding solid-bottom">
				<textarea v-model="videodesc" class="text-xl" maxlength="-1" placeholder="请输入推荐理由" style="height: 500upx;width: 100%;" ></textarea>
			</view>
			<view class="cu-item arrow" @tap="chooseLocation" >
				<view class="content">
					<text class="">地理位置</text>
				</view>
				<view class="action">
					<text class=" text-sm">{{locationName}}</text>
				</view>
			</view>
		</view>
		
		<view class="padding flex flex-direction">
			<view class="text-yellow text-sm">工作人员将在24小时之内审核处理</view>
			<button @tap="submit"  class="cu-btn bg-pink margin-tb-sm lg">发布</button>
		</view>
		
		
		<view v-if="select" class="cu-modal bottom-modal show">
			<view style="position: absolute;width: 100%;height: 100%;top: 0;" @tap="hideModal"></view>
			<view class="cu-dialog bg-gradual-pink" style="padding: 40upx 0;">
				
				<view class="cu-list grid col-4 no-border" style="background: none;">
					<view class="cu-item" @tap="newgoods">
						<view class="cuIcon-add" style="font-size: 80upx;">
							
						</view>
						<text class="text-white" style="color: white;">录入商品</text>
					</view>
					<view class="cu-item" @tap="goodslist" data-type="2">
						<view class="cuIcon-apps" style="font-size: 80upx;">
							
						</view>
						<text style="color: white;">已录入</text>
					</view>
					<view class="cu-item" @tap="goodslist" data-type="3">
						<view class="cuIcon-order" style="font-size: 80upx;">
							
						</view>
						<text style="color: white;">我买过的</text>
					</view>
					<view class="cu-item" @tap="goodslist" data-type="4">
						<view class="cuIcon-choiceness" style="font-size: 80upx;">
							
						</view>
						<text style="color: white;">历史选择</text>
					</view>
				</view>
				
			</view>
		</view>
		
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				system:this.systemInfo(),
				location:{},
				locationName:'请选择',
				select:false,
				videoPath:'',
				goods:{},
				videodesc:'',
				video:{}
			}
		},
		onShow() {
			let goodsJson = uni.getStorageSync("goods");
			if(goodsJson){
				this.goods = JSON.parse(goodsJson);
				uni.removeStorage({
					key:'goods'
				});
			}
			
			let videoJson = uni.getStorageSync("video");
			if(videoJson){
				let video = JSON.parse(videoJson);
				this.videoPath = video.video_url;
				this.videodesc = video.video_desc;
				this.locationName = video.location_name;
				this.location = {
					name:video.location_name,
					address:video.location_address,
					latitude:video.location_lat,
					longitude:video.location_lng
				};
				uni.removeStorage({
					key:'video'
				});
				this.video = video;
				
				let goodsid = video.goodsid;
				this.postJson({
					path:'/goods/new/detail',
					data:{
						goodsid:goodsid
					},
					success:(res)=>{
						if("ok" == res.data.status){
							this.goods = res.data.data;
							this.goods.goodsImg = this.goods.img_title;
							this.goods.goodsTitle = this.goods.title;
							this.goods.goodsSeller = this.goods.seller;
							this.goods.goodsArea = this.goods.area;
							this.goods.goodsPrice = this.goods.price;
							console.log(this.goods);
						}
					}
				});
			}
			
		},
		methods: {
			editgoods(e){
				uni.navigateTo({
					url:"goodsmodify?id="+this.goods.id
				});
			},
			close(){
				uni.navigateBack({
					
				});
			},
			chooseLocation(){
				uni.chooseLocation({
					success: (res) =>  {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						this.location = res;
						this.locationName = res.name;
					}
				});
			},
			selectGoods(){
				this.select = true;
			},
			hideModal(){
				this.select = false;
			},
			selectVideo(){
				uni.chooseVideo({
					success:(res) => {
						this.videoPath = res.tempFilePath;
					}
				})
			},
			reselectVideo(){
				uni.showActionSheet({
					itemList: ['重新选择'],
					success: (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						
							this.selectVideo();
						
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			newgoods(){
				uni.navigateTo({
					url:'/pages/add/addform',
					success:() => {
						this.hideModal();
					}
				})
			},
			goodslist(e){
				let type = e.currentTarget.dataset.type;
				uni.navigateTo({
					url:'/pages/add/goodslist?type='+type,
					success:()=>{
						this.hideModal();
					}
				})
			},
			submit(){
				if(!this.goods.goodsTitle){
					uni.showToast({
						icon:'none',
						title:'请选择商品'
					});
					return;
				}
				
				if(this.videoPath.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:'请上传短视频'
					});
					return;
				}
				if(this.videodesc.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:'请填写推荐理由'
					});
					return;
				}
				if(!this.location.name){
					uni.showToast({
						icon:'none',
						title:'请选择地理位置'
					});
					return;
				}
				uni.showLoading({
					title:"发布中",
					mask:true
				});
				if(this.videoPath.startsWith("http")){
					let url = this.videoPath;
					let data = {};
					data.videopath = url;
					data.goodsid = this.goods.id;
					data.goodsimg = this.goods.goodsImg;
					data.goodsplatform = this.goods.platform;
					data.goodstitle = this.goods.goodsTitle;
					data.goodsprice = this.goods.goodsPrice;
					data.goodsnick = this.goods.goodsSeller;
					data.goodsarea = this.goods.goodsArea;
					data.goodsurl = this.goods.url;
					data.videodesc = this.videodesc;
					data.locationname = this.location.name;
					data.locationaddr = this.location.address;
					data.locationlat = this.location.latitude;
					data.locationlng = this.location.longitude;
					data.coverImgUrl = this.video.cover_img_url;
					data.id = this.video.id;
					
					this.postJson({
						path: '/video/modify',
						data:data,
						success:(res) => {
							if("ok" == res.data.status){
								uni.navigateBack({
									
								});
							}else{
								uni.showToast({
									icon:'none',
									title:data.msg
								});
							}
						},
						complete: ()=> {
							uni.hideLoading();
						}
					});
				}else{
				uni.uploadFile({
					url: 'http://www.dpsoft.top/upload.jsp', 
					filePath: this.videoPath,
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
						let data = JSON.parse(uploadFileRes.data);
						if("ok" == data.status){
							let webpathSuffix = data.data;
							let url = "http://www.dpsoft.top/"+webpathSuffix;
							let data = {};
							data.videopath = url;
							data.goodsid = this.goods.id;
							data.goodsimg = this.goods.goodsImg;
							data.goodsplatform = this.goods.platform;
							data.goodstitle = this.goods.goodsTitle;
							data.goodsprice = this.goods.goodsPrice;
							data.goodsnick = this.goods.goodsSeller;
							data.goodsarea = this.goods.goodsArea;
							data.goodsurl = this.goods.url;
							data.videodesc = this.videodesc;
							data.locationname = this.location.name;
							data.locationaddr = this.location.address;
							data.locationlat = this.location.latitude;
							data.locationlng = this.location.longitude;
							data.coverImgUrl = this.goods.goodsImg;
							data.id = this.video.id;
							this.postJson({
								path: '/video/modify',
								data:data,
								success:(res) => {
									if("ok" == res.data.status){
										uni.navigateBack({
											
										});
									}else{
										uni.showToast({
											icon:'none',
											title:data.msg
										});
									}
								},
								complete: ()=> {
									uni.hideLoading();
								}
							});
							
						}else{
							uni.hideLoading();
							uni.showToast({
								icon:'none',
								title:data.msg
							});
						}
						
					},
					fail: (e)=> {
						uni.hideLoading();
					}
				});
				}
			}
		}
	}
</script>

<style>
.cu-list .cu-item.order{
	height: 220upx;
	padding: 10upx;
}
.cu-list .cu-item.order .cu-avatar{
	width: 200upx;
	height: 200upx;
	left: 0upx;
	background-size: cover;
	background-position: center;
	align-items: center;
	
}

.cu-list .cu-item.order .content{
	left: 10upx;
	width: 520upx;
	height:200upx;
	position: relative;
	display: inline-block;
	vertical-align: middle;
}
.cu-list .cu-item.order .content .goods-title{
	height:100upx;
	align-items: flex-start;
	overflow: hidden;
}
.cu-list .cu-item.order .content .goods-seller{
	height:50upx;
	align-items: flex-end;
}
.cu-list .cu-item.order .content .goods-action{
	height:50upx;
	align-items: flex-end;
}
</style>
