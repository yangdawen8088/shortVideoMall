(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/add/adddetail"],{"19cb":function(t,e,i){"use strict";var a=i("2feb"),s=i.n(a);s.a},"2feb":function(t,e,i){},"4da6":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{system:this.systemInfo(),goodsImages:{},goodsImgHeightInit:300,detaillist:[],editIndex:-1}},onLoad:function(t){var e=t.detail;e&&(this.detaillist=JSON.parse(e))},methods:{adddetail:function(e){var i=this,a=e.currentTarget.dataset.index;t.showActionSheet({itemList:["图片","文本"],success:function(e){if(console.log("选中了第"+(e.tapIndex+1)+"个按钮"),0==e.tapIndex&&t.chooseImage({count:1,sizeType:["compressed"],sourceType:["album"],success:function(e){console.log(JSON.stringify(e.tempFilePaths)),t.showLoading({title:"加载中"}),i.loading=!0,t.uploadFile({url:"https://www.dpsoft.top/upload.jsp",filePath:e.tempFilePaths[0],name:"file",success:function(t){console.log(t.data);var e=JSON.parse(t.data);if("ok"==e.status){var s=e.data,n="http://www.dpsoft.top/"+s,o={type:"image"};o.value=n,null!=a?i.detaillist.splice(a,0,o):i.detaillist.push(o)}},complete:function(){t.hideLoading()}})}}),1==e.tapIndex){var s={type:"text",value:""};null!=a?i.detaillist.splice(a,0,s):i.detaillist.push(s)}},fail:function(t){console.log(t.errMsg)}})},editText:function(e){var i=this,a=e.currentTarget.dataset.index;this.editIndex!=a&&t.showActionSheet({itemList:["编辑","删除"],success:function(t){console.log("选中了第"+(t.tapIndex+1)+"个按钮"),0==t.tapIndex&&(i.editIndex=a),1==t.tapIndex&&i.detaillist.splice(a,1)}})},editFinish:function(){this.editIndex=-1},editImage:function(e){var i=this,a=e.currentTarget.dataset.index;t.showActionSheet({itemList:["删除"],success:function(t){console.log("选中了第"+(t.tapIndex+1)+"个按钮"),0==t.tapIndex&&i.detaillist.splice(a,1)}})},goodsImageLoad:function(t){var e=t.target.id,i=t.target.height,a=t.target.width,s=690*this.system.windowWidth/750,n=i*s/a;this.goodsImages[e]={width:s,height:n},this.goodsImgHeightInit=n},submit:function(){this.detaillist.length<=0?t.showToast({icon:"none",title:"您还没有添加详情"}):(t.setStorageSync("detail",JSON.stringify(this.detaillist)),t.navigateBack({}))}}};e.default=i}).call(this,i("543d")["default"])},7646:function(t,e,i){"use strict";i("719a");var a=n(i("b0ce")),s=n(i("ce8c"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(s.default))},ae82:function(t,e,i){"use strict";i.r(e);var a=i("4da6"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=s.a},ce8c:function(t,e,i){"use strict";i.r(e);var a=i("cfa4"),s=i("ae82");for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i("19cb");var o=i("2877"),d=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=d.exports},cfa4:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"detail bg-gradual-pink",staticStyle:{position:"fixed",width:"100%",height:"100%"},style:{paddingTop:t.system.statusBarHeight+"px"}},[i("view",{staticClass:"cu-bar ",staticStyle:{position:"fixed","z-index":"1",width:"100%"}},[i("view",{staticClass:"action",attrs:{eventid:"7eb5068f-0"},on:{tap:t.back}},[i("text",{staticClass:"cuIcon-back"})]),i("view",{staticClass:"content text-bold"},[t._v("商品详情")])]),i("scroll-view",{staticClass:"scroll",staticStyle:{width:"100%",height:"100%",padding:"100rpx 0"},attrs:{"scroll-y":"true"}},[t._l(t.detaillist,function(e,a){return i("block",{key:a},[i("view",{staticClass:"flex flex-direction solid-bottom bg-white"},[i("button",{staticClass:"cu-btn block line-grey lg",attrs:{"data-index":a,eventid:"7eb5068f-1-"+a},on:{tap:t.adddetail}},[i("text",{staticClass:"cuIcon-add"}),t._v("添加图片或文本描述")])],1),"image"==e.type?i("view",{staticClass:" flex flex-direction solid-bottom",staticStyle:{padding:"0 30rpx","background-color":"white"}},[i("image",{style:{height:(t.goodsImages["goodsimg"+a]?t.goodsImages["goodsimg"+a].height:t.goodsImgHeightInit)+"px"},attrs:{"data-index":a,src:e.value,id:"goodsimg"+a,eventid:"7eb5068f-2-"+a},on:{tap:t.editImage,load:t.goodsImageLoad}})]):t._e(),"text"==e.type?i("view",{staticClass:" flex flex-direction solid-bottom bg-white text-black",staticStyle:{padding:"0 30rpx"}},[i("textarea",{attrs:{"data-index":a,maxlength:"-1",placeholder:"请输入商品描述",eventid:"7eb5068f-3-"+a},on:{focus:t.editText,blur:t.editFinish}})]):t._e()])}),i("view",{staticClass:" flex flex-direction bg-white"},[i("button",{staticClass:"cu-btn block line-grey lg",attrs:{eventid:"7eb5068f-4"},on:{tap:t.adddetail}},[i("text",{staticClass:"cuIcon-add"}),t._v("添加图片或文本描述")])],1)],2),i("view",{staticClass:"cu-bar bg-white tabbar border shop fixed ",staticStyle:{top:"unset",bottom:"0","z-index":"100"}},[i("view",{staticClass:"flex-sub bg-pink submit",attrs:{eventid:"7eb5068f-5"},on:{tap:t.submit}},[t._v("保存")])])],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})}},[["7646","common/runtime","common/vendor"]]]);