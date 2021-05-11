<template>
	<view class="bg-gradual-pink goodslist" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				我的产品
			</view>
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;">
		<view v-for="(goods,index) in goodslist" :key="index"  class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar radius" v-bind:style="{backgroundImage:'url('+goods.goodsImg+')'}"></view>
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
							<button @tap="modify" :data-index="index" class="cu-btn round line-red lines-red fr" style="height: 45upx;" >修改</button>
							
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
				user:this.getUserInfo(),
				goodslist:[]
			}
		},
		onShow() {
			if(this.goodslist.length>0){
				uni.reLaunch({
					url:'/pages/goods/goodslist'
				});
			}
		},
		onLoad(option) {
			
			
			this.postJson({
				path:"/goods/new/list",
				data:{
					
				},
				success:(res) => {
					if("ok" == res.data.status){
						this.goodslist = res.data.data;
					}
				}
			});
			
			
		},
		methods: {
			modify(e){
				let index = e.currentTarget.dataset.index;
				let goods = this.goodslist[index];
				uni.navigateTo({
					url:'/pages/goods/goodsmodify?id='+goods.id
				});
			}
		}
	}
</script>

<style>

.goodslist .cu-list.menu-avatar .cu-item{
	height: 250upx;
}
.goodslist .cu-list.menu-avatar .cu-item .cu-avatar{
	width: 200upx;
	height: 200upx;
	background-size: cover;
	background-position: center;
}
.goodslist .cu-list.menu-avatar .cu-item .content{
	left: 250upx;
	width: 475upx;
	height:200upx;
	
}
.goodslist .cu-list.menu-avatar .cu-item .content .goods-title{
	height:100upx;
	align-items: flex-start;
}
.goodslist .cu-list.menu-avatar .cu-item .content .goods-seller{
	height:50upx;
	align-items: flex-end;
}
.goodslist .cu-list.menu-avatar .cu-item .content .goods-action{
	height:50upx;
	align-items: flex-end;
}
</style>
