<template>
	<view class="bg-gradual-pink redpackage" style="position: fixed;width: 100%;height: 100%;" v-bind:style="{paddingTop:system.statusBarHeight+'px'}">
		<view class="cu-bar">
			<view class="action" @tap="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class="content text-bold">
				红包
			</view>
		</view>
		
		<view class="cu-list menu-avatar">
				<view v-for="(red,index) in redlist" :key="index" class="cu-item">
					<view class="cu-avatar radius lg cuIcon-redpacket_fill" v-bind:class="[red.status==0?'text-red':'text-gray']" ></view>
					<view class="content">
						<view class="text-grey">{{red.title}}</view>
						<view class="text-gray text-sm flex">
							<text class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								{{red.status==0? (red.valid_date+'到期'):(red.status==1?'已使用':'已到期')}}
							</text> </view>
					</view>
					<view class="action">
						<view class="text-red text-xxl text-price">{{red.amount}}</view>
						
					</view>
				</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				system:this.systemInfo(),
				redlist:[]
			}
		},
		onLoad(){
			this.postJson({
				path:'/user/red/list',
				data:{
					
				},
				success:(res) => {
					if("ok" == res.data.status){
						this.redlist = res.data.data;
					}
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>
.redpackage .cu-list.menu-avatar .cu-item{
	
}
</style>
