<template>
		<view class="detail bg-gradual-pink" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
			<view class="cu-bar " style="position: fixed;z-index: 1;width: 100%;">
				<view class="action" @tap="back">
					<text class="cuIcon-back"></text>
				</view>
				<view class="content text-bold">
					商品详情
				</view>
			</view>
			<scroll-view class="scroll" scroll-y="true" style="width: 100%;height: 100%;padding: 100upx 0;">
				
				<block v-for="(detail,index) in detaillist" :key="index" >
					
					<view class="flex flex-direction solid-bottom bg-white" >
						
						<button class="cu-btn block line-grey lg" @tap="adddetail" :data-index="index">
							<text class="cuIcon-add"></text>
							添加图片或文本描述
						</button>
					
					</view>
					<view v-if="detail.type == 'image'" class=" flex flex-direction solid-bottom" style="padding: 0 30upx;background-color: white;" >
						<image @tap="editImage" :data-index="index" :src="detail.value" v-bind:id="'goodsimg'+index" @load="goodsImageLoad"  v-bind:style="{height:(goodsImages['goodsimg'+index]?goodsImages['goodsimg'+index].height : goodsImgHeightInit)+'px'}"></image>
					</view>
					<view v-if="detail.type == 'text'" class=" flex flex-direction solid-bottom bg-white text-black" style="padding: 0 30upx;" >
						<textarea @focus="editText" :data-index="index" @blur="editFinish" maxlength="-1" placeholder="请输入商品描述"></textarea>
					</view>
				</block>
				
				<view  class=" flex flex-direction bg-white">
					<button class="cu-btn block line-grey lg" @tap="adddetail" >
						<text class="cuIcon-add"></text>
						添加图片或文本描述
					</button>
				</view>
				
			</scroll-view>
			
			<view class="cu-bar bg-white tabbar border shop fixed " style="top: unset;bottom: 0;z-index: 100;">
				
				<view @tap="submit" class="flex-sub bg-pink submit">保存</view>
				
			</view>	
			
		</view>
</template>

<script>
	
	export default {
		data(){
			return {
				system:this.systemInfo(),
				goodsImages:{},
				goodsImgHeightInit:300,
				detaillist:[],
				editIndex:-1
			}
		},
		onShow() {
			let detailJson = uni.getStorageSync("detail");
			if(detailJson){
				console.log(detailJson);
				this.detaillist = JSON.parse(detailJson);
			}
			uni.removeStorage({
				key:"detail"
			});
		},
		onLoad(option) {
			let detailJson = option.detail;
			if(detailJson){
				this.detaillist = JSON.parse(detailJson);
			}
		},
		methods:{
			adddetail(e){
				let index = e.currentTarget.dataset.index;
				
				uni.showActionSheet({
					itemList: ['图片', '文本'],
					success: (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						
						if(res.tapIndex == 0){
							uni.chooseImage({
								count: 1, //默认9
								sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: (res) => {
									console.log(JSON.stringify(res.tempFilePaths));
									
									uni.showLoading({
										title:"加载中"
									});
									this.loading = true;
									uni.uploadFile({
										url: 'https://www.dpsoft.top/upload.jsp', 
										filePath: res.tempFilePaths[0],
										name: 'file',
										
										success: (uploadFileRes) => {
											console.log(uploadFileRes.data);
											let data = JSON.parse(uploadFileRes.data);
											if("ok" == data.status){
												let webpathSuffix = data.data;
												let url = "http://www.dpsoft.top/"+webpathSuffix;
												let detail = {};
												detail.type = 'image';
												detail.value = url;
												if(index != null){
													this.detaillist.splice(index,0,detail);
												}else{
													this.detaillist.push(detail);
												}
											}
											
										},
										complete: ()=> {
											uni.hideLoading();
										}
									});
									
								}
							});
						}
						if(res.tapIndex == 1){
							let detail = {};
							detail.type = 'text';
							detail.value = '';
							if(index != null){
								this.detaillist.splice(index,0,detail);
							}else{
								this.detaillist.push(detail);
							}
						}
						
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},
			editText(e){
				let index = e.currentTarget.dataset.index;
				if(this.editIndex != index){
					uni.showActionSheet({
						itemList: ['编辑', '删除'],
						success: (res) => {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
							if(0 == res.tapIndex){
								this.editIndex = index;
							}
							if(1 == res.tapIndex){
								this.detaillist.splice(index, 1);
							}
						}
					});
				}
				
				
				
			},
			editFinish(){
				this.editIndex = -1;
			},
			editImage(e){
				let index = e.currentTarget.dataset.index;
				uni.showActionSheet({
					itemList: ['删除'],
					success: (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						
						if(0 == res.tapIndex){
							this.detaillist.splice(index, 1);
						}
					}
				});
			},
			goodsImageLoad:function(e){
				
				let imgId = e.target.id;
				let height = e.target.height;
				let width = e.target.width;
				let imgWidth = (750-60)*this.system.windowWidth/750;
				let imgHeight = height * imgWidth / width;
				
				this.goodsImages[imgId] = {
					width:imgWidth,
					height:imgHeight
				};
				this.goodsImgHeightInit = imgHeight;
				
				
			},
			submit(){
				if(this.detaillist.length<=0){
					uni.showToast({
						icon:'none',
						title:'您还没有添加详情'
					});
					return;
				}
				uni.setStorageSync("detail", JSON.stringify(this.detaillist));
				uni.navigateBack({
					
				});
			}
		}
	}
	
</script>

<style>
	
	.detail .scroll {
		
	}
	.detail .scroll textarea{
		font-size: 34upx;
		height: 200upx;
		width: 100%;
		padding: 20upx 0 ;
	}
	.detail .scroll image{
		
		width: 100%;
	}
</style>
