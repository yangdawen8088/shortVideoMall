(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-add-addstyle"],{"37f8":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".addform .cu-list.menu>.cu-item[data-v-945dda62]{background-color:rgba(0,0,0,0)}.addform .cu-item uni-input[data-v-945dda62]{color:#fff}.cu-list.menu>.cu-item.arrow[data-v-945dda62]:before{color:#fff}",""])},"3dc7":function(t,e,i){"use strict";i.r(e);var a=i("c98d"),s=i("4898");for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i("7209");var o=i("2877"),c=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,"945dda62",null);e["default"]=c.exports},4898:function(t,e,i){"use strict";i.r(e);var a=i("67ea"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=s.a},"67ea":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{system:this.systemInfo(),styleName:"",goodsPrice:0,promoteFlag:!1,promotePrice:0,startDateLabel:"",endDateLabel:"",now:""}},onLoad:function(t){if(t.styleName&&(this.styleName=t.styleName),t.goodsPrice&&(this.goodsPrice=t.goodsPrice),this.now=(new Date).toLocaleDateString().replace(/\//g,"-"),t.promotePrice){this.promoteFlag=!0,this.promotePrice=t.promotePrice;var e=new Date(1e3*t.promoteStarttime);this.startDateLabel=e.toLocaleDateString().replace(/\//g,"-");var i=new Date(1e3*t.promoteEndtime);this.endDateLabel=i.toLocaleDateString().replace(/\//g,"-")}else this.promoteFlag=!1,this.startDateLabel=this.now,this.endDateLabel=this.now},methods:{promoteChange:function(t){this.promoteFlag=t.target.value},startChange:function(t){this.startDateLabel=t.target.value},endChange:function(t){this.endDateLabel=t.target.value},deleteStyle:function(){if(this.styleName.trim().length<=0)uni.showToast({icon:"none",title:"请输入规格名称"});else{var t={};t.styleName=this.styleName,t.delete=!0,uni.setStorageSync("style",JSON.stringify(t)),uni.navigateBack({})}},addStyle:function(){if(this.styleName.trim().length<=0)uni.showToast({icon:"none",title:"请输入规格名称"});else if(this.goodsPrice<=0)uni.showToast({icon:"none",title:"请输入商品价格"});else{var t={};if(t.styleName=this.styleName,t.goodsPrice=this.goodsPrice,this.promoteFlag){if(this.promotePrice<=0)return void uni.showToast({icon:"none",title:"请输入促销价格"});t.promotePrice=this.promotePrice;var e=new Date(this.startDateLabel.replace(/-/g,"/")+" 00:00:00"),i=new Date(this.endDateLabel.replace(/-/g,"/")+" 23:59:59");if(e>=i)return void uni.showToast({icon:"none",title:"请选择有效促销时间"});t.promoteStarttime=Math.floor(e.getTime()/1e3),t.promoteEndtime=Math.floor(i.getTime()/1e3)}uni.setStorageSync("style",JSON.stringify(t)),uni.navigateBack({})}}}};e.default=a},7209:function(t,e,i){"use strict";var a=i("ced1"),s=i.n(a);s.a},c98d:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"addform bg-gradual-pink",staticStyle:{position:"fixed",width:"100%",height:"100%"},style:{paddingTop:t.system.statusBarHeight+"px"}},[i("v-uni-view",{staticClass:"cu-bar ",staticStyle:{position:"fixed","z-index":"1",width:"100%"}},[i("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.back(e)}}},[i("v-uni-text",{staticClass:"cuIcon-back"})],1),i("v-uni-view",{staticClass:"content text-bold"},[t._v("商品规格")])],1),i("v-uni-scroll-view",{staticStyle:{width:"100%",height:"100%","padding-top":"100upx"},attrs:{"scroll-y":"true"}},[i("v-uni-view",{staticClass:"cu-list menu sm-border solid-bottom text-white",staticStyle:{"border-color":"white","margin-top":"0"}},[i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("规格名称")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-input",{staticStyle:{color:"white"},attrs:{placeholder:"规格名称"},model:{value:t.styleName,callback:function(e){t.styleName=e},expression:"styleName"}})],1)],1),i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("商品价格")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-input",{staticStyle:{color:"white"},attrs:{placeholder:"商品价格",type:"digit"},model:{value:t.goodsPrice,callback:function(e){t.goodsPrice=e},expression:"goodsPrice"}})],1)],1),i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("促销")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-switch",{staticClass:"orange radius",class:t.promoteFlag?"checked":"",attrs:{checked:!!t.promoteFlag},on:{change:function(e){e=t.$handleEvent(e),t.promoteChange(e)}}})],1)],1),t.promoteFlag?[i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("促销价格")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-input",{staticStyle:{color:"white"},attrs:{placeholder:"商品价格",type:"digit"},model:{value:t.promotePrice,callback:function(e){t.promotePrice=e},expression:"promotePrice"}})],1)],1),i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("开始日期")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-picker",{attrs:{mode:"date",value:t.startDateLabel,start:t.now,end:"2020-09-01"},on:{change:function(e){e=t.$handleEvent(e),t.startChange(e)}}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.startDateLabel)+" 00:00:00")])],1)],1)],1),i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("结束日期")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-picker",{attrs:{mode:"date",value:t.endDateLabel,start:t.now,end:"2020-09-01"},on:{change:function(e){e=t.$handleEvent(e),t.endChange(e)}}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.endDateLabel)+" 23:59:59")])],1)],1)],1)]:t._e(),i("v-uni-view",{staticClass:"padding flex flex-direction"},[i("v-uni-button",{staticClass:"cu-btn bg-pink margin-tb-sm lg",on:{click:function(e){e=t.$handleEvent(e),t.addStyle(e)}}},[t._v("添加")]),i("v-uni-button",{staticClass:"cu-btn bg-red margin-tb-sm lg",staticStyle:{"background-color":"red"},on:{click:function(e){e=t.$handleEvent(e),t.deleteStyle(e)}}},[t._v("删除")])],1)],2)],1)],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},ced1:function(t,e,i){var a=i("37f8");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("4ae872d2",a,!0,{sourceMap:!1,shadowMode:!1})}}]);