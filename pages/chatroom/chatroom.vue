<template>
	<chat
	id="chat"
	:username="username"
	chatType="singleChat"></chat>
</template>

<script>
	import chat from '../../comps/chat/chat.vue'
	let disp = require("../../utils/broadcast");
	export default {
		components: {chat},
		data(){
			return {
				username: {
					your: "",
				}
			}
		},

		// options = 系统传入的 url 参数
		onLoad(options){
			let username = JSON.parse(options.username);
			this.username = username;
			uni.setNavigationBarTitle({
				title: username.sellerName
			});
		},

		onUnload(){
			disp.fire("em.chatroom.leave");
		},

		onPullDownRefresh: function () {
			uni.showNavigationBarLoading();
			this.selectComponent('#chat').getMore()
			// 停止下拉动作
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
	}
</script>

<style>

</style>
