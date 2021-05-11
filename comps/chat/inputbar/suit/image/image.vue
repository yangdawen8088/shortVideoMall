<template>
	<view></view>
</template>
<script>
let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let disp = require("../../../../../utils/broadcast");
export default {
	name:'ChatSuitImage',
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
	data() {
		return {
			
		}
	},
	methods: {
		openCamera(){
			var me = this;
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"],
				sourceType: ["camera"],
				success(res){
					me.upLoadImage(res);
				}
			});
		},

		sendImage(){
			var me = this;
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"],
				sourceType: ["album"],
				success(res){
					me.upLoadImage(res);
				},
			});
		},

		isGroupChat(){
			return this.chatType == msgType.chatType.CHAT_ROOM;
		},

		getSendToParam(){
			return this.isGroupChat() ? this.username.groupId : this.username.your;
		},

		upLoadImage(res){
			var me = this;
			var tempFilePaths = res.tempFilePaths;
			var token = WebIM.conn.context.accessToken
			
			
			
			uni.getImageInfo({
				src: res.tempFilePaths[0],
				success(res){
					var allowType = {
						jpg: true,
						gif: true,
						png: true,
						bmp: true
					};
					var str = WebIM.config.appkey.split("#");
					var width = res.width;
					var height = res.height;
					var index = res.path.lastIndexOf(".");
					var filetype = res.type;
					// if(filetype.toLowerCase() in allowType){
						
						//#ifdef APP-PLUS
						
						var xhr          = new XMLHttpRequest();
						xhr.open("get", res.path, true);
						xhr.responseType = "blob";
						xhr.onload = function() {
							if (this.status == 200) {
								
								// var reader = new FileReader();
								// // 将图片转成DataURL格式
								// reader.readAsDataURL(this.response);
								// reader.onload = function(){
								   var blob = this.response;
								  
								   var url = window.URL.createObjectURL(blob);
								   var file = {data: blob, url: url};
								   
								   var option = {
										apiUrl: WebIM.config.apiURL,
										file: file,
										from: me.username.myName,
										to: me.getSendToParam(),
										roomType: false,
										onFileUploadError: function (e) {      // 消息上传失败
											console.log('onFileUploadError');
											console.log(e);
										},
										onFileUploadComplete: function (data) {   // 消息上传成功
											console.log('onFileUploadComplete');
											console.log(data);
										},
										success: function (id) {                // 消息发送成功
											console.log('Success');
											console.log(id);
										}
									};
									var id = WebIM.conn.getUniqueId();		// 生成本地消息 id
									var msg = new WebIM.message(msgType.IMAGE, id);
									msg.set(option);
									WebIM.conn.send(msg.body);
									me.$emit(
										"newImageMsg",
										{
											msg: msg,
											type: msgType.IMAGE
										},
										{
											bubbles: true,
											composed: true
										}
									);
								// }
								
							}
						};
						xhr.send();
						
						//#endif
						
						//#ifndef APP-PLUS
						uni.uploadFile({
							url: "http://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
							// url: 'http://www.dpsoft.top/upload.jsp', 
							filePath: tempFilePaths[0],
							name: "file",
							header: {
								Authorization: "Bearer " + token
							},
							success(res){
								var data = res.data;
								var dataObj = JSON.parse(data);
								var id = WebIM.conn.getUniqueId();		// 生成本地消息 id
								var msg = new WebIM.message(msgType.IMAGE, id);
								var file = {
									type: msgType.IMAGE,
									size: {
										width: width,
										height: height
									},
									url: dataObj.uri + "/" + dataObj.entities[0].uuid,
									filetype: filetype,
									filename: tempFilePaths[0]
								};
								msg.set({
									apiUrl: WebIM.config.apiURL,
									body: file,
									from: me.username.myName,
									to: me.getSendToParam(),
									roomType: false,
									chatType: me.chatType,
									success: function (argument) {
										disp.fire('em.chat.sendSuccess', id);
									}
								});
								if(me.chatType == msgType.chatType.CHAT_ROOM){
									msg.setGroup("groupchat");
								}
								WebIM.conn.send(msg.body);
								me.$emit(
									"newImageMsg",
									{
										msg: msg,
										type: msgType.IMAGE
									},
									{
										bubbles: true,
										composed: true
									}
								);
							}
						});
						//#endif
					// }
				}
			});
		},
	},
}

</script>