(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-add-addform"],{"09ae":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".addform .cu-list.menu>.cu-item[data-v-36c9787e]{background-color:rgba(0,0,0,0)}.addform .cu-item uni-input[data-v-36c9787e]{color:#fff}.cu-list.menu>.cu-item.arrow[data-v-36c9787e]:before{color:#fff}",""])},"16b0":function(t,e,i){"use strict";var a=i("86b9"),s=i.n(a);s.a},"39cb":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{system:this.systemInfo(),title:"",seller:"",takeType:2,categoryArray:[["请选择"],["请选择"]],categoryIndex:[0,0],categoryLabel:"请选择",categoryData:[],stylelist:[],detaillist:[],location:{},locationName:"请选择",postFee:0}},onLoad:function(){var t=this;this.postJson({path:"/goods_category_query.jsp",data:{},success:function(e){if("ok"==e.data.status){for(var i in t.categoryData=e.data.data,t.categoryArray[0]=[],e.data.data){var a=e.data.data[i];t.categoryArray[0].push(a.name)}for(var s in t.categoryArray[1]=[],e.data.data[0].child){var n=e.data.data[0].child[s];t.categoryArray[1].push(n.name)}t.categoryLabel=t.categoryArray[0][0]+" - "+t.categoryArray[1][0]}}})},onShow:function(){var t=uni.getStorageSync("style");if(t){console.log(t);var e=JSON.parse(t),i=!1;for(var a in this.stylelist)if(this.stylelist[a].styleName==e.styleName){i=!0,e.delete?this.stylelist.splice(a,1):this.stylelist.splice(a,1,e);break}i||this.stylelist.push(e)}uni.removeStorage({key:"style"});var s=uni.getStorageSync("detail");s&&(console.log(s),this.detaillist=JSON.parse(s)),uni.removeStorage({key:"detail"})},methods:{addStyle:function(t){var e=t.currentTarget.dataset.index,i="";if(null!=e){console.log(e),i+="?";var a=this.stylelist[e];i+="goodsPrice="+a.goodsPrice,i+="&styleName="+a.styleName,a.promotePrice&&(i+="&promotePrice="+a.promotePrice,i+="&promoteStarttime="+a.promoteStarttime,i+="&promoteEndtime="+a.promoteEndtime)}uni.navigateTo({url:"/pages/add/addstyle"+i})},addDetail:function(){var t="";if(this.detaillist.length>0){var e=JSON.stringify(this.detaillist);console.log(e),t+="?detail="+e}uni.navigateTo({url:"/pages/add/adddetail"+t})},chooseLocation:function(){var t=this;uni.chooseLocation({success:function(e){console.log("位置名称："+e.name),console.log("详细地址："+e.address),console.log("纬度："+e.latitude),console.log("经度："+e.longitude),t.location=e,t.locationName=e.name}})},categoryChange:function(t){var e={multiArray:this.categoryArray,multiIndex:this.categoryIndex,multiData:this.categoryData};switch(e.multiIndex[t.detail.column]=t.detail.value,t.detail.column){case 0:var i=e.multiData[t.detail.value].child;for(var a in e.multiArray[1]=[],i){var s=i[a];e.multiArray[1].push(s.name)}this.categoryArray=e.multiArray,this.categoryLabel=this.categoryArray[0][this.categoryIndex[0]]+" - "+this.categoryArray[1][this.categoryIndex[1]];break;case 1:this.categoryLabel=this.categoryArray[0][this.categoryIndex[0]]+" - "+this.categoryArray[1][this.categoryIndex[1]];break}},setCategory:function(t){this.categoryIndex=t.detail.value},submit:function(){if(this.title.trim().length<=0)uni.showToast({icon:"none",title:"请输入标题"});else if(this.seller.trim().length<=0)uni.showToast({icon:"none",title:"请输入店名"});else if(this.seller.trim().length<=0)uni.showToast({icon:"none",title:"请输入店名"});else if(this.stylelist.length<=0)uni.showToast({icon:"none",title:"请添加商品规格"});else if(this.seller.trim().length<=0)uni.showToast({icon:"none",title:"请输入店名"});else if(this.location.name)if(this.detaillist.length<=0)uni.showToast({icon:"none",title:"请编辑商品详情"});else{var t={};t.title=this.title,t.seller=this.seller,t.location=this.location.longitude+","+this.location.latitude,t.takeType=this.takeType,t.category=this.categoryData[this.categoryIndex[0]].child[this.categoryIndex[1]].key,t.goodsDetail=this.detaillist,t.goodsStyle=this.stylelist,t.postFee=this.postFee,uni.showLoading({title:"加载中",mask:!0}),this.postJson({path:"/goods_category_query.jsp",data:t,success:function(t){if("ok"==t.data.status){var e=t.data.data;uni.setStorageSync("goods",JSON.stringify(e)),uni.navigateBack({})}else uni.showToast({icon:"none",title:t.data.msg})},complete:function(){uni.hideLoading()}})}else uni.showToast({icon:"none",title:"请选择地理位置"})}}};e.default=a},6731:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"addform bg-gradual-pink",staticStyle:{position:"fixed",width:"100%",height:"100%"},style:{paddingTop:t.system.statusBarHeight+"px"}},[i("v-uni-view",{staticClass:"cu-bar ",staticStyle:{position:"fixed","z-index":"1",width:"100%"}},[i("v-uni-view",{staticClass:"action",on:{click:function(e){e=t.$handleEvent(e),t.back(e)}}},[i("v-uni-text",{staticClass:"cuIcon-back"})],1),i("v-uni-view",{staticClass:"content text-bold"},[t._v("录入商品")])],1),i("v-uni-scroll-view",{staticStyle:{width:"100%",height:"100%","padding-top":"100upx"},attrs:{"scroll-y":"true"}},[i("v-uni-view",{staticClass:"cu-list menu sm-border solid-bottom text-white",staticStyle:{"border-color":"white","margin-top":"0"}},[i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-textarea",{staticStyle:{height:"200upx",width:"100%",color:"white","font-size":"40upx"},attrs:{maxlength:"-1",placeholder:"请输入商品标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("店名")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-input",{staticStyle:{color:"white"},attrs:{placeholder:"输入店名/品牌"},model:{value:t.seller,callback:function(e){t.seller=e},expression:"seller"}})],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("消费方式")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-picker",{attrs:{range:["门店消费","邮寄配送","免邮配送"]},on:{change:function(e){e=t.$handleEvent(e),t.setTakeType(e)}},model:{value:t.takeType,callback:function(e){t.takeType=e},expression:"takeType"}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(["门店消费","邮寄配送","免邮配送"][t.takeType]))])],1)],1)],1),1==t.takeType?i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("邮费")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-input",{staticStyle:{color:"white"},attrs:{placeholder:"输入邮寄费用",type:"digit"},model:{value:t.postFee,callback:function(e){t.postFee=e},expression:"postFee"}})],1)],1):t._e(),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("商品分类")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-picker",{attrs:{mode:"multiSelector",value:t.categoryIndex,range:t.categoryArray},on:{change:function(e){e=t.$handleEvent(e),t.setCategory(e)},columnchange:function(e){e=t.$handleEvent(e),t.categoryChange(e)}}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.categoryLabel))])],1)],1)],1),t._l(t.stylelist,function(e,a){return i("v-uni-view",{key:a,staticClass:"cu-item arrow",attrs:{"data-index":a},on:{click:function(e){e=t.$handleEvent(e),t.addStyle(e)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v(t._s(e.styleName))])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-text",{staticClass:"text-white text-sm"},[t._v(t._s(e.promotePrice?"促销¥"+e.promotePrice:"¥"+e.goodsPrice))])],1)],1)}),i("v-uni-view",{staticClass:"padding flex flex-direction"},[i("v-uni-button",{staticClass:"cu-btn block line-white lg",on:{click:function(e){e=t.$handleEvent(e),t.addStyle(e)}}},[i("v-uni-text",{staticClass:"cuIcon-add"}),t._v("添加规格")],1)],1),i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){e=t.$handleEvent(e),t.chooseLocation(e)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("地理位置")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-text",{staticClass:"text-white text-sm"},[t._v(t._s(t.locationName))])],1)],1),i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){e=t.$handleEvent(e),t.addDetail(e)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("编辑商品详情")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-text",{staticClass:"text-white text-sm"},[t._v(t._s(t.detaillist.length>0?"已编辑":"未编辑"))])],1)],1),i("v-uni-view",{staticClass:"cu-item arrow"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-white"},[t._v("卖家协议")])],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-text",{staticClass:"text-white text-sm"},[t._v("请仔细阅读")])],1)],1),i("v-uni-view",{staticClass:"padding flex flex-direction"},[i("v-uni-button",{staticClass:"cu-btn bg-red margin-tb-sm lg",on:{click:function(e){e=t.$handleEvent(e),t.submit(e)}}},[t._v("提交")])],1)],2)],1)],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},"86b9":function(t,e,i){var a=i("09ae");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("47505c45",a,!0,{sourceMap:!1,shadowMode:!1})},b7eb:function(t,e,i){"use strict";i.r(e);var a=i("39cb"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=s.a},ca08:function(t,e,i){"use strict";i.r(e);var a=i("6731"),s=i("b7eb");for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i("16b0");var o=i("2877"),l=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,"36c9787e",null);e["default"]=l.exports}}]);