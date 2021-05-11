<template>
<view class="main" style='background-color:#eeeeee;'>
	<chat-suit-audio
		id="chat-suit-audio"
		:username="username "
		:chatType="chatType"
		
		@newAudioMsg="saveSendMsg"></chat-suit-audio>

	<chat-msglist
		id="chat-msglist"
		:username="username"
		@msglistTap="normalScroll"></chat-msglist>
</view>
	<chat-inputbar
		id="chat-inputbar"
		:username="username"
		:chatType="chatType"

		@newTextMsg="saveSendMsg"
		@newImageMsg="saveSendMsg"
		@newLocationMsg="saveSendMsg"
		@newVideoMsg="saveSendMsg"
		@tapSendAudio="toggleRecordModal"

		@inputFocused="shortScroll"
		@inputBlured="normalScroll"></chat-inputbar>

</template>
<script>
	
	import ChatSuitAudio from './inputbar/suit/audio/audio.vue'
	import ChatMsglist from './msglist/msglist.vue'
	import ChatInputbar from './inputbar/inputbar.vue'
let msgStorage = require("./msgstorage");
let msgType = require("./msgtype");

export default {
	components: {ChatSuitAudio,ChatMsglist,ChatInputbar},
	name: 'chat',
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
	data: {
		__comps__: {
			msglist: null,
			inputbar: null,
			audio: null,
		},
	},
	methods: {
		toggleRecordModal(){
			this.data.__comps__.audio.toggleRecordModal();
		},

		normalScroll(){
			this.data.__comps__.msglist.normalScroll();
			this.data.__comps__.inputbar.cancelEmoji();
		},

		shortScroll(){
			this.data.__comps__.msglist.shortScroll();
		},

		saveSendMsg(evt){
			msgStorage.saveMsg(evt.detail.msg, evt.detail.type);
			this.data.__comps__.inputbar.cancelEmoji();
		},

		getMore(){
			this.selectComponent('#chat-msglist').getHistoryMsg()
		},
  	},

	// lifetimes
	created(){},
	attached(){},
	ready(){
		this.data.__comps__.inputbar = this.selectComponent("#chat-inputbar");
		this.data.__comps__.msglist = this.selectComponent("#chat-msglist");
		this.data.__comps__.audio = this.selectComponent("#chat-suit-audio");
	},
	moved(){},
	detached(){
	},

}

	
</script>