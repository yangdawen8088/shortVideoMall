(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabbar-tabbar-1-goodsdetail"],{"09b8":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("b253"));function n(t){return t&&t.__esModule?t:{default:t}}var o={components:{uniNumberBox:a.default},data:function(){return{goods:{},priceLabel:"",detaillist:[],stylelist:[],styleIndex:0,promoteFlag:!1,promoteLabel:"",region:["广东省","广州市","海珠区"],regionArray:["请选择","请选择","请选择"],regionIndex:[0,0,0],regionData:[],price:0,count:1,tobuy:!0,tobuyAnimation:{}}},onLoad:function(t){var e=this;uni.showToast({title:JSON.stringify(t)});var i=t.goodsId;uni.request({url:"https://www.dpsoft.top/goods_new_detail.jsp",method:"POST",data:{goodsid:i},header:{"Content-Type":"application/json"},success:function(t){if(console.log(t.data),"ok"==t.data.status){e.$data.goods=t.data.data,e.promoteFlag=1==e.goods.promote,e.goods.price>e.goods.promote_price?e.priceLabel="¥"+e.goods.promote_price+" ~ ¥"+e.goods.max_price:e.priceLabel="¥"+e.goods.price+" ~ ¥"+e.goods.max_price,e.detaillist=e.goods.detail;var i=e.goods.style;for(var a in i){var n=i[a],o=n.styleName,s=n.goodsPrice,l=o+" ¥"+s,r=n.promotePrice;"undefined"!=typeof r&&null!=r&&(l=o+" ¥"+r),e.stylelist.push(l)}}}});var a=this,n={multiArray:this.regionArray,multiIndex:this.regionIndex,multiData:this.regionData},o="100000";uni.request({url:"https://www.dpsoft.top/district.jsp",method:"POST",data:{code:o},header:{"Content-Type":"application/json"},success:function(t){if(console.log(t.data),"ok"==t.data.status){for(var e in n.multiData[0]=t.data.data,n.multiArray[0]=[],t.data.data){var i=t.data.data[e];n.multiArray[0].push(i.name)}n.multiIndex[1]=0,n.multiArray[1]=["请选择"],n.multiArray[2]=["请选择"],n.multiIndex[2]=0,a.regionArray=n.multiArray,a.regionIndex=n.multiIndex,a.regionData=n.multiData}}})},methods:{selectStyle:function(t){console.log("选择商品规格为",t.target.value),this.styleIndex=t.target.value;var e=this.goods.style[this.styleIndex];if(e.promotePrice){this.promoteFlag=!0;var i=e.promoteStarttime,a=e.promoteEndtime,n=Math.floor(Date().getTime()/1e3);n<i?(this.priceLabel="¥"+e.goodsPrice,this.promoteLabel=new Date(1e3*i).toLocaleDateString()+"开始",this.price=e.goodsPrice):n>a?(this.priceLabel="¥"+e.goodsPrice,this.promoteLabel="已结束",this.price=e.goodsPrice):(this.priceLabel="¥"+e.promotePrice,this.promoteLabel=new Date(1e3*a).toLocaleDateString()+"截止",this.price=e.promotePrice)}else this.priceLabel="¥"+e.goodsPrice,this.promoteFlag=!1,this.price=e.goodsPrice},RegionChange:function(t){this.region=t.detail.value},selectRegion:function(t){this.multiIndex=t.detail.value},regionChange:function(t){var e=this,i={multiArray:this.regionArray,multiIndex:this.regionIndex,multiData:this.regionData};switch(i.multiIndex[t.detail.column]=t.detail.value,t.detail.column){case 0:var a=i.multiData[0][i.multiIndex[0]].code;uni.request({url:"https://www.dpsoft.top/district.jsp",method:"POST",data:{code:a},header:{"Content-Type":"application/json"},success:function(t){if(console.log(t.data),"ok"==t.data.status){for(var a in i.multiData[1]=t.data.data,i.multiArray[1]=[],t.data.data){var n=t.data.data[a];i.multiArray[1].push(n.name)}i.multiIndex[1]=0,i.multiArray[2]=["请选择"],i.multiIndex[2]=0,e.regionArray=i.multiArray,e.regionIndex=i.multiIndex,e.regionData=i.multiData}}});break;case 1:var n=i.multiData[1][i.multiIndex[1]].code;uni.request({url:"https://www.dpsoft.top/district.jsp",method:"POST",data:{code:n},header:{"Content-Type":"application/json"},success:function(t){if(console.log(t.data),"ok"==t.data.status){for(var a in i.multiData[2]=t.data.data,i.multiArray[2]=[],t.data.data){var n=t.data.data[a];i.multiArray[2].push(n.name)}i.multiIndex[2]=0,e.regionArray=i.multiArray,e.regionIndex=i.multiIndex,e.regionData=i.multiData}}});break}},goback:function(){uni.navigateBack({})},closeBuyLayer:function(){this.tobuy=!1;var t=uni.createAnimation({duration:1e3,timingFunction:"ease-out"});this.tobuyAnimation=t.export()}}};e.default=o},2729:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniNumberBox",props:{value:{type:[Number,String],default:1},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},disabled:{type:Boolean,default:!1}},data:function(){return{inputValue:0}},watch:{value:function(t){this.inputValue=+t},inputValue:function(t,e){+t!==+e&&this.$emit("change",t)}},created:function(){this.inputValue=+this.value},methods:{_calcValue:function(t){if(!this.disabled){var e=this._getDecimalScale(),i=this.inputValue*e,a=this.step*e;"minus"===t?i-=a:"plus"===t&&(i+=a),i<this.min||i>this.max||(this.inputValue=i/e)}},_getDecimalScale:function(){var t=1;return~~this.step!==this.step&&(t=Math.pow(10,(this.step+"").split(".")[1].length)),t},_onBlur:function(t){var e=t.detail.value;e?(e=+e,e>this.max?e=this.max:e<this.min&&(e=this.min),this.inputValue=e):this.inputValue=0}}};e.default=a},"47d0":function(t,e,i){"use strict";i.r(e);var a=i("7abb"),n=i("a01b");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);var s=i("2877"),l=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"04d24ce2",null);e["default"]=l.exports},"61a2":function(t,e,i){"use strict";var a=i("a41e"),n=i.n(a);n.a},"78bf":function(t,e,i){"use strict";i.r(e);var a=i("2729"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},"7abb":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"cuIcon-roundleftfill-copy",staticStyle:{position:"fixed",color:"rgba(100,100,100,0.7)",top:"30upx",left:"30upx","font-size":"50upx","z-index":"99"},on:{click:function(e){e=t.$handleEvent(e),t.goback(e)}}}),i("v-uni-view",{staticClass:"padding bg-white solid-bottom",staticStyle:{"padding-top":"100upx"}},[i("v-uni-view",{staticClass:"flex p-xs  mb-sm"},[i("v-uni-view",{staticClass:"flex-sub text-black",staticStyle:{"font-size":"40upx","font-weight":"bold"}},[t._v(t._s(t.goods.title))])],1),i("v-uni-view",{staticClass:"flex justify-start"},[i("v-uni-view",{staticClass:"padding-sm",staticStyle:{"font-size":"46upx","font-weight":"bold",color:"red",display:"table-cell","vertical-align":"middle"}},[t._v(t._s(t.priceLabel))]),t.promoteFlag?i("v-uni-view",{staticStyle:{display:"table-cell","vertical-align":"middle"}},[i("v-uni-text",{staticStyle:{padding:"5upx 10upx",color:"white","background-color":"red","border-radius":"10upx"}},[t._v("促销")])],1):t._e(),t.promoteFlag?i("v-uni-view",{staticStyle:{display:"table-cell","vertical-align":"middle"}},[i("v-uni-text",{staticStyle:{color:"red","font-size":"32upx"}},[t._v(t._s(t.promoteLabel))])],1):t._e()],1),i("v-uni-view",{staticClass:"flex text-lg text-bold margin-bottom-sm"},[i("v-uni-view",{staticClass:"flex-sub",staticStyle:{"padding-left":"0"}},[t._v("商品规格:")]),i("v-uni-view",{staticClass:"flex-treble",staticStyle:{"text-decoration":"underline"}},[i("v-uni-picker",{attrs:{mode:"selector",value:t.styleIndex,range:t.stylelist},on:{change:function(e){e=t.$handleEvent(e),t.selectStyle(e)}}},[t._v(t._s(t.goods.style[t.styleIndex].styleName))])],1)],1),i("v-uni-view",{staticClass:"flex justify-start margin-bottom-sm"},[i("v-uni-view",{staticStyle:{"border-radius":"10upx"}},[i("v-uni-image",{staticStyle:{height:"40upx",width:"40upx"},attrs:{src:"../../../static/img/dian_small.png"}})],1),i("v-uni-view",{staticClass:"text-lg text-bold text-blue"},[t._v(t._s(t.goods.seller))])],1),i("v-uni-view",{staticClass:"flex text-lg text-bold margin-bottom-sm",staticStyle:{display:"table","vertical-align":"middle"}},[i("v-uni-view",{staticStyle:{display:"table-cell","vertical-align":"middle",width:"30%"}},[t._v("免费")]),i("v-uni-view",{staticStyle:{display:"table-cell","vertical-align":"middle"}},[i("v-uni-image",{staticStyle:{height:"40upx",width:"40upx"},attrs:{src:"../../../static/img/small_location.png"}})],1),i("v-uni-view",{staticStyle:{display:"table-cell","font-size":"26upx","vertical-align":"middle"}},[t._v(t._s(t.goods.location))])],1),i("v-uni-view",{staticStyle:{border:"solid 0.1upx #666"}}),i("v-uni-view",{staticStyle:{margin:"20upx 0"}},[t._l(t.detaillist,function(e,a){return["text"==e.type?i("v-uni-text",[t._v(t._s(e.value))]):t._e(),"image"==e.type?i("v-uni-image",{key:a+"_1",attrs:{src:e.value}}):t._e()]})],2)],1),i("v-uni-view",{staticClass:"cu-bar bg-white tabbar border shop fixed ",staticStyle:{top:"unset",bottom:"0","z-index":"100"}},[i("v-uni-view",{staticClass:"flex-sub bg-green submit cuIcon-markfill",staticStyle:{flex:"1","font-size":"60upx"}}),i("v-uni-view",{staticClass:"flex-treble bg-red submit"},[t._v("购买")])],1),t.tobuy?i("v-uni-view",{staticStyle:{position:"fixed","z-index":"101",top:"0",left:"0",width:"100%",height:"100%"}},[i("v-uni-view",{staticStyle:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%","background-color":"rgba(100,100,100,0.5)"},on:{click:function(e){e=t.$handleEvent(e),t.closeBuyLayer(e)}}}),i("v-uni-view",{staticStyle:{position:"absolute",bottom:"0",width:"100%","max-height":"100%","background-color":"#fff"},attrs:{animation:t.tobuyAnimation}},[i("v-uni-view",{staticClass:"cu-bar bg-red"},[i("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.closeBuyLayer(e)}}},[i("v-uni-text",{staticClass:"cuIcon-close"})],1),i("v-uni-view",{staticClass:"content text-bold"},[t._v("下单支付")])],1),i("v-uni-form",[i("v-uni-view",{staticClass:"cu-form-group margin-top"},[i("v-uni-view",{staticClass:"title"},[t._v("收货人")]),i("v-uni-input",{attrs:{placeholder:"输入收货人姓名",name:"input"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("手机号")]),i("v-uni-input",{attrs:{placeholder:"输入收货人手机号",type:"tel",name:"input"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("地址选择")]),i("v-uni-picker",{attrs:{mode:"multiSelector",value:t.regionIndex,range:t.regionArray},on:{change:function(e){e=t.$handleEvent(e),t.selectRegion(e)},columnchange:function(e){e=t.$handleEvent(e),t.regionChange(e)}}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.regionArray[0][t.regionIndex[0]])+"，"+t._s(t.regionArray[1][t.regionIndex[1]])+"，"+t._s(t.regionArray[2][t.regionIndex[2]]))])],1)],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-textarea",{attrs:{maxlength:"-1",placeholder:"请输入详细地址"}})],1),i("v-uni-view",{staticClass:"cu-form-group align-start"},[i("v-uni-view",{staticClass:"title"},[t._v("备注")]),i("v-uni-textarea",{attrs:{maxlength:"-1",placeholder:"你想对卖家说什么"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("商品价格")]),i("v-uni-text",{staticClass:"text-red text-bold"},[t._v(t._s(t.priceLabel))])],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("购买数量")]),i("uni-number-box",{attrs:{min:0,max:9}},[t._v(t._s(t.count))])],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("运费")]),i("v-uni-text",{staticClass:"text-red text-bold"},[t._v("¥"+t._s(t.goods.post_fee))])],1),i("v-uni-view",{staticClass:"text-center text-xxl padding text-bold text-price text-red"},[t._v(t._s(t.price*t.count+t.goods.post_fee))]),i("v-uni-view",{staticClass:"padding flex flex-direction"},[i("v-uni-button",{staticClass:"cu-btn bg-green margin-tb-sm lg"},[t._v("微信支付")])],1)],1)],1)],1):t._e()],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},"7b44":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-numbox"},[i("v-uni-view",{staticClass:"uni-numbox__minus",class:{"uni-numbox--disabled":t.inputValue<=t.min||t.disabled},on:{click:function(e){e=t.$handleEvent(e),t._calcValue("minus")}}},[t._v("-")]),i("v-uni-input",{staticClass:"uni-numbox__value",attrs:{disabled:t.disabled,type:"number"},on:{blur:function(e){e=t.$handleEvent(e),t._onBlur(e)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}),i("v-uni-view",{staticClass:"uni-numbox__plus",class:{"uni-numbox--disabled":t.inputValue>=t.max||t.disabled},on:{click:function(e){e=t.$handleEvent(e),t._calcValue("plus")}}},[t._v("+")])],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},a01b:function(t,e,i){"use strict";i.r(e);var a=i("09b8"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},a41e:function(t,e,i){var a=i("cf5a");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2ef35940",a,!0,{sourceMap:!1,shadowMode:!1})},b253:function(t,e,i){"use strict";i.r(e);var a=i("7b44"),n=i("78bf");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("61a2");var s=i("2877"),l=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"4b87da33",null);e["default"]=l.exports},cf5a:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-numbox[data-v-4b87da33]{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;height:%?70?%;position:relative}.uni-numbox[data-v-4b87da33]:after{content:"";position:absolute;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none;top:-50%;left:-50%;right:-50%;bottom:-50%;border:1px solid #c8c7cc;border-radius:%?12?%;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5)}.uni-numbox__minus[data-v-4b87da33],.uni-numbox__plus[data-v-4b87da33]{margin:0;background-color:#f8f8f8;width:%?70?%;font-size:%?40?%;height:100%;line-height:%?70?%;text-align:center;display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:#333;position:relative}.uni-numbox__value[data-v-4b87da33]{position:relative;background-color:#fff;width:%?80?%;height:100%;text-align:center;padding:0}.uni-numbox__value[data-v-4b87da33]:after{content:"";position:absolute;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none;top:-50%;left:-50%;right:-50%;bottom:-50%;border-style:solid;border-color:#c8c7cc;border-left-width:1px;border-right-width:1px;border-top-width:0;border-bottom-width:0;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5)}.uni-numbox--disabled[data-v-4b87da33]{color:silver}',""])}}]);