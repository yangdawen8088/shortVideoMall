<template>
	<view class="goodsmodify bg-gradual-pink" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar " style="position: fixed;z-index: 1;width: 100%;">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				录入商品
			</view>
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-top: 100upx;">
			<view class="cu-list menu sm-border solid-bottom text-white" style="border-color: white;margin-top: 0;" >
				
				<view class="cu-item">
					
					<textarea maxlength="-1" placeholder="请输入商品标题" v-model="title" style="height: 200upx;width: 100%;color: white;font-size: 40upx;"></textarea>
					
				</view>
				<view class="cu-item" >
					<view class="content">
						
						<text class="text-white">店名</text>
					</view>
					<view class="action">
						<input placeholder="输入店名/品牌" style="color: white;"  v-model="seller"></input>
					</view>
				</view>
			
				<view class="cu-item arrow" >
					<view class="content">
						<text class="text-white">消费方式</text>
					</view>
					<view class="action">
						<picker v-model="takeType" :range="['门店消费','邮寄配送', '免邮配送']" @change="setTakeType">
							<view class="picker">
								{{['门店消费','邮寄配送', '免邮配送'][takeType]}}
							</view>
						</picker>
					</view>
				</view>
				<view v-if="takeType == 1" class="cu-item" >
					<view class="content">
						
						<text class="text-white">邮费</text>
					</view>
					<view class="action">
						<input placeholder="输入邮寄费用" type="digit" style="color: white;"  v-model="postFee"></input>
					</view>
				</view>
				
				<view class="cu-item arrow" >
					<view class="content">
						<text class="text-white">商品分类</text>
					</view>
					<view class="action">
						<picker mode="multiSelector" @change="setCategory" @columnchange="categoryChange" :value="categoryIndex" :range="categoryArray">
							<view class="picker">
								{{categoryLabel}}
							</view>
						</picker>
					</view>
				</view>
			
				<view v-for="(style,index) in stylelist" :key="index" class="cu-item arrow" @tap="addStyle" :data-index="index" >
					<view class="content">
						<text class="text-white">{{style.styleName}}</text>
					</view>
					<view class="action">
						<text class="text-white text-sm">{{style.promotePrice?('促销¥'+style.promotePrice):('¥'+style.goodsPrice)}}</text>
					</view>
				</view>
				
				<view class="padding flex flex-direction">
					<button class="cu-btn block line-white lg" @tap="addStyle">
						<text class="cuIcon-add"></text>
						添加规格
					</button>
				</view>
				
				<view class="cu-item arrow" @tap="chooseLocation">
					<view class="content">
						<text class="text-white">地理位置</text>
					</view>
					<view class="action">
						<text class="text-white text-sm">{{locationName}}</text>
					</view>
				</view>
				
				<view class="cu-item arrow" @tap="addDetail">
					<view class="content">
						<text class="text-white">编辑商品详情</text>
					</view>
					<view class="action">
						<text class="text-white text-sm">
							{{detaillist.length>0?'已编辑':'未编辑'}}
						</text>
					</view>
				</view>
				
				<view class="cu-item arrow" >
					<view class="content">
						<text class="text-white">卖家协议</text>
					</view>
					<view class="action">
						<text class="text-white text-sm">请仔细阅读</text>
					</view>
				</view>
				
				<view class="padding flex flex-direction">
				
					<button @tap="submit"  class="cu-btn bg-red margin-tb-sm lg">提交</button>
					
					<button @tap="del" style="background-color: red;"  class="cu-btn bg-red margin-tb-sm lg">删除</button>
				</view>
			
			</view>
			
		</scroll-view>
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				system:this.systemInfo(),
				title:'',
				seller:'',
				takeType:2,
				categoryArray:[['请选择'],['请选择']],
				categoryIndex:[0,0],
				categoryLabel:'请选择',
				categoryData:[],
				categoryCode:'',
				stylelist:[],
				detaillist:[],
				location:{},
				locationName:'请选择',
				postFee:0,
				goods:{}
			}
		},
		onLoad(option) {
			let goodsid = option.id;
			this.postJson({
				path:'/goods/new/detail',
				data:{
					goodsid:goodsid
				},
				success:(res)=>{
					if("ok" == res.data.status){
						let goods = res.data.data;
						this.goods = goods;
						this.title = goods.title;
						this.seller = goods.seller;
						this.takeType = goods.take_type;
						this.categoryCode = goods.category;
						this.stylelist = goods.style;
						this.detaillist = goods.detail;
						this.location.longitude = goods.lng;
						this.location.latitude = goods.lat;
						this.location.name = goods.location;
						this.location.address = goods.location;
						this.locationName = goods.location;
						this.postFee = goods.post_fee;
						if(this.categoryData.length > 0){
							let find = false;
							for(let x in this.categoryData){
								let category = this.categoryData[x];
								for(let y in category.child){
									let subcategory = category.child[y];
									if(subcategory.key == this.categoryCode){
										this.categoryIndex = [x,y];
										this.categoryLabel = category.name + ' - ' + subcategory.name;
										find = true;
										break;
									}
								}
								if(find){
									break;
								}
							}
						}
					}
				}
			});
			this.postJson({
				path:"/goods/category/query",
				data:{},
				success:(res) => {
					if("ok" == res.data.status){
						this.categoryData = res.data.data;
						this.categoryArray[0] = [];
						for(let x in res.data.data){
							let category = res.data.data[x];
							this.categoryArray[0].push(category.name);
						}
						this.categoryArray[1] = [];
						for(let x in res.data.data[0].child){
							let child = res.data.data[0].child[x];
							this.categoryArray[1].push(child.name);
						}
						this.categoryLabel = this.categoryArray[0][0] + ' - ' + this.categoryArray[1][0];
						
						if(this.categoryCode.length > 0){
							let find = false;
							for(let x in this.categoryData){
								let category = this.categoryData[x];
								for(let y in category.child){
									let subcategory = category.child[y];
									if(subcategory.key == this.categoryCode){
										this.categoryIndex = [x,y];
										this.categoryLabel = category.name + ' - ' + subcategory.name;
										find = true;
										break;
									}
								}
								if(find){
									break;
								}
							}
						}
					}
				}
			});
		},
		onShow() {
			let styleJson = uni.getStorageSync("style");
			if(styleJson){
				console.log(styleJson);
				let style = JSON.parse(styleJson);
				let exist = false;
				for(let x in this.stylelist){
					if(this.stylelist[x].styleName == style.styleName){
						exist = true;
						if(style.delete){
							this.stylelist.splice(x,1);
							
						}else{
							this.stylelist.splice(x,1,style);
						}
						break;
					}
				}
				if(!exist){
					this.stylelist.push(style);
				}
				
			}
			uni.removeStorage({
				key:"style"
			});
			
			let detailJson = uni.getStorageSync("detail");
			if(detailJson){
				console.log(detailJson);
				this.detaillist = JSON.parse(detailJson);
			}
			uni.removeStorage({
				key:"detail"
			});
		},
		methods:{
			addStyle(e){
				let index = e.currentTarget.dataset.index;
				let parameters = '';
				if(index!=null){
					console.log(index);
					parameters +="?";
					let style = this.stylelist[index];
					parameters+='goodsPrice='+style.goodsPrice;
					parameters+='&styleName='+style.styleName;
					if(style.promotePrice){
						parameters+='&promotePrice='+style.promotePrice;
						parameters+='&promoteStarttime='+style.promoteStarttime;
						parameters+='&promoteEndtime='+style.promoteEndtime;
					}
				}
				uni.navigateTo({
					url:"/pages/add/addstyle"+parameters
				});
			},
			addDetail(){
				let parameters = '';
				if(this.detaillist.length>0){
					let detail = JSON.stringify(this.detaillist);
					console.log(detail);
					parameters +="?detail="+detail;
					
				}
				uni.navigateTo({
					url:"/pages/add/adddetail"+parameters
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
			categoryChange(e) {
				let that = this;
				let data = {
					multiArray: this.categoryArray,
					multiIndex: this.categoryIndex,
					multiData: this.categoryData
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:{
						let childlist = data.multiData[e.detail.value].child;
						data.multiArray[1] = [];
						for(let x in childlist){
							let child = childlist[x];
							data.multiArray[1].push(child.name);
						}
						this.categoryArray = data.multiArray;
						this.categoryLabel = this.categoryArray[0][this.categoryIndex[0]] + ' - ' + this.categoryArray[1][this.categoryIndex[1]];
					}
					break;
					case 1:{
						this.categoryLabel = this.categoryArray[0][this.categoryIndex[0]] + ' - ' + this.categoryArray[1][this.categoryIndex[1]];
					}
					break;
				}
			},
			setCategory(e){
				this.categoryIndex = e.detail.value;
			},
			submit(){
				if(this.title.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:'请输入标题'
					});
					return;
				}
				if(this.seller.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:'请输入店名'
					});
					return;
				}
				if(this.seller.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:'请输入店名'
					});
					return;
				}
				if(this.stylelist.length<=0){
					uni.showToast({
						icon:'none',
						title:'请添加商品规格'
					});
					return;
				}
				if(this.seller.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:'请输入店名'
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
				if(this.detaillist.length <= 0){
					uni.showToast({
						icon:'none',
						title:'请编辑商品详情'
					});
					return;
				}
				
				var data = {};
				data.title = this.title;
				data.seller = this.seller;
				data.location = this.location.longitude+","+this.location.latitude;
				data.takeType = this.takeType;
				data.category = this.categoryData[this.categoryIndex[0]].child[this.categoryIndex[1]].key;
				data.goodsDetail = this.detaillist;
				data.goodsStyle = this.stylelist;
				data.postFee = this.postFee;
				data.code = this.goods.code;
				
				uni.showLoading({
					title:"加载中",
					mask:true
				});
				this.postJson({
					path:"/goods/new/modify",
					data:data,
					success:(res) => {
						if("ok" == res.data.status){
							
							uni.navigateBack({
								
							});
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg
							});
						}
					},
					complete:()=>{
						uni.hideLoading();
					}
				})
				
			},
			del(){
				uni.showLoading({
					title:"加载中",
					mask:true
				});
				this.postJson({
					path:"/goods/new/delete",
					data:{
						code: this.goods.code
					},
					success:(res) => {
						if("ok" == res.data.status){
							
							uni.navigateBack({
								
							});
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg
							});
						}
					},
					complete:()=>{
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
.goodsmodify .cu-list.menu>.cu-item{
	background-color: rgba(0,0,0,0);
}
.goodsmodify .cu-item input{
	
	color: white;
}
.goodsmodify .cu-list.menu>.cu-item.arrow:before {
	color: white;
}
</style>
