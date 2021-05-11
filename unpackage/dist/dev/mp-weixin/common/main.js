(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/main.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 5));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


















_vue.default.config.productionTip = false;

_vue.default.prototype.systemInfo = function () {
  if (!_App.default.systemInfo) {
    _App.default.systemInfo = uni.getSystemInfoSync();
  }
  return _App.default.systemInfo;
};
_vue.default.prototype.setUserInfo = function (user) {
  if (user) {
    uni.setStorageSync("user", JSON.stringify(user));
    _App.default.userInfo = user;
    uni.setStorageSync("lastUser", JSON.stringify({ phone: user.phone, head_img: user.head_img }));
  } else {
    uni.removeStorageSync("user");
    _App.default.userInfo = null;
  }

};
_vue.default.prototype.lastUserInfo = function () {
  var userjson = uni.getStorageSync("lastUser");
  if (userjson) {
    return JSON.parse(userjson);
  } else {
    return {};
  }
};
_vue.default.prototype.getUserInfo = function () {
  if (!_App.default.userInfo) {


    var userjson = uni.getStorageSync("user");
    console.log("userjson:" + userjson);
    if (userjson) {
      _App.default.login = true;
      _App.default.userInfo = JSON.parse(userjson);

    } else {
      _App.default.login = false;
      _App.default.userInfo = null;
    }

  }
  console.log(_App.default.userInfo);
  return _App.default.userInfo;
};

_vue.default.prototype.getGlobalData = function () {
  if (!_App.default.globalData) {

    _App.default.globalData = {};


  }
  console.log(_App.default.globalData);
  return _App.default.globalData;
};

_vue.default.prototype.setGlobalData = function (data) {
  if (!_App.default.globalData) {

    _App.default.globalData = {};


  }
  _App.default.globalData = Object.assign(_App.default.globalData, data);
  console.log(_App.default.globalData);
  return _App.default.globalData;
};
_vue.default.prototype.getOpenId = function (_success) {









  if (_App.default.openres) {
    _success(_App.default.openres);
    return;
  }
  uni.login({
    provider: "weixin",
    success: function success(res) {
      console.log(res);

      uni.request({
        url: 'https://www.dpsoft.top/user_wx_openid.jsp',
        method: "POST",
        data: {
          js_code: res.code },

        header: {
          "Content-Type": "application/json" },

        success: function success(res) {
          _App.default.openres = res.data.data;
          uni.getUserInfo({
            provider: "weixin",
            success: function success(infoRes) {
              infoRes.openid = res.data.data.openid;
              _App.default.openres = infoRes;
              if (_success) {
                _success(infoRes);
              }
            },
            fail: function fail(e) {
              console.log(e);
              _App.default.modalName = 'userinfo';
            } });


        } });

    } });



};
_vue.default.prototype.getWeixinUserInfo = function (config) {






  // uni.authorize({
  // 	scope: 'scope.userInfo',
  // 	success() {
  uni.getUserInfo({
    provider: 'weixin',
    success: function success(infoRes) {
      console.log('用户昵称为：' + infoRes.userInfo.nickName);

      if (config.success) {
        config.success(infoRes);
      }


    } });

  // 	},
  // 	fail(e){
  // 		console.log(e);
  // 		uni.hideLoading();
  // 		uni.showToast({
  // 			icon:"none",
  // 			title:JSON.stringify(e)
  // 		});
  // 	}
  // });

};

_vue.default.prototype.postJson = function (config) {
  var data = config.data;
  var system = this.systemInfo();
  data.systemName = system.model;
  data.deviceName = system.brand;
  if (!data.deviceName) {

    data.deviceName = "小程序";




  }
  data.deviceUUID = "unknow";
  data.phoneModel = system.platform;
  data.systemVersion = system.system;
  data.localPhoneModel = system.platform;

  data.terminal = "MP-WEIXIN";








  if (this.getUserInfo()) {
    var uid = this.getUserInfo().uid;
    data.loginUid = uid;
    if (!data.uid) {
      data.uid = uid;
    }
  }

  this.getOpenId(function (res) {
    if (res) {
      data.deviceUUID = res.openid;
      data.deviceName = res.userInfo.nickName;
      data.avatarUrl = res.userInfo.avatarUrl;
      data.gender = res.userInfo.gender;

    } else {
      data.deviceUUID = deviceCode();
    }
    console.log(data);
    uni.request({
      url: 'https://www.dpsoft.top' + config.path,
      method: "POST",
      data: data,
      header: {
        "Content-Type": "application/json" },

      success: config.success,
      fail: config.fail,
      complete: config.complete });


  });


};
_vue.default.prototype.back = function () {
  uni.navigateBack({});


};
_vue.default.prototype.toPage = function (page) {
  uni.navigateTo({
    url: page });

};
_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

