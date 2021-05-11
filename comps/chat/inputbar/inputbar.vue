<template>
<view class="inputbar room_bar">
	<chat-suit-emoji ref="emoji" @newEmojiStr="emojiAction"></chat-suit-emoji>
	<chat-suit-main ref="main" :username="username" :chatType="chatType" @inputFocused="cancelEmoji" @newTextMsg="sendTextMessage"></chat-suit-main>
	<chat-suit-image ref="image" :username="username" :chatType="chatType" @newImageMsg="sendImageMessage"></chat-suit-image>
	<!-- <chat-suit-location id="chat-suit-location" username="{{ username }}"></chat-suit-location> -->
	<!-- <chat-suit-video id="chat-suit-video" username="{{ username }}"></chat-suit-video> -->
	
	<view v-bind:class="['other_func', isIPX? 'other_func_X': '']">
		<view class="open_emoji" @tap="openEmoji">
			<image src="/static/images/Emoji.png"/>
		</view>
		<!-- #ifndef H5 -->
		<view class="v-record" @tap="toggleRecordModal">
			<image
				class="icon-record"
				:src="recordStatus != RecordStatus.HIDE ? '/static/images/iconAudioActive@2x.png' : '/static/images/voice.png'" style="width:16px; height: 24px"/>
		</view>
		<!-- #endif -->
		<view class="open_camera" @tap="openCamera">
			<image src="/static/images/camora.png" style="width:24px; height: 18px"/>
		</view>
		<view class="send_image" @tap="sendImage">
			<image src="/static/images/pic.png" style="height:20px; width: 20px"/>
		</view>
		<!-- <view class="send_image" @tap="sendLocation">
			<image src="../../../images/iconLocation@2x.png" style="height:18px;"/>
		</view> -->
	</view>
</view>
</template>
<script>
	
	import ChatSuitEmoji from './suit/emoji/emoji.vue'
	import ChatSuitMain from './suit/main/main.vue'
	import ChatSuitImage from './suit/image/image.vue'
let RecordStatus = require("./suit/audio/record_status").RecordStatus;
let msgType = require("../msgtype");

export default {
	components: {ChatSuitEmoji,ChatSuitMain,ChatSuitImage},
	name: 'ChatInputbar',
	props: {
		username: {
			type: Object,
			value: {}
		},
		chatType: {
			type: String,
			value: msgType.chatType.SINGLE_CHAT,
		},
	},
	data(){
		return {
			recordStatus: RecordStatus.HIDE,
			RecordStatus,
			__comps__: {
				main: null,
				emoji: null,
				image: null,
				location: null,
				//video: null,
			},
			isIPX: getApp().globalData.isIPX
		}
	},
	created(){
		
	},
	mounted() {
		// this.setData({
		// 	isIPX: getApp().globalData.isIPX
		// })
		let comps = this.$refs;
		comps.main = this.$refs.main;
		comps.emoji = this.$refs.emoji;
		comps.image = this.$refs.image;
		// comps.location = this.selectComponent("#chat-suit-location");
		//comps.video = this.selectComponent("#chat-suit-video");
		this.$refs = comps;
	},
	methods: {
		// 事件有长度限制：仅限 26 字符
		toggleRecordModal:function(){
			this.$emit(
				"tapSendAudio",
				null,
				{
					bubbles: true,
					composed: true
				}
			);
		},

		// sendVideo(){
		// 	this.$refs.video.sendVideo();
		// },

		openCamera(){
			this.$refs.image.openCamera();
		},

		openEmoji(){
			this.$refs.emoji.openEmoji();
		},

		cancelEmoji(){
			this.$refs.emoji.cancelEmoji();
		},

		sendImage(){
			this.$refs.image.sendImage();
		},

		sendLocation(){
			// this.$refs.location.sendLocation();
		},

		emojiAction(evt){
			this.$refs.main.emojiAction(evt.msg);
		},
		sendTextMessage(evt){
			this.$emit(
				"newTextMsg",
				evt,
				{
					bubbles: true,
					composed: true
				}
			);
		},
		sendImageMessage(evt){
			this.$emit(
				"newImageMsg",
				evt,
				{
					bubbles: true,
					composed: true
				}
			);
		}
	},

	// lifetimes
	
	attached(){},
	moved(){},
	detached(){}
	
}

</script>
<style>
.inputbar.room_bar {
	width: 100%;
	height: auto;
	border-top: 1px solid #CFCFCF;
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: 1;
	background-color: #FFFFFF;
	transform: translateZ(1000px);
}

.inputbar .other_func {
	width: 100%;
	height: 60rpx;
	display: flex;
}
.inputbar .other_func_X{
	height: 128rpx;
}

.inputbar .other_func image {
	width: 42rpx;
	height: 40rpx;
}

.inputbar .open_emoji,
.inputbar .send_image,
.inputbar .open_camera,
.inputbar .v-record {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 48rpx;
}


.inputbar .v-record .icon-record {
	width: 18rpx;
	height: 40rpx;
}
.inputbar .v-record{
	margin-left: 48rpx;
}
.inputbar .open_camera, .inputbar .send_image{
	margin-left: 64rpx;
}



</style>