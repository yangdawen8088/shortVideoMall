<template>
	<view class="addstyle bg-gradual-pink" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar " style="position: fixed;z-index: 1;width: 100%;">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				商品规格
			</view>
		</view>
		<scroll-view scroll-y="true" style="width: 100%;height: 100%;padding-top: 100upx;">
			<view class="cu-list menu sm-border solid-bottom text-white" style="border-color: white;margin-top: 0;" >
				
				<view class="cu-item" >
					<view class="content">
						
						<text class="text-white">规格名称</text>
					</view>
					<view class="action">
						<input placeholder="规格名称" style="color: white;"  v-model="styleName"></input>
					</view>
				</view>
				<view class="cu-item" >
					<view class="content">
						
						<text class="text-white">商品价格</text>
					</view>
					<view class="action">
						<input placeholder="商品价格" type="digit" style="color: white;"  v-model="goodsPrice"></input>
					</view>
				</view>
				
				<view class="cu-item" >
					<view class="content">
						
						<text class="text-white">促销</text>
					</view>
					<view class="action">
						<switch class='orange radius' @change="promoteChange" :class="promoteFlag?'checked':''" :checked="promoteFlag?true:false"></switch>
					</view>
				</view>
			
			<block v-if="promoteFlag">
			
				<view class="cu-item" >
					<view class="content">
						
						<text class="text-white">促销价格</text>
					</view>
					<view class="action">
						<input placeholder="商品价格" type="digit" style="color: white;"  v-model="promotePrice"></input>
					</view>
				</view>
				
				<view class="cu-item" >
					<view class="content">
						
						<text class="text-white">开始日期</text>
					</view>
					<view class="action">
						<picker mode="date" :value="startDateLabel" :start="now" end="2020-09-01" @change="startChange">
							<view class="picker">
								{{startDateLabel}} 00:00:00
							</view>
						</picker>
					</view>
				</view>
				
				<view class="cu-item" >
					<view class="content">
						
						<text class="text-white">结束日期</text>
					</view>
					<view class="action">
						<picker mode="date" :value="endDateLabel" :start="now" end="2020-09-01" @change="endChange">
							<view class="picker">
								{{endDateLabel}} 23:59:59
							</view>
						</picker>
					</view>
				</view>
				
			</block>
				
				<view class="padding flex flex-direction">
				
					<button @tap="addStyle"  class="cu-btn bg-pink margin-tb-sm lg">添加</button>
					<button @tap="deleteStyle" style="background-color: red;"  class="cu-btn bg-red margin-tb-sm lg">删除</button>
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
				styleName:'',
				goodsPrice:0,
				promoteFlag:false,
				promotePrice:0,
				startDateLabel:'',
				endDateLabel:'',
				now:''
			}
		},
		onLoad(option) {
			if(option.styleName){
				this.styleName = option.styleName;
			}
			if(option.goodsPrice){
				this.goodsPrice = option.goodsPrice;
			}
			this.now = new Date().toLocaleDateString().replace(/\//g,'-');
			if(option.promotePrice){
				this.promoteFlag = true;
				this.promotePrice = option.promotePrice;
				let startDate = new Date(option.promoteStarttime*1000);
				this.startDateLabel = startDate.toLocaleDateString().replace(/\//g,'-');
				let endDate = new Date(option.promoteEndtime*1000);
				this.endDateLabel = endDate.toLocaleDateString().replace(/\//g,'-');
			}else{
				this.promoteFlag = false;
				this.startDateLabel = this.now;
				this.endDateLabel = this.now;
				
			}
		},
		methods:{
			promoteChange(e){
				this.promoteFlag = e.target.value;
			},
			startChange(e){
				this.startDateLabel = e.target.value;
			},
			endChange(e){
				this.endDateLabel = e.target.value;
			},
			deleteStyle(){
				if(this.styleName.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:'请输入规格名称'
					});
					return;
				}
				let data = {};
				data.styleName = this.styleName;
				data.delete = true;
				uni.setStorageSync("style", JSON.stringify(data));
				uni.navigateBack({
					
				});
				
			},
			addStyle(){
				if(this.styleName.trim().length<=0){
					uni.showToast({
						icon:'none',
						title:'请输入规格名称'
					});
					return;
				}
				if(this.goodsPrice<=0){
					uni.showToast({
						icon:'none',
						title:'请输入商品价格'
					});
					return;
				}
				let data = {};
				data.styleName = this.styleName;
				data.goodsPrice = this.goodsPrice;
				if(this.promoteFlag){
					if(this.promotePrice<=0){
						uni.showToast({
							icon:'none',
							title:'请输入促销价格'
						});
						return;
					}
					data.promotePrice = this.promotePrice;
					let startDate = new Date(this.startDateLabel.replace(/-/g, '/')+' 00:00:00');
					let endDate = new Date(this.endDateLabel.replace(/-/g, '/')+' 23:59:59');
					if(startDate >= endDate){
						uni.showToast({
							icon:'none',
							title:'请选择有效促销时间'
						});
						return;
					}
					data.promoteStarttime = Math.floor(startDate.getTime()/1000);
					data.promoteEndtime = Math.floor(endDate.getTime()/1000);
				}
				uni.setStorageSync("style", JSON.stringify(data));
				uni.navigateBack({
					
				});
			}
		}
	}
</script>

<style>
.addstyle .cu-list.menu>.cu-item{
	background-color: rgba(0,0,0,0);
}
.addstyle .cu-item input{
	
	color: white;
}
.addstyle .cu-list.menu>.cu-item.arrow:before {
	color: white;
}
</style>
