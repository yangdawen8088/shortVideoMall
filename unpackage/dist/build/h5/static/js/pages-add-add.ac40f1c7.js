(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-add-add"],{"03ab":function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"bg-gradual-pink",staticStyle:{position:"fixed",width:"100%",height:"100%"},style:{paddingTop:t.system.statusBarHeight+"px"}},[e("v-uni-view",{staticClass:"cu-bar "},[e("v-uni-view",{staticClass:"action",on:{click:function(i){i=t.$handleEvent(i),t.close(i)}}},[e("v-uni-text",{staticClass:"cuIcon-back"})],1),e("v-uni-view",{staticClass:"content text-bold"},[t._v("推荐好物")])],1),e("v-uni-view",{staticClass:"cu-list menu bg-white"},[e("v-uni-view",{staticClass:"grid text-center col-1"},[null==t.goods.goodsTitle?e("v-uni-view",{staticClass:"padding-xl solids-bottom",on:{click:function(i){i=t.$handleEvent(i),t.selectGoods(i)}}},[e("v-uni-text",{staticClass:"cuIcon-add ",staticStyle:{"font-size":"140upx",display:"block","line-height":"0.8"}}),e("v-uni-text",[t._v("添加商品")])],1):t._e(),null!=t.goods.goodsTitle?e("v-uni-view",{staticClass:"cu-item order text-left"},[e("v-uni-view",{staticClass:"cu-avatar radius",style:{backgroundImage:"url("+t.goods.goodsImg+")"}}),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"text-grey goods-title"},[t._v(t._s(t.goods.goodsTitle))]),e("v-uni-view",{staticClass:"text-gray text-sm goods-seller"},[e("v-uni-text",{},[e("v-uni-text",{staticClass:"cuIcon-shop text-red  margin-right-xs"}),t._v(t._s(t.goods.goodsSeller)),e("v-uni-text",{staticClass:"fr"},[t._v(t._s(t.goods.goodsArea))])],1)],1),e("v-uni-view",{staticClass:"goods-action"},[e("v-uni-text",{staticClass:"text-price text-red text-lg",staticStyle:{"font-size":"40upx"}},[t._v(t._s(t.goods.goodsPrice))])],1)],1)],1):t._e(),""==t.videoPath?e("v-uni-view",{staticClass:"padding-xl solids-bottom",on:{click:function(i){i=t.$handleEvent(i),t.selectVideo(i)}}},[e("v-uni-text",{staticClass:"cuIcon-add ",staticStyle:{"font-size":"140upx",display:"block","line-height":"0.8"}}),e("v-uni-text",[t._v("上传短视频")])],1):t._e(),""!=t.videoPath?e("v-uni-view",{staticClass:"solids-bottom"},[e("v-uni-video",{staticStyle:{height:"500upx",width:"100%"},attrs:{src:t.videoPath,objectFit:"contain"},on:{click:function(i){i=t.$handleEvent(i),t.reselectVideo(i)}}})],1):t._e()],1),e("v-uni-view",{staticClass:"padding solid-bottom"},[e("v-uni-textarea",{staticClass:"text-xl",staticStyle:{height:"100upx",width:"100%"},attrs:{maxlength:"-1",placeholder:"请输入推荐理由"},model:{value:t.videodesc,callback:function(i){t.videodesc=i},expression:"videodesc"}})],1),e("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(i){i=t.$handleEvent(i),t.chooseLocation(i)}}},[e("v-uni-view",{staticClass:"content"},[e("v-uni-text",{},[t._v("地理位置")])],1),e("v-uni-view",{staticClass:"action"},[e("v-uni-text",{staticClass:" text-sm"},[t._v(t._s(t.locationName))])],1)],1)],1),e("v-uni-view",{staticClass:"padding flex flex-direction"},[e("v-uni-view",{staticClass:"text-yellow text-sm"},[t._v("工作人员将在24小时之内审核处理")]),e("v-uni-button",{staticClass:"cu-btn bg-pink margin-tb-sm lg",on:{click:function(i){i=t.$handleEvent(i),t.submit(i)}}},[t._v("发布")])],1),t.select?e("v-uni-view",{staticClass:"cu-modal bottom-modal show"},[e("v-uni-view",{staticStyle:{position:"absolute",width:"100%",height:"100%",top:"0"},on:{click:function(i){i=t.$handleEvent(i),t.hideModal(i)}}}),e("v-uni-view",{staticClass:"cu-dialog bg-gradual-pink",staticStyle:{padding:"40upx 0"}},[e("v-uni-view",{staticClass:"cu-list grid col-4 no-border",staticStyle:{background:"none"}},[e("v-uni-view",{staticClass:"cu-item",on:{click:function(i){i=t.$handleEvent(i),t.newgoods(i)}}},[e("v-uni-view",{staticClass:"cuIcon-add",staticStyle:{"font-size":"80upx"}}),e("v-uni-text",{staticClass:"text-white",staticStyle:{color:"white"}},[t._v("录入商品")])],1),e("v-uni-view",{staticClass:"cu-item",attrs:{"data-type":"2"},on:{click:function(i){i=t.$handleEvent(i),t.goodslist(i)}}},[e("v-uni-view",{staticClass:"cuIcon-apps",staticStyle:{"font-size":"80upx"}}),e("v-uni-text",{staticStyle:{color:"white"}},[t._v("已录入")])],1),e("v-uni-view",{staticClass:"cu-item",attrs:{"data-type":"3"},on:{click:function(i){i=t.$handleEvent(i),t.goodslist(i)}}},[e("v-uni-view",{staticClass:"cuIcon-order",staticStyle:{"font-size":"80upx"}}),e("v-uni-text",{staticStyle:{color:"white"}},[t._v("我买过的")])],1),e("v-uni-view",{staticClass:"cu-item",attrs:{"data-type":"4"},on:{click:function(i){i=t.$handleEvent(i),t.goodslist(i)}}},[e("v-uni-view",{staticClass:"cuIcon-choiceness",staticStyle:{"font-size":"80upx"}}),e("v-uni-text",{staticStyle:{color:"white"}},[t._v("历史选择")])],1)],1)],1)],1):t._e()],1)},s=[];e.d(i,"a",function(){return o}),e.d(i,"b",function(){return s})},1087:function(t,i,e){"use strict";e.r(i);var o=e("03ab"),s=e("73ba");for(var n in s)"default"!==n&&function(t){e.d(i,t,function(){return s[t]})}(n);e("d8d7");var a=e("2877"),c=Object(a["a"])(s["default"],o["a"],o["b"],!1,null,"ab895a6a",null);i["default"]=c.exports},"3d4a":function(t,i,e){var o=e("9972");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var s=e("4f06").default;s("5f0c4796",o,!0,{sourceMap:!1,shadowMode:!1})},"73ba":function(t,i,e){"use strict";e.r(i);var o=e("be74"),s=e.n(o);for(var n in o)"default"!==n&&function(t){e.d(i,t,function(){return o[t]})}(n);i["default"]=s.a},9972:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".cu-list .cu-item.order[data-v-ab895a6a]{height:%?220?%;padding:%?10?%}.cu-list .cu-item.order .cu-avatar[data-v-ab895a6a]{width:%?200?%;height:%?200?%;left:%?0?%;background-size:cover;background-position:50%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.cu-list .cu-item.order .content[data-v-ab895a6a]{left:%?10?%;width:%?520?%;height:%?200?%;position:relative;display:inline-block;vertical-align:middle}.cu-list .cu-item.order .content .goods-title[data-v-ab895a6a]{height:%?100?%;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;overflow:hidden}.cu-list .cu-item.order .content .goods-seller[data-v-ab895a6a]{height:%?50?%;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end}.cu-list .cu-item.order .content .goods-action[data-v-ab895a6a]{height:%?50?%;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end}",""])},be74:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o={data:function(){return{system:this.systemInfo(),location:{},locationName:"请选择",select:!1,videoPath:"",goods:{},videodesc:""}},onShow:function(){var t=uni.getStorageSync("goods");t&&(this.goods=JSON.parse(t),uni.removeStorage({key:"goods"}))},methods:{close:function(){uni.switchTab({url:"/pages/video/main"})},chooseLocation:function(){var t=this;uni.chooseLocation({success:function(i){console.log("位置名称："+i.name),console.log("详细地址："+i.address),console.log("纬度："+i.latitude),console.log("经度："+i.longitude),t.location=i,t.locationName=i.name}})},selectGoods:function(){this.select=!0},hideModal:function(){this.select=!1},selectVideo:function(){var t=this;uni.chooseVideo({success:function(i){t.videoPath=i.tempFilePath}})},reselectVideo:function(){var t=this;uni.showActionSheet({itemList:["重新选择"],success:function(i){console.log("选中了第"+(i.tapIndex+1)+"个按钮"),t.selectVideo()},fail:function(t){console.log(t.errMsg)}})},newgoods:function(){var t=this;uni.navigateTo({url:"/pages/add/addform",success:function(){t.hideModal()}})},goodslist:function(t){var i=this,e=t.currentTarget.dataset.type;uni.navigateTo({url:"/pages/add/goodslist?type="+e,success:function(){i.hideModal()}})},submit:function(){var t=this;this.goods.goodsTitle?this.videoPath.trim().length<=0?uni.showToast({icon:"none",title:"请上传短视频"}):this.videodesc.trim().length<=0?uni.showToast({icon:"none",title:"请填写推荐理由"}):this.location.name?(uni.showLoading({title:"发布中",mask:!0}),uni.uploadFile({url:"http://www.dpsoft.top/upload.jsp",filePath:this.videoPath,name:"file",success:function(i){console.log(i.data);var e=JSON.parse(i.data);if("ok"==e.status){var o=n.data,s="http://www.dpsoft.top/"+o,n={};n.videopath=s,n.goodsid=t.goods.goodsId,n.goodsimg=t.goods.goodsImg,n.goodsplatform=t.goods.platform,n.goodstitle=t.goods.goodsTitle,n.goodsprice=t.goods.goodsPrice,n.goodsnick=t.goods.goodsSeller,n.goodsarea=t.goods.goodsArea,n.goodsurl=t.goods.goodsUrl,n.videodesc=t.videodesc,n.locationname=t.location.name,n.locationaddr=t.location.address,n.locationlat=t.location.latitude,n.locationlng=t.location.longitude,n.coverImgUrl=t.goods.goodsImg,t.postJson({path:"video_publish.jsp",data:n,success:function(t){"ok"==t.data.status?uni.navigateBack({}):uni.showToast({icon:"none",title:n.msg})},complete:function(){uni.hideLoading()}})}else uni.hideLoading(),uni.showToast({icon:"none",title:e.msg})},fail:function(t){uni.hideLoading()}})):uni.showToast({icon:"none",title:"请选择地理位置"}):uni.showToast({icon:"none",title:"请选择商品"})}}};i.default=o},d8d7:function(t,i,e){"use strict";var o=e("3d4a"),s=e.n(o);s.a}}]);