app.$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!*************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/comps/toast/toast.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _compData = {
  '_toast_.isHide': false, // 控制组件显示隐藏
  '_toast_.content': '' // 显示的内容
};
var toastPannel = {
  // toast显示的方法
  toastSuccess: function toastSuccess(data) {
    var self = this;
    this.setData({ '_toast_.isHidescss': true, '_toast_.content': data });
    setTimeout(function () {
      self.setData({ '_toast_.isHidescss': false }); //自定义方法，根据编辑需求
    }, 2000);
  },

  toastFilled: function toastFilled(data) {
    var self = this;
    this.setData({ '_toast_.isHidefil': true, '_toast_.content': data });
    setTimeout(function () {
      self.setData({ '_toast_.isHidefil': false }); //自定义方法，根据编辑需求
    }, 2000);
  } };


function ToastPannel() {//构造方法关联了当前页的方法及相关代码
  // 拿到当前页面对象
  var pages = getCurrentPages();
  var curPage = pages[pages.length - 1];
  this.__page = curPage;
  // 小程序最新版把原型链干掉了。。。换种写法
  Object.assign(curPage, toastPannel);
  // 附加到page上，方便访问
  curPage.toastPannel = this;
  // 把组件的数据合并到页面的data对象中
  curPage.setData(_compData);
  return this;
}

module.exports = {
  ToastPannel: ToastPannel };

/***/ }),

/***/ 25:
/*!*********************************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 26);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 26:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Volumes/machard/HBuilderProject/goodshowuni/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 5:
/*!************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/App.vue ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 6);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 25);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 27);
var render, staticRenderFns





/* normalize component */

var component = Object(_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "HBuilderProject/goodshowuni/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 6:
/*!*************************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 7);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 7:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Volumes/machard/HBuilderProject/goodshowuni/App.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
__webpack_require__(/*! sdk/libs/strophe */ 8);
var WebIM = __webpack_require__(/*! utils/WebIM */ 12)["default"];
var msgStorage = __webpack_require__(/*! comps/chat/msgstorage */ 19);
var msgType = __webpack_require__(/*! comps/chat/msgtype */ 22);
var ToastPannel = __webpack_require__(/*! ./comps/toast/toast */ 24);
var disp = __webpack_require__(/*! utils/broadcast */ 23);

var logout = false;

function ack(receiveMsg) {
  // 处理未读消息回执
  var bodyId = receiveMsg.id; // 需要发送已读回执的消息id
  var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
  ackMsg.set({
    id: bodyId,
    to: receiveMsg.from });

  WebIM.conn.send(ackMsg.body);
}

function onMessageError(err) {
  if (err.type === "error") {
    uni.showToast({
      title: err.errorText });

    return false;
  }
  return true;
}

function getCurrentRoute() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  return currentPage.route;
}

function calcUnReadSpot(message) {
  var myName = uni.getStorageSync("myUsername");
  var members = uni.getStorageSync("member") || []; //好友
  var listGroups = uni.getStorageSync('listGroup') || []; //群组
  var allMembers = members.concat(listGroups);
  var count = allMembers.reduce(function (result, curMember, idx) {
    var chatMsgs;
    if (curMember.roomId) {
      chatMsgs = uni.getStorageSync(curMember.roomId + myName.toLowerCase()) || [];
    } else {
      chatMsgs = uni.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
    }
    return result + chatMsgs.length;
  }, 0);
  getApp().globalData.unReadMessageNum = count;
  disp.fire("em.xmpp.unreadspot", message);
}




_vue.default.prototype.conn = {
  closed: false,
  curOpenOpt: {},
  open: function open(opt) {
    // uni.showLoading({
    //   title: '正在初始化客户端...',
    //   mask: true
    // })
    this.curOpenOpt = opt;
    WebIM.conn.open(opt);
    this.closed = false;
  },
  reopen: function reopen() {
    if (this.closed) {
      //this.open(this.curOpenOpt);
      WebIM.conn.open(this.curOpenOpt);
      this.closed = false;
    }
  } };var _default =


