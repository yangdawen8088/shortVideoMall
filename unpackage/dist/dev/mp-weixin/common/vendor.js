(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}



var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage$$1 = _ref5.isPage,initRelation$$1 = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage$$1.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation$$1.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage$$1) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!***************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// fix env
try {
    if (!global) global = {}
    global.process = global.process || {}
    global.process.env = global.process.env || {}
    global.App = global.App || App
    global.Page = global.Page || Page
    global.Component = global.Component || Component
    global.getApp = global.getApp || getApp
} catch (e) {}

;(function(global, factory) {
     true
        ? (module.exports = factory())
        : undefined
})(this, function() {
    "use strict"

    //fixed by xxxxxx
    function calcDiff(holder, key, newObj, oldObj) {
        if (newObj === oldObj || newObj === undefined) {
            return
        }

        if (newObj == null || oldObj == null || typeof newObj !== typeof oldObj) {
            holder[key] = newObj
        } else if (Array.isArray(newObj) && Array.isArray(oldObj)) {
            if (newObj.length === oldObj.length) {
                for (var i = 0, len = newObj.length; i < len; ++i) {
                    calcDiff(holder, key + "[" + i + "]", newObj[i], oldObj[i])
                }
            } else {
                holder[key] = newObj
            }
        } else if (typeof newObj === "object" && typeof oldObj === "object") {
            var newKeys = Object.keys(newObj)
            var oldKeys = Object.keys(oldObj)

            if (newKeys.length !== oldKeys.length) {
                holder[key] = newObj
            } else {
                var allKeysSet = Object.create(null)
                for (var i = 0, len = newKeys.length; i < len; ++i) {
                    allKeysSet[newKeys[i]] = true
                    allKeysSet[oldKeys[i]] = true
                }
                if (Object.keys(allKeysSet).length !== newKeys.length) {
                    holder[key] = newObj
                } else {
                    for (var i = 0, len = newKeys.length; i < len; ++i) {
                        var k = newKeys[i]
                        calcDiff(holder, key + "." + k, newObj[k], oldObj[k])
                    }
                }
            }
        } else if (newObj !== oldObj) {
            holder[key] = newObj
        }
    }

    function diff(newObj, oldObj) {
        var keys = Object.keys(newObj)
        var diffResult = {}
        for (var i = 0, len = keys.length; i < len; ++i) {
            var k = keys[i]
            var oldKeyPath = k.split(".")
            var oldValue = oldObj[oldKeyPath[0]]
            for (var j = 1, jlen = oldKeyPath.length; j < jlen && oldValue !== undefined; ++j) {
                oldValue = oldValue[oldKeyPath[j]]
            }
            calcDiff(diffResult, k, newObj[k], oldValue)
        }
        return diffResult
    }

    /*  */

    // these helpers produces better vm code in JS engines due to their
    // explicitness and function inlining
    function isUndef(v) {
        return v === undefined || v === null
    }

    function isDef(v) {
        return v !== undefined && v !== null
    }

    function isTrue(v) {
        return v === true
    }

    function isFalse(v) {
        return v === false
    }

    /**
     * Check if value is primitive
     */
    function isPrimitive(value) {
        return typeof value === "string" || typeof value === "number"
    }

    /**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     */
    function isObject(obj) {
        return obj !== null && typeof obj === "object"
    }

    var _toString = Object.prototype.toString

    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     */
    function isPlainObject(obj) {
        return _toString.call(obj) === "[object Object]"
    }

    function isRegExp(v) {
        return _toString.call(v) === "[object RegExp]"
    }

    /**
     * Check if val is a valid array index.
     */
    function isValidArrayIndex(val) {
        var n = parseFloat(val)
        return n >= 0 && Math.floor(n) === n && isFinite(val)
    }

    /**
     * Convert a value to a string that is actually rendered.
     */
    function toString(val) {
        return val == null
            ? ""
            : typeof val === "object"
                ? JSON.stringify(val, null, 2)
                : String(val)
    }

    /**
     * Convert a input value to a number for persistence.
     * If the conversion fails, return original string.
     */
    function toNumber(val) {
        var n = parseFloat(val)
        return isNaN(n) ? val : n
    }

    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     */
    function makeMap(str, expectsLowerCase) {
        var map = Object.create(null)
        var list = str.split(",")
        for (var i = 0; i < list.length; i++) {
            map[list[i]] = true
        }
        return expectsLowerCase
            ? function(val) {
                  return map[val.toLowerCase()]
              }
            : function(val) {
                  return map[val]
              }
    }

    /**
     * Check if a tag is a built-in tag.
     */
    var isBuiltInTag = makeMap("slot,component", true)

    /**
     * Check if a attribute is a reserved attribute.
     */
    var isReservedAttribute = makeMap("key,ref,slot,is")

    /**
     * Remove an item from an array
     */
    function remove(arr, item) {
        if (arr.length) {
            var index = arr.indexOf(item)
            if (index > -1) {
                return arr.splice(index, 1)
            }
        }
    }

    /**
     * Check whether the object has the property.
     */
    var hasOwnProperty = Object.prototype.hasOwnProperty

    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key)
    }

    /**
     * Create a cached version of a pure function.
     */
    function cached(fn) {
        var cache = Object.create(null)
        return function cachedFn(str) {
            var hit = cache[str]
            return hit || (cache[str] = fn(str))
        }
    }

    /**
     * Camelize a hyphen-delimited string.
     */
    var camelizeRE = /-(\w)/g
    var camelize = cached(function(str) {
        return str.replace(camelizeRE, function(_, c) {
            return c ? c.toUpperCase() : ""
        })
    })

    /**
     * Capitalize a string.
     */
    var capitalize = cached(function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    })

    /**
     * Hyphenate a camelCase string.
     */
    var hyphenateRE = /([^-])([A-Z])/g
    var hyphenate = cached(function(str) {
        return str
            .replace(hyphenateRE, "$1-$2")
            .replace(hyphenateRE, "$1-$2")
            .toLowerCase()
    })

    /**
     * Simple bind, faster than native
     */
    function bind(fn, ctx) {
        function boundFn(a) {
            var l = arguments.length
            return l ? (l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a)) : fn.call(ctx)
        }
        // record original fn length
        boundFn._length = fn.length
        return boundFn
    }

    /**
     * Convert an Array-like object to a real Array.
     */
    function toArray(list, start) {
        start = start || 0
        var i = list.length - start
        var ret = new Array(i)
        while (i--) {
            ret[i] = list[i + start]
        }
        return ret
    }

    /**
     * Mix properties into target object.
     */
    function extend(to, _from) {
        for (var key in _from) {
            to[key] = _from[key]
        }
        return to
    }

    /**
     * Merge an Array of Objects into a single Object.
     */
    function toObject(arr) {
        var res = {}
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
                extend(res, arr[i])
            }
        }
        return res
    }

    /**
     * Perform no operation.
     * Stubbing args to make Flow happy without leaving useless transpiled code
     * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
     */
    function noop(a, b, c) {}

    /**
     * Always return false.
     */
    var no = function(a, b, c) {
        return false
    }

    /**
     * Return same value
     */
    var identity = function(_) {
        return _
    }

    /**
     * Generate a static keys string from compiler modules.
     */

    /**
     * Check if two values are loosely equal - that is,
     * if they are plain objects, do they have the same shape?
     */
    function looseEqual(a, b) {
        var isObjectA = isObject(a)
        var isObjectB = isObject(b)
        if (isObjectA && isObjectB) {
            try {
                return JSON.stringify(a) === JSON.stringify(b)
            } catch (e) {
                // possible circular reference
                return a === b
            }
        } else if (!isObjectA && !isObjectB) {
            return String(a) === String(b)
        } else {
            return false
        }
    }

    function looseIndexOf(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (looseEqual(arr[i], val)) {
                return i
            }
        }
        return -1
    }

    /**
     * Ensure a function is called only once.
     */
    function once(fn) {
        var called = false
        return function() {
            if (!called) {
                called = true
                fn.apply(this, arguments)
            }
        }
    }

    var SSR_ATTR = "data-server-rendered"

    var ASSET_TYPES = ["component", "directive", "filter"]

    var LIFECYCLE_HOOKS = [
        "beforeCreate",
        "created",
        "beforeMount",
        "mounted",
        "beforeUpdate",
        "updated",
        "beforeDestroy",
        "destroyed",
        "activated",
        "deactivated",
        "onLaunch",
        "onLoad",
        "onShow",
        "onReady",
        "onHide",
        "onUnload",
        "onPullDownRefresh",
        "onReachBottom",
        "onShareAppMessage",
        "onPageScroll",
        "onTabItemTap",
        "attached",
        "ready",
        "moved",
        "detached",
        "onUniNViewMessage", //fixed by xxxxxx
        "onNavigationBarButtonTap", //fixed by xxxxxx
        "onBackPress",//fixed by xxxxxx
    ]

    /*  */

    var config = {
        /**
         * Option merge strategies (used in core/util/options)
         */
        optionMergeStrategies: Object.create(null),

        /**
         * Whether to suppress warnings.
         */
        silent: false,

        /**
         * Show production mode tip message on boot?
         */
        productionTip: "production" !== "production",

        /**
         * Whether to enable devtools
         */
        devtools: "production" !== "production",

        /**
         * Whether to record perf
         */
        performance: false,

        /**
         * Error handler for watcher errors
         */
        errorHandler: null,

        /**
         * Warn handler for watcher warns
         */
        warnHandler: null,

        /**
         * Ignore certain custom elements
         */
        ignoredElements: [],

        /**
         * Custom user key aliases for v-on
         */
        keyCodes: Object.create(null),

        /**
         * Check if a tag is reserved so that it cannot be registered as a
         * component. This is platform-dependent and may be overwritten.
         */
        isReservedTag: no,

        /**
         * Check if an attribute is reserved so that it cannot be used as a component
         * prop. This is platform-dependent and may be overwritten.
         */
        isReservedAttr: no,

        /**
         * Check if a tag is an unknown element.
         * Platform-dependent.
         */
        isUnknownElement: no,

        /**
         * Get the namespace of an element
         */
        getTagNamespace: noop,

        /**
         * Parse the real tag name for the specific platform.
         */
        parsePlatformTagName: identity,

        /**
         * Check if an attribute must be bound using property, e.g. value
         * Platform-dependent.
         */
        mustUseProp: no,

        /**
         * Exposed for legacy reasons
         */
        _lifecycleHooks: LIFECYCLE_HOOKS
    }

    /*  */

    var emptyObject = Object.freeze({})

    /**
     * Check if a string starts with $ or _
     */
    function isReserved(str) {
        var c = (str + "").charCodeAt(0)
        return c === 0x24 || c === 0x5f
    }

    /**
     * Define a property.
     */
    function def(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        })
    }

    /**
     * Parse simple path.
     */
    var bailRE = /[^\w.$]/

    function parsePath(path) {
        if (bailRE.test(path)) {
            return
        }
        var segments = path.split(".")
        return function(obj) {
            for (var i = 0; i < segments.length; i++) {
                if (!obj) {
                    return
                }
                obj = obj[segments[i]]
            }
            return obj
        }
    }

    /*  */

    var warn = noop

    var formatComponentName = null // work around flow check

    /*  */

    function handleError(err, vm, info) {
        if (config.errorHandler) {
            config.errorHandler.call(null, err, vm, info)
        } else {
            if (inBrowser && typeof console !== "undefined") {
                console.error(err)
            } else {
                throw err
            }
        }
    }

    /*  */

    // can we use __proto__?
    var hasProto = "__proto__" in {}

    // Browser environment sniffing
    var inBrowser = typeof window !== "undefined"
    var UA = ["mpvue-runtime"].join()
    var isIE = UA && /msie|trident/.test(UA)
    var isIE9 = UA && UA.indexOf("msie 9.0") > 0
    var isEdge = UA && UA.indexOf("edge/") > 0
    var isAndroid = UA && UA.indexOf("android") > 0
    var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
    var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

    // Firefix has a "watch" function on Object.prototype...
    var nativeWatch = {}.watch

    var supportsPassive = false
    if (inBrowser) {
        try {
            var opts = {}
            Object.defineProperty(opts, "passive", {
                get: function get() {
                    /* istanbul ignore next */
                    supportsPassive = true
                }
            }) // https://github.com/facebook/flow/issues/285
            window.addEventListener("test-passive", null, opts)
        } catch (e) {}
    }

    // this needs to be lazy-evaled because vue may be required before
    // vue-server-renderer can set VUE_ENV
    var _isServer
    var isServerRendering = function() {
        if (_isServer === undefined) {
            /* istanbul ignore if */
            if (!inBrowser && typeof global !== "undefined") {
                // detect presence of vue-server-renderer and avoid
                // Webpack shimming the process
                _isServer = global["process"].env.VUE_ENV === "server"
            } else {
                _isServer = false
            }
        }
        return _isServer
    }

    // detect devtools
    var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

    /* istanbul ignore next */
    function isNative(Ctor) {
        return typeof Ctor === "function" && /native code/.test(Ctor.toString())
    }

    var hasSymbol =
        typeof Symbol !== "undefined" &&
        isNative(Symbol) &&
        typeof Reflect !== "undefined" &&
        isNative(Reflect.ownKeys)

    /**
     * Defer a task to execute it asynchronously.
     */
    var nextTick = (function() {
        var callbacks = []
        var pending = false
        var timerFunc

        function nextTickHandler() {
            pending = false
            var copies = callbacks.slice(0)
            callbacks.length = 0
            for (var i = 0; i < copies.length; i++) {
                copies[i]()
            }
        }

        // the nextTick behavior leverages the microtask queue, which can be accessed
        // via either native Promise.then or MutationObserver.
        // MutationObserver has wider support, however it is seriously bugged in
        // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
        // completely stops working after triggering a few times... so, if native
        // Promise is available, we will use it:
        /* istanbul ignore if */
        if (typeof Promise !== "undefined" && isNative(Promise)) {
            var p = Promise.resolve()
            var logError = function(err) {
                console.error(err)
            }
            timerFunc = function() {
                p.then(nextTickHandler).catch(logError)
                // in problematic UIWebViews, Promise.then doesn't completely break, but
                // it can get stuck in a weird state where callbacks are pushed into the
                // microtask queue but the queue isn't being flushed, until the browser
                // needs to do some other work, e.g. handle a timer. Therefore we can
                // "force" the microtask queue to be flushed by adding an empty timer.
                if (isIOS) {
                    setTimeout(noop)
                }
            }
            // } else if (typeof MutationObserver !== 'undefined' && (
            //   isNative(MutationObserver) ||
            //   // PhantomJS and iOS 7.x
            //   MutationObserver.toString() === '[object MutationObserverConstructor]'
            // )) {
            //   // use MutationObserver where native Promise is not available,
            //   // e.g. PhantomJS IE11, iOS7, Android 4.4
            //   var counter = 1
            //   var observer = new MutationObserver(nextTickHandler)
            //   var textNode = document.createTextNode(String(counter))
            //   observer.observe(textNode, {
            //     characterData: true
            //   })
            //   timerFunc = () => {
            //     counter = (counter + 1) % 2
            //     textNode.data = String(counter)
            //   }
        } else {
            // fallback to setTimeout
            /* istanbul ignore next */
            timerFunc = function() {
                setTimeout(nextTickHandler, 0)
            }
        }

        return function queueNextTick(cb, ctx) {
            var _resolve
            callbacks.push(function() {
                if (cb) {
                    try {
                        cb.call(ctx)
                    } catch (e) {
                        handleError(e, ctx, "nextTick")
                    }
                } else if (_resolve) {
                    _resolve(ctx)
                }
            })
            if (!pending) {
                pending = true
                timerFunc()
            }
            if (!cb && typeof Promise !== "undefined") {
                return new Promise(function(resolve, reject) {
                    _resolve = resolve
                })
            }
        }
    })()

    var _Set
    /* istanbul ignore if */
    if (typeof Set !== "undefined" && isNative(Set)) {
        // use native Set when available.
        _Set = Set
    } else {
        // a non-standard Set polyfill that only works with primitive keys.
        _Set = (function() {
            function Set() {
                this.set = Object.create(null)
            }
            Set.prototype.has = function has(key) {
                return this.set[key] === true
            }
            Set.prototype.add = function add(key) {
                this.set[key] = true
            }
            Set.prototype.clear = function clear() {
                this.set = Object.create(null)
            }

            return Set
        })()
    }

    /*  */

    var uid$1 = 0

    /**
     * A dep is an observable that can have multiple
     * directives subscribing to it.
     */
    var Dep = function Dep() {
        this.id = uid$1++
        this.subs = []
    }

    Dep.prototype.addSub = function addSub(sub) {
        this.subs.push(sub)
    }

    Dep.prototype.removeSub = function removeSub(sub) {
        remove(this.subs, sub)
    }

    Dep.prototype.depend = function depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    Dep.prototype.notify = function notify() {
        // stabilize the subscriber list first
        var subs = this.subs.slice()
        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }

    // the current target watcher being evaluated.
    // this is globally unique because there could be only one
    // watcher being evaluated at any time.
    Dep.target = null
    var targetStack = []

    function pushTarget(_target) {
        if (Dep.target) {
            targetStack.push(Dep.target)
        }
        Dep.target = _target
    }

    function popTarget() {
        Dep.target = targetStack.pop()
    }

    /*
     * not type checking this file because flow doesn't play well with
     * dynamically accessing methods on Array prototype
     */

    var arrayProto = Array.prototype
    var arrayMethods = Object.create(arrayProto)
    ;["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function(method) {
        // cache original method
        var original = arrayProto[method]
        def(arrayMethods, method, function mutator() {
            var args = [],
                len = arguments.length
            while (len--) args[len] = arguments[len]

            var result = original.apply(this, args)
            var ob = this.__ob__
            var inserted
            switch (method) {
                case "push":
                case "unshift":
                    inserted = args
                    break
                case "splice":
                    inserted = args.slice(2)
                    break
            }
            if (inserted) {
                ob.observeArray(inserted)
            }
            // notify change
            ob.dep.notify()
            return result
        })
    })

    /*  */

    var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

    /**
     * By default, when a reactive property is set, the new value is
     * also converted to become reactive. However when passing down props,
     * we don't want to force conversion because the value may be a nested value
     * under a frozen data structure. Converting it would defeat the optimization.
     */
    var observerState = {
        shouldConvert: true
    }

    /**
     * Observer class that are attached to each observed
     * object. Once attached, the observer converts target
     * object's property keys into getter/setters that
     * collect dependencies and dispatches updates.
     */
    var Observer = function Observer(value) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        def(value, "__ob__", this)
        if (Array.isArray(value)) {
            var augment = hasProto ? protoAugment : copyAugment
            augment(value, arrayMethods, arrayKeys)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    /**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    Observer.prototype.walk = function walk(obj) {
        var keys = Object.keys(obj)
        for (var i = 0; i < keys.length; i++) {
            defineReactive$$1(obj, keys[i], obj[keys[i]])
        }
    }

    /**
     * Observe a list of Array items.
     */
    Observer.prototype.observeArray = function observeArray(items) {
        for (var i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }

    // helpers

    /**
     * Augment an target Object or Array by intercepting
     * the prototype chain using __proto__
     */
    function protoAugment(target, src, keys) {
        /* eslint-disable no-proto */
        target.__proto__ = src
        /* eslint-enable no-proto */
    }

    /**
     * Augment an target Object or Array by defining
     * hidden properties.
     */
    /* istanbul ignore next */
    function copyAugment(target, src, keys) {
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i]
            def(target, key, src[key])
        }
    }

    /**
     * Attempt to create an observer instance for a value,
     * returns the new observer if successfully observed,
     * or the existing observer if the value already has one.
     */
    function observe(value, asRootData) {
        if (!isObject(value)) {
            return
        }
        var ob
        if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
            ob = value.__ob__
        } else if (
            observerState.shouldConvert &&
            !isServerRendering() &&
            (Array.isArray(value) || isPlainObject(value)) &&
            Object.isExtensible(value) &&
            !value._isVue
        ) {
            ob = new Observer(value)
        }
        if (asRootData && ob) {
            ob.vmCount++
        }
        return ob
    }

    /**
     * Define a reactive property on an Object.
     */
    function defineReactive$$1(obj, key, val, customSetter, shallow) {
        var dep = new Dep()

        var property = Object.getOwnPropertyDescriptor(obj, key)
        if (property && property.configurable === false) {
            return
        }

        // cater for pre-defined getter/setters
        var getter = property && property.get
        var setter = property && property.set

        var childOb = !shallow && observe(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                var value = getter ? getter.call(obj) : val
                if (Dep.target) {
                    dep.depend()
                    if (childOb) {
                        childOb.dep.depend()
                    }
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
                return value
            },
            set: function reactiveSetter(newVal) {
                var value = getter ? getter.call(obj) : val
                /* eslint-disable no-self-compare */
                if (newVal === value || (newVal !== newVal && value !== value)) {
                    return
                }
                /* eslint-enable no-self-compare */
                if (false) {}
                if (setter) {
                    setter.call(obj, newVal)
                } else {
                    val = newVal
                }
                childOb = !shallow && observe(newVal)
                dep.notify()
            }
        })
    }

    /**
     * Set a property on an object. Adds the new property and
     * triggers change notification if the property doesn't
     * already exist.
     */
    function set(target, key, val) {
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key)
            target.splice(key, 1, val)
            return val
        }
        if (hasOwn(target, key)) {
            target[key] = val
            return val
        }
        var ob = target.__ob__
        if (target._isVue || (ob && ob.vmCount)) {
             false &&
                false
            return val
        }
        if (!ob) {
            target[key] = val
            return val
        }
        defineReactive$$1(ob.value, key, val)
        ob.dep.notify()
        return val
    }

    /**
     * Delete a property and trigger change if necessary.
     */
    function del(target, key) {
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.splice(key, 1)
            return
        }
        var ob = target.__ob__
        if (target._isVue || (ob && ob.vmCount)) {
             false &&
                false
            return
        }
        if (!hasOwn(target, key)) {
            return
        }
        delete target[key]
        if (!ob) {
            return
        }
        ob.dep.notify()
    }

    /**
     * Collect dependencies on array elements when the array is touched, since
     * we cannot intercept array element access like property getters.
     */
    function dependArray(value) {
        for (var e = void 0, i = 0, l = value.length; i < l; i++) {
            e = value[i]
            e && e.__ob__ && e.__ob__.dep.depend()
            if (Array.isArray(e)) {
                dependArray(e)
            }
        }
    }

    /*  */

    /**
     * Option overwriting strategies are functions that handle
     * how to merge a parent option value and a child option
     * value into the final value.
     */
    var strats = config.optionMergeStrategies

    /**
     * Options with restrictions
     */
    /**
     * Helper that recursively merges two data objects together.
     */
    function mergeData(to, from) {
        if (!from) {
            return to
        }
        var key, toVal, fromVal
        var keys = Object.keys(from)
        for (var i = 0; i < keys.length; i++) {
            key = keys[i]
            toVal = to[key]
            fromVal = from[key]
            if (!hasOwn(to, key)) {
                set(to, key, fromVal)
            } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
                mergeData(toVal, fromVal)
            }
        }
        return to
    }

    /**
     * Data
     */
    function mergeDataOrFn(parentVal, childVal, vm) {
        if (!vm) {
            // in a Vue.extend merge, both should be functions
            if (!childVal) {
                return parentVal
            }
            if (!parentVal) {
                return childVal
            }
            // when parentVal & childVal are both present,
            // we need to return a function that returns the
            // merged result of both functions... no need to
            // check if parentVal is a function here because
            // it has to be a function to pass previous merges.
            return function mergedDataFn() {
                return mergeData(
                    typeof childVal === "function" ? childVal.call(this) : childVal,
                    parentVal.call(this)
                )
            }
        } else if (parentVal || childVal) {
            return function mergedInstanceDataFn() {
                // instance merge
                var instanceData = typeof childVal === "function" ? childVal.call(vm) : childVal
                var defaultData = typeof parentVal === "function" ? parentVal.call(vm) : undefined
                if (instanceData) {
                    return mergeData(instanceData, defaultData)
                } else {
                    return defaultData
                }
            }
        }
    }

    strats.data = function(parentVal, childVal, vm) {
        if (!vm) {
            if (childVal && typeof childVal !== "function") {
                 false &&
                    false

                return parentVal
            }
            return mergeDataOrFn.call(this, parentVal, childVal)
        }

        return mergeDataOrFn(parentVal, childVal, vm)
    }

    /**
     * Hooks and props are merged as arrays.
     */
    function mergeHook(parentVal, childVal) {
        return childVal
            ? parentVal
                ? parentVal.concat(childVal)
                : Array.isArray(childVal)
                    ? childVal
                    : [childVal]
            : parentVal
    }

    LIFECYCLE_HOOKS.forEach(function(hook) {
        strats[hook] = mergeHook
    })

    /**
     * Assets
     *
     * When a vm is present (instance creation), we need to do
     * a three-way merge between constructor options, instance
     * options and parent options.
     */
    function mergeAssets(parentVal, childVal) {
        var res = Object.create(parentVal || null)
        return childVal ? extend(res, childVal) : res
    }

    ASSET_TYPES.forEach(function(type) {
        strats[type + "s"] = mergeAssets
    })

    /**
     * Watchers.
     *
     * Watchers hashes should not overwrite one
     * another, so we merge them as arrays.
     */
    strats.watch = function(parentVal, childVal) {
        // work around Firefox's Object.prototype.watch...
        if (parentVal === nativeWatch) {
            parentVal = undefined
        }
        if (childVal === nativeWatch) {
            childVal = undefined
        }
        /* istanbul ignore if */
        if (!childVal) {
            return Object.create(parentVal || null)
        }
        if (!parentVal) {
            return childVal
        }
        var ret = {}
        extend(ret, parentVal)
        for (var key in childVal) {
            var parent = ret[key]
            var child = childVal[key]
            if (parent && !Array.isArray(parent)) {
                parent = [parent]
            }
            ret[key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child]
        }
        return ret
    }

    /**
     * Other object hashes.
     */
    strats.props = strats.methods = strats.inject = strats.computed = function(
        parentVal,
        childVal
    ) {
        if (!childVal) {
            return Object.create(parentVal || null)
        }
        if (!parentVal) {
            return childVal
        }
        var ret = Object.create(null)
        extend(ret, parentVal)
        extend(ret, childVal)
        return ret
    }
    strats.provide = mergeDataOrFn

    /**
     * Default strategy.
     */
    var defaultStrat = function(parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal
    }

    /**
     * Ensure all props option syntax are normalized into the
     * Object-based format.
     */
    function normalizeProps(options) {
        var props = options.props
        if (!props) {
            return
        }
        var res = {}
        var i, val, name
        if (Array.isArray(props)) {
            i = props.length
            while (i--) {
                val = props[i]
                if (typeof val === "string") {
                    name = camelize(val)
                    res[name] = {
                        type: null
                    }
                } else {
                }
            }
        } else if (isPlainObject(props)) {
            for (var key in props) {
                val = props[key]
                name = camelize(key)
                res[name] = isPlainObject(val)
                    ? val
                    : {
                          type: val
                      }
            }
        }
        options.props = res
    }

    /**
     * Normalize all injections into Object-based format
     */
    function normalizeInject(options) {
        var inject = options.inject
        if (Array.isArray(inject)) {
            var normalized = (options.inject = {})
            for (var i = 0; i < inject.length; i++) {
                normalized[inject[i]] = inject[i]
            }
        }
    }

    /**
     * Normalize raw function directives into object format.
     */
    function normalizeDirectives(options) {
        var dirs = options.directives
        if (dirs) {
            for (var key in dirs) {
                var def = dirs[key]
                if (typeof def === "function") {
                    dirs[key] = {
                        bind: def,
                        update: def
                    }
                }
            }
        }
    }

    /**
     * Merge two option objects into a new one.
     * Core utility used in both instantiation and inheritance.
     */
    function mergeOptions(parent, child, vm) {
        if (typeof child === "function") {
            child = child.options
        }

        normalizeProps(child)
        normalizeInject(child)
        normalizeDirectives(child)
        var extendsFrom = child.extends
        if (extendsFrom) {
            parent = mergeOptions(parent, extendsFrom, vm)
        }
        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm)
            }
        }
        var options = {}
        var key
        for (key in parent) {
            mergeField(key)
        }
        for (key in child) {
            if (!hasOwn(parent, key)) {
                mergeField(key)
            }
        }

        function mergeField(key) {
            var strat = strats[key] || defaultStrat
            options[key] = strat(parent[key], child[key], vm, key)
        }
        return options
    }

    /**
     * Resolve an asset.
     * This function is used because child instances need access
     * to assets defined in its ancestor chain.
     */
    function resolveAsset(options, type, id, warnMissing) {
        /* istanbul ignore if */
        if (typeof id !== "string") {
            return
        }
        var assets = options[type]
        // check local registration variations first
        if (hasOwn(assets, id)) {
            return assets[id]
        }
        var camelizedId = camelize(id)
        if (hasOwn(assets, camelizedId)) {
            return assets[camelizedId]
        }
        var PascalCaseId = capitalize(camelizedId)
        if (hasOwn(assets, PascalCaseId)) {
            return assets[PascalCaseId]
        }
        // fallback to prototype chain
        var res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
        if (false) {}
        return res
    }

    /*  */

    function validateProp(key, propOptions, propsData, vm) {
        var prop = propOptions[key]
        var absent = !hasOwn(propsData, key)
        var value = propsData[key]
        // handle boolean props
        if (isType(Boolean, prop.type)) {
            if (absent && !hasOwn(prop, "default")) {
                value = false
            } else if (!isType(String, prop.type) && (value === "" || value === hyphenate(key))) {
                value = true
            }
        }
        // check default value
        if (value === undefined) {
            value = getPropDefaultValue(vm, prop, key)
            // since the default value is a fresh copy,
            // make sure to observe it.
            var prevShouldConvert = observerState.shouldConvert
            observerState.shouldConvert = true
            observe(value)
            observerState.shouldConvert = prevShouldConvert
        }
        return value
    }

    /**
     * Get the default value of a prop.
     */
    function getPropDefaultValue(vm, prop, key) {
        // no default, return undefined
        if (!hasOwn(prop, "default")) {
            return undefined
        }
        var def = prop.default
        // warn against non-factory defaults for Object & Array
        if (false) {}
        // the raw prop value was also undefined from previous render,
        // return previous default value to avoid unnecessary watcher trigger
        if (
            vm &&
            vm.$options.propsData &&
            vm.$options.propsData[key] === undefined &&
            vm._props[key] !== undefined
        ) {
            return vm._props[key]
        }
        // call factory function for non-Function types
        // a value is Function if its prototype is function even across different execution context
        return typeof def === "function" && getType(prop.type) !== "Function" ? def.call(vm) : def
    }

    /**
     * Use function string name to check built-in types,
     * because a simple equality check will fail when running
     * across different vms / iframes.
     */
    function getType(fn) {
        var match = fn && fn.toString().match(/^\s*function (\w+)/)
        return match ? match[1] : ""
    }

    function isType(type, fn) {
        if (!Array.isArray(fn)) {
            return getType(fn) === getType(type)
        }
        for (var i = 0, len = fn.length; i < len; i++) {
            if (getType(fn[i]) === getType(type)) {
                return true
            }
        }
        /* istanbul ignore next */
        return false
    }

    /*  */

    /* not type checking this file because flow doesn't play well with Proxy */

    var mark
    var measure

    /*  */

    var VNode = function VNode(
        tag,
        data,
        children,
        text,
        elm,
        context,
        componentOptions,
        asyncFactory
    ) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.ns = undefined
        this.context = context
        this.functionalContext = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }

    var prototypeAccessors = {
        child: {}
    }

    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    prototypeAccessors.child.get = function() {
        return this.componentInstance
    }

    Object.defineProperties(VNode.prototype, prototypeAccessors)

    var createEmptyVNode = function(text) {
        if (text === void 0) text = ""

        var node = new VNode()
        node.text = text
        node.isComment = true
        return node
    }

    function createTextVNode(val) {
        return new VNode(undefined, undefined, undefined, String(val))
    }

    // optimized shallow clone
    // used for static nodes and slot nodes because they may be reused across
    // multiple renders, cloning them avoids errors when DOM manipulations rely
    // on their elm reference.
    function cloneVNode(vnode) {
        var cloned = new VNode(
            vnode.tag,
            vnode.data,
            vnode.children,
            vnode.text,
            vnode.elm,
            vnode.context,
            vnode.componentOptions,
            vnode.asyncFactory
        )
        cloned.ns = vnode.ns
        cloned.isStatic = vnode.isStatic
        cloned.key = vnode.key
        cloned.isComment = vnode.isComment
        cloned.isCloned = true
        return cloned
    }

    function cloneVNodes(vnodes) {
        var len = vnodes.length
        var res = new Array(len)
        for (var i = 0; i < len; i++) {
            res[i] = cloneVNode(vnodes[i])
        }
        return res
    }

    /*  */

    var normalizeEvent = cached(function(name) {
        var passive = name.charAt(0) === "&"
        name = passive ? name.slice(1) : name
        var once$$1 = name.charAt(0) === "~" // Prefixed last, checked first
        name = once$$1 ? name.slice(1) : name
        var capture = name.charAt(0) === "!"
        name = capture ? name.slice(1) : name
        return {
            name: name,
            once: once$$1,
            capture: capture,
            passive: passive
        }
    })

    function createFnInvoker(fns) {
        function invoker() {
            var arguments$1 = arguments

            var fns = invoker.fns
            if (Array.isArray(fns)) {
                var cloned = fns.slice()
                for (var i = 0; i < cloned.length; i++) {
                    cloned[i].apply(null, arguments$1)
                }
            } else {
                // return handler return value for single handlers
                return fns.apply(null, arguments)
            }
        }
        invoker.fns = fns
        return invoker
    }

    function updateListeners(on, oldOn, add, remove$$1, vm) {
        var name, cur, old, event
        for (name in on) {
            cur = on[name]
            old = oldOn[name]
            event = normalizeEvent(name)
            if (isUndef(cur)) {
                 false &&
                    false
            } else if (isUndef(old)) {
                if (isUndef(cur.fns)) {
                    cur = on[name] = createFnInvoker(cur)
                }
                add(event.name, cur, event.once, event.capture, event.passive)
            } else if (cur !== old) {
                old.fns = cur
                on[name] = old
            }
        }
        for (name in oldOn) {
            if (isUndef(on[name])) {
                event = normalizeEvent(name)
                remove$$1(event.name, oldOn[name], event.capture)
            }
        }
    }

    /*  */

    /*  */

    function extractPropsFromVNodeData(data, Ctor, tag) {
        // we are only extracting raw values here.
        // validation and default values are handled in the child
        // component itself.
        var propOptions = Ctor.options.props
        if (isUndef(propOptions)) {
            return
        }
        var res = {}
        var attrs = data.attrs
        var props = data.props
        if (isDef(attrs) || isDef(props)) {
            for (var key in propOptions) {
                var altKey = hyphenate(key)
                checkProp(res, props, key, altKey, true) ||
                    checkProp(res, attrs, key, altKey, false)
            }
        }
        return res
    }

    function checkProp(res, hash, key, altKey, preserve) {
        if (isDef(hash)) {
            if (hasOwn(hash, key)) {
                res[key] = hash[key]
                if (!preserve) {
                    delete hash[key]
                }
                return true
            } else if (hasOwn(hash, altKey)) {
                res[key] = hash[altKey]
                if (!preserve) {
                    delete hash[altKey]
                }
                return true
            }
        }
        return false
    }

    /*  */

    // The template compiler attempts to minimize the need for normalization by
    // statically analyzing the template at compile time.
    //
    // For plain HTML markup, normalization can be completely skipped because the
    // generated render function is guaranteed to return Array<VNode>. There are
    // two cases where extra normalization is needed:

    // 1. When the children contains components - because a functional component
    // may return an Array instead of a single root. In this case, just a simple
    // normalization is needed - if any child is an Array, we flatten the whole
    // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
    // because functional components already normalize their own children.
    function simpleNormalizeChildren(children) {
        for (var i = 0; i < children.length; i++) {
            if (Array.isArray(children[i])) {
                return Array.prototype.concat.apply([], children)
            }
        }
        return children
    }

    // 2. When the children contains constructs that always generated nested Arrays,
    // e.g. <template>, <slot>, v-for, or when the children is provided by user
    // with hand-written render functions / JSX. In such cases a full normalization
    // is needed to cater to all possible types of children values.
    function normalizeChildren(children) {
        return isPrimitive(children)
            ? [createTextVNode(children)]
            : Array.isArray(children)
                ? normalizeArrayChildren(children)
                : undefined
    }

    function isTextNode(node) {
        return isDef(node) && isDef(node.text) && isFalse(node.isComment)
    }

    function normalizeArrayChildren(children, nestedIndex) {
        var res = []
        var i, c, last
        for (i = 0; i < children.length; i++) {
            c = children[i]
            if (isUndef(c) || typeof c === "boolean") {
                continue
            }
            last = res[res.length - 1]
            //  nested
            if (Array.isArray(c)) {
                res.push.apply(res, normalizeArrayChildren(c, (nestedIndex || "") + "_" + i))
            } else if (isPrimitive(c)) {
                if (isTextNode(last)) {
                    // merge adjacent text nodes
                    // this is necessary for SSR hydration because text nodes are
                    // essentially merged when rendered to HTML strings
                    last.text += String(c)
                } else if (c !== "") {
                    // convert primitive to vnode
                    res.push(createTextVNode(c))
                }
            } else {
                if (isTextNode(c) && isTextNode(last)) {
                    // merge adjacent text nodes
                    res[res.length - 1] = createTextVNode(last.text + c.text)
                } else {
                    // default key for nested array children (likely generated by v-for)
                    if (
                        isTrue(children._isVList) &&
                        isDef(c.tag) &&
                        isUndef(c.key) &&
                        isDef(nestedIndex)
                    ) {
                        c.key = "__vlist" + nestedIndex + "_" + i + "__"
                    }
                    res.push(c)
                }
            }
        }
        return res
    }

    /*  */

    function ensureCtor(comp, base) {
        if (comp.__esModule && comp.default) {
            comp = comp.default
        }
        return isObject(comp) ? base.extend(comp) : comp
    }

    function createAsyncPlaceholder(factory, data, context, children, tag) {
        var node = createEmptyVNode()
        node.asyncFactory = factory
        node.asyncMeta = {
            data: data,
            context: context,
            children: children,
            tag: tag
        }
        return node
    }

    function resolveAsyncComponent(factory, baseCtor, context) {
        if (isTrue(factory.error) && isDef(factory.errorComp)) {
            return factory.errorComp
        }

        if (isDef(factory.resolved)) {
            return factory.resolved
        }

        if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
            return factory.loadingComp
        }

        if (isDef(factory.contexts)) {
            // already pending
            factory.contexts.push(context)
        } else {
            var contexts = (factory.contexts = [context])
            var sync = true

            var forceRender = function() {
                for (var i = 0, l = contexts.length; i < l; i++) {
                    contexts[i].$forceUpdate()
                }
            }

            var resolve = once(function(res) {
                // cache resolved
                factory.resolved = ensureCtor(res, baseCtor)
                // invoke callbacks only if this is not a synchronous resolve
                // (async resolves are shimmed as synchronous during SSR)
                if (!sync) {
                    forceRender()
                }
            })

            var reject = once(function(reason) {
                 false &&
                    false
                if (isDef(factory.errorComp)) {
                    factory.error = true
                    forceRender()
                }
            })

            var res = factory(resolve, reject)

            if (isObject(res)) {
                if (typeof res.then === "function") {
                    // () => Promise
                    if (isUndef(factory.resolved)) {
                        res.then(resolve, reject)
                    }
                } else if (isDef(res.component) && typeof res.component.then === "function") {
                    res.component.then(resolve, reject)

                    if (isDef(res.error)) {
                        factory.errorComp = ensureCtor(res.error, baseCtor)
                    }

                    if (isDef(res.loading)) {
                        factory.loadingComp = ensureCtor(res.loading, baseCtor)
                        if (res.delay === 0) {
                            factory.loading = true
                        } else {
                            setTimeout(function() {
                                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                    factory.loading = true
                                    forceRender()
                                }
                            }, res.delay || 200)
                        }
                    }

                    if (isDef(res.timeout)) {
                        setTimeout(function() {
                            if (isUndef(factory.resolved)) {
                                reject(null)
                            }
                        }, res.timeout)
                    }
                }
            }

            sync = false
            // return in case resolved synchronously
            return factory.loading ? factory.loadingComp : factory.resolved
        }
    }

    /*  */

    function getFirstComponentChild(children) {
        if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
                var c = children[i]
                if (isDef(c) && isDef(c.componentOptions)) {
                    return c
                }
            }
        }
    }

    /*  */

    /*  */

    function initEvents(vm) {
        vm._events = Object.create(null)
        vm._hasHookEvent = false
        // init parent attached events
        var listeners = vm.$options._parentListeners
        if (listeners) {
            updateComponentListeners(vm, listeners)
        }
    }

    var target

    function add(event, fn, once$$1) {
        if (once$$1) {
            target.$once(event, fn)
        } else {
            target.$on(event, fn)
        }
    }

    function remove$1(event, fn) {
        target.$off(event, fn)
    }

    function updateComponentListeners(vm, listeners, oldListeners) {
        target = vm
        updateListeners(listeners, oldListeners || {}, add, remove$1, vm)
    }

    function eventsMixin(Vue) {
        var hookRE = /^hook:/
        Vue.prototype.$on = function(event, fn) {
            var this$1 = this

            var vm = this
            if (Array.isArray(event)) {
                for (var i = 0, l = event.length; i < l; i++) {
                    this$1.$on(event[i], fn)
                }
            } else {
                ;(vm._events[event] || (vm._events[event] = [])).push(fn)
                // optimize hook:event cost by using a boolean flag marked at registration
                // instead of a hash lookup
                if (hookRE.test(event)) {
                    vm._hasHookEvent = true
                }
            }
            return vm
        }

        Vue.prototype.$once = function(event, fn) {
            var vm = this

            function on() {
                vm.$off(event, on)
                fn.apply(vm, arguments)
            }
            on.fn = fn
            vm.$on(event, on)
            return vm
        }

        Vue.prototype.$off = function(event, fn) {
            var this$1 = this

            var vm = this
            // all
            if (!arguments.length) {
                vm._events = Object.create(null)
                return vm
            }
            // array of events
            if (Array.isArray(event)) {
                for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
                    this$1.$off(event[i$1], fn)
                }
                return vm
            }
            // specific event
            var cbs = vm._events[event]
            if (!cbs) {
                return vm
            }
            if (arguments.length === 1) {
                vm._events[event] = null
                return vm
            }
            // specific handler
            var cb
            var i = cbs.length
            while (i--) {
                cb = cbs[i]
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i, 1)
                    break
                }
            }
            return vm
        }

        Vue.prototype.$emit = function(event) {
            var vm = this
            var cbs = vm._events[event]
            if (cbs) {
                cbs = cbs.length > 1 ? toArray(cbs) : cbs
                var args = toArray(arguments, 1)
                for (var i = 0, l = cbs.length; i < l; i++) {
                    try {
                        cbs[i].apply(vm, args)
                    } catch (e) {
                        handleError(e, vm, 'event handler for "' + event + '"')
                    }
                }
            }
            return vm
        }
    }

    /*  */

    /**
     * Runtime helper for resolving raw children VNodes into a slot object.
     */
    function resolveSlots(children, context) {
        var slots = {}
        if (!children) {
            return slots
        }
        var defaultSlot = []
        for (var i = 0, l = children.length; i < l; i++) {
            var child = children[i]
            // named slots should only be respected if the vnode was rendered in the
            // same context.
            if (
                (child.context === context || child.functionalContext === context) &&
                child.data &&
                child.data.slot != null
            ) {
                var name = child.data.slot
                var slot = slots[name] || (slots[name] = [])
                if (child.tag === "template") {
                    slot.push.apply(slot, child.children)
                } else {
                    slot.push(child)
                }
            } else {
                defaultSlot.push(child)
            }
        }
        // ignore whitespace
        if (!defaultSlot.every(isWhitespace)) {
            slots.default = defaultSlot
        }
        return slots
    }

    function isWhitespace(node) {
        return node.isComment || node.text === " "
    }

    function resolveScopedSlots(
        fns, // see flow/vnode
        res
    ) {
        res = res || {}
        for (var i = 0; i < fns.length; i++) {
            if (Array.isArray(fns[i])) {
                resolveScopedSlots(fns[i], res)
            } else {
                res[fns[i].key] = fns[i].fn
            }
        }
        return res
    }

    /*  */

    var activeInstance = null

    function initLifecycle(vm) {
        var options = vm.$options

        // locate first non-abstract parent
        var parent = options.parent
        if (parent && !options.abstract) {
            while (parent.$options.abstract && parent.$parent) {
                parent = parent.$parent
            }
            parent.$children.push(vm)
        }

        vm.$parent = parent
        vm.$root = parent ? parent.$root : vm

        vm.$children = []
        vm.$refs = {}

        vm._watcher = null
        vm._inactive = null
        vm._directInactive = false
        vm._isMounted = false
        vm._isDestroyed = false
        vm._isBeingDestroyed = false
    }

    function lifecycleMixin(Vue) {
        Vue.prototype._update = function(vnode, hydrating) {
            var vm = this
            if (vm._isMounted) {
                callHook(vm, "beforeUpdate")
            }
            var prevEl = vm.$el
            var prevVnode = vm._vnode
            var prevActiveInstance = activeInstance
            activeInstance = vm
            vm._vnode = vnode
            // Vue.prototype.__patch__ is injected in entry points
            // based on the rendering backend used.
            if (!prevVnode) {
                // initial render
                vm.$el = vm.__patch__(
                    vm.$el,
                    vnode,
                    hydrating,
                    false /* removeOnly */,
                    vm.$options._parentElm,
                    vm.$options._refElm
                )
                // no need for the ref nodes after initial patch
                // this prevents keeping a detached DOM tree in memory (#5851)
                vm.$options._parentElm = vm.$options._refElm = null
            } else {
                // updates
                vm.$el = vm.__patch__(prevVnode, vnode)
            }
            activeInstance = prevActiveInstance
            // update __vue__ reference
            if (prevEl) {
                prevEl.__vue__ = null
            }
            if (vm.$el) {
                vm.$el.__vue__ = vm
            }
            // if parent is an HOC, update its $el as well
            if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
                vm.$parent.$el = vm.$el
            }
            // updated hook is called by the scheduler to ensure that children are
            // updated in a parent's updated hook.
        }

        Vue.prototype.$forceUpdate = function() {
            var vm = this
            if (vm._watcher) {
                vm._watcher.update()
            }
        }

        Vue.prototype.$destroy = function() {
            var vm = this
            if (vm._isBeingDestroyed) {
                return
            }
            callHook(vm, "beforeDestroy")
            vm._isBeingDestroyed = true
            // remove self from parent
            var parent = vm.$parent
            if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
                remove(parent.$children, vm)
            }
            // teardown watchers
            if (vm._watcher) {
                vm._watcher.teardown()
            }
            var i = vm._watchers.length
            while (i--) {
                vm._watchers[i].teardown()
            }
            // remove reference from data ob
            // frozen object may not have observer.
            if (vm._data.__ob__) {
                vm._data.__ob__.vmCount--
            }
            // call the last hook...
            vm._isDestroyed = true
            // invoke destroy hooks on current rendered tree
            vm.__patch__(vm._vnode, null)
            // fire destroyed hook
            callHook(vm, "destroyed")
            // turn off all instance listeners.
            vm.$off()
            // remove __vue__ reference
            if (vm.$el) {
                vm.$el.__vue__ = null
            }
        }
    }

    function mountComponent(vm, el, hydrating) {
        vm.$el = el
        if (!vm.$options.render) {
            vm.$options.render = createEmptyVNode
        }
        callHook(vm, "beforeMount")

        var updateComponent
        /* istanbul ignore if */
        if (false) {} else {
            updateComponent = function() {
                vm._update(vm._render(), hydrating)
            }
        }

        vm._watcher = new Watcher(vm, updateComponent, noop)
        hydrating = false

        // manually mounted instance, call mounted on self
        // mounted is called for render-created child components in its inserted hook
        if (vm.$vnode == null) {
            vm._isMounted = true
            callHook(vm, "mounted")
        }
        return vm
    }

    function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
        var hasChildren = !!(
            renderChildren || // has new static slots
            vm.$options._renderChildren || // has old static slots
            parentVnode.data.scopedSlots || // has new scoped slots
            vm.$scopedSlots !== emptyObject
        ) // has old scoped slots

        vm.$options._parentVnode = parentVnode
        vm.$vnode = parentVnode // update vm's placeholder node without re-render

        if (vm._vnode) {
            // update child tree's parent
            vm._vnode.parent = parentVnode
        }
        vm.$options._renderChildren = renderChildren

        // update $attrs and $listensers hash
        // these are also reactive so they may trigger child update if the child
        // used them during render
        vm.$attrs = parentVnode.data && parentVnode.data.attrs
        vm.$listeners = listeners

        // update props
        if (propsData && vm.$options.props) {
            observerState.shouldConvert = false
            var props = vm._props
            var propKeys = vm.$options._propKeys || []
            for (var i = 0; i < propKeys.length; i++) {
                var key = propKeys[i]
                props[key] = validateProp(key, vm.$options.props, propsData, vm)
            }
            observerState.shouldConvert = true
            // keep a copy of raw propsData
            vm.$options.propsData = propsData
        }

        // update listeners
        if (listeners) {
            var oldListeners = vm.$options._parentListeners
            vm.$options._parentListeners = listeners
            updateComponentListeners(vm, listeners, oldListeners)
        }
        // resolve slots + force update if has children
        if (hasChildren) {
            vm.$slots = resolveSlots(renderChildren, parentVnode.context)
            vm.$forceUpdate()
        }
    }

    function isInInactiveTree(vm) {
        while (vm && (vm = vm.$parent)) {
            if (vm._inactive) {
                return true
            }
        }
        return false
    }

    function activateChildComponent(vm, direct) {
        if (direct) {
            vm._directInactive = false
            if (isInInactiveTree(vm)) {
                return
            }
        } else if (vm._directInactive) {
            return
        }
        if (vm._inactive || vm._inactive === null) {
            vm._inactive = false
            for (var i = 0; i < vm.$children.length; i++) {
                activateChildComponent(vm.$children[i])
            }
            callHook(vm, "activated")
        }
    }

    function deactivateChildComponent(vm, direct) {
        if (direct) {
            vm._directInactive = true
            if (isInInactiveTree(vm)) {
                return
            }
        }
        if (!vm._inactive) {
            vm._inactive = true
            for (var i = 0; i < vm.$children.length; i++) {
                deactivateChildComponent(vm.$children[i])
            }
            callHook(vm, "deactivated")
        }
    }

    function callHook(vm, hook) {
        var handlers = vm.$options[hook]
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                try {
                    handlers[i].call(vm)
                } catch (e) {
                    handleError(e, vm, hook + " hook")
                }
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit("hook:" + hook)
        }
    }

    /*  */

    var MAX_UPDATE_COUNT = 100

    var queue = []
    var activatedChildren = []
    var has = {}
    var circular = {}
    var waiting = false
    var flushing = false
    var index = 0

    /**
     * Reset the scheduler's state.
     */
    function resetSchedulerState() {
        index = queue.length = activatedChildren.length = 0
        has = {}
        waiting = flushing = false
    }

    /**
     * Flush both queues and run the watchers.
     */
    function flushSchedulerQueue() {
        flushing = true
        var watcher, id

        // Sort queue before flush.
        // This ensures that:
        // 1. Components are updated from parent to child. (because parent is always
        //    created before the child)
        // 2. A component's user watchers are run before its render watcher (because
        //    user watchers are created before the render watcher)
        // 3. If a component is destroyed during a parent component's watcher run,
        //    its watchers can be skipped.
        queue.sort(function(a, b) {
            return a.id - b.id
        })

        // do not cache length because more watchers might be pushed
        // as we run existing watchers
        for (index = 0; index < queue.length; index++) {
            watcher = queue[index]
            id = watcher.id
            has[id] = null
            watcher.run()
            // in dev build, check and stop circular updates.
            if (false) {}
        }

        // keep copies of post queues before resetting state
        var activatedQueue = activatedChildren.slice()
        var updatedQueue = queue.slice()

        resetSchedulerState()

        // call component updated and activated hooks
        callActivatedHooks(activatedQueue)
        callUpdatedHooks(updatedQueue)

        // devtool hook
        /* istanbul ignore if */
        if (devtools && config.devtools) {
            devtools.emit("flush")
        }
    }

    function callUpdatedHooks(queue) {
        var i = queue.length
        while (i--) {
            var watcher = queue[i]
            var vm = watcher.vm
            if (vm._watcher === watcher && vm._isMounted) {
                callHook(vm, "updated")
            }
        }
    }

    /**
     * Queue a kept-alive component that was activated during patch.
     * The queue will be processed after the entire tree has been patched.
     */
    function queueActivatedComponent(vm) {
        // setting _inactive to false here so that a render function can
        // rely on checking whether it's in an inactive tree (e.g. router-view)
        vm._inactive = false
        activatedChildren.push(vm)
    }

    function callActivatedHooks(queue) {
        for (var i = 0; i < queue.length; i++) {
            queue[i]._inactive = true
            activateChildComponent(queue[i], true /* true */)
        }
    }

    /**
     * Push a watcher into the watcher queue.
     * Jobs with duplicate IDs will be skipped unless it's
     * pushed when the queue is being flushed.
     */
    function queueWatcher(watcher) {
        var id = watcher.id
        if (has[id] == null) {
            has[id] = true
            if (!flushing) {
                queue.push(watcher)
            } else {
                // if already flushing, splice the watcher based on its id
                // if already past its id, it will be run next immediately.
                var i = queue.length - 1
                while (i > index && queue[i].id > watcher.id) {
                    i--
                }
                queue.splice(i + 1, 0, watcher)
            }
            // queue the flush
            if (!waiting) {
                waiting = true
                nextTick(flushSchedulerQueue)
            }
        }
    }

    /*  */

    var uid$2 = 0

    /**
     * A watcher parses an expression, collects dependencies,
     * and fires callback when the expression value changes.
     * This is used for both the $watch() api and directives.
     */
    var Watcher = function Watcher(vm, expOrFn, cb, options) {
        this.vm = vm
        vm._watchers.push(this)
        // options
        if (options) {
            this.deep = !!options.deep
            this.user = !!options.user
            this.lazy = !!options.lazy
            this.sync = !!options.sync
        } else {
            this.deep = this.user = this.lazy = this.sync = false
        }
        this.cb = cb
        this.id = ++uid$2 // uid for batching
        this.active = true
        this.dirty = this.lazy // for lazy watchers
        this.deps = []
        this.newDeps = []
        this.depIds = new _Set()
        this.newDepIds = new _Set()
        this.expression = ""
        // parse expression for getter
        if (typeof expOrFn === "function") {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
            if (!this.getter) {
                this.getter = function() {}
                 false &&
                    false
            }
        }
        this.value = this.lazy ? undefined : this.get()
    }

    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    Watcher.prototype.get = function get() {
        pushTarget(this)
        var value
        var vm = this.vm
        try {
            value = this.getter.call(vm, vm)
        } catch (e) {
            if (this.user) {
                handleError(e, vm, 'getter for watcher "' + this.expression + '"')
            } else {
                throw e
            }
        } finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
                traverse(value)
            }
            popTarget()
            this.cleanupDeps()
        }
        return value
    }

    /**
     * Add a dependency to this directive.
     */
    Watcher.prototype.addDep = function addDep(dep) {
        var id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    /**
     * Clean up for dependency collection.
     */
    Watcher.prototype.cleanupDeps = function cleanupDeps() {
        var this$1 = this

        var i = this.deps.length
        while (i--) {
            var dep = this$1.deps[i]
            if (!this$1.newDepIds.has(dep.id)) {
                dep.removeSub(this$1)
            }
        }
        var tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }

    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    Watcher.prototype.update = function update() {
        /* istanbul ignore else */
        if (this.lazy) {
            this.dirty = true
        } else if (this.sync) {
            this.run()
        } else {
            queueWatcher(this)
        }
    }

    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    Watcher.prototype.run = function run() {
        if (this.active) {
            var value = this.get()
            if (
                value !== this.value ||
                // Deep watchers and watchers on Object/Arrays should fire even
                // when the value is the same, because the value may
                // have mutated.
                isObject(value) ||
                this.deep
            ) {
                // set new value
                var oldValue = this.value
                this.value = value
                if (this.user) {
                    try {
                        this.cb.call(this.vm, value, oldValue)
                    } catch (e) {
                        handleError(e, this.vm, 'callback for watcher "' + this.expression + '"')
                    }
                } else {
                    this.cb.call(this.vm, value, oldValue)
                }
            }
        }
    }

    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */
    Watcher.prototype.evaluate = function evaluate() {
        this.value = this.get()
        this.dirty = false
    }

    /**
     * Depend on all deps collected by this watcher.
     */
    Watcher.prototype.depend = function depend() {
        var this$1 = this

        var i = this.deps.length
        while (i--) {
            this$1.deps[i].depend()
        }
    }

    /**
     * Remove self from all dependencies' subscriber list.
     */
    Watcher.prototype.teardown = function teardown() {
        var this$1 = this

        if (this.active) {
            // remove self from vm's watcher list
            // this is a somewhat expensive operation so we skip it
            // if the vm is being destroyed.
            if (!this.vm._isBeingDestroyed) {
                remove(this.vm._watchers, this)
            }
            var i = this.deps.length
            while (i--) {
                this$1.deps[i].removeSub(this$1)
            }
            this.active = false
        }
    }

    /**
     * Recursively traverse an object to evoke all converted
     * getters, so that every nested property inside the object
     * is collected as a "deep" dependency.
     */
    var seenObjects = new _Set()

    function traverse(val) {
        seenObjects.clear()
        _traverse(val, seenObjects)
    }

    function _traverse(val, seen) {
        var i, keys
        var isA = Array.isArray(val)
        if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
            return
        }
        if (val.__ob__) {
            var depId = val.__ob__.dep.id
            if (seen.has(depId)) {
                return
            }
            seen.add(depId)
        }
        if (isA) {
            i = val.length
            while (i--) {
                _traverse(val[i], seen)
            }
        } else {
            keys = Object.keys(val)
            i = keys.length
            while (i--) {
                _traverse(val[keys[i]], seen)
            }
        }
    }

    /*  */

    var sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: noop,
        set: noop
    }

    function proxy(target, sourceKey, key) {
        sharedPropertyDefinition.get = function proxyGetter() {
            return this[sourceKey][key]
        }
        sharedPropertyDefinition.set = function proxySetter(val) {
            this[sourceKey][key] = val
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
    }

    function initState(vm) {
        vm._watchers = []
        var opts = vm.$options
        if (opts.props) {
            initProps(vm, opts.props)
        }
        if (opts.methods) {
            initMethods(vm, opts.methods)
        }
        if (opts.data) {
            initData(vm)
        } else {
            observe((vm._data = {}), true /* asRootData */)
        }
        if (opts.computed) {
            initComputed(vm, opts.computed)
        }
        if (opts.watch && opts.watch !== nativeWatch) {
            initWatch(vm, opts.watch)
        }
    }

    function checkOptionType(vm, name) {
        var option = vm.$options[name]
        if (!isPlainObject(option)) {
            warn('component option "' + name + '" should be an object.', vm)
        }
    }

    function initProps(vm, propsOptions) {
        var propsData = vm.$options.propsData || {}
        var props = (vm._props = {})
        // cache prop keys so that future props updates can iterate using Array
        // instead of dynamic object key enumeration.
        var keys = (vm.$options._propKeys = [])
        var isRoot = !vm.$parent
        // root instance props should be converted
        observerState.shouldConvert = isRoot
        var loop = function(key) {
            keys.push(key)
            var value = validateProp(key, propsOptions, propsData, vm)
            /* istanbul ignore else */
            {
                defineReactive$$1(props, key, value)
            }
            // static props are already proxied on the component's prototype
            // during Vue.extend(). We only need to proxy props defined at
            // instantiation here.
            if (!(key in vm)) {
                proxy(vm, "_props", key)
            }
        }

        for (var key in propsOptions) loop(key)
        observerState.shouldConvert = true
    }

    function initData(vm) {
        var data = vm.$options.data
        data = vm._data = typeof data === "function" ? getData(data, vm) : data || {}
        if (!isPlainObject(data)) {
            data = {}
             false &&
                false
        }
        // proxy data on instance
        var keys = Object.keys(data)
        var props = vm.$options.props
        var methods = vm.$options.methods
        var i = keys.length
        while (i--) {
            var key = keys[i]
            if (props && hasOwn(props, key)) {
                 false &&
                    false
            } else if (!isReserved(key)) {
                proxy(vm, "_data", key)
            }
        }
        // observe data
        observe(data, true /* asRootData */)
    }

    function getData(data, vm) {
        try {
            return data.call(vm)
        } catch (e) {
            handleError(e, vm, "data()")
            return {}
        }
    }

    var computedWatcherOptions = {
        lazy: true
    }

    function initComputed(vm, computed) {
         false && false
        var watchers = (vm._computedWatchers = Object.create(null))

        for (var key in computed) {
            var userDef = computed[key]
            var getter = typeof userDef === "function" ? userDef : userDef.get
            watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

            // component-defined computed properties are already defined on the
            // component prototype. We only need to define computed properties defined
            // at instantiation here.
            if (!(key in vm)) {
                defineComputed(vm, key, userDef)
            } else {
            }
        }
    }

    function defineComputed(target, key, userDef) {
        if (typeof userDef === "function") {
            sharedPropertyDefinition.get = createComputedGetter(key)
            sharedPropertyDefinition.set = noop
        } else {
            sharedPropertyDefinition.get = userDef.get
                ? userDef.cache !== false
                    ? createComputedGetter(key)
                    : userDef.get
                : noop
            sharedPropertyDefinition.set = userDef.set ? userDef.set : noop
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
    }

    function createComputedGetter(key) {
        return function computedGetter() {
            var watcher = this._computedWatchers && this._computedWatchers[key]
            if (watcher) {
                if (watcher.dirty) {
                    watcher.evaluate()
                }
                if (Dep.target) {
                    watcher.depend()
                }
                return watcher.value
            }
        }
    }

    function initMethods(vm, methods) {
         false && false
        var props = vm.$options.props
        for (var key in methods) {
            vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
        }
    }

    function initWatch(vm, watch) {
         false && false
        for (var key in watch) {
            var handler = watch[key]
            if (Array.isArray(handler)) {
                for (var i = 0; i < handler.length; i++) {
                    createWatcher(vm, key, handler[i])
                }
            } else {
                createWatcher(vm, key, handler)
            }
        }
    }

    function createWatcher(vm, keyOrFn, handler, options) {
        if (isPlainObject(handler)) {
            options = handler
            handler = handler.handler
        }
        if (typeof handler === "string") {
            handler = vm[handler]
        }
        return vm.$watch(keyOrFn, handler, options)
    }

    function stateMixin(Vue) {
        // flow somehow has problems with directly declared definition object
        // when using Object.defineProperty, so we have to procedurally build up
        // the object here.
        var dataDef = {}
        dataDef.get = function() {
            return this._data
        }
        var propsDef = {}
        propsDef.get = function() {
            return this._props
        }
        Object.defineProperty(Vue.prototype, "$data", dataDef)
        Object.defineProperty(Vue.prototype, "$props", propsDef)

        Vue.prototype.$set = set
        Vue.prototype.$delete = del

        Vue.prototype.$watch = function(expOrFn, cb, options) {
            var vm = this
            if (isPlainObject(cb)) {
                return createWatcher(vm, expOrFn, cb, options)
            }
            options = options || {}
            options.user = true
            var watcher = new Watcher(vm, expOrFn, cb, options)
            if (options.immediate) {
                cb.call(vm, watcher.value)
            }
            return function unwatchFn() {
                watcher.teardown()
            }
        }
    }

    /*  */

    function initProvide(vm) {
        var provide = vm.$options.provide
        if (provide) {
            vm._provided = typeof provide === "function" ? provide.call(vm) : provide
        }
    }

    function initInjections(vm) {
        var result = resolveInject(vm.$options.inject, vm)
        if (result) {
            observerState.shouldConvert = false
            Object.keys(result).forEach(function(key) {
                /* istanbul ignore else */
                {
                    defineReactive$$1(vm, key, result[key])
                }
            })
            observerState.shouldConvert = true
        }
    }

    function resolveInject(inject, vm) {
        if (inject) {
            // inject is :any because flow is not smart enough to figure out cached
            var result = Object.create(null)
            var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject)

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]
                var provideKey = inject[key]
                var source = vm
                while (source) {
                    if (source._provided && provideKey in source._provided) {
                        result[key] = source._provided[provideKey]
                        break
                    }
                    source = source.$parent
                }
                if (false) {}
            }
            return result
        }
    }

    /*  */

    function createFunctionalComponent(Ctor, propsData, data, context, children) {
        var props = {}
        var propOptions = Ctor.options.props
        if (isDef(propOptions)) {
            for (var key in propOptions) {
                props[key] = validateProp(key, propOptions, propsData || {})
            }
        } else {
            if (isDef(data.attrs)) {
                mergeProps(props, data.attrs)
            }
            if (isDef(data.props)) {
                mergeProps(props, data.props)
            }
        }
        // ensure the createElement function in functional components
        // gets a unique context - this is necessary for correct named slot check
        var _context = Object.create(context)
        var h = function(a, b, c, d) {
            return createElement(_context, a, b, c, d, true)
        }
        var vnode = Ctor.options.render.call(null, h, {
            data: data,
            props: props,
            children: children,
            parent: context,
            listeners: data.on || {},
            injections: resolveInject(Ctor.options.inject, context),
            slots: function() {
                return resolveSlots(children, context)
            }
        })
        if (vnode instanceof VNode) {
            vnode.functionalContext = context
            vnode.functionalOptions = Ctor.options
            if (data.slot) {
                ;(vnode.data || (vnode.data = {})).slot = data.slot
            }
        }
        return vnode
    }

    function mergeProps(to, from) {
        for (var key in from) {
            to[camelize(key)] = from[key]
        }
    }

    /*  */

    // hooks to be invoked on component VNodes during patch
    var componentVNodeHooks = {
        init: function init(vnode, hydrating, parentElm, refElm) {
            if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
                var child = (vnode.componentInstance = createComponentInstanceForVnode(
                    vnode,
                    activeInstance,
                    parentElm,
                    refElm
                ))
                child.$mount(hydrating ? vnode.elm : undefined, hydrating)
            } else if (vnode.data.keepAlive) {
                // kept-alive components, treat as a patch
                var mountedNode = vnode // work around flow
                componentVNodeHooks.prepatch(mountedNode, mountedNode)
            }
        },

        prepatch: function prepatch(oldVnode, vnode) {
            var options = vnode.componentOptions
            var child = (vnode.componentInstance = oldVnode.componentInstance)
            updateChildComponent(
                child,
                options.propsData, // updated props
                options.listeners, // updated listeners
                vnode, // new parent vnode
                options.children // new children
            )
        },

        insert: function insert(vnode) {
            var context = vnode.context
            var componentInstance = vnode.componentInstance

            if (!componentInstance._isMounted) {
                componentInstance._isMounted = true
                callHook(componentInstance, "mounted")
            }
            if (vnode.data.keepAlive) {
                if (context._isMounted) {
                    // vue-router#1212
                    // During updates, a kept-alive component's child components may
                    // change, so directly walking the tree here may call activated hooks
                    // on incorrect children. Instead we push them into a queue which will
                    // be processed after the whole patch process ended.
                    queueActivatedComponent(componentInstance)
                } else {
                    activateChildComponent(componentInstance, true /* direct */)
                }
            }
        },

        destroy: function destroy(vnode) {
            var componentInstance = vnode.componentInstance
            if (!componentInstance._isDestroyed) {
                if (!vnode.data.keepAlive) {
                    componentInstance.$destroy()
                } else {
                    deactivateChildComponent(componentInstance, true /* direct */)
                }
            }
        }
    }

    var hooksToMerge = Object.keys(componentVNodeHooks)

    function createComponent(Ctor, data, context, children, tag) {
        if (isUndef(Ctor)) {
            return
        }

        var baseCtor = context.$options._base

        // plain options object: turn it into a constructor
        if (isObject(Ctor)) {
            Ctor = baseCtor.extend(Ctor)
        }

        // if at this stage it's not a constructor or an async component factory,
        // reject.
        if (typeof Ctor !== "function") {
            return
        }

        // async component
        var asyncFactory
        if (isUndef(Ctor.cid)) {
            asyncFactory = Ctor
            Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context)
            if (Ctor === undefined) {
                // return a placeholder node for async component, which is rendered
                // as a comment node but preserves all the raw information for the node.
                // the information will be used for async server-rendering and hydration.
                return createAsyncPlaceholder(asyncFactory, data, context, children, tag)
            }
        }

        data = data || {}

        // resolve constructor options in case global mixins are applied after
        // component constructor creation
        resolveConstructorOptions(Ctor)

        // transform component v-model data into props & events
        if (isDef(data.model)) {
            transformModel(Ctor.options, data)
        }

        // extract props
        var propsData = extractPropsFromVNodeData(data, Ctor, tag)

        // functional component
        if (isTrue(Ctor.options.functional)) {
            return createFunctionalComponent(Ctor, propsData, data, context, children)
        }

        // keep listeners
        var listeners = data.on

        if (isTrue(Ctor.options.abstract)) {
            // abstract components do not keep anything
            // other than props & listeners & slot

            // work around flow
            var slot = data.slot
            data = {}
            if (slot) {
                data.slot = slot
            }
        }

        // merge component management hooks onto the placeholder node
        mergeHooks(data)

        // return a placeholder vnode
        var name = Ctor.options.name || tag
        var vnode = new VNode(
            "vue-component-" + Ctor.cid + (name ? "-" + name : ""),
            data,
            undefined,
            undefined,
            undefined,
            context,
            {
                Ctor: Ctor,
                propsData: propsData,
                listeners: listeners,
                tag: tag,
                children: children
            },
            asyncFactory
        )
        return vnode
    }

    function createComponentInstanceForVnode(
        vnode, // we know it's MountedComponentVNode but flow doesn't
        parent, // activeInstance in lifecycle state
        parentElm,
        refElm
    ) {
        var vnodeComponentOptions = vnode.componentOptions
        var options = {
            _isComponent: true,
            parent: parent,
            propsData: vnodeComponentOptions.propsData,
            _componentTag: vnodeComponentOptions.tag,
            _parentVnode: vnode,
            _parentListeners: vnodeComponentOptions.listeners,
            _renderChildren: vnodeComponentOptions.children,
            _parentElm: parentElm || null,
            _refElm: refElm || null
        }
        // check inline-template render functions
        var inlineTemplate = vnode.data.inlineTemplate
        if (isDef(inlineTemplate)) {
            options.render = inlineTemplate.render
            options.staticRenderFns = inlineTemplate.staticRenderFns
        }
        return new vnodeComponentOptions.Ctor(options)
    }

    function mergeHooks(data) {
        if (!data.hook) {
            data.hook = {}
        }
        for (var i = 0; i < hooksToMerge.length; i++) {
            var key = hooksToMerge[i]
            var fromParent = data.hook[key]
            var ours = componentVNodeHooks[key]
            data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours
        }
    }

    function mergeHook$1(one, two) {
        return function(a, b, c, d) {
            one(a, b, c, d)
            two(a, b, c, d)
        }
    }

    // transform component v-model info (value and callback) into
    // prop and event handler respectively.
    function transformModel(options, data) {
        var prop = (options.model && options.model.prop) || "value"
        var event = (options.model && options.model.event) || "input"
        ;(data.props || (data.props = {}))[prop] = data.model.value
        var on = data.on || (data.on = {})
        if (isDef(on[event])) {
            on[event] = [data.model.callback].concat(on[event])
        } else {
            on[event] = data.model.callback
        }
    }

    /*  */

    var SIMPLE_NORMALIZE = 1
    var ALWAYS_NORMALIZE = 2

    // wrapper function for providing a more flexible interface
    // without getting yelled at by flow
    function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
        if (Array.isArray(data) || isPrimitive(data)) {
            normalizationType = children
            children = data
            data = undefined
        }
        if (isTrue(alwaysNormalize)) {
            normalizationType = ALWAYS_NORMALIZE
        }
        return _createElement(context, tag, data, children, normalizationType)
    }

    function _createElement(context, tag, data, children, normalizationType) {
        if (isDef(data) && isDef(data.__ob__)) {
             false &&
                false
            return createEmptyVNode()
        }
        // object syntax in v-bind
        if (isDef(data) && isDef(data.is)) {
            tag = data.is
        }
        if (!tag) {
            // in case of component :is set to falsy value
            return createEmptyVNode()
        }
        // warn against non-primitive key
        if (
            false
        ) {}
        // support single function children as default scoped slot
        if (Array.isArray(children) && typeof children[0] === "function") {
            data = data || {}
            data.scopedSlots = {
                default: children[0]
            }
            children.length = 0
        }
        if (normalizationType === ALWAYS_NORMALIZE) {
            children = normalizeChildren(children)
        } else if (normalizationType === SIMPLE_NORMALIZE) {
            children = simpleNormalizeChildren(children)
        }
        var vnode, ns
        if (typeof tag === "string") {
            var Ctor
            ns = config.getTagNamespace(tag)
            if (config.isReservedTag(tag)) {
                // platform built-in elements
                vnode = new VNode(
                    config.parsePlatformTagName(tag),
                    data,
                    children,
                    undefined,
                    undefined,
                    context
                )
            } else if (isDef((Ctor = resolveAsset(context.$options, "components", tag)))) {
                // component
                vnode = createComponent(Ctor, data, context, children, tag)
            } else {
                // unknown or unlisted namespaced elements
                // check at runtime because it may get assigned a namespace when its
                // parent normalizes children
                vnode = new VNode(tag, data, children, undefined, undefined, context)
            }
        } else {
            // direct component options / constructor
            vnode = createComponent(tag, data, context, children)
        }
        if (isDef(vnode)) {
            if (ns) {
                applyNS(vnode, ns)
            }
            return vnode
        } else {
            return createEmptyVNode()
        }
    }

    function applyNS(vnode, ns) {
        vnode.ns = ns
        if (vnode.tag === "foreignObject") {
            // use default namespace inside foreignObject
            return
        }
        if (isDef(vnode.children)) {
            for (var i = 0, l = vnode.children.length; i < l; i++) {
                var child = vnode.children[i]
                if (isDef(child.tag) && isUndef(child.ns)) {
                    applyNS(child, ns)
                }
            }
        }
    }

    /*  */

    /**
     * Runtime helper for rendering v-for lists.
     */
    function renderList(val, render) {
        var ret, i, l, keys, key
        if (Array.isArray(val) || typeof val === "string") {
            ret = new Array(val.length)
            for (i = 0, l = val.length; i < l; i++) {
                ret[i] = render(val[i], i)
            }
        } else if (typeof val === "number") {
            ret = new Array(val)
            for (i = 0; i < val; i++) {
                ret[i] = render(i + 1, i)
            }
        } else if (isObject(val)) {
            keys = Object.keys(val)
            ret = new Array(keys.length)
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i]
                ret[i] = render(val[key], key, i)
            }
        }
        if (isDef(ret)) {
            ret._isVList = true
        }
        return ret
    }

    /*  */

    /**
     * Runtime helper for rendering <slot>
     */
    function renderSlot(name, fallback, props, bindObject) {
        var scopedSlotFn = this.$scopedSlots[name]
        if (scopedSlotFn) {
            // scoped slot
            props = props || {}
            if (bindObject) {
                props = extend(extend({}, bindObject), props)
            }
            return scopedSlotFn(props) || fallback
        } else {
            var slotNodes = this.$slots[name]
            // warn duplicate slot usage
            if (slotNodes && "production" !== "production") {
                slotNodes._rendered &&
                    warn(
                        'Duplicate presence of slot "' +
                            name +
                            '" found in the same render tree ' +
                            "- this will likely cause render errors.",
                        this
                    )
                slotNodes._rendered = true
            }
            return slotNodes || fallback
        }
    }

    /*  */

    /**
     * Runtime helper for resolving filters
     */
    function resolveFilter(id) {
        return resolveAsset(this.$options, "filters", id, true) || identity
    }

    /*  */

    /**
     * Runtime helper for checking keyCodes from config.
     */
    function checkKeyCodes(eventKeyCode, key, builtInAlias) {
        var keyCodes = config.keyCodes[key] || builtInAlias
        if (Array.isArray(keyCodes)) {
            return keyCodes.indexOf(eventKeyCode) === -1
        } else {
            return keyCodes !== eventKeyCode
        }
    }

    /*  */

    /**
     * Runtime helper for merging v-bind="object" into a VNode's data.
     */
    function bindObjectProps(data, tag, value, asProp, isSync) {
        if (value) {
            if (!isObject(value)) {
                 false &&
                    false
            } else {
                if (Array.isArray(value)) {
                    value = toObject(value)
                }
                var hash
                var loop = function(key) {
                    if (key === "class" || key === "style" || isReservedAttribute(key)) {
                        hash = data
                    } else {
                        var type = data.attrs && data.attrs.type
                        hash =
                            asProp || config.mustUseProp(tag, type, key)
                                ? data.domProps || (data.domProps = {})
                                : data.attrs || (data.attrs = {})
                    }
                    if (!(key in hash)) {
                        hash[key] = value[key]

                        if (isSync) {
                            var on = data.on || (data.on = {})
                            on["update:" + key] = function($event) {
                                value[key] = $event
                            }
                        }
                    }
                }

                for (var key in value) loop(key)
            }
        }
        return data
    }

    /*  */

    /**
     * Runtime helper for rendering static trees.
     */
    function renderStatic(index, isInFor) {
        var tree = this._staticTrees[index]
        // if has already-rendered static tree and not inside v-for,
        // we can reuse the same tree by doing a shallow clone.
        if (tree && !isInFor) {
            return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree)
        }
        // otherwise, render a fresh tree.
        tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(
            this._renderProxy
        )
        markStatic(tree, "__static__" + index, false)
        return tree
    }

    /**
     * Runtime helper for v-once.
     * Effectively it means marking the node as static with a unique key.
     */
    function markOnce(tree, index, key) {
        markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true)
        return tree
    }

    function markStatic(tree, key, isOnce) {
        if (Array.isArray(tree)) {
            for (var i = 0; i < tree.length; i++) {
                if (tree[i] && typeof tree[i] !== "string") {
                    markStaticNode(tree[i], key + "_" + i, isOnce)
                }
            }
        } else {
            markStaticNode(tree, key, isOnce)
        }
    }

    function markStaticNode(node, key, isOnce) {
        node.isStatic = true
        node.key = key
        node.isOnce = isOnce
    }

    /*  */

    function bindObjectListeners(data, value) {
        if (value) {
            if (!isPlainObject(value)) {
                 false &&
                    false
            } else {
                var on = (data.on = data.on ? extend({}, data.on) : {})
                for (var key in value) {
                    var existing = on[key]
                    var ours = value[key]
                    on[key] = existing ? [].concat(ours, existing) : ours
                }
            }
        }
        return data
    }

    /*  */

    function initRender(vm) {
        vm._vnode = null // the root of the child tree
        vm._staticTrees = null
        var parentVnode = (vm.$vnode = vm.$options._parentVnode) // the placeholder node in parent tree
        var renderContext = parentVnode && parentVnode.context
        vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext)
        vm.$scopedSlots = emptyObject
        // bind the createElement fn to this instance
        // so that we get proper render context inside it.
        // args order: tag, data, children, normalizationType, alwaysNormalize
        // internal version is used by render functions compiled from templates
        vm._c = function(a, b, c, d) {
            return createElement(vm, a, b, c, d, false)
        }
        // normalization is always applied for the public version, used in
        // user-written render functions.
        vm.$createElement = function(a, b, c, d) {
            return createElement(vm, a, b, c, d, true)
        }

        // $attrs & $listeners are exposed for easier HOC creation.
        // they need to be reactive so that HOCs using them are always updated
        var parentData = parentVnode && parentVnode.data
        /* istanbul ignore else */
        {
            defineReactive$$1(vm, "$attrs", parentData && parentData.attrs, null, true)
            defineReactive$$1(vm, "$listeners", parentData && parentData.on, null, true)
        }
    }

    function renderMixin(Vue) {
        Vue.prototype.$nextTick = function(fn) {
            return nextTick(fn, this)
        }

        Vue.prototype._render = function() {
            var vm = this
            var ref = vm.$options
            var render = ref.render
            var staticRenderFns = ref.staticRenderFns
            var _parentVnode = ref._parentVnode

            if (vm._isMounted) {
                // clone slot nodes on re-renders
                for (var key in vm.$slots) {
                    vm.$slots[key] = cloneVNodes(vm.$slots[key])
                }
            }

            vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject

            if (staticRenderFns && !vm._staticTrees) {
                vm._staticTrees = []
            }
            // set parent vnode. this allows render functions to have access
            // to the data on the placeholder node.
            vm.$vnode = _parentVnode
            // render self
            var vnode
            try {
                vnode = render.call(vm._renderProxy, vm.$createElement)
            } catch (e) {
                handleError(e, vm, "render function")
                // return error render result,
                // or previous vnode to prevent render error causing blank component
                /* istanbul ignore else */
                {
                    vnode = vm._vnode
                }
            }
            // return empty vnode in case the render function errored out
            if (!(vnode instanceof VNode)) {
                if (false) {}
                vnode = createEmptyVNode()
            }
            // set parent
            vnode.parent = _parentVnode
            return vnode
        }

        // internal render helpers.
        // these are exposed on the instance prototype to reduce generated render
        // code size.
        Vue.prototype._o = markOnce
        Vue.prototype._n = toNumber
        Vue.prototype._s = toString
        Vue.prototype._l = renderList
        Vue.prototype._t = renderSlot
        Vue.prototype._q = looseEqual
        Vue.prototype._i = looseIndexOf
        Vue.prototype._m = renderStatic
        Vue.prototype._f = resolveFilter
        Vue.prototype._k = checkKeyCodes
        Vue.prototype._b = bindObjectProps
        Vue.prototype._v = createTextVNode
        Vue.prototype._e = createEmptyVNode
        Vue.prototype._u = resolveScopedSlots
        Vue.prototype._g = bindObjectListeners
    }

    /*  */

    var uid = 0

    function initMixin(Vue) {
        Vue.prototype._init = function(options) {
            var vm = this
            // a uid
            vm._uid = uid++

            var startTag, endTag
            /* istanbul ignore if */
            if (false) {}

            // a flag to avoid this being observed
            vm._isVue = true
            // merge options
            if (options && options._isComponent) {
                // optimize internal component instantiation
                // since dynamic options merging is pretty slow, and none of the
                // internal component options needs special treatment.
                initInternalComponent(vm, options)
            } else {
                vm.$options = mergeOptions(
                    resolveConstructorOptions(vm.constructor),
                    options || {},
                    vm
                )
            }
            /* istanbul ignore else */
            {
                vm._renderProxy = vm
            }
            // expose real self
            vm._self = vm
            initLifecycle(vm)
            initEvents(vm)
            initRender(vm)
            callHook(vm, "beforeCreate")
            initInjections(vm) // resolve injections before data/props
            initState(vm)
            initProvide(vm) // resolve provide after data/props
            callHook(vm, "created")

            /* istanbul ignore if */
            if (false) {}

            if (vm.$options.el) {
                vm.$mount(vm.$options.el)
            }
        }
    }

    function initInternalComponent(vm, options) {
        var opts = (vm.$options = Object.create(vm.constructor.options))
        // doing this because it's faster than dynamic enumeration.
        opts.parent = options.parent
        opts.propsData = options.propsData
        opts._parentVnode = options._parentVnode
        opts._parentListeners = options._parentListeners
        opts._renderChildren = options._renderChildren
        opts._componentTag = options._componentTag
        opts._parentElm = options._parentElm
        opts._refElm = options._refElm
        if (options.render) {
            opts.render = options.render
            opts.staticRenderFns = options.staticRenderFns
        }
    }

    function resolveConstructorOptions(Ctor) {
        var options = Ctor.options
        if (Ctor.super) {
            var superOptions = resolveConstructorOptions(Ctor.super)
            var cachedSuperOptions = Ctor.superOptions
            if (superOptions !== cachedSuperOptions) {
                // super option changed,
                // need to resolve new options.
                Ctor.superOptions = superOptions
                // check if there are any late-modified/attached options (#4976)
                var modifiedOptions = resolveModifiedOptions(Ctor)
                // update base extend options
                if (modifiedOptions) {
                    extend(Ctor.extendOptions, modifiedOptions)
                }
                options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
                if (options.name) {
                    options.components[options.name] = Ctor
                }
            }
        }
        return options
    }

    function resolveModifiedOptions(Ctor) {
        var modified
        var latest = Ctor.options
        var extended = Ctor.extendOptions
        var sealed = Ctor.sealedOptions
        for (var key in latest) {
            if (latest[key] !== sealed[key]) {
                if (!modified) {
                    modified = {}
                }
                modified[key] = dedupe(latest[key], extended[key], sealed[key])
            }
        }
        return modified
    }

    function dedupe(latest, extended, sealed) {
        // compare latest and sealed to ensure lifecycle hooks won't be duplicated
        // between merges
        if (Array.isArray(latest)) {
            var res = []
            sealed = Array.isArray(sealed) ? sealed : [sealed]
            extended = Array.isArray(extended) ? extended : [extended]
            for (var i = 0; i < latest.length; i++) {
                // push original options and not sealed options to exclude duplicated options
                if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
                    res.push(latest[i])
                }
            }
            return res
        } else {
            return latest
        }
    }

    function Vue$3(options) {
        if (false) {}
        this._init(options)
    }

    initMixin(Vue$3)
    stateMixin(Vue$3)
    eventsMixin(Vue$3)
    lifecycleMixin(Vue$3)
    renderMixin(Vue$3)

    /*  */

    function initUse(Vue) {
        Vue.use = function(plugin) {
            var installedPlugins = this._installedPlugins || (this._installedPlugins = [])
            if (installedPlugins.indexOf(plugin) > -1) {
                return this
            }

            // additional parameters
            var args = toArray(arguments, 1)
            args.unshift(this)
            if (typeof plugin.install === "function") {
                plugin.install.apply(plugin, args)
            } else if (typeof plugin === "function") {
                plugin.apply(null, args)
            }
            installedPlugins.push(plugin)
            return this
        }
    }

    /*  */

    function initMixin$1(Vue) {
        Vue.mixin = function(mixin) {
            this.options = mergeOptions(this.options, mixin)
            return this
        }
    }

    /*  */

    function initExtend(Vue) {
        /**
         * Each instance constructor, including Vue, has a unique
         * cid. This enables us to create wrapped "child
         * constructors" for prototypal inheritance and cache them.
         */
        Vue.cid = 0
        var cid = 1

        /**
         * Class inheritance
         */
        Vue.extend = function(extendOptions) {
            extendOptions = extendOptions || {}
            var Super = this
            var SuperId = Super.cid
            var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
            if (cachedCtors[SuperId]) {
                return cachedCtors[SuperId]
            }

            var name = extendOptions.name || Super.options.name
            var Sub = function VueComponent(options) {
                this._init(options)
            }
            Sub.prototype = Object.create(Super.prototype)
            Sub.prototype.constructor = Sub
            Sub.cid = cid++
            Sub.options = mergeOptions(Super.options, extendOptions)
            Sub["super"] = Super

            // For props and computed properties, we define the proxy getters on
            // the Vue instances at extension time, on the extended prototype. This
            // avoids Object.defineProperty calls for each instance created.
            if (Sub.options.props) {
                initProps$1(Sub)
            }
            if (Sub.options.computed) {
                initComputed$1(Sub)
            }

            // allow further extension/mixin/plugin usage
            Sub.extend = Super.extend
            Sub.mixin = Super.mixin
            Sub.use = Super.use

            // create asset registers, so extended classes
            // can have their private assets too.
            ASSET_TYPES.forEach(function(type) {
                Sub[type] = Super[type]
            })
            // enable recursive self-lookup
            if (name) {
                Sub.options.components[name] = Sub
            }

            // keep a reference to the super options at extension time.
            // later at instantiation we can check if Super's options have
            // been updated.
            Sub.superOptions = Super.options
            Sub.extendOptions = extendOptions
            Sub.sealedOptions = extend({}, Sub.options)

            // cache constructor
            cachedCtors[SuperId] = Sub
            return Sub
        }
    }

    function initProps$1(Comp) {
        var props = Comp.options.props
        for (var key in props) {
            proxy(Comp.prototype, "_props", key)
        }
    }

    function initComputed$1(Comp) {
        var computed = Comp.options.computed
        for (var key in computed) {
            defineComputed(Comp.prototype, key, computed[key])
        }
    }

    /*  */

    function initAssetRegisters(Vue) {
        /**
         * Create asset registration methods.
         */
        ASSET_TYPES.forEach(function(type) {
            Vue[type] = function(id, definition) {
                if (!definition) {
                    return this.options[type + "s"][id]
                } else {
                    /* istanbul ignore if */
                    if (type === "component" && isPlainObject(definition)) {
                        definition.name = definition.name || id
                        definition = this.options._base.extend(definition)
                    }
                    if (type === "directive" && typeof definition === "function") {
                        definition = {
                            bind: definition,
                            update: definition
                        }
                    }
                    this.options[type + "s"][id] = definition
                    return definition
                }
            }
        })
    }

    /*  */

    var patternTypes = [String, RegExp, Array]

    function getComponentName(opts) {
        return opts && (opts.Ctor.options.name || opts.tag)
    }

    function matches(pattern, name) {
        if (Array.isArray(pattern)) {
            return pattern.indexOf(name) > -1
        } else if (typeof pattern === "string") {
            return pattern.split(",").indexOf(name) > -1
        } else if (isRegExp(pattern)) {
            return pattern.test(name)
        }
        /* istanbul ignore next */
        return false
    }

    function pruneCache(cache, current, filter) {
        for (var key in cache) {
            var cachedNode = cache[key]
            if (cachedNode) {
                var name = getComponentName(cachedNode.componentOptions)
                if (name && !filter(name)) {
                    if (cachedNode !== current) {
                        pruneCacheEntry(cachedNode)
                    }
                    cache[key] = null
                }
            }
        }
    }

    function pruneCacheEntry(vnode) {
        if (vnode) {
            vnode.componentInstance.$destroy()
        }
    }

    var KeepAlive = {
        name: "keep-alive",
        abstract: true,

        props: {
            include: patternTypes,
            exclude: patternTypes
        },

        created: function created() {
            this.cache = Object.create(null)
        },

        destroyed: function destroyed() {
            var this$1 = this

            for (var key in this$1.cache) {
                pruneCacheEntry(this$1.cache[key])
            }
        },

        watch: {
            include: function include(val) {
                pruneCache(this.cache, this._vnode, function(name) {
                    return matches(val, name)
                })
            },
            exclude: function exclude(val) {
                pruneCache(this.cache, this._vnode, function(name) {
                    return !matches(val, name)
                })
            }
        },

        render: function render() {
            var vnode = getFirstComponentChild(this.$slots.default)
            var componentOptions = vnode && vnode.componentOptions
            if (componentOptions) {
                // check pattern
                var name = getComponentName(componentOptions)
                if (
                    name &&
                    ((this.include && !matches(this.include, name)) ||
                        (this.exclude && matches(this.exclude, name)))
                ) {
                    return vnode
                }
                var key =
                    vnode.key == null
                        ? // same constructor may get registered as different local components
                          // so cid alone is not enough (#3269)
                          componentOptions.Ctor.cid +
                          (componentOptions.tag ? "::" + componentOptions.tag : "")
                        : vnode.key
                if (this.cache[key]) {
                    vnode.componentInstance = this.cache[key].componentInstance
                } else {
                    this.cache[key] = vnode
                }
                vnode.data.keepAlive = true
            }
            return vnode
        }
    }

    var builtInComponents = {
        KeepAlive: KeepAlive
    }

    /*  */

    function initGlobalAPI(Vue) {
        // config
        var configDef = {}
        configDef.get = function() {
            return config
        }
        Object.defineProperty(Vue, "config", configDef)

        // exposed util methods.
        // NOTE: these are not considered part of the public API - avoid relying on
        // them unless you are aware of the risk.
        Vue.util = {
            warn: warn,
            extend: extend,
            mergeOptions: mergeOptions,
            defineReactive: defineReactive$$1
        }

        Vue.set = set
        Vue.delete = del
        Vue.nextTick = nextTick

        Vue.options = Object.create(null)
        ASSET_TYPES.forEach(function(type) {
            Vue.options[type + "s"] = Object.create(null)
        })

        // this is used to identify the "base" constructor to extend all plain-object
        // components with in Weex's multi-instance scenarios.
        Vue.options._base = Vue

        extend(Vue.options.components, builtInComponents)

        initUse(Vue)
        initMixin$1(Vue)
        initExtend(Vue)
        initAssetRegisters(Vue)
    }

    initGlobalAPI(Vue$3)

    Object.defineProperty(Vue$3.prototype, "$isServer", {
        get: isServerRendering
    })

    Object.defineProperty(Vue$3.prototype, "$ssrContext", {
        get: function get() {
            /* istanbul ignore next */
            return this.$vnode && this.$vnode.ssrContext
        }
    })

    Vue$3.version = "2.4.1"
    Vue$3.mpvueVersion = "1.0.12"

    /* globals renderer */

    var isReservedTag = makeMap(
        "template,script,style,element,content,slot,link,meta,svg,view," +
            "a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select," +
            "slider,slider-neighbor,indicator,trisition,trisition-group,canvas," +
            "list,cell,header,loading,loading-indicator,refresh,scrollable,scroller," +
            "video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown",
        true
    )

    // these are reserved for web because they are directly compiled away
    // during template compilation
    var isReservedAttr = makeMap("style,class")

    // Elements that you can, intentionally, leave open (and which close themselves)
    // more flexable than web
    var canBeLeftOpenTag = makeMap(
        "web,spinner,switch,video,textarea,canvas," + "indicator,marquee,countdown",
        true
    )

    var isUnaryTag = makeMap("embed,img,image,input,link,meta", true)

    function mustUseProp() {
        /* console.log('mustUseProp') */
    }

    function getTagNamespace() {
        /* console.log('getTagNamespace') */
    }

    function isUnknownElement() {
        /* console.log('isUnknownElement') */
    }

    function getComKey(vm) {
        return vm && vm.$attrs ? vm.$attrs["mpcomid"] : "0"
    }

    // 用于小程序的 event type 到 web 的 event
    var eventTypeMap = {
        tap: ["tap", "click"],
        touchstart: ["touchstart"],
        touchmove: ["touchmove"],
        touchcancel: ["touchcancel"],
        touchend: ["touchend"],
        longtap: ["longtap"],
        input: ["input"],
        blur: ["change", "blur"],
        submit: ["submit"],
        focus: ["focus"],
        scrolltoupper: ["scrolltoupper"],
        scrolltolower: ["scrolltolower"],
        scroll: ["scroll"]
    }

    /*  */

    // import { namespaceMap } from 'mp/util/index'

    var obj = {}

    function createElement$1(tagName, vnode) {
        return obj
    }

    function createElementNS(namespace, tagName) {
        return obj
    }

    function createTextNode(text) {
        return obj
    }

    function createComment(text) {
        return obj
    }

    function insertBefore(parentNode, newNode, referenceNode) {}

    function removeChild(node, child) {}

    function appendChild(node, child) {}

    function parentNode(node) {
        return obj
    }

    function nextSibling(node) {
        return obj
    }

    function tagName(node) {
        return "div"
    }

    function setTextContent(node, text) {
        return obj
    }

    function setAttribute(node, key, val) {
        return obj
    }

    var nodeOps = Object.freeze({
        createElement: createElement$1,
        createElementNS: createElementNS,
        createTextNode: createTextNode,
        createComment: createComment,
        insertBefore: insertBefore,
        removeChild: removeChild,
        appendChild: appendChild,
        parentNode: parentNode,
        nextSibling: nextSibling,
        tagName: tagName,
        setTextContent: setTextContent,
        setAttribute: setAttribute
    })

    /*  */

    var ref = {
        create: function create(_, vnode) {
            registerRef(vnode)
        },
        update: function update(oldVnode, vnode) {
            if (oldVnode.data.ref !== vnode.data.ref) {
                registerRef(oldVnode, true)
                registerRef(vnode)
            }
        },
        destroy: function destroy(vnode) {
            registerRef(vnode, true)
        }
    }

    function registerRef(vnode, isRemoval) {
        var key = vnode.data.ref
        if (!key) {
            return
        }

        var vm = vnode.context
        var ref = vnode.componentInstance || vnode.elm
        var refs = vm.$refs
        if (isRemoval) {
            if (Array.isArray(refs[key])) {
                remove(refs[key], ref)
            } else if (refs[key] === ref) {
                refs[key] = undefined
            }
        } else {
            if (vnode.data.refInFor) {
                if (!Array.isArray(refs[key])) {
                    refs[key] = [ref]
                } else if (refs[key].indexOf(ref) < 0) {
                    // $flow-disable-line
                    refs[key].push(ref)
                }
            } else {
                refs[key] = ref
            }
        }
    }

    /**
     * Virtual DOM patching algorithm based on Snabbdom by
     * Simon Friis Vindum (@paldepind)
     * Licensed under the MIT License
     * https://github.com/paldepind/snabbdom/blob/master/LICENSE
     *
     * modified by Evan You (@yyx990803)
     *

    /*
     * Not type-checking this because this file is perf-critical and the cost
     * of making flow understand it is not worth it.
     */

    var emptyNode = new VNode("", {}, [])

    var hooks = ["create", "activate", "update", "remove", "destroy"]

    function sameVnode(a, b) {
        return (
            a.key === b.key &&
            ((a.tag === b.tag &&
                a.isComment === b.isComment &&
                isDef(a.data) === isDef(b.data) &&
                sameInputType(a, b)) ||
                (isTrue(a.isAsyncPlaceholder) &&
                    a.asyncFactory === b.asyncFactory &&
                    isUndef(b.asyncFactory.error)))
        )
    }

    // Some browsers do not support dynamically changing type for <input>
    // so they need to be treated as different nodes
    function sameInputType(a, b) {
        if (a.tag !== "input") {
            return true
        }
        var i
        var typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type
        var typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type
        return typeA === typeB
    }

    function createKeyToOldIdx(children, beginIdx, endIdx) {
        var i, key
        var map = {}
        for (i = beginIdx; i <= endIdx; ++i) {
            key = children[i].key
            if (isDef(key)) {
                map[key] = i
            }
        }
        return map
    }

    function createPatchFunction(backend) {
        var i, j
        var cbs = {}

        var modules = backend.modules
        var nodeOps = backend.nodeOps

        for (i = 0; i < hooks.length; ++i) {
            cbs[hooks[i]] = []
            for (j = 0; j < modules.length; ++j) {
                if (isDef(modules[j][hooks[i]])) {
                    cbs[hooks[i]].push(modules[j][hooks[i]])
                }
            }
        }

        function emptyNodeAt(elm) {
            return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
        }

        function createRmCb(childElm, listeners) {
            function remove$$1() {
                if (--remove$$1.listeners === 0) {
                    removeNode(childElm)
                }
            }
            remove$$1.listeners = listeners
            return remove$$1
        }

        function removeNode(el) {
            var parent = nodeOps.parentNode(el)
            // element may have already been removed due to v-html / v-text
            if (isDef(parent)) {
                nodeOps.removeChild(parent, el)
            }
        }

        var inPre = 0

        function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
            vnode.isRootInsert = !nested // for transition enter check
            if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
                return
            }

            var data = vnode.data
            var children = vnode.children
            var tag = vnode.tag
            if (isDef(tag)) {
                vnode.elm = vnode.ns
                    ? nodeOps.createElementNS(vnode.ns, tag)
                    : nodeOps.createElement(tag, vnode)
                setScope(vnode)

                /* istanbul ignore if */
                {
                    createChildren(vnode, children, insertedVnodeQueue)
                    if (isDef(data)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue)
                    }
                    insert(parentElm, vnode.elm, refElm)
                }

                if (false) {}
            } else if (isTrue(vnode.isComment)) {
                vnode.elm = nodeOps.createComment(vnode.text)
                insert(parentElm, vnode.elm, refElm)
            } else {
                vnode.elm = nodeOps.createTextNode(vnode.text)
                insert(parentElm, vnode.elm, refElm)
            }
        }

        function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
            var i = vnode.data
            if (isDef(i)) {
                var isReactivated = isDef(vnode.componentInstance) && i.keepAlive
                if (isDef((i = i.hook)) && isDef((i = i.init))) {
                    i(vnode, false /* hydrating */, parentElm, refElm)
                }
                // after calling the init hook, if the vnode is a child component
                // it should've created a child instance and mounted it. the child
                // component also has set the placeholder vnode's elm.
                // in that case we can just return the element and be done.
                if (isDef(vnode.componentInstance)) {
                    initComponent(vnode, insertedVnodeQueue)
                    if (isTrue(isReactivated)) {
                        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
                    }
                    return true
                }
            }
        }

        function initComponent(vnode, insertedVnodeQueue) {
            if (isDef(vnode.data.pendingInsert)) {
                insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
                vnode.data.pendingInsert = null
            }
            vnode.elm = vnode.componentInstance.$el
            if (isPatchable(vnode)) {
                invokeCreateHooks(vnode, insertedVnodeQueue)
                setScope(vnode)
            } else {
                // empty component root.
                // skip all element-related modules except for ref (#3455)
                registerRef(vnode)
                // make sure to invoke the insert hook
                insertedVnodeQueue.push(vnode)
            }
        }

        function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
            var i
            // hack for #4339: a reactivated component with inner transition
            // does not trigger because the inner node's created hooks are not called
            // again. It's not ideal to involve module-specific logic in here but
            // there doesn't seem to be a better way to do it.
            var innerNode = vnode
            while (innerNode.componentInstance) {
                innerNode = innerNode.componentInstance._vnode
                if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
                    for (i = 0; i < cbs.activate.length; ++i) {
                        cbs.activate[i](emptyNode, innerNode)
                    }
                    insertedVnodeQueue.push(innerNode)
                    break
                }
            }
            // unlike a newly created component,
            // a reactivated keep-alive component doesn't insert itself
            insert(parentElm, vnode.elm, refElm)
        }

        function insert(parent, elm, ref$$1) {
            if (isDef(parent)) {
                if (isDef(ref$$1)) {
                    if (ref$$1.parentNode === parent) {
                        nodeOps.insertBefore(parent, elm, ref$$1)
                    }
                } else {
                    nodeOps.appendChild(parent, elm)
                }
            }
        }

        function createChildren(vnode, children, insertedVnodeQueue) {
            if (Array.isArray(children)) {
                for (var i = 0; i < children.length; ++i) {
                    createElm(children[i], insertedVnodeQueue, vnode.elm, null, true)
                }
            } else if (isPrimitive(vnode.text)) {
                nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
            }
        }

        function isPatchable(vnode) {
            while (vnode.componentInstance) {
                vnode = vnode.componentInstance._vnode
            }
            return isDef(vnode.tag)
        }

        function invokeCreateHooks(vnode, insertedVnodeQueue) {
            for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, vnode)
            }
            i = vnode.data.hook // Reuse variable
            if (isDef(i)) {
                if (isDef(i.create)) {
                    i.create(emptyNode, vnode)
                }
                if (isDef(i.insert)) {
                    insertedVnodeQueue.push(vnode)
                }
            }
        }

        // set scope id attribute for scoped CSS.
        // this is implemented as a special case to avoid the overhead
        // of going through the normal attribute patching process.
        function setScope(vnode) {
            var i
            var ancestor = vnode
            while (ancestor) {
                if (isDef((i = ancestor.context)) && isDef((i = i.$options._scopeId))) {
                    nodeOps.setAttribute(vnode.elm, i, "")
                }
                ancestor = ancestor.parent
            }
            // for slot content they should also get the scopeId from the host instance.
            if (
                isDef((i = activeInstance)) &&
                i !== vnode.context &&
                isDef((i = i.$options._scopeId))
            ) {
                nodeOps.setAttribute(vnode.elm, i, "")
            }
        }

        function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
            for (; startIdx <= endIdx; ++startIdx) {
                createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm)
            }
        }

        function invokeDestroyHook(vnode) {
            var i, j
            var data = vnode.data
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.destroy))) {
                    i(vnode)
                }
                for (i = 0; i < cbs.destroy.length; ++i) {
                    cbs.destroy[i](vnode)
                }
            }
            if (isDef((i = vnode.children))) {
                for (j = 0; j < vnode.children.length; ++j) {
                    invokeDestroyHook(vnode.children[j])
                }
            }
        }

        function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
            for (; startIdx <= endIdx; ++startIdx) {
                var ch = vnodes[startIdx]
                if (isDef(ch)) {
                    if (isDef(ch.tag)) {
                        removeAndInvokeRemoveHook(ch)
                        invokeDestroyHook(ch)
                    } else {
                        // Text node
                        removeNode(ch.elm)
                    }
                }
            }
        }

        function removeAndInvokeRemoveHook(vnode, rm) {
            if (isDef(rm) || isDef(vnode.data)) {
                var i
                var listeners = cbs.remove.length + 1
                if (isDef(rm)) {
                    // we have a recursively passed down rm callback
                    // increase the listeners count
                    rm.listeners += listeners
                } else {
                    // directly removing
                    rm = createRmCb(vnode.elm, listeners)
                }
                // recursively invoke hooks on child component root node
                if (
                    isDef((i = vnode.componentInstance)) &&
                    isDef((i = i._vnode)) &&
                    isDef(i.data)
                ) {
                    removeAndInvokeRemoveHook(i, rm)
                }
                for (i = 0; i < cbs.remove.length; ++i) {
                    cbs.remove[i](vnode, rm)
                }
                if (isDef((i = vnode.data.hook)) && isDef((i = i.remove))) {
                    i(vnode, rm)
                } else {
                    rm()
                }
            } else {
                removeNode(vnode.elm)
            }
        }

        function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
            var oldStartIdx = 0
            var newStartIdx = 0
            var oldEndIdx = oldCh.length - 1
            var oldStartVnode = oldCh[0]
            var oldEndVnode = oldCh[oldEndIdx]
            var newEndIdx = newCh.length - 1
            var newStartVnode = newCh[0]
            var newEndVnode = newCh[newEndIdx]
            var oldKeyToIdx, idxInOld, elmToMove, refElm

            // removeOnly is a special flag used only by <transition-group>
            // to ensure removed elements stay in correct relative positions
            // during leaving transitions
            var canMove = !removeOnly

            while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                if (isUndef(oldStartVnode)) {
                    oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
                } else if (isUndef(oldEndVnode)) {
                    oldEndVnode = oldCh[--oldEndIdx]
                } else if (sameVnode(oldStartVnode, newStartVnode)) {
                    patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
                    oldStartVnode = oldCh[++oldStartIdx]
                    newStartVnode = newCh[++newStartIdx]
                } else if (sameVnode(oldEndVnode, newEndVnode)) {
                    patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
                    oldEndVnode = oldCh[--oldEndIdx]
                    newEndVnode = newCh[--newEndIdx]
                } else if (sameVnode(oldStartVnode, newEndVnode)) {
                    // Vnode moved right
                    patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
                    canMove &&
                        nodeOps.insertBefore(
                            parentElm,
                            oldStartVnode.elm,
                            nodeOps.nextSibling(oldEndVnode.elm)
                        )
                    oldStartVnode = oldCh[++oldStartIdx]
                    newEndVnode = newCh[--newEndIdx]
                } else if (sameVnode(oldEndVnode, newStartVnode)) {
                    // Vnode moved left
                    patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
                    canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
                    oldEndVnode = oldCh[--oldEndIdx]
                    newStartVnode = newCh[++newStartIdx]
                } else {
                    if (isUndef(oldKeyToIdx)) {
                        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
                    }
                    idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
                    if (isUndef(idxInOld)) {
                        // New element
                        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
                        newStartVnode = newCh[++newStartIdx]
                    } else {
                        elmToMove = oldCh[idxInOld]
                        /* istanbul ignore if */
                        if (false) {}
                        if (sameVnode(elmToMove, newStartVnode)) {
                            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
                            oldCh[idxInOld] = undefined
                            canMove &&
                                nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm)
                            newStartVnode = newCh[++newStartIdx]
                        } else {
                            // same key but different element. treat as new element
                            createElm(
                                newStartVnode,
                                insertedVnodeQueue,
                                parentElm,
                                oldStartVnode.elm
                            )
                            newStartVnode = newCh[++newStartIdx]
                        }
                    }
                }
            }
            if (oldStartIdx > oldEndIdx) {
                refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
                addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
            } else if (newStartIdx > newEndIdx) {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
            }
        }

        function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
            if (oldVnode === vnode) {
                return
            }

            var elm = (vnode.elm = oldVnode.elm)

            if (isTrue(oldVnode.isAsyncPlaceholder)) {
                if (isDef(vnode.asyncFactory.resolved)) {
                    hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
                } else {
                    vnode.isAsyncPlaceholder = true
                }
                return
            }

            // reuse element for static trees.
            // note we only do this if the vnode is cloned -
            // if the new node is not cloned it means the render functions have been
            // reset by the hot-reload-api and we need to do a proper re-render.
            if (
                isTrue(vnode.isStatic) &&
                isTrue(oldVnode.isStatic) &&
                vnode.key === oldVnode.key &&
                (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
            ) {
                vnode.componentInstance = oldVnode.componentInstance
                return
            }

            var i
            var data = vnode.data
            if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
                i(oldVnode, vnode)
            }

            var oldCh = oldVnode.children
            var ch = vnode.children
            if (isDef(data) && isPatchable(vnode)) {
                for (i = 0; i < cbs.update.length; ++i) {
                    cbs.update[i](oldVnode, vnode)
                }
                if (isDef((i = data.hook)) && isDef((i = i.update))) {
                    i(oldVnode, vnode)
                }
            }
            if (isUndef(vnode.text)) {
                if (isDef(oldCh) && isDef(ch)) {
                    if (oldCh !== ch) {
                        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
                    }
                } else if (isDef(ch)) {
                    if (isDef(oldVnode.text)) {
                        nodeOps.setTextContent(elm, "")
                    }
                    addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
                } else if (isDef(oldCh)) {
                    removeVnodes(elm, oldCh, 0, oldCh.length - 1)
                } else if (isDef(oldVnode.text)) {
                    nodeOps.setTextContent(elm, "")
                }
            } else if (oldVnode.text !== vnode.text) {
                nodeOps.setTextContent(elm, vnode.text)
            }
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.postpatch))) {
                    i(oldVnode, vnode)
                }
            }
        }

        function invokeInsertHook(vnode, queue, initial) {
            // delay insert hooks for component root nodes, invoke them after the
            // element is really inserted
            if (isTrue(initial) && isDef(vnode.parent)) {
                vnode.parent.data.pendingInsert = queue
            } else {
                for (var i = 0; i < queue.length; ++i) {
                    queue[i].data.hook.insert(queue[i])
                }
            }
        }

        var bailed = false
        // list of modules that can skip create hook during hydration because they
        // are already rendered on the client or has no need for initialization
        var isRenderedModule = makeMap("attrs,style,class,staticClass,staticStyle,key")

        // Note: this is a browser-only function so we can assume elms are DOM nodes.
        function hydrate(elm, vnode, insertedVnodeQueue) {
            if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
                vnode.elm = elm
                vnode.isAsyncPlaceholder = true
                return true
            }
            vnode.elm = elm
            var tag = vnode.tag
            var data = vnode.data
            var children = vnode.children
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.init))) {
                    i(vnode, true /* hydrating */)
                }
                if (isDef((i = vnode.componentInstance))) {
                    // child component. it should have hydrated its own tree.
                    initComponent(vnode, insertedVnodeQueue)
                    return true
                }
            }
            if (isDef(tag)) {
                if (isDef(children)) {
                    // empty element, allow client to pick up and populate children
                    if (!elm.hasChildNodes()) {
                        createChildren(vnode, children, insertedVnodeQueue)
                    } else {
                        var childrenMatch = true
                        var childNode = elm.firstChild
                        for (var i$1 = 0; i$1 < children.length; i$1++) {
                            if (
                                !childNode ||
                                !hydrate(childNode, children[i$1], insertedVnodeQueue)
                            ) {
                                childrenMatch = false
                                break
                            }
                            childNode = childNode.nextSibling
                        }
                        // if childNode is not null, it means the actual childNodes list is
                        // longer than the virtual children list.
                        if (!childrenMatch || childNode) {
                            if (
                                false
                            ) {}
                            return false
                        }
                    }
                }
                if (isDef(data)) {
                    for (var key in data) {
                        if (!isRenderedModule(key)) {
                            invokeCreateHooks(vnode, insertedVnodeQueue)
                            break
                        }
                    }
                }
            } else if (elm.data !== vnode.text) {
                elm.data = vnode.text
            }
            return true
        }

        return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
            if (isUndef(vnode)) {
                if (isDef(oldVnode)) {
                    invokeDestroyHook(oldVnode)
                }
                return
            }

            var isInitialPatch = false
            var insertedVnodeQueue = []

            if (isUndef(oldVnode)) {
                // empty mount (likely as component), create new root element
                isInitialPatch = true
                createElm(vnode, insertedVnodeQueue, parentElm, refElm)
            } else {
                var isRealElement = isDef(oldVnode.nodeType)
                if (!isRealElement && sameVnode(oldVnode, vnode)) {
                    // patch existing root node
                    patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
                } else {
                    if (isRealElement) {
                        // mounting to a real element
                        // check if this is server-rendered content and if we can perform
                        // a successful hydration.
                        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                            oldVnode.removeAttribute(SSR_ATTR)
                            hydrating = true
                        }
                        if (isTrue(hydrating)) {
                            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                                invokeInsertHook(vnode, insertedVnodeQueue, true)
                                return oldVnode
                            } else {
                            }
                        }
                        // either not server-rendered, or hydration failed.
                        // create an empty node and replace it
                        oldVnode = emptyNodeAt(oldVnode)
                    }
                    // replacing existing element
                    var oldElm = oldVnode.elm
                    var parentElm$1 = nodeOps.parentNode(oldElm)
                    createElm(
                        vnode,
                        insertedVnodeQueue,
                        // extremely rare edge case: do not insert if old element is in a
                        // leaving transition. Only happens when combining transition +
                        // keep-alive + HOCs. (#4590)
                        oldElm._leaveCb ? null : parentElm$1,
                        nodeOps.nextSibling(oldElm)
                    )

                    if (isDef(vnode.parent)) {
                        // component root element replaced.
                        // update parent placeholder node element, recursively
                        var ancestor = vnode.parent
                        while (ancestor) {
                            ancestor.elm = vnode.elm
                            ancestor = ancestor.parent
                        }
                        if (isPatchable(vnode)) {
                            for (var i = 0; i < cbs.create.length; ++i) {
                                cbs.create[i](emptyNode, vnode.parent)
                            }
                        }
                    }

                    if (isDef(parentElm$1)) {
                        removeVnodes(parentElm$1, [oldVnode], 0, 0)
                    } else if (isDef(oldVnode.tag)) {
                        invokeDestroyHook(oldVnode)
                    }
                }
            }

            invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
            return vnode.elm
        }
    }

    /*  */

    // import baseModules from 'core/vdom/modules/index'
    // const platformModules = []
    // import platformModules from 'web/runtime/modules/index'

    // the directive module should be applied last, after all
    // built-in modules have been applied.
    // const modules = platformModules.concat(baseModules)
    var modules = [ref]

    var corePatch = createPatchFunction({
        nodeOps: nodeOps,
        modules: modules
    })

    function patch() {
        corePatch.apply(this, arguments)
        this.$updateDataToMP()
    }

    function callHook$1(vm, hook, params) {
        var handlers = vm.$options[hook]
        if (hook === "onError" && handlers) {
            handlers = [handlers]
        }

        var ret
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                try {
                    ret = handlers[i].call(vm, params)
                } catch (e) {
                    handleError(e, vm, hook + " hook")
                }
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit("hook:" + hook)
        }

        // for child
        if (vm.$children.length) {
            vm.$children.forEach(function(v) {
                return callHook$1(v, hook, params)
            })
        }

        return ret
    }

    // mpType 小程序实例的类型，可能的值是 'app', 'page'
    // rootVueVM 是 vue 的根组件实例，子组件中访问 this.$root 可得
    function getGlobalData(app, rootVueVM) {
        var mp = rootVueVM.$mp
        if (app && app.globalData) {
            mp.appOptions = app.globalData.appOptions
        }
    }

    // 格式化 properties 属性，并给每个属性加上 observer 方法

    // properties 的 一些类型 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
    // properties: {
    //   paramA: Number,
    //   myProperty: { // 属性名
    //     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    //     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
    //     observer: function(newVal, oldVal, changedPath) {
    //        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    //        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
    //     }
    //   },
    // }

    // props 的一些类型 https://cn.vuejs.org/v2/guide/components-props.html#ad
    // props: {
    //   // 基础的类型检查 (`null` 匹配任何类型)
    //   propA: Number,
    //   // 多个可能的类型
    //   propB: [String, Number],
    //   // 必填的字符串
    //   propC: {
    //     type: String,
    //     required: true
    //   },
    //   // 带有默认值的数字
    //   propD: {
    //     type: Number,
    //     default: 100
    //   },
    //   // 带有默认值的对象
    //   propE: {
    //     type: Object,
    //     // 对象或数组且一定会从一个工厂函数返回默认值
    //     default: function () {
    //       return { message: 'hello' }
    //     }
    //   },
    //   // 自定义验证函数
    //   propF: {
    //     validator: function (value) {
    //       // 这个值必须匹配下列字符串中的一个
    //       return ['success', 'warning', 'danger'].indexOf(value) !== -1
    //     }
    //   }
    // }

    // core/util/options
    function normalizeProps$1(props, res, vm) {
        if (!props) {
            return
        }
        var i, val, name
        if (Array.isArray(props)) {
            i = props.length
            while (i--) {
                val = props[i]
                if (typeof val === "string") {
                    name = camelize(val)
                    res[name] = {
                        type: null
                    }
                } else {
                }
            }
        } else if (isPlainObject(props)) {
            for (var key in props) {
                val = props[key]
                name = camelize(key)
                res[name] = isPlainObject(val)
                    ? val
                    : {
                          type: val
                      }
            }
        }

        // fix vueProps to properties
        for (var key$1 in res) {
            if (res.hasOwnProperty(key$1)) {
                var item = res[key$1]
                if (item.default) {
                    item.value = item.default
                }
                var oldObserver = item.observer
                item.observer = function(newVal, oldVal) {
                    vm[name] = newVal
                    // 先修改值再触发原始的 observer，跟 watch 行为保持一致
                    if (typeof oldObserver === "function") {
                        oldObserver.call(vm, newVal, oldVal)
                    }
                }
            }
        }

        return res
    }

    function normalizeProperties(vm) {
        var properties = vm.$options.properties
        var vueProps = vm.$options.props
        var res = {}

        normalizeProps$1(properties, res, vm)
        normalizeProps$1(vueProps, res, vm)

        return res
    }

    /**
     * 把 properties 中的属性 proxy 到 vm 上
     */
    function initMpProps(vm) {
        var mpProps = (vm._mpProps = {})
        var keys = Object.keys(vm.$options.properties || {})
        keys.forEach(function(key) {
            if (!(key in vm)) {
                proxy(vm, "_mpProps", key)
                mpProps[key] = undefined // for observe
            }
        })
        observe(mpProps, true)
    }

    function initMP(mpType, next) {
        var rootVueVM = this.$root
        if (!rootVueVM.$mp) {
            rootVueVM.$mp = {}
        }

        var mp = rootVueVM.$mp

        // Please do not register multiple Pages
        // if (mp.registered) {
        if (mp.status) {
            // 处理子组件的小程序生命周期
            if (mpType === "app") {
                callHook$1(this, "onLaunch", mp.appOptions)
            } else {
                this.__wxWebviewId__ = rootVueVM.__wxWebviewId__
                this.__wxExparserNodeId__ = rootVueVM.__wxExparserNodeId__
                callHook$1(this, "onLoad", mp.query)
                // callHook$1(this, "onReady") // 避免 onReady触发两次
            }
            return next()
        }
        // mp.registered = true

        mp.mpType = mpType
        mp.status = "register"

        if (mpType === "app") {
            global.App({
                // 页面的初始数据
                globalData: {
                    appOptions: {}
                },

                handleProxy: function handleProxy(e) {
                    return rootVueVM.$handleProxyWithVue(e)
                },

                // Do something initial when launch.
                onLaunch: function onLaunch(options) {
                    if (options === void 0) options = {}

                    mp.app = this
                    mp.status = "launch"
                    this.globalData.appOptions = mp.appOptions = options
                    callHook$1(rootVueVM, "onLaunch", options)
                    next()
                },

                // Do something when app show.
                onShow: function onShow(options) {
                    if (options === void 0) options = {}

                    mp.status = "show"
                    this.globalData.appOptions = mp.appOptions = options
                    callHook$1(rootVueVM, "onShow", options)
                },

                // Do something when app hide.
                onHide: function onHide() {
                    mp.status = "hide"
                    callHook$1(rootVueVM, "onHide")
                },

                onError: function onError(err) {
                    callHook$1(rootVueVM, "onError", err)
                },
                //fixed by xxxxxx
                onUniNViewMessage: function onUniNViewMessage(e) {
                    callHook$1(rootVueVM, "onUniNViewMessage", e)
                }
            })
        } else if (mpType === "component") {
            initMpProps(rootVueVM)

            global.Component({
                // 小程序原生的组件属性
                properties: normalizeProperties(rootVueVM),
                // 页面的初始数据
                data: {
                    $root: {}
                },
                methods: {
                    handleProxy: function handleProxy(e) {
                        return rootVueVM.$handleProxyWithVue(e)
                    }
                },
                // mp lifecycle for vue
                // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
                created: function created() {
                    mp.status = "created"
                    mp.page = this
                },
                // 组件生命周期函数，在组件实例进入页面节点树时执行
                attached: function attached() {
                    mp.status = "attached"
                    callHook$1(rootVueVM, "attached")
                },
                // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
                ready: function ready() {
                    mp.status = "ready"

                    callHook$1(rootVueVM, "ready")
                    next()

                    // 只有页面需要 setData
                    rootVueVM.$nextTick(function() {
                        rootVueVM._initDataToMP()
                    })
                },
                // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
                moved: function moved() {
                    callHook$1(rootVueVM, "moved")
                },
                // 组件生命周期函数，在组件实例被从页面节点树移除时执行
                detached: function detached() {
                    mp.status = "detached"
                    callHook$1(rootVueVM, "detached")
                }
            })
        } else {
            var app = global.getApp()
    
            
            global.Page({
                // 页面的初始数据
                data: {
                    $root: {}
                },

                handleProxy: function handleProxy(e) {
                    return rootVueVM.$handleProxyWithVue(e)
                },

                // mp lifecycle for vue
                // 生命周期函数--监听页面加载
                onLoad: function onLoad(query) {
                    rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
                    rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__
                    mp.page = this
                    mp.query = query
                    mp.status = "load"
                    getGlobalData(app, rootVueVM)
                    //仅load时重置数据
                    if (rootVueVM.$options && typeof rootVueVM.$options.data === "function") {
                    		Object.assign(rootVueVM.$data, rootVueVM.$options.data())
                    }
                    callHook$1(rootVueVM, "onLoad", query)
                },

                // 生命周期函数--监听页面显示
                onShow: function onShow() {
                    rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
                    rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__
                    mp.page = this
                    mp.status = "show"
                
                    callHook$1(rootVueVM, "onShow")
                    
                    //   // 只有页面需要 setData
                    rootVueVM.$nextTick(function () {
                    	rootVueVM._initDataToMP();
                    });
                },

                // 生命周期函数--监听页面初次渲染完成
                onReady: function onReady() {
                    mp.status = "ready"

                    callHook$1(rootVueVM, "onReady")
                    next()
                },

                // 生命周期函数--监听页面隐藏
                onHide: function onHide() {
                    mp.status = "hide"
                    callHook$1(rootVueVM, "onHide")
                },

                // 生命周期函数--监听页面卸载
                onUnload: function onUnload() {
                    mp.status = "unload"
                    callHook$1(rootVueVM, "onUnload")
                    mp.page = null
                },

                // 页面相关事件处理函数--监听用户下拉动作
                onPullDownRefresh: function onPullDownRefresh() {
                    callHook$1(rootVueVM, "onPullDownRefresh")
                },

                // 页面上拉触底事件的处理函数
                onReachBottom: function onReachBottom() {
                    callHook$1(rootVueVM, "onReachBottom")
                },

                // 用户点击右上角分享
                onShareAppMessage: rootVueVM.$options.onShareAppMessage
                    ? function(options) {
                          return callHook$1(rootVueVM, "onShareAppMessage", options)
                      }
                    : null,

                // Do something when page scroll
                onPageScroll: function onPageScroll(options) {
                    callHook$1(rootVueVM, "onPageScroll", options)
                },

                // 当前是 tab 页时，点击 tab 时触发
                onTabItemTap: function onTabItemTap(options) {
                    callHook$1(rootVueVM, "onTabItemTap", options)
                }
            })
        }
    }

    // 节流方法，性能优化
    // 全局的命名约定，为了节省编译的包大小一律采取形象的缩写，说明如下。
    // $c === $child
    // $k === $comKey

    // 新型的被拍平的数据结构
    // {
    //   $root: {
    //     '1-1'{
    //       // ... data
    //     },
    //     '1.2-1': {
    //       // ... data1
    //     },
    //     '1.2-2': {
    //       // ... data2
    //     }
    //   }
    // }

    function getVmData(vm) {
        // 确保当前 vm 所有数据被同步
        var dataKeys = [].concat(
            Object.keys(vm._data || {}),
            Object.keys(vm._props || {}),
            Object.keys(vm._mpProps || {}),
            Object.keys(vm._computedWatchers || {})
        )
        return dataKeys.reduce(function(res, key) {
            res[key] = vm[key]
            return res
        }, {})
    }

    function getParentComKey(vm, res) {
        if (res === void 0) res = []

        var ref = vm || {}
        var $parent = ref.$parent
        if (!$parent) {
            return res
        }
        res.unshift(getComKey($parent))
        if ($parent.$parent) {
            return getParentComKey($parent, res)
        }
        return res
    }

    function formatVmData(vm) {
        var $p = getParentComKey(vm).join(",")
        var $k = $p + ($p ? "," : "") + getComKey(vm)

        // getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据
        // 改动 vue.runtime 所获的的核心能力
        var data = Object.assign(getVmData(vm), {
            $k: $k,
            $kk: $k + ",",
            $p: $p
        })
        var key = "$root." + $k
        var res = {}
        res[key] = data
        return res
    }

    function collectVmData(vm, res) {
        if (res === void 0) res = {}

        var vms = vm.$children
        if (vms && vms.length) {
            vms.forEach(function(v) {
                return collectVmData(v, res)
            })
        }
        return Object.assign(res, formatVmData(vm))
    }

    /**
     * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
     * 自动合并 data
     *
     * @param  {function}   func      传入函数
     * @param  {number}     wait      表示时间窗口的间隔
     * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
     *                                如果想忽略结尾边界上的调用，传入{trailing: false}
     * @return {function}             返回客户调用函数
     */
    function throttle(func, wait, options) {
        var context, args, result
        var timeout = null
        // 上次执行时间点
        var previous = 0
        if (!options) {
            options = {}
        }
        // 延迟执行函数
        function later() {
            // 若设定了开始边界不执行选项，上次执行时间始终为0
            previous = options.leading === false ? 0 : Date.now()
            timeout = null
            result = func.apply(context, args)
            if (!timeout) {
                context = args = null
            }
        }
        return function(handle, data) {
            var now = Date.now()
            // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
            if (!previous && options.leading === false) {
                previous = now
            }
            // 延迟执行时间间隔
            var remaining = wait - (now - previous)
            context = this
            args = args ? [handle, Object.assign(args[1], data)] : [handle, data]
            // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
            // remaining大于时间窗口wait，表示客户端系统时间被调整过
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout)
                timeout = null
                previous = now
                result = func.apply(context, args)
                if (!timeout) {
                    context = args = null
                }
                // 如果延迟执行不存在，且没有设定结尾边界不执行选项
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }
            return result
        }
    }

    // 优化频繁的 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
    var throttleSetData = throttle(function(handle, data) {
        handle && handle(data)
    }, 50)

    function getPage(vm) {
        var rootVueVM = vm.$root
        var ref = rootVueVM.$mp || {}
        var mpType = ref.mpType
        if (mpType === void 0) mpType = ""
        var page = ref.page

        // 优化后台态页面进行 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
        if (mpType === "app" || !page || typeof page.setData !== "function") {
            return
        }
        return page
    }

    // 优化每次 setData 都传递大量新数据
    function updateDataToMP() {
        var page = getPage(this)
        if (!page) {
            return
        }

        var data = JSON.parse(JSON.stringify(formatVmData(this)))
        //fixed by xxxxxx
        throttleSetData(page.setData.bind(page), diff(data, page.data))
    }

    function initDataToMP() {
        var page = getPage(this)
        if (!page) {
            return
        }

        var data = collectVmData(this.$root)
        //fixed by xxxxxx
        page.setData(JSON.parse(JSON.stringify(data)))
    }

    function getVM(vm, comkeys) {
        if (comkeys === void 0) comkeys = []

        var keys = comkeys.slice(1)
        if (!keys.length) {
            return vm
        }

        return keys.reduce(function(res, key) {
            var len = res.$children.length
            for (var i = 0; i < len; i++) {
                var v = res.$children[i]
                var k = getComKey(v)
                if (k === key) {
                    res = v
                    return res
                }
            }
            return res
        }, vm)
    }

    function getHandle(vnode, eventid, eventTypes) {
        if (eventTypes === void 0) eventTypes = []

        var res = []
        if (!vnode || !vnode.tag) {
            return res
        }

        var ref = vnode || {}
        var data = ref.data
        if (data === void 0) data = {}
        var children = ref.children
        if (children === void 0) children = []
        var componentInstance = ref.componentInstance
        if (componentInstance) {
            // 增加 slot 情况的处理
            // Object.values 会多增加几行编译后的代码
            Object.keys(componentInstance.$slots).forEach(function(slotKey) {
                var slot = componentInstance.$slots[slotKey]
                var slots = Array.isArray(slot) ? slot : [slot]
                slots.forEach(function(node) {
                    res = res.concat(getHandle(node, eventid, eventTypes))
                })
            })
        } else {
            // 避免遍历超出当前组件的 vm
            children.forEach(function(node) {
                res = res.concat(getHandle(node, eventid, eventTypes))
            })
        }

        var attrs = data.attrs
        var on = data.on
        if (attrs && on && attrs["eventid"] === eventid) {
            eventTypes.forEach(function(et) {
                var h = on[et]
                if (typeof h === "function") {
                    res.push(h)
                } else if (Array.isArray(h)) {
                    res = res.concat(h)
                }
            })
            return res
        }

        return res
    }

    function getWebEventByMP(e) {
        var type = e.type
        var timeStamp = e.timeStamp
        var touches = e.touches
        var detail = e.detail
        if (detail === void 0) detail = {}
        var target = e.target
        if (target === void 0) target = {}
        var currentTarget = e.currentTarget
        if (currentTarget === void 0) currentTarget = {}
        var x = detail.x
        var y = detail.y
        var event = {
            mp: e,
            type: type,
            timeStamp: timeStamp,
            x: x,
            y: y,
            target: Object.assign({}, target, detail),
            detail: detail, //fixed by xxxxxx
            currentTarget: currentTarget,
            stopPropagation: noop,
            preventDefault: noop
        }

        if (touches && touches.length) {
            Object.assign(event, touches[0])
            event.touches = touches
        }
        return event
    }

    function handleProxyWithVue(e) {
        var rootVueVM = this.$root
        var type = e.type
        var target = e.target
        if (target === void 0) target = {}
        var currentTarget = e.currentTarget
        var ref = currentTarget || target
        var dataset = ref.dataset
        if (dataset === void 0) dataset = {}
        var comkey = dataset.comkey
        if (comkey === void 0) comkey = ""
        var eventid = dataset.eventid
        var vm = getVM(rootVueVM, comkey.split(","))

        if (!vm) {
            return
        }

        var webEventTypes = eventTypeMap[type] || [type]
        var handles = getHandle(vm._vnode, eventid, webEventTypes)

        // TODO, enevt 还需要处理更多
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Event
        if (handles.length) {
            var event = getWebEventByMP(e)
            if (handles.length === 1) {
                var result = handles[0](event)
                return result
            }
            handles.forEach(function(h) {
                return h(event)
            })
        }
    }

    // for platforms
    // import config from 'core/config'
    // install platform specific utils
    Vue$3.config.mustUseProp = mustUseProp
    Vue$3.config.isReservedTag = isReservedTag
    Vue$3.config.isReservedAttr = isReservedAttr
    Vue$3.config.getTagNamespace = getTagNamespace
    Vue$3.config.isUnknownElement = isUnknownElement

    // install platform patch function
    Vue$3.prototype.__patch__ = patch

    // public mount method
    Vue$3.prototype.$mount = function(el, hydrating) {
        var this$1 = this

        // el = el && inBrowser ? query(el) : undefined
        // return mountComponent(this, el, hydrating)

        // 初始化小程序生命周期相关
        var options = this.$options

        if (options && (options.render || options.mpType)) {
            var mpType = options.mpType
            if (mpType === void 0) mpType = "page"
            return this._initMP(mpType, function() {
                return mountComponent(this$1, undefined, undefined)
            })
        } else {
            return mountComponent(this, undefined, undefined)
        }
    }

    // for mp
    Vue$3.prototype._initMP = initMP

    Vue$3.prototype.$updateDataToMP = updateDataToMP
    Vue$3.prototype._initDataToMP = initDataToMP

    Vue$3.prototype.$handleProxyWithVue = handleProxyWithVue

    /*  */

    return Vue$3
})

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!***************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/pages.json ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/libs/strophe.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__module;var __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__module;var __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__module;var __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_3__module;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_5__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_6__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_7__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; /** File: strophe.js
               *  A JavaScript library for writing XMPP clients.
               *
               *  This library uses either Bidirectional-streams Over Synchronous HTTP (BOSH)
               *  to emulate a persistent, stateful, two-way connection to an XMPP server or
               *  alternatively WebSockets.
               *
               *  More information on BOSH can be found in XEP 124.
               *  For more information on XMPP-over WebSocket see this RFC:
               *  http://tools.ietf.org/html/rfc7395
               */

/* All of the Strophe globals are defined in this special function below so
                   * that references to the globals become closures.  This will ensure that
                   * on page reload, these references will still be available to callbacks
                   * that are still executing.
                   */
// //console.log(window,document)

var isSocketConnnected = false;
var xmldom = __webpack_require__(/*! ./xmldom/dom-parser */ 9);
// //console.log('xml', xmldom, typeof xmldom.DOMParser);
var DOMParser = xmldom.DOMParser;
//console.log('DOMParser inited');
var document = new DOMParser().parseFromString("<?xml version='1.0'?>\n", 'text/xml');
//console.log('document inited');
var window = window || {};
window.DOMParser = DOMParser;

//console.log('strophe ...')
var Strophe = null;
var $build = null;
var $msg = null;
var $iq = null;
var $pres = null;
/* jshint ignore:start */
(function (callback) {
  /* jshint ignore:end */

  // This code was written by Tyler Akins and has been placed in the
  // public domain.  It would be nice if you left this header intact.
  // Base64 code from Tyler Akins -- http://rumkin.com
  //module.exports = callback();

  (function (root, factory) {
    //console.log(typeof define, define.amd, root)
    if (true) {
      !(__WEBPACK_LOCAL_MODULE_0__module = { id: "strophe-base64", exports: {}, loaded: false }, __WEBPACK_LOCAL_MODULE_0__ = function () {
        return factory();
      }.call(__WEBPACK_LOCAL_MODULE_0__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_0__module.exports, __WEBPACK_LOCAL_MODULE_0__module), __WEBPACK_LOCAL_MODULE_0__module.loaded = true, __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__module.exports));
    } else
    {}
  })(this, function () {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var obj = {
      /**
                 * Encodes a string in base64
                 * @param {String} input The string to encode in base64.
                 */
      encode: function encode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc2 = (chr1 & 3) << 4;
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
          keyStr.charAt(enc3) + keyStr.charAt(enc4);
        } while (i < input.length);

        return output;
      },

      /**
          * Decodes a base64 string.
          * @param {String} input The string to decode.
          */
      decode: function decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));

          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        } while (i < input.length);

        return output;
      } };

    return obj;
  });
  /*
       * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
       * in FIPS PUB 180-1
       * Version 2.1a Copyright Paul Johnston 2000 - 2002.
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       * Distributed under the BSD License
       * See http://pajhome.org.uk/crypt/md5 for details.
       */

  /* jshint undef: true, unused: true:, noarg: true, latedef: false */
  /* global define */

  /* Some functions and variables have been stripped for use with Strophe */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_LOCAL_MODULE_1__module = { id: "strophe-sha1", exports: {}, loaded: false }, __WEBPACK_LOCAL_MODULE_1__ = function () {
        return factory();
      }.call(__WEBPACK_LOCAL_MODULE_1__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_1__module.exports, __WEBPACK_LOCAL_MODULE_1__module), __WEBPACK_LOCAL_MODULE_1__module.loaded = true, __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__module.exports));
    } else {}
  })(this, function () {

    /*
                         * Calculate the SHA-1 of an array of big-endian words, and a bit length
                         */
    function core_sha1(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << 24 - len % 32;
      x[(len + 64 >> 9 << 4) + 15] = len;

      var w = new Array(80);
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      var e = -1009589776;

      var i, j, t, olda, oldb, oldc, oldd, olde;
      for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        olde = e;

        for (j = 0; j < 80; j++) {
          if (j < 16) {
            w[j] = x[i + j];
          } else
          {
            w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
          }
          t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
          safe_add(safe_add(e, w[j]), sha1_kt(j)));
          e = d;
          d = c;
          c = rol(b, 30);
          b = a;
          a = t;
        }

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
      }
      return [a, b, c, d, e];
    }

    /*
       * Perform the appropriate triplet combination function for the current
       * iteration
       */
    function sha1_ft(t, b, c, d) {
      if (t < 20) {
        return b & c | ~b & d;
      }
      if (t < 40) {
        return b ^ c ^ d;
      }
      if (t < 60) {
        return b & c | b & d | c & d;
      }
      return b ^ c ^ d;
    }

    /*
       * Determine the appropriate additive constant for the current iteration
       */
    function sha1_kt(t) {
      return t < 20 ? 1518500249 : t < 40 ? 1859775393 :
      t < 60 ? -1894007588 : -899497514;
    }

    /*
       * Calculate the HMAC-SHA1 of a key and some data
       */
    function core_hmac_sha1(key, data) {
      var bkey = str2binb(key);
      if (bkey.length > 16) {
        bkey = core_sha1(bkey, key.length * 8);
      }

      var ipad = new Array(16),opad = new Array(16);
      for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }

      var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * 8);
      return core_sha1(opad.concat(hash), 512 + 160);
    }

    /*
       * Add integers, wrapping at 2^32. This uses 16-bit operations internally
       * to work around bugs in some JS interpreters.
       */
    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    }

    /*
       * Bitwise rotate a 32-bit number to the left.
       */
    function rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }

    /*
       * Convert an 8-bit or 16-bit string to an array of big-endian words
       * In 8-bit function, characters >255 have their hi-byte silently ignored.
       */
    function str2binb(str) {
      var bin = [];
      var mask = 255;
      for (var i = 0; i < str.length * 8; i += 8) {
        bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << 24 - i % 32;
      }
      return bin;
    }

    /*
       * Convert an array of big-endian words to a string
       */
    function binb2str(bin) {
      var str = "";
      var mask = 255;
      for (var i = 0; i < bin.length * 32; i += 8) {
        str += String.fromCharCode(bin[i >> 5] >>> 24 - i % 32 & mask);
      }
      return str;
    }

    /*
       * Convert an array of big-endian words to a base-64 string
       */
    function binb2b64(binarray) {
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var str = "";
      var triplet, j;
      for (var i = 0; i < binarray.length * 4; i += 3) {
        triplet = (binarray[i >> 2] >> 8 * (3 - i % 4) & 0xFF) << 16 |
        (binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 0xFF) << 8 |
        binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 0xFF;
        for (j = 0; j < 4; j++) {
          if (i * 8 + j * 6 > binarray.length * 32) {
            str += "=";
          } else
          {
            str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
          }
        }
      }
      return str;
    }

    /*
       * These are the functions you'll usually want to call
       * They take string arguments and return either hex or base-64 encoded strings
       */
    return {
      b64_hmac_sha1: function b64_hmac_sha1(key, data) {
        return binb2b64(core_hmac_sha1(key, data));
      },
      b64_sha1: function b64_sha1(s) {
        return binb2b64(core_sha1(str2binb(s), s.length * 8));
      },
      binb2str: binb2str,
      core_hmac_sha1: core_hmac_sha1,
      str_hmac_sha1: function str_hmac_sha1(key, data) {
        return binb2str(core_hmac_sha1(key, data));
      },
      str_sha1: function str_sha1(s) {
        return binb2str(core_sha1(str2binb(s), s.length * 8));
      } };

  });

  /*
       * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
       * Digest Algorithm, as defined in RFC 1321.
       * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       * Distributed under the BSD License
       * See http://pajhome.org.uk/crypt/md5 for more info.
       */

  /*
           * Everything that isn't used by Strophe has been stripped here!
           */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_LOCAL_MODULE_2__module = { id: "strophe-md5", exports: {}, loaded: false }, __WEBPACK_LOCAL_MODULE_2__ = function () {
        return factory();
      }.call(__WEBPACK_LOCAL_MODULE_2__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_2__module.exports, __WEBPACK_LOCAL_MODULE_2__module), __WEBPACK_LOCAL_MODULE_2__module.loaded = true, __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__module.exports));
    } else {}
  })(this, function (b) {
    /*
                          * Add integers, wrapping at 2^32. This uses 16-bit operations internally
                          * to work around bugs in some JS interpreters.
                          */
    var safe_add = function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    };

    /*
        * Bitwise rotate a 32-bit number to the left.
        */
    var bit_rol = function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    };

    /*
        * Convert a string to an array of little-endian words
        */
    var str2binl = function str2binl(str) {
      var bin = [];
      for (var i = 0; i < str.length * 8; i += 8) {
        bin[i >> 5] |= (str.charCodeAt(i / 8) & 255) << i % 32;
      }
      return bin;
    };

    /*
        * Convert an array of little-endian words to a string
        */
    var binl2str = function binl2str(bin) {
      var str = "";
      for (var i = 0; i < bin.length * 32; i += 8) {
        str += String.fromCharCode(bin[i >> 5] >>> i % 32 & 255);
      }
      return str;
    };

    /*
        * Convert an array of little-endian words to a hex string.
        */
    var binl2hex = function binl2hex(binarray) {
      var hex_tab = "0123456789abcdef";
      var str = "";
      for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) +
        hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
      }
      return str;
    };

    /*
        * These functions implement the four basic operations the algorithm uses.
        */
    var md5_cmn = function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    };

    var md5_ff = function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    };

    var md5_gg = function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    };

    var md5_hh = function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };

    var md5_ii = function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    };

    /*
        * Calculate the MD5 of an array of little-endian words, and a bit length
        */
    var core_md5 = function core_md5(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << len % 32;
      x[(len + 64 >>> 9 << 4) + 14] = len;

      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;

      var olda, oldb, oldc, oldd;
      for (var i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return [a, b, c, d];
    };

    var obj = {
      /*
                 * These are the functions you'll usually want to call.
                 * They take string arguments and return either hex or base-64 encoded
                 * strings.
                 */
      hexdigest: function hexdigest(s) {
        return binl2hex(core_md5(str2binl(s), s.length * 8));
      },

      hash: function hash(s) {
        return binl2str(core_md5(str2binl(s), s.length * 8));
      } };

    return obj;
  });

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_LOCAL_MODULE_3__module = { id: "strophe-utils", exports: {}, loaded: false }, __WEBPACK_LOCAL_MODULE_3__ = function () {
        return factory();
      }.call(__WEBPACK_LOCAL_MODULE_3__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_3__module.exports, __WEBPACK_LOCAL_MODULE_3__module), __WEBPACK_LOCAL_MODULE_3__module.loaded = true, __WEBPACK_LOCAL_MODULE_3__ === undefined && (__WEBPACK_LOCAL_MODULE_3__ = __WEBPACK_LOCAL_MODULE_3__module.exports));
    } else {}
  })(this, function () {

    var utils = {

      utf16to8: function utf16to8(str) {
        var i, c;
        var out = "";
        var len = str.length;
        for (i = 0; i < len; i++) {
          c = str.charCodeAt(i);
          if (c >= 0x0000 && c <= 0x007F) {
            out += str.charAt(i);
          } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
            out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
          } else {
            out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
          }
        }
        return out;
      },

      addCookies: function addCookies(cookies) {
        /* Parameters:
                                                 *  (Object) cookies - either a map of cookie names
                                                 *    to string values or to maps of cookie values.
                                                 *
                                                 * For example:
                                                 * { "myCookie": "1234" }
                                                 *
                                                 * or:
                                                 * { "myCookie": {
                                                 *      "value": "1234",
                                                 *      "domain": ".example.org",
                                                 *      "path": "/",
                                                 *      "expires": expirationDate
                                                 *      }
                                                 *  }
                                                 *
                                                 *  These values get passed to Strophe.Connection via
                                                 *   options.cookies
                                                 */
        var cookieName, cookieObj, isObj, cookieValue, expires, domain, path;
        for (cookieName in cookies || {}) {
          expires = '';
          domain = '';
          path = '';
          cookieObj = cookies[cookieName];
          isObj = typeof cookieObj == "object";
          cookieValue = escape(unescape(isObj ? cookieObj.value : cookieObj));
          if (isObj) {
            expires = cookieObj.expires ? ";expires=" + cookieObj.expires : '';
            domain = cookieObj.domain ? ";domain=" + cookieObj.domain : '';
            path = cookieObj.path ? ";path=" + cookieObj.path : '';
          }
          document.cookie =
          cookieName + '=' + cookieValue + expires + domain + path;
        }
      } };

    return utils;
  });

  /*
       This program is distributed under the terms of the MIT license.
       Please see the LICENSE file for details.
      	 Copyright 2006-2008, OGG, LLC
       */


  /* jshint undef: true, unused: true:, noarg: true, latedef: true */
  /* global define */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_LOCAL_MODULE_4__ = ((function () {
        return factory();
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
    } else {}
  })(this, function () {

    /** Function: Function.prototype.bind
                         *  Bind a function to an instance.
                         *
                         *  This Function object extension method creates a bound method similar
                         *  to those in Python.  This means that the 'this' object will point
                         *  to the instance you want.  See
                         *  <a href='https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind'>MDC's bind() documentation</a> and
                         *  <a href='http://benjamin.smedbergs.us/blog/2007-01-03/bound-functions-and-function-imports-in-javascript/'>Bound Functions and Function Imports in JavaScript</a>
                         *  for a complete explanation.
                         *
                         *  This extension already exists in some browsers (namely, Firefox 3), but
                         *  we provide it to support those that don't.
                         *
                         *  Parameters:
                         *    (Object) obj - The object that will become 'this' in the bound function.
                         *    (Object) argN - An option argument that will be prepended to the
                         *      arguments given for the function call
                         *
                         *  Returns:
                         *    The bound function.
                         */
    if (!Function.prototype.bind) {
      Function.prototype.bind = function (obj /*, arg1, arg2, ... */) {
        var func = this;
        var _slice = Array.prototype.slice;
        var _concat = Array.prototype.concat;
        var _args = _slice.call(arguments, 1);
        return function () {
          return func.apply(obj ? obj : this, _concat.call(_args, _slice.call(arguments, 0)));
        };
      };
    }

    /** Function: Array.isArray
       *  This is a polyfill for the ES5 Array.isArray method.
       */
    if (!Array.isArray) {
      Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };
    }

    /** Function: Array.prototype.indexOf
       *  Return the index of an object in an array.
       *
       *  This function is not supplied by some JavaScript implementations, so
       *  we provide it if it is missing.  This code is from:
       *  http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Objects:Array:indexOf
       *
       *  Parameters:
       *    (Object) elt - The object to look for.
       *    (Integer) from - The index from which to start looking. (optional).
       *
       *  Returns:
       *    The index of elt in the array or -1 if not found.
       */
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length;
        var from = Number(arguments[1]) || 0;
        from = from < 0 ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
          from += len;
        }

        for (; from < len; from++) {
          if (from in this && this[from] === elt) {
            return from;
          }
        }
        return -1;
      };
    }
  });


  /** Function: Array.prototype.forEach
       *
       *  This function is not available in IE < 9
       *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
       */
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
      var T, k;
      if (this === null) {
        throw new TypeError(' this is null or not defined');
      }

      // 1. Let O be the result of calling toObject() passing the
      // |this| value as the argument.
      var O = Object(this);
      // 2. Let lenValue be the result of calling the Get() internal
      // method of O with the argument "length".
      // 3. Let len be toUint32(lenValue).
      var len = O.length >>> 0;
      // 4. If isCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
      }
      // 5. If thisArg was supplied, let T be thisArg; else let
      // T be undefined.
      if (arguments.length > 1) {
        T = thisArg;
      }
      // 6. Let k be 0
      k = 0;
      // 7. Repeat, while k < len
      while (k < len) {
        var kValue;
        // a. Let Pk be ToString(k).
        //        This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty
        //        internal method of O with argument Pk.
        //        This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
          // i. Let kValue be the result of calling the Get internal
          // method of O with argument Pk.
          kValue = O[k];
          // ii. Call the Call internal method of callback with T as
          // the this value and argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
      }
      // 8. return undefined
    };
  }

  /*
     This program is distributed under the terms of the MIT license.
     Please see the LICENSE file for details.
    	 Copyright 2006-2008, OGG, LLC
     */


  /* jshint undef: true, unused: true:, noarg: true, latedef: true */
  /*global define, document, window, setTimeout, clearTimeout, ActiveXObject, DOMParser */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __WEBPACK_LOCAL_MODULE_1__,
      __WEBPACK_LOCAL_MODULE_0__,
      __WEBPACK_LOCAL_MODULE_2__,
      __WEBPACK_LOCAL_MODULE_3__,
      __WEBPACK_LOCAL_MODULE_4__], __WEBPACK_LOCAL_MODULE_5__ = ((function () {
        return factory.apply(this, arguments);
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
    } else { var o; }
  })(this, function (SHA1, Base64, MD5, utils, Strophe) {

    var Strophe;

    /** Function: $build
                  *  Create a Strophe.Builder.
                  *  This is an alias for 'new Strophe.Builder(name, attrs)'.
                  *
                  *  Parameters:
                  *    (String) name - The root element name.
                  *    (Object) attrs - The attributes for the root element in object notation.
                  *
                  *  Returns:
                  *    A new Strophe.Builder object.
                  */
    function $build(name, attrs) {
      return new Strophe.Builder(name, attrs);
    }

    /** Function: $msg
       *  Create a Strophe.Builder with a <message/> element as the root.
       *
       *  Parameters:
       *    (Object) attrs - The <message/> element attributes in object notation.
       *
       *  Returns:
       *    A new Strophe.Builder object.
       */
    function $msg(attrs) {
      return new Strophe.Builder("message", attrs);
    }

    /** Function: $iq
       *  Create a Strophe.Builder with an <iq/> element as the root.
       *
       *  Parameters:
       *    (Object) attrs - The <iq/> element attributes in object notation.
       *
       *  Returns:
       *    A new Strophe.Builder object.
       */
    function $iq(attrs) {
      return new Strophe.Builder("iq", attrs);
    }

    /** Function: $pres
       *  Create a Strophe.Builder with a <presence/> element as the root.
       *
       *  Parameters:
       *    (Object) attrs - The <presence/> element attributes in object notation.
       *
       *  Returns:
       *    A new Strophe.Builder object.
       */
    function $pres(attrs) {
      return new Strophe.Builder("presence", attrs);
    }

    /** Class: Strophe
       *  An object container for all Strophe library functions.
       *
       *  This class is just a container for all the objects and constants
       *  used in the library.  It is not meant to be instantiated, but to
       *  provide a namespace for library objects, constants, and functions.
       */
    Strophe = {
      /** Constant: VERSION
                 *  The version of the Strophe library. Unreleased builds will have
                 *  a version of head-HASH where HASH is a partial revision.
                 */
      VERSION: "1.2.9",

      /** Constants: XMPP Namespace Constants
                         *  Common namespace constants from the XMPP RFCs and XEPs.
                         *
                         *  NS.HTTPBIND - HTTP BIND namespace from XEP 124.
                         *  NS.BOSH - BOSH namespace from XEP 206.
                         *  NS.CLIENT - Main XMPP client namespace.
                         *  NS.AUTH - Legacy authentication namespace.
                         *  NS.ROSTER - Roster operations namespace.
                         *  NS.PROFILE - Profile namespace.
                         *  NS.DISCO_INFO - Service discovery info namespace from XEP 30.
                         *  NS.DISCO_ITEMS - Service discovery items namespace from XEP 30.
                         *  NS.MUC - Multi-User Chat namespace from XEP 45.
                         *  NS.SASL - XMPP SASL namespace from RFC 3920.
                         *  NS.STREAM - XMPP Streams namespace from RFC 3920.
                         *  NS.BIND - XMPP Binding namespace from RFC 3920.
                         *  NS.SESSION - XMPP Session namespace from RFC 3920.
                         *  NS.XHTML_IM - XHTML-IM namespace from XEP 71.
                         *  NS.XHTML - XHTML body namespace from XEP 71.
                         */
      NS: {
        HTTPBIND: "http://jabber.org/protocol/httpbind",
        BOSH: "urn:xmpp:xbosh",
        CLIENT: "jabber:client",
        AUTH: "jabber:iq:auth",
        ROSTER: "jabber:iq:roster",
        PROFILE: "jabber:iq:profile",
        DISCO_INFO: "http://jabber.org/protocol/disco#info",
        DISCO_ITEMS: "http://jabber.org/protocol/disco#items",
        MUC: "http://jabber.org/protocol/muc",
        SASL: "urn:ietf:params:xml:ns:xmpp-sasl",
        STREAM: "http://etherx.jabber.org/streams",
        FRAMING: "urn:ietf:params:xml:ns:xmpp-framing",
        BIND: "urn:ietf:params:xml:ns:xmpp-bind",
        SESSION: "urn:ietf:params:xml:ns:xmpp-session",
        VERSION: "jabber:iq:version",
        STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas",
        XHTML_IM: "http://jabber.org/protocol/xhtml-im",
        XHTML: "http://www.w3.org/1999/xhtml" },


      /** Constants: XHTML_IM Namespace
                                                  *  contains allowed tags, tag attributes, and css properties.
                                                  *  Used in the createHtml function to filter incoming html into the allowed XHTML-IM subset.
                                                  *  See http://xmpp.org/extensions/xep-0071.html#profile-summary for the list of recommended
                                                  *  allowed tags and their attributes.
                                                  */
      XHTML: {
        tags: ['a', 'blockquote', 'br', 'cite', 'em', 'img', 'li', 'ol', 'p', 'span', 'strong', 'ul', 'body'],
        attributes: {
          'a': ['href'],
          'blockquote': ['style'],
          'br': [],
          'cite': ['style'],
          'em': [],
          'img': ['src', 'alt', 'style', 'height', 'width'],
          'li': ['style'],
          'ol': ['style'],
          'p': ['style'],
          'span': ['style'],
          'strong': [],
          'ul': ['style'],
          'body': [] },

        css: ['background-color', 'color', 'font-family', 'font-size', 'font-style', 'font-weight', 'margin-left', 'margin-right', 'text-align', 'text-decoration'],
        /** Function: XHTML.validTag
                                                                                                                                                                      *
                                                                                                                                                                      * Utility method to determine whether a tag is allowed
                                                                                                                                                                      * in the XHTML_IM namespace.
                                                                                                                                                                      *
                                                                                                                                                                      * XHTML tag names are case sensitive and must be lower case.
                                                                                                                                                                      */
        validTag: function validTag(tag) {
          for (var i = 0; i < Strophe.XHTML.tags.length; i++) {
            if (tag == Strophe.XHTML.tags[i]) {
              return true;
            }
          }
          return false;
        },
        /** Function: XHTML.validAttribute
            *
            * Utility method to determine whether an attribute is allowed
            * as recommended per XEP-0071
            *
            * XHTML attribute names are case sensitive and must be lower case.
            */
        validAttribute: function validAttribute(tag, attribute) {
          if (typeof Strophe.XHTML.attributes[tag] !== 'undefined' && Strophe.XHTML.attributes[tag].length > 0) {
            for (var i = 0; i < Strophe.XHTML.attributes[tag].length; i++) {
              if (attribute == Strophe.XHTML.attributes[tag][i]) {
                return true;
              }
            }
          }
          return false;
        },
        validCSS: function validCSS(style) {
          for (var i = 0; i < Strophe.XHTML.css.length; i++) {
            if (style == Strophe.XHTML.css[i]) {
              return true;
            }
          }
          return false;
        } },


      /** Constants: Connection Status Constants
              *  Connection status constants for use by the connection handler
              *  callback.
              *
              *  Status.ERROR - An error has occurred
              *  Status.CONNECTING - The connection is currently being made
              *  Status.CONNFAIL - The connection attempt failed
              *  Status.AUTHENTICATING - The connection is authenticating
              *  Status.AUTHFAIL - The authentication attempt failed
              *  Status.CONNECTED - The connection has succeeded
              *  Status.DISCONNECTED - The connection has been terminated
              *  Status.DISCONNECTING - The connection is currently being terminated
              *  Status.ATTACHED - The connection has been attached
              *  Status.CONNTIMEOUT - The connection has timed out
              */
      Status: {
        ERROR: 0,
        CONNECTING: 1,
        CONNFAIL: 2,
        AUTHENTICATING: 3,
        AUTHFAIL: 4,
        CONNECTED: 5,
        DISCONNECTED: 6,
        DISCONNECTING: 7,
        ATTACHED: 8,
        REDIRECT: 9,
        CONNTIMEOUT: 10 },


      /** Constants: Log Level Constants
                            *  Logging level indicators.
                            *
                            *  LogLevel.DEBUG - Debug output
                            *  LogLevel.INFO - Informational output
                            *  LogLevel.WARN - Warnings
                            *  LogLevel.ERROR - Errors
                            *  LogLevel.FATAL - Fatal errors
                            */
      LogLevel: {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        FATAL: 4 },


      /** PrivateConstants: DOM Element Type Constants
                     *  DOM element types.
                     *
                     *  ElementType.NORMAL - Normal element.
                     *  ElementType.TEXT - Text data element.
                     *  ElementType.FRAGMENT - XHTML fragment element.
                     */
      ElementType: {
        NORMAL: 1,
        TEXT: 3,
        CDATA: 4,
        FRAGMENT: 11 },


      /** PrivateConstants: Timeout Values
                         *  Timeout values for error states.  These values are in seconds.
                         *  These should not be changed unless you know exactly what you are
                         *  doing.
                         *
                         *  TIMEOUT - Timeout multiplier. A waiting request will be considered
                         *      failed after Math.floor(TIMEOUT * wait) seconds have elapsed.
                         *      This defaults to 1.1, and with default wait, 66 seconds.
                         *  SECONDARY_TIMEOUT - Secondary timeout multiplier. In cases where
                         *      Strophe can detect early failure, it will consider the request
                         *      failed if it doesn't return after
                         *      Math.floor(SECONDARY_TIMEOUT * wait) seconds have elapsed.
                         *      This defaults to 0.1, and with default wait, 6 seconds.
                         */
      TIMEOUT: 1.1,
      SECONDARY_TIMEOUT: 0.1,

      /** Function: addNamespace
                               *  This function is used to extend the current namespaces in
                               *  Strophe.NS.  It takes a key and a value with the key being the
                               *  name of the new namespace, with its actual value.
                               *  For example:
                               *  Strophe.addNamespace('PUBSUB', "http://jabber.org/protocol/pubsub");
                               *
                               *  Parameters:
                               *    (String) name - The name under which the namespace will be
                               *      referenced under Strophe.NS
                               *    (String) value - The actual namespace.
                               */
      addNamespace: function addNamespace(name, value) {
        Strophe.NS[name] = value;
      },

      /** Function: forEachChild
          *  Map a function over some or all child elements of a given element.
          *
          *  This is a small convenience function for mapping a function over
          *  some or all of the children of an element.  If elemName is null, all
          *  children will be passed to the function, otherwise only children
          *  whose tag names match elemName will be passed.
          *
          *  Parameters:
          *    (XMLElement) elem - The element to operate on.
          *    (String) elemName - The child element tag name filter.
          *    (Function) func - The function to apply to each child.  This
          *      function should take a single argument, a DOM element.
          */
      forEachChild: function forEachChild(elem, elemName, func) {
        var i, childNode;
        for (i = 0; i < elem.childNodes.length; i++) {
          childNode = elem.childNodes[i];
          if (childNode.nodeType == Strophe.ElementType.NORMAL && (
          !elemName || this.isTagEqual(childNode, elemName))) {
            func(childNode);
          }
        }
      },

      /** Function: isTagEqual
          *  Compare an element's tag name with a string.
          *
          *  This function is case sensitive.
          *
          *  Parameters:
          *    (XMLElement) el - A DOM element.
          *    (String) name - The element name.
          *
          *  Returns:
          *    true if the element's tag name matches _el_, and false
          *    otherwise.
          */
      isTagEqual: function isTagEqual(el, name) {
        return el.tagName == name;
      },

      /** PrivateVariable: _xmlGenerator
          *  _Private_ variable that caches a DOM document to
          *  generate elements.
          */
      _xmlGenerator: null,

      /** PrivateFunction: _makeGenerator
                            *  _Private_ function that creates a dummy XML DOM document to serve as
                            *  an element and text node generator.
                            */
      _makeGenerator: function _makeGenerator() {
        var doc;
        // IE9 does implement createDocument(); however, using it will cause the browser to leak memory on page unload.
        // Here, we test for presence of createDocument() plus IE's proprietary documentMode attribute, which would be
        // less than 10 in the case of IE9 and below.
        if (document.implementation.createDocument === undefined ||
        document.implementation.createDocument && document.documentMode && document.documentMode < 10) {
          doc = this._getIEXmlDom();
          doc.appendChild(doc.createElement('strophe'));
        } else {
          doc = document.implementation.
          createDocument('jabber:client', 'strophe', null);
        }
        return doc;
      },

      /** Function: xmlGenerator
          *  Get the DOM document to generate elements.
          *
          *  Returns:
          *    The currently used DOM document.
          */
      xmlGenerator: function xmlGenerator() {
        if (!Strophe._xmlGenerator) {
          Strophe._xmlGenerator = Strophe._makeGenerator();
        }
        return Strophe._xmlGenerator;
      },

      /** PrivateFunction: _getIEXmlDom
          *  Gets IE xml doc object
          *
          *  Returns:
          *    A Microsoft XML DOM Object
          *  See Also:
          *    http://msdn.microsoft.com/en-us/library/ms757837%28VS.85%29.aspx
          */
      _getIEXmlDom: function _getIEXmlDom() {
        var doc = null;
        var docStrings = [
        "Msxml2.DOMDocument.6.0",
        "Msxml2.DOMDocument.5.0",
        "Msxml2.DOMDocument.4.0",
        "MSXML2.DOMDocument.3.0",
        "MSXML2.DOMDocument",
        "MSXML.DOMDocument",
        "Microsoft.XMLDOM"];


        for (var d = 0; d < docStrings.length; d++) {
          if (doc === null) {
            try {
              doc = new ActiveXObject(docStrings[d]);
            } catch (e) {
              doc = null;
            }
          } else {
            break;
          }
        }
        return doc;
      },

      /** Function: xmlElement
          *  Create an XML DOM element.
          *
          *  This function creates an XML DOM element correctly across all
          *  implementations. Note that these are not HTML DOM elements, which
          *  aren't appropriate for XMPP stanzas.
          *
          *  Parameters:
          *    (String) name - The name for the element.
          *    (Array|Object) attrs - An optional array or object containing
          *      key/value pairs to use as element attributes. The object should
          *      be in the format {'key': 'value'} or {key: 'value'}. The array
          *      should have the format [['key1', 'value1'], ['key2', 'value2']].
          *    (String) text - The text child data for the element.
          *
          *  Returns:
          *    A new XML DOM element.
          */
      xmlElement: function xmlElement(name) {
        if (!name) {
          return null;
        }

        var node = Strophe.xmlGenerator().createElement(name);
        // FIXME: this should throw errors if args are the wrong type or
        // there are more than two optional args
        var a, i, k;
        for (a = 1; a < arguments.length; a++) {
          var arg = arguments[a];
          if (!arg) {
            continue;
          }
          if (typeof arg == "string" ||
          typeof arg == "number") {
            node.appendChild(Strophe.xmlTextNode(arg));
          } else if (typeof arg == "object" &&
          typeof arg.sort == "function") {
            for (i = 0; i < arg.length; i++) {
              var attr = arg[i];
              if (typeof attr == "object" &&
              typeof attr.sort == "function" &&
              attr[1] !== undefined &&
              attr[1] !== null) {
                node.setAttribute(attr[0], attr[1]);
              }
            }
          } else if (typeof arg == "object") {
            for (k in arg) {
              if (arg.hasOwnProperty(k)) {
                if (arg[k] !== undefined &&
                arg[k] !== null) {
                  node.setAttribute(k, arg[k]);
                }
              }
            }
          }
        }

        return node;
      },

      /*  Function: xmlescape
          *  Excapes invalid xml characters.
          *
          *  Parameters:
          *     (String) text - text to escape.
          *
          *  Returns:
          *      Escaped text.
          */
      xmlescape: function xmlescape(text) {
        text = text.replace(/\&/g, "&amp;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = text.replace(/'/g, "&apos;");
        text = text.replace(/"/g, "&quot;");
        return text;
      },

      /*  Function: xmlunescape
          *  Unexcapes invalid xml characters.
          *
          *  Parameters:
          *     (String) text - text to unescape.
          *
          *  Returns:
          *      Unescaped text.
          */
      xmlunescape: function xmlunescape(text) {
        text = text.replace(/\&amp;/g, "&");
        text = text.replace(/&lt;/g, "<");
        text = text.replace(/&gt;/g, ">");
        text = text.replace(/&apos;/g, "'");
        text = text.replace(/&quot;/g, "\"");
        return text;
      },

      /** Function: xmlTextNode
          *  Creates an XML DOM text node.
          *
          *  Provides a cross implementation version of document.createTextNode.
          *
          *  Parameters:
          *    (String) text - The content of the text node.
          *
          *  Returns:
          *    A new XML DOM text node.
          */
      xmlTextNode: function xmlTextNode(text) {
        return Strophe.xmlGenerator().createTextNode(text);
      },

      /** Function: xmlHtmlNode
          *  Creates an XML DOM html node.
          *
          *  Parameters:
          *    (String) html - The content of the html node.
          *
          *  Returns:
          *    A new XML DOM text node.
          */
      xmlHtmlNode: function xmlHtmlNode(html) {
        var node;
        //ensure text is escaped
        //console.log('xmlhtmlnode init', window.DOMParser, typeof window.DOMParser)
        if (window.DOMParser) {
          var parser = new DOMParser();
          node = parser.parseFromString(html, "text/xml");
        } else {
          node = new ActiveXObject("Microsoft.XMLDOM");
          node.async = "false";
          node.loadXML(html);
        }
        return node;
      },

      /** Function: getText
          *  Get the concatenation of all text children of an element.
          *
          *  Parameters:
          *    (XMLElement) elem - A DOM element.
          *
          *  Returns:
          *    A String with the concatenated text of all text element children.
          */
      getText: function getText(elem) {
        if (!elem) {
          return null;
        }

        var str = "";
        if (elem.childNodes.length === 0 && elem.nodeType ==
        Strophe.ElementType.TEXT) {
          str += elem.nodeValue;
        }

        for (var i = 0; i < elem.childNodes.length; i++) {
          if (elem.childNodes[i].nodeType == Strophe.ElementType.TEXT) {
            str += elem.childNodes[i].nodeValue;
          }
        }

        return Strophe.xmlescape(str);
      },

      /** Function: copyElement
          *  Copy an XML DOM element.
          *
          *  This function copies a DOM element and all its descendants and returns
          *  the new copy.
          *
          *  Parameters:
          *    (XMLElement) elem - A DOM element.
          *
          *  Returns:
          *    A new, copied DOM element tree.
          */
      copyElement: function copyElement(elem) {
        var i, el;
        if (elem.nodeType == Strophe.ElementType.NORMAL) {
          el = Strophe.xmlElement(elem.tagName);

          for (i = 0; i < elem.attributes.length; i++) {
            el.setAttribute(elem.attributes[i].nodeName,
            elem.attributes[i].value);
          }

          for (i = 0; i < elem.childNodes.length; i++) {
            el.appendChild(Strophe.copyElement(elem.childNodes[i]));
          }
        } else if (elem.nodeType == Strophe.ElementType.TEXT) {
          el = Strophe.xmlGenerator().createTextNode(elem.nodeValue);
        }
        return el;
      },


      /** Function: createHtml
          *  Copy an HTML DOM element into an XML DOM.
          *
          *  This function copies a DOM element and all its descendants and returns
          *  the new copy.
          *
          *  Parameters:
          *    (HTMLElement) elem - A DOM element.
          *
          *  Returns:
          *    A new, copied DOM element tree.
          */
      createHtml: function createHtml(elem) {
        var i, el, j, tag, attribute, value, css, cssAttrs, attr, cssName, cssValue;
        if (elem.nodeType == Strophe.ElementType.NORMAL) {
          tag = elem.nodeName.toLowerCase(); // XHTML tags must be lower case.
          if (Strophe.XHTML.validTag(tag)) {
            try {
              el = Strophe.xmlElement(tag);
              for (i = 0; i < Strophe.XHTML.attributes[tag].length; i++) {
                attribute = Strophe.XHTML.attributes[tag][i];
                value = elem.getAttribute(attribute);
                if (typeof value == 'undefined' || value === null || value === '' || value === false || value === 0) {
                  continue;
                }
                if (attribute == 'style' && typeof value == 'object') {
                  if (typeof value.cssText != 'undefined') {
                    value = value.cssText; // we're dealing with IE, need to get CSS out
                  }
                }
                // filter out invalid css styles
                if (attribute == 'style') {
                  css = [];
                  cssAttrs = value.split(';');
                  for (j = 0; j < cssAttrs.length; j++) {
                    attr = cssAttrs[j].split(':');
                    cssName = attr[0].replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase();
                    if (Strophe.XHTML.validCSS(cssName)) {
                      cssValue = attr[1].replace(/^\s*/, "").replace(/\s*$/, "");
                      css.push(cssName + ': ' + cssValue);
                    }
                  }
                  if (css.length > 0) {
                    value = css.join('; ');
                    el.setAttribute(attribute, value);
                  }
                } else {
                  el.setAttribute(attribute, value);
                }
              }

              for (i = 0; i < elem.childNodes.length; i++) {
                el.appendChild(Strophe.createHtml(elem.childNodes[i]));
              }
            } catch (e) {// invalid elements
              el = Strophe.xmlTextNode('');
            }
          } else {
            el = Strophe.xmlGenerator().createDocumentFragment();
            for (i = 0; i < elem.childNodes.length; i++) {
              el.appendChild(Strophe.createHtml(elem.childNodes[i]));
            }
          }
        } else if (elem.nodeType == Strophe.ElementType.FRAGMENT) {
          el = Strophe.xmlGenerator().createDocumentFragment();
          for (i = 0; i < elem.childNodes.length; i++) {
            el.appendChild(Strophe.createHtml(elem.childNodes[i]));
          }
        } else if (elem.nodeType == Strophe.ElementType.TEXT) {
          el = Strophe.xmlTextNode(elem.nodeValue);
        }
        return el;
      },

      /** Function: escapeNode
          *  Escape the node part (also called local part) of a JID.
          *
          *  Parameters:
          *    (String) node - A node (or local part).
          *
          *  Returns:
          *    An escaped node (or local part).
          */
      escapeNode: function escapeNode(node) {
        if (typeof node !== "string") {
          return node;
        }
        return node.replace(/^\s+|\s+$/g, '').
        replace(/\\/g, "\\5c").
        replace(/ /g, "\\20").
        replace(/\"/g, "\\22").
        replace(/\&/g, "\\26").
        replace(/\'/g, "\\27").
        replace(/\//g, "\\2f").
        replace(/:/g, "\\3a").
        replace(/</g, "\\3c").
        replace(/>/g, "\\3e").
        replace(/@/g, "\\40");
      },

      /** Function: unescapeNode
          *  Unescape a node part (also called local part) of a JID.
          *
          *  Parameters:
          *    (String) node - A node (or local part).
          *
          *  Returns:
          *    An unescaped node (or local part).
          */
      unescapeNode: function unescapeNode(node) {
        if (typeof node !== "string") {
          return node;
        }
        return node.replace(/\\20/g, " ").
        replace(/\\22/g, '"').
        replace(/\\26/g, "&").
        replace(/\\27/g, "'").
        replace(/\\2f/g, "/").
        replace(/\\3a/g, ":").
        replace(/\\3c/g, "<").
        replace(/\\3e/g, ">").
        replace(/\\40/g, "@").
        replace(/\\5c/g, "\\");
      },

      /** Function: getNodeFromJid
          *  Get the node portion of a JID String.
          *
          *  Parameters:
          *    (String) jid - A JID.
          *
          *  Returns:
          *    A String containing the node.
          */
      getNodeFromJid: function getNodeFromJid(jid) {
        if (jid.indexOf("@") < 0) {
          return null;
        }
        return jid.split("@")[0];
      },

      /** Function: getDomainFromJid
          *  Get the domain portion of a JID String.
          *
          *  Parameters:
          *    (String) jid - A JID.
          *
          *  Returns:
          *    A String containing the domain.
          */
      getDomainFromJid: function getDomainFromJid(jid) {
        var bare = Strophe.getBareJidFromJid(jid);
        if (bare.indexOf("@") < 0) {
          return bare;
        } else {
          var parts = bare.split("@");
          parts.splice(0, 1);
          return parts.join('@');
        }
      },

      /** Function: getResourceFromJid
          *  Get the resource portion of a JID String.
          *
          *  Parameters:
          *    (String) jid - A JID.
          *
          *  Returns:
          *    A String containing the resource.
          */
      getResourceFromJid: function getResourceFromJid(jid) {
        var s = jid.split("/");
        if (s.length < 2) {
          return null;
        }
        s.splice(0, 1);
        return s.join('/');
      },

      /** Function: getBareJidFromJid
          *  Get the bare JID from a JID String.
          *
          *  Parameters:
          *    (String) jid - A JID.
          *
          *  Returns:
          *    A String containing the bare JID.
          */
      getBareJidFromJid: function getBareJidFromJid(jid) {
        return jid ? jid.split("/")[0] : null;
      },

      /** PrivateFunction: _handleError
          *  _Private_ function that properly logs an error to the console
          */
      _handleError: function _handleError(e) {
        if (typeof e.stack !== "undefined") {
          Strophe.fatal(e.stack);
        }
        if (e.sourceURL) {
          Strophe.fatal("error: " + this.handler + " " + e.sourceURL + ":" +
          e.line + " - " + e.name + ": " + e.message);
        } else if (e.fileName) {
          Strophe.fatal("error: " + this.handler + " " +
          e.fileName + ":" + e.lineNumber + " - " +
          e.name + ": " + e.message);
        } else {
          Strophe.fatal("error: " + e.message);
        }
      },

      /** Function: log
          *  User overrideable logging function.
          *
          *  This function is called whenever the Strophe library calls any
          *  of the logging functions.  The default implementation of this
          *  function does nothing.  If client code wishes to handle the logging
          *  messages, it should override this with
          *  > Strophe.log = function (level, msg) {
         *  >   (user code here)
         *  > };
          *
          *  Please note that data sent and received over the wire is logged
          *  via Strophe.Connection.rawInput() and Strophe.Connection.rawOutput().
          *
          *  The different levels and their meanings are
          *
          *    DEBUG - Messages useful for debugging purposes.
          *    INFO - Informational messages.  This is mostly information like
          *      'disconnect was called' or 'SASL auth succeeded'.
          *    WARN - Warnings about potential problems.  This is mostly used
          *      to report transient connection errors like request timeouts.
          *    ERROR - Some error occurred.
          *    FATAL - A non-recoverable fatal error occurred.
          *
          *  Parameters:
          *    (Integer) level - The log level of the log message.  This will
          *      be one of the values in Strophe.LogLevel.
          *    (String) msg - The log message.
          */
      /* jshint ignore:start */
      log: function log(level, msg) {
        //console.log('log', level, msg);

        return;
      },
      /* jshint ignore:end */

      /** Function: debug
                               *  Log a message at the Strophe.LogLevel.DEBUG level.
                               *
                               *  Parameters:
                               *    (String) msg - The log message.
                               */
      debug: function debug(msg) {
        this.log(this.LogLevel.DEBUG, msg);
      },

      /** Function: info
          *  Log a message at the Strophe.LogLevel.INFO level.
          *
          *  Parameters:
          *    (String) msg - The log message.
          */
      info: function info(msg) {
        this.log(this.LogLevel.INFO, msg);
      },

      /** Function: warn
          *  Log a message at the Strophe.LogLevel.WARN level.
          *
          *  Parameters:
          *    (String) msg - The log message.
          */
      warn: function warn(msg) {
        this.log(this.LogLevel.WARN, msg);
      },

      /** Function: error
          *  Log a message at the Strophe.LogLevel.ERROR level.
          *
          *  Parameters:
          *    (String) msg - The log message.
          */
      error: function error(msg) {
        this.log(this.LogLevel.ERROR, msg);
      },

      /** Function: fatal
          *  Log a message at the Strophe.LogLevel.FATAL level.
          *
          *  Parameters:
          *    (String) msg - The log message.
          */
      fatal: function fatal(msg) {
        this.log(this.LogLevel.FATAL, msg);
      },

      /** Function: serialize
          *  Render a DOM element and all descendants to a String.
          *
          *  Parameters:
          *    (XMLElement) elem - A DOM element.
          *
          *  Returns:
          *    The serialized element tree as a String.
          */
      serialize: function serialize(elem) {
        var result;

        if (!elem) {
          return null;
        }

        if (typeof elem.tree === "function") {
          elem = elem.tree();
        }

        var nodeName = elem.nodeName;
        var i, child;

        if (elem.getAttribute("_realname")) {
          nodeName = elem.getAttribute("_realname");
        }

        result = "<" + nodeName;
        for (i = 0; i < elem.attributes.length; i++) {
          if (elem.attributes[i].nodeName != "_realname") {
            result += " " + elem.attributes[i].nodeName +
            "='" + Strophe.xmlescape(elem.attributes[i].value) + "'";
          }
        }

        if (elem.childNodes.length > 0) {
          result += ">";
          for (i = 0; i < elem.childNodes.length; i++) {
            child = elem.childNodes[i];
            switch (child.nodeType) {
              case Strophe.ElementType.NORMAL:
                // normal element, so recurse
                result += Strophe.serialize(child);
                break;
              case Strophe.ElementType.TEXT:
                // text element to escape values
                result += Strophe.xmlescape(child.nodeValue);
                break;
              case Strophe.ElementType.CDATA:
                // cdata section so don't escape values
                result += "<![CDATA[" + child.nodeValue + "]]>";}

          }
          result += "</" + nodeName + ">";
        } else {
          result += "/>";
        }

        return result;
      },

      /** PrivateVariable: _requestId
          *  _Private_ variable that keeps track of the request ids for
          *  connections.
          */
      _requestId: 0,

      /** PrivateVariable: Strophe.connectionPlugins
                      *  _Private_ variable Used to store plugin names that need
                      *  initialization on Strophe.Connection construction.
                      */
      _connectionPlugins: {},

      /** Function: addConnectionPlugin
                               *  Extends the Strophe.Connection object with the given plugin.
                               *
                               *  Parameters:
                               *    (String) name - The name of the extension.
                               *    (Object) ptype - The plugin's prototype.
                               */
      addConnectionPlugin: function addConnectionPlugin(name, ptype) {
        Strophe._connectionPlugins[name] = ptype;
      } };


    /** Class: Strophe.Builder
            *  XML DOM builder.
            *
            *  This object provides an interface similar to JQuery but for building
            *  DOM elements easily and rapidly.  All the functions except for toString()
            *  and tree() return the object, so calls can be chained.  Here's an
            *  example using the $iq() builder helper.
            *  > $iq({to: 'you', from: 'me', type: 'get', id: '1'})
            *  >     .c('query', {xmlns: 'strophe:example'})
            *  >     .c('example')
            *  >     .toString()
            *
            *  The above generates this XML fragment
            *  > <iq to='you' from='me' type='get' id='1'>
            *  >   <query xmlns='strophe:example'>
            *  >     <example/>
            *  >   </query>
            *  > </iq>
            *  The corresponding DOM manipulations to get a similar fragment would be
            *  a lot more tedious and probably involve several helper variables.
            *
            *  Since adding children makes new operations operate on the child, up()
            *  is provided to traverse up the tree.  To add two children, do
            *  > builder.c('child1', ...).up().c('child2', ...)
            *  The next operation on the Builder will be relative to the second child.
            */

    /** Constructor: Strophe.Builder
                *  Create a Strophe.Builder object.
                *
                *  The attributes should be passed in object notation.  For example
                *  > var b = new Builder('message', {to: 'you', from: 'me'});
                *  or
                *  > var b = new Builder('messsage', {'xml:lang': 'en'});
                *
                *  Parameters:
                *    (String) name - The name of the root element.
                *    (Object) attrs - The attributes for the root element in object notation.
                *
                *  Returns:
                *    A new Strophe.Builder.
                */
    Strophe.Builder = function (name, attrs) {
      // Set correct namespace for jabber:client elements
      if (name == "presence" || name == "message" || name == "iq") {
        if (attrs && !attrs.xmlns) {
          attrs.xmlns = Strophe.NS.CLIENT;
        } else if (!attrs) {
          attrs = { xmlns: Strophe.NS.CLIENT };
        }
      }

      // Holds the tree being built.
      this.nodeTree = Strophe.xmlElement(name, attrs);

      // Points to the current operation node.
      this.node = this.nodeTree;
    };

    Strophe.Builder.prototype = {
      /** Function: tree
                                   *  Return the DOM tree.
                                   *
                                   *  This function returns the current DOM tree as an element object.  This
                                   *  is suitable for passing to functions like Strophe.Connection.send().
                                   *
                                   *  Returns:
                                   *    The DOM tree as a element object.
                                   */
      tree: function tree() {
        return this.nodeTree;
      },

      /** Function: toString
          *  Serialize the DOM tree to a String.
          *
          *  This function returns a string serialization of the current DOM
          *  tree.  It is often used internally to pass data to a
          *  Strophe.Request object.
          *
          *  Returns:
          *    The serialized DOM tree in a String.
          */
      toString: function toString() {
        return Strophe.serialize(this.nodeTree);
      },

      /** Function: up
          *  Make the current parent element the new current element.
          *
          *  This function is often used after c() to traverse back up the tree.
          *  For example, to add two children to the same element
          *  > builder.c('child1', {}).up().c('child2', {});
          *
          *  Returns:
          *    The Stophe.Builder object.
          */
      up: function up() {
        this.node = this.node.parentNode;
        return this;
      },

      /** Function: root
          *  Make the root element the new current element.
          *
          *  When at a deeply nested element in the tree, this function can be used
          *  to jump back to the root of the tree, instead of having to repeatedly
          *  call up().
          *
          *  Returns:
          *    The Stophe.Builder object.
          */
      root: function root() {
        this.node = this.nodeTree;
        return this;
      },

      /** Function: attrs
          *  Add or modify attributes of the current element.
          *
          *  The attributes should be passed in object notation.  This function
          *  does not move the current element pointer.
          *
          *  Parameters:
          *    (Object) moreattrs - The attributes to add/modify in object notation.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      attrs: function attrs(moreattrs) {
        for (var k in moreattrs) {
          if (moreattrs.hasOwnProperty(k)) {
            if (moreattrs[k] === undefined) {
              this.node.removeAttribute(k);
            } else {
              this.node.setAttribute(k, moreattrs[k]);
            }
          }
        }
        return this;
      },

      /** Function: c
          *  Add a child to the current element and make it the new current
          *  element.
          *
          *  This function moves the current element pointer to the child,
          *  unless text is provided.  If you need to add another child, it
          *  is necessary to use up() to go back to the parent in the tree.
          *
          *  Parameters:
          *    (String) name - The name of the child.
          *    (Object) attrs - The attributes of the child in object notation.
          *    (String) text - The text to add to the child.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      c: function c(name, attrs, text) {
        var child = Strophe.xmlElement(name, attrs, text);
        this.node.appendChild(child);
        if (typeof text !== "string" && typeof text !== "number") {
          this.node = child;
        }
        return this;
      },

      /** Function: cnode
          *  Add a child to the current element and make it the new current
          *  element.
          *
          *  This function is the same as c() except that instead of using a
          *  name and an attributes object to create the child it uses an
          *  existing DOM element object.
          *
          *  Parameters:
          *    (XMLElement) elem - A DOM element.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      cnode: function cnode(elem) {
        var impNode;
        var xmlGen = Strophe.xmlGenerator();
        try {
          impNode = xmlGen.importNode !== undefined;
        } catch (e) {
          impNode = false;
        }
        var newElem = impNode ?
        xmlGen.importNode(elem, true) :
        Strophe.copyElement(elem);
        this.node.appendChild(newElem);
        this.node = newElem;
        return this;
      },

      /** Function: t
          *  Add a child text element.
          *
          *  This *does not* make the child the new current element since there
          *  are no children of text elements.
          *
          *  Parameters:
          *    (String) text - The text data to append to the current element.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      t: function t(text) {
        var child = Strophe.xmlTextNode(text);
        this.node.appendChild(child);
        return this;
      },

      /** Function: h
          *  Replace current element contents with the HTML passed in.
          *
          *  This *does not* make the child the new current element
          *
          *  Parameters:
          *    (String) html - The html to insert as contents of current element.
          *
          *  Returns:
          *    The Strophe.Builder object.
          */
      h: function h(html) {
        var fragment = document.createElement('body');

        // force the browser to try and fix any invalid HTML tags
        fragment.innerHTML = html;

        // copy cleaned html into an xml dom
        var xhtml = Strophe.createHtml(fragment);

        while (xhtml.childNodes.length > 0) {
          this.node.appendChild(xhtml.childNodes[0]);
        }
        return this;
      } };


    /** PrivateClass: Strophe.Handler
            *  _Private_ helper class for managing stanza handlers.
            *
            *  A Strophe.Handler encapsulates a user provided callback function to be
            *  executed when matching stanzas are received by the connection.
            *  Handlers can be either one-off or persistant depending on their
            *  return value. Returning true will cause a Handler to remain active, and
            *  returning false will remove the Handler.
            *
            *  Users will not use Strophe.Handler objects directly, but instead they
            *  will use Strophe.Connection.addHandler() and
            *  Strophe.Connection.deleteHandler().
            */

    /** PrivateConstructor: Strophe.Handler
                *  Create and initialize a new Strophe.Handler.
                *
                *  Parameters:
                *    (Function) handler - A function to be executed when the handler is run.
                *    (String) ns - The namespace to match.
                *    (String) name - The element name to match.
                *    (String) type - The element type to match.
                *    (String) id - The element id attribute to match.
                *    (String) from - The element from attribute to match.
                *    (Object) options - Handler options
                *
                *  Returns:
                *    A new Strophe.Handler object.
                */
    Strophe.Handler = function (handler, ns, name, type, id, from, options) {
      this.handler = handler;
      this.ns = ns;
      this.name = name;
      this.type = type;
      this.id = id;
      this.options = options || { 'matchBareFromJid': false, 'ignoreNamespaceFragment': false };
      // BBB: Maintain backward compatibility with old `matchBare` option
      if (this.options.matchBare) {
        Strophe.warn('The "matchBare" option is deprecated, use "matchBareFromJid" instead.');
        this.options.matchBareFromJid = this.options.matchBare;
        delete this.options.matchBare;
      }

      if (this.options.matchBareFromJid) {
        this.from = from ? Strophe.getBareJidFromJid(from) : null;
      } else {
        this.from = from;
      }
      // whether the handler is a user handler or a system handler
      this.user = true;
    };

    Strophe.Handler.prototype = {
      /** PrivateFunction: getNamespace
                                   *  Returns the XML namespace attribute on an element.
                                   *  If `ignoreNamespaceFragment` was passed in for this handler, then the
                                   *  URL fragment will be stripped.
                                   *
                                   *  Parameters:
                                   *    (XMLElement) elem - The XML element with the namespace.
                                   *
                                   *  Returns:
                                   *    The namespace, with optionally the fragment stripped.
                                   */
      getNamespace: function getNamespace(elem) {
        var elNamespace = elem.getAttribute("xmlns");
        if (elNamespace && this.options.ignoreNamespaceFragment) {
          elNamespace = elNamespace.split('#')[0];
        }
        return elNamespace;
      },

      /** PrivateFunction: namespaceMatch
          *  Tests if a stanza matches the namespace set for this Strophe.Handler.
          *
          *  Parameters:
          *    (XMLElement) elem - The XML element to test.
          *
          *  Returns:
          *    true if the stanza matches and false otherwise.
          */
      namespaceMatch: function namespaceMatch(elem) {
        var nsMatch = false;
        if (!this.ns) {
          return true;
        } else {
          var that = this;
          Strophe.forEachChild(elem, null, function (elem) {
            if (that.getNamespace(elem) === that.ns) {
              nsMatch = true;
            }
          });
          nsMatch = nsMatch || this.getNamespace(elem) === this.ns;
        }
        return nsMatch;
      },

      /** PrivateFunction: isMatch
          *  Tests if a stanza matches the Strophe.Handler.
          *
          *  Parameters:
          *    (XMLElement) elem - The XML element to test.
          *
          *  Returns:
          *    true if the stanza matches and false otherwise.
          */
      isMatch: function isMatch(elem) {
        var from = elem.getAttribute('from');
        if (this.options.matchBareFromJid) {
          from = Strophe.getBareJidFromJid(from);
        }
        var elem_type = elem.getAttribute("type");
        if (this.namespaceMatch(elem) && (
        !this.name || Strophe.isTagEqual(elem, this.name)) && (
        !this.type || (Array.isArray(this.type) ? this.type.indexOf(elem_type) != -1 : elem_type == this.type)) && (
        !this.id || elem.getAttribute("id") == this.id) && (
        !this.from || from == this.from)) {
          return true;
        }
        return false;
      },

      /** PrivateFunction: run
          *  Run the callback on a matching stanza.
          *
          *  Parameters:
          *    (XMLElement) elem - The DOM element that triggered the
          *      Strophe.Handler.
          *
          *  Returns:
          *    A boolean indicating if the handler should remain active.
          */
      run: function run(elem) {
        var result = null;
        try {
          result = this.handler(elem);
        } catch (e) {
          Strophe._handleError(e);
          throw e;
        }
        return result;
      },

      /** PrivateFunction: toString
          *  Get a String representation of the Strophe.Handler object.
          *
          *  Returns:
          *    A String.
          */
      toString: function toString() {
        return "{Handler: " + this.handler + "(" + this.name + "," +
        this.id + "," + this.ns + ")}";
      } };


    /** PrivateClass: Strophe.TimedHandler
            *  _Private_ helper class for managing timed handlers.
            *
            *  A Strophe.TimedHandler encapsulates a user provided callback that
            *  should be called after a certain period of time or at regular
            *  intervals.  The return value of the callback determines whether the
            *  Strophe.TimedHandler will continue to fire.
            *
            *  Users will not use Strophe.TimedHandler objects directly, but instead
            *  they will use Strophe.Connection.addTimedHandler() and
            *  Strophe.Connection.deleteTimedHandler().
            */

    /** PrivateConstructor: Strophe.TimedHandler
                *  Create and initialize a new Strophe.TimedHandler object.
                *
                *  Parameters:
                *    (Integer) period - The number of milliseconds to wait before the
                *      handler is called.
                *    (Function) handler - The callback to run when the handler fires.  This
                *      function should take no arguments.
                *
                *  Returns:
                *    A new Strophe.TimedHandler object.
                */
    Strophe.TimedHandler = function (period, handler) {
      this.period = period;
      this.handler = handler;
      this.lastCalled = new Date().getTime();
      this.user = true;
    };

    Strophe.TimedHandler.prototype = {
      /** PrivateFunction: run
                                        *  Run the callback for the Strophe.TimedHandler.
                                        *
                                        *  Returns:
                                        *    true if the Strophe.TimedHandler should be called again, and false
                                        *      otherwise.
                                        */
      run: function run() {
        this.lastCalled = new Date().getTime();
        return this.handler();
      },

      /** PrivateFunction: reset
          *  Reset the last called time for the Strophe.TimedHandler.
          */
      reset: function reset() {
        this.lastCalled = new Date().getTime();
      },

      /** PrivateFunction: toString
          *  Get a string representation of the Strophe.TimedHandler object.
          *
          *  Returns:
          *    The string representation.
          */
      toString: function toString() {
        return "{TimedHandler: " + this.handler + "(" + this.period + ")}";
      } };


    /** Class: Strophe.Connection
            *  XMPP Connection manager.
            *
            *  This class is the main part of Strophe.  It manages a BOSH or websocket
            *  connection to an XMPP server and dispatches events to the user callbacks
            *  as data arrives. It supports SASL PLAIN, SASL DIGEST-MD5, SASL SCRAM-SHA1
            *  and legacy authentication.
            *
            *  After creating a Strophe.Connection object, the user will typically
            *  call connect() with a user supplied callback to handle connection level
            *  events like authentication failure, disconnection, or connection
            *  complete.
            *
            *  The user will also have several event handlers defined by using
            *  addHandler() and addTimedHandler().  These will allow the user code to
            *  respond to interesting stanzas or do something periodically with the
            *  connection. These handlers will be active once authentication is
            *  finished.
            *
            *  To send data to the connection, use send().
            */

    /** Constructor: Strophe.Connection
                *  Create and initialize a Strophe.Connection object.
                *
                *  The transport-protocol for this connection will be chosen automatically
                *  based on the given service parameter. URLs starting with "ws://" or
                *  "wss://" will use WebSockets, URLs starting with "http://", "https://"
                *  or without a protocol will use BOSH.
                *
                *  To make Strophe connect to the current host you can leave out the protocol
                *  and host part and just pass the path, e.g.
                *
                *  > var conn = new Strophe.Connection("/http-bind/");
                *
                *  Options common to both Websocket and BOSH:
                *  ------------------------------------------
                *
                *  cookies
                *  ~~~~~~~
                *
                *  The "cookies" option allows you to pass in cookies to be added to the
                *  document. These cookies will then be included in the BOSH XMLHttpRequest
                *  or in the websocket connection.
                *
                *  The passed in value must be a map of cookie names and string values:
                *
                *  > { "myCookie": {
               *  >     "value": "1234",
               *  >     "domain": ".example.org",
               *  >     "path": "/",
               *  >     "expires": expirationDate
               *  >     }
               *  > }
                *
                *  Note that cookies can't be set in this way for other domains (i.e. cross-domain).
                *  Those cookies need to be set under those domains, for example they can be
                *  set server-side by making a XHR call to that domain to ask it to set any
                *  necessary cookies.
                *
                *  mechanisms
                *  ~~~~~~~~~~
                *
                *  The "mechanisms" option allows you to specify the SASL mechanisms that this
                *  instance of Strophe.Connection (and therefore your XMPP client) will
                *  support.
                *
                *  The value must be an array of objects with Strophe.SASLMechanism
                *  prototypes.
                *
                *  If nothing is specified, then the following mechanisms (and their
                *  priorities) are registered:
                *
                *      EXTERNAL - 60
                *      OAUTHBEARER - 50
                *      SCRAM-SHA1 - 40
                *      DIGEST-MD5 - 30
                *      PLAIN - 20
                *      ANONYMOUS - 10
                *
                *  WebSocket options:
                *  ------------------
                *
                *  If you want to connect to the current host with a WebSocket connection you
                *  can tell Strophe to use WebSockets through a "protocol" attribute in the
                *  optional options parameter. Valid values are "ws" for WebSocket and "wss"
                *  for Secure WebSocket.
                *  So to connect to "wss://CURRENT_HOSTNAME/xmpp-websocket" you would call
                *
                *  > var conn = new Strophe.Connection("/xmpp-websocket/", {protocol: "wss"});
                *
                *  Note that relative URLs _NOT_ starting with a "/" will also include the path
                *  of the current site.
                *
                *  Also because downgrading security is not permitted by browsers, when using
                *  relative URLs both BOSH and WebSocket connections will use their secure
                *  variants if the current connection to the site is also secure (https).
                *
                *  BOSH options:
                *  -------------
                *
                *  By adding "sync" to the options, you can control if requests will
                *  be made synchronously or not. The default behaviour is asynchronous.
                *  If you want to make requests synchronous, make "sync" evaluate to true:
                *  > var conn = new Strophe.Connection("/http-bind/", {sync: true});
                *
                *  You can also toggle this on an already established connection:
                *  > conn.options.sync = true;
                *
                *  The "customHeaders" option can be used to provide custom HTTP headers to be
                *  included in the XMLHttpRequests made.
                *
                *  The "keepalive" option can be used to instruct Strophe to maintain the
                *  current BOSH session across interruptions such as webpage reloads.
                *
                *  It will do this by caching the sessions tokens in sessionStorage, and when
                *  "restore" is called it will check whether there are cached tokens with
                *  which it can resume an existing session.
                *
                *  The "withCredentials" option should receive a Boolean value and is used to
                *  indicate wether cookies should be included in ajax requests (by default
                *  they're not).
                *  Set this value to true if you are connecting to a BOSH service
                *  and for some reason need to send cookies to it.
                *  In order for this to work cross-domain, the server must also enable
                *  credentials by setting the Access-Control-Allow-Credentials response header
                *  to "true". For most usecases however this setting should be false (which
                *  is the default).
                *  Additionally, when using Access-Control-Allow-Credentials, the
                *  Access-Control-Allow-Origin header can't be set to the wildcard "*", but
                *  instead must be restricted to actual domains.
                *
                *  The "contentType" option can be set to change the default Content-Type
                *  of "text/xml; charset=utf-8", which can be useful to reduce the amount of
                *  CORS preflight requests that are sent to the server.
                *
                *  Parameters:
                *    (String) service - The BOSH or WebSocket service URL.
                *    (Object) options - A hash of configuration options
                *
                *  Returns:
                *    A new Strophe.Connection object.
                */
    Strophe.Connection = function (service, options) {
      // The service URL
      this.service = service;
      // Configuration options
      this.options = options || {};
      var proto = this.options.protocol || "";

      // Select protocal based on service or options
      if (service.indexOf("ws:") === 0 || service.indexOf("wss:") === 0 ||
      proto.indexOf("ws") === 0) {
        this._proto = new Strophe.Websocket(this);
      } else {
        this._proto = new Strophe.Bosh(this);
      }

      /* The connected JID. */
      this.jid = "";
      /* the JIDs domain */
      this.domain = null;
      /* stream:features */
      this.features = null;

      // SASL
      this._sasl_data = {};
      this.do_session = false;
      this.do_bind = false;

      // handler lists
      this.timedHandlers = [];
      this.handlers = [];
      this.removeTimeds = [];
      this.removeHandlers = [];
      this.addTimeds = [];
      this.addHandlers = [];
      this.protocolErrorHandlers = {
        'HTTP': {},
        'websocket': {} };


      this._idleTimeout = null;
      this._disconnectTimeout = null;

      this.authenticated = false;
      this.connected = false;
      this.disconnecting = false;
      this.do_authentication = true;
      this.paused = false;
      this.restored = false;

      this._data = [];
      this._uniqueId = 0;

      this._sasl_success_handler = null;
      this._sasl_failure_handler = null;
      this._sasl_challenge_handler = null;

      // Max retries before disconnecting
      this.maxRetries = 5;

      // Call onIdle callback every 1/10th of a second
      // XXX: setTimeout should be called only with function expressions (23974bc1)
      this._idleTimeout = setTimeout(function () {
        this._onIdle();
      }.bind(this), 100);

      utils.addCookies(this.options.cookies);
      this.registerSASLMechanisms(this.options.mechanisms);

      // initialize plugins
      for (var k in Strophe._connectionPlugins) {
        if (Strophe._connectionPlugins.hasOwnProperty(k)) {
          var ptype = Strophe._connectionPlugins[k];
          // jslint complaints about the below line, but this is fine
          var F = function F() {
          }; // jshint ignore:line
          F.prototype = ptype;
          this[k] = new F();
          this[k].init(this);
        }
      }
    };

    Strophe.Connection.prototype = {
      /** Function: reset
                                      *  Reset the connection.
                                      *
                                      *  This function should be called after a connection is disconnected
                                      *  before that connection is reused.
                                      */
      reset: function reset() {
        this._proto._reset();

        // SASL
        this.do_session = false;
        this.do_bind = false;

        // handler lists
        this.timedHandlers = [];
        this.handlers = [];
        this.removeTimeds = [];
        this.removeHandlers = [];
        this.addTimeds = [];
        this.addHandlers = [];

        this.authenticated = false;
        this.connected = false;
        this.disconnecting = false;
        this.restored = false;

        this._data = [];
        this._requests = [];
        this._uniqueId = 0;
      },

      /** Function: pause
          *  Pause the request manager.
          *
          *  This will prevent Strophe from sending any more requests to the
          *  server.  This is very useful for temporarily pausing
          *  BOSH-Connections while a lot of send() calls are happening quickly.
          *  This causes Strophe to send the data in a single request, saving
          *  many request trips.
          */
      pause: function pause() {
        this.paused = true;
      },

      /** Function: resume
          *  Resume the request manager.
          *
          *  This resumes after pause() has been called.
          */
      resume: function resume() {
        this.paused = false;
      },

      /** Function: getUniqueId
          *  Generate a unique ID for use in <iq/> elements.
          *
          *  All <iq/> stanzas are required to have unique id attributes.  This
          *  function makes creating these easy.  Each connection instance has
          *  a counter which starts from zero, and the value of this counter
          *  plus a colon followed by the suffix becomes the unique id. If no
          *  suffix is supplied, the counter is used as the unique id.
          *
          *  Suffixes are used to make debugging easier when reading the stream
          *  data, and their use is recommended.  The counter resets to 0 for
          *  every new connection for the same reason.  For connections to the
          *  same server that authenticate the same way, all the ids should be
          *  the same, which makes it easy to see changes.  This is useful for
          *  automated testing as well.
          *
          *  Parameters:
          *    (String) suffix - A optional suffix to append to the id.
          *
          *  Returns:
          *    A unique string to be used for the id attribute.
          */
      getUniqueId: function getUniqueId(suffix) {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
        if (typeof suffix == "string" || typeof suffix == "number") {
          return uuid + ":" + suffix;
        } else {
          return uuid + "";
        }
      },

      /** Function: addProtocolErrorHandler
          *  Register a handler function for when a protocol (websocker or HTTP)
          *  error occurs.
          *
          *  NOTE: Currently only HTTP errors for BOSH requests are handled.
          *  Patches that handle websocket errors would be very welcome.
          *
          *  Parameters:
          *    (String) protocol - 'HTTP' or 'websocket'
          *    (Integer) status_code - Error status code (e.g 500, 400 or 404)
          *    (Function) callback - Function that will fire on Http error
          *
          *  Example:
          *  function onError(err_code){
         *    //do stuff
         *  }
          *
          *  var conn = Strophe.connect('http://example.com/http-bind');
          *  conn.addProtocolErrorHandler('HTTP', 500, onError);
          *  // Triggers HTTP 500 error and onError handler will be called
          *  conn.connect('user_jid@incorrect_jabber_host', 'secret', onConnect);
          */
      addProtocolErrorHandler: function addProtocolErrorHandler(protocol, status_code, callback) {
        this.protocolErrorHandlers[protocol][status_code] = callback;
      },


      /** Function: connect
          *  Starts the connection process.
          *
          *  As the connection process proceeds, the user supplied callback will
          *  be triggered multiple times with status updates.  The callback
          *  should take two arguments - the status code and the error condition.
          *
          *  The status code will be one of the values in the Strophe.Status
          *  constants.  The error condition will be one of the conditions
          *  defined in RFC 3920 or the condition 'strophe-parsererror'.
          *
          *  The Parameters _wait_, _hold_ and _route_ are optional and only relevant
          *  for BOSH connections. Please see XEP 124 for a more detailed explanation
          *  of the optional parameters.
          *
          *  Parameters:
          *    (String) jid - The user's JID.  This may be a bare JID,
          *      or a full JID.  If a node is not supplied, SASL ANONYMOUS
          *      authentication will be attempted.
          *    (String) pass - The user's password.
          *    (Function) callback - The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (String) route - The optional route value.
          *    (String) authcid - The optional alternative authentication identity
          *      (username) if intending to impersonate another user.
          *      When using the SASL-EXTERNAL authentication mechanism, for example
          *      with client certificates, then the authcid value is used to
          *      determine whether an authorization JID (authzid) should be sent to
          *      the server. The authzid should not be sent to the server if the
          *      authzid and authcid are the same. So to prevent it from being sent
          *      (for example when the JID is already contained in the client
          *      certificate), set authcid to that same JID. See XEP-178 for more
          *      details.
          */
      connect: function connect(jid, pass, callback, wait, hold, route, authcid) {
        this.jid = jid;
        /** Variable: authzid
                         *  Authorization identity.
                         */
        this.authzid = Strophe.getBareJidFromJid(this.jid);

        /** Variable: authcid
                                                             *  Authentication identity (User name).
                                                             */
        this.authcid = authcid || Strophe.getNodeFromJid(this.jid);

        /** Variable: pass
                                                                     *  Authentication identity (User password).
                                                                     */
        this.pass = pass;

        /** Variable: servtype
                           *  Digest MD5 compatibility.
                           */
        this.servtype = "xmpp";

        this.connect_callback = callback;
        this.disconnecting = false;
        this.connected = false;
        this.authenticated = false;
        this.restored = false;

        // parse jid for domain
        this.domain = Strophe.getDomainFromJid(this.jid);

        this._changeConnectStatus(Strophe.Status.CONNECTING, null);

        this._proto._connect(wait, hold, route);
      },

      /** Function: attach
          *  Attach to an already created and authenticated BOSH session.
          *
          *  This function is provided to allow Strophe to attach to BOSH
          *  sessions which have been created externally, perhaps by a Web
          *  application.  This is often used to support auto-login type features
          *  without putting user credentials into the page.
          *
          *  Parameters:
          *    (String) jid - The full JID that is bound by the session.
          *    (String) sid - The SID of the BOSH session.
          *    (String) rid - The current RID of the BOSH session.  This RID
          *      will be used by the next request.
          *    (Function) callback The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *      Other settings will require tweaks to the Strophe.TIMEOUT value.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (Integer) wind - The optional HTTBIND window value.  This is the
          *      allowed range of request ids that are valid.  The default is 5.
          */
      attach: function attach(jid, sid, rid, callback, wait, hold, wind) {
        if (this._proto instanceof Strophe.Bosh) {
          this._proto._attach(jid, sid, rid, callback, wait, hold, wind);
        } else {
          throw {
            name: 'StropheSessionError',
            message: 'The "attach" method can only be used with a BOSH connection.' };

        }
      },

      /** Function: restore
          *  Attempt to restore a cached BOSH session.
          *
          *  This function is only useful in conjunction with providing the
          *  "keepalive":true option when instantiating a new Strophe.Connection.
          *
          *  When "keepalive" is set to true, Strophe will cache the BOSH tokens
          *  RID (Request ID) and SID (Session ID) and then when this function is
          *  called, it will attempt to restore the session from those cached
          *  tokens.
          *
          *  This function must therefore be called instead of connect or attach.
          *
          *  For an example on how to use it, please see examples/restore.js
          *
          *  Parameters:
          *    (String) jid - The user's JID.  This may be a bare JID or a full JID.
          *    (Function) callback - The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (Integer) wind - The optional HTTBIND window value.  This is the
          *      allowed range of request ids that are valid.  The default is 5.
          */
      restore: function restore(jid, callback, wait, hold, wind) {
        if (this._sessionCachingSupported()) {
          this._proto._restore(jid, callback, wait, hold, wind);
        } else {
          throw {
            name: 'StropheSessionError',
            message: 'The "restore" method can only be used with a BOSH connection.' };

        }
      },

      /** PrivateFunction: _sessionCachingSupported
          * Checks whether sessionStorage and JSON are supported and whether we're
          * using BOSH.
          */
      _sessionCachingSupported: function _sessionCachingSupported() {
        if (this._proto instanceof Strophe.Bosh) {
          if (!JSON) {
            return false;
          }
          try {
            window.sessionStorage.setItem('_strophe_', '_strophe_');
            window.sessionStorage.removeItem('_strophe_');
          } catch (e) {
            return false;
          }
          return true;
        }
        return false;
      },

      /** Function: xmlInput
          *  User overrideable function that receives XML data coming into the
          *  connection.
          *
          *  The default function does nothing.  User code can override this with
          *  > Strophe.Connection.xmlInput = function (elem) {
         *  >   (user code)
         *  > };
          *
          *  Due to limitations of current Browsers' XML-Parsers the opening and closing
          *  <stream> tag for WebSocket-Connoctions will be passed as selfclosing here.
          *
          *  BOSH-Connections will have all stanzas wrapped in a <body> tag. See
          *  <Strophe.Bosh.strip> if you want to strip this tag.
          *
          *  Parameters:
          *    (XMLElement) elem - The XML data received by the connection.
          */
      /* jshint unused:false */
      xmlInput: function xmlInput(elem) {
        return;
      },
      /* jshint unused:true */

      /** Function: xmlOutput
                                *  User overrideable function that receives XML data sent to the
                                *  connection.
                                *
                                *  The default function does nothing.  User code can override this with
                                *  > Strophe.Connection.xmlOutput = function (elem) {
                               *  >   (user code)
                               *  > };
                                *
                                *  Due to limitations of current Browsers' XML-Parsers the opening and closing
                                *  <stream> tag for WebSocket-Connoctions will be passed as selfclosing here.
                                *
                                *  BOSH-Connections will have all stanzas wrapped in a <body> tag. See
                                *  <Strophe.Bosh.strip> if you want to strip this tag.
                                *
                                *  Parameters:
                                *    (XMLElement) elem - The XMLdata sent by the connection.
                                */
      /* jshint unused:false */
      xmlOutput: function xmlOutput(elem) {
        return;
      },
      /* jshint unused:true */

      /** Function: rawInput
                                *  User overrideable function that receives raw data coming into the
                                *  connection.
                                *
                                *  The default function does nothing.  User code can override this with
                                *  > Strophe.Connection.rawInput = function (data) {
                               *  >   (user code)
                               *  > };
                                *
                                *  Parameters:
                                *    (String) data - The data received by the connection.
                                */
      /* jshint unused:false */
      rawInput: function rawInput(data) {
        return;
      },
      /* jshint unused:true */

      /** Function: rawOutput
                                *  User overrideable function that receives raw data sent to the
                                *  connection.
                                *
                                *  The default function does nothing.  User code can override this with
                                *  > Strophe.Connection.rawOutput = function (data) {
                               *  >   (user code)
                               *  > };
                                *
                                *  Parameters:
                                *    (String) data - The data sent by the connection.
                                */
      /* jshint unused:false */
      rawOutput: function rawOutput(data) {
        return;
      },
      /* jshint unused:true */

      /** Function: nextValidRid
                                *  User overrideable function that receives the new valid rid.
                                *
                                *  The default function does nothing. User code can override this with
                                *  > Strophe.Connection.nextValidRid = function (rid) {
                               *  >    (user code)
                               *  > };
                                *
                                *  Parameters:
                                *    (Number) rid - The next valid rid
                                */
      /* jshint unused:false */
      nextValidRid: function nextValidRid(rid) {
        return;
      },
      /* jshint unused:true */

      /** Function: send
                                *  Send a stanza.
                                *
                                *  This function is called to push data onto the send queue to
                                *  go out over the wire.  Whenever a request is sent to the BOSH
                                *  server, all pending data is sent and the queue is flushed.
                                *
                                *  Parameters:
                                *    (XMLElement |
                                *     [XMLElement] |
                                *     Strophe.Builder) elem - The stanza to send.
                                */
      send: function send(elem, fail) {
        // console.log(elem)
        if (elem === null) {
          return;
        }
        if (typeof elem.sort === "function") {
          for (var i = 0; i < elem.length; i++) {
            this._queueData(elem[i]);
          }
        } else if (typeof elem.tree === "function") {
          this._queueData(elem.tree());
        } else {
          this._queueData(elem);
        }
        this._proto._send(fail);
      },

      /** Function: flush
          *  Immediately send any pending outgoing data.
          *
          *  Normally send() queues outgoing data until the next idle period
          *  (100ms), which optimizes network use in the common cases when
          *  several send()s are called in succession. flush() can be used to
          *  immediately send all pending data.
          */
      flush: function flush(fail) {
        // cancel the pending idle period and run the idle function
        // immediately
        clearTimeout(this._idleTimeout);
        this._onIdle(fail);
      },

      /** Function: sendIQ
          *  Helper function to send IQ stanzas.
          *
          *  Parameters:
          *    (XMLElement) elem - The stanza to send.
          *    (Function) callback - The callback function for a successful request.
          *    (Function) errback - The callback function for a failed or timed
          *      out request.  On timeout, the stanza will be null.
          *    (Integer) timeout - The time specified in milliseconds for a
          *      timeout to occur.
          *
          *  Returns:
          *    The id used to send the IQ.
          */
      sendIQ: function sendIQ(elem, callback, errback, timeout) {
        var timeoutHandler = null;
        var that = this;

        if (typeof elem.tree === "function") {
          elem = elem.tree();
        }
        var id = elem.getAttribute('id');

        // inject id if not found
        if (!id) {
          id = this.getUniqueId("sendIQ");
          elem.setAttribute("id", id);
        }

        var expectedFrom = elem.getAttribute("to");
        var fulljid = this.jid;

        var handler = this.addHandler(function (stanza) {
          // remove timeout handler if there is one
          if (timeoutHandler) {
            that.deleteTimedHandler(timeoutHandler);
          }

          var acceptable = false;
          var from = stanza.getAttribute("from");
          if (from === expectedFrom ||
          !expectedFrom && (
          from === Strophe.getBareJidFromJid(fulljid) ||
          from === Strophe.getDomainFromJid(fulljid) ||
          from === fulljid)) {
            acceptable = true;
          }

          if (!acceptable) {
            throw {
              name: "StropheError",
              message: "Got answer to IQ from wrong jid:" + from +
              "\nExpected jid: " + expectedFrom };

          }

          var iqtype = stanza.getAttribute('type');
          if (iqtype == 'result') {
            if (callback) {
              callback(stanza);
            }
          } else if (iqtype == 'error') {
            if (errback) {
              errback(stanza);
            }
          } else {
            throw {
              name: "StropheError",
              message: "Got bad IQ type of " + iqtype };

          }
        }, null, 'iq', ['error', 'result'], id);

        // if timeout specified, setup timeout handler.
        if (timeout) {
          timeoutHandler = this.addTimedHandler(timeout, function () {
            // get rid of normal handler
            that.deleteHandler(handler);
            // call errback on timeout with null stanza
            if (errback) {
              errback(null);
            }
            return false;
          });
        }
        this.send(elem);
        return id;
      },

      /** PrivateFunction: _queueData
          *  Queue outgoing data for later sending.  Also ensures that the data
          *  is a DOMElement.
          */
      _queueData: function _queueData(element) {
        if (element === null || !element.tagName || !element.childNodes) {
          throw {
            name: "StropheError",
            message: "Cannot queue non-DOMElement." };

        }
        this._data.push(element);
      },

      /** PrivateFunction: _sendRestart
          *  Send an xmpp:restart stanza.
          */
      _sendRestart: function _sendRestart() {
        this._data.push("restart");
        this._proto._sendRestart();
        // XXX: setTimeout should be called only with function expressions (23974bc1)
        this._idleTimeout = setTimeout(function () {
          this._onIdle();
        }.bind(this), 100);
      },

      /** Function: addTimedHandler
          *  Add a timed handler to the connection.
          *
          *  This function adds a timed handler.  The provided handler will
          *  be called every period milliseconds until it returns false,
          *  the connection is terminated, or the handler is removed.  Handlers
          *  that wish to continue being invoked should return true.
          *
          *  Because of method binding it is necessary to save the result of
          *  this function if you wish to remove a handler with
          *  deleteTimedHandler().
          *
          *  Note that user handlers are not active until authentication is
          *  successful.
          *
          *  Parameters:
          *    (Integer) period - The period of the handler.
          *    (Function) handler - The callback function.
          *
          *  Returns:
          *    A reference to the handler that can be used to remove it.
          */
      addTimedHandler: function addTimedHandler(period, handler) {
        var thand = new Strophe.TimedHandler(period, handler);
        this.addTimeds.push(thand);
        return thand;
      },

      /** Function: deleteTimedHandler
          *  Delete a timed handler for a connection.
          *
          *  This function removes a timed handler from the connection.  The
          *  handRef parameter is *not* the function passed to addTimedHandler(),
          *  but is the reference returned from addTimedHandler().
          *
          *  Parameters:
          *    (Strophe.TimedHandler) handRef - The handler reference.
          */
      deleteTimedHandler: function deleteTimedHandler(handRef) {
        // this must be done in the Idle loop so that we don't change
        // the handlers during iteration
        this.removeTimeds.push(handRef);
      },

      /** Function: addHandler
          *  Add a stanza handler for the connection.
          *
          *  This function adds a stanza handler to the connection.  The
          *  handler callback will be called for any stanza that matches
          *  the parameters.  Note that if multiple parameters are supplied,
          *  they must all match for the handler to be invoked.
          *
          *  The handler will receive the stanza that triggered it as its argument.
          *  *The handler should return true if it is to be invoked again;
          *  returning false will remove the handler after it returns.*
          *
          *  As a convenience, the ns parameters applies to the top level element
          *  and also any of its immediate children.  This is primarily to make
          *  matching /iq/query elements easy.
          *
          *  Options
          *  ~~~~~~~
          *  With the options argument, you can specify boolean flags that affect how
          *  matches are being done.
          *
          *  Currently two flags exist:
          *
          *  - matchBareFromJid:
          *      When set to true, the from parameter and the
          *      from attribute on the stanza will be matched as bare JIDs instead
          *      of full JIDs. To use this, pass {matchBareFromJid: true} as the
          *      value of options. The default value for matchBareFromJid is false.
          *
          *  - ignoreNamespaceFragment:
          *      When set to true, a fragment specified on the stanza's namespace
          *      URL will be ignored when it's matched with the one configured for
          *      the handler.
          *
          *      This means that if you register like this:
          *      >   connection.addHandler(
          *      >       handler,
          *      >       'http://jabber.org/protocol/muc',
          *      >       null, null, null, null,
          *      >       {'ignoreNamespaceFragment': true}
          *      >   );
          *
          *      Then a stanza with XML namespace of
          *      'http://jabber.org/protocol/muc#user' will also be matched. If
          *      'ignoreNamespaceFragment' is false, then only stanzas with
          *      'http://jabber.org/protocol/muc' will be matched.
          *
          *  Deleting the handler
          *  ~~~~~~~~~~~~~~~~~~~~
          *  The return value should be saved if you wish to remove the handler
          *  with deleteHandler().
          *
          *  Parameters:
          *    (Function) handler - The user callback.
          *    (String) ns - The namespace to match.
          *    (String) name - The stanza name to match.
          *    (String|Array) type - The stanza type (or types if an array) to match.
          *    (String) id - The stanza id attribute to match.
          *    (String) from - The stanza from attribute to match.
          *    (String) options - The handler options
          *
          *  Returns:
          *    A reference to the handler that can be used to remove it.
          */
      addHandler: function addHandler(handler, ns, name, type, id, from, options) {
        var hand = new Strophe.Handler(handler, ns, name, type, id, from, options);
        this.addHandlers.push(hand);
        return hand;
      },

      /** Function: deleteHandler
          *  Delete a stanza handler for a connection.
          *
          *  This function removes a stanza handler from the connection.  The
          *  handRef parameter is *not* the function passed to addHandler(),
          *  but is the reference returned from addHandler().
          *
          *  Parameters:
          *    (Strophe.Handler) handRef - The handler reference.
          */
      deleteHandler: function deleteHandler(handRef) {
        // this must be done in the Idle loop so that we don't change
        // the handlers during iteration
        this.removeHandlers.push(handRef);
        // If a handler is being deleted while it is being added,
        // prevent it from getting added
        var i = this.addHandlers.indexOf(handRef);
        if (i >= 0) {
          this.addHandlers.splice(i, 1);
        }
      },

      /** Function: registerSASLMechanisms
          *
          * Register the SASL mechanisms which will be supported by this instance of
          * Strophe.Connection (i.e. which this XMPP client will support).
          *
          *  Parameters:
          *    (Array) mechanisms - Array of objects with Strophe.SASLMechanism prototypes
          *
          */
      registerSASLMechanisms: function registerSASLMechanisms(mechanisms) {
        this.mechanisms = {};
        mechanisms = mechanisms || [
        Strophe.SASLAnonymous,
        Strophe.SASLExternal,
        Strophe.SASLMD5,
        Strophe.SASLOAuthBearer,
        Strophe.SASLPlain,
        Strophe.SASLSHA1];

        mechanisms.forEach(this.registerSASLMechanism.bind(this));
      },

      /** Function: registerSASLMechanism
          *
          * Register a single SASL mechanism, to be supported by this client.
          *
          *  Parameters:
          *    (Object) mechanism - Object with a Strophe.SASLMechanism prototype
          *
          */
      registerSASLMechanism: function registerSASLMechanism(mechanism) {
        this.mechanisms[mechanism.prototype.name] = mechanism;
      },

      /** Function: disconnect
          *  Start the graceful disconnection process.
          *
          *  This function starts the disconnection process.  This process starts
          *  by sending unavailable presence and sending BOSH body of type
          *  terminate.  A timeout handler makes sure that disconnection happens
          *  even if the BOSH server does not respond.
          *  If the Connection object isn't connected, at least tries to abort all pending requests
          *  so the connection object won't generate successful requests (which were already opened).
          *
          *  The user supplied connection callback will be notified of the
          *  progress as this process happens.
          *
          *  Parameters:
          *    (String) reason - The reason the disconnect is occuring.
          */
      disconnect: function disconnect(reason) {
        this._changeConnectStatus(Strophe.Status.DISCONNECTING, reason);

        Strophe.info("Disconnect was called because: " + reason);
        if (this.connected) {
          var pres = false;
          this.disconnecting = true;
          if (this.authenticated) {
            pres = $pres({
              xmlns: Strophe.NS.CLIENT,
              type: 'unavailable' });

          }
          // setup timeout handler
          this._disconnectTimeout = this._addSysTimedHandler(
          3000, this._onDisconnectTimeout.bind(this));
          this._proto._disconnect(pres);
        } else {
          Strophe.info("Disconnect was called before Strophe connected to the server");
          this._proto._abortAllRequests();
        }
      },

      /** PrivateFunction: _changeConnectStatus
          *  _Private_ helper function that makes sure plugins and the user's
          *  callback are notified of connection status changes.
          *
          *  Parameters:
          *    (Integer) status - the new connection status, one of the values
          *      in Strophe.Status
          *    (String) condition - the error condition or null
          */
      _changeConnectStatus: function _changeConnectStatus(status, condition) {
        // notify all plugins listening for status changes
        for (var k in Strophe._connectionPlugins) {
          if (Strophe._connectionPlugins.hasOwnProperty(k)) {
            var plugin = this[k];
            if (plugin.statusChanged) {
              try {
                plugin.statusChanged(status, condition);
              } catch (err) {
                Strophe.error("" + k + " plugin caused an exception " +
                "changing status: " + err);
              }
            }
          }
        }

        // notify the user's callback
        if (this.connect_callback) {
          try {
            this.connect_callback(status, condition);
          } catch (e) {
            Strophe._handleError(e);
            Strophe.error(
            "User connection callback caused an " + "exception: " + e);
          }
        }
      },

      /** PrivateFunction: _doDisconnect
          *  _Private_ function to disconnect.
          *
          *  This is the last piece of the disconnection logic.  This resets the
          *  connection and alerts the user's connection callback.
          */
      _doDisconnect: function _doDisconnect(condition) {
        //console.log('_doDisconnect 14', condition)
        if (typeof this._idleTimeout == "number") {
          clearTimeout(this._idleTimeout);
        }

        // Cancel Disconnect Timeout
        if (this._disconnectTimeout !== null) {
          this.deleteTimedHandler(this._disconnectTimeout);
          this._disconnectTimeout = null;
        }

        Strophe.info("_doDisconnect was called");
        this._proto._doDisconnect();

        this.authenticated = false;
        this.disconnecting = false;
        this.restored = false;

        // delete handlers
        this.handlers = [];
        this.timedHandlers = [];
        this.removeTimeds = [];
        this.removeHandlers = [];
        this.addTimeds = [];
        this.addHandlers = [];

        // tell the parent we disconnected
        this._changeConnectStatus(Strophe.Status.DISCONNECTED, condition);
        this.connected = false;
      },

      /** PrivateFunction: _dataRecv
          *  _Private_ handler to processes incoming data from the the connection.
          *
          *  Except for _connect_cb handling the initial connection request,
          *  this function handles the incoming data for all requests.  This
          *  function also fires stanza handlers that match each incoming
          *  stanza.
          *
          *  Parameters:
          *    (Strophe.Request) req - The request that has data ready.
          *    (string) req - The stanza a raw string (optiona).
          */
      _dataRecv: function _dataRecv(req, raw) {
        Strophe.info("_dataRecv called");
        var elem = this._proto._reqToData(req);
        if (elem === null) {
          return;
        }

        if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
          if (elem.nodeName === this._proto.strip && elem.childNodes.length) {
            this.xmlInput(elem.childNodes[0]);
          } else {
            this.xmlInput(elem);
          }
        }
        if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
          if (raw) {
            this.rawInput(raw);
          } else {
            this.rawInput(Strophe.serialize(elem));
          }
        }

        // remove handlers scheduled for deletion
        var i, hand;
        while (this.removeHandlers.length > 0) {
          hand = this.removeHandlers.pop();
          i = this.handlers.indexOf(hand);
          if (i >= 0) {
            this.handlers.splice(i, 1);
          }
        }

        // add handlers scheduled for addition
        while (this.addHandlers.length > 0) {
          this.handlers.push(this.addHandlers.pop());
        }

        // handle graceful disconnect
        if (this.disconnecting && this._proto._emptyQueue()) {
          //console.log('_doDisconnect 1')
          this._doDisconnect();
          return;
        }

        var type = elem.getAttribute("type");
        var cond, conflict;
        if (type !== null && type == "terminate") {
          // Don't process stanzas that come in after disconnect
          if (this.disconnecting) {
            return;
          }

          // an error occurred
          cond = elem.getAttribute("condition");
          conflict = elem.getElementsByTagName("conflict");
          if (cond !== null) {
            if (cond == "remote-stream-error" && conflict.length > 0) {
              cond = "conflict";
            }
            this._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
          } else {
            this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
          }
          this._doDisconnect(cond);
          return;
        }

        // send each incoming stanza through the handler chain
        var that = this;
        Strophe.forEachChild(elem, null, function (child) {
          var i, newList;
          // process handlers
          newList = that.handlers;
          that.handlers = [];
          for (i = 0; i < newList.length; i++) {
            var hand = newList[i];
            // encapsulate 'handler.run' not to lose the whole handler list if
            // one of the handlers throws an exception
            try {
              if (hand.isMatch(child) && (
              that.authenticated || !hand.user)) {
                if (hand.run(child)) {
                  that.handlers.push(hand);
                }
              } else {
                that.handlers.push(hand);
              }
            } catch (e) {
              // if the handler throws an exception, we consider it as false
              Strophe.warn('Removing Strophe handlers due to uncaught exception: ' + e.message);
            }
          }
        });
      },


      /** Attribute: mechanisms
          *  SASL Mechanisms available for Connection.
          */
      mechanisms: {},

      /** PrivateFunction: _connect_cb
                       *  _Private_ handler for initial connection request.
                       *
                       *  This handler is used to process the initial connection request
                       *  response from the BOSH server. It is used to set up authentication
                       *  handlers and start the authentication process.
                       *
                       *  SASL authentication will be attempted if available, otherwise
                       *  the code will fall back to legacy authentication.
                       *
                       *  Parameters:
                       *    (Strophe.Request) req - The current request.
                       *    (Function) _callback - low level (xmpp) connect callback function.
                       *      Useful for plugins with their own xmpp connect callback (when their)
                       *      want to do something special).
                       */
      _connect_cb: function _connect_cb(req, _callback, raw) {
        Strophe.info("_connect_cb was called");
        this.connected = true;

        var bodyWrap;
        try {
          bodyWrap = this._proto._reqToData(req);
        } catch (e) {
          if (e != "badformat") {
            throw e;
          }
          this._changeConnectStatus(Strophe.Status.CONNFAIL, 'bad-format');
          this._doDisconnect('bad-format');
        }
        if (!bodyWrap) {
          return;
        }

        if (this.xmlInput !== Strophe.Connection.prototype.xmlInput) {
          if (bodyWrap.nodeName === this._proto.strip && bodyWrap.childNodes.length) {
            this.xmlInput(bodyWrap.childNodes[0]);
          } else {
            this.xmlInput(bodyWrap);
          }
        }
        if (this.rawInput !== Strophe.Connection.prototype.rawInput) {
          if (raw) {
            this.rawInput(raw);
          } else {
            this.rawInput(Strophe.serialize(bodyWrap));
          }
        }

        var conncheck = this._proto._connect_cb(bodyWrap);
        if (conncheck === Strophe.Status.CONNFAIL) {
          return;
        }

        // Check for the stream:features tag
        var hasFeatures;
        if (bodyWrap.getElementsByTagNameNS) {
          hasFeatures = bodyWrap.getElementsByTagNameNS(Strophe.NS.STREAM, "features").length > 0;
        } else {
          hasFeatures = bodyWrap.getElementsByTagName("stream:features").length > 0 ||
          bodyWrap.getElementsByTagName("features").length > 0;
        }

        //console.log('hasFeatures', hasFeatures, bodyWrap, _callback)
        if (!hasFeatures) {
          try {
            this._proto._no_auth_received(_callback);
          } catch (e) {
          }

          return;
        }

        var matched = [],i,mech;
        var mechanisms = bodyWrap.getElementsByTagName("mechanism");
        if (mechanisms.length > 0) {
          for (i = 0; i < mechanisms.length; i++) {
            mech = Strophe.getText(mechanisms[i]);
            if (this.mechanisms[mech]) matched.push(this.mechanisms[mech]);
          }
        }

        //console.log('matched', matched, bodyWrap)
        if (matched.length === 0) {
          if (bodyWrap.getElementsByTagName("auth").length === 0) {
            // There are no matching SASL mechanisms and also no legacy
            // auth available.
            this._proto._no_auth_received(_callback);
            return;
          }
        }
        if (this.do_authentication !== false) {
          this.authenticate(matched);
        }
      },

      /** Function: sortMechanismsByPriority
          *
          *  Sorts an array of objects with prototype SASLMechanism according to
          *  their priorities.
          *
          *  Parameters:
          *    (Array) mechanisms - Array of SASL mechanisms.
          *
          */
      sortMechanismsByPriority: function sortMechanismsByPriority(mechanisms) {
        // Sorting mechanisms according to priority.
        var i, j, higher, swap;
        for (i = 0; i < mechanisms.length - 1; ++i) {
          higher = i;
          for (j = i + 1; j < mechanisms.length; ++j) {
            if (mechanisms[j].prototype.priority > mechanisms[higher].prototype.priority) {
              higher = j;
            }
          }
          if (higher != i) {
            swap = mechanisms[i];
            mechanisms[i] = mechanisms[higher];
            mechanisms[higher] = swap;
          }
        }
        return mechanisms;
      },

      /** PrivateFunction: _attemptSASLAuth
          *
          *  Iterate through an array of SASL mechanisms and attempt authentication
          *  with the highest priority (enabled) mechanism.
          *
          *  Parameters:
          *    (Array) mechanisms - Array of SASL mechanisms.
          *
          *  Returns:
          *    (Boolean) mechanism_found - true or false, depending on whether a
          *          valid SASL mechanism was found with which authentication could be
          *          started.
          */
      _attemptSASLAuth: function _attemptSASLAuth(mechanisms) {
        mechanisms = this.sortMechanismsByPriority(mechanisms || []);
        var i = 0,mechanism_found = false;
        for (i = 0; i < mechanisms.length; ++i) {
          if (!mechanisms[i].prototype.test(this)) {
            continue;
          }
          this._sasl_success_handler = this._addSysHandler(
          this._sasl_success_cb.bind(this), null,
          "success", null, null);
          this._sasl_failure_handler = this._addSysHandler(
          this._sasl_failure_cb.bind(this), null,
          "failure", null, null);
          this._sasl_challenge_handler = this._addSysHandler(
          this._sasl_challenge_cb.bind(this), null,
          "challenge", null, null);

          this._sasl_mechanism = new mechanisms[i]();
          this._sasl_mechanism.onStart(this);

          var request_auth_exchange = $build("auth", {
            xmlns: Strophe.NS.SASL,
            mechanism: this._sasl_mechanism.name });

          if (this._sasl_mechanism.isClientFirst) {
            var response = this._sasl_mechanism.onChallenge(this, null);
            request_auth_exchange.t(Base64.encode(response));
          }
          this.send(request_auth_exchange.tree());
          mechanism_found = true;
          break;
        }
        return mechanism_found;
      },

      /** PrivateFunction: _attemptLegacyAuth
          *
          *  Attempt legacy (i.e. non-SASL) authentication.
          *
          */
      _attemptLegacyAuth: function _attemptLegacyAuth() {
        if (Strophe.getNodeFromJid(this.jid) === null) {
          // we don't have a node, which is required for non-anonymous
          // client connections
          this._changeConnectStatus(
          Strophe.Status.CONNFAIL,
          'x-strophe-bad-non-anon-jid');

          this.disconnect('x-strophe-bad-non-anon-jid');
        } else {
          // Fall back to legacy authentication
          this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null);
          this._addSysHandler(
          this._auth1_cb.bind(this),
          null, null, null, "_auth_1");

          this.send($iq({
            'type': "get",
            'to': this.domain,
            'id': "_auth_1" }).
          c("query", { xmlns: Strophe.NS.AUTH }).
          c("username", {}).t(Strophe.getNodeFromJid(this.jid)).
          tree());
        }
      },

      /** Function: authenticate
          * Set up authentication
          *
          *  Continues the initial connection request by setting up authentication
          *  handlers and starting the authentication process.
          *
          *  SASL authentication will be attempted if available, otherwise
          *  the code will fall back to legacy authentication.
          *
          *  Parameters:
          *    (Array) matched - Array of SASL mechanisms supported.
          *
          */
      authenticate: function authenticate(matched) {
        //console.log('authenticate');
        if (!this._attemptSASLAuth(matched)) {
          this._attemptLegacyAuth();
        }
      },

      /** PrivateFunction: _sasl_challenge_cb
          *  _Private_ handler for the SASL challenge
          *
          */
      _sasl_challenge_cb: function _sasl_challenge_cb(elem) {
        var challenge = Base64.decode(Strophe.getText(elem));
        var response = this._sasl_mechanism.onChallenge(this, challenge);
        var stanza = $build('response', {
          'xmlns': Strophe.NS.SASL });

        if (response !== "") {
          stanza.t(Base64.encode(response));
        }
        this.send(stanza.tree());
        return true;
      },

      /** PrivateFunction: _auth1_cb
          *  _Private_ handler for legacy authentication.
          *
          *  This handler is called in response to the initial <iq type='get'/>
          *  for legacy authentication.  It builds an authentication <iq/> and
          *  sends it, creating a handler (calling back to _auth2_cb()) to
          *  handle the result
          *
          *  Parameters:
          *    (XMLElement) elem - The stanza that triggered the callback.
          *
          *  Returns:
          *    false to remove the handler.
          */
      /* jshint unused:false */
      _auth1_cb: function _auth1_cb(elem) {
        // build plaintext auth iq
        var iq = $iq({ type: "set", id: "_auth_2" }).
        c('query', { xmlns: Strophe.NS.AUTH }).
        c('username', {}).t(Strophe.getNodeFromJid(this.jid)).
        up().
        c('password').t(this.pass);

        if (!Strophe.getResourceFromJid(this.jid)) {
          // since the user has not supplied a resource, we pick
          // a default one here.  unlike other auth methods, the server
          // cannot do this for us.
          this.jid = Strophe.getBareJidFromJid(this.jid) + '/strophe';
        }
        iq.up().c('resource', {}).t(Strophe.getResourceFromJid(this.jid));

        this._addSysHandler(this._auth2_cb.bind(this), null,
        null, null, "_auth_2");
        this.send(iq.tree());
        return false;
      },
      /* jshint unused:true */

      /** PrivateFunction: _sasl_success_cb
                                *  _Private_ handler for succesful SASL authentication.
                                *
                                *  Parameters:
                                *    (XMLElement) elem - The matching stanza.
                                *
                                *  Returns:
                                *    false to remove the handler.
                                */
      _sasl_success_cb: function _sasl_success_cb(elem) {
        //console.log('_sasl_success_cb', elem)
        if (this._sasl_data["server-signature"]) {
          var serverSignature;
          var success = Base64.decode(Strophe.getText(elem));
          var attribMatch = /([a-z]+)=([^,]+)(,|$)/;
          var matches = success.match(attribMatch);
          if (matches[1] == "v") {
            serverSignature = matches[2];
          }

          if (serverSignature != this._sasl_data["server-signature"]) {
            // remove old handlers
            this.deleteHandler(this._sasl_failure_handler);
            this._sasl_failure_handler = null;
            if (this._sasl_challenge_handler) {
              this.deleteHandler(this._sasl_challenge_handler);
              this._sasl_challenge_handler = null;
            }

            this._sasl_data = {};
            return this._sasl_failure_cb(null);
          }
        }
        Strophe.info("SASL authentication succeeded.");

        if (this._sasl_mechanism) {
          this._sasl_mechanism.onSuccess();
        }

        // remove old handlers
        this.deleteHandler(this._sasl_failure_handler);
        this._sasl_failure_handler = null;
        if (this._sasl_challenge_handler) {
          this.deleteHandler(this._sasl_challenge_handler);
          this._sasl_challenge_handler = null;
        }

        var streamfeature_handlers = [];
        var wrapper = function wrapper(handlers, elem) {
          while (handlers.length) {
            this.deleteHandler(handlers.pop());
          }
          this._sasl_auth1_cb.bind(this)(elem);
          return false;
        };
        streamfeature_handlers.push(this._addSysHandler(function (elem) {
          wrapper.bind(this)(streamfeature_handlers, elem);
        }.bind(this), null, "stream:features", null, null));
        streamfeature_handlers.push(this._addSysHandler(function (elem) {
          wrapper.bind(this)(streamfeature_handlers, elem);
        }.bind(this), Strophe.NS.STREAM, "features", null, null));

        // we must send an xmpp:restart now
        this._sendRestart();

        return false;
      },

      /** PrivateFunction: _sasl_auth1_cb
          *  _Private_ handler to start stream binding.
          *
          *  Parameters:
          *    (XMLElement) elem - The matching stanza.
          *
          *  Returns:
          *    false to remove the handler.
          */
      _sasl_auth1_cb: function _sasl_auth1_cb(elem) {
        //console.log('_sasl_auth1_cb', elem)

        // save stream:features for future usage
        this.features = elem;
        var i, child;
        for (i = 0; i < elem.childNodes.length; i++) {
          child = elem.childNodes[i];
          if (child.nodeName == 'bind') {
            this.do_bind = true;
          }

          if (child.nodeName == 'session') {
            this.do_session = true;
          }
        }

        if (!this.do_bind) {
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
          return false;
        } else {
          this._addSysHandler(this._sasl_bind_cb.bind(this), null, null,
          null, "_bind_auth_2");

          var resource = Strophe.getResourceFromJid(this.jid);
          if (resource) {
            this.send($iq({ type: "set", id: "_bind_auth_2" }).
            c('bind', { xmlns: Strophe.NS.BIND }).
            c('resource', {}).t(resource).tree());
          } else {
            this.send($iq({ type: "set", id: "_bind_auth_2" }).
            c('bind', { xmlns: Strophe.NS.BIND }).
            tree());
          }
        }
        return false;
      },

      /** PrivateFunction: _sasl_bind_cb
          *  _Private_ handler for binding result and session start.
          *
          *  Parameters:
          *    (XMLElement) elem - The matching stanza.
          *
          *  Returns:
          *    false to remove the handler.
          */
      _sasl_bind_cb: function _sasl_bind_cb(elem) {
        //console.log('_sasl_bind_cb', elem)

        if (elem.getAttribute("type") == "error") {
          Strophe.info("SASL binding failed.");
          var conflict = elem.getElementsByTagName("conflict"),condition;
          if (conflict.length > 0) {
            condition = 'conflict';
          }
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, condition);
          return false;
        }

        // TODO - need to grab errors
        var bind = elem.getElementsByTagName("bind");
        var jidNode;
        if (bind.length > 0) {
          // Grab jid
          jidNode = bind[0].getElementsByTagName("jid");
          if (jidNode.length > 0) {
            this.jid = Strophe.getText(jidNode[0]);

            if (this.do_session) {
              this._addSysHandler(this._sasl_session_cb.bind(this),
              null, null, null, "_session_auth_2");

              this.send($iq({ type: "set", id: "_session_auth_2" }).
              c('session', { xmlns: Strophe.NS.SESSION }).
              tree());
            } else {
              this.authenticated = true;
              this._changeConnectStatus(Strophe.Status.CONNECTED, null);
            }
          }
        } else {
          Strophe.info("SASL binding failed.");
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
          return false;
        }
      },

      /** PrivateFunction: _sasl_session_cb
          *  _Private_ handler to finish successful SASL connection.
          *
          *  This sets Connection.authenticated to true on success, which
          *  starts the processing of user handlers.
          *
          *  Parameters:
          *    (XMLElement) elem - The matching stanza.
          *
          *  Returns:
          *    false to remove the handler.
          */
      _sasl_session_cb: function _sasl_session_cb(elem) {
        if (elem.getAttribute("type") == "result") {
          this.authenticated = true;
          this._changeConnectStatus(Strophe.Status.CONNECTED, null);
        } else if (elem.getAttribute("type") == "error") {
          Strophe.info("Session creation failed.");
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
          return false;
        }
        return false;
      },

      /** PrivateFunction: _sasl_failure_cb
          *  _Private_ handler for SASL authentication failure.
          *
          *  Parameters:
          *    (XMLElement) elem - The matching stanza.
          *
          *  Returns:
          *    false to remove the handler.
          */
      /* jshint unused:false */
      _sasl_failure_cb: function _sasl_failure_cb(elem) {
        // delete unneeded handlers
        if (this._sasl_success_handler) {
          this.deleteHandler(this._sasl_success_handler);
          this._sasl_success_handler = null;
        }
        if (this._sasl_challenge_handler) {
          this.deleteHandler(this._sasl_challenge_handler);
          this._sasl_challenge_handler = null;
        }

        if (this._sasl_mechanism)
        this._sasl_mechanism.onFailure();
        this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
        return false;
      },
      /* jshint unused:true */

      /** PrivateFunction: _auth2_cb
                                *  _Private_ handler to finish legacy authentication.
                                *
                                *  This handler is called when the result from the jabber:iq:auth
                                *  <iq/> stanza is returned.
                                *
                                *  Parameters:
                                *    (XMLElement) elem - The stanza that triggered the callback.
                                *
                                *  Returns:
                                *    false to remove the handler.
                                */
      _auth2_cb: function _auth2_cb(elem) {
        if (elem.getAttribute("type") == "result") {
          this.authenticated = true;
          this._changeConnectStatus(Strophe.Status.CONNECTED, null);
        } else if (elem.getAttribute("type") == "error") {
          this._changeConnectStatus(Strophe.Status.AUTHFAIL, null);
          this.disconnect('authentication failed');
        }
        return false;
      },

      /** PrivateFunction: _addSysTimedHandler
          *  _Private_ function to add a system level timed handler.
          *
          *  This function is used to add a Strophe.TimedHandler for the
          *  library code.  System timed handlers are allowed to run before
          *  authentication is complete.
          *
          *  Parameters:
          *    (Integer) period - The period of the handler.
          *    (Function) handler - The callback function.
          */
      _addSysTimedHandler: function _addSysTimedHandler(period, handler) {
        var thand = new Strophe.TimedHandler(period, handler);
        thand.user = false;
        this.addTimeds.push(thand);
        return thand;
      },

      /** PrivateFunction: _addSysHandler
          *  _Private_ function to add a system level stanza handler.
          *
          *  This function is used to add a Strophe.Handler for the
          *  library code.  System stanza handlers are allowed to run before
          *  authentication is complete.
          *
          *  Parameters:
          *    (Function) handler - The callback function.
          *    (String) ns - The namespace to match.
          *    (String) name - The stanza name to match.
          *    (String) type - The stanza type attribute to match.
          *    (String) id - The stanza id attribute to match.
          */
      _addSysHandler: function _addSysHandler(handler, ns, name, type, id) {
        var hand = new Strophe.Handler(handler, ns, name, type, id);
        hand.user = false;
        this.addHandlers.push(hand);
        return hand;
      },

      /** PrivateFunction: _onDisconnectTimeout
          *  _Private_ timeout handler for handling non-graceful disconnection.
          *
          *  If the graceful disconnect process does not complete within the
          *  time allotted, this handler finishes the disconnect anyway.
          *
          *  Returns:
          *    false to remove the handler.
          */
      _onDisconnectTimeout: function _onDisconnectTimeout() {
        Strophe.info("_onDisconnectTimeout was called");
        this._changeConnectStatus(Strophe.Status.CONNTIMEOUT, null);
        this._proto._onDisconnectTimeout();
        // actually disconnect
        this._doDisconnect();
        return false;
      },

      /** PrivateFunction: _onIdle
          *  _Private_ handler to process events during idle cycle.
          *
          *  This handler is called every 100ms to fire timed handlers that
          *  are ready and keep poll requests going.
          */
      _onIdle: function _onIdle(fail) {
        var i, thand, since, newList;

        // add timed handlers scheduled for addition
        // NOTE: we add before remove in the case a timed handler is
        // added and then deleted before the next _onIdle() call.
        while (this.addTimeds.length > 0) {
          this.timedHandlers.push(this.addTimeds.pop());
        }

        // remove timed handlers that have been scheduled for deletion
        while (this.removeTimeds.length > 0) {
          thand = this.removeTimeds.pop();
          i = this.timedHandlers.indexOf(thand);
          if (i >= 0) {
            this.timedHandlers.splice(i, 1);
          }
        }

        // call ready timed handlers
        var now = new Date().getTime();
        newList = [];
        for (i = 0; i < this.timedHandlers.length; i++) {
          thand = this.timedHandlers[i];
          if (this.authenticated || !thand.user) {
            since = thand.lastCalled + thand.period;
            if (since - now <= 0) {
              if (thand.run()) {
                newList.push(thand);
              }
            } else {
              newList.push(thand);
            }
          }
        }
        this.timedHandlers = newList;

        clearTimeout(this._idleTimeout);

        this._proto._onIdle(fail);

        // reactivate the timer only if connected
        if (this.connected) {
          // XXX: setTimeout should be called only with function expressions (23974bc1)
          this._idleTimeout = setTimeout(function () {
            this._onIdle(fail);
          }.bind(this), 100);
        }
      } };


    /** Class: Strophe.SASLMechanism
            *
            *  encapsulates SASL authentication mechanisms.
            *
            *  User code may override the priority for each mechanism or disable it completely.
            *  See <priority> for information about changing priority and <test> for informatian on
            *  how to disable a mechanism.
            *
            *  By default, all mechanisms are enabled and the priorities are
            *
            *  EXTERNAL - 60
            *  OAUTHBEARER - 50
            *  SCRAM-SHA1 - 40
            *  DIGEST-MD5 - 30
            *  PLAIN - 20
            *  ANONYMOUS - 10
            *
            *  See: Strophe.Connection.addSupportedSASLMechanisms
            */

    /**
                * PrivateConstructor: Strophe.SASLMechanism
                * SASL auth mechanism abstraction.
                *
                *  Parameters:
                *    (String) name - SASL Mechanism name.
                *    (Boolean) isClientFirst - If client should send response first without challenge.
                *    (Number) priority - Priority.
                *
                *  Returns:
                *    A new Strophe.SASLMechanism object.
                */
    Strophe.SASLMechanism = function (name, isClientFirst, priority) {
      /** PrivateVariable: name
                                                                       *  Mechanism name.
                                                                       */
      this.name = name;
      /** PrivateVariable: isClientFirst
                         *  If client sends response without initial server challenge.
                         */
      this.isClientFirst = isClientFirst;
      /** Variable: priority
                                           *  Determines which <SASLMechanism> is chosen for authentication (Higher is better).
                                           *  Users may override this to prioritize mechanisms differently.
                                           *
                                           *  In the default configuration the priorities are
                                           *
                                           *  SCRAM-SHA1 - 40
                                           *  DIGEST-MD5 - 30
                                           *  Plain - 20
                                           *
                                           *  Example: (This will cause Strophe to choose the mechanism that the server sent first)
                                           *
                                           *  > Strophe.SASLMD5.priority = Strophe.SASLSHA1.priority;
                                           *
                                           *  See <SASL mechanisms> for a list of available mechanisms.
                                           *
                                           */
      this.priority = priority;
    };

    Strophe.SASLMechanism.prototype = {
      /**
                                         *  Function: test
                                         *  Checks if mechanism able to run.
                                         *  To disable a mechanism, make this return false;
                                         *
                                         *  To disable plain authentication run
                                         *  > Strophe.SASLPlain.test = function() {
                                        *  >   return false;
                                        *  > }
                                         *
                                         *  See <SASL mechanisms> for a list of available mechanisms.
                                         *
                                         *  Parameters:
                                         *    (Strophe.Connection) connection - Target Connection.
                                         *
                                         *  Returns:
                                         *    (Boolean) If mechanism was able to run.
                                         */
      /* jshint unused:false */
      test: function test(connection) {
        return true;
      },
      /* jshint unused:true */

      /** PrivateFunction: onStart
                                *  Called before starting mechanism on some connection.
                                *
                                *  Parameters:
                                *    (Strophe.Connection) connection - Target Connection.
                                */
      onStart: function onStart(connection) {
        this._connection = connection;
      },

      /** PrivateFunction: onChallenge
          *  Called by protocol implementation on incoming challenge. If client is
          *  first (isClientFirst == true) challenge will be null on the first call.
          *
          *  Parameters:
          *    (Strophe.Connection) connection - Target Connection.
          *    (String) challenge - current challenge to handle.
          *
          *  Returns:
          *    (String) Mechanism response.
          */
      /* jshint unused:false */
      onChallenge: function onChallenge(connection, challenge) {
        throw new Error("You should implement challenge handling!");
      },
      /* jshint unused:true */

      /** PrivateFunction: onFailure
                                *  Protocol informs mechanism implementation about SASL failure.
                                */
      onFailure: function onFailure() {
        this._connection = null;
      },

      /** PrivateFunction: onSuccess
          *  Protocol informs mechanism implementation about SASL success.
          */
      onSuccess: function onSuccess() {
        this._connection = null;
      } };


    /** Constants: SASL mechanisms
            *  Available authentication mechanisms
            *
            *  Strophe.SASLAnonymous - SASL ANONYMOUS authentication.
            *  Strophe.SASLPlain - SASL PLAIN authentication.
            *  Strophe.SASLMD5 - SASL DIGEST-MD5 authentication
            *  Strophe.SASLSHA1 - SASL SCRAM-SHA1 authentication
            *  Strophe.SASLOAuthBearer - SASL OAuth Bearer authentication
            *  Strophe.SASLExternal - SASL EXTERNAL authentication
            */

    // Building SASL callbacks

    /** PrivateConstructor: SASLAnonymous
     *  SASL ANONYMOUS authentication.
     */
    Strophe.SASLAnonymous = function () {
    };
    Strophe.SASLAnonymous.prototype = new Strophe.SASLMechanism("ANONYMOUS", false, 10);

    Strophe.SASLAnonymous.prototype.test = function (connection) {
      return connection.authcid === null;
    };


    /** PrivateConstructor: SASLPlain
        *  SASL PLAIN authentication.
        */
    Strophe.SASLPlain = function () {
    };
    Strophe.SASLPlain.prototype = new Strophe.SASLMechanism("PLAIN", true, 20);

    Strophe.SASLPlain.prototype.test = function (connection) {
      return connection.authcid !== null;
    };

    Strophe.SASLPlain.prototype.onChallenge = function (connection) {
      var auth_str = connection.authzid;
      auth_str = auth_str + "\0";
      auth_str = auth_str + connection.authcid;
      auth_str = auth_str + "\0";
      auth_str = auth_str + connection.pass;
      return utils.utf16to8(auth_str);
    };


    /** PrivateConstructor: SASLSHA1
        *  SASL SCRAM SHA 1 authentication.
        */
    Strophe.SASLSHA1 = function () {
    };
    Strophe.SASLSHA1.prototype = new Strophe.SASLMechanism("SCRAM-SHA-1", true, 40);

    Strophe.SASLSHA1.prototype.test = function (connection) {
      return connection.authcid !== null;
    };

    Strophe.SASLSHA1.prototype.onChallenge = function (connection, challenge, test_cnonce) {
      var cnonce = test_cnonce || MD5.hexdigest(Math.random() * 1234567890);
      var auth_str = "n=" + utils.utf16to8(connection.authcid);
      auth_str += ",r=";
      auth_str += cnonce;
      connection._sasl_data.cnonce = cnonce;
      connection._sasl_data["client-first-message-bare"] = auth_str;

      auth_str = "n,," + auth_str;

      this.onChallenge = function (connection, challenge) {
        var nonce, salt, iter, Hi, U, U_old, i, k, pass;
        var clientKey, serverKey, clientSignature;
        var responseText = "c=biws,";
        var authMessage = connection._sasl_data["client-first-message-bare"] + "," +
        challenge + ",";
        var cnonce = connection._sasl_data.cnonce;
        var attribMatch = /([a-z]+)=([^,]+)(,|$)/;

        while (challenge.match(attribMatch)) {
          var matches = challenge.match(attribMatch);
          challenge = challenge.replace(matches[0], "");
          switch (matches[1]) {
            case "r":
              nonce = matches[2];
              break;
            case "s":
              salt = matches[2];
              break;
            case "i":
              iter = matches[2];
              break;}

        }

        if (nonce.substr(0, cnonce.length) !== cnonce) {
          connection._sasl_data = {};
          return connection._sasl_failure_cb();
        }

        responseText += "r=" + nonce;
        authMessage += responseText;

        salt = Base64.decode(salt);
        salt += "\x00\x00\x00\x01";

        pass = utils.utf16to8(connection.pass);
        Hi = U_old = SHA1.core_hmac_sha1(pass, salt);
        for (i = 1; i < iter; i++) {
          U = SHA1.core_hmac_sha1(pass, SHA1.binb2str(U_old));
          for (k = 0; k < 5; k++) {
            Hi[k] ^= U[k];
          }
          U_old = U;
        }
        Hi = SHA1.binb2str(Hi);

        clientKey = SHA1.core_hmac_sha1(Hi, "Client Key");
        serverKey = SHA1.str_hmac_sha1(Hi, "Server Key");
        clientSignature = SHA1.core_hmac_sha1(SHA1.str_sha1(SHA1.binb2str(clientKey)), authMessage);
        connection._sasl_data["server-signature"] = SHA1.b64_hmac_sha1(serverKey, authMessage);

        for (k = 0; k < 5; k++) {
          clientKey[k] ^= clientSignature[k];
        }

        responseText += ",p=" + Base64.encode(SHA1.binb2str(clientKey));
        return responseText;
      }.bind(this);

      return auth_str;
    };


    /** PrivateConstructor: SASLMD5
        *  SASL DIGEST MD5 authentication.
        */
    Strophe.SASLMD5 = function () {
    };
    Strophe.SASLMD5.prototype = new Strophe.SASLMechanism("DIGEST-MD5", false, 30);

    Strophe.SASLMD5.prototype.test = function (connection) {
      return connection.authcid !== null;
    };

    /** PrivateFunction: _quote
        *  _Private_ utility function to backslash escape and quote strings.
        *
        *  Parameters:
        *    (String) str - The string to be quoted.
        *
        *  Returns:
        *    quoted string
        */
    Strophe.SASLMD5.prototype._quote = function (str) {
      return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
      //" end string workaround for emacs
    };

    Strophe.SASLMD5.prototype.onChallenge = function (connection, challenge, test_cnonce) {
      var attribMatch = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/;
      var cnonce = test_cnonce || MD5.hexdigest("" + Math.random() * 1234567890);
      var realm = "";
      var host = null;
      var nonce = "";
      var qop = "";
      var matches;

      while (challenge.match(attribMatch)) {
        matches = challenge.match(attribMatch);
        challenge = challenge.replace(matches[0], "");
        matches[2] = matches[2].replace(/^"(.+)"$/, "$1");
        switch (matches[1]) {
          case "realm":
            realm = matches[2];
            break;
          case "nonce":
            nonce = matches[2];
            break;
          case "qop":
            qop = matches[2];
            break;
          case "host":
            host = matches[2];
            break;}

      }

      var digest_uri = connection.servtype + "/" + connection.domain;
      if (host !== null) {
        digest_uri = digest_uri + "/" + host;
      }

      var cred = utils.utf16to8(connection.authcid + ":" + realm + ":" + this._connection.pass);
      var A1 = MD5.hash(cred) + ":" + nonce + ":" + cnonce;
      var A2 = 'AUTHENTICATE:' + digest_uri;

      var responseText = "";
      responseText += 'charset=utf-8,';
      responseText += 'username=' + this._quote(utils.utf16to8(connection.authcid)) + ',';
      responseText += 'realm=' + this._quote(realm) + ',';
      responseText += 'nonce=' + this._quote(nonce) + ',';
      responseText += 'nc=00000001,';
      responseText += 'cnonce=' + this._quote(cnonce) + ',';
      responseText += 'digest-uri=' + this._quote(digest_uri) + ',';
      responseText += 'response=' + MD5.hexdigest(MD5.hexdigest(A1) + ":" +
      nonce + ":00000001:" +
      cnonce + ":auth:" +
      MD5.hexdigest(A2)) + ",";
      responseText += 'qop=auth';

      this.onChallenge = function () {
        return "";
      };
      return responseText;
    };


    /** PrivateConstructor: SASLOAuthBearer
        *  SASL OAuth Bearer authentication.
        */
    Strophe.SASLOAuthBearer = function () {
    };
    Strophe.SASLOAuthBearer.prototype = new Strophe.SASLMechanism("OAUTHBEARER", true, 50);

    Strophe.SASLOAuthBearer.prototype.test = function (connection) {
      return connection.authcid !== null;
    };

    Strophe.SASLOAuthBearer.prototype.onChallenge = function (connection) {
      var auth_str = 'n,a=';
      auth_str = auth_str + connection.authzid;
      auth_str = auth_str + ',';
      auth_str = auth_str + "\x01";
      auth_str = auth_str + 'auth=Bearer ';
      auth_str = auth_str + connection.pass;
      auth_str = auth_str + "\x01";
      auth_str = auth_str + "\x01";
      return utils.utf16to8(auth_str);
    };


    /** PrivateConstructor: SASLExternal
        *  SASL EXTERNAL authentication.
        *
        *  The EXTERNAL mechanism allows a client to request the server to use
        *  credentials established by means external to the mechanism to
        *  authenticate the client. The external means may be, for instance,
        *  TLS services.
        */
    Strophe.SASLExternal = function () {
    };
    Strophe.SASLExternal.prototype = new Strophe.SASLMechanism("EXTERNAL", true, 60);

    Strophe.SASLExternal.prototype.onChallenge = function (connection) {
      /** According to XEP-178, an authzid SHOULD NOT be presented when the
                                                                         * authcid contained or implied in the client certificate is the JID (i.e.
                                                                         * authzid) with which the user wants to log in as.
                                                                         *
                                                                         * To NOT send the authzid, the user should therefore set the authcid equal
                                                                         * to the JID when instantiating a new Strophe.Connection object.
                                                                         */
      return connection.authcid === connection.authzid ? '' : connection.authzid;
    };

    return {
      Strophe: Strophe,
      $build: $build,
      $msg: $msg,
      $iq: $iq,
      $pres: $pres,
      SHA1: SHA1,
      Base64: Base64,
      MD5: MD5 };

  });


  /*
       This program is distributed under the terms of the MIT license.
       Please see the LICENSE file for details.
      	 Copyright 2006-2008, OGG, LLC
       */


  /* jshint undef: true, unused: true:, noarg: true, latedef: true */
  /* global define, window, setTimeout, clearTimeout, XMLHttpRequest, ActiveXObject, Strophe, $build */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_5__], __WEBPACK_LOCAL_MODULE_6__ = ((function (core) {
        return factory(
        core.Strophe,
        core.$build);

      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
    } else {}
  })(this, function (Strophe, $build) {

    /** PrivateClass: Strophe.Request
                                        *  _Private_ helper class that provides a cross implementation abstraction
                                        *  for a BOSH related XMLHttpRequest.
                                        *
                                        *  The Strophe.Request class is used internally to encapsulate BOSH request
                                        *  information.  It is not meant to be used from user's code.
                                        */

    /** PrivateConstructor: Strophe.Request
                                            *  Create and initialize a new Strophe.Request object.
                                            *
                                            *  Parameters:
                                            *    (XMLElement) elem - The XML data to be sent in the request.
                                            *    (Function) func - The function that will be called when the
                                            *      XMLHttpRequest readyState changes.
                                            *    (Integer) rid - The BOSH rid attribute associated with this request.
                                            *    (Integer) sends - The number of times this same request has been sent.
                                            */
    Strophe.Request = function (elem, func, rid, sends) {
      this.id = ++Strophe._requestId;
      this.xmlData = elem;
      this.data = Strophe.serialize(elem);
      // save original function in case we need to make a new request
      // from this one.
      this.origFunc = func;
      this.func = func;
      this.rid = rid;
      this.date = NaN;
      this.sends = sends || 0;
      this.abort = false;
      this.dead = null;

      this.age = function () {
        if (!this.date) {
          return 0;
        }
        var now = new Date();
        return (now - this.date) / 1000;
      };
      this.timeDead = function () {
        if (!this.dead) {
          return 0;
        }
        var now = new Date();
        return (now - this.dead) / 1000;
      };
      this.xhr = this._newXHR();
    };

    Strophe.Request.prototype = {
      /** PrivateFunction: getResponse
                                   *  Get a response from the underlying XMLHttpRequest.
                                   *
                                   *  This function attempts to get a response from the request and checks
                                   *  for errors.
                                   *
                                   *  Throws:
                                   *    "parsererror" - A parser error occured.
                                   *    "badformat" - The entity has sent XML that cannot be processed.
                                   *
                                   *  Returns:
                                   *    The DOM element tree of the response.
                                   */
      getResponse: function getResponse() {
        var node = null;
        if (this.xhr.responseXML && this.xhr.responseXML.documentElement) {
          node = this.xhr.responseXML.documentElement;
          if (node.tagName == "parsererror") {
            Strophe.error("invalid response received");
            Strophe.error("responseText: " + this.xhr.responseText);
            Strophe.error("responseXML: " +
            Strophe.serialize(this.xhr.responseXML));
            throw "parsererror";
          }
        } else if (this.xhr.responseText) {
          Strophe.error("invalid response received");
          Strophe.error("responseText: " + this.xhr.responseText);
          throw "badformat";
        }

        return node;
      },

      /** PrivateFunction: _newXHR
          *  _Private_ helper function to create XMLHttpRequests.
          *
          *  This function creates XMLHttpRequests across all implementations.
          *
          *  Returns:
          *    A new XMLHttpRequest.
          */
      _newXHR: function _newXHR() {
        var xhr = null;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/xml; charset=utf-8");
          }
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // use Function.bind() to prepend ourselves as an argument
        xhr.onreadystatechange = this.func.bind(null, this);
        return xhr;
      } };


    /** Class: Strophe.Bosh
            *  _Private_ helper class that handles BOSH Connections
            *
            *  The Strophe.Bosh class is used internally by Strophe.Connection
            *  to encapsulate BOSH sessions. It is not meant to be used from user's code.
            */

    /** File: bosh.js
                *  A JavaScript library to enable BOSH in Strophejs.
                *
                *  this library uses Bidirectional-streams Over Synchronous HTTP (BOSH)
                *  to emulate a persistent, stateful, two-way connection to an XMPP server.
                *  More information on BOSH can be found in XEP 124.
                */

    /** PrivateConstructor: Strophe.Bosh
                    *  Create and initialize a Strophe.Bosh object.
                    *
                    *  Parameters:
                    *    (Strophe.Connection) connection - The Strophe.Connection that will use BOSH.
                    *
                    *  Returns:
                    *    A new Strophe.Bosh object.
                    */
    Strophe.Bosh = function (connection) {
      this._conn = connection;
      /* request id for body tags */
      this.rid = Math.floor(Math.random() * 4294967295);
      /* The current session ID. */
      this.sid = null;

      // default BOSH values
      this.hold = 1;
      this.wait = 60;
      this.window = 5;
      this.errors = 0;

      this._requests = [];
    };

    Strophe.Bosh.prototype = {
      /** Variable: strip
                                *
                                *  BOSH-Connections will have all stanzas wrapped in a <body> tag when
                                *  passed to <Strophe.Connection.xmlInput> or <Strophe.Connection.xmlOutput>.
                                *  To strip this tag, User code can set <Strophe.Bosh.strip> to "body":
                                *
                                *  > Strophe.Bosh.prototype.strip = "body";
                                *
                                *  This will enable stripping of the body tag in both
                                *  <Strophe.Connection.xmlInput> and <Strophe.Connection.xmlOutput>.
                                */
      strip: null,

      /** PrivateFunction: _buildBody
                    *  _Private_ helper function to generate the <body/> wrapper for BOSH.
                    *
                    *  Returns:
                    *    A Strophe.Builder with a <body/> element.
                    */
      _buildBody: function _buildBody() {
        var bodyWrap = $build('body', {
          rid: this.rid++,
          xmlns: Strophe.NS.HTTPBIND });

        if (this.sid !== null) {
          bodyWrap.attrs({ sid: this.sid });
        }
        if (this._conn.options.keepalive && this._conn._sessionCachingSupported()) {
          this._cacheSession();
        }
        return bodyWrap;
      },

      /** PrivateFunction: _reset
          *  Reset the connection.
          *
          *  This function is called by the reset function of the Strophe Connection
          */
      _reset: function _reset() {
        this.rid = Math.floor(Math.random() * 4294967295);
        this.sid = null;
        this.errors = 0;
        if (this._conn._sessionCachingSupported()) {
          window.sessionStorage.removeItem('strophe-bosh-session');
        }

        this._conn.nextValidRid(this.rid);
      },

      /** PrivateFunction: _connect
          *  _Private_ function that initializes the BOSH connection.
          *
          *  Creates and sends the Request that initializes the BOSH connection.
          */
      _connect: function _connect(wait, hold, route) {
        this.wait = wait || this.wait;
        this.hold = hold || this.hold;
        this.errors = 0;

        // build the body tag
        var body = this._buildBody().attrs({
          to: this._conn.domain,
          "xml:lang": "en",
          wait: this.wait,
          hold: this.hold,
          content: "text/xml; charset=utf-8",
          ver: "1.6",
          "xmpp:version": "1.0",
          "xmlns:xmpp": Strophe.NS.BOSH });


        if (route) {
          body.attrs({
            route: route });

        }

        var _connect_cb = this._conn._connect_cb;

        this._requests.push(
        new Strophe.Request(body.tree(),
        this._onRequestStateChange.bind(
        this, _connect_cb.bind(this._conn)),
        body.tree().getAttribute("rid")));
        this._throttledRequestHandler();
      },

      /** PrivateFunction: _attach
          *  Attach to an already created and authenticated BOSH session.
          *
          *  This function is provided to allow Strophe to attach to BOSH
          *  sessions which have been created externally, perhaps by a Web
          *  application.  This is often used to support auto-login type features
          *  without putting user credentials into the page.
          *
          *  Parameters:
          *    (String) jid - The full JID that is bound by the session.
          *    (String) sid - The SID of the BOSH session.
          *    (String) rid - The current RID of the BOSH session.  This RID
          *      will be used by the next request.
          *    (Function) callback The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *      Other settings will require tweaks to the Strophe.TIMEOUT value.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (Integer) wind - The optional HTTBIND window value.  This is the
          *      allowed range of request ids that are valid.  The default is 5.
          */
      _attach: function _attach(jid, sid, rid, callback, wait, hold, wind) {
        this._conn.jid = jid;
        this.sid = sid;
        this.rid = rid;

        this._conn.connect_callback = callback;

        this._conn.domain = Strophe.getDomainFromJid(this._conn.jid);

        this._conn.authenticated = true;
        this._conn.connected = true;

        this.wait = wait || this.wait;
        this.hold = hold || this.hold;
        this.window = wind || this.window;

        this._conn._changeConnectStatus(Strophe.Status.ATTACHED, null);
      },

      /** PrivateFunction: _restore
          *  Attempt to restore a cached BOSH session
          *
          *  Parameters:
          *    (String) jid - The full JID that is bound by the session.
          *      This parameter is optional but recommended, specifically in cases
          *      where prebinded BOSH sessions are used where it's important to know
          *      that the right session is being restored.
          *    (Function) callback The connect callback function.
          *    (Integer) wait - The optional HTTPBIND wait value.  This is the
          *      time the server will wait before returning an empty result for
          *      a request.  The default setting of 60 seconds is recommended.
          *      Other settings will require tweaks to the Strophe.TIMEOUT value.
          *    (Integer) hold - The optional HTTPBIND hold value.  This is the
          *      number of connections the server will hold at one time.  This
          *      should almost always be set to 1 (the default).
          *    (Integer) wind - The optional HTTBIND window value.  This is the
          *      allowed range of request ids that are valid.  The default is 5.
          */
      _restore: function _restore(jid, callback, wait, hold, wind) {
        var session = JSON.parse(window.sessionStorage.getItem('strophe-bosh-session'));
        if (typeof session !== "undefined" &&
        session !== null &&
        session.rid &&
        session.sid &&
        session.jid && (
        typeof jid === "undefined" || jid === null || Strophe.getBareJidFromJid(session.jid) == Strophe.getBareJidFromJid(jid))) {
          this._conn.restored = true;
          this._attach(session.jid, session.sid, session.rid, callback, wait, hold, wind);
        } else {
          throw { name: "StropheSessionError", message: "_restore: no restoreable session." };
        }
      },

      /** PrivateFunction: _cacheSession
          *  _Private_ handler for the beforeunload event.
          *
          *  This handler is used to process the Bosh-part of the initial request.
          *  Parameters:
          *    (Strophe.Request) bodyWrap - The received stanza.
          */
      _cacheSession: function _cacheSession() {
        if (this._conn.authenticated) {
          if (this._conn.jid && this.rid && this.sid) {
            window.sessionStorage.setItem('strophe-bosh-session', JSON.stringify({
              'jid': this._conn.jid,
              'rid': this.rid,
              'sid': this.sid }));

          }
        } else {
          window.sessionStorage.removeItem('strophe-bosh-session');
        }
      },

      /** PrivateFunction: _connect_cb
          *  _Private_ handler for initial connection request.
          *
          *  This handler is used to process the Bosh-part of the initial request.
          *  Parameters:
          *    (Strophe.Request) bodyWrap - The received stanza.
          */
      _connect_cb: function _connect_cb(bodyWrap) {
        var typ = bodyWrap.getAttribute("type");
        var cond, conflict;
        if (typ !== null && typ == "terminate") {
          // an error occurred
          cond = bodyWrap.getAttribute("condition");
          Strophe.error("BOSH-Connection failed: " + cond);
          conflict = bodyWrap.getElementsByTagName("conflict");
          if (cond !== null) {
            if (cond == "remote-stream-error" && conflict.length > 0) {
              cond = "conflict";
            }
            this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
          } else {
            this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
          }
          this._conn._doDisconnect(cond);
          return Strophe.Status.CONNFAIL;
        }

        // check to make sure we don't overwrite these if _connect_cb is
        // called multiple times in the case of missing stream:features
        if (!this.sid) {
          this.sid = bodyWrap.getAttribute("sid");
        }
        var wind = bodyWrap.getAttribute('requests');
        if (wind) {
          this.window = parseInt(wind, 10);
        }
        var hold = bodyWrap.getAttribute('hold');
        if (hold) {
          this.hold = parseInt(hold, 10);
        }
        var wait = bodyWrap.getAttribute('wait');
        if (wait) {
          this.wait = parseInt(wait, 10);
        }
      },

      /** PrivateFunction: _disconnect
          *  _Private_ part of Connection.disconnect for Bosh
          *
          *  Parameters:
          *    (Request) pres - This stanza will be sent before disconnecting.
          */
      _disconnect: function _disconnect(pres) {
        this._sendTerminate(pres);
      },

      /** PrivateFunction: _doDisconnect
          *  _Private_ function to disconnect.
          *
          *  Resets the SID and RID.
          */
      _doDisconnect: function _doDisconnect() {
        this.sid = null;
        this.rid = Math.floor(Math.random() * 4294967295);
        if (this._conn._sessionCachingSupported()) {
          window.sessionStorage.removeItem('strophe-bosh-session');
        }

        this._conn.nextValidRid(this.rid);
      },

      /** PrivateFunction: _emptyQueue
          * _Private_ function to check if the Request queue is empty.
          *
          *  Returns:
          *    True, if there are no Requests queued, False otherwise.
          */
      _emptyQueue: function _emptyQueue() {
        return this._requests.length === 0;
      },

      /** PrivateFunction: _callProtocolErrorHandlers
          *  _Private_ function to call error handlers registered for HTTP errors.
          *
          *  Parameters:
          *    (Strophe.Request) req - The request that is changing readyState.
          */
      _callProtocolErrorHandlers: function _callProtocolErrorHandlers(req) {
        var reqStatus = this._getRequestStatus(req),
        err_callback;
        err_callback = this._conn.protocolErrorHandlers.HTTP[reqStatus];
        if (err_callback) {
          err_callback.call(this, reqStatus);
        }
      },

      /** PrivateFunction: _hitError
          *  _Private_ function to handle the error count.
          *
          *  Requests are resent automatically until their error count reaches
          *  5.  Each time an error is encountered, this function is called to
          *  increment the count and disconnect if the count is too high.
          *
          *  Parameters:
          *    (Integer) reqStatus - The request status.
          */
      _hitError: function _hitError(reqStatus) {
        this.errors++;
        Strophe.warn("request errored, status: " + reqStatus +
        ", number of errors: " + this.errors);
        if (this.errors > 4) {
          this._conn._onDisconnectTimeout();
        }
      },

      /** PrivateFunction: _no_auth_received
          *
          * Called on stream start/restart when no stream:features
          * has been received and sends a blank poll request.
          */
      _no_auth_received: function _no_auth_received(_callback) {
        //console.log('_no_auth_received')

        if (_callback) {
          _callback = _callback.bind(this._conn);
        } else {
          _callback = this._conn._connect_cb.bind(this._conn);
        }
        var body = this._buildBody();
        this._requests.push(
        new Strophe.Request(body.tree(),
        this._onRequestStateChange.bind(
        this, _callback.bind(this._conn)),
        body.tree().getAttribute("rid")));
        //console.log(this._requests)
        this._throttledRequestHandler();
      },

      /** PrivateFunction: _onDisconnectTimeout
          *  _Private_ timeout handler for handling non-graceful disconnection.
          *
          *  Cancels all remaining Requests and clears the queue.
          */
      _onDisconnectTimeout: function _onDisconnectTimeout() {
        this._abortAllRequests();
      },

      /** PrivateFunction: _abortAllRequests
          *  _Private_ helper function that makes sure all pending requests are aborted.
          */
      _abortAllRequests: function _abortAllRequests() {
        var req;
        while (this._requests.length > 0) {
          req = this._requests.pop();
          req.abort = true;
          req.xhr.abort();
          // jslint complains, but this is fine. setting to empty func
          // is necessary for IE6
          req.xhr.onreadystatechange = function () {
          }; // jshint ignore:line
        }
      },

      /** PrivateFunction: _onIdle
          *  _Private_ handler called by Strophe.Connection._onIdle
          *
          *  Sends all queued Requests or polls with empty Request if there are none.
          */
      _onIdle: function _onIdle() {
        var data = this._conn._data;
        // if no requests are in progress, poll
        if (this._conn.authenticated && this._requests.length === 0 &&
        data.length === 0 && !this._conn.disconnecting) {
          Strophe.info("no requests during idle cycle, sending " +
          "blank request");
          data.push(null);
        }

        if (this._conn.paused) {
          return;
        }

        if (this._requests.length < 2 && data.length > 0) {
          var body = this._buildBody();
          for (var i = 0; i < data.length; i++) {
            if (data[i] !== null) {
              if (data[i] === "restart") {
                body.attrs({
                  to: this._conn.domain,
                  "xml:lang": "en",
                  "xmpp:restart": "true",
                  "xmlns:xmpp": Strophe.NS.BOSH });

              } else {
                body.cnode(data[i]).up();
              }
            }
          }
          delete this._conn._data;
          this._conn._data = [];
          this._requests.push(
          new Strophe.Request(body.tree(),
          this._onRequestStateChange.bind(
          this, this._conn._dataRecv.bind(this._conn)),
          body.tree().getAttribute("rid")));
          this._throttledRequestHandler();
        }

        if (this._requests.length > 0) {
          var time_elapsed = this._requests[0].age();
          if (this._requests[0].dead !== null) {
            if (this._requests[0].timeDead() >
            Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) {
              this._throttledRequestHandler();
            }
          }

          if (time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait)) {
            Strophe.warn("Request " +
            this._requests[0].id +
            " timed out, over " + Math.floor(Strophe.TIMEOUT * this.wait) +
            " seconds since last activity");
            this._throttledRequestHandler();
          }
        }
      },

      /** PrivateFunction: _getRequestStatus
          *
          *  Returns the HTTP status code from a Strophe.Request
          *
          *  Parameters:
          *    (Strophe.Request) req - The Strophe.Request instance.
          *    (Integer) def - The default value that should be returned if no
          *          status value was found.
          */
      _getRequestStatus: function _getRequestStatus(req, def) {
        var reqStatus;
        if (req.xhr.readyState == 4) {
          try {
            reqStatus = req.xhr.status;
          } catch (e) {
            // ignore errors from undefined status attribute. Works
            // around a browser bug
            Strophe.error(
            "Caught an error while retrieving a request's status, " +
            "reqStatus: " + reqStatus);
          }
        }
        if (typeof reqStatus == "undefined") {
          reqStatus = typeof def === 'number' ? def : 0;
        }
        return reqStatus;
      },

      /** PrivateFunction: _onRequestStateChange
          *  _Private_ handler for Strophe.Request state changes.
          *
          *  This function is called when the XMLHttpRequest readyState changes.
          *  It contains a lot of error handling logic for the many ways that
          *  requests can fail, and calls the request callback when requests
          *  succeed.
          *
          *  Parameters:
          *    (Function) func - The handler for the request.
          *    (Strophe.Request) req - The request that is changing readyState.
          */
      _onRequestStateChange: function _onRequestStateChange(func, req) {
        Strophe.debug("request id " + req.id + "." + req.sends +
        " state changed to " + req.xhr.readyState);
        if (req.abort) {
          req.abort = false;
          return;
        }
        if (req.xhr.readyState !== 4) {
          // The request is not yet complete
          return;
        }
        var reqStatus = this._getRequestStatus(req);
        if (this.disconnecting && reqStatus >= 400) {
          this._hitError(reqStatus);
          this._callProtocolErrorHandlers(req);
          return;
        }

        if (reqStatus > 0 && reqStatus < 500 || req.sends > 5) {
          // remove from internal queue
          this._removeRequest(req);
          Strophe.debug("request id " + req.id + " should now be removed");
        }

        if (reqStatus == 200) {
          // request succeeded
          var reqIs0 = this._requests[0] == req;
          var reqIs1 = this._requests[1] == req;
          // if request 1 finished, or request 0 finished and request
          // 1 is over Strophe.SECONDARY_TIMEOUT seconds old, we need to
          // restart the other - both will be in the first spot, as the
          // completed request has been removed from the queue already
          if (reqIs1 ||
          reqIs0 && this._requests.length > 0 &&
          this._requests[0].age() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait)) {
            this._restartRequest(0);
          }
          this._conn.nextValidRid(Number(req.rid) + 1);
          Strophe.debug("request id " + req.id + "." + req.sends + " got 200");
          func(req); // call handler
          this.errors = 0;
        } else if (reqStatus === 0 ||
        reqStatus >= 400 && reqStatus < 600 ||
        reqStatus >= 12000) {
          // request failed
          Strophe.error("request id " + req.id + "." + req.sends + " error " + reqStatus + " happened");
          this._hitError(reqStatus);
          this._callProtocolErrorHandlers(req);
          if (reqStatus >= 400 && reqStatus < 500) {
            this._conn._changeConnectStatus(Strophe.Status.DISCONNECTING, null);
            this._conn._doDisconnect();
          }
        } else {
          Strophe.error("request id " + req.id + "." + req.sends + " error " + reqStatus + " happened");
        }
        if (!(reqStatus > 0 && reqStatus < 500) || req.sends > 5) {
          this._throttledRequestHandler();
        }
      },

      /** PrivateFunction: _processRequest
          *  _Private_ function to process a request in the queue.
          *
          *  This function takes requests off the queue and sends them and
          *  restarts dead requests.
          *
          *  Parameters:
          *    (Integer) i - The index of the request in the queue.
          */
      _processRequest: function _processRequest(i) {
        var self = this;
        var req = this._requests[i];
        var reqStatus = this._getRequestStatus(req, -1);

        // make sure we limit the number of retries
        if (req.sends > this._conn.maxRetries) {
          this._conn._onDisconnectTimeout();
          return;
        }

        var time_elapsed = req.age();
        var primaryTimeout = !isNaN(time_elapsed) &&
        time_elapsed > Math.floor(Strophe.TIMEOUT * this.wait);
        var secondaryTimeout = req.dead !== null &&
        req.timeDead() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait);
        var requestCompletedWithServerError = req.xhr.readyState == 4 && (
        reqStatus < 1 || reqStatus >= 500);
        if (primaryTimeout || secondaryTimeout ||
        requestCompletedWithServerError) {
          if (secondaryTimeout) {
            Strophe.error("Request " + this._requests[i].id +
            " timed out (secondary), restarting");
          }
          req.abort = true;
          req.xhr.abort();
          // setting to null fails on IE6, so set to empty function
          req.xhr.onreadystatechange = function () {
          };
          this._requests[i] = new Strophe.Request(req.xmlData,
          req.origFunc,
          req.rid,
          req.sends);
          req = this._requests[i];
        }

        if (req.xhr.readyState === 0) {
          Strophe.debug("request id " + req.id + "." + req.sends + " posting");

          try {
            var contentType = this._conn.options.contentType || "text/xml; charset=utf-8";
            req.xhr.open("POST", this._conn.service, this._conn.options.sync ? false : true);
            if (typeof req.xhr.setRequestHeader !== 'undefined') {
              // IE9 doesn't have setRequestHeader
              req.xhr.setRequestHeader("Content-Type", contentType);
            }
            if (this._conn.options.withCredentials) {
              req.xhr.withCredentials = true;
            }
          } catch (e2) {
            Strophe.error("XHR open failed.");
            if (!this._conn.connected) {
              this._conn._changeConnectStatus(
              Strophe.Status.CONNFAIL, "bad-service");
            }
            this._conn.disconnect();
            return;
          }

          // Fires the XHR request -- may be invoked immediately
          // or on a gradually expanding retry window for reconnects
          var sendFunc = function sendFunc() {
            req.date = new Date();
            if (self._conn.options.customHeaders) {
              var headers = self._conn.options.customHeaders;
              for (var header in headers) {
                if (headers.hasOwnProperty(header)) {
                  req.xhr.setRequestHeader(header, headers[header]);
                }
              }
            }
            req.xhr.send(req.data);
          };

          // Implement progressive backoff for reconnects --
          // First retry (send == 1) should also be instantaneous
          if (req.sends > 1) {
            // Using a cube of the retry number creates a nicely
            // expanding retry window
            var backoff = Math.min(Math.floor(Strophe.TIMEOUT * this.wait),
            Math.pow(req.sends, 3)) * 1000;
            setTimeout(function () {
              // XXX: setTimeout should be called only with function expressions (23974bc1)
              sendFunc();
            }, backoff);
          } else {
            sendFunc();
          }

          req.sends++;

          if (this._conn.xmlOutput !== Strophe.Connection.prototype.xmlOutput) {
            if (req.xmlData.nodeName === this.strip && req.xmlData.childNodes.length) {
              this._conn.xmlOutput(req.xmlData.childNodes[0]);
            } else {
              this._conn.xmlOutput(req.xmlData);
            }
          }
          if (this._conn.rawOutput !== Strophe.Connection.prototype.rawOutput) {
            this._conn.rawOutput(req.data);
          }
        } else {
          Strophe.debug("_processRequest: " + (
          i === 0 ? "first" : "second") +
          " request has readyState of " +
          req.xhr.readyState);
        }
      },

      /** PrivateFunction: _removeRequest
          *  _Private_ function to remove a request from the queue.
          *
          *  Parameters:
          *    (Strophe.Request) req - The request to remove.
          */
      _removeRequest: function _removeRequest(req) {
        Strophe.debug("removing request");
        var i;
        for (i = this._requests.length - 1; i >= 0; i--) {
          if (req == this._requests[i]) {
            this._requests.splice(i, 1);
          }
        }
        // IE6 fails on setting to null, so set to empty function
        req.xhr.onreadystatechange = function () {
        };
        this._throttledRequestHandler();
      },

      /** PrivateFunction: _restartRequest
          *  _Private_ function to restart a request that is presumed dead.
          *
          *  Parameters:
          *    (Integer) i - The index of the request in the queue.
          */
      _restartRequest: function _restartRequest(i) {
        var req = this._requests[i];
        if (req.dead === null) {
          req.dead = new Date();
        }

        this._processRequest(i);
      },

      /** PrivateFunction: _reqToData
          * _Private_ function to get a stanza out of a request.
          *
          * Tries to extract a stanza out of a Request Object.
          * When this fails the current connection will be disconnected.
          *
          *  Parameters:
          *    (Object) req - The Request.
          *
          *  Returns:
          *    The stanza that was passed.
          */
      _reqToData: function _reqToData(req) {
        try {
          return req.getResponse();
        } catch (e) {
          if (e != "parsererror") {
            throw e;
          }
          this._conn.disconnect("strophe-parsererror");
        }
      },

      /** PrivateFunction: _sendTerminate
          *  _Private_ function to send initial disconnect sequence.
          *
          *  This is the first step in a graceful disconnect.  It sends
          *  the BOSH server a terminate body and includes an unavailable
          *  presence if authentication has completed.
          */
      _sendTerminate: function _sendTerminate(pres) {
        Strophe.info("_sendTerminate was called");
        var body = this._buildBody().attrs({ type: "terminate" });
        if (pres) {
          body.cnode(pres.tree());
        }
        var req = new Strophe.Request(
        body.tree(),
        this._onRequestStateChange.bind(
        this, this._conn._dataRecv.bind(this._conn)),
        body.tree().getAttribute("rid"));

        this._requests.push(req);
        this._throttledRequestHandler();
      },

      /** PrivateFunction: _send
          *  _Private_ part of the Connection.send function for BOSH
          *
          * Just triggers the RequestHandler to send the messages that are in the queue
          */
      _send: function _send(fail) {
        clearTimeout(this._conn._idleTimeout);
        this._throttledRequestHandler();

        // XXX: setTimeout should be called only with function expressions (23974bc1)
        this._conn._idleTimeout = setTimeout(function () {
          this._onIdle(fail);
        }.bind(this._conn), 100);
      },

      /** PrivateFunction: _sendRestart
          *
          *  Send an xmpp:restart stanza.
          */
      _sendRestart: function _sendRestart() {
        this._throttledRequestHandler();
        clearTimeout(this._conn._idleTimeout);
      },

      /** PrivateFunction: _throttledRequestHandler
          *  _Private_ function to throttle requests to the connection window.
          *
          *  This function makes sure we don't send requests so fast that the
          *  request ids overflow the connection window in the case that one
          *  request died.
          */
      _throttledRequestHandler: function _throttledRequestHandler() {
        if (!this._requests) {
          Strophe.debug("_throttledRequestHandler called with " +
          "undefined requests");
        } else {
          Strophe.debug("_throttledRequestHandler called with " +
          this._requests.length + " requests");
        }

        if (!this._requests || this._requests.length === 0) {
          return;
        }

        if (this._requests.length > 0) {
          this._processRequest(0);
        }

        if (this._requests.length > 1 &&
        Math.abs(this._requests[0].rid -
        this._requests[1].rid) < this.window) {
          this._processRequest(1);
        }
      } };

    return Strophe;
  });

  /*
       This program is distributed under the terms of the MIT license.
       Please see the LICENSE file for details.
      	 Copyright 2006-2008, OGG, LLC
       */


  /* jshint undef: true, unused: true:, noarg: true, latedef: true */
  /* global define, window, clearTimeout, WebSocket, DOMParser, Strophe, $build */

  (function (root, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_5__], __WEBPACK_LOCAL_MODULE_7__ = ((function (core) {
        return factory(
        core.Strophe,
        core.$build);

      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)));
    } else {}
  })(this, function (Strophe, $build) {
    //console.log(Strophe)
    var _socketTask = undefined;
    /** Class: Strophe.WebSocket
                                  *  _Private_ helper class that handles WebSocket Connections
                                  *
                                  *  The Strophe.WebSocket class is used internally by Strophe.Connection
                                  *  to encapsulate WebSocket sessions. It is not meant to be used from user's code.
                                  */

    /** File: websocket.js
                                      *  A JavaScript library to enable XMPP over Websocket in Strophejs.
                                      *
                                      *  This file implements XMPP over WebSockets for Strophejs.
                                      *  If a Connection is established with a Websocket url (ws://...)
                                      *  Strophe will use WebSockets.
                                      *  For more information on XMPP-over-WebSocket see RFC 7395:
                                      *  http://tools.ietf.org/html/rfc7395
                                      *
                                      *  WebSocket support implemented by Andreas Guth (andreas.guth@rwth-aachen.de)
                                      */

    /** PrivateConstructor: Strophe.Websocket
                                          *  Create and initialize a Strophe.WebSocket object.
                                          *  Currently only sets the connection Object.
                                          *
                                          *  Parameters:
                                          *    (Strophe.Connection) connection - The Strophe.Connection that will use WebSockets.
                                          *
                                          *  Returns:
                                          *    A new Strophe.WebSocket object.
                                          */
    Strophe.Websocket = function (connection) {
      //console.log(connection)
      this._conn = connection;
      this.strip = "wrapper";

      var service = connection.service; //"wss://im-api.sandbox.easemob.com/ws/"
      if (service.indexOf("ws:") !== 0 && service.indexOf("wss:") !== 0) {
        // If the service is not an absolute URL, assume it is a path and put the absolute
        // URL together from options, current URL and the path.
        var new_service = "";

        if (connection.options.protocol === "ws" && window.location.protocol !== "https:") {
          new_service += "ws";
        } else {
          new_service += "wss";
        }

        new_service += "://" + window.location.host;

        if (service.indexOf("/") !== 0) {
          new_service += window.location.pathname + service;
        } else {
          new_service += service;
        }

        connection.service = new_service;
      }
    };

    Strophe.Websocket.prototype = {
      /** PrivateFunction: _buildStream
                                     *  _Private_ helper function to generate the <stream> start tag for WebSockets
                                     *
                                     *  Returns:
                                     *    A Strophe.Builder with a <stream> element.
                                     */
      _buildStream: function _buildStream() {
        return $build("open", {
          "xmlns": Strophe.NS.FRAMING,
          "to": this._conn.domain,
          "version": '1.0' });

      },

      /** PrivateFunction: _check_streamerror
          * _Private_ checks a message for stream:error
          *
          *  Parameters:
          *    (Strophe.Request) bodyWrap - The received stanza.
          *    connectstatus - The ConnectStatus that will be set on error.
          *  Returns:
          *     true if there was a streamerror, false otherwise.
          */
      _check_streamerror: function _check_streamerror(bodyWrap, connectstatus) {
        var errors;
        if (bodyWrap.getElementsByTagNameNS) {
          errors = bodyWrap.getElementsByTagNameNS(Strophe.NS.STREAM, "error");
        } else {
          errors = bodyWrap.getElementsByTagName("stream:error");
        }
        if (errors.length === 0) {
          return false;
        }
        var error = errors[0];

        var condition = "";
        var text = "";

        var ns = "urn:ietf:params:xml:ns:xmpp-streams";
        for (var i = 0; i < error.childNodes.length; i++) {
          var e = error.childNodes[i];
          if (e.getAttribute("xmlns") !== ns) {
            break;
          }
          if (e.nodeName === "text") {
            text = e.textContent;
          } else {
            condition = e.nodeName;
          }
        }

        var errorString = "WebSocket stream error: ";

        if (condition) {
          errorString += condition;
        } else {
          errorString += "unknown";
        }

        if (text) {
          errorString += " - " + condition;
        }

        Strophe.error(errorString);

        // close the connection on stream_error
        this._conn._changeConnectStatus(connectstatus, condition);
        this._conn._doDisconnect();
        return true;
      },

      /** PrivateFunction: _reset
          *  Reset the connection.
          *
          *  This function is called by the reset function of the Strophe Connection.
          *  Is not needed by WebSockets.
          */
      _reset: function _reset() {
        return;
      },

      /** PrivateFunction: _connect
          *  _Private_ function called by Strophe.Connection.connect
          *
          *  Creates a WebSocket for a connection and assigns Callbacks to it.
          *  Does nothing if there already is a WebSocket.
          */

      _connect: function _connect() {
        // Ensure that there is no open WebSocket from a previous Connection.
        // Create the new WobSocket
        var isAndroid = false;
        var res = wx.getSystemInfoSync();
        if (res.platform == "devtools") {
          isAndroid = false;
        } else if (res.platform == "ios") {
          isAndroid = false;
        } else if (res.platform == "android") {
          isAndroid = true;
        }

        var me = this;
        this.socket = {
          onopen: this._onOpen,
          onmessage: this._connect_cb_wrapper,
          onerror: this._onError,
          onclose: this._onClose,
          send: function send(str) {
            wx.sendSocketMessage({ data: str });
          } };


        function creatSocket() {
          if (_socketTask) {
            console.log('有sockettask了。。。');
            _socketTask.close();
            _socketTask = undefined;
          }

          setTimeout(function () {
            var SocketTask = wx.connectSocket({
              url: me._conn.service,
              fail: function fail(e) {
                console.log('连接失败', e);
                //部分机型从后台切回前台状态有延迟
                if (e.errMsg.indexOf('suspend') != -1) {
                  creatSocket();
                }
              },
              success: function success(e) {
                console.log('连接成功', e);
              } });

            _socketTask = SocketTask;

            _socketTask.onOpen(function (res) {
              console.log("WebSocket 连接已打开！");
              isSocketConnnected = true;
              // wx.sendSocketMessage({
              //     data: "Hello,World:"
              // });
              me.socket.onopen.call(me);
            });
            _socketTask.onMessage(function (msg) {
              //console.log("onSocketMessage", msg, JSON.stringify(msg));
              me.socket.onmessage.call(me, msg);
            });
            _socketTask.onClose(function (e) {
              console.log("WebSocket 连接已经关闭！");
              isSocketConnnected = false;
              me._conn.connected = true;
              me.socket.onclose.call(me);
              // 外部回调，需要设计一个更合适的
              me._onSocketClose && me._onSocketClose(e);
              //me._conn._changeConnectStatus(Strophe.Status.DISCONNECTED, e);
            });
            _socketTask.onError(function (e) {
              console.log('出错了 出错了');

              if (isAndroid) {
                console.log('安卓');
                //这个是安卓操作系统
                isSocketConnnected = false;
                me._conn.connected = true;
                me.socket.onclose.call(me);
                // 外部回调，需要设计一个更合适的
                me._onSocketClose && me._onSocketClose(e);
              } else {
                me.socket.onclose.call(me);
              }

            });

          }, 1000);
        }
        creatSocket();

      },

      /** PrivateFunction: _connect_cb
          *  _Private_ function called by Strophe.Connection._connect_cb
          *
          * checks for stream:error
          *
          *  Parameters:
          *    (Strophe.Request) bodyWrap - The received stanza.
          */
      _connect_cb: function _connect_cb(bodyWrap) {
        //console.log('connnect_cb', bodyWrap)
        var error = this._check_streamerror(bodyWrap, Strophe.Status.CONNFAIL);
        if (error) {
          return Strophe.Status.CONNFAIL;
        }
      },

      /** PrivateFunction: _handleStreamStart
          * _Private_ function that checks the opening <open /> tag for errors.
          *
          * Disconnects if there is an error and returns false, true otherwise.
          *
          *  Parameters:
          *    (Node) message - Stanza containing the <open /> tag.
          */
      _handleStreamStart: function _handleStreamStart(message) {
        var error = false;

        //console.log('_handleStreamStart', message, typeof message)

        // Check for errors in the <open /> tag
        var ns = message.getAttribute("xmlns");
        if (typeof ns !== "string") {
          error = "Missing xmlns in <open />";
        } else if (ns !== Strophe.NS.FRAMING) {
          error = "Wrong xmlns in <open />: " + ns;
        }

        var ver = message.getAttribute("version");
        if (typeof ver !== "string") {
          error = "Missing version in <open />";
        } else if (ver !== "1.0") {
          error = "Wrong version in <open />: " + ver;
        }

        if (error) {
          this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, error);
          this._conn._doDisconnect();
          return false;
        }

        return true;
      },

      /** PrivateFunction: _connect_cb_wrapper
          * _Private_ function that handles the first connection messages.
          *
          * On receiving an opening stream tag this callback replaces itself with the real
          * message handler. On receiving a stream error the connection is terminated.
          */
      _connect_cb_wrapper: function _connect_cb_wrapper(message) {
        //console.log('_connect_cb_wrapper inited')

        if (message.data.indexOf("<open ") === 0 || message.data.indexOf("<?xml") === 0) {
          //console.log('_connect_cb_wrapper open 2')

          // Strip the XML Declaration, if there is one
          var data = message.data.replace(/^(<\?.*?\?>\s*)*/, "");
          //console.log('_connect_cb_wrapper open 3', data)

          if (data === '') return;

          //console.log(new DOMParser().parseFromString(data, "text/xml"))
          //console.log('_connect_cb_wrapper open 3.1', data)

          var streamStart = new DOMParser().parseFromString(data, "text/xml").documentElement;
          //console.log('_connect_cb_wrapper open 4', streamStart)
          this._conn.xmlInput(streamStart);
          this._conn.rawInput(message.data);

          //_handleStreamSteart will check for XML errors and disconnect on error
          //console.log('_handleStreamStart', streamStart)
          if (this._handleStreamStart(streamStart)) {
            //_connect_cb will check for stream:error and disconnect on error
            //console.log('_connect_cb')
            this._connect_cb(streamStart);
          }
        } else if (message.data.indexOf("<close ") === 0) {//'<close xmlns="urn:ietf:params:xml:ns:xmpp-framing />') {
          //console.log('_connect_cb_wrapper inited 3')
          this._conn.rawInput(message.data);
          this._conn.xmlInput(message);
          var see_uri = message.getAttribute("see-other-uri");
          if (see_uri) {
            this._conn._changeConnectStatus(Strophe.Status.REDIRECT, "Received see-other-uri, resetting connection");
            this._conn.reset();
            this._conn.service = see_uri;
            this._connect();
          } else {
            this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "Received closing stream");
            this._conn._doDisconnect();
          }
        } else {
          //console.log('_connect_cb_wrapper inited 4')

          var string = this._streamWrap(message.data);
          //console.log('_connect_cb_wrapper inited 5')

          var elem = new DOMParser().parseFromString(string, "text/xml").documentElement;
          //console.log('_connect_cb_wrapper inited 6')

          this.socket.onmessage = this._onMessage.bind(this);
          //console.log('_connect_cb_wrapper inited 7')

          this._conn._connect_cb(elem, null, message.data);
        }
      },

      /** PrivateFunction: _disconnect
          *  _Private_ function called by Strophe.Connection.disconnect
          *
          *  Disconnects and sends a last stanza if one is given
          *
          *  Parameters:
          *    (Request) pres - This stanza will be sent before disconnecting.
          */
      _disconnect: function _disconnect(pres) {
        console.log('_disconnect', this.socket.readyState, !!this.socket);
        //  && this.socket.readyState !== WebSocket.CLOSED
        if (this.socket) {
          if (pres) {
            this._conn.send(pres);
          }
          var close = $build("close", { "xmlns": Strophe.NS.FRAMING });
          this._conn.xmlOutput(close);
          var closeString = Strophe.serialize(close);
          this._conn.rawOutput(closeString);
          try {
            this.socket.send(closeString);
          } catch (e) {
            Strophe.info("Couldn't send <close /> tag.");
          }
        }
        this._conn._doDisconnect();
      },

      /** PrivateFunction: _doDisconnect
          *  _Private_ function to disconnect.
          *
          *  Just closes the Socket for WebSockets
          */
      _doDisconnect: function _doDisconnect() {
        Strophe.info("WebSockets _doDisconnect was called");
        this._closeSocket && this._closeSocket();
      },

      /** PrivateFunction _streamWrap
          *  _Private_ helper function to wrap a stanza in a <stream> tag.
          *  This is used so Strophe can process stanzas from WebSockets like BOSH
          */
      _streamWrap: function _streamWrap(stanza) {
        return "<wrapper>" + stanza + '</wrapper>';
      },


      /** PrivateFunction: _closeSocket
          *  _Private_ function to close the WebSocket.
          *
          *  Closes the socket if it is still open and deletes it
          */
      // _closeSocket: function () {
      //     if (this.socket) { try {
      //         this.socket.close();
      //     } catch (e) {} }
      //     this.socket = null;
      // },

      /** PrivateFunction: _emptyQueue
       * _Private_ function to check if the message queue is empty.
       *
       *  Returns:
       *    True, because WebSocket messages are send immediately after queueing.
       */
      _emptyQueue: function _emptyQueue() {
        return true;
      },

      /** PrivateFunction: _onClose
          * _Private_ function to handle websockets closing.
          *
          * Nothing to do here for WebSockets
          */
      _onClose: function _onClose() {
        if (this._conn.connected && !this._conn.disconnecting) {
          Strophe.error("Websocket closed unexpectedly");
          this._conn._doDisconnect();
        } else {
          Strophe.info("Websocket closed");
        }
      },

      /** PrivateFunction: _no_auth_received
          *
          * Called on stream start/restart when no stream:features
          * has been received.
          */
      _no_auth_received: function _no_auth_received(_callback) {
        Strophe.error("Server did not send any auth methods");
        this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "Server did not send any auth methods");
        if (_callback) {
          _callback = _callback.bind(this._conn);
          _callback();
        }
        this._conn._doDisconnect();
      },

      /** PrivateFunction: _onDisconnectTimeout
          *  _Private_ timeout handler for handling non-graceful disconnection.
          *
          *  This does nothing for WebSockets
          */
      _onDisconnectTimeout: function _onDisconnectTimeout() {
      },

      /** PrivateFunction: _abortAllRequests
          *  _Private_ helper function that makes sure all pending requests are aborted.
          */
      _abortAllRequests: function _abortAllRequests() {
      },

      /** PrivateFunction: _onError
          * _Private_ function to handle websockets errors.
          *
          * Parameters:
          * (Object) error - The websocket error.
          */
      _onError: function _onError(error) {
        wx.onSocketError(function (res) {
          // console.log('WebSocket连接打开失败，请检查！')
        });
        // Strophe.error("Websocket error " + error);
        // this._conn._changeConnectStatus(Strophe.Status.CONNFAIL, "The WebSocket connection could not be established or was disconnected.");
        // this._disconnect();
      },

      /** PrivateFunction: _onIdle
          *  _Private_ function called by Strophe.Connection._onIdle
          *
          *  sends all queued stanzas
          */
      _onIdle: function _onIdle(_fail) {
        var data = this._conn._data;
        if (data.length > 0 && !this._conn.paused) {
          for (var i = 0; i < data.length; i++) {
            if (data[i] !== null) {
              var stanza, rawStanza;
              if (data[i] === "restart") {
                stanza = this._buildStream().tree();
              } else {
                stanza = data[i];
              }
              rawStanza = Strophe.serialize(stanza);

              this._conn.xmlOutput(stanza);
              this._conn.rawOutput(rawStanza);
              // onsend todo
              if (isSocketConnnected) {
                wx.sendSocketMessage({
                  data: rawStanza,
                  fail: function fail() {
                    console.log('socjet发送失败');
                    _fail && _fail('socket error');
                  },
                  success: function success() {

                  } });

              } else {
                //this._conn._doDisconnect();
                isSocketConnnected = false;
                _fail && _fail('socket disconnnected');
                //this._changeConnectStatus(Strophe.Status.DISCONNECTED, null);
              }

              //this.socket.send(rawStanza);
            }
          }
          this._conn._data = [];
        }
      },

      /** PrivateFunction: _onMessage
          * _Private_ function to handle websockets messages.
          *
          * This function parses each of the messages as if they are full documents.
          * [TODO : We may actually want to use a SAX Push parser].
          *
          * Since all XMPP traffic starts with
          *  <stream:stream version='1.0'
          *                 xml:lang='en'
          *                 xmlns='jabber:client'
          *                 xmlns:stream='http://etherx.jabber.org/streams'
          *                 id='3697395463'
          *                 from='SERVER'>
          *
          * The first stanza will always fail to be parsed.
          *
          * Additionally, the seconds stanza will always be <stream:features> with
          * the stream NS defined in the previous stanza, so we need to 'force'
          * the inclusion of the NS in this stanza.
          *
          * Parameters:
          * (string) message - The websocket message.
          */
      _onMessage: function _onMessage(message) {
        //console.log('_onMessage')
        // wx.sendSocketMessage({
        //   data: message
        // })
        var elem, data;
        // check for closing stream
        var close = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
        if (message.data === close) {
          this._conn.rawInput(close);
          this._conn.xmlInput(message);
          if (!this._conn.disconnecting) {
            this._conn._doDisconnect();
          }
          return;
        } else if (message.data.search("<open ") === 0) {
          // This handles stream restarts
          elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
          if (!this._handleStreamStart(elem)) {
            return;
          }
        } else {
          data = this._streamWrap(message.data);
          elem = new DOMParser().parseFromString(data, "text/xml").documentElement;
        }

        if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
          return;
        }

        //handle unavailable presence stanza before disconnecting
        if (this._conn.disconnecting &&
        elem.firstChild.nodeName === "presence" &&
        elem.firstChild.getAttribute("type") === "unavailable") {
          this._conn.xmlInput(elem);
          this._conn.rawInput(Strophe.serialize(elem));
          // if we are already disconnecting we will ignore the unavailable stanza and
          // wait for the </stream:stream> tag before we close the connection
          return;
        }
        this._conn._dataRecv(elem, message.data);
      },

      /** PrivateFunction: _onOpen
          * _Private_ function to handle websockets connection setup.
          *
          * The opening stream tag is sent here.
          */
      _onOpen: function _onOpen() {
        Strophe.info("Websocket open");
        var start = this._buildStream();
        this._conn.xmlOutput(start.tree());

        var startString = Strophe.serialize(start);
        this._conn.rawOutput(startString);
        // onsend todo
        //console.log('startString', startString)
        //_socketTask.send({data: startString})
        wx.sendSocketMessage({ data: startString });
        //this.socket.send(rawStanza);
        // this.socket.send(startString);
      },

      /** PrivateFunction: _reqToData
          * _Private_ function to get a stanza out of a request.
          *
          * WebSockets don't use requests, so the passed argument is just returned.
          *
          *  Parameters:
          *    (Object) stanza - The stanza.
          *
          *  Returns:
          *    The stanza that was passed.
          */
      _reqToData: function _reqToData(stanza) {
        return stanza;
      },

      /** PrivateFunction: _send
          *  _Private_ part of the Connection.send function for WebSocket
          *
          * Just flushes the messages that are in the queue
          */
      _send: function _send(flush) {
        this._conn.flush(flush);
      },

      /** PrivateFunction: _sendRestart
          *
          *  Send an xmpp:restart stanza.
          */
      _sendRestart: function _sendRestart() {
        clearTimeout(this._conn._idleTimeout);
        this._conn._onIdle.bind(this._conn)();
      } };

    return Strophe;
  });

  (function (root) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __WEBPACK_LOCAL_MODULE_5__,
      __WEBPACK_LOCAL_MODULE_6__,
      __WEBPACK_LOCAL_MODULE_7__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (wrapper) {
        return wrapper;
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  })(this);

  /* jshint ignore:start */
  if (callback) {
    if (true) {
      //For backwards compatability
      var n_callback = callback;
      if (typeof requirejs === 'function') {
        requirejs(["./strophe"], function (o) {
          n_callback(o.Strophe, o.$build, o.$msg, o.$iq, o.$pres);
        });
      } else {
        Promise.resolve(/*! AMD require */).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(/*! ./strophe */ 8)]; (function (o) {
          n_callback(o.Strophe, o.$build, o.$msg, o.$iq, o.$pres);
        }).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}).catch(__webpack_require__.oe);
      }
    } else {}
  }


}).bind(window)(function (Strophe, build, msg, iq, pres) {
  // window.Strophe = Strophe;
  // //console.log(window.Strophe)
  // window.$build = build;
  // window.$msg = msg;
  // window.$iq = iq;
  // window.$pres = pres;
});
/* jshint ignore:end */

/***/ }),
/* 9 */
/*!**********************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/libs/xmldom/dom-parser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function DOMParser(options) {
  this.options = options || { locator: {} };

}
DOMParser.prototype.parseFromString = function (source, mimeType) {
  var options = this.options;
  var sax = new XMLReader();
  var domBuilder = options.domBuilder || new DOMHandler(); //contentHandler and LexicalHandler
  var errorHandler = options.errorHandler;
  var locator = options.locator;
  var defaultNSMap = options.xmlns || {};
  var entityMap = { 'lt': '<', 'gt': '>', 'amp': '&', 'quot': '"', 'apos': "'" };
  if (locator) {
    domBuilder.setDocumentLocator(locator);
  }

  sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
  sax.domBuilder = options.domBuilder || domBuilder;
  if (/\/x?html?$/.test(mimeType)) {
    entityMap.nbsp = '\xa0';
    entityMap.copy = '\xa9';
    defaultNSMap[''] = 'http://www.w3.org/1999/xhtml';
  }
  defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
  if (source) {
    sax.parse(source, defaultNSMap, entityMap);
  } else {
    sax.errorHandler.error("invalid document source");
  }
  return domBuilder.document;
};
function buildErrorHandler(errorImpl, domBuilder, locator) {
  if (!errorImpl) {
    if (domBuilder instanceof DOMHandler) {
      return domBuilder;
    }
    errorImpl = domBuilder;
  }
  var errorHandler = {};
  var isCallback = errorImpl instanceof Function;
  locator = locator || {};
  function build(key) {
    var fn = errorImpl[key];
    if (!fn && isCallback) {
      fn = errorImpl.length == 2 ? function (msg) {
        errorImpl(key, msg);
      } : errorImpl;
    }
    errorHandler[key] = fn && function (msg) {
      fn('[xmldom ' + key + ']\t' + msg + _locator(locator));
    } || function () {
    };
  }

  build('warning');
  build('error');
  build('fatalError');
  return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
  this.cdata = false;
}
function position(locator, node) {
  node.lineNumber = locator.lineNumber;
  node.columnNumber = locator.columnNumber;
}
/**
   * @see org.xml.sax.ContentHandler#startDocument
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
   */
DOMHandler.prototype = {
  startDocument: function startDocument() {
    this.document = new DOMImplementation().createDocument(null, null, null);
    if (this.locator) {
      this.document.documentURI = this.locator.systemId;
    }
  },
  startElement: function startElement(namespaceURI, localName, qName, attrs) {
    var doc = this.document;
    var el = doc.createElementNS(namespaceURI, qName || localName);
    var len = attrs.length;
    appendElement(this, el);
    this.currentElement = el;

    this.locator && position(this.locator, el);
    for (var i = 0; i < len; i++) {
      var namespaceURI = attrs.getURI(i);
      var value = attrs.getValue(i);
      var qName = attrs.getQName(i);
      var attr = doc.createAttributeNS(namespaceURI, qName);
      if (attr.getOffset) {
        position(attr.getOffset(1), attr);
      }
      attr.value = attr.nodeValue = value;
      el.setAttributeNode(attr);
    }
  },
  endElement: function endElement(namespaceURI, localName, qName) {
    var current = this.currentElement;
    var tagName = current.tagName;
    this.currentElement = current.parentNode;
  },
  startPrefixMapping: function startPrefixMapping(prefix, uri) {
  },
  endPrefixMapping: function endPrefixMapping(prefix) {
  },
  processingInstruction: function processingInstruction(target, data) {
    var ins = this.document.createProcessingInstruction(target, data);
    this.locator && position(this.locator, ins);
    appendElement(this, ins);
  },
  ignorableWhitespace: function ignorableWhitespace(ch, start, length) {
  },
  characters: function characters(chars, start, length) {
    chars = _toString.apply(this, arguments);
    //console.log(chars)
    if (this.currentElement && chars) {
      if (this.cdata) {
        var charNode = this.document.createCDATASection(chars);
        this.currentElement.appendChild(charNode);
      } else {
        var charNode = this.document.createTextNode(chars);
        this.currentElement.appendChild(charNode);
      }
      this.locator && position(this.locator, charNode);
    }
  },
  skippedEntity: function skippedEntity(name) {
  },
  endDocument: function endDocument() {
    this.document.normalize();
  },
  setDocumentLocator: function setDocumentLocator(locator) {
    if (this.locator = locator) {// && !('lineNumber' in locator)){
      locator.lineNumber = 0;
    }
  },
  //LexicalHandler
  comment: function comment(chars, start, length) {
    chars = _toString.apply(this, arguments);
    var comm = this.document.createComment(chars);
    this.locator && position(this.locator, comm);
    appendElement(this, comm);
  },

  startCDATA: function startCDATA() {
    //used in characters() methods
    this.cdata = true;
  },
  endCDATA: function endCDATA() {
    this.cdata = false;
  },

  startDTD: function startDTD(name, publicId, systemId) {
    var impl = this.document.implementation;
    if (impl && impl.createDocumentType) {
      var dt = impl.createDocumentType(name, publicId, systemId);
      this.locator && position(this.locator, dt);
      appendElement(this, dt);
    }
  },
  /**
      * @see org.xml.sax.ErrorHandler
      * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
      */
  warning: function warning(error) {
    //console.warn('[xmldom warning]\t' + error, _locator(this.locator));
  },
  error: function error(_error) {
    //console.error('[xmldom error]\t' + error, _locator(this.locator));
  },
  fatalError: function fatalError(error) {
    //console.error('[xmldom fatalError]\t' + error, _locator(this.locator));
    throw error;
  } };

function _locator(l) {
  if (l) {
    return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
  }
}
function _toString(chars, start, length) {
  if (typeof chars == 'string') {
    return chars.substr(start, length);
  } else {//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
    if (chars.length >= start + length || start) {
      return new java.lang.String(chars, start, length) + '';
    }
    return chars;
  }
}

/*
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
   * used method of org.xml.sax.ext.LexicalHandler:
   *  #comment(chars, start, length)
   *  #startCDATA()
   *  #endCDATA()
   *  #startDTD(name, publicId, systemId)
   *
   *
   * IGNORED method of org.xml.sax.ext.LexicalHandler:
   *  #endDTD()
   *  #startEntity(name)
   *  #endEntity(name)
   *
   *
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
   * IGNORED method of org.xml.sax.ext.DeclHandler
   * 	#attributeDecl(eName, aName, type, mode, value)
   *  #elementDecl(name, model)
   *  #externalEntityDecl(name, publicId, systemId)
   *  #internalEntityDecl(name, value)
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
   * IGNORED method of org.xml.sax.EntityResolver2
   *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
   *  #resolveEntity(publicId, systemId)
   *  #getExternalSubset(name, baseURI)
   * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
   * IGNORED method of org.xml.sax.DTDHandler
   *  #notationDecl(name, publicId, systemId) {};
   *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
   */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (key) {
  DOMHandler.prototype[key] = function () {
    return null;
  };
});

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement(hander, node) {
  if (!hander.currentElement) {
    hander.document.appendChild(node);
  } else {
    hander.currentElement.appendChild(node);
  }
} //appendChild and setAttributeNS are preformance key

if (true) {
  var XMLReader = __webpack_require__(/*! ./sax */ 10).XMLReader;
  var DOMImplementation = exports.DOMImplementation = __webpack_require__(/*! ./dom */ 11).DOMImplementation;
  var XMLSerializer = exports.XMLSerializer = __webpack_require__(/*! ./dom */ 11).XMLSerializer;
  exports.DOMParser = DOMParser;
  var DOMParser = {
    DOMImplementation: DOMImplementation,
    XMLSerializer: XMLSerializer,
    DOMParser: DOMParser };

  module.exports = DOMParser;
}

/***/ }),
/* 10 */
/*!***************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/libs/xmldom/sax.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; //\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\xB7\u0300-\u036F\\u203F-\u2040]");
var tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_V
//S_ATTR_S,	S_E,	S_S,	S_C
var S_TAG = 0; //tag name offerring
var S_ATTR = 1; //attr name offerring
var S_ATTR_S = 2; //attr name end and space offer
var S_EQ = 3; //=space?
var S_V = 4; //attr value(no quot value only)
var S_E = 5; //attr value end and no space(quot end)
var S_S = 6; //(attr value end || tag end ) && (space offer)
var S_C = 7; //closed el<el />

function XMLReader() {

}

XMLReader.prototype = {
  parse: function parse(source, defaultNSMap, entityMap) {
    var domBuilder = this.domBuilder;
    domBuilder.startDocument();
    _copy(defaultNSMap, defaultNSMap = {});
    _parse(source, defaultNSMap, entityMap,
    domBuilder, this.errorHandler);
    domBuilder.endDocument();
  } };

function _parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  function fixedFromCharCode(code) {
    // String.prototype.fromCharCode does not supports
    // > 2 bytes unicode chars directly
    if (code > 0xffff) {
      code -= 0x10000;
      var surrogate1 = 0xd800 + (code >> 10),
      surrogate2 = 0xdc00 + (code & 0x3ff);

      return String.fromCharCode(surrogate1, surrogate2);
    } else {
      return String.fromCharCode(code);
    }
  }

  function entityReplacer(a) {
    var k = a.slice(1, -1);
    if (k in entityMap) {
      return entityMap[k];
    } else if (k.charAt(0) === '#') {
      return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')));
    } else {
      errorHandler.error('entity not found:' + a);
      return a;
    }
  }

  function appendText(end) {//has some bugs
    if (end > start) {
      var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
      locator && position(start);
      domBuilder.characters(xt, 0, end - start);
      start = end;
    }
  }

  function position(p, m) {
    while (p >= lineEnd && (m = linePattern.exec(source))) {
      lineStart = m.index;
      lineEnd = lineStart + m[0].length;
      locator.lineNumber++;
      ////console.log('line++:',locator,startPos,endPos)
    }
    locator.columnNumber = p - lineStart + 1;
  }

  var lineStart = 0;
  var lineEnd = 0;
  var linePattern = /.+(?:\r\n?|\n)|.*$/g;
  var locator = domBuilder.locator;

  var parseStack = [{ currentNSMap: defaultNSMapCopy }];
  var closeMap = {};
  var start = 0;
  while (true) {
    try {
      var tagStart = source.indexOf('<', start);
      if (tagStart < 0) {
        if (!source.substr(start).match(/^\s*$/)) {
          var doc = domBuilder.document;
          var text = doc.createTextNode(source.substr(start));
          doc.appendChild(text);
          domBuilder.currentElement = text;
        }
        return;
      }
      if (tagStart > start) {
        appendText(tagStart);
      }
      switch (source.charAt(tagStart + 1)) {
        case '/':
          var end = source.indexOf('>', tagStart + 3);
          var tagName = source.substring(tagStart + 2, end);
          var config = parseStack.pop();
          var localNSMap = config.localNSMap;
          if (config.tagName != tagName) {
            errorHandler.fatalError("end tag name: " + tagName + ' is not match the current start tagName:' + config.tagName);
          }
          domBuilder.endElement(config.uri, config.localName, tagName);
          if (localNSMap) {
            for (var prefix in localNSMap) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
          end++;
          break;
        // end elment
        case '?': // <?...?>
          locator && position(tagStart);
          end = parseInstruction(source, tagStart, domBuilder);
          break;
        case '!': // <!doctype,<![CDATA,<!--
          locator && position(tagStart);
          end = parseDCC(source, tagStart, domBuilder, errorHandler);
          break;
        default:
          //console.log('locator', locator)

          locator && position(tagStart);

          var el = new ElementAttributes();

          //elStartEnd
          var end = parseElementStartPart(source, tagStart, el, entityReplacer, errorHandler);
          //console.log('end', end)

          var len = el.length;

          if (locator) {
            if (len) {
              //attribute position fixed
              for (var i = 0; i < len; i++) {
                var a = el[i];
                position(a.offset);
                a.offset = copyLocator(locator, {});
              }
            }
            position(end);
          }
          //console.log('el', el)

          if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
            el.closed = true;
            if (!entityMap.nbsp) {
              errorHandler.warning('unclosed xml attribute');
            }
          }
          //console.log('parseStack', parseStack)

          appendElement(el, domBuilder, parseStack);

          //console.log('el', el, parseStack)


          if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
            end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
          } else {
            end++;
          }}

    } catch (e) {
      errorHandler.error('element parse error: ' + e);
      //console.log('element parse error: ', e)
      end = -1;
    }
    //console.log('out', end, start)


    if (end > start) {
      start = end;
    } else {
      //TODO: 这里有可能sax回退，有位置错误风险
      appendText(Math.max(tagStart, start) + 1);
    }
  }
}
function copyLocator(f, t) {
  t.lineNumber = f.lineNumber;
  t.columnNumber = f.columnNumber;
  return t;
}

/**
   * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
   * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
   */
function parseElementStartPart(source, start, el, entityReplacer, errorHandler) {
  var attrName;
  var value;
  var p = ++start;
  var s = S_TAG; //status
  while (true) {
    var c = source.charAt(p);
    switch (c) {
      case '=':
        if (s === S_ATTR) {//attrName
          attrName = source.slice(start, p);
          s = S_EQ;
        } else if (s === S_ATTR_S) {
          s = S_EQ;
        } else {
          //fatalError: equal must after attrName or space after attrName
          throw new Error('attribute equal must after attrName');
        }
        break;
      case '\'':
      case '"':
        if (s === S_EQ) {//equal
          start = p + 1;
          p = source.indexOf(c, start);
          if (p > 0) {
            value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
            el.add(attrName, value, start - 1);
            s = S_E;
          } else {
            //fatalError: no end quot match
            throw new Error('attribute value no end \'' + c + '\' match');
          }
        } else if (s == S_V) {
          value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
          ////console.log(attrName,value,start,p)
          el.add(attrName, value, start);
          //console.dir(el)
          errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
          start = p + 1;
          s = S_E;
        } else {
          //fatalError: no equal before
          throw new Error('attribute value must after "="');
        }
        break;
      case '/':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));
          case S_E:
          case S_S:
          case S_C:
            s = S_C;
            el.closed = true;
          case S_V:
          case S_ATTR:
          case S_ATTR_S:
            break;
          //case S_EQ:
          default:
            throw new Error("attribute invalid close char('/')");}

        break;
      case '': //end document
        //throw new Error('unexpected end of input')
        errorHandler.error('unexpected end of input');
      case '>':
        switch (s) {
          case S_TAG:
            el.setTagName(source.slice(start, p));
          case S_E:
          case S_S:
          case S_C:
            break; //normal
          case S_V: //Compatible state
          case S_ATTR:
            value = source.slice(start, p);
            if (value.slice(-1) === '/') {
              el.closed = true;
              value = value.slice(0, -1);
            }
          case S_ATTR_S:
            if (s === S_ATTR_S) {
              value = attrName;
            }
            if (s == S_V) {
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
            } else {
              errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
              el.add(value, value, start);
            }
            break;
          case S_EQ:
            throw new Error('attribute value missed!!');}

        //			//console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
        return p;
      /*xml space '\x20' | #x9 | #xD | #xA; */
      case "\x80":
        c = ' ';
      default:
        if (c <= ' ') {//space
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p)); //tagName
              s = S_S;
              break;
            case S_ATTR:
              attrName = source.slice(start, p);
              s = S_ATTR_S;
              break;
            case S_V:
              var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              el.add(attrName, value, start);
            case S_E:
              s = S_S;
              break;
            //case S_S:
            //case S_EQ:
            //case S_ATTR_S:
            //	void();break;
            //case S_C:
            //ignore warning
          }
        } else {//not space
          //S_TAG,	S_ATTR,	S_EQ,	S_V
          //S_ATTR_S,	S_E,	S_S,	S_C
          switch (s) {
            //case S_TAG:void();break;
            //case S_ATTR:void();break;
            //case S_V:void();break;
            case S_ATTR_S:
              errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead!!');
              el.add(attrName, attrName, start);
              start = p;
              s = S_ATTR;
              break;
            case S_E:
              errorHandler.warning('attribute space is required"' + attrName + '"!!');
            case S_S:
              s = S_ATTR;
              start = p;
              break;
            case S_EQ:
              s = S_V;
              start = p;
              break;
            case S_C:
              throw new Error("elements closed character '/' and '>' must be connected to");}

        }}

    p++;
  }
}
/**
   * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
   */
function appendElement(el, domBuilder, parseStack) {
  var tagName = el.tagName;
  var localNSMap = null;
  var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
  var i = el.length;
  while (i--) {
    var a = el[i];
    var qName = a.qName;
    var value = a.value;
    var nsp = qName.indexOf(':');
    if (nsp > 0) {
      var prefix = a.prefix = qName.slice(0, nsp);
      var localName = qName.slice(nsp + 1);
      var nsPrefix = prefix === 'xmlns' && localName;
    } else {
      localName = qName;
      prefix = null;
      nsPrefix = qName === 'xmlns' && '';
    }
    //can not set prefix,because prefix !== ''
    a.localName = localName;
    //prefix == null for no ns prefix attribute
    if (nsPrefix !== false) {//hack!!
      if (localNSMap == null) {
        localNSMap = {};
        ////console.log(currentNSMap,0)
        _copy(currentNSMap, currentNSMap = {});
        ////console.log(currentNSMap,1)
      }
      currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
      a.uri = 'http://www.w3.org/2000/xmlns/';
      domBuilder.startPrefixMapping(nsPrefix, value);
    }
  }
  var i = el.length;
  while (i--) {
    a = el[i];
    var prefix = a.prefix;
    if (prefix) {//no prefix attribute has no namespace
      if (prefix === 'xml') {
        a.uri = 'http://www.w3.org/XML/1998/namespace';
      }
      if (prefix !== 'xmlns') {
        a.uri = currentNSMap[prefix];

        //{//console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
      }
    }
  }
  var nsp = tagName.indexOf(':');
  if (nsp > 0) {
    prefix = el.prefix = tagName.slice(0, nsp);
    localName = el.localName = tagName.slice(nsp + 1);
  } else {
    prefix = null; //important!!
    localName = el.localName = tagName;
  }
  //no prefix element has default namespace
  var ns = el.uri = currentNSMap[prefix || ''];
  domBuilder.startElement(ns, localName, tagName, el);
  //endPrefixMapping and startPrefixMapping have not any help for dom builder
  //localNSMap = null
  if (el.closed) {
    domBuilder.endElement(ns, localName, tagName);
    if (localNSMap) {
      for (prefix in localNSMap) {
        domBuilder.endPrefixMapping(prefix);
      }
    }
  } else {
    el.currentNSMap = currentNSMap;
    el.localNSMap = localNSMap;
    parseStack.push(el);
  }
}
function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
  if (/^(?:script|textarea)$/i.test(tagName)) {
    var elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
    var text = source.substring(elStartEnd + 1, elEndStart);
    if (/[&<]/.test(text)) {
      if (/^script$/i.test(tagName)) {
        //if(!/\]\]>/.test(text)){
        //lexHandler.startCDATA();
        domBuilder.characters(text, 0, text.length);
        //lexHandler.endCDATA();
        return elEndStart;
        //}
      } //}else{//text area
      text = text.replace(/&#?\w+;/g, entityReplacer);
      domBuilder.characters(text, 0, text.length);
      return elEndStart;
      //}

    }
  }
  return elStartEnd + 1;
}
function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
  //if(tagName in closeMap){
  var pos = closeMap[tagName];
  if (pos == null) {
    ////console.log(tagName)
    pos = closeMap[tagName] = source.lastIndexOf('</' + tagName + '>');
  }
  return pos < elStartEnd;
  //}
}
function _copy(source, target) {
  for (var n in source) {
    target[n] = source[n];
  }
}
function parseDCC(source, start, domBuilder, errorHandler) {//sure start with '<!'
  var next = source.charAt(start + 2);
  switch (next) {
    case '-':
      if (source.charAt(start + 3) === '-') {
        var end = source.indexOf('-->', start + 4);
        //append comment source.substring(4,end)//<!--
        if (end > start) {
          domBuilder.comment(source, start + 4, end - start - 4);
          return end + 3;
        } else {
          errorHandler.error("Unclosed comment");
          return -1;
        }
      } else {
        //error
        return -1;
      }
    default:
      if (source.substr(start + 3, 6) == 'CDATA[') {
        var end = source.indexOf(']]>', start + 9);
        domBuilder.startCDATA();
        domBuilder.characters(source, start + 9, end - start - 9);
        domBuilder.endCDATA();
        return end + 3;
      }
      //<!DOCTYPE
      //startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
      var matchs = split(source, start);
      var len = matchs.length;
      if (len > 1 && /!doctype/i.test(matchs[0][0])) {
        var name = matchs[1][0];
        var pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
        var sysid = len > 4 && matchs[4][0];
        var lastMatch = matchs[len - 1];
        domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'),
        sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'));
        domBuilder.endDTD();

        return lastMatch.index + lastMatch[0].length;
      }}

  return -1;
}


function parseInstruction(source, start, domBuilder) {
  var end = source.indexOf('?>', start);
  if (end) {
    var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    if (match) {
      var len = match[0].length;
      domBuilder.processingInstruction(match[1], match[2]);
      return end + 2;
    } else {//error
      return -1;
    }
  }
  return -1;
}

/**
   * @param source
   */
function ElementAttributes(source) {

}
ElementAttributes.prototype = {
  setTagName: function setTagName(tagName) {
    if (!tagNamePattern.test(tagName)) {
      throw new Error('invalid tagName:' + tagName);
    }
    this.tagName = tagName;
  },
  add: function add(qName, value, offset) {
    if (!tagNamePattern.test(qName)) {
      throw new Error('invalid attribute:' + qName);
    }
    this[this.length++] = { qName: qName, value: value, offset: offset };
  },
  length: 0,
  getLocalName: function getLocalName(i) {
    return this[i].localName;
  },
  getOffset: function getOffset(i) {
    return this[i].offset;
  },
  getQName: function getQName(i) {
    return this[i].qName;
  },
  getURI: function getURI(i) {
    return this[i].uri;
  },
  getValue: function getValue(i) {
    return this[i].value;
  }
  //	,getIndex:function(uri, localName)){
  //		if(localName){
  //
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},
};


function _set_proto_(thiz, parent) {
  thiz.__proto__ = parent;
  return thiz;
}
if (!(_set_proto_({}, _set_proto_.prototype) instanceof _set_proto_)) {
  _set_proto_ = function _set_proto_(thiz, parent) {
    function p() {
    };
    p.prototype = parent;
    p = new p();
    for (parent in thiz) {
      p[parent] = thiz[parent];
    }
    return p;
  };
}

function split(source, start) {
  var match;
  var buf = [];
  var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  reg.lastIndex = start;
  reg.exec(source); //skip <
  while (match = reg.exec(source)) {
    buf.push(match);
    if (match[1]) return buf;
  }
}

if (true) {
  exports.XMLReader = XMLReader;
}

/***/ }),
/* 11 */
/*!***************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/libs/xmldom/dom.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 /*
               * DOM Level 2
               * Object DOMException
               * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
               * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
               */

function copy(src, dest) {
  for (var p in src) {
    dest[p] = src[p];
  }
}
/**
   ^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
   ^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
   */
function _extends(Class, Super) {
  var pt = Class.prototype;
  if (Object.create) {
    var ppt = Object.create(Super.prototype);
    pt.__proto__ = ppt;
  }
  if (!(pt instanceof Super)) {var
    t = function t() {
    };;
    t.prototype = Super.prototype;
    t = new t();
    copy(pt, t);
    Class.prototype = pt = t;
  }
  if (pt.constructor != Class) {
    if (typeof Class != 'function') {
      //console.error("unknow Class:" + Class)
    }
    pt.constructor = Class;
  }
}
var htmlns = 'http://www.w3.org/1999/xhtml';
// Node Types
var NodeType = {};
var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
var TEXT_NODE = NodeType.TEXT_NODE = 3;
var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = NodeType.NOTATION_NODE = 12;

// ExceptionCode
var ExceptionCode = {};
var ExceptionMessage = {};
var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
//level2
var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);


function DOMException(code, message) {
  if (message instanceof Error) {
    var error = message;
  } else {
    error = this;
    Error.call(this, ExceptionMessage[code]);
    this.message = ExceptionMessage[code];
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
  }
  error.code = code;
  if (message) this.message = this.message + ": " + message;
  return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode, DOMException);
/**
                                    * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
                                    * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
                                    * The items in the NodeList are accessible via an integral index, starting from 0.
                                    */
function NodeList() {
};
NodeList.prototype = {
  /**
                        * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
                        * @standard level1
                        */
  length: 0,
  /**
              * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
              * @standard level1
              * @param index  unsigned long
              *   Index into the collection.
              * @return Node
              *    The node at the indexth position in the NodeList, or null if that is not a valid index.
              */
  item: function item(index) {
    return this[index] || null;
  },
  toString: function toString() {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf);
    }
    return buf.join('');
  } };

function LiveNodeList(node, refresh) {
  this._node = node;
  this._refresh = refresh;
  _updateLiveList(this);
}
function _updateLiveList(list) {
  var inc = list._node._inc || list._node.ownerDocument._inc;
  if (list._inc != inc) {
    var ls = list._refresh(list._node);
    //console.log(ls.length)
    __set__(list, 'length', ls.length);
    copy(ls, list);
    list._inc = inc;
  }
}
LiveNodeList.prototype.item = function (i) {
  _updateLiveList(this);
  return this[i];
};

_extends(LiveNodeList, NodeList);
/**
                                   *
                                   * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
                                   * NamedNodeMap objects in the DOM are live.
                                   * used for attributes or DocumentType entities
                                   */
function NamedNodeMap() {
};

function _findNodeIndex(list, node) {
  var i = list.length;
  while (i--) {
    if (list[i] === node) {
      return i;
    }
  }
}

function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr;
  } else {
    list[list.length++] = newAttr;
  }
  if (el) {
    newAttr.ownerElement = el;
    var doc = el.ownerDocument;
    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr);
      _onAddAttribute(doc, el, newAttr);
    }
  }
}
function _removeNamedNode(el, list, attr) {
  var i = _findNodeIndex(list, attr);
  if (i >= 0) {
    var lastIndex = list.length - 1;
    while (i < lastIndex) {
      list[i] = list[++i];
    }
    list.length = lastIndex;
    if (el) {
      var doc = el.ownerDocument;
      if (doc) {
        _onRemoveAttribute(doc, el, attr);
        attr.ownerElement = null;
      }
    }
  } else {
    throw DOMException(NOT_FOUND_ERR, new Error());
  }
}
NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem: function getNamedItem(key) {
    //		if(key.indexOf(':')>0 || key == 'xmlns'){
    //			return null;
    //		}
    var i = this.length;
    while (i--) {
      var attr = this[i];
      if (attr.nodeName == key) {
        return attr;
      }
    }
  },
  setNamedItem: function setNamedItem(attr) {
    var el = attr.ownerElement;
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }
    var oldAttr = this.getNamedItem(attr.nodeName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  },
  /* returns Node */
  setNamedItemNS: function setNamedItemNS(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
    var el = attr.ownerElement,oldAttr;
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }
    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  },

  /* returns Node */
  removeNamedItem: function removeNamedItem(key) {
    var attr = this.getNamedItem(key);
    _removeNamedNode(this._ownerElement, this, attr);
    return attr;


  }, // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

  //for level2
  removeNamedItemNS: function removeNamedItemNS(namespaceURI, localName) {
    var attr = this.getNamedItemNS(namespaceURI, localName);
    _removeNamedNode(this._ownerElement, this, attr);
    return attr;
  },
  getNamedItemNS: function getNamedItemNS(namespaceURI, localName) {
    var i = this.length;
    while (i--) {
      var node = this[i];
      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node;
      }
    }
    return null;
  } };

/**
        * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
        */
function DOMImplementation( /* Object */features) {
  this._features = {};
  if (features) {
    for (var feature in features) {
      this._features = features[feature];
    }
  }
};

DOMImplementation.prototype = {
  hasFeature: function hasFeature( /* string */feature, /* string */version) {
    var versions = this._features[feature.toLowerCase()];
    if (versions && (!version || version in versions)) {
      return true;
    } else {
      return false;
    }
  },
  // Introduced in DOM Level 2:
  createDocument: function createDocument(namespaceURI, qualifiedName, doctype) {// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
    var doc = new Document();
    doc.implementation = this;
    doc.childNodes = new NodeList();
    doc.doctype = doctype;
    if (doctype) {
      doc.appendChild(doctype);
    }
    if (qualifiedName) {
      var root = doc.createElementNS(namespaceURI, qualifiedName);
      doc.appendChild(root);
    }
    return doc;
  },
  // Introduced in DOM Level 2:
  createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
    var node = new DocumentType();
    node.name = qualifiedName;
    node.nodeName = qualifiedName;
    node.publicId = publicId;
    node.systemId = systemId;
    // Introduced in DOM Level 2:
    //readonly attribute DOMString        internalSubset;

    //TODO:..
    //  readonly attribute NamedNodeMap     entities;
    //  readonly attribute NamedNodeMap     notations;
    return node;
  } };



/**
        * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
        */

function Node() {
};

Node.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function insertBefore(newChild, refChild) {//raises
    return _insertBefore(this, newChild, refChild);
  },
  replaceChild: function replaceChild(newChild, oldChild) {//raises
    this.insertBefore(newChild, oldChild);
    if (oldChild) {
      this.removeChild(oldChild);
    }
  },
  removeChild: function removeChild(oldChild) {
    return _removeChild(this, oldChild);
  },
  appendChild: function appendChild(newChild) {
    return this.insertBefore(newChild, null);
  },
  hasChildNodes: function hasChildNodes() {
    return this.firstChild != null;
  },
  cloneNode: function cloneNode(deep) {
    return _cloneNode(this.ownerDocument || this, this, deep);
  },
  // Modified in DOM Level 2:
  normalize: function normalize() {
    var child = this.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
        this.removeChild(next);
        child.appendData(next.data);
      } else {
        child.normalize();
        child = next;
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function isSupported(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function hasAttributes() {
    return this.attributes.length > 0;
  },
  lookupPrefix: function lookupPrefix(namespaceURI) {
    var el = this;
    while (el) {
      var map = el._nsMap;
      //console.dir(map)
      if (map) {
        for (var n in map) {
          if (map[n] == namespaceURI) {
            return n;
          }
        }
      }
      el = el.nodeType == 2 ? el.ownerDocument : el.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function lookupNamespaceURI(prefix) {
    var el = this;
    while (el) {
      var map = el._nsMap;
      //console.dir(map)
      if (map) {
        if (prefix in map) {
          return map[prefix];
        }
      }
      el = el.nodeType == 2 ? el.ownerDocument : el.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function isDefaultNamespace(namespaceURI) {
    var prefix = this.lookupPrefix(namespaceURI);
    return prefix == null;
  } };



function _xmlEncoder(c) {
  return c == '<' && '&lt;' ||
  c == '>' && '&gt;' ||
  c == '&' && '&amp;' ||
  c == '"' && '&quot;' ||
  '&#' + c.charCodeAt() + ';';
}


copy(NodeType, Node);
copy(NodeType, Node.prototype);

/**
                                 * @param callback return true for continue,false for break
                                 * @return boolean true: break visit;
                                 */
function _visitNode(node, callback) {
  if (callback(node)) {
    return true;
  }
  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) {
        return true;
      }
    } while (node = node.nextSibling);
  }
}


function Document() {
}
function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    //update namespace
    el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
  }
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;
  if (ns == 'http://www.w3.org/2000/xmlns/') {
    //update namespace
    delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
  }
}
function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++;
    //update childNodes
    var cs = el.childNodes;
    if (newChild) {
      cs[cs.length++] = newChild;
    } else {
      //console.log(1)
      var child = el.firstChild;
      var i = 0;
      while (child) {
        cs[i++] = child;
        child = child.nextSibling;
      }
      cs.length = i;
    }
  }
}

/**
   * attributes;
   * children;
   *
   * writeable properties:
   * nodeValue,Attr:value,CharacterData:data
   * prefix
   */
function _removeChild(parentNode, child) {
  var previous = child.previousSibling;
  var next = child.nextSibling;
  if (previous) {
    previous.nextSibling = next;
  } else {
    parentNode.firstChild = next;
  }
  if (next) {
    next.previousSibling = previous;
  } else {
    parentNode.lastChild = previous;
  }
  _onUpdateChild(parentNode.ownerDocument, parentNode);
  return child;
}
/**
   * preformance key(refChild == null)
   */
function _insertBefore(parentNode, newChild, nextChild) {
  var cp = newChild.parentNode;
  if (cp) {
    cp.removeChild(newChild); //remove and update
  }
  if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = newChild.firstChild;
    if (newFirst == null) {
      return newChild;
    }
    var newLast = newChild.lastChild;
  } else {
    newFirst = newLast = newChild;
  }
  var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

  newFirst.previousSibling = pre;
  newLast.nextSibling = nextChild;


  if (pre) {
    pre.nextSibling = newFirst;
  } else {
    parentNode.firstChild = newFirst;
  }
  if (nextChild == null) {
    parentNode.lastChild = newLast;
  } else {
    nextChild.previousSibling = newLast;
  }
  do {
    newFirst.parentNode = parentNode;
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
  _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
  //console.log(parentNode.lastChild.nextSibling == null)
  if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
    newChild.firstChild = newChild.lastChild = null;
  }
  return newChild;
}
function _appendSingleChild(parentNode, newChild) {
  var cp = newChild.parentNode;
  if (cp) {
    var pre = parentNode.lastChild;
    cp.removeChild(newChild); //remove and update
    var pre = parentNode.lastChild;
  }
  var pre = parentNode.lastChild;
  newChild.parentNode = parentNode;
  newChild.previousSibling = pre;
  newChild.nextSibling = null;
  if (pre) {
    pre.nextSibling = newChild;
  } else {
    parentNode.firstChild = newChild;
  }
  parentNode.lastChild = newChild;
  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
  return newChild;
  //console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
  //implementation : null,
  nodeName: '#document',
  nodeType: DOCUMENT_NODE,
  doctype: null,
  documentElement: null,
  _inc: 1,

  insertBefore: function insertBefore(newChild, refChild) {//raises
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      var child = newChild.firstChild;
      while (child) {
        var next = child.nextSibling;
        this.insertBefore(child, refChild);
        child = next;
      }
      return newChild;
    }
    if (this.documentElement == null && newChild.nodeType == 1) {
      this.documentElement = newChild;
    }

    return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
  },
  removeChild: function removeChild(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null;
    }
    return _removeChild(this, oldChild);
  },
  // Introduced in DOM Level 2:
  importNode: function importNode(importedNode, deep) {
    return _importNode(this, importedNode, deep);
  },
  // Introduced in DOM Level 2:
  getElementById: function getElementById(id) {
    var rtv = null;
    _visitNode(this.documentElement, function (node) {
      if (node.nodeType == 1) {
        if (node.getAttribute('id') == id) {
          rtv = node;
          return true;
        }
      }
    });
    return rtv;
  },

  //document factory method:
  createElement: function createElement(tagName) {
    var node = new Element();
    node.ownerDocument = this;
    node.nodeName = tagName;
    node.tagName = tagName;
    node.childNodes = new NodeList();
    var attrs = node.attributes = new NamedNodeMap();
    attrs._ownerElement = node;
    return node;
  },
  createDocumentFragment: function createDocumentFragment() {
    var node = new DocumentFragment();
    node.ownerDocument = this;
    node.childNodes = new NodeList();
    return node;
  },
  createTextNode: function createTextNode(data) {
    var node = new Text();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createComment: function createComment(data) {
    var node = new Comment();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createCDATASection: function createCDATASection(data) {
    var node = new CDATASection();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createProcessingInstruction: function createProcessingInstruction(target, data) {
    var node = new ProcessingInstruction();
    node.ownerDocument = this;
    node.tagName = node.target = target;
    node.nodeValue = node.data = data;
    return node;
  },
  createAttribute: function createAttribute(name) {
    var node = new Attr();
    node.ownerDocument = this;
    node.name = name;
    node.nodeName = name;
    node.localName = name;
    node.specified = true;
    return node;
  },
  createEntityReference: function createEntityReference(name) {
    var node = new EntityReference();
    node.ownerDocument = this;
    node.nodeName = name;
    return node;
  },
  // Introduced in DOM Level 2:
  createElementNS: function createElementNS(namespaceURI, qualifiedName) {
    var node = new Element();
    var pl = qualifiedName.split(':');
    var attrs = node.attributes = new NamedNodeMap();
    node.childNodes = new NodeList();
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.tagName = qualifiedName;
    node.namespaceURI = namespaceURI;
    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      //el.prefix = null;
      node.localName = qualifiedName;
    }
    attrs._ownerElement = node;
    return node;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function createAttributeNS(namespaceURI, qualifiedName) {
    var node = new Attr();
    var pl = qualifiedName.split(':');
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.name = qualifiedName;
    node.namespaceURI = namespaceURI;
    node.specified = true;
    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      //el.prefix = null;
      node.localName = qualifiedName;
    }
    return node;
  } };

_extends(Document, Node);


function Element() {
  this._nsMap = {};
};
Element.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute: function hasAttribute(name) {
    return this.getAttributeNode(name) != null;
  },
  getAttribute: function getAttribute(name) {
    var attr = this.getAttributeNode(name);
    return attr && attr.value || '';
  },
  getAttributeNode: function getAttributeNode(name) {
    return this.attributes.getNamedItem(name);
  },
  setAttribute: function setAttribute(name, value) {
    var attr = this.ownerDocument.createAttribute(name);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  removeAttribute: function removeAttribute(name) {
    var attr = this.getAttributeNode(name);
    attr && this.removeAttributeNode(attr);
  },

  //four real opeartion method
  appendChild: function appendChild(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null);
    } else {
      return _appendSingleChild(this, newChild);
    }
  },
  setAttributeNode: function setAttributeNode(newAttr) {
    return this.attributes.setNamedItem(newAttr);
  },
  setAttributeNodeNS: function setAttributeNodeNS(newAttr) {
    return this.attributes.setNamedItemNS(newAttr);
  },
  removeAttributeNode: function removeAttributeNode(oldAttr) {
    return this.attributes.removeNamedItem(oldAttr.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function removeAttributeNS(namespaceURI, localName) {
    var old = this.getAttributeNodeNS(namespaceURI, localName);
    old && this.removeAttributeNode(old);
  },

  hasAttributeNS: function hasAttributeNS(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null;
  },
  getAttributeNS: function getAttributeNS(namespaceURI, localName) {
    var attr = this.getAttributeNodeNS(namespaceURI, localName);
    return attr && attr.value || '';
  },
  setAttributeNS: function setAttributeNS(namespaceURI, qualifiedName, value) {
    var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  getAttributeNodeNS: function getAttributeNodeNS(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  },

  getElementsByTagName: function getElementsByTagName(tagName) {
    return new LiveNodeList(this, function (base) {
      var ls = [];
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  },
  getElementsByTagNameNS: function getElementsByTagNameNS(namespaceURI, localName) {
    return new LiveNodeList(this, function (base) {
      var ls = [];
      _visitNode(base, function (node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  } };

Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element, Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr, Node);


function CharacterData() {
};
CharacterData.prototype = {
  data: '',
  substringData: function substringData(offset, count) {
    return this.data.substring(offset, offset + count);
  },
  appendData: function appendData(text) {
    text = this.data + text;
    this.nodeValue = this.data = text;
    this.length = text.length;
  },
  insertData: function insertData(offset, text) {
    this.replaceData(offset, 0, text);

  },
  appendChild: function appendChild(newChild) {
    //if(!(newChild instanceof CharacterData)){
    throw new Error(ExceptionMessage[3]);
    //}
    return Node.prototype.appendChild.apply(this, arguments);
  },
  deleteData: function deleteData(offset, count) {
    this.replaceData(offset, count, "");
  },
  replaceData: function replaceData(offset, count, text) {
    var start = this.data.substring(0, offset);
    var end = this.data.substring(offset + count);
    text = start + text + end;
    this.nodeValue = this.data = text;
    this.length = text.length;
  } };

_extends(CharacterData, Node);
function Text() {
};
Text.prototype = {
  nodeName: "#text",
  nodeType: TEXT_NODE,
  splitText: function splitText(offset) {
    var text = this.data;
    var newText = text.substring(offset);
    text = text.substring(0, offset);
    this.data = this.nodeValue = text;
    this.length = text.length;
    var newNode = this.ownerDocument.createTextNode(newText);
    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling);
    }
    return newNode;
  } };

_extends(Text, CharacterData);
function Comment() {
};
Comment.prototype = {
  nodeName: "#comment",
  nodeType: COMMENT_NODE };

_extends(Comment, CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
  nodeName: "#cdata-section",
  nodeType: CDATA_SECTION_NODE };

_extends(CDATASection, CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType, Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation, Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity, Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference, Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName = "#document-fragment";
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment, Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction, Node);
function XMLSerializer() {
}
XMLSerializer.prototype.serializeToString = function (node, attributeSorter) {
  return node.toString(attributeSorter);
};
Node.prototype.toString = function (attributeSorter) {
  var buf = [];
  serializeToString(this, buf, attributeSorter);
  return buf.join('');
};
function serializeToString(node, buf, attributeSorter, isHTML) {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var len = attrs.length;
      var child = node.firstChild;
      var nodeName = node.tagName;
      isHTML = htmlns === node.namespaceURI || isHTML;
      buf.push('<', nodeName);
      if (attributeSorter) {
        buf.sort.apply(attrs, attributeSorter);
      }
      for (var i = 0; i < len; i++) {
        serializeToString(attrs.item(i), buf, attributeSorter, isHTML);
      }
      if (child || isHTML && !/^(?:meta|link|img|br|hr|input|button)$/i.test(nodeName)) {
        buf.push('>');
        //if is cdata child node
        if (isHTML && /^script$/i.test(nodeName)) {
          if (child) {
            buf.push(child.data);
          }
        } else {
          while (child) {
            serializeToString(child, buf, attributeSorter, isHTML);
            child = child.nextSibling;
          }
        }
        buf.push('</', nodeName, '>');
      } else {
        buf.push('/>');
      }
      return;
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild;
      while (child) {
        serializeToString(child, buf, attributeSorter, isHTML);
        child = child.nextSibling;
      }
      return;
    case ATTRIBUTE_NODE:
      return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');
    case TEXT_NODE:
      return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));
    case CDATA_SECTION_NODE:
      return buf.push('<![CDATA[', node.data, ']]>');
    case COMMENT_NODE:
      return buf.push("<!--", node.data, "-->");
    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId;
      var sysid = node.systemId;
      buf.push('<!DOCTYPE ', node.name);
      if (pubid) {
        buf.push(' PUBLIC "', pubid);
        if (sysid && sysid != '.') {
          buf.push('" "', sysid);
        }
        buf.push('">');
      } else if (sysid && sysid != '.') {
        buf.push(' SYSTEM "', sysid, '">');
      } else {
        var sub = node.internalSubset;
        if (sub) {
          buf.push(" [", sub, "]");
        }
        buf.push(">");
      }
      return;
    case PROCESSING_INSTRUCTION_NODE:
      return buf.push("<?", node.target, " ", node.data, "?>");
    case ENTITY_REFERENCE_NODE:
      return buf.push('&', node.nodeName, ';');
    //case ENTITY_NODE:
    //case NOTATION_NODE:
    default:
      buf.push('??', node.nodeName);}

}
function _importNode(doc, node, deep) {
  var node2;
  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false);
      node2.ownerDocument = doc;
    //var attrs = node2.attributes;
    //var len = attrs.length;
    //for(var i=0;i<len;i++){
    //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
    //}
    case DOCUMENT_FRAGMENT_NODE:
      break;
    case ATTRIBUTE_NODE:
      deep = true;
      break;
    //case ENTITY_REFERENCE_NODE:
    //case PROCESSING_INSTRUCTION_NODE:
    ////case TEXT_NODE:
    //case CDATA_SECTION_NODE:
    //case COMMENT_NODE:
    //	deep = false;
    //	break;
    //case DOCUMENT_NODE:
    //case DOCUMENT_TYPE_NODE:
    //cannot be imported.
    //case ENTITY_NODE:
    //case NOTATION_NODE：
    //can not hit in level3
    //default:throw e;
  }
  if (!node2) {
    node2 = node.cloneNode(false); //false
  }
  node2.ownerDocument = doc;
  node2.parentNode = null;
  if (deep) {
    var child = node.firstChild;
    while (child) {
      node2.appendChild(_importNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function _cloneNode(doc, node, deep) {
  var node2 = new node.constructor();
  for (var n in node) {
    var v = node[n];
    if (typeof v != 'object') {
      if (v != node2[n]) {
        node2[n] = v;
      }
    }
  }
  if (node.childNodes) {
    node2.childNodes = new NodeList();
  }
  node2.ownerDocument = doc;
  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var attrs2 = node2.attributes = new NamedNodeMap();
      var len = attrs.length;
      attrs2._ownerElement = node2;
      for (var i = 0; i < len; i++) {
        node2.setAttributeNode(_cloneNode(doc, attrs.item(i), true));
      }
      break;
      ;
    case ATTRIBUTE_NODE:
      deep = true;}

  if (deep) {
    var child = node.firstChild;
    while (child) {
      node2.appendChild(_cloneNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}

function __set__(object, key, value) {
  object[key] = value;
}
//do dynamic
try {
  if (Object.defineProperty) {var






























    getTextContent = function getTextContent(node) {
      switch (node.nodeType) {
        case 1:
        case 11:
          var buf = [];
          node = node.firstChild;
          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node));
            }
            node = node.nextSibling;
          }
          return buf.join('');
        default:
          return node.nodeValue;}

    };Object.defineProperty(LiveNodeList.prototype, 'length', { get: function get() {_updateLiveList(this);return this.$$length;} });Object.defineProperty(Node.prototype, 'textContent', { get: function get() {return getTextContent(this);}, set: function set(data) {switch (this.nodeType) {case 1:case 11:while (this.firstChild) {this.removeChild(this.firstChild);}if (data || String(data)) {this.appendChild(this.ownerDocument.createTextNode(data));}break;default: //TODO:
            this.data = data;this.value = value;this.nodeValue = data;}} });
    __set__ = function __set__(object, key, value) {
      //console.log(value)
      object['$$' + key] = value;
    };
  }
} catch (e) {//ie8
}

if (true) {
  exports.DOMImplementation = DOMImplementation;
  exports.XMLSerializer = XMLSerializer;
}

/***/ }),
/* 12 */
/*!*******************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/utils/WebIM.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _strophe = _interopRequireDefault(__webpack_require__(/*! ../sdk/libs/strophe */ 8));

var _connection = _interopRequireDefault(__webpack_require__(/*! ../sdk/connection */ 13));
var _WebIMConfig = _interopRequireDefault(__webpack_require__(/*! ./WebIMConfig */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //import xmldom from "../sdk/libs/xmldom/dom-parser";

// console.group = console.group || {};
// console.groupEnd = console.groupEnd || {};

var window = {};
var WebIM = window.WebIM = _connection.default;
window.WebIM.config = _WebIMConfig.default;
//var DOMParser = window.DOMParser = xmldom.DOMParser;
//let document = window.document = new DOMParser().parseFromString("<?xml version='1.0'?>\n", "text/xml");

WebIM.isDebug = function (option) {
  if (option) {
    WebIM.config.isDebug = option.isDebug;
    openDebug(WebIM.config.isDebug);
  }

  function openDebug(value) {
    function ts() {
      var d = new Date();
      var Hours = d.getHours(); // 获取当前小时数(0-23)
      var Minutes = d.getMinutes(); // 获取当前分钟数(0-59)
      var Seconds = d.getSeconds(); // 获取当前秒数(0-59)
      return (Hours < 10 ? "0" + Hours : Hours) + ":" + (Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (Seconds < 10 ? "0" + Seconds : Seconds) + " ";
    }

    _strophe.default.Strophe.log = function (level, msg) {
      // console.log(ts(), level, msg);
    };

    if (value) {
      _strophe.default.Strophe.Connection.prototype.rawOutput = function (data) {
        try {
          // console.group("%csend # " + ts(), "color: blue; font-size: large");
          console.log("%c" + data, "color: blue");
          // console.groupEnd();
        }
        catch (e) {
          console.log(e);
        }
      };
    } else {
      _strophe.default.Strophe.Connection.prototype.rawOutput = function () {};
    }

  }
};

/**
    * Set autoSignIn as true (autoSignInName and autoSignInPwd are configured below),
    * You can auto signed in each time when you refresh the page in dev model.
    */
WebIM.config.autoSignIn = false;
if (WebIM.config.autoSignIn) {
  WebIM.config.autoSignInName = "lwz2";
  WebIM.config.autoSignInPwd = "1";
}


// var stropheConn = new window.Strophe.Connection("ws://im-api.easemob.com/ws/", {
//                 inactivity: 30,
//                 maxRetries: 5,
//                 pollingTime: 4500
//             });
//
// stropheConn.connect(
//   '$t$' + 'YWMtmbQEBKKIEeaGmMtXyg5n1wAAAVlkQvGO2WOJGlMCEJKM4VV9GCMnb_XLCXU',
//   function() {
//     console.log(arguments, 'ggogogo');
//   }, stropheConn.wait, stropheConn.hold);
WebIM.parseEmoji = function (msg) {
  if (typeof WebIM.Emoji === "undefined" || typeof WebIM.Emoji.map === "undefined") {
    return msg;
  }
  var emoji = WebIM.Emoji,
  reg = null;
  var msgList = [];
  var objList = [];
  for (var face in emoji.map) {
    if (emoji.map.hasOwnProperty(face)) {
      while (msg.indexOf(face) > -1) {
        msg = msg.replace(face, "^" + emoji.map[face] + "^");
      }
    }
  }
  var ary = msg.split("^");
  var reg = /^e.*g$/;
  for (var i = 0; i < ary.length; i++) {
    if (ary[i] != "") {
      msgList.push(ary[i]);
    }
  }
  for (var i = 0; i < msgList.length; i++) {
    if (reg.test(msgList[i])) {
      var obj = {};
      obj.data = msgList[i];
      obj.type = "emoji";
      objList.push(obj);
    } else
    {
      var obj = {};
      obj.data = msgList[i];
      obj.type = "txt";
      objList.push(obj);
    }
  }
  return objList;
};

WebIM.time = function () {
  var date = new Date();
  var Hours = date.getHours();
  var Minutes = date.getMinutes();
  var Seconds = date.getSeconds();
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (
  Hours < 10 ? "0" + Hours : Hours) + ":" + (Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (Seconds < 10 ? "0" + Seconds : Seconds);
  return time;
};

WebIM.Emoji = {
  path: "/static/images/faces/",
  map: {
    "[):]": "ee_1.png",
    "[:D]": "ee_2.png",
    "[;)]": "ee_3.png",
    "[:-o]": "ee_4.png",
    "[:p]": "ee_5.png",
    "[(H)]": "ee_6.png",
    "[:@]": "ee_7.png",
    "[:s]": "ee_8.png",
    "[:$]": "ee_9.png",
    "[:(]": "ee_10.png",
    "[:'(]": "ee_11.png",
    "[<o)]": "ee_12.png",
    "[(a)]": "ee_13.png",
    "[8o|]": "ee_14.png",
    "[8-|]": "ee_15.png",
    "[+o(]": "ee_16.png",
    "[|-)]": "ee_17.png",
    "[:|]": "ee_18.png",
    "[*-)]": "ee_19.png",
    "[:-#]": "ee_20.png",
    "[^o)]": "ee_21.png",
    "[:-*]": "ee_22.png",
    "[8-)]": "ee_23.png",
    "[del]": "btn_del.png",
    "[(|)]": "ee_24.png",
    "[(u)]": "ee_25.png",
    "[(S)]": "ee_26.png",
    "[(*)]": "ee_27.png",
    "[(#)]": "ee_28.png",
    "[(R)]": "ee_29.png",
    "[({)]": "ee_30.png",
    "[(})]": "ee_31.png",
    "[(k)]": "ee_32.png",
    "[(F)]": "ee_33.png",
    "[(W)]": "ee_34.png",
    "[(D)]": "ee_35.png" } };



WebIM.EmojiObj = {
  // 相对 emoji.js 路径
  path: "/static/images/faces/",
  map1: {
    "[):]": "ee_1.png",
    "[:D]": "ee_2.png",
    "[;)]": "ee_3.png",
    "[:-o]": "ee_4.png",
    "[:p]": "ee_5.png",
    "[(H)]": "ee_6.png",
    "[:@]": "ee_7.png" },

  map2: {
    "[:s]": "ee_8.png",
    "[:$]": "ee_9.png",
    "[:(]": "ee_10.png",
    "[:'(]": "ee_11.png",
    "[<o)]": "ee_12.png",
    "[(a)]": "ee_13.png",
    "[8o|]": "ee_14.png" },

  map3: {
    "[8-|]": "ee_15.png",
    "[+o(]": "ee_16.png",
    "[|-)]": "ee_17.png",
    "[:|]": "ee_18.png",
    "[*-)]": "ee_19.png",
    "[:-#]": "ee_20.png",
    "[del]": "del.png" },

  map4: {
    "[^o)]": "ee_21.png",
    "[:-*]": "ee_22.png",
    "[8-)]": "ee_23.png",
    "[(|)]": "ee_24.png",
    "[(u)]": "ee_25.png",
    "[(S)]": "ee_26.png",
    "[(*)]": "ee_27.png" },

  map5: {
    "[(#)]": "ee_28.png",
    "[(R)]": "ee_29.png",
    "[({)]": "ee_30.png",
    "[(})]": "ee_31.png",
    "[(k)]": "ee_32.png",
    "[(F)]": "ee_33.png",
    "[(W)]": "ee_34.png",
    "[(D)]": "ee_35.png" },

  map6: {
    "[del]": "del.png" } };



// wx.connectSocket({url: WebIM.config.xmppURL, method: "GET"})

WebIM.conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === "boolean" ? WebIM.config.https : location.protocol === "https:",
  url: WebIM.config.xmppURL,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval });


// async response
// WebIM.conn.listen({
//   onOpened: () => dispatch({type: Types.ON_OPEND})
// })

// export default WebIM;
module.exports = {
  "default": WebIM };

/***/ }),
/* 13 */
/*!**********************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/connection.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _strophe = _interopRequireDefault(__webpack_require__(/*! ./libs/strophe */ 8));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var WebIM = {};
var Strophe = _strophe.default.Strophe;

Strophe.log = function (level, msg) {
  // console.log(ts(), level, msg);
};
var xmldom = __webpack_require__(/*! ./libs/xmldom/dom-parser */ 9);
// //console.log('xml',xmldom, typeof xmldom.DOMParser);
var DOMParser = xmldom.DOMParser;
var window = {};
var _version = "1.1.3";
var _code = __webpack_require__(/*! ./status */ 14).code;
var _utils = __webpack_require__(/*! ./utils */ 15).utils;
var _msg = __webpack_require__(/*! ./message */ 16);
var _message = _msg._msg;
var _msgHash = {};
var Queue = __webpack_require__(/*! ./queue */ 17).Queue;
var location = window.location || {
  protocol: "https:" };

window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

if (window.XDomainRequest) {
  XDomainRequest.prototype.oldsend = XDomainRequest.prototype.send;
  XDomainRequest.prototype.send = function () {
    XDomainRequest.prototype.oldsend.apply(this, arguments);
    this.readyState = 2;
  };
}

Strophe.Request.prototype._newXHR = function () {
  var xhr = _utils.xmlrequest(true);
  if (xhr.overrideMimeType) {
    xhr.overrideMimeType("text/xml");
  }
  // use Function.bind() to prepend ourselves as an argument
  xhr.onreadystatechange = this.func.bind(null, this);
  return xhr;
};

Strophe.Websocket.prototype._onSocketClose = function (e) {
  // if(e.code && e.code == 1000){
  //
  // }
  // else{
  // 	reOpenEntry();
  // }
};

/**
    *
    * Strophe.Websocket has a bug while logout:
    * 1.send: <presence xmlns='jabber:client' type='unavailable'/> is ok;
    * 2.send: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/> will cause a problem,log as follows:
    * WebSocket connection to 'ws://im-api.easemob.com/ws/' failed: Data frame received after close_connect @ strophe.js:5292connect @ strophe.js:2491_login @ websdk-1.1.2.js:278suc @ websdk-1.1.2.js:636xhr.onreadystatechange @ websdk-1.1.2.js:2582
    * 3 "Websocket error [object Event]"
    * _changeConnectStatus
    * onError Object {type: 7, msg: "The WebSocket connection could not be established or was disconnected.", reconnect: true}
    *
    * this will trigger socket.onError, therefore _doDisconnect again.
    * Fix it by overide  _onMessage
    */
Strophe.Websocket.prototype._onMessage = function (message) {
  var elem, data;
  // WebIM && WebIM.config.isDebug && //console.log(WebIM.utils.ts() + 'recv:', message.data);
  try {
    if (WebIM && WebIM.config.isDebug) {
      console.group("%crecv # ", "color: green; font-size: large");
      console.log("%c" + message.data, "color: green");
      console.groupEnd();
    }
  } catch (e) {

  } // console.log('%crecv' + message.data, 'color: green');
  // check for closing stream
  // var close = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
  // if (message.data === close) {
  //     this._conn.rawInput(close);
  //     this._conn.xmlInput(message);
  //     if (!this._conn.disconnecting) {
  //         this._conn._doDisconnect();
  //     }
  //     return;
  //
  // send and receive close xml: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/>
  // so we can't judge whether message.data equals close by === simply.
  // console.log('DOMParser connection')
  if (message.data.indexOf("<close ") === 0) {
    elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
    var see_uri = elem.getAttribute("see-other-uri");
    if (see_uri) {
      this._conn._changeConnectStatus(Strophe.Status.REDIRECT, "Received see-other-uri, resetting connection");
      this._conn.reset();
      this._conn.service = see_uri;
      this._connect();
    } else {
      // if (!this._conn.disconnecting) {
      this._conn._doDisconnect("receive <close> from server");
      // }
    }
    return;
  } else if (message.data.search("<open ") === 0) {
    // This handles stream restarts
    elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
    if (!this._handleStreamStart(elem)) {
      return;
    }
  } else {
    data = this._streamWrap(message.data);
    elem = new DOMParser().parseFromString(data, "text/xml").documentElement;
  }

  // console.log('DOMParser connection ed')
  if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
    return;
  }

  // handle unavailable presence stanza before disconnecting
  if (this._conn.disconnecting &&
  elem.firstChild.nodeName === "presence" &&
  elem.firstChild.getAttribute("type") === "unavailable")
  {
    this._conn.xmlInput(elem);
    this._conn.rawInput(Strophe.serialize(elem));
    // if we are already disconnecting we will ignore the unavailable stanza and
    // wait for the </stream:stream> tag before we close the connection
    return;
  }
  this._conn._dataRecv(elem, message.data);
};


function _listenNetwork(onlineCallback, offlineCallback) {
  if (window.addEventListener) {
    window.addEventListener("online", onlineCallback);
    window.addEventListener("offline", offlineCallback);

  } else if (window.attachEvent) {
    if (document.body) {
      document.body.attachEvent("ononline", onlineCallback);
      document.body.attachEvent("onoffline", offlineCallback);
    } else {
      window.attachEvent("load", function () {
        document.body.attachEvent("ononline", onlineCallback);
        document.body.attachEvent("onoffline", offlineCallback);
      });
    }
  } else {
    /* var onlineTmp = window.ononline;
           var offlineTmp = window.onoffline;
           window.attachEvent('ononline', function () {
           try {
           typeof onlineTmp === 'function' && onlineTmp();
           } catch ( e ) {}
           onlineCallback();
           });
           window.attachEvent('onoffline', function () {
           try {
           typeof offlineTmp === 'function' && offlineTmp();
           } catch ( e ) {}
           offlineCallback();
           });*/
  }
}

function _parseRoom(result) {
  var rooms = [];
  var items = result.getElementsByTagName("item");
  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var roomJid = item.getAttribute("jid");
      var tmp = roomJid.split("@")[0];
      var room = {
        jid: roomJid,
        name: item.getAttribute("name"),
        roomId: tmp.split("_")[1] };

      rooms.push(room);
    }
  }
  return rooms;
}

function _parseRoomOccupants(result) {
  var occupants = [];
  var items = result.getElementsByTagName("item");
  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var room = {
        jid: item.getAttribute("jid"),
        name: item.getAttribute("name") };

      occupants.push(room);
    }
  }
  return occupants;
}

function _parseResponseMessage(msginfo) {
  var parseMsgData = {
    errorMsg: true,
    data: [] };

  // //console.log('msginfo', msginfo)
  var msgBodies = msginfo.getElementsByTagName("body");
  // //console.log('msginfo', msgBodies)
  if (msgBodies) {
    for (var i = 0; i < msgBodies.length; i++) {
      var msgBody = msgBodies[i];
      var childNodes = msgBody.childNodes;
      if (childNodes && childNodes.length > 0) {
        var childNode = msgBody.childNodes[0];
        if (childNode.nodeType == Strophe.ElementType.TEXT) {
          var jsondata = childNode.wholeText || childNode.nodeValue;
          jsondata = jsondata.replace("\n", "<br>");
          try {
            var data = JSON.parse(jsondata);
            parseMsgData.errorMsg = false;
            parseMsgData.data = [data];
          } catch (e) {}
        }
      }
    }
    var delayTags = msginfo.getElementsByTagName("delay");
    if (delayTags && delayTags.length > 0) {
      var delayTag = delayTags[0];
      var delayMsgTime = delayTag.getAttribute("stamp");
      if (delayMsgTime) {
        parseMsgData.delayTimeStamp = delayMsgTime;
      }
    }
  } else {
    var childrens = msginfo.childNodes;
    if (childrens && childrens.length > 0) {
      var child = msginfo.childNodes[0];
      if (child.nodeType == Strophe.ElementType.TEXT) {
        try {
          var _data = eval("(" + child.nodeValue + ")");
          parseMsgData.errorMsg = false;
          parseMsgData.data = [_data];
        } catch (e) {}
      }
    }
  }
  return parseMsgData;
}

function _parseNameFromJidFn(jid, domain) {
  var tempstr = jid;
  var findex = tempstr.indexOf("_");
  domain = domain || "";
  if (findex !== -1) {
    tempstr = tempstr.substring(findex + 1);
  }
  var atindex = tempstr.indexOf("@" + domain);
  if (atindex !== -1) {
    tempstr = tempstr.substring(0, atindex);
  }
  return tempstr;
}

function _parseFriend(queryTag, conn, from) {
  var rouster = [];
  var items = queryTag.getElementsByTagName("item");
  if (items) {var _loop = function _loop(
    i) {
      var groups = [];
      var item = items[i];
      var jid = item.getAttribute("jid");
      if (!jid) {
        return "continue";
      }
      var subscription = item.getAttribute("subscription");
      var friend = {
        subscription: subscription,
        jid: jid };

      var ask = item.getAttribute("ask");
      if (ask) {
        friend.ask = ask;
      }
      var name = item.getAttribute("name");
      if (name) {
        friend.name = name;
      } else {
        friend.name = _parseNameFromJidFn(jid);
      }
      Strophe.forEachChild(item, "group", function (group) {
        groups.push(Strophe.getText(group));
      });
      friend.groups = groups;
      rouster.push(friend);
      // B 同意之后 -> B 订阅 A
      if (conn && subscription == "from") {
        conn.subscribe({
          toJid: jid });

      }
      if (conn && subscription == "to") {
        conn.subscribed({
          toJid: jid });

      }};for (var i = 0; i < items.length; i++) {var _ret = _loop(i);if (_ret === "continue") continue;
    }
  }
  return rouster;
}

function _parseMessageType(msginfo) {
  var msgtype = "normal";
  var receiveinfo = msginfo.getElementsByTagName("received");
  if (receiveinfo && receiveinfo.length > 0 && receiveinfo[0].namespaceURI === "urn:xmpp:receipts") {
    msgtype = "received";
  } else {
    var inviteinfo = msginfo.getElementsByTagName("invite");
    if (inviteinfo && inviteinfo.length > 0) {
      msgtype = "invite";
    }
  }
  return msgtype;
}

function _handleMessageQueue(conn) {
  for (var i in _msgHash) {
    if (Object.hasOwnProperty.call(_msgHash, i)) {
      _msgHash[i].send(conn);
    }
  }
}

function _loginCallback(status, msg, conn) {
  var error;
  var conflict = msg === "conflict";
  if (status == Strophe.Status.CONNFAIL) {
    // client offline, ping/pong timeout, server quit, server offline
    error = {
      type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR, // 客户端网络离线
      msg: msg };

    conflict && (error.conflict = true);
    conn.onError(error);
  } else if (status == Strophe.Status.ATTACHED || status == Strophe.Status.CONNECTED) {
    conn.autoReconnectNumTotal = 0;
    // client should limit the speed of sending ack messages  up to 5/s
    conn.intervalId = setInterval(function () {
      conn.handelSendQueue();
    }, 200);
    var handleMessage = function handleMessage(msginfo) {
      var type = _parseMessageType(msginfo);
      if (type === "received") {
        conn.handleReceivedMessage(msginfo);
        return true;
      } else if (type === "invite") {
        conn.handleInviteMessage(msginfo);
        return true;
      }
      conn.handleMessage(msginfo);
      return true;
    };
    var handlePresence = function handlePresence(msginfo) {
      conn.handlePresence(msginfo);
      return true;
    };
    // let handlePing = function(msginfo){
    // 	conn.handlePing(msginfo);
    // 	return true;
    // };
    var handleIqRoster = function handleIqRoster(msginfo) {
      conn.handleIqRoster(msginfo);
      return true;
    };
    var handleIqPrivacy = function handleIqPrivacy(msginfo) {
      conn.handleIqPrivacy(msginfo);
      return true;
    };
    var handleIq = function handleIq(msginfo) {
      conn.handleIq(msginfo);
      return true;
    };
    conn.addHandler(handleMessage, null, "message", null, null, null);
    conn.addHandler(handlePresence, null, "presence", null, null, null);
    // conn.addHandler(handlePing, "urn:xmpp:ping", "iq", "get", null, null);
    conn.addHandler(handleIqRoster, "jabber:iq:roster", "iq", "set", null, null);
    conn.addHandler(handleIqPrivacy, "jabber:iq:privacy", "iq", "set", null, null);
    conn.addHandler(handleIq, null, "iq", null, null, null);

    conn.context.status = _code.STATUS_OPENED;

    var supportRecMessage = [
    _code.WEBIM_MESSAGE_REC_TEXT,
    _code.WEBIM_MESSAGE_REC_EMOJI];

    var supportSedMessage = [
    _code.WEBIM_MESSAGE_SED_TEXT];

    if (_utils.isCanDownLoadFile) {
      supportRecMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
      supportRecMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
    }
    if (_utils.isCanUploadFile) {
      supportSedMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
      supportSedMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
    }
    conn.notifyVersion();
    conn.retry && _handleMessageQueue(conn);
    conn.heartBeat();
    conn.isAutoLogin && conn.setPresence();
    conn.onOpened({
      canReceive: supportRecMessage,
      canSend: supportSedMessage,
      accessToken: conn.context.accessToken });

    conn.onSocketConnected();
  } else if (status == Strophe.Status.DISCONNECTING) {
    if (conn.isOpened()) {
      if (conn.autoReconnectNumTotal < conn.autoReconnectNumMax) {
        if (conn.autoReconnectNumTotal == 0) {conn.onReconnect();}
        conn.reconnect();
        return;
      } else if (conn.autoReconnectNumTotal == conn.autoReconnectNumMax) {
        console.log("Err 3");
        error = {
          type: _code.WEBIM_CONNCTION_DISCONNECTED };

        conn.onError(error);
        conn.context.status = _code.STATUS_CLOSED;
        conn.clear();
        conn.onClosed();
      }
      conn.stopHeartBeat();
      // error = {
      // 	type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR,
      // 	msg: msg
      // };
      // conflict && (error.conflict = true);
      // conn.onError(error);
    }
    conn.context.status = _code.STATUS_CLOSING;
  } else if (status == Strophe.Status.DISCONNECTED) {
    if (conn.isOpened()) {
      if (conn.autoReconnectNumTotal < conn.autoReconnectNumMax) {
        if (conn.autoReconnectNumTotal == 0) {conn.onReconnect();}
        conn.reconnect();
        return;
      } else if (conn.autoReconnectNumTotal == conn.autoReconnectNumMax) {
        conn.context.status = _code.STATUS_CLOSED;
        conn.clear();
        conn.onClosed();
        conn.stopHeartBeat();
      }
      console.log("Err 4");
      error = {
        type: _code.WEBIM_CONNCTION_DISCONNECTED };

      conn.onError(error);
    }
    conn.context.status = _code.STATUS_CLOSED;
  } else if (status == Strophe.Status.AUTHFAIL) {
    error = {
      type: _code.WEBIM_CONNCTION_AUTH_ERROR };

    conflict && (error.conflict = true);
    conn.onError(error);
    conn.clear();
    conn.stopHeartBeat();
    wx.closeSocket();
  } else if (status == Strophe.Status.ERROR) {
    conn.context.status = _code.STATUS_ERROR;
    error = {
      type: _code.WEBIM_CONNCTION_SERVER_ERROR };

    conflict && (error.conflict = true);
    conn.onError(error);
    conn.stopHeartBeat();
  }
}

function _login(options, conn) {
  var stropheConn = null;
  var accessToken = options.access_token || "";
  if (accessToken == "") {
    conn.onError({
      type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
      data: options });

    return;
  }
  conn.context.accessToken = options.access_token;
  conn.context.accessTokenExpires = options.expires_in;
  stropheConn = new Strophe.Connection(conn.url, {
    inactivity: conn.inactivity,
    maxRetries: conn.maxRetries,
    pollingTime: conn.pollingTime });

  conn.context.stropheConn = stropheConn;
  if (conn.route) {
    stropheConn.connect(conn.context.jid, "$t$" + accessToken, callback, conn.wait, conn.hold, conn.route);
  } else {
    stropheConn.connect(conn.context.jid, "$t$" + accessToken, callback, conn.wait, conn.hold);
  }

  function callback(status, msg) {
    console.log("connection stat change", status, msg);
    _loginCallback(status, msg, conn);
  }
}

function _getJid(options, conn) {
  var jid = options.toJid || "";
  if (jid === "") {
    var appKey = conn.context.appKey || "";
    var toJid = appKey + "_" + options.to + "@" + conn.domain;
    if (options.resource) {
      toJid = toJid + "/" + options.resource;
    }
    jid = toJid;
  }
  return jid;
}

function _getJidByName(name, conn) {
  return _getJid({
    to: name },
  conn);
}

function _validCheck(options, conn) {
  options = options || {};
  if (options.user == "") {
    conn.onError({
      type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR });

    return false;
  }
  var user = options.user + "" || "";
  var appKey = options.appKey || "";
  var devInfos = appKey.split("#");

  if (devInfos.length !== 2) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }
  var orgName = devInfos[0];
  var appName = devInfos[1];

  if (!orgName) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }
  if (!appName) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }

  var jid = appKey + "_" + user.toLowerCase() + "@" + conn.domain;
  var resource = options.resource || "webim";
  if (conn.isMultiLoginSessions) {
    resource += user + new Date().getTime() + Math.floor(Math.random().toFixed(6) * 1000000);
  }
  conn.context.jid = jid + "/" + resource;
  /* jid: {appkey}_{username}@domain/resource*/
  conn.context.userId = user;
  conn.context.appKey = appKey;
  conn.context.appName = appName;
  conn.context.orgName = orgName;

  return true;
}

function _getXmppUrl(baseUrl, https) {
  if (/^(ws|http)s?:\/\/?/.test(baseUrl)) {
    return baseUrl;
  }
  var url = {
    prefix: "http",
    base: "://" + baseUrl,
    suffix: "/http-bind/" };

  if (https && _utils.isSupportWss) {
    url.prefix = "wss";
    url.suffix = "/ws/";
  } else if (https) {
    url.prefix = "https";
  } else if (window.WebSocket) {
    url.prefix = "ws";
    url.suffix = "/ws/";
  }
  return url.prefix + url.base + url.suffix;
}





// CLASS
function connection(options) {
  if (!(this instanceof connection)) {
    return new connection(options);
  }
  options = options || {};
  this.isMultiLoginSessions = options.isMultiLoginSessions || false;
  this.wait = options.wait || 30;
  this.retry = options.retry || false;
  this.https = options.https || location.protocol === "https:";
  this.url = _getXmppUrl(options.url, this.https);
  this.hold = options.hold || 1;
  this.route = options.route || null;
  this.domain = options.domain || "easemob.com";
  this.inactivity = options.inactivity || 30;
  this.heartBeatWait = options.heartBeatWait || 4500;
  this.maxRetries = options.maxRetries || 5;
  this.isAutoLogin = options.isAutoLogin !== false;
  this.pollingTime = options.pollingTime || 800;
  this.stropheConn = false;
  this.autoReconnectNumMax = options.autoReconnectNumMax || 0;
  this.autoReconnectNumTotal = 0;
  this.autoReconnectInterval = options.autoReconnectInterval || 0;
  this.context = {
    status: _code.STATUS_INIT };

  this.apiUrl = options.apiUrl || "";
  // todo 接收的事件，放到数组里的时候，加上g.isInBackground字段。每帧执行一个事件的时候，如果g.isInBackground=true,就pass
  this.sendQueue = new Queue(); // 接收到的事件队列
  this.intervalId = null;
  this.orgName = "";
  this.appName = "";
  this.token = "";
}

connection.prototype.handelSendQueue = function () {
  var options = this.sendQueue.pop();
  if (options !== null) {
    this.sendReceiptsMessage(options);
  }
};
connection.prototype.listen = function (options) {
  options.url && (this.url = _getXmppUrl(options.url, this.https));
  this.onOpened = options.onOpened || _utils.emptyfn;
  this.onClosed = options.onClosed || _utils.emptyfn;
  this.onReconnect = options.onReconnect || _utils.emptyfn;
  this.onSocketConnected = options.onSocketConnected || _utils.emptyfn;
  this.onTextMessage = options.onTextMessage || _utils.emptyfn;
  this.onEmojiMessage = options.onEmojiMessage || _utils.emptyfn;
  this.onPictureMessage = options.onPictureMessage || _utils.emptyfn;
  this.onAudioMessage = options.onAudioMessage || _utils.emptyfn;
  this.onVideoMessage = options.onVideoMessage || _utils.emptyfn;
  this.onFileMessage = options.onFileMessage || _utils.emptyfn;
  this.onLocationMessage = options.onLocationMessage || _utils.emptyfn;
  this.onCmdMessage = options.onCmdMessage || _utils.emptyfn;
  this.onPresence = options.onPresence || _utils.emptyfn;
  this.onRoster = options.onRoster || _utils.emptyfn;
  this.onError = options.onError || _utils.emptyfn;
  this.onReceivedMessage = options.onReceivedMessage || _utils.emptyfn;
  this.onInviteMessage = options.onInviteMessage || _utils.emptyfn;
  this.onOffline = options.onOffline || _utils.emptyfn;
  this.onOnline = options.onOnline || _utils.emptyfn;
  this.onConfirmPop = options.onConfirmPop || _utils.emptyfn;
  this.onCreateGroup = options.onCreateGroup || _utils.emptyfn;
  // for WindowSDK
  this.onUpdateMyGroupList = options.onUpdateMyGroupList || _utils.emptyfn;
  this.onUpdateMyRoster = options.onUpdateMyRoster || _utils.emptyfn;
  //
  this.onBlacklistUpdate = options.onBlacklistUpdate || _utils.emptyfn;

  _listenNetwork(this.onOnline, this.onOffline);
};
connection.prototype.heartBeatID = 0;
connection.prototype.heartBeat = function () {
  var me = this;
  // // IE8: strophe auto switch from ws to BOSH, need heartbeat
  // var isNeed = !/^ws|wss/.test(me.url);
  // // || /mobile/.test(navigator.userAgent)
  // if(this.heartBeatID || !isNeed){
  // 	return;
  // }
  this.stopHeartBeat();
  this.heartBeatID = setInterval(function () {
    me.ping({
      toJid: me.domain,
      type: "normal" });

  }, this.heartBeatWait);
};
connection.prototype.stopHeartBeat = function () {
  clearInterval(this.heartBeatID);
};
connection.prototype.sendReceiptsMessage = function (options) {
  var dom = _strophe.default.$msg({
    from: this.context.jid || "",
    to: this.domain,
    id: options.id || "" }).
  c("received", {
    xmlns: "urn:xmpp:receipts",
    id: options.id || "" });

  this.sendCommand(dom.tree());
};
connection.prototype.cacheReceiptsMessage = function (options) {
  this.sendQueue.push(options);
};
connection.prototype.open = function (options) {
  var me = this;
  console.log("open", this.isOpening());
  // 防止重复初始化
  if (this.isOpening() || this.isOpened()) {
    console.log("can't open [1]");
    return;
  }
  if (!_validCheck(options, this)) {
    console.log("can't open [2]");
    return;
  }
  if (options.accessToken) {
    options.access_token = options.accessToken;
    this.token = options.access_token;
    _login(options, me);
  } else {

    var apiUrl = options.apiUrl;
    var userId = options.user;
    var pwd = options.pwd || "";
    var appkey = options.appKey;
    var str = appkey.split("#");
    var orgName = str[0];
    var appName = str[1];
    this.orgName = orgName;
    this.appName = appName;
    this.context.status = _code.STATUS_DOLOGIN_USERGRID;
    var loginJson = {
      grant_type: "password",
      username: userId,
      password: pwd,
      timestamp: +new Date() };

    var loginfo = _utils.stringify(loginJson);
    _utils.ajax({
      url: apiUrl + "/" + orgName + "/" + appName + "/token",
      data: loginfo,
      success: suc || _utils.emptyfn,
      error: error || _utils.emptyfn });

  }

  function suc(data, xhr, myName) {
    me.context.status = _code.STATUS_DOLOGIN_IM;
    me.context.restTokenData = data;
    if (data.statusCode != "404" && data.statusCode != "400") {
      // data:
      // 	access_token,
      // 	expires_in,
      // 	user:
      // 		activated,
      // 		created,
      // 		modified,
      // 		nickname,
      // 		type,
      // 		username,
      // 		uuid,
      _login(data.data, me);
    } else {
      error({});
    }
  }

  function error(res, xhr, msg) {
    me.clear();
    if (res.error && res.error_description) {
      me.onError({
        type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
        data: res,
        xhr: xhr });

    } else {
      me.onError({
        type: _code.WEBIM_CONNCTION_OPEN_ERROR,
        data: res,
        xhr: xhr });

    }
  }
  // reOpenEntry = function(){
  // 	me.open(options);
  // };
};
// attach to xmpp server for BOSH
connection.prototype.attach = function (options) {
  var me = this;
  var pass = _validCheck(options, this);
  if (!pass) {
    return;
  }
  options = options || {};
  var accessToken = options.accessToken || "";
  if (accessToken == "") {
    this.onError({
      type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    return;
  }
  var sid = options.sid || "";
  if (sid === "") {
    this.onError({
      type: _code.WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR });

    return;
  }
  var rid = options.rid || "";
  if (rid === "") {
    this.onError({
      type: _code.WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR });

    return;
  }
  var stropheConn = new Strophe.Connection(this.url, {
    inactivity: this.inactivity,
    maxRetries: this.maxRetries,
    pollingTime: this.pollingTime,
    heartBeatWait: this.heartBeatWait });

  this.context.accessToken = accessToken;
  this.context.stropheConn = stropheConn;
  this.context.status = _code.STATUS_DOLOGIN_IM;
  var callback = function callback(status, msg) {
    _loginCallback(status, msg, me);
  };
  var jid = this.context.jid;
  var wait = this.wait;
  var hold = this.hold;
  var wind = this.wind || 5;
  stropheConn.attach(jid, sid, rid, callback, wait, hold, wind);
};
connection.prototype.close = function (reason) {
  this.stopHeartBeat();
  var status = this.context.status;
  if (status == _code.STATUS_INIT) {
    return;
  }
  if (this.isClosed() || this.isClosing()) {
    return;
  }
  this.context.status = _code.STATUS_CLOSING;
  this.context.stropheConn.disconnect(reason);
};
connection.prototype.addHandler = function (handler, ns, name, type, id, from, options) {
  this.context.stropheConn.addHandler(handler, ns, name, type, id, from, options);
};
connection.prototype.notifyVersion = function (suc, fail) {
  var dom = _strophe.default.$iq({
    from: this.context.jid || "",
    to: this.domain,
    type: "result" }).

  c("query", {
    xmlns: "jabber:iq:version" }).

  c("name").
  t("easemob").
  up().
  c("version").
  t(_version).
  up().
  c("os").
  t("webim");

  suc = suc || _utils.emptyfn;
  var error = fail || this.onError;
  var failFn = function failFn(ele) {
    error({
      type: _code.WEBIM_CONNCTION_NOTIFYVERSION_ERROR,
      data: ele });

  };
  this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
};
// handle all types of presence message
connection.prototype.handlePresence = function (msginfo) {
  if (this.isClosed()) {
    return;
  }
  var from = msginfo.getAttribute("from") || "";
  var to = msginfo.getAttribute("to") || "";
  var type = msginfo.getAttribute("type") || "";
  var presence_type = msginfo.getAttribute("presence_type") || "";
  var fromUser = _parseNameFromJidFn(from);
  var toUser = _parseNameFromJidFn(to);
  var isCreate = false;
  var isMemberJoin = false;
  var isDecline = false;
  var isApply = false;
  var info = {
    from: fromUser,
    to: toUser,
    fromJid: from,
    toJid: to,
    type: type,
    chatroom: !!msginfo.getElementsByTagName("roomtype").length };


  var showTags = msginfo.getElementsByTagName("show");
  if (showTags && showTags.length > 0) {
    var showTag = showTags[0];
    info.show = Strophe.getText(showTag);
  }
  var statusTags = msginfo.getElementsByTagName("status");
  if (statusTags && statusTags.length > 0) {
    var statusTag = statusTags[0];
    info.status = Strophe.getText(statusTag);
    info.code = statusTag.getAttribute("code");
  }
  var priorityTags = msginfo.getElementsByTagName("priority");
  if (priorityTags && priorityTags.length > 0) {
    var priorityTag = priorityTags[0];
    info.priority = Strophe.getText(priorityTag);
  }
  var error = msginfo.getElementsByTagName("error");
  if (error && error.length > 0) {
    error = error[0];
    info.error = {
      code: error.getAttribute("code") };

  }
  var destroy = msginfo.getElementsByTagName("destroy");
  if (destroy && destroy.length > 0) {
    destroy = destroy[0];
    info.destroy = true;
    var reason = destroy.getElementsByTagName("reason");
    if (reason && reason.length > 0) {
      info.reason = Strophe.getText(reason[0]);
    }
  }
  var members = msginfo.getElementsByTagName("item");
  if (members && members.length > 0) {
    var member = members[0];
    var role = member.getAttribute("role");
    var jid = member.getAttribute("jid");
    var affiliation = member.getAttribute("affiliation");
    // dismissed by group
    if (role == "none" && jid) {
      var kickedMember = _parseNameFromJidFn(jid);
      var actor = member.getElementsByTagName("actor")[0];
      var actorNick = actor.getAttribute("nick");
      info.actor = actorNick;
      info.kicked = kickedMember;
    }
    // Service Acknowledges Room Creation `createGroupACK`
    if (role == "moderator" && info.code == "201") {
      if (affiliation === "owner") {
        info.type = "createGroupACK";
        isCreate = true;
      }
      // else
      //     info.type = 'joinPublicGroupSuccess';
    }
  }
  var x = msginfo.getElementsByTagName("x");
  if (x && x.length > 0) {
    // 加群申请
    var apply = x[0].getElementsByTagName("apply");
    // 加群成功
    var accept = x[0].getElementsByTagName("accept");
    // 同意加群后用户进群通知
    var item = x[0].getElementsByTagName("item");
    // 加群被拒绝
    var decline = x[0].getElementsByTagName("decline");
    // 被设为管理员
    var addAdmin = x[0].getElementsByTagName("add_admin");
    // 被取消管理员
    var removeAdmin = x[0].getElementsByTagName("remove_admin");
    // 被禁言
    var addMute = x[0].getElementsByTagName("add_mute");
    // 取消禁言
    var removeMute = x[0].getElementsByTagName("remove_mute");
    if (apply && apply.length > 0) {
      isApply = true;
      info.toNick = apply[0].getAttribute("toNick");
      info.type = "joinGroupNotifications";
      var groupJid = apply[0].getAttribute("to");
      var gid = groupJid.split("@")[0].split("_");
      gid = gid[gid.length - 1];
      info.gid = gid;
    } else if (accept && accept.length > 0) {
      info.type = "joinPublicGroupSuccess";
    } else if (item && item.length > 0) {
      var _affiliation = item[0].getAttribute("affiliation");
      var _role = item[0].getAttribute("role");
      if (_affiliation == "member" || _role == "participant") {
        isMemberJoin = true;
        info.mid = info.fromJid.split("/");
        info.mid = info.mid[info.mid.length - 1];
        info.type = "memberJoinPublicGroupSuccess";
        var roomtype = msginfo.getElementsByTagName("roomtype");
        if (roomtype && roomtype.length > 0) {
          var _type = roomtype[0].getAttribute("type");
          if (_type == "chatroom") {
            info.type = "memberJoinChatRoomSuccess";
          }
        }
      } else if (_affiliation == "none" || _role == "none") {
        var _roomtype = msginfo.getElementsByTagName("roomtype");
        if (_roomtype && _roomtype.length > 0) {
          var _type2 = _roomtype[0].getAttribute("type");
          if (_type2 == "chatroom") {
            info.type = "memberLeaveChatRoomSuccess";
          }
        }
      }
    } else if (decline && decline.length) {
      isDecline = true;
      var _gid = decline[0].getAttribute("fromNick");
      var owner = _parseNameFromJidFn(decline[0].getAttribute("from"));
      info.type = "joinPublicGroupDeclined";
      info.owner = owner;
      info.gid = _gid;
    } else if (addAdmin && addAdmin.length > 0) {
      var _gid2 = _parseNameFromJidFn(addAdmin[0].getAttribute("mucjid"));
      var _owner = _parseNameFromJidFn(addAdmin[0].getAttribute("from"));
      info.owner = _owner;
      info.gid = _gid2;
      info.type = "addAdmin";
    } else if (removeAdmin && removeAdmin.length > 0) {
      var _gid3 = _parseNameFromJidFn(removeAdmin[0].getAttribute("mucjid"));
      var _owner2 = _parseNameFromJidFn(removeAdmin[0].getAttribute("from"));
      info.owner = _owner2;
      info.gid = _gid3;
      info.type = "removeAdmin";
    } else if (addMute && addMute.length > 0) {
      var _gid4 = _parseNameFromJidFn(addMute[0].getAttribute("mucjid"));
      var _owner3 = _parseNameFromJidFn(addMute[0].getAttribute("from"));
      info.owner = _owner3;
      info.gid = _gid4;
      info.type = "addMute";
    } else if (removeMute && removeMute.length > 0) {
      var _gid5 = _parseNameFromJidFn(removeMute[0].getAttribute("mucjid"));
      var _owner4 = _parseNameFromJidFn(removeMute[0].getAttribute("from"));
      info.owner = _owner4;
      info.gid = _gid5;
      info.type = "removeMute";
    }
  }
  if (info.chatroom) {
    info.presence_type = presence_type;
    info.original_type = info.type;
    var reflectUser = from.slice(from.lastIndexOf("/") + 1);
    if (reflectUser === this.context.userId) {
      if (info.type === "" && !info.code) {
        info.type = "joinChatRoomSuccess";
      } else if (presence_type === "unavailable" || info.type === "unavailable") {
        // logout successfully.
        if (!info.status) {
          info.type = "leaveChatRoom";
        }
        // logout or dismissied by admin
        else if (info.code == 110) {
            info.type = "leaveChatRoom";
          }
          // The chat room is full
          else if (info.error && info.error.code == 406) {
              info.type = "reachChatRoomCapacity";
            }
      }
    }
  } else {
    info.presence_type = presence_type;
    info.original_type = type;
    if (/subscribe/.test(info.type)) {
      // subscribe | subscribed | unsubscribe | unsubscribed
    } else if (type == "" &&
    !info.status &&
    !info.error &&
    !isCreate &&
    !isApply &&
    !isMemberJoin &&
    !isDecline)
    {

    } // info.type = 'joinPublicGroupSuccess';
    // There is no roomtype when a chat room is deleted.
    else if (presence_type === "unavailable" || type === "unavailable") {
        // Group or Chat room Deleted.
        if (info.destroy) {
          info.type = "deleteGroupChat";
        }
        // Dismissed by group.
        else if (info.code == 307 || info.code == 321) {
            var nick = msginfo.getAttribute("nick");
            if (!nick) {
              info.type = "leaveGroup";
            } else {
              info.type = "removedFromGroup";
            }
          }
      }
  }
  //自己加自己
  if (info.type == 'subscribe' && info.from == info.to) {
    return;
  }
  this.onPresence(info, msginfo);
};

// connection.prototype.handlePing = function(e){
// 	if(this.isClosed()){
// 		return;
// 	}
// 	let id = e.getAttribute("id");
// 	let from = e.getAttribute("from");
// 	let to = e.getAttribute("to");
// 	let dom = $iq({
// 		from: to, to: from, id: id, type: "result"
// 	});
// 	this.sendCommand(dom.tree());
// };

connection.prototype.handleIq = function (iq) {
  return true;
};
connection.prototype.handleIqPrivacy = function (msginfo) {
  var list = msginfo.getElementsByTagName("list");
  if (list.length == 0) {
    return;
  }
  this.getBlacklist();
};
connection.prototype.handleIqRoster = function (e) {
  var id = e.getAttribute("id");
  var from = e.getAttribute("from") || "";
  // var name = _parseNameFromJidFn(from);
  var curJid = this.context.jid;
  // var curUser = this.context.userId;
  var iqresult = _strophe.default.$iq({
    type: "result",
    id: id,
    from: curJid });

  this.sendCommand(iqresult.tree());
  var msgBodies = e.getElementsByTagName("query");
  if (msgBodies && msgBodies.length > 0) {
    var queryTag = msgBodies[0];
    var rouster = _parseFriend(queryTag, this, from);
    this.onRoster(rouster);
  }
  return true;
};
connection.prototype.handleMessage = function (msginfo) {
  if (this.isClosed()) {
    return;
  }
  var id = msginfo.getAttribute("id") || "";
  // cache ack into sendQueue first, handelSendQueue will do the send thing with the speed of 5/s
  this.cacheReceiptsMessage({
    id: id });

  // console.log('handlePresence', msginfo)
  var parseMsgData = _parseResponseMessage(msginfo);
  // console.log('parseMsgData', parseMsgData)
  if (parseMsgData.errorMsg) {
    this.handlePresence(msginfo);
    return;
  }
  // send error
  var error = msginfo.getElementsByTagName("error");
  var errorCode = "";
  var errorText = "";
  var errorBool = false;
  if (error.length > 0) {
    errorBool = true;
    errorCode = error[0].getAttribute("code");
    var textDOM = error[0].getElementsByTagName("text");
    errorText = textDOM[0].textContent || textDOM[0].text;
    // log("handle error", errorCode, errorText);
  }
  var msgDatas = parseMsgData.data;
  for (var i in msgDatas) {
    if (!Object.hasOwnProperty.call(msgDatas, i)) {
      continue;
    }
    var msg = msgDatas[i];
    if (!msg.from || !msg.to) {
      continue;
    }
    var from = (msg.from + "").toLowerCase();
    var too = (msg.to + "").toLowerCase();
    var extmsg = msg.ext || {};
    var chattype = "";
    var typeEl = msginfo.getElementsByTagName("roomtype");
    if (typeEl.length) {
      chattype = typeEl[0].getAttribute("type") || "chat";
    } else {
      chattype = msginfo.getAttribute("type") || "chat";
    }
    var msgBodies = msg.bodies;
    if (!msgBodies || msgBodies.length == 0) {
      continue;
    }
    var msgBody = msg.bodies[0];
    var type = msgBody.type;
    try {
      switch (type) {
        case "txt":
          var receiveMsg = msgBody.msg;
          var emojibody = _utils.parseTextMessage(receiveMsg, WebIM.Emoji);
          if (emojibody.isemoji) {
            var _msg3 = {
              id: id,
              type: chattype,
              from: from,
              to: too,
              delay: parseMsgData.delayTimeStamp,
              data: emojibody.body,
              ext: extmsg };

            !_msg3.delay && delete _msg3.delay;
            _msg3.error = errorBool;
            _msg3.errorText = errorText;
            _msg3.errorCode = errorCode;
            this.onEmojiMessage(_msg3);
          } else {
            var _msg4 = {
              id: id,
              type: chattype,
              from: from,
              to: too,
              delay: parseMsgData.delayTimeStamp,
              data: receiveMsg,
              ext: extmsg };

            !_msg4.delay && delete _msg4.delay;
            _msg4.error = errorBool;
            _msg4.errorText = errorText;
            _msg4.errorCode = errorCode;
            this.onTextMessage(_msg4);
          }
          break;
        case "img":
          var rwidth = 0;
          var rheight = 0;
          if (msgBody.size) {
            rwidth = msgBody.size.width;
            rheight = msgBody.size.height;
          }
          var _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            url: msgBody.url,
            secret: msgBody.secret,
            filename: msgBody.filename,
            thumb: msgBody.thumb,
            thumb_secret: msgBody.thumb_secret,
            file_length: msgBody.file_length || "",
            width: rwidth,
            height: rheight,
            filetype: msgBody.filetype || "",
            accessToken: this.context.accessToken || "",
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onPictureMessage(_msg2);
          break;
        case "audio":
          _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            url: msgBody.url,
            secret: msgBody.secret,
            filename: msgBody.filename,
            length: msgBody.length || "",
            file_length: msgBody.file_length || "",
            filetype: msgBody.filetype || "",
            accessToken: this.context.accessToken || "",
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onAudioMessage(_msg2);
          break;
        case "file":
          _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            url: msgBody.url,
            secret: msgBody.secret,
            filename: msgBody.filename,
            file_length: msgBody.file_length,
            accessToken: this.context.accessToken || "",
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onFileMessage(_msg2);
          break;
        case "loc":
          _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            addr: msgBody.addr,
            lat: msgBody.lat,
            lng: msgBody.lng,
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onLocationMessage(_msg2);
          break;
        case "video":
          _msg2 = {
            id: id,
            type: chattype,
            from: from,
            to: too,
            url: msgBody.url,
            secret: msgBody.secret,
            filename: msgBody.filename,
            file_length: msgBody.file_length,
            accessToken: this.context.accessToken || "",
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onVideoMessage(_msg2);
          break;
        case "cmd":
          _msg2 = {
            id: id,
            from: from,
            to: too,
            action: msgBody.action,
            ext: extmsg,
            delay: parseMsgData.delayTimeStamp };

          !_msg2.delay && delete _msg2.delay;
          _msg2.error = errorBool;
          _msg2.errorText = errorText;
          _msg2.errorCode = errorCode;
          this.onCmdMessage(_msg2);
          break;
        default:
          break;}

    } catch (e) {
      this.onError({
        type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
        data: e });

    }
  }
};
connection.prototype.handleReceivedMessage = function (message) {
  try {
    this.onReceivedMessage(message);
  } catch (e) {
    this.onError({
      type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
      data: e });

  }
  var rcv = message.getElementsByTagName("received");
  var id;
  var mid;
  if (rcv.length > 0) {
    if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
      id = rcv[0].childNodes[0].nodeValue;
    } else {
      id = rcv[0].innerHTML || rcv[0].innerText;
    }
    mid = rcv[0].getAttribute("mid");
  }
  if (_msgHash[id]) {
    try {
      _msgHash[id].msg.success instanceof Function && _msgHash[id].msg.success(id, mid);
    } catch (e) {
      this.onError({
        type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
        data: e });

    }
    delete _msgHash[id];
  }
};
connection.prototype.handleInviteMessage = function (message) {
  var form = null;
  var invitemsg = message.getElementsByTagName("invite");
  var reasonDom = message.getElementsByTagName("reason")[0];
  var reasonMsg = reasonDom.textContent;
  var id = message.getAttribute("id") || "";
  this.sendReceiptsMessage({
    id: id });

  if (invitemsg && invitemsg.length > 0) {
    var fromJid = invitemsg[0].getAttribute("from");
    form = _parseNameFromJidFn(fromJid);
  }
  var xmsg = message.getElementsByTagName("x");
  var roomid = null;
  if (xmsg && xmsg.length > 0) {
    for (var i = 0; i < xmsg.length; i++) {
      if (xmsg[i].namespaceURI === "jabber:x:conference") {
        var roomjid = xmsg[i].getAttribute("jid");
        roomid = _parseNameFromJidFn(roomjid);
      }
    }
  }
  this.onInviteMessage({
    type: "invite",
    from: form,
    roomid: roomid,
    reason: reasonMsg });

};
connection.prototype.sendCommand = function (dom, id) {
  var me = this;
  if (this.isOpened()) {
    var fail = function fail(reason) {
      var data = {};
      data.mid = id;
      data.reason = reason;
      me.onError({
        type: 'socket_error',
        data: data });

    };
    this.context.stropheConn.send(dom, fail);
  } else {
    console.log("Err 5");
    this.onError({
      type: _code.WEBIM_CONNCTION_DISCONNECTED });

  }
};
connection.prototype.getUniqueId = function (prefix) {
  var cdate = new Date();
  var offdate = new Date(2010, 1, 1);
  var offset = cdate.getTime() - offdate.getTime();
  var hexd = parseInt(offset).toString(16);
  if (typeof prefix === "string" || typeof prefix === "number") {
    return prefix + "_" + hexd;
  }
  return "WEBIM_" + hexd;
};
connection.prototype.send = function (message) {
  if (WebIM.config.isWindowSDK) {
    WebIM.doQuery(
    JSON.stringify({
      type: "sendMessage",
      to: message.to,
      message_type: message.type,
      msg: encodeURI(message.msg),
      chatType: message.chatType }),

    function (response) {

    },
    function (code, msg) {

    });

  } else if (Object.prototype.toString.call(message) === "[object Object]") {
    var appKey = this.context.appKey || "";
    var toJid = appKey + "_" + message.to + "@" + this.domain;
    if (message.group) {
      toJid = appKey + "_" + message.to + "@conference." + this.domain;
    }
    if (message.resource) {
      toJid = toJid + "/" + message.resource;
    }
    message.toJid = toJid;
    message.id = message.id || this.getUniqueId();
    _msgHash[message.id] = new _message(message);
    try {
      _msgHash[message.id].send(this);
    } catch (e) {
      console.log('发送失败');
    }

  } else if (typeof message === "string") {
    _msgHash[message] && _msgHash[message].send(this);
  }
};
connection.prototype.addRoster = function (options) {
  var jid = _getJid(options, this);
  var name = options.name || "";
  var groups = options.groups || "";

  var iq = _strophe.default.$iq({
    type: "set" });

  iq.c("query", {
    xmlns: "jabber:iq:roster" });

  iq.c("item", {
    jid: jid,
    name: name });


  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      iq.c("group").t(groups[i]).up();
    }
  }
  var suc = options.success || _utils.emptyfn;
  var error = options.error || _utils.emptyfn;
  this.context.stropheConn.sendIQ(iq.tree(), suc, error);
};
connection.prototype.removeRoster = function (options) {
  var jid = _getJid(options, this);
  var iq = _strophe.default.
  $iq({
    type: "set" }).

  c("query", {
    xmlns: "jabber:iq:roster" }).

  c("item", {
    jid: jid,
    subscription: "remove" });

  var suc = options.success || _utils.emptyfn;
  var error = options.error || _utils.emptyfn;
  this.context.stropheConn.sendIQ(iq, suc, error);
};
connection.prototype.getRoster = function (options) {
  var dom = _strophe.default.$iq({
    type: "get" }).

  c("query", {
    xmlns: "jabber:iq:roster" });

  options = options || {};
  var suc = options.success || this.onRoster;
  var error = options.error || this.onError;
  if (this.isOpened()) {
    this.context.stropheConn.sendIQ(dom.tree(), function (ele) {
      var rouster = [];
      var msgBodies = ele.getElementsByTagName("query");
      if (msgBodies && msgBodies.length > 0) {
        var queryTag = msgBodies[0];
        rouster = _parseFriend(queryTag);
      }
      suc(rouster, ele);
    }, function (ele) {
      error({
        type: _code.WEBIM_CONNCTION_GETROSTER_ERROR,
        data: ele });

    });
  } else {
    error({
      type: _code.WEBIM_CONNCTION_DISCONNECTED });

  }
};
connection.prototype.subscribe = function (options) {
  var jid = _getJid(options, this);
  var pres = _strophe.default.$pres({
    to: jid,
    type: "subscribe" });

  if (options.message) {
    pres.c("status").t(options.message).up();
  }
  if (options.nick) {
    pres.
    c("nick", {
      xmlns: "http://jabber.org/protocol/nick" }).

    t(options.nick);
  }
  this.sendCommand(pres.tree());
};
connection.prototype.subscribed = function (options) {
  var jid = _getJid(options, this);
  var pres = _strophe.default.$pres({
    to: jid,
    type: "subscribed" });

  if (options.message) {
    pres.c("status").t(options.message).up();
  }
  this.sendCommand(pres.tree());
};
connection.prototype.unsubscribe = function (options) {
  var jid = _getJid(options, this);
  var pres = _strophe.default.$pres({
    to: jid,
    type: "unsubscribe" });

  if (options.message) {
    pres.c("status").t(options.message);
  }
  this.sendCommand(pres.tree());
};
connection.prototype.unsubscribed = function (options) {
  var jid = _getJid(options, this);
  var pres = _strophe.default.$pres({
    to: jid,
    type: "unsubscribed" });

  if (options.message) {
    pres.c("status").t(options.message).up();
  }
  this.sendCommand(pres.tree());
};
connection.prototype.createRoom = function (options) {
  var suc = options.success || _utils.emptyfn;
  var err = options.error || _utils.emptyfn;
  var roomiq;
  roomiq = _strophe.default.$iq({
    to: options.roomName,
    type: "set" }).

  c("query", {
    xmlns: Strophe.NS.MUC_OWNER }).

  c("x", {
    xmlns: "jabber:x:data",
    type: "submit" });

  return this.context.stropheConn.sendIQ(roomiq.tree(), suc, err);
};

// connection.prototype.joinPublicGroup = function(options){
// 	var roomJid = this.context.appKey + "_" + options.roomId + "@conference." + this.domain;
// 	var room_nick = roomJid + "/" + this.context.userId;
// 	var suc = options.success || _utils.emptyfn;
// 	var err = options.error || _utils.emptyfn;
// 	var errorFn = function(ele){
// 		err({
// 			type: _code.WEBIM_CONNCTION_JOINROOM_ERROR,
// 			data: ele
// 		});
// 	};
// 	var iq = $pres({
// 		from: this.context.jid,
// 		to: room_nick
// 	})
// 	.c("x", { xmlns: Strophe.NS.MUC });
// 	this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
// };

connection.prototype.listRooms = function (options) {
  var iq = _strophe.default.$iq({
    to: options.server || "conference." + this.domain,
    from: this.context.jid,
    type: "get" }).

  c("query", {
    xmlns: Strophe.NS.DISCO_ITEMS });

  var suc = options.success || _utils.emptyfn;
  var error = options.error || this.onError;
  var completeFn = function completeFn(result) {
    var rooms = [];
    rooms = _parseRoom(result);
    try {
      suc(rooms);
    } catch (e) {
      error({
        type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
        data: e });

    }
  };
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
      data: ele });

  };
  this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};
connection.prototype.queryRoomMember = function (options) {
  var members = [];
  var iq = _strophe.default.$iq({
    to: this.context.appKey + "_" + options.roomId + "@conference." + this.domain,
    type: "get" }).

  c("query", {
    xmlns: Strophe.NS.MUC + "#admin" }).

  c("item", {
    affiliation: "member" });

  var suc = options.success || _utils.emptyfn;
  var completeFn = function completeFn(result) {
    var items = result.getElementsByTagName("item");
    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var mem = {
          jid: item.getAttribute("jid"),
          affiliation: "member" };

        members.push(mem);
      }
    }
    suc(members);
  };
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_GETROOMMEMBER_ERROR,
      data: ele });

  };
  this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};
connection.prototype.queryRoomInfo = function (options) {
  var domain = this.domain;
  var iq = _strophe.default.$iq({
    to: this.context.appKey + "_" + options.roomId + "@conference." + domain,
    type: "get" }).

  c("query", {
    xmlns: Strophe.NS.DISCO_INFO });

  var suc = options.success || _utils.emptyfn;
  var members = [];
  var completeFn = function completeFn(result) {
    var settings = "";
    var features = result.getElementsByTagName("feature");
    if (features) {
      settings = features[1].getAttribute("var") + "|" + features[3].getAttribute("var") + "|" + features[4].getAttribute("var");
    }
    switch (settings) {
      case "muc_public|muc_membersonly|muc_notallowinvites":
        settings = "PUBLIC_JOIN_APPROVAL";
        break;
      case "muc_public|muc_open|muc_notallowinvites":
        settings = "PUBLIC_JOIN_OPEN";
        break;
      case "muc_hidden|muc_membersonly|muc_allowinvites":
        settings = "PRIVATE_MEMBER_INVITE";
        break;
      case "muc_hidden|muc_membersonly|muc_notallowinvites":
        settings = "PRIVATE_OWNER_INVITE";
        break;
      default:
        break;}

    var fields = result.getElementsByTagName("field");
    var fieldValues = {};
    if (fields) {
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var fieldVar = field.getAttribute("var");
        var fieldSimplify = fieldVar.split("_")[1];
        switch (fieldVar) {
          case "muc#roominfo_occupants":
          case "muc#roominfo_maxusers":
          case "muc#roominfo_affiliations":
          case "muc#roominfo_description":
            fieldValues[fieldSimplify] = field.textContent || field.text || "";
            break;
          case "muc#roominfo_owner":
            var mem = {
              jid: (field.textContent || field.text) + "@" + domain,
              affiliation: "owner" };

            members.push(mem);
            fieldValues[fieldSimplify] = field.textContent || field.text;
            break;
          default:
            break;}

        // if (field.getAttribute('label') === 'owner') {
        //     var mem = {
        //         jid: (field.textContent || field.text) + '@' + domain
        //         , affiliation: 'owner'
        //     };
        //     members.push(mem);
        //     break;
        // }
      }
      fieldValues.name = result.getElementsByTagName("identity")[0].getAttribute("name");
    }
    // log(settings, members, fieldValues);
    suc(settings, members, fieldValues);
  };
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_GETROOMINFO_ERROR,
      data: ele });

  };
  this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
};
connection.prototype.queryRoomOccupants = function (options) {
  var suc = options.success || _utils.emptyfn;
  var completeFn = function completeFn(result) {
    var occupants = [];
    occupants = _parseRoomOccupants(result);
    suc(occupants);
  };
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR,
      data: ele });

  };
  var attrs = {
    xmlns: Strophe.NS.DISCO_ITEMS };

  var info = _strophe.default.$iq({
    from: this.context.jid,
    to: this.context.appKey + "_" + options.roomId + "@conference." + this.domain,
    type: "get" }).
  c("query", attrs);
  this.context.stropheConn.sendIQ(info.tree(), completeFn, errorFn);
};
connection.prototype.setUserSig = function (desc) {
  var dom = _strophe.default.$pres({
    xmlns: "jabber:client" });

  desc = desc || "";
  dom.c("status").t(desc);
  this.sendCommand(dom.tree());
};
connection.prototype.setPresence = function (type, status) {
  var dom = _strophe.default.$pres({
    xmlns: "jabber:client" });

  if (type) {
    if (status) {
      dom.c("show").t(type);
      dom.up().c("status").t(status);
    } else {
      dom.c("show").t(type);
    }
  }
  this.sendCommand(dom.tree());
};
connection.prototype.getPresence = function () {
  var dom = _strophe.default.$pres({
    xmlns: "jabber:client" });

  this.sendCommand(dom.tree());
};
connection.prototype.ping = function (options) {
  options = options || {};
  var jid = _getJid(options, this);
  var dom = _strophe.default.$iq({
    from: this.context.jid || "",
    to: jid,
    type: "get" }).

  c("ping", {
    xmlns: "urn:xmpp:ping" });

  var suc = options.success || _utils.emptyfn;
  var error = options.error || this.onError;
  var failFn = function failFn(ele) {
    error({
      type: _code.WEBIM_CONNCTION_PING_ERROR,
      data: ele });

  };
  if (this.isOpened()) {
    this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
  } else {
    error({
      type: _code.WEBIM_CONNCTION_DISCONNECTED });

  }
};
connection.prototype.isOpened = function () {
  return this.context.status == _code.STATUS_OPENED;
};
connection.prototype.isOpening = function () {
  var ctxstatus = this.context.status;
  return ctxstatus == _code.STATUS_DOLOGIN_USERGRID || ctxstatus == _code.STATUS_DOLOGIN_IM;
};
connection.prototype.isClosing = function () {
  return this.context.status == _code.STATUS_CLOSING;
};
connection.prototype.isClosed = function () {
  return this.context.status == _code.STATUS_CLOSED;
};
connection.prototype.clear = function () {
  var key = this.context.appKey;
  if (this.errorType != WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
    this.context = {
      status: _code.STATUS_INIT,
      appKey: key };

  }
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
  if (this.errorType == WebIM.statusCode.WEBIM_CONNCTION_CLIENT_LOGOUT || this.errorType == -1) {

  }
};
connection.prototype.getChatRooms = function (options) {
  var me = this;
  var token = options.accessToken || this.context.accessToken;
  if (token) {
    var apiUrl = this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    if (!appName || !orgName) {
      me.onError({
        type: _code.WEBIM_CONNCTION_AUTH_ERROR });

      return;
    }
    var suc = function suc(data, xhr) {
      typeof options.success === "function" && options.success(data);
    };
    var error = function error(res, xhr, msg) {
      if (res.error && res.error_description) {
        me.onError({
          type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
          msg: res.error_description,
          data: res,
          xhr: xhr });

      }
    };
    var pageInfo = {
      pagenum: parseInt(options.pagenum) || 1,
      pagesize: parseInt(options.pagesize) || 20 };

    var opts = {
      url: apiUrl + "/" + orgName + "/" + appName + "/chatrooms",
      dataType: "json",
      type: "GET",
      header: {
        Authorization: "Bearer " + token },

      data: pageInfo,
      success: suc || _utils.emptyfn,
      fail: error || _utils.emptyfn };

    wx.request(opts);
  } else {
    me.onError({
      type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

  }
};
connection.prototype.joinChatRoom = function (options) {
  var roomJid = this.context.appKey + "_" + options.roomId + "@conference." + this.domain;
  var room_nick = roomJid + "/" + this.context.userId;
  var suc = options.success || _utils.emptyfn;
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_JOINCHATROOM_ERROR,
      data: ele });

  };
  var pres = _strophe.default.$pres({
    from: this.context.jid,
    to: room_nick });

  pres.c("x", {
    xmlns: Strophe.NS.MUC + "#user" }).

  c("item", {
    affiliation: "member",
    role: "participant" }).

  up().
  up().
  c("roomtype", {
    xmlns: "easemob:x:roomtype",
    type: "chatroom" });

  this.context.stropheConn.sendIQ(pres.tree(), suc, errorFn);
};
connection.prototype.quitChatRoom = function (options) {
  var roomJid = this.context.appKey + "_" + options.roomId + "@conference." + this.domain;
  var room_nick = roomJid + "/" + this.context.userId;
  var suc = options.success || _utils.emptyfn;
  var err = options.error || _utils.emptyfn;
  var errorFn = function errorFn(ele) {
    err({
      type: _code.WEBIM_CONNCTION_QUITCHATROOM_ERROR,
      data: ele });

  };
  var pres = _strophe.default.$pres({
    from: this.context.jid,
    to: room_nick,
    type: "unavailable" });

  pres.
  c("x", {
    xmlns: Strophe.NS.MUC + "#user" }).

  c("item", {
    affiliation: "none",
    role: "none" }).

  up().
  up().
  c("roomtype", {
    xmlns: "easemob:x:roomtype",
    type: "chatroom" });

  this.context.stropheConn.sendIQ(pres.tree(), suc, errorFn);
};
// connection.prototype._onReceiveInviteFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group invitation",
// 		msg: info.user + " invites you to join into group:" + info.group_id,
// 		agree: function agree(){
// 			WebIM.doQuery(
// 				"{\"type\":\"acceptInvitationFromGroup\",\"id\":\"" + info.group_id + "\",\"user\":\"" + info.user + "\"}",
// 				function(response){
// 				},
// 				function(code, msg){
// 					IM.api.NotifyError("acceptInvitationFromGroup error:" + msg);
// 				}
// 			);
// 		},
// 		reject: function reject(){
// 			WebIM.doQuery(
// 				"{\"type\":\"declineInvitationFromGroup\",\"id\":\"" + info.group_id + "\",\"user\":\"" + info.user + "\"}",
// 				function(response){
// 				},
// 				function(code, msg){
// 					IM.api.NotifyError("declineInvitationFromGroup error:" + msg);
// 				}
// 			);
// 		}
// 	};
// 	this.onConfirmPop(options);
// };


// connection.prototype._onReceiveInviteAcceptionFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group invitation response",
// 		msg: info.user + " agreed to join into group:" + info.group_id,
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };
// connection.prototype._onReceiveInviteDeclineFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group invitation response",
// 		msg: info.user + " rejected to join into group:" + info.group_id,
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };
// connection.prototype._onAutoAcceptInvitationFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group invitation",
// 		msg: "You had joined into the group:" + info.group_name + " automatically.Inviter:" + info.user,
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };
// connection.prototype._onLeaveGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group notification",
// 		msg: "You have been out of the group:" + info.group_id + ".Reason:" + info.msg,
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };


// connection.prototype._onReceiveJoinGroupApplication = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group join application",
// 		msg: info.user + " applys to join into group:" + info.group_id,
// 		agree: function agree(){
// 			WebIM.doQuery("{\"type\":\"acceptJoinGroupApplication\",\"id\":\"" + info.group_id + "\",\"user\":\"" + info.user + "\"}", function(response){
// 			}, function(code, msg){
// 				IM.api.NotifyError("acceptJoinGroupApplication error:" + msg);
// 			});
// 		},
// 		reject: function reject(){
// 			WebIM.doQuery("{\"type\":\"declineJoinGroupApplication\",\"id\":\"" + info.group_id + "\",\"user\":\"" + info.user + "\"}", function(response){
// 			}, function(code, msg){
// 				IM.api.NotifyError("declineJoinGroupApplication error:" + msg);
// 			});
// 		}
// 	};
// 	this.onConfirmPop(options);
// };


// connection.prototype._onReceiveAcceptionFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group notification",
// 		msg: "You had joined into the group:" + info.group_name + ".",
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };
// connection.prototype._onReceiveRejectionFromGroup = function(info){
// 	info = eval("(" + info + ")");
// 	let options = {
// 		title: "Group notification",
// 		msg: "You have been rejected to join into the group:" + info.group_name + ".",
// 		agree: function agree(){
// 		}
// 	};
// 	this.onConfirmPop(options);
// };


connection.prototype._onUpdateMyGroupList = function (options) {
  this.onUpdateMyGroupList(options);
};
connection.prototype._onUpdateMyRoster = function (options) {
  this.onUpdateMyRoster(options);
};

connection.prototype.reconnect = function () {
  var me = this;
  setTimeout(
  function () {
    _login(me.context.restTokenData && me.context.restTokenData.data, me);
  }, (
  this.autoReconnectNumTotal == 0 ?
  0 :
  this.autoReconnectInterval) *
  1000);

  this.autoReconnectNumTotal++;
};
connection.prototype.closed = function () {
  IM.api.init();
};

// 通过Rest列出群组的所有成员
connection.prototype.listGroupMember = function (opt) {
  if (isNaN(opt.pageNum) || opt.pageNum <= 0) {
    throw new Error("The parameter \"pageNum\" should be a positive number");
  } else if (isNaN(opt.pageSize) || opt.pageSize <= 0) {
    throw new Error("The parameter \"pageSize\" should be a positive number");
  } else if (opt.groupId === null && typeof opt.groupId === "undefined") {
    throw new Error("The parameter \"groupId\" should be added");
  }
  var requestData = [];
  var groupId = opt.groupId;
  requestData.pagenum = opt.pageNum;
  requestData.pagesize = opt.pageSize;
  var options = {
    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + groupId + "/users",
    dataType: "json",
    type: "GET",
    data: requestData,
    headers: {
      Authorization: "Bearer " + this.context.accessToken,
      "Content-Type": "application/json" } };


  options.success = opt.success || _utils.emptyfn;
  options.error = opt.error || _utils.emptyfn;
  WebIM.utils.ajax(options);
};

// 通过 Rest 接口创建群组
connection.prototype.createGroupNew = function (opt) {
  // opt.data.owner = this.user;
  opt.data.invite_need_confirm = false;
  var options = {
    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups",
    dataType: "json",
    type: "POST",
    data: JSON.stringify(opt.data),
    headers: {
      Authorization: "Bearer " + this.context.accessToken,
      "Content-Type": "application/json" } };


  options.success = function (respData) {
    opt.success(respData);
    this.onCreateGroup(respData);
  }.bind(this);
  options.error = opt.error || _utils.emptyfn;
  WebIM.utils.ajax(options);
};

// 通过Rest根据groupid获取群组详情
connection.prototype.getGroupInfo = function (opt) {
  var options = {
    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + opt.groupId,
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + this.context.accessToken,
      "Content-Type": "application/json" } };


  options.success = opt.success || _utils.emptyfn;
  options.error = opt.error || _utils.emptyfn;
  WebIM.utils.ajax(options);
};

// 通过Rest解散群组
connection.prototype.dissolveGroup = function (opt) {
  var groupId = opt.groupId;
  var options = {
    url: this.apiUrl + "/" + this.orgName + "/" + this.appName + "/chatgroups/" + groupId + "?version=v3",
    type: "DELETE",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + this.context.accessToken,
      "Content-Type": "application/json" } };


  options.success = opt.success || _utils.emptyfn;
  options.error = opt.error || _utils.emptyfn;
  WebIM.utils.ajax(options);
};

// used for blacklist
function _parsePrivacy(iq) {
  var list = [];
  var items = iq.getElementsByTagName("item");

  if (items) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var jid = item.getAttribute("value");
      var order = item.getAttribute("order");
      var type = item.getAttribute("type");
      if (!jid) {
        continue;
      }
      var n = _parseNameFromJidFn(jid);
      list[n] = {
        type: type,
        order: order,
        jid: jid,
        name: n };

    }
  }
  return list;
}

// used for blacklist
connection.prototype.getBlacklist = function (options) {
  options = options || {};
  var iq = _strophe.default.$iq({
    type: "get" });

  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var me = this;

  iq.
  c("query", {
    xmlns: "jabber:iq:privacy" }).

  c("list", {
    name: "special" });


  this.context.stropheConn.sendIQ(iq.tree(), function (iq) {
    me.onBlacklistUpdate(_parsePrivacy(iq));
    sucFn();
  }, function () {
    me.onBlacklistUpdate([]);
    errFn();
  });
};

// used for blacklist
connection.prototype.addToBlackList = function (options) {
  var iq = _strophe.default.$iq({
    type: "set" });

  var blacklist = options.list || {};
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var piece = iq.
  c("query", {
    xmlns: "jabber:iq:privacy" }).

  c("list", {
    name: "special" });


  var keys = Object.keys(blacklist);
  var len = keys.length;
  var order = 2;

  for (var i = 0; i < len; i++) {
    var item = blacklist[keys[i]];
    var type = item.type || "jid";
    var jid = item.jid;
    piece = piece.
    c("item", {
      action: "deny",
      order: order++,
      type: type,
      value: jid }).

    c("message");
    if (i !== len - 1) {
      piece = piece.up().up();
    }
  }
  this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
};

// used for blacklist
connection.prototype.removeFromBlackList = function (options) {
  var iq = _strophe.default.$iq({
    type: "set" });

  var blacklist = options.list || {};
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var piece = iq.
  c("query", {
    xmlns: "jabber:iq:privacy" }).

  c("list", {
    name: "special" });


  var keys = Object.keys(blacklist);
  var len = keys.length;

  for (var i = 0; i < len; i++) {
    var item = blacklist[keys[i]];
    var type = item.type || "jid";
    var jid = item.jid;
    var order = item.order;

    piece = piece.
    c("item", {
      action: "deny",
      order: order,
      type: type,
      value: jid }).

    c("message");
    if (i !== len - 1) {
      piece = piece.up().up();
    }
  }
  this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
};
connection.prototype._getGroupJid = function (to) {
  var appKey = this.context.appKey || "";
  return appKey + "_" + to + "@conference." + this.domain;
};

// used for blacklist
connection.prototype.addToGroupBlackList = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var jid = _getJid(options, this);
  var affiliation = "admin"; // options.affiliation || 'admin';
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("item", {
    affiliation: "outcast",
    jid: jid });


  this.context.stropheConn.sendIQ(iq.tree(), sucFn, errFn);
};

// used for blacklist
connection.prototype.getGroupBlacklist = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  // var jid = _getJid(options, this);
  var affiliation = "admin"; // options.affiliation || 'admin';
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "get",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("item", {
    affiliation: "outcast" });


  function _parseGroupBlacklist(iq) {
    var list = {};
    var items = iq.getElementsByTagName("item");

    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var jid = item.getAttribute("jid");
        var _affiliation2 = item.getAttribute("affiliation");
        var nick = item.getAttribute("nick");
        if (!jid) {
          continue;
        }
        var n = _parseNameFromJidFn(jid);
        list[n] = {
          jid: jid,
          affiliation: _affiliation2,
          nick: nick,
          name: n };

      }
    }
    return list;
  }

  this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
    sucFn(_parseGroupBlacklist(msginfo));
  }, function () {
    errFn();
  });
};

// used for blacklist
connection.prototype.removeGroupMemberFromBlacklist = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  var jid = _getJid(options, this);
  var affiliation = "admin"; // options.affiliation || 'admin';
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("item", {
    affiliation: "member",
    jid: jid });


  this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
    sucFn();
  }, function () {
    errFn();
  });
};

/**
    * changeGroupSubject 修改群名称
    *
    * @param options
    */

connection.prototype.changeGroupSubject = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  // must be `owner`
  var affiliation = "owner";
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("x", {
    type: "submit",
    xmlns: "jabber:x:data" }).

  c("field", {
    "var": "FORM_TYPE" }).

  c("value").
  t("http://jabber.org/protocol/muc#roomconfig").
  up().
  up().
  c("field", {
    "var": "muc#roomconfig_roomname" }).

  c("value").
  t(options.subject).
  up().
  up().
  c("field", {
    "var": "muc#roomconfig_roomdesc" }).

  c("value").
  t(options.description);
  this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
    sucFn();
  }, function () {
    errFn();
  });
};

/**
    * destroyGroup 删除群组
    *
    * @param options
    */
connection.prototype.destroyGroup = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  // must be `owner`
  var affiliation = "owner";
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("destroy");

  this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
    sucFn();
  }, function () {
    errFn();
  });
};

/**
    * leaveGroupBySelf 主动离开群组
    *
    * @param options
    */

connection.prototype.leaveGroupBySelf = function (options) {
  var me = this;
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;

  // must be `owner`
  var jid = _getJid(options, this);
  var affiliation = "admin";
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });


  iq.
  c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation }).

  c("item", {
    affiliation: "none",
    jid: jid });


  this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
    sucFn(msgInfo);
    var pres = _strophe.default.$pres({
      type: "unavailable",
      to: to + "/" + me.context.userId });

    me.sendCommand(pres.tree());
  }, function (errInfo) {
    errFn(errInfo);
  });
};

/**
    * leaveGroup 被踢出群组
    *
    * @param options
    */
// connection.prototype.leaveGroup = function(options){
// 	var sucFn = options.success || _utils.emptyfn;
// 	var errFn = options.error || _utils.emptyfn;
// 	var list = options.list || [];
// 	var affiliation = "admin";
// 	var to = this._getGroupJid(options.roomId);
// 	var iq = $iq({ type: "set", to: to });
// 	var piece = iq.c("query", { xmlns: "http://jabber.org/protocol/muc#" + affiliation });
// 	var keys = Object.keys(list);
// 	var len = keys.length;
//
// 	for(let i = 0; i < len; i++){
// 		let name = list[keys[i]];
// 		let jid = _getJidByName(name, this);
//
// 		piece = piece.c("item", {
// 			affiliation: "none",
// 			jid: jid
// 		})
// 		.up()
// 		.c("item", {
// 			role: "none",
// 			jid: jid,
// 		})
// 		.up();
// 	}
//
// 	this.context.stropheConn.sendIQ(iq.tree(), function(msgInfo){
// 		sucFn(msgInfo);
// 	}, function(errInfo){
// 		errFn(errInfo);
// 	});
// };

/**
 * addGroupMembers 添加群组成员
 *
 * @param options
 */

connection.prototype.addGroupMembers = function (options) {
  var sucFn = options.success || _utils.emptyfn;
  var errFn = options.error || _utils.emptyfn;
  var list = options.list || [];
  var affiliation = "admin";
  var to = this._getGroupJid(options.roomId);
  var iq = _strophe.default.$iq({
    type: "set",
    to: to });

  var piece = iq.c("query", {
    xmlns: "http://jabber.org/protocol/muc#" + affiliation });

  var len = list.length;

  for (var i = 0; i < len; i++) {
    var name = list[i];
    var jid = _getJidByName(name, this);

    piece = piece.c("item", {
      affiliation: "member",
      jid: jid }).
    up();

    var dom = _strophe.default.$msg({
      to: to }).

    c("x", {
      xmlns: "http://jabber.org/protocol/muc#user" }).

    c("invite", {
      to: jid }).

    c("reason").
    t(options.reason || "");

    this.sendCommand(dom.tree());
  }
  this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
    sucFn(msgInfo);
  }, function (errInfo) {
    errFn(errInfo);
  });
};


/**
    * acceptInviteFromGroup 接受加入申请
    *
    * @param options
    */
connection.prototype.acceptInviteFromGroup = function (options) {
  options.success = function () {
    // then send sendAcceptInviteMessage
    // connection.prototype.sendAcceptInviteMessage(optoins);
  };
  this.addGroupMembers(options);
};

/**
    * rejectInviteFromGroup 拒绝加入申请
    *
    * throw request for now 暂时不处理，直接丢弃
    *
    * @param options
    */
connection.prototype.rejectInviteFromGroup = function (options) {

};
//
// /**
//  * createGroup 创建群组
//  *
//  * 1. 创建申请 -> 得到房主身份
//  * 2. 获取房主信息 -> 得到房间form
//  * 3. 完善房间form -> 创建成功
//  * 4. 添加房间成员
//  * 5. 消息通知成员
//  * @param options
//  */
// connection.prototype.createGroup = function(options){
// 	var roomId = +new Date();
// 	var toRoom = this._getGroupJid(roomId);
// 	var to = toRoom + "/" + this.context.userId;
//
// 	var pres = StropheAll.$pres({ to: to })
// 	.c("x", { xmlns: "http://jabber.org/protocol/muc" }).up()
// 	.c("create", { xmlns: "http://jabber.org/protocol/muc" }).up();
// 	// .c('c', {
// 	//     hash: 'sha-1',
// 	//     node: 'https://github.com/robbiehanson/XMPPFramework',
// 	//     ver: 'k6gP4Ua5m4uu9YorAG0LRXM+kZY=',
// 	//     xmlns: 'http://jabber.org/protocol/caps'
// 	// }).up();
//
// 	// createGroupACK
// 	this.sendCommand(pres.tree());
//
// 	let me = this;
// 	// timeout hack for create group async
// 	setTimeout(function(){
// 		var x;
// 		// Creating a Reserved Room
// 		var iq = $iq({ type: "get", to: toRoom })
// 		.c("query", { xmlns: "http://jabber.org/protocol/muc#owner" });
// 		// Strophe.info('step 1 ----------');
// 		// Strophe.info(options);
// 		me.context.stropheConn.sendIQ(iq.tree(), function(msgInfo){
// 			// for ie hack
// 			if("setAttribute" in msgInfo){
// 				// Strophe.info('step 3 ----------');
// 				x = msgInfo.getElementsByTagName("x")[0];
// 				x.setAttribute("type", "submit");
// 			}
// 			else{
// 				// Strophe.info('step 4 ----------');
// 				Strophe.forEachChild(msgInfo, "x", function(field){
// 					field.setAttribute("type", "submit");
// 				});
// 			}
// 			// var rcv = msgInfo.getElementsByTagName('x');
// 			// var v;
// 			// if (rcv.length > 0) {
// 			//     if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
// 			//         v = rcv[0].childNodes[0].nodeValue;
// 			//     } else {
// 			//         v = rcv[0].innerHTML || rcv[0].innerText
// 			//     }
// 			//     mid = rcv[0].getAttribute('mid');
// 			// }
// 			Strophe.info("step 5 ----------");
// 			Strophe.forEachChild(x, "field", function(field){
// 				var fieldVar = field.getAttribute("var");
// 				var valueDom = field.getElementsByTagName("value")[0];
// 				Strophe.info(fieldVar);
// 				switch(fieldVar){
// 				case "muc#roomconfig_roomname":
// 					_setText(valueDom, options.subject || "");
// 					break;
// 				case "muc#roomconfig_roomdesc":
// 					_setText(valueDom, options.description || "");
// 					break;
// 				case "muc#roomconfig_publicroom": // public 1
// 					_setText(valueDom, +options.optionsPublic);
// 					break;
// 				case "muc#roomconfig_membersonly":
// 					_setText(valueDom, +options.optionsMembersOnly);
// 					break;
// 				case "muc#roomconfig_moderatedroom":
// 					_setText(valueDom, +options.optionsModerate);
// 					break;
// 				case "muc#roomconfig_persistentroom":
// 					_setText(valueDom, 1);
// 					break;
// 				case "muc#roomconfig_allowinvites":
// 					_setText(valueDom, +options.optionsAllowInvites);
// 					break;
// 				case "muc#roomconfig_allowvisitornickchange":
// 					_setText(valueDom, 0);
// 					break;
// 				case "muc#roomconfig_allowvisitorstatus":
// 					_setText(valueDom, 0);
// 					break;
// 				case "allow_private_messages":
// 					_setText(valueDom, 0);
// 					break;
// 				case "allow_private_messages_from_visitors":
// 					_setText(valueDom, "nobody");
// 					break;
// 				default:
// 					break;
// 				}
// 			});
//
// 			let iq = $iq({ to: toRoom, type: "set" })
// 			.c("query", { xmlns: "http://jabber.org/protocol/muc#owner" })
// 			.cnode(x);
// 			me.context.stropheConn.sendIQ(iq.tree(), function(msgInfo){
// 				// sucFn(msgInfo);
// 				me.addGroupMembers({
// 					list: options.members,
// 					roomId: roomId
// 				});
// 			}, function(errInfo){
// 				// errFn(errInfo);
// 			});
// 			// sucFn(msgInfo);
// 		}, function(errInfo){
// 			// errFn(errInfo);
// 		});
// 	}, 1000);
// };

// function _setText(valueDom, v){
// 	if("textContent" in valueDom){
// 		valueDom.textContent = v;
// 	}
// 	else if("text" in valueDom){
// 		valueDom.text = v;
// 	}
// 	else{
// 		// Strophe.info('_setText 4 ----------');
// 		// valueDom.innerHTML = v;
// 	}
// }
// connection.prototype.onError = function () {
//     return false;
// };
// window.WebIM = typeof WebIM !== 'undefined' ? WebIM : {};
WebIM.connection = connection;
WebIM.utils = _utils;
WebIM.statusCode = _code;
WebIM.message = _msg.message;
WebIM.doQuery = function (str, suc, fail) {
  if (typeof window.cefQuery === "undefined") {
    return;
  }
  window.cefQuery({
    request: str,
    persistent: false,
    onSuccess: suc,
    onFailure: fail });

};

module.exports = WebIM;

if (false) {}

/***/ }),
/* 14 */
/*!******************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/status.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function () {
  var connIndex = 0;

  exports.code = {
    WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_OPEN_ERROR: connIndex++,
    WEBIM_CONNCTION_AUTH_ERROR: connIndex++,
    WEBIM_CONNCTION_OPEN_USERGRID_ERROR: connIndex++,
    WEBIM_CONNCTION_ATTACH_ERROR: connIndex++,
    WEBIM_CONNCTION_ATTACH_USERGRID_ERROR: connIndex++,
    WEBIM_CONNCTION_REOPEN_ERROR: connIndex++,
    WEBIM_CONNCTION_SERVER_CLOSE_ERROR: connIndex++, // 7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
    WEBIM_CONNCTION_SERVER_ERROR: connIndex++, // 8: offline by multi login
    WEBIM_CONNCTION_IQ_ERROR: connIndex++,
    WEBIM_CONNCTION_PING_ERROR: connIndex++,
    WEBIM_CONNCTION_NOTIFYVERSION_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROSTER_ERROR: connIndex++,
    WEBIM_CONNCTION_CROSSDOMAIN_ERROR: connIndex++,
    WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES: connIndex++,
    WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR: connIndex++,
    WEBIM_CONNCTION_DISCONNECTED: connIndex++, // 16: server-side close the websocket connection
    WEBIM_CONNCTION_AJAX_ERROR: connIndex++,
    WEBIM_CONNCTION_JOINROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMINFO_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMMEMBER_ERROR: connIndex++,
    WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR: connIndex++,
    WEBIM_CONNCTION_LOAD_CHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_JOINCHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_QUITCHATROOM_ERROR: connIndex++,
    WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR: connIndex++,
    WEBIM_CONNCTION_CALLBACK_INNER_ERROR: connIndex++,
    WEBIM_CONNCTION_CLIENT_OFFLINE: connIndex++, // 32: client offline
    WEBIM_CONNCTION_CLIENT_LOGOUT: connIndex++, // 33: client logout


    WEBIM_UPLOADFILE_BROWSER_ERROR: 100,
    WEBIM_UPLOADFILE_ERROR: 101,
    WEBIM_UPLOADFILE_NO_LOGIN: 102,
    WEBIM_UPLOADFILE_NO_FILE: 103,


    WEBIM_DOWNLOADFILE_ERROR: 200,
    WEBIM_DOWNLOADFILE_NO_LOGIN: 201,
    WEBIM_DOWNLOADFILE_BROWSER_ERROR: 202,


    WEBIM_MESSAGE_REC_TEXT: 300,
    WEBIM_MESSAGE_REC_TEXT_ERROR: 301,
    WEBIM_MESSAGE_REC_EMOTION: 302,
    WEBIM_MESSAGE_REC_PHOTO: 303,
    WEBIM_MESSAGE_REC_AUDIO: 304,
    WEBIM_MESSAGE_REC_AUDIO_FILE: 305,
    WEBIM_MESSAGE_REC_VEDIO: 306,
    WEBIM_MESSAGE_REC_VEDIO_FILE: 307,
    WEBIM_MESSAGE_REC_FILE: 308,
    WEBIM_MESSAGE_SED_TEXT: 309,
    WEBIM_MESSAGE_SED_EMOTION: 310,
    WEBIM_MESSAGE_SED_PHOTO: 311,
    WEBIM_MESSAGE_SED_AUDIO: 312,
    WEBIM_MESSAGE_SED_AUDIO_FILE: 313,
    WEBIM_MESSAGE_SED_VEDIO: 314,
    WEBIM_MESSAGE_SED_VEDIO_FILE: 315,
    WEBIM_MESSAGE_SED_FILE: 316,

    STATUS_INIT: 400,
    STATUS_DOLOGIN_USERGRID: 401,
    STATUS_DOLOGIN_IM: 402,
    STATUS_OPENED: 403,
    STATUS_CLOSING: 404,
    STATUS_CLOSED: 405,
    STATUS_ERROR: 406 };

})();

/***/ }),
/* 15 */
/*!*****************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/utils.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
(function () {

  var EMPTYFN = function EMPTYFN() {};
  var _code = __webpack_require__(/*! ./status */ 14).code;
  var WEBIM_FILESIZE_LIMIT = 10485760;
  var _tmpUtilXHR = false;
  var _hasFormData = typeof FormData !== "undefined";
  var _hasBlob = typeof Blob !== "undefined";
  var _isCanSetRequestHeader = _tmpUtilXHR.setRequestHeader || false;
  var _hasOverrideMimeType = _tmpUtilXHR.overrideMimeType || false;
  var _isCanUploadFileAsync = _isCanSetRequestHeader && _hasFormData;
  var _isCanUploadFile = _isCanUploadFileAsync || false;
  var _isCanDownLoadFile = _isCanSetRequestHeader && (_hasBlob || _hasOverrideMimeType);

  if (!Object.keys) {
    Object.keys = function () {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
      var dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"];

      var dontEnumsLength = dontEnums.length;

      return function (obj) {
        if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
          throw new TypeError("Object.keys called on non-object");
        }
        var result = [];
        var prop;
        var i;
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }();
  }

  var utils = {
    hasFormData: _hasFormData,
    hasBlob: _hasBlob,
    emptyfn: EMPTYFN,
    isCanSetRequestHeader: _isCanSetRequestHeader,
    hasOverrideMimeType: _hasOverrideMimeType,
    isCanUploadFileAsync: _isCanUploadFileAsync,
    isCanUploadFile: _isCanUploadFile,
    isCanDownLoadFile: _isCanDownLoadFile,
    isSupportWss: true,
    hasFlash: false,
    xmlrequest: false,

    stringify: function stringify(json) {
      if (typeof JSON !== "undefined" && JSON.stringify) {
        return JSON.stringify(json);
      }
      var s = "";
      var arr = [];
      return iterate(json);

      function iterate(json) {
        var isArr = false;
        if (Object.prototype.toString.call(json) === "[object Array]") {
          arr.push("]", "[");
          isArr = true;
        } else
        if (Object.prototype.toString.call(json) === "[object Object]") {
          arr.push("}", "{");
        }
        for (var o in json) {
          if (Object.prototype.toString.call(json[o]) === "[object Null]") {
            json[o] = "null";
          } else
          if (Object.prototype.toString.call(json[o]) === "[object Undefined]") {
            json[o] = "undefined";
          }
          if (json[o] && typeof json[o] === "object") {
            s += "," + (isArr ? "" : "\"" + o + "\":" + (isArr ? "\"" : "")) + iterate(json[o]) + "";
          } else
          {
            s += ",\"" + (isArr ? "" : o + "\":\"") + json[o] + "\"";
          }
        }
        if (s != "") {
          s = s.slice(1);
        }
        return arr.pop() + s + arr.pop();
      }
    },

    registerUser: function registerUser(options) {
      var orgName = options.orgName || "";
      var appName = options.appName || "";
      var appKey = options.appKey || "";
      var suc = options.success || EMPTYFN;
      var err = options.error || EMPTYFN;

      if (!orgName && !appName && appKey) {
        var devInfos = appKey.split("#");
        if (devInfos.length === 2) {
          orgName = devInfos[0];
          appName = devInfos[1];
        }
      }
      if (!orgName && !appName) {
        err({
          type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

        return false;
      }
      var apiUrl = options.apiUrl;
      var restUrl = apiUrl + "/" + orgName + "/" + appName + "/users";
      var userjson = {
        username: options.username,
        password: options.password,
        nickname: options.nickname || "" };

      var userinfo = utils.stringify(userjson);
      options = {
        url: restUrl,
        data: userinfo,
        success: suc,
        error: err };

      return utils.ajax(options);
    },

    login: function login(options) {
      options = options || {};
      var suc = options.success || EMPTYFN;
      var err = options.error || EMPTYFN;
      var appKey = options.appKey || "";
      var devInfos = appKey.split("#");
      if (devInfos.length !== 2) {
        err({
          type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

        return false;
      }
      var orgName = devInfos[0];
      var appName = devInfos[1];
      var user = options.user || "";
      var pwd = options.pwd || "";
      var apiUrl = options.apiUrl;
      var loginJson = {
        grant_type: "password",
        username: user,
        password: pwd,
        timestamp: +new Date() };

      var loginfo = utils.stringify(loginJson);
      options = {
        url: apiUrl + "/" + orgName + "/" + appName + "/token",
        data: loginfo,
        success: suc,
        error: err };

      return utils.ajax(options);
    },

    getFileUrl: function getFileUrl(fileInputId) {
      var uri = {
        url: "",
        filename: "",
        filetype: "",
        data: "" };

      var fileObj = typeof fileInputId === "string" ?
      document.getElementById(fileInputId) :
      fileInputId;
      if (!utils.isCanUploadFileAsync || !fileObj) {
        return uri;
      }
      try {
        if (window.URL.createObjectURL) {
          var fileItems = fileObj.files; // 一个对象,文件列表
          if (fileItems.length > 0) {
            var u = fileItems.item(0); // 有关选取文件的信息
            uri.data = u;
            uri.url = window.URL.createObjectURL(u); // 指向该文件的URL
            uri.filename = u.name || "";
          }
        }
        var index = uri.filename.lastIndexOf(".");
        if (index != -1) {
          uri.filetype = uri.filename.substring(index + 1).toLowerCase();
        }
        return uri;
      }
      catch (e) {
        throw e;
      }
    },

    getFileSize: function getFileSize(fileInputId) {
      var file = document.getElementById(fileInputId);
      var fileSize = 0;
      if (file) {
        if (file.files) {
          if (file.files.length > 0) {
            fileSize = file.files[0].size;
          }
        }
      }
      return fileSize;
    },

    trim: function trim(str) {
      str = typeof str === "string" ? str : "";
      return str.trim ?
      str.trim() :
      str.replace(/^\s|\s$/g, "");
    },

    parseEmoji: function parseEmoji(msg) {
      if (typeof WebIM.Emoji === "undefined" || typeof WebIM.Emoji.map === "undefined") {
        return msg;
      }
      var emoji = WebIM.Emoji;
      for (var face in emoji.map) {
        if (emoji.map.hasOwnProperty(face)) {
          while (msg.indexOf(face) > -1) {
            msg = msg.replace(face, "<image class=\"emoji\" src=\"" + emoji.path + emoji.map[face] + "\" /></image>");
          }
        }
      }
      return msg;
    },

    parseLink: function parseLink(msg) {
      var reg = /(https?:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-/=]*/gm;
      msg = msg.replace(reg, function (v) {
        var prefix = /^https?/gm.test(v);
        return "<a href='" + (prefix ? v : "//" + v) + "' target='_blank'>" + v + "</a>";
      });
      return msg;
    },

    parseJSON: function parseJSON(data) {
      if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(data + "");
      }
      var requireNonComma;
      var depth = null;
      var str = utils.trim(data + "");
      return str && !utils.trim(
      str.replace(
      /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g,
      function (token, comma, open, close) {
        if (requireNonComma && comma) {
          depth = 0;
        }
        if (depth === 0) {
          return token;
        }
        requireNonComma = open || comma;
        depth += !close - !open;
        return "";
      })) ?

      Function("return " + str)() :
      Function("Invalid JSON: " + data)();
    },

    parseUploadResponse: function parseUploadResponse(response) {
      return response.indexOf("callback") > -1
      // lte ie9
      ? response.slice(9, -1) :
      response;
    },

    parseDownloadResponse: function parseDownloadResponse(response) {
      return (
        response && response.type && response.type === "application/json" ||
        Object.prototype.toString.call(response).indexOf("Blob") < 0 ?

        this.url + "?token=" :
        window.URL.createObjectURL(response));
    },

    uploadFile: function uploadFile(options) {
      options = options || {};
      options.onFileUploadProgress = options.onFileUploadProgress || EMPTYFN;
      options.onFileUploadComplete = options.onFileUploadComplete || EMPTYFN;
      options.onFileUploadError = options.onFileUploadError || EMPTYFN;
      options.onFileUploadCanceled = options.onFileUploadCanceled || EMPTYFN;
      var acc = options.accessToken || this.context.accessToken;
      if (!acc) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_NO_LOGIN,
          id: options.id });

        return;
      }
      var orgName, appName, devInfos;
      var appKey = options.appKey || this.context.appKey || "";
      if (appKey) {
        devInfos = appKey.split("#");
        orgName = devInfos[0];
        appName = devInfos[1];
      }
      if (!orgName && !appName) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_ERROR,
          id: options.id });

        return;
      }
      var apiUrl = options.apiUrl;
      var uploadUrl = apiUrl + "/" + orgName + "/" + appName + "/chatfiles";
      if (!utils.isCanUploadFileAsync) {
        if (utils.hasFlash && typeof options.flashUpload === "function") {
          options.flashUpload && options.flashUpload(uploadUrl, options);
        } else
        {
          options.onFileUploadError({
            type: _code.WEBIM_UPLOADFILE_BROWSER_ERROR,
            id: options.id });

        }
        return;
      }
      var fileSize = options.file.data ? options.file.data.size : undefined;
      if (fileSize > WEBIM_FILESIZE_LIMIT) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_ERROR,
          id: options.id });

        return;
      } else
      if (fileSize <= 0) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_ERROR,
          id: options.id });

        return;
      }
      var xhr = utils.xmlrequest();
      var onError = function onError(e) {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_ERROR,
          id: options.id,
          xhr: xhr });

      };
      if (xhr.upload) {
        xhr.upload.addEventListener("progress", options.onFileUploadProgress, false);
      }
      if (xhr.addEventListener) {
        xhr.addEventListener("abort", options.onFileUploadCanceled, false);
        xhr.addEventListener("load", function (e) {
          try {
            var json = utils.parseJSON(xhr.responseText);
            try {
              options.onFileUploadComplete(json);
            }
            catch (e) {
              options.onFileUploadError({
                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                data: e });

            }
          }
          catch (e) {
            options.onFileUploadError({
              type: _code.WEBIM_UPLOADFILE_ERROR,
              data: xhr.responseText,
              id: options.id,
              xhr: xhr });

          }
        }, false);
        xhr.addEventListener("error", onError, false);
      } else
      if (xhr.onreadystatechange) {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (ajax.status === 200) {
              try {
                var json = utils.parseJSON(xhr.responseText);
                options.onFileUploadComplete(json);
              }
              catch (e) {
                options.onFileUploadError({
                  type: _code.WEBIM_UPLOADFILE_ERROR,
                  data: xhr.responseText,
                  id: options.id,
                  xhr: xhr });

              }
            } else
            {
              options.onFileUploadError({
                type: _code.WEBIM_UPLOADFILE_ERROR,
                data: xhr.responseText,
                id: options.id,
                xhr: xhr });

            }
          } else
          {
            xhr.abort();
            options.onFileUploadCanceled();
          }
        };
      }
      xhr.open("POST", uploadUrl);
      xhr.setRequestHeader("restrict-access", "true");
      xhr.setRequestHeader("Accept", "*/*"); // Android QQ browser has some problem with this attribute.
      xhr.setRequestHeader("Authorization", "Bearer " + acc);
      var formData = new FormData();
      formData.append("file", options.file.data);
      xhr.send(formData);
    },

    download: function download(options) {
      options.onFileDownloadComplete = options.onFileDownloadComplete || EMPTYFN;
      options.onFileDownloadError = options.onFileDownloadError || EMPTYFN;
      var accessToken = options.accessToken || this.context.accessToken;
      var xhr = utils.xmlrequest();
      if (!accessToken) {
        options.onFileDownloadError({
          type: _code.WEBIM_DOWNLOADFILE_NO_LOGIN,
          id: options.id });

        return;
      }
      var onError = function onError(e) {
        options.onFileDownloadError({
          type: _code.WEBIM_DOWNLOADFILE_ERROR,
          id: options.id,
          xhr: xhr });

      };
      if (!utils.isCanDownLoadFile) {
        options.onFileDownloadComplete();
        return;
      }
      if ("addEventListener" in xhr) {
        xhr.addEventListener("load", function (e) {
          options.onFileDownloadComplete(xhr.response, xhr);
        }, false);
        xhr.addEventListener("error", onError, false);
      } else
      if ("onreadystatechange" in xhr) {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (ajax.status === 200) {
              options.onFileDownloadComplete(xhr.response, xhr);
            } else
            {
              options.onFileDownloadError({
                type: _code.WEBIM_DOWNLOADFILE_ERROR,
                id: options.id,
                xhr: xhr });

            }
          } else
          {
            xhr.abort();
            options.onFileDownloadError({
              type: _code.WEBIM_DOWNLOADFILE_ERROR,
              id: options.id,
              xhr: xhr });

          }
        };
      }
      var method = options.method || "GET";
      var resType = options.responseType || "blob";
      var mimeType = options.mimeType || "text/plain; charset=x-user-defined";
      xhr.open(method, options.url);
      if (typeof Blob !== "undefined") {
        xhr.responseType = resType;
      } else
      {
        xhr.overrideMimeType(mimeType);
      }
      var innerHeaer = {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/octet-stream",
        "share-secret": options.secret,
        Authorization: "Bearer " + accessToken };

      var headers = options.headers || {};
      for (var key in headers) {
        innerHeaer[key] = headers[key];
      }
      for (var _key in innerHeaer) {
        if (innerHeaer[_key]) {
          xhr.setRequestHeader(_key, innerHeaer[_key]);
        }
      }
      xhr.send(null);
    },

    parseTextMessage: function parseTextMessage(message, faces) {
      if (typeof message !== "string") {
        return false;
      }
      if (Object.prototype.toString.call(faces) !== "[object Object]") {
        return {
          isemoji: false,
          body: [
          {
            type: "txt",
            data: message }] };



      }
      var receiveMsg = message;
      var emessage = [];
      var expr = /\[[^[\]]{2,3}\]/mg;
      var emoji = receiveMsg.match(expr);
      if (!emoji || emoji.length < 1) {
        return {
          isemoji: false,
          body: [
          {
            type: "txt",
            data: message }] };



      }

      var isemoji = false;
      for (var i = 0; i < emoji.length; i++) {
        var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i]));
        var existEmoji = faces.map[emoji[i]];
        if (tmsg) {
          emessage.push({
            type: "txt",
            data: tmsg });

        }
        if (!existEmoji) {
          emessage.push({
            type: "txt",
            data: emoji[i] });

          continue;
        }
        var emojiStr = faces.map ? existEmoji : null;
        if (emojiStr) {
          isemoji = true;
          emessage.push({
            type: "emoji",
            data: emojiStr });

        } else
        {
          emessage.push({
            type: "txt",
            data: emoji[i] });

        }
        var restMsgIndex = receiveMsg.indexOf(emoji[i]) + emoji[i].length;
        receiveMsg = receiveMsg.substring(restMsgIndex);
      }
      if (receiveMsg) {
        emessage.push({
          type: "txt",
          data: receiveMsg });

      }
      if (isemoji) {
        return {
          isemoji: isemoji,
          body: emessage };

      }
      return {
        isemoji: false,
        body: [
        {
          type: "txt",
          data: message }] };



    },

    ajax: function ajax(options) {
      var suc = options.success || EMPTYFN;
      var error = options.error || EMPTYFN;
      var type = options.type || "POST",
      data = options.data || null,
      tempData = "";

      if (type.toLowerCase() === "get" && data) {
        for (var o in data) {
          if (data.hasOwnProperty(o)) {
            tempData += o + "=" + data[o] + "&";
          }
        }
        tempData = tempData ? tempData.slice(0, -1) : tempData;
        options.url += (options.url.indexOf("?") > 0 ? "&" : "?") + (tempData ? tempData + "&" : tempData) + "_v=" + new Date().getTime();
        data = null;
        tempData = null;
      }
      console.log("wx.request", options.url);
      wx.request({
        url: options.url,
        data: options.data,
        header: options.headers,
        method: type,
        success: function success(res) {
          console.log("wx.request.success", arguments);
          if (res.statusCode == "200") {
            suc(res);
          } else
          {
            error(res);
          }
        },
        complete: function complete() {
          console.log("wx.request.complete", arguments);
        },
        fail: function fail() {
          console.log("wx.request.fail", arguments);
        } });

    },

    ts: function ts() {
      var d = new Date();
      var Hours = d.getHours(); // 获取当前小时数(0-23)
      var Minutes = d.getMinutes(); // 获取当前分钟数(0-59)
      var Seconds = d.getSeconds(); // 获取当前秒数(0-59)
      var Milliseconds = d.getMilliseconds(); // 获取当前毫秒
      return (Hours < 10 ? "0" + Hours : Hours) + ":" + (
      Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (
      Seconds < 10 ? "0" + Seconds : Seconds) + ":" +
      Milliseconds + " ";
    },

    getObjectKey: function getObjectKey(obj, val) {
      for (var key in obj) {
        if (obj[key] == val) {
          return key;
        }
      }
      return "";
    } };



  exports.utils = utils;

})();

/***/ }),
/* 16 */
/*!*******************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/message.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var StropheAll = __webpack_require__(/*! ./libs/strophe */ 8);

(function () {
  var _utils = __webpack_require__(/*! ./utils */ 15).utils;
  var Message = function Message(type, id) {
    if (!(this instanceof Message)) {
      return new Message(type);
    }
    this._msg = {};
    if (typeof Message[type] === "function") {
      Message[type].prototype.setGroup = this.setGroup;
      this._msg = new Message[type](id);
    }
    return this._msg;
  };
  Message.prototype.setGroup = function (group) {
    this.body.group = group;
  };

  /*
      * Read Message
      */
  Message.read = function (id) {
    this.id = id;
    this.type = "read";
  };

  Message.read.prototype.set = function (opt) {
    this.body = {
      ackId: opt.id,
      to: opt.to };

  };

  /*
      * text message
      */
  Message.txt = function (id) {
    this.id = id;
    this.type = "txt";
    this.body = {};
  };
  Message.txt.prototype.set = function (opt) {
    this.value = opt.msg;
    this.body = {
      id: this.id,
      from: opt.from,
      to: opt.to,
      msg: this.value,
      type: this.type,
      roomType: opt.roomType,
      chatType: opt.chatType,
      ext: opt.ext || {},
      success: opt.success,
      fail: opt.fail };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * cmd message
      */
  Message.cmd = function (id) {
    this.id = id;
    this.type = "cmd";
    this.body = {};
  };
  Message.cmd.prototype.set = function (opt) {
    this.value = "";

    this.body = {
      to: opt.to,
      from: opt.from,
      action: opt.action,
      msg: this.value,
      type: this.type,
      roomType: opt.roomType,
      ext: opt.ext || {} };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * loc message
      */
  Message.location = function (id) {
    this.id = id;
    this.type = "loc";
    this.body = {};
  };
  Message.location.prototype.set = function (opt) {
    this.body = {
      to: opt.to,
      from: opt.from,
      type: this.type,
      roomType: opt.roomType,
      addr: opt.addr,
      lat: opt.lat,
      lng: opt.lng,
      chatType: opt.chatType,
      ext: opt.ext || {} };

  };

  /*
      * img message
      */
  Message.img = function (id) {
    this.id = id;
    this.type = "img";
    this.body = {};
  };
  Message.img.prototype.set = function (opt) {
    // opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);
    // //console.log(opt)
    this.value = opt.file;
    this.body = {
      id: this.id,
      file: this.value,
      apiUrl: opt.apiUrl,
      to: opt.to,
      from: opt.from,
      type: this.type,
      ext: opt.ext || {},
      roomType: opt.roomType,
      onFileUploadError: opt.onFileUploadError,
      onFileUploadComplete: opt.onFileUploadComplete,
      success: opt.success,
      fail: opt.fail,
      flashUpload: opt.flashUpload,
      width: opt.width,
      height: opt.height,
      body: opt.body };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * audio message
      */
  Message.audio = function (id) {
    this.id = id;
    this.type = "audio";
    this.body = {};
  };
  Message.audio.prototype.set = function (opt) {
    opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

    this.value = opt.file;
    this.filename = opt.filename || this.value.filename;

    this.body = {
      id: this.id,
      file: this.value,
      filename: this.filename,
      apiUrl: opt.apiUrl,
      accessToken: opt.accessToken,
      to: opt.to,
      from: opt.from,
      type: this.type,
      ext: opt.ext || {},
      length: opt.length || 0,
      roomType: opt.roomType,
      file_length: opt.file_length,
      onFileUploadError: opt.onFileUploadError,
      onFileUploadComplete: opt.onFileUploadComplete,
      success: opt.success,
      fail: opt.fail,
      flashUpload: opt.flashUpload,
      body: opt.body };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * file message
      */
  Message.file = function (id) {
    this.id = id;
    this.type = "file";
    this.body = {};
  };
  Message.file.prototype.set = function (opt) {
    opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

    this.value = opt.file;
    this.filename = opt.filename || this.value.filename;

    this.body = {
      id: this.id,
      file: this.value,
      filename: this.filename,
      apiUrl: opt.apiUrl,
      to: opt.to,
      from: opt.from,
      type: this.type,
      ext: opt.ext || {},
      roomType: opt.roomType,
      onFileUploadError: opt.onFileUploadError,
      onFileUploadComplete: opt.onFileUploadComplete,
      success: opt.success,
      fail: opt.fail,
      flashUpload: opt.flashUpload,
      body: opt.body };

    !opt.roomType && delete this.body.roomType;
  };

  /*
      * video message
      */
  Message.video = function (id) {
    this.id = id;
    this.type = "file";
    this.body = {};
  };
  Message.video.prototype.set = function (opt) {
    opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

    this.value = opt.file;
    this.filename = opt.filename || this.value.filename;

    this.body = {
      id: this.id,
      file: this.value,
      filename: this.filename,
      apiUrl: opt.apiUrl,
      to: opt.to,
      from: opt.from,
      type: this.type,
      ext: opt.ext || {},
      roomType: opt.roomType,
      onFileUploadError: opt.onFileUploadError,
      onFileUploadComplete: opt.onFileUploadComplete,
      success: opt.success,
      fail: opt.fail,
      flashUpload: opt.flashUpload,
      body: opt.body };

    !opt.roomType && delete this.body.roomType;
  };




  function _Message(message) {
    if (!(this instanceof _Message)) {
      return new _Message(message);
    }
    this.msg = message;
  }
  _Message.prototype.send = function (conn) {
    var me = this;
    var _send = function _send(message) {
      message.ext = message.ext || {};
      message.ext.weichat = message.ext.weichat || {};
      message.ext.weichat.originType = message.ext.weichat.originType || "webim";
      var json = {
        from: conn.context.userId || "",
        to: message.to,
        bodies: [message.body],
        ext: message.ext || {} };

      var jsonstr = _utils.stringify(json);
      var dom = StropheAll.
      $msg({
        type: message.group || "chat",
        to: message.toJid,
        id: message.id,
        xmlns: "jabber:client" }).

      c("body").
      t(jsonstr);

      if (message.roomType) {
        dom.
        up().
        c("roomtype", {
          xmlns: "easemob:x:roomtype",
          type: "chatroom" });

      }
      if (message.bodyId) {
        dom = StropheAll.
        $msg({
          from: conn.context.jid || "",
          to: message.toJid,
          id: message.id,
          xmlns: "jabber:client" }).

        c("body").
        t(message.bodyId);

        var delivery = {
          xmlns: "urn:xmpp:receipts",
          id: message.bodyId };

        dom.up().c("delivery", delivery);
      }

      if (message.ackId) {

        if (conn.context.jid.indexOf(message.toJid) >= 0) {
          return;
        }
        dom = StropheAll.$msg({
          from: conn.context.jid || "",
          to: message.toJid,
          id: message.id,
          xmlns: "jabber:client" }).
        c("body").t(message.ackId);
        var read = {
          xmlns: "urn:xmpp:receipts",
          id: message.ackId };

        dom.up().c("acked", read);
      }

      // setTimeout(function(){
      // 	if(typeof _msgHash !== "undefined" && _msgHash[message.id]){
      // 		_msgHash[message.id].msg.fail instanceof Function
      // 			&& _msgHash[message.id].msg.fail(message.id);
      // 	}
      // }, 60000);
      conn.sendCommand(dom.tree(), message.id);
    };


    if (me.msg.file) {
      if (me.msg.body && me.msg.body.url) {// Only send msg
        _send(me.msg);
        return;
      }
      var _tmpComplete = me.msg.onFileUploadComplete;
      var _complete = function _complete(data) {
        if (data.entities[0]["file-metadata"]) {
          var file_len = data.entities[0]["file-metadata"]["content-length"];
          me.msg.file_length = file_len;
          me.msg.filetype = data.entities[0]["file-metadata"]["content-type"];
          if (file_len > 204800) {
            me.msg.thumbnail = true;
          }
        }
        me.msg.body = {
          type: me.msg.type || "file",
          url: data.uri + "/" + data.entities[0].uuid,
          secret: data.entities[0]["share-secret"],
          filename: me.msg.file.filename || me.msg.filename,
          size: {
            width: me.msg.width || 0,
            height: me.msg.height || 0 },

          length: me.msg.length || 0,
          file_length: me.msg.file_length || 0,
          filetype: me.msg.filetype };

        _send(me.msg);
        _tmpComplete instanceof Function && _tmpComplete(data, me.msg.id);
      };
      me.msg.onFileUploadComplete = _complete;
      _utils.uploadFile.call(conn, me.msg);
    } else
    if (me.msg.type === "img") {//  添加img判断规则   wjy
      _send(me.msg);
    } else
    {
      me.msg.body = {
        type: me.msg.type === "chat" ? "txt" : me.msg.type,
        msg: me.msg.msg };

      if (me.msg.type === "cmd") {
        me.msg.body.action = me.msg.action;
      } else
      if (me.msg.type === "loc") {
        me.msg.body.addr = me.msg.addr;
        me.msg.body.lat = me.msg.lat;
        me.msg.body.lng = me.msg.lng;
      }
      _send(me.msg);
    }
  };

  exports._msg = _Message;
  exports.message = Message;
})();

/***/ }),
/* 17 */
/*!*****************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/sdk/queue.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
(function () {
  function Array_h(length) {
    this.array = length === undefined ? [] : new Array(length);
  }

  Array_h.prototype = {
    /**
                         * 返回数组长度
                         *
                         * @return {Number} length [数组长度]
                         */
    length: function length() {
      return this.array.length;
    },

    at: function at(index) {
      return this.array[index];
    },

    set: function set(index, obj) {
      this.array[index] = obj;
    },

    /**
        * 向数组的末尾添加一个或多个元素，并返回新的长度。
        *
        * @param  {*} obj [description]
        * @return {Number} length [新数组的长度]
        */
    push: function push(obj) {
      return this.array.push(obj);
    },

    /**
        * 返回数组中选定的元素
        *
        * @param  {Number} start [开始索引值]
        * @param  {Number} end [结束索引值]
        * @return {Array} newArray  [新的数组]
        */
    slice: function slice(start, end) {
      this.array = this.array.slice(start, end);
      return this.array;
    },

    concat: function concat(array) {
      this.array = this.array.concat(array);
    },

    remove: function remove(index, count) {
      count = count === undefined ? 1 : count;
      this.array.splice(index, count);
    },

    join: function join(separator) {
      return this.array.join(separator);
    },

    clear: function clear() {
      this.array.length = 0;
    } };


  /**
          * 先进先出队列 (First Input First Output)
          *
          * 一种先进先出的数据缓存器
          */
  var Queue = function Queue() {
    this._array_h = new Array_h();
  };

  Queue.prototype = {
    _index: 0,

    /**
                * 排队
                *
                * @param  {Object} obj [description]
                * @return {[type]}     [description]
                */
    push: function push(obj) {
      this._array_h.push(obj);
    },

    /**
        * 出队
        *
        * @return {Object} [description]
        */
    pop: function pop() {
      var ret = null;
      if (this._array_h.length()) {
        ret = this._array_h.at(this._index);
        if (++this._index * 2 >= this._array_h.length()) {
          this._array_h.slice(this._index);
          this._index = 0;
        }
      }
      return ret;
    },

    /**
        * 返回队列中头部(即最新添加的)的动态对象
        *
        * @return {Object} [description]
        */
    head: function head() {
      var ret = null,len = this._array_h.length();
      if (len) {
        ret = this._array_h.at(len - 1);
      }
      return ret;
    },

    /**
        * 返回队列中尾部(即最早添加的)的动态对象
        *
        * @return {Object} [description]
        */
    tail: function tail() {
      var ret = null,len = this._array_h.length();
      if (len) {
        ret = this._array_h.at(this._index);
      }
      return ret;
    },

    /**
        * 返回数据队列长度
        *
        * @return {Number} [description]
        */
    length: function length() {
      return this._array_h.length() - this._index;
    },

    /**
        * 队列是否为空
        *
        * @return {Boolean} [description]
        */
    empty: function empty() {
      return this._array_h.length() === 0;
    },

    clear: function clear() {
      this._array_h.clear();
    } };


  exports.Queue = Queue;

})();

/***/ }),
/* 18 */
/*!*************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/utils/WebIMConfig.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * git do not control webim.config.js
                                                                                                      * everyone should copy webim.config.js to webim.config.js
                                                                                                      * and have their own configs.
                                                                                                      * In this way , others won't be influenced by this config while git pull.
                                                                                                      *
                                                                                                      */

// for react native
var location = {
  protocol: "https" };


var config = {
  /*
                * XMPP server
                */
  xmppURL: "wss://im-api.easemob.com/ws/",
  // xmppURL: '172.17.3.122:5280',
  /*
   * Backend REST API URL
   */
  // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  // ios must be https!!! by lwz
  apiURL: "https://a1.easemob.com",
  // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//172.17.3.155:8080',
  /*
   * Application AppKey
   */
  appkey: "1109181216065516#gsv",
  /*
                                   * Whether to use HTTPS      '1177161227178308#xcx'
                                   * @parameter {Boolean} true or false
                                   */
  https: false,
  /*
                 * isMultiLoginSessions
                 * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
                 * false: A visitor can sign in to only one webpage and receive messages at the webpage.
                 */
  isMultiLoginSessions: false,
  /**
                                * Whether to use window.doQuery()
                                * @parameter {Boolean} true or false
                                */
  isWindowSDK: false,
  /**
                       * isSandBox=true:  xmppURL: 'im-api.sandbox.easemob.com',  apiURL: '//a1.sdb.easemob.com',
                       * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
                       * @parameter {Boolean} true or false
                       */
  isSandBox: false,
  /**
                     * Whether to console.log in strophe.log()
                     * @parameter {Boolean} true or false
                     */
  isDebug: false,
  /**
                   * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
                   * won't auto connect if autoReconnectNumMax=0.
                   */
  autoReconnectNumMax: 15,
  /**
                            * the interval secons between each atuo reconnectting.
                            * works only if autoReconnectMaxNum >= 2.
                            */
  autoReconnectInterval: 2,
  /**
                             * webrtc supports WebKit and https only
                             */
  isWebRTC: false,
  /*
                    * Set to auto sign-in
                    */
  isAutoLogin: true };var _default =


config;exports.default = _default;

/***/ }),
/* 19 */
/*!*****************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/comps/chat/msgstorage.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var Disp = __webpack_require__(/*! ../../utils/Dispatcher */ 20);
var msgPackager = __webpack_require__(/*! ./msgpackager */ 21);
var msgType = __webpack_require__(/*! ./msgtype */ 22);
var msgStorage = new Disp();
var disp = __webpack_require__(/*! ../../utils/broadcast */ 23);
msgStorage.saveReceiveMsg = function (receiveMsg, type) {
  var sendableMsg;
  if (type == msgType.IMAGE) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          size: {
            width: receiveMsg.width,
            height: receiveMsg.height } } } };




  } else
  if (type == msgType.TEXT || type == msgType.EMOJI) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          msg: receiveMsg.data } },


      value: receiveMsg.data };

  } else
  if (type == msgType.FILE) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.file_length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          msg: "当前不支持此格式消息展示" } },


      value: receiveMsg.data };

  } else
  if (type == msgType.AUDIO) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      accessToken: receiveMsg.token || receiveMsg.accessToken,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          from: receiveMsg.from,
          to: receiveMsg.to } } };



  } else
  {
    return;
  }
  this.saveMsg(sendableMsg, type, receiveMsg);
};
msgStorage.saveMsg = function (sendableMsg, type, receiveMsg) {
  //console.log('sendableMsgsendableMsg', sendableMsg)
  var me = this;
  var myName = wx.getStorageSync("myUsername");
  var sessionKey;
  // 仅用作群聊收消息，发消息没有 receiveMsg
  if (receiveMsg && receiveMsg.type == "groupchat") {
    sessionKey = receiveMsg.to + myName;
  }
  // 群聊发 & 单发 & 单收
  else {
      sessionKey = sendableMsg.body.from == myName ?
      sendableMsg.body.to + myName :
      sendableMsg.body.from + myName;
    }
  var curChatMsg = wx.getStorageSync(sessionKey) || [];
  var renderableMsg = msgPackager(sendableMsg, type, myName);
  if (type == msgType.AUDIO) {
    renderableMsg.msg.length = sendableMsg.body.length;
    renderableMsg.msg.token = sendableMsg.accessToken;
  }
  curChatMsg.push(renderableMsg);
  //console.log('renderableMsgrenderableMsg', renderableMsg)
  if (type == msgType.AUDIO) {
    renderableMsg.msg.token = sendableMsg.accessToken;
    //如果是音频则请求服务器转码
    // wx.downloadFile({
    // 	url: sendableMsg.body.body.url,
    // 	header: {
    // 		"X-Requested-With": "XMLHttpRequest",
    // 		Accept: "audio/mp3",
    // 		Authorization: "Bearer " + sendableMsg.accessToken
    // 	},
    // 	success(res){
    // 		// wx.playVoice({
    // 		// 	filePath: res.tempFilePath
    // 		// });
    // 		renderableMsg.msg.url = res.tempFilePath;

    // 		save();
    // 	},
    // 	fail(e){
    // 		console.log("downloadFile failed", e);
    // 	}
    // });
  }
  // else{
  // 	save();
  // }

  save();
  function save() {
    wx.setStorage({
      key: sessionKey,
      data: curChatMsg,
      success: function success() {
        if (type == msgType.AUDIO || type == msgType.VIDEO) {
          disp.fire('em.chat.audio.fileLoaded');
        }
        me.fire("newChatMsg", renderableMsg, type, curChatMsg, sessionKey);
      } });

  }
};

module.exports = msgStorage;

/***/ }),
/* 20 */
/*!************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/utils/Dispatcher.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var dispCbs = [];
var dispIns = [];

function Dispatcher() {
  dispIns.push(this);
  dispCbs.push({});
}
Dispatcher.prototype = {
  on: function on(type, cb) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];
    if (!~cbs.indexOf(cb)) {
      cbs.push(cb);
    }
  },
  off: function off(type, cb) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];
    var curTypeCbIdx = cbs.indexOf(cb);
    if (~curTypeCbIdx) {
      cbs.splice(curTypeCbIdx, 1);
    }
  },
  fire: function fire(type) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}
    for (var i = 0; i < cbs.length; i++) {
      cbs[i].apply(null, args);
    }
  } };

module.exports = Dispatcher;

/***/ }),
/* 21 */
/*!******************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/comps/chat/msgpackager.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var WebIM = __webpack_require__(/*! ../../utils/WebIM */ 12)["default"];
var msgType = __webpack_require__(/*! ./msgtype */ 22);

module.exports = function (sendableMsg, type, myName) {
  var time = WebIM.time();
  var renderableMsg = {
    info: {
      from: sendableMsg.body.from,
      to: sendableMsg.body.to },

    username: sendableMsg.body.from == myName ? sendableMsg.body.to : sendableMsg.body.from,
    yourname: sendableMsg.body.from,
    msg: {
      type: type,
      url: sendableMsg.body.body.url,
      data: getMsgData(sendableMsg, type) },

    style: sendableMsg.body.from == myName ? "self" : "",
    time: time,
    mid: sendableMsg.type + sendableMsg.id,
    chatType: sendableMsg.body.chatType };

  if (type == msgType.IMAGE) {
    renderableMsg.msg.size = {
      width: sendableMsg.body.body.size.width,
      height: sendableMsg.body.body.size.height };

  } else if (type == msgType.AUDIO) {
    renderableMsg.msg.length = sendableMsg.body.length;
  } else if (type == msgType.FILE) {
    renderableMsg.msg.data = [{ data: "[当前不支持此格式消息展示]", type: "txt" }];
    renderableMsg.msg.type = 'txt';
  }
  return renderableMsg;

  function getMsgData(sendableMsg, type) {
    if (type == msgType.TEXT) {
      return WebIM.parseEmoji(sendableMsg.value.replace(/\n/mg, ""));
    } else
    if (type == msgType.EMOJI) {
      return sendableMsg.value;
    } else
    if (type == msgType.IMAGE || type == msgType.VIDEO || type == msgType.AUDIO) {
      return sendableMsg.body.body.url;
    } else if (type == msgType.FILE) {
      return sendableMsg.body.body.msg;
    }
    return "";
  }
};

/***/ }),
/* 22 */
/*!**************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/comps/chat/msgtype.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
module.exports = {
  IMAGE: "img",
  TEXT: "txt",
  LOCATION: "location",
  VIDEO: "video",
  AUDIO: "audio",
  EMOJI: "emoji",
  FILE: "chat",
  //
  chatType: {
    SINGLE_CHAT: "singleChat",
    CHAT_ROOM: "chatRoom" } };

/***/ }),
/* 23 */
/*!***********************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/utils/broadcast.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var Dispatcher = __webpack_require__(/*! ./Dispatcher */ 20);
module.exports = new Dispatcher();

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 28 */,
/* 29 */
/*!****************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ 2);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);


function callHook$1(vm, hook, params) {
  var handlers = vm.$options[hook];
  if (hook === 'onError' && handlers) {
    handlers = [handlers];
  }
  if(typeof handlers === 'function'){
    handlers = [handlers]
  }

  var ret;
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
//      try {
        ret = handlers[i].call(vm, params);
//       } catch (e) {//fixed by xxxxxx
//         handleError(e, vm, (hook + " hook"));
//       }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  // for child
  if (vm.$children.length) {
    vm.$children.forEach(function (v) {
      return callHook$1(v, hook, params);
    });
  }

  return ret
}

function getRootVueVm(page) {
  return page.$vm.$root;
}

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  return {
    // 页面的初始数据
    data: {
      $root: {}
    },

    // mp lifecycle for vue
    // 生命周期函数--监听页面加载
    onLoad:function onLoad(query) {
      //页面加载的时候
      var app = new vue__WEBPACK_IMPORTED_MODULE_0___default.a(App);
      // 挂载Vue对象到page上
      this.$vm = app;
      var rootVueVM = app.$root;
      rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__//fixed by xxxxxx(createIntersectionObserver)
      rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
      
      //初始化mp对象
      if (!rootVueVM.$mp) {
        rootVueVM.$mp = {};
      }
      var mp = rootVueVM.$mp;
      mp.mpType = 'page';
      mp.page = this;
      mp.query = query;
      mp.status = 'load';
      //mount 要在 mp.status = 'load';赋值之后，不然mount方法会重复添加微信Page
      //具体原因参考mpvue核心库源码，_initMP方法
      app.$mount();
    },

    handleProxy: function handleProxy(e) {
      var rootVueVM = getRootVueVm(this);
      return rootVueVM.$handleProxyWithVue(e)
    },

    // 生命周期函数--监听页面显示
    onShow:function onShow() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'show';
      callHook$1(rootVueVM, 'onShow');
      //   // 只有页面需要 setData
      rootVueVM.$nextTick(function () {
        rootVueVM._initDataToMP();
      });
    },

    // 生命周期函数--监听页面初次渲染完成
    onReady:function onReady() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'ready';
      callHook$1(rootVueVM, 'onReady');
    },

    // 生命周期函数--监听页面隐藏
    onHide: function onHide() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'hide';
      callHook$1(rootVueVM, 'onHide');
    },

    // 生命周期函数--监听页面卸载
    onUnload: function onUnload() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onUnload');
      rootVueVM.$destroy();
    },

    // 页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh: function onPullDownRefresh() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onPullDownRefresh');
    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function onReachBottom() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onReachBottom');
    },

    // Do something when page scroll
    onPageScroll: function onPageScroll(options) {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onPageScroll', options);
    },

    // 当前是 tab 页时，点击 tab 时触发
    onTabItemTap: function onTabItemTap(options) {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onTabItemTap', options);
    },
		
    // // 用户点击右上角分享
    onShareAppMessage: App.onShareAppMessage ?
      function (options) {
        var rootVueVM = getRootVueVm(this);
        return callHook$1(rootVueVM, 'onShareAppMessage', options);
      } : null,

    //fixed by xxxxxx
    onNavigationBarButtonTap: function onNavigationBarButtonTap(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarButtonTap", options)
    },
    onNavigationBarSearchInputChanged: function onNavigationBarSearchInputChanged(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputChanged", options)
    },
    onNavigationBarSearchInputConfirmed: function onNavigationBarSearchInputConfirmed(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputConfirmed", options)
    },
    onNavigationBarSearchInputClicked: function onNavigationBarSearchInputClicked(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputClicked", options)
    },
    onBackPress: function onBackPress(options) {
        var rootVueVM = getRootVueVm(this);
    		return callHook$1(rootVueVM, "onBackPress",options)
    },
		$getAppWebview:function (e) {
				return plus.webview.getWebviewById('' + this.__wxWebviewId__)
		}
  };
});


/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/*!************************************************************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/node_modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_number_box_vue_vue_type_template_id_f9ee93f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-number-box.vue?vue&type=template&id=f9ee93f8& */ 44);
/* harmony import */ var _uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-number-box.vue?vue&type=script&lang=js& */ 46);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_number_box_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-number-box.vue?vue&type=style&index=0&lang=scss& */ 48);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 27);






/* normalize component */

var component = Object(_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_number_box_vue_vue_type_template_id_f9ee93f8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_number_box_vue_vue_type_template_id_f9ee93f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "HBuilderProject/goodshowuni/node_modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 44 */
/*!*******************************************************************************************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/node_modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue?vue&type=template&id=f9ee93f8& ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_template_id_f9ee93f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-number-box.vue?vue&type=template&id=f9ee93f8& */ 45);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_template_id_f9ee93f8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_template_id_f9ee93f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),
/* 45 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Volumes/machard/HBuilderProject/goodshowuni/node_modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue?vue&type=template&id=f9ee93f8& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", { staticClass: "uni-numbox" }, [
    _c(
      "view",
      {
        staticClass: "uni-numbox__minus",
        class: {
          "uni-numbox--disabled": _vm.inputValue <= _vm.min || _vm.disabled
        },
        attrs: { eventid: "3c2b173a-0" },
        on: {
          click: function($event) {
            _vm._calcValue("minus")
          }
        }
      },
      [_vm._v("-")]
    ),
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.inputValue,
          expression: "inputValue"
        }
      ],
      staticClass: "uni-numbox__value",
      attrs: { disabled: _vm.disabled, type: "number", eventid: "3c2b173a-1" },
      domProps: { value: _vm.inputValue },
      on: {
        blur: _vm._onBlur,
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.inputValue = $event.target.value
        }
      }
    }),
    _c(
      "view",
      {
        staticClass: "uni-numbox__plus",
        class: {
          "uni-numbox--disabled": _vm.inputValue >= _vm.max || _vm.disabled
        },
        attrs: { eventid: "3c2b173a-2" },
        on: {
          click: function($event) {
            _vm._calcValue("plus")
          }
        }
      },
      [_vm._v("+")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 46 */
/*!*************************************************************************************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/node_modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-number-box.vue?vue&type=script&lang=js& */ 47);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 47 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Volumes/machard/HBuilderProject/goodshowuni/node_modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =


















{
  name: 'UniNumberBox',
  props: {
    value: {
      type: [Number, String],
      default: 1 },

    min: {
      type: Number,
      default: 0 },

    max: {
      type: Number,
      default: 100 },

    step: {
      type: Number,
      default: 1 },

    disabled: {
      type: Boolean,
      default: false } },


  data: function data() {
    return {
      inputValue: 0 };

  },
  watch: {
    value: function value(val) {
      this.inputValue = +val;
    },
    inputValue: function inputValue(newVal, oldVal) {
      if (+newVal !== +oldVal) {
        this.$emit('change', newVal);
      }
    } },

  created: function created() {
    this.inputValue = +this.value;
  },
  methods: {
    _calcValue: function _calcValue(type) {
      if (this.disabled) {
        return;
      }
      var scale = this._getDecimalScale();
      var value = this.inputValue * scale;
      var step = this.step * scale;
      if (type === 'minus') {
        value -= step;
      } else if (type === 'plus') {
        value += step;
      }
      if (value < this.min || value > this.max) {
        return;
      }
      this.inputValue = value / scale;
    },
    _getDecimalScale: function _getDecimalScale() {
      var scale = 1;
      // 浮点型
      if (~~this.step !== this.step) {
        scale = Math.pow(10, (this.step + '').split('.')[1].length);
      }
      return scale;
    },
    _onBlur: function _onBlur(event) {
      var value = event.detail.value;
      if (!value) {
        this.inputValue = 0;
        return;
      }
      value = +value;
      if (value > this.max) {
        value = this.max;
      } else if (value < this.min) {
        value = this.min;
      }
      this.inputValue = value;
    } } };exports.default = _default;

/***/ }),
/* 48 */
/*!**********************************************************************************************************************************************************!*\
  !*** /Volumes/machard/HBuilderProject/goodshowuni/node_modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../../HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-number-box.vue?vue&type=style&index=0&lang=scss& */ 49);
/* harmony import */ var _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_number_box_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 49 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Volumes/machard/HBuilderProject/goodshowuni/node_modules/@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map