<template>
	<view class="userorderlist bg-gradual-pink" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		
		
		<view class="cu-bar " style="position: fixed;z-index: 1;width: 100%;background-color: rgba(224,57,151,0);">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				订单详情
			</view>
		</view>
		<scroll-view scroll-x class="nav text-center" style="position: fixed;z-index: 1;width: 100%;background-color: rgba(224,57,151,0);top:100upx;" v-bind:style="{marginTop:system.statusBarHeight+'px'}">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="listType==1?'text-white cur':''"   @tap="tabSelect" :data-id="1">
					待发货
				</view>
				<view class="cu-item flex-sub" :class="listType==2?'text-white cur':''"  @tap="tabSelect" :data-id="2">
					待确认
				</view>
				<view class="cu-item flex-sub" :class="listType==4?'text-white cur':''"  @tap="tabSelect" :data-id="4">
					退货
				</view>
				<view class="cu-item flex-sub" :class="listType==3?'text-white cur':''"  @tap="tabSelect" :data-id="3">
					已完成
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-top: 190upx;" >
		<view v-for="(goods,index) in goodslist" :key="index"  class="cu-list menu-avatar">
				<view class="cu-item" @tap="toPage('/pages/order/order?code='+goods.code)">
					<view class="cu-avatar radius" v-bind:style="{backgroundImage:'url('+goods.goodsImg+')'}">
						<text class="goods-status">
							{{goods.stateLabel}}
						</text>
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
							<button @tap="contactBuyer" :data-index="index" class="cu-btn round line-red lines-red fr" style="height: 45upx;" >联系买家</button>
							
						</view>
					</view>
					
				</view>
				<view class="bg-white text-gray goods-memo">
					备注:{{goods.task_require}}
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
				user:this.getUserInfo(),
				listType:1,
				goodslist:[]
			}
		},
		onLoad(option) {
			console.log(option);
			
			
			this.postJson({
				path:"/seller/order/list",
				data:{
					uid:this.user.uid,
					listType:this.listType
				},
				success:(res) => {
					if("ok" == res.data.status){
						this.goodslist = res.data.data;
						for(let x in this.goodslist){
							this.goodslist[x].stateLabel = this.getStateLabel(this.goodslist[x].status);
						}
					}
				}
			});
			
		},
		methods: {
			tabSelect:function(e){
				
				uni.showLoading({
					title:"加载中",
					mask:true
				});
				let index = e.currentTarget.dataset.id;
				this.postJson({
					path:"/seller/order/list",
					data:{
						uid:this.user.uid,
						listType:index
					},
					success:(res) => {
						uni.hideLoading();
						if("ok" == res.data.status){
							this.goodslist = res.data.data;
							this.listType = index;
						}
					}
				});
			},
			contactBuyer:function(e){
				let index = e.currentTarget.dataset.index;
				let order = this.goodslist[index];
				uni.makePhoneCall({
					phoneNumber:this.order.phone
				});
			},
			getStateLabel:function(state){
				console.log("getStateLabel,state="+state+",type="+typeof(state));
				if(this.listType == 4){
					switch (state) {
						case 0:
						{
							return "退货申请";
						}
							break;
						case 1:
						{
							return "已退货";
						}
							break;
						case 2:
						{
							return "拒绝退货";
						}
							break;
							
						default:
							break;
					}
				}else{
					switch (state) {
						case 0:
						{
							return "待付款";
						}
							break;
						case 1:
						{
							return "待发货";
						}
							break;
						case 2:
						{
						   return "待确认";
						}
							break;
						case 3:
						{
							
							return "已完成";
						}
							break;
						case 4:
						{
							return "已退货";
						}
							break;
						case 5:
						{
							return "已取消";
						}
							break;
						default:
							break;
					}
				}
				
				return "";
			}
		}
	}
</script>

<style>
.userorderlist .cu-list.menu-avatar{
	margin-top: 5upx;
}
.userorderlist .cu-list.menu-avatar .cu-item{
	height: 220upx;
}
.userorderlist .cu-list.menu-avatar .cu-item .cu-avatar{
	width: 200upx;
	height: 200upx;
	left: 10upx;
	background-size: cover;
	background-position: center;
	align-items: center;
	
}
.userorderlist .cu-list.menu-avatar .cu-item .cu-avatar .goods-status{
	background-color: rgba(100,100,100,0.5);
	width: 100%;
	height: 100%;
	align-items: center;
	
	display: grid;
}
.userorderlist .cu-list.menu-avatar .cu-item .content{
	left: 220upx;
	width: 520upx;
	height:200upx;
	
}
.userorderlist .cu-list.menu-avatar .cu-item .content .goods-title{
	height:100upx;
	align-items: flex-start;
	overflow: hidden;
}
.userorderlist .cu-list.menu-avatar .cu-item .content .goods-seller{
	height:50upx;
	align-items: flex-end;
}
.userorderlist .cu-list.menu-avatar .cu-item .content .goods-action{
	height:50upx;
	align-items: flex-end;
}
.userorderlist .cu-list.menu-avatar .goods-memo{
	padding: 10upx;
	
}
.userorderlist .cu-bar .content .cu-item{
	height: auto;
	line-height: normal;
}
</style>