{
  ToastPannel: ToastPannel,
  globalData: {
    unReadMessageNum: 0,
    userInfo: null,
    saveFriendList: [],
    saveGroupInvitedList: [],
    isIPX: false //是否为iphone X
  },



  // getPage(pageName){
  // 	var pages = getCurrentPages();
  // 	return pages.find(function(page){
  // 		return page.__route__ == pageName;
  // 	});
  // },

  onLaunch: function onLaunch() {
    // 调用 API 从本地缓存中获取数据
    uni.createInnerAudioContext().obeyMuteSwitch = false;
    // uni.setInnerAudioOption({ obeyMuteSwitch: false })
    var me = this;
    var logs = uni.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    uni.setStorageSync("logs", logs);


    // 
    disp.on("em.main.ready", function () {
      calcUnReadSpot();
    });
    disp.on("em.chatroom.leave", function () {
      calcUnReadSpot();
    });
    disp.on("em.chat.session.remove", function () {
      calcUnReadSpot();
    });
    disp.on('em.chat.audio.fileLoaded', function () {
      calcUnReadSpot();
    });

    disp.on('em.main.deleteFriend', function () {
      calcUnReadSpot();
    });
    disp.on('em.chat.audio.fileLoaded', function () {
      calcUnReadSpot();
    });


    // 
    WebIM.conn.listen({
      onOpened: function onOpened(message) {
        WebIM.conn.setPresence();

      },
      onReconnect: function onReconnect() {
        uni.showToast({
          title: "重连中...",
          icon: 'none',
          duration: 2000 });

      },
      onSocketConnected: function onSocketConnected() {
        // uni.showToast({
        //   title: "socket连接成功",
        //   duration: 2000
        // });
      },
      onClosed: function onClosed() {
        uni.showToast({
          title: "网络已断开",
          icon: 'none',
          duration: 2000 });

        // uni.redirectTo({
        //   url: "../login/login"
        // });
        me.conn.closed = true;
        WebIM.conn.close();
      },
      onInviteMessage: function onInviteMessage(message) {
        me.globalData.saveGroupInvitedList.push(message);
        disp.fire("em.xmpp.invite.joingroup", message);
        // uni.showModal({
        // 	title: message.from + " 已邀你入群 " + message.roomid,
        // 	success(){
        // 		disp.fire("em.xmpp.invite.joingroup", message);
        // 	},
        // 	error(){
        // 		disp.fire("em.xmpp.invite.joingroup", message);
        // 	}
        // });
      },
      onPresence: function onPresence(message) {
        //console.log("onPresence", message);
        switch (message.type) {
          case "unsubscribe":
            // pages[0].moveFriend(message);
            break;
          // 好友邀请列表
          case "subscribe":
            if (message.status === "[resp:true]") {

            } else
            {
              // pages[0].handleFriendMsg(message);
              for (var i = 0; i < me.globalData.saveFriendList.length; i++) {
                if (me.globalData.saveFriendList[i].from === message.from) {
                  me.globalData.saveFriendList[i] = message;
                  disp.fire("em.xmpp.subscribe");
                  return;
                }
              }
              me.globalData.saveFriendList.push(message);
              disp.fire("em.xmpp.subscribe");
            }
            break;
          case "subscribed":
            uni.showToast({
              title: "添加成功",
              duration: 1000 });

            disp.fire("em.xmpp.subscribed");
            break;
          case "unsubscribed":
            // uni.showToast({
            // 	title: "已拒绝",
            // 	duration: 1000
            // });
            break;
          case "memberJoinPublicGroupSuccess":
            uni.showToast({
              title: "已进群",
              duration: 1000 });

            break;
          // 好友列表
          // case "subscribed":
          // 	let newFriendList = [];
          // 	for(let i = 0; i < me.globalData.saveFriendList.length; i++){
          // 		if(me.globalData.saveFriendList[i].from != message.from){
          // 			newFriendList.push(me.globalData.saveFriendList[i]);
          // 		}
          // 	}
          // 	me.globalData.saveFriendList = newFriendList;
          // 	break;
          // 删除好友
          case "unavailable":
            disp.fire("em.xmpp.contacts.remove");
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;

          case 'deleteGroupChat':
            disp.fire("em.xmpp.invite.deleteGroup", message);
            break;

          case "leaveGroup":
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;

          case "removedFromGroup":
            disp.fire("em.xmpp.group.leaveGroup", message);
            break;
          // case "joinChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "JoinChatRoomSuccess",
          // 	});
          // 	break;
          // case "memberJoinChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "memberJoinChatRoomSuccess",
          // 	});
          // 	break;
          // case "memberLeaveChatRoomSuccess":
          // 	uni.showToast({
          // 		title: "leaveChatRoomSuccess",
          // 	});
          // 	break;

          default:
            break;}

      },

      onRoster: function onRoster(message) {
        // let pages = getCurrentPages();
        // if(pages[0]){
        // 	pages[0].onShow();
        // }
      },

      onVideoMessage: function onVideoMessage(message) {
        console.log("onVideoMessage: ", message);
        if (message) {
          msgStorage.saveReceiveMsg(message, msgType.VIDEO);
        }
        calcUnReadSpot(message);
        ack(message);
      },

      onAudioMessage: function onAudioMessage(message) {
        console.log("onAudioMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.AUDIO);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onCmdMessage: function onCmdMessage(message) {
        console.log("onCmdMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.CMD);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      // onLocationMessage(message){
      // 	console.log("Location message: ", message);
      // 	if(message){
      // 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
      // 	}
      // },

      onTextMessage: function onTextMessage(message) {
        console.log("onTextMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.TEXT);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onEmojiMessage: function onEmojiMessage(message) {
        console.log("onEmojiMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.EMOJI);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onPictureMessage: function onPictureMessage(message) {
        console.log("onPictureMessage", message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.IMAGE);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      onFileMessage: function onFileMessage(message) {
        console.log('onFileMessage', message);
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.FILE);
          }
          calcUnReadSpot(message);
          ack(message);
        }
      },

      // 各种异常
      onError: function onError(error) {
        console.log(error);
        // 16: server-side close the websocket connection
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout) {
          if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
            return;
          }
          uni.showToast({
            title: "server-side close the websocket connection",
            duration: 1000 });

          // uni.redirectTo({
          //   url: "../login/login"
          // });
          logout = true;
          return;
        }
        // 8: offline by multi login
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
          uni.showToast({
            title: "offline by multi login",
            duration: 1000 });

          // uni.redirectTo({
          //   url: "../login/login"
          // });
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
          uni.hideLoading();
          disp.fire("em.xmpp.error.passwordErr");
          // uni.showModal({
          // 	title: "用户名或密码错误",
          // 	confirmText: "OK",
          // 	showCancel: false
          // });
        }
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
          uni.hideLoading();
          disp.fire("em.xmpp.error.tokenErr");
        }
        if (error.type == 'socket_error') {///sendMsgError
          console.log('socket_errorsocket_error', error);
          uni.showToast({
            title: "网络已断开",
            icon: 'none',
            duration: 2000 });

          disp.fire("em.xmpp.error.sendMsgErr", error);
        }
      } });

    this.checkIsIPhoneX();

    if (uni.getStorageSync("user")) {
      var userjson = uni.getStorageSync("user");
      var user = JSON.parse(userjson);
      this.conn.open({
        apiUrl: WebIM.config.apiURL,
        user: user.uid,
        pwd: '111111',
        grant_type: 'password',
        appKey: WebIM.config.appkey });

    }
  },
  // onShow(){
  // 	WebIM.conn.reconnect();
  // },

  // onHide(){

  // 	WebIM.conn.close();
  // 	WebIM.conn.stopHeartBeat();
  // },

  // onUnload(){
  // 	WebIM.conn.close();
  // 	WebIM.conn.stopHeartBeat();
  // 	uni.redirectTo({
  // 		url: "../login/login?myName=" + myName
  // 	});
  // },

  methods: {

    getUserInfo: function getUserInfo(cb) {
      var me = this;
      if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo);
      } else
      {
        // 调用登录接口
        uni.login({
          success: function success() {
            uni.getUserInfo({
              success: function success(res) {
                me.globalData.userInfo = res.userInfo;
                typeof cb == "function" && cb(me.globalData.userInfo);
              } });

          } });

      }
    },
    checkIsIPhoneX: function checkIsIPhoneX() {
      var me = this;
      uni.getSystemInfo({
        success: function success(res) {
          // 根据 model 进行判断
          if (res.model && res.model.search('iPhone X') != -1) {
            me.globalData.isIPX = true;
          }
        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map