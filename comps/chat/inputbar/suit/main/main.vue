<template>
<!-- <chat-suit-emoji id="chat-suit-emoji" bind:newEmojiStr="emojiAction"></chat-suit-emoji> -->
<form class="suit-main text-input">
	<!-- <view class="f-row"> -->
		<input
			class="f news"
			type="text"
			v-model="inputMessage"
			
			cursor-spacing="65"
			confirm-type="send"
			@confirm="sendMessage"
			@input="bindMessage"
			@tap="focus"
			@focus="focus"
			@blur="blur"
			placeholder="输入新消息"
			placeholder-style="color:#CFCFCF; padding-left:5px;"
			 />

		<!-- <button class="send_btn" bind:tap="sendMessage">发送</button> -->

<!-- 	</view> -->
</form>
</template>
<script>
	
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let disp = require("../../../../../utils/broadcast");
export default{
	name:'ChatSuitMain',
	props: {
		username: {
			type: Object,
			value: {},
		},
		chatType: {
			type: String,
			value: msgType.chatType.SINGLE_CHAT,
		},
	},
	data(){
		return {
			inputMessage: "",		// render input 的值
			userMessage: "",		// input 的实时值
		}
	},

	methods: {
		focus(){
			this.$emit("inputFocused", null, { bubbles: true });
		},

		blur(){
			this.$emit("inputBlured", null, { bubbles: true });
		},

		isGroupChat(){
			return this.chatType == msgType.chatType.CHAT_ROOM;
		},

		getSendToParam(){
			return this.isGroupChat() ? this.username.groupId : this.username.your;
		},

		// bindinput 不能打冒号！
		bindMessage(e){
			this.userMessage = e.detail.value;
		},

		emojiAction(emoji){
			var str;
			var msglen = this.userMessage.length - 1;
			if(emoji && emoji != "[del]"){
				str = this.userMessage + emoji;
			}
			else if(emoji == "[del]"){
				let start = this.userMessage.lastIndexOf("[");
				let end = this.userMessage.lastIndexOf("]");
				let len = end - start;
				if(end != -1 && end == msglen && len >= 3 && len <= 4){
					str = this.userMessage.slice(0, start);
				}
				else{
					str = this.userMessage.slice(0, msglen);
				}
			}
			this.userMessage=str;
			this.inputMessage=str;
		},

		sendMessage(){
			let me = this;

			String.prototype.trim=function()
			{
			     return this.replace(/(^\s*)|(\s*$)/g, '');
			}
			if(!this.userMessage.trim()){
				return;
			}
			let id = WebIM.conn.getUniqueId();
			let msg = new WebIM.message(msgType.TEXT, id);
			msg.set({
				msg: this.userMessage,
				from: this.username.myName,
				to: this.getSendToParam(),
				roomType: false,
				chatType: this.chatType,
				success:(id, serverMsgId)=>{
					//console.log('成功了')
					disp.fire('em.chat.sendSuccess', id, me.userMessage);
				},
				fail(id, serverMsgId){
					console.log('失败了')
				}
			});
			if(this.chatType == msgType.chatType.CHAT_ROOM){
				msg.setGroup("groupchat");
			}
			WebIM.conn.send(msg.body);
			this.$emit(
				"newTextMsg",
				{
					msg: msg,
					type: msgType.TEXT,
				},
				{
					bubbles: true,
					composed: true
				}
			);
			//
			
			this.userMessage="";
			this.inputMessage="";
			
		},
	},

	// lifetimes
	created(){},
	attached(){},
	moved(){},
	detached(){},
	ready(){},
}

</script>
<style>
	
.suit-main.text-input {
	width: 100%;
	height: 100rpx;
	padding: 0;
	display: block;
}

.suit-main .news {
	width: 100%;
	height: 62rpx;
	font-size: 14px;
	padding: 0 32rpx;
	display: inline-block;
	margin-top: 10rpx;
	line-height: 48rpx;
	position:relative;
	top: 0;
}

.suit-main .send_btn {
	width: 80rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 17px;
	color: #000;
	padding: 0;
	display: inline-block;
	float: right;
	margin: 8rpx 16rpx auto auto;
	background-color: #fff;
}

.suit-main .f-row{
	height:100rpx;
	display:flex;
	align-items:center;
}

</style>