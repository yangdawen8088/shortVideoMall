<template>
	<view>
<view class="chat-main" style='background-color:#eeeeee;'>
	<chat-suit-audio
		ref="audio"
		:username="username "
		:chatType="chatType"
		
		@newAudioMsg="saveSendMsg"></chat-suit-audio>

	<chat-msglist
		ref="msglist"
		:username="username"
		@msglistTap="normalScroll"></chat-msglist>
</view>
	<chat-inputbar
		ref="inputbar"
		:username="username"
		:chatType="chatType"

		@newTextMsg="saveSendMsg"
		@newImageMsg="saveSendMsg"
		@newLocationMsg="saveSendMsg"
		@newVideoMsg="saveSendMsg"
		@tapSendAudio="toggleRecordModal"

		@inputFocused="shortScroll"
		@inputBlured="normalScroll"></chat-inputbar>

</view>
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
	data(){
		return {
			__comps__: {
				msglist: null,
				inputbar: null,
				audio: null,
			}
		}
	},
	// lifetimes
	created(){},
	attached(){},
	mounted(){
		this.$data.__comps__.inputbar = this.$refs.inputbar;
		this.$data.__comps__.msglist = this.$refs.msglist;
		this.$data.__comps__.audio = this.$refs.audio;
		
	},
	moved(){},
	detached(){
	},
	methods: {
		toggleRecordModal(){
			this.$data.__comps__.audio.toggleRecordModal();
		},

		normalScroll(){
			this.$data.__comps__.msglist.normalScroll();
			this.$data.__comps__.inputbar.cancelEmoji();
		},

		shortScroll(){
			this.$data.__comps__.msglist.shortScroll();
		},

		saveSendMsg(evt){
			msgStorage.saveMsg(evt.msg, evt.type);
			this.$data.__comps__.inputbar.cancelEmoji();
		},

		getMore(){
			his.$data.__comps__.msglist.getHistoryMsg()
		},
  	},
}

	
</script>
<style>
	.chat-main {
	width: 100%;
	height: 100%;
}

</style>