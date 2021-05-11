<template>
<swiper class="suit-emoji"
	:class="show"
	:indicator-dots="indicatorDots"
	:autoplay="autoplay"
	:interval="interval"
	:duration="duration">
	<block>
		<swiper-item>
			<view class="emoji_item">
				<image
					v-for="(item,index) in emojiObj.map1"
					:src="emojiObj.path + item"
					:key="index"
					@tap="sendEmoji"
					:data-emoji="index" />
			</view>
			<view class="emoji_item">
				<image
					v-for="(item,index) in emojiObj.map2"
					:src="emojiObj.path + item"
					:key="index"
					@tap="sendEmoji"
					:data-emoji="index" />
			</view>
			<view class="emoji_item">
				<image
					v-for="(item,index) in emojiObj.map3"
					:src="emojiObj.path + item"
					:key="index"
					@tap="sendEmoji"
					:data-emoji="index" />
			</view>
		</swiper-item>
	</block>
	<block class="second">
		<swiper-item>
			<view class="emoji_item">
				<image
					v-for="(item,index) in emojiObj.map4"
					:src="emojiObj.path + item"
					:key="index"
					@tap="sendEmoji"
					:data-emoji="index" />
			</view>
			<view class="emoji_item">
				<image
					v-for="(item,index) in emojiObj.map5"
					:src="emojiObj.path + item"
					:key="index"
					@tap="sendEmoji"
					:data-emoji="index" />
			</view>
			<view class="emoji_item">
				<image
					v-for="(item,index) in emojiObj.map6"
					:src="emojiObj.path + item"
					:key="index"
					@tap="sendEmoji"
					:data-emoji="index" />
			</view>
		</swiper-item>
	</block>
</swiper>
</template>
<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let EMOJI_STATUS = {
	OPENED: "showEmoji",
	CLOSED: "emoji_list",
};

export default {
	name: 'ChatSuitEmoji',
	data(){
		return {
			show: EMOJI_STATUS.CLOSED,
			emoji: WebIM.Emoji,
			emojiObj: WebIM.EmojiObj,

			interval: 5000,
			duration: 1000,
			autoplay: false,
			indicatorDots: true,	// 显示面板指示点
		}
	},
	methods: {
		openEmoji(){
			this.show = EMOJI_STATUS.OPENED;
		},

		cancelEmoji(){
			this.show= EMOJI_STATUS.CLOSED;
		},

		// 输出 emoji
		sendEmoji(event){
			var emoji = event.target.dataset.emoji;
			this.$emit(
				"newEmojiStr",
				{
					msg: emoji,
					type: msgType.EMOJI,
				},
				{
					bubbles: true,
					composed: true
				}
			);
		},
	},
}

</script>
<style>
.suit-emoji.emoji_list {
	margin-top: 30px;
	width: 100%;
	height: 145px;
	background-color: #dddddd;
	padding-top: 10px;
	padding-left: 3%;
	display: none;
}

.suit-emoji.showEmoji {
	margin-top: 30px;
	width: 100%;
	height: 145px;
	background-color: #dddddd;
	padding-top: 10px;
	padding-left: 3%;
	display: block;
}

.suit-emoji.emoji_list image,
.suit-emoji.showEmoji image {
	width: 26px;
	height: 26px;
	margin: 5px 2%;
}

.suit-emoji .emoji {
	width: 26px;
	height: 26px;
	margin: 0 0;
}

.suit-emoji .emoji_item {
	display: flex;
	justify-content: space-around;
	margin-right: 20px;
}

</style>