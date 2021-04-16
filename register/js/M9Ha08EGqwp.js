if (self.CavalryLogger) { CavalryLogger.start_js(["KUDPaun"]); }

__d("EventListenerImplForBlue",["Event","TimeSlice","emptyFunction","setImmediateAcrossTransitions"],(function(a,b,c,d,e,f){function g(a,c,d,e){var f=b("TimeSlice").guard(d,"EventListener capture "+c);if(a.addEventListener){a.addEventListener(c,f,e);return{remove:function(){a.removeEventListener(c,f,e)}}}else return{remove:b("emptyFunction")}}a={listen:function(a,c,d){return b("Event").listen(a,c,d)},capture:function(a,b,c){return g(a,b,c,!0)},captureWithPassiveFlag:function(a,b,c,d){return g(a,b,c,{passive:d,capture:!0})},bubbleWithPassiveFlag:function(a,b,c,d){return g(a,b,c,{passive:d,capture:!1})},registerDefault:function(a,c){var d,e=b("Event").listen(document.documentElement,a,f,b("Event").Priority._BUBBLE);function f(){g(),d=b("Event").listen(document,a,c),b("setImmediateAcrossTransitions")(g)}function g(){d&&d.remove(),d=null}return{remove:function(){g(),e&&e.remove(),e=null}}},suppress:function(a){b("Event").kill(a)}};c=a;e.exports=c}),null);
__d("WarningFilter",["CoreWarningGK"],(function(a,b,c,d,e,f){var g=21;b=a;c=function(){return{}};function a(a){return{finalFormat:a,forceDialogImmediately:!1,monitorEvent:null,monitorListVersion:g,monitorSampleRate:1,suppressCompletely:!1,suppressDialog_LEGACY:!0}}e.exports={prepareWarning:b,getReactWarnings:c}}),null);
__d("warningBlue",["Bootloader","SiteData","WarningFilter","cr:983844"],(function(a,b,c,d,e,f){function a(a,b){}b=a;c=b;e.exports=c}),null);
__d("BanzaiUtils",["BanzaiConsts","CurrentUser","FBLogger","WebSession","performanceAbsoluteNow"],(function(a,b,c,d,e,f){"use strict";var g,h,i={canSend:function(a){return a[2]>=(g||(g=b("performanceAbsoluteNow")))()-(h||(h=b("BanzaiConsts"))).EXPIRY},filterPost:function(a,c,d,e){if(e.overlimit)return!0;if(!e.sendMinimumOnePost&&a[4]+e.currentSize>(h||(h=b("BanzaiConsts"))).BATCH_SIZE_LIMIT)return!0;var f=a.__meta;if(f.status!=null&&f.status>=(h||(h=b("BanzaiConsts"))).POST_SENT||!i.canSend(a))return!1;if(f.status!=null&&f.status>=(h||(h=b("BanzaiConsts"))).POST_INFLIGHT)return!0;var g=f.compress!=null?f.compress:!0,j=(f.webSessionId!=null?f.webSessionId:"null")+(f.userID!=null?f.userID:"null")+(f.appID!=null?f.appID:"null")+(g?"compress":""),k=e.wadMap.get(j);k||(k={app_id:f.appID,needs_compression:g,posts:[],user:f.userID,webSessionId:f.webSessionId},e.wadMap.set(j,k),c.push(k));f.status=(h||(h=b("BanzaiConsts"))).POST_INFLIGHT;Array.isArray(k.posts)?k.posts.push(a):b("FBLogger")("banzai").mustfix("Posts were a string instead of array");d.push(a);e.currentSize+=a[4];e.currentSize>=(h||(h=b("BanzaiConsts"))).BATCH_SIZE_LIMIT&&(e.overlimit=!0);return e.keepRetryable&&Boolean(f.retry)},resetPostStatus:function(a){a.__meta.status=(h||(h=b("BanzaiConsts"))).POST_READY},retryPost:function(a,c,d){var e=a;e.__meta.status=(h||(h=b("BanzaiConsts"))).POST_READY;e[3]=(e[3]||0)+1;e.__meta.retry!==!0&&c>=400&&c<600&&d.push(a)},wrapData:function(a,c,d,e,f){d=[a,c,d,0,(a=f)!=null?a:c?JSON.stringify(c).length:0];d.__meta={appID:b("CurrentUser").getAppID(),retry:e===!0,status:(h||(h=b("BanzaiConsts"))).POST_READY,userID:b("CurrentUser").getPossiblyNonFacebookUserID(),webSessionId:b("WebSession").getId()};return d}};e.exports=i}),null);
__d("SetIdleTimeoutAcrossTransitions",["NavigationMetrics","cancelIdleCallback","clearTimeout","nullthrows","requestIdleCallbackAcrossTransitions","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){"use strict";f.start=c;f.clear=d;var g=!1,h=new Map();function c(a,c){if(g){var d=b("setTimeoutAcrossTransitions")(function(){var c=b("requestIdleCallbackAcrossTransitions")(function(){a(),h["delete"](c)});h.set(d,c)},c);return d}else return b("setTimeoutAcrossTransitions")(a,c)}function d(a){b("clearTimeout")(a),h.has(a)&&(b("cancelIdleCallback")(b("nullthrows")(h.get(a))),h["delete"](a))}b("NavigationMetrics").addRetroactiveListener(b("NavigationMetrics").Events.EVENT_OCCURRED,function(b,c){c.event==="all_pagelets_loaded"&&(g=!!a.requestIdleCallback)})}),null);
__d("BanzaiStorage",["BanzaiConsts","BanzaiUtils","CurrentUser","FBJSON","SetIdleTimeoutAcrossTransitions","WebSession","WebStorage","WebStorageMutex","isInIframe","performanceAbsoluteNow"],(function(a,b,c,d,e,f){"use strict";var g,h,i,j="bz:",k=b("isInIframe")(),l,m=!1,n=null;function o(){var a="check_quota";try{var b=p();if(!b)return!1;b.setItem(a,a);b.removeItem(a);return!0}catch(a){return!1}}function p(){m||(m=!0,l=(g||(g=b("WebStorage"))).getLocalStorage());return l}a={flush:function(a){if(k)return;var c=p();if(c){n==null&&(n=parseInt(c.getItem((h||(h=b("BanzaiConsts"))).LAST_STORAGE_FLUSH),10));var d=n&&(i||(i=b("performanceAbsoluteNow")))()-n>=(h||(h=b("BanzaiConsts"))).STORAGE_FLUSH_INTERVAL;d&&a();(d||!n)&&(n=(i||(i=b("performanceAbsoluteNow")))(),(g||(g=b("WebStorage"))).setItemGuarded(c,(h||(h=b("BanzaiConsts"))).LAST_STORAGE_FLUSH,n.toString()))}},restore:function(a){if(k)return;var c=p();if(!c)return;var d=function(d){var e=[];for(var f=0;f<c.length;f++){var g=c.key(f);typeof g==="string"&&g.indexOf(j)===0&&g.indexOf("bz:__")!==0&&e.push(g)}e.forEach(function(d){var e=c.getItem(d);c.removeItem(d);if(e==null||e==="")return;d=b("FBJSON").parse(e);d.forEach(function(c){if(!c)return;var d=c.__meta=c.pop(),e=b("BanzaiUtils").canSend(c);if(!e)return;e=b("CurrentUser").getPossiblyNonFacebookUserID();(d.userID===e||e==="0")&&(b("BanzaiUtils").resetPostStatus(c),a(c))})});d&&d.unlock()};o()?new(b("WebStorageMutex"))("banzai").lock(d):b("SetIdleTimeoutAcrossTransitions").start(d,0)},store:function(a){if(k)return;var c=p(),d=a.filter(function(a){return a.__meta.status!==(h||(h=b("BanzaiConsts"))).POST_SENT});if(!c||d.length<=0)return;d=d.map(function(a){return[a[0],a[1],a[2],a[3]||0,a[4],a.__meta]});a.splice(0,a.length);(g||(g=b("WebStorage"))).setItemGuarded(c,j+b("WebSession").getId()+"."+(i||(i=b("performanceAbsoluteNow")))(),b("FBJSON").stringify(d))}};e.exports=a}),null);
__d("BanzaiAdapter",["invariant","Arbiter","BanzaiConfig","BanzaiConsts","BanzaiStorage","QueryString","Run","TimeSlice","URI","UserAgent","ZeroRewrites","getAsyncParams","isInIframe","lowerFacebookDomain","once"],(function(a,b,c,d,e,f,g){var h,i,j=[],k=new(b("Arbiter"))(),l=b("isInIframe")();a=b("BanzaiConfig");var m="/ajax/bz",n="POST",o={config:a,useBeacon:!0,getEndPointUrl:function(a){a=b("getAsyncParams")(n);a=b("QueryString").appendToUrl(m,a);a.length<=2e3||g(0,21850,a);return a},getStorage:function(){return b("BanzaiStorage")},getTopLevel:function(){return l&&b("lowerFacebookDomain").isValidDocumentDomain()?window.top:null},inform:function(a){k.inform(a)},subscribe:function(a,b){return k.subscribe(a,b)},wrapInTimeSlice:function(a,c){return b("TimeSlice").guard(function(){a()},c,{propagationType:b("TimeSlice").PropagationType.ORPHAN})},cleanup:function(){var a=j;j=[];a.forEach(function(a){a.readyState<4&&a.abort()})},preferredCompressionMethod:b("once")(function(){return"snappy_base64"}),readyToSend:function(){return b("UserAgent").isBrowser("IE <= 8")||navigator.onLine},send:function(a,c,d,e){var f=o.getEndPointUrl(!1);f=b("ZeroRewrites").rewriteURI(new(h||(h=b("URI")))(f));var g=b("ZeroRewrites").getTransportBuilderForURI(f)();g.open(n,f.toString(),!0);g.onreadystatechange=function(){if(g.readyState>=4){var a=j.indexOf(g);a>=0&&j.splice(a,1);try{a=g.status}catch(b){a=0}a==200?(c&&c(),e||o.inform((i||(i=b("BanzaiConsts"))).OK)):(d&&d(a),e||o.inform((i||(i=b("BanzaiConsts"))).ERROR))}};j.push(g);g.send(a,!1)},setHooks:function(a){},setUnloadHook:function(a){b("Run").onAfterUnload(a._unload)},onUnload:function(a){b("Run").onAfterUnload(a)},isOkToSendViaBeacon:function(){return!0}};c=o;e.exports=c}),null);
__d("cancelIdleCallbackBlue",["IdleCallbackImplementation"],(function(a,b,c,d,e,f){e.exports=c;var g=(d=a.cancelIdleCallback)!=null?d:b("IdleCallbackImplementation").cancelIdleCallback;function c(a){g(a)}}),null);
__d("React.classic",["cr:1292365"],(function(a,b,c,d,e,f){e.exports=b("cr:1292365")}),null);
__d("ReactCurrentDispatcher_DO_NOT_USE_IT_WILL_BREAK",[],(function(a,b,c,d,e,f){"use strict";a={current:null};e.exports=a}),null);
__d("ReactCurrentDispatcher",["ReactCurrentDispatcher_DO_NOT_USE_IT_WILL_BREAK"],(function(a,b,c,d,e,f){"use strict";e.exports=b("ReactCurrentDispatcher_DO_NOT_USE_IT_WILL_BREAK")}),null);
__d("ReactFeatureFlags",["TrustedTypesConfig","gkx","qex"],(function(a,b,c,d,e,f){"use strict";d={enableTrustedTypesIntegration:b("TrustedTypesConfig").useTrustedTypes,enableEagerRootListeners:!0,enableComponentStackLocations:!0,enableFilterEmptyStringAttributesDOM:(a=b("gkx"))("1399218"),debugRenderPhaseSideEffectsForStrictMode:a("729630"),disableInputAttributeSyncing:a("729631"),disableOnScrollBubbling:a("1620803"),warnAboutShorthandPropertyCollision:a("1281505"),disableSchedulerTimeoutBasedOnReactExpirationTime:a("1291023"),warnAboutSpreadingKeyToJSX:a("1294182"),enableLegacyFBSupport:a("1401060"),disableHiddenPropDeprioritization:a("1485055"),enableFormEventDelegation:a("1597642"),skipUnmountedBoundaries:a("1722014"),disableSchedulerTimeoutInWorkLoop:a("1695831"),enableStrictEffects:a("1742795"),createRootStrictEffectsByDefault:a("1742795"),enableUseRefAccessWarning:a("1778302"),disableNativeComponentFrames:a("1848749"),enableTransitionEntanglement:a("1906871"),enableSyncMicroTasks:a("1985945"),enableSchedulingProfiler:a("1596063"),enableSchedulingProfilerComponentStacks:a("1647260"),enableProfilerNestedUpdateScheduledHook:a("1840809"),enableUpdaterTracking:a("12"),enableLazyContextPropagation:b("qex")._("1981829")===!0,deletedTreeCleanUpLevel:(c=b("qex")._("2008889"))!=null?c:b("gkx")("2026019")?3:0};e.exports=d}),null);
__d("React-prod.classic",["ReactCurrentDispatcher","ReactCurrentOwner","ReactFeatureFlags","object-assign"],(function(a,b,c,d,e,f){"use strict";var g,h,i=60103,j=60106;f.Fragment=60107;f.StrictMode=60108;f.Profiler=60114;var k=60109,l=60110,m=60112;f.Suspense=60113;f.unstable_SuspenseList=60120;var n=60115,o=60116;f.unstable_Scope=60119;f.unstable_DebugTracingMode=60129;f.unstable_LegacyHidden=60131;f.unstable_Cache=60132;if("function"===typeof Symbol&&Symbol["for"]){var p=Symbol["for"];i=p("react.element");j=p("react.portal");f.Fragment=p("react.fragment");f.StrictMode=p("react.strict_mode");f.Profiler=p("react.profiler");k=p("react.provider");l=p("react.context");m=p("react.forward_ref");f.Suspense=p("react.suspense");f.unstable_SuspenseList=p("react.suspense_list");n=p("react.memo");o=p("react.lazy");f.unstable_Scope=p("react.scope");f.unstable_DebugTracingMode=p("react.debug_trace_mode");f.unstable_LegacyHidden=p("react.legacy_hidden");f.unstable_Cache=p("react.cache")}var q="function"===typeof Symbol&&(typeof Symbol==="function"?Symbol.iterator:"@@iterator");function r(a){if(null===a||"object"!==typeof a)return null;a=q&&a[q]||a["@@iterator"];return"function"===typeof a?a:null}function s(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var t={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},u={};function a(a,b,c){this.props=a,this.context=b,this.refs=u,this.updater=c||t}a.prototype.isReactComponent={};a.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(s(85));this.updater.enqueueSetState(this,a,b,"setState")};a.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function c(){}c.prototype=a.prototype;function d(a,b,c){this.props=a,this.context=b,this.refs=u,this.updater=c||t}p=d.prototype=new c();p.constructor=d;Object.assign(p,a.prototype);p.isPureReactComponent=!0;var v=Object.prototype.hasOwnProperty,w={key:!0,ref:!0,__self:!0,__source:!0};function x(a,c,d){var e,f={},h=null,j=null;if(null!=c)for(e in void 0!==c.ref&&(j=c.ref),void 0!==c.key&&(h=""+c.key),c)v.call(c,e)&&!Object.prototype.hasOwnProperty.call(w,e)&&(f[e]=c[e]);var k=arguments.length-2;if(1===k)f.children=d;else if(1<k){for(var l=Array(k),m=0;m<k;m++)l[m]=arguments[m+2];f.children=l}if(a&&a.defaultProps)for(e in k=a.defaultProps,k)void 0===f[e]&&(f[e]=k[e]);return{$$typeof:i,type:a,key:h,ref:j,props:f,_owner:(g||(g=b("ReactCurrentOwner"))).current}}function y(a,b){return{$$typeof:i,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function z(a){return"object"===typeof a&&null!==a&&a.$$typeof===i}function A(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var B=/\/+/g;function C(a,b){return"object"===typeof a&&null!==a&&null!=a.key?A(""+a.key):b.toString(36)}function D(a,b,c,d,e){var f=typeof a;("undefined"===f||"boolean"===f)&&(a=null);var g=!1;if(null===a)g=!0;else switch(f){case"string":case"number":g=!0;break;case"object":switch(a.$$typeof){case i:case j:g=!0}}if(g)return g=a,e=e(g),a=""===d?"."+C(g,0):d,Array.isArray(e)?(c="",null!=a&&(c=a.replace(B,"$&/")+"/"),D(e,b,c,"",function(a){return a})):null!=e&&(z(e)&&(e=y(e,c+(!e.key||g&&g.key===e.key?"":(""+e.key).replace(B,"$&/")+"/")+a)),b.push(e)),1;g=0;d=""===d?".":d+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){f=a[h];var k=d+C(f,h);g+=D(f,b,c,k,e)}else if(k=r(a),"function"===typeof k)for(a=k.call(a),h=0;!(f=a.next()).done;)f=f.value,k=d+C(f,h++),g+=D(f,b,c,k,e);else if("object"===f)throw b=""+a,Error(s(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return g}function E(a,b,c){if(null==a)return a;var d=[],e=0;D(a,d,"","",function(a){return b.call(c,a,e++)});return d}function F(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b["default"],a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}if(1===a._status)return a._result;throw a._result}b("ReactFeatureFlags");function e(){return(h||(h=b("ReactCurrentDispatcher"))).current.useTransition()}function G(a){return(h||(h=b("ReactCurrentDispatcher"))).current.useDeferredValue(a)}function H(a,c,d){return(h||(h=b("ReactCurrentDispatcher"))).current.useMutableSource(a,c,d)}var I={transition:0};c={ReactCurrentDispatcher:h||(h=b("ReactCurrentDispatcher")),ReactCurrentBatchConfig:I,ReactCurrentOwner:g||(g=b("ReactCurrentOwner")),IsSomeRendererActing:{current:!1},assign:b("object-assign")};function J(a,b){return{_getVersion:b,_source:a,_workInProgressVersionPrimary:null,_workInProgressVersionSecondary:null}}function K(a){var b=I.transition;I.transition=1;try{a()}finally{I.transition=b}}var L=c.ReactCurrentOwner,M=Object.prototype.hasOwnProperty,N={key:!0,ref:!0,__self:!0,__source:!0};function O(a,b,c){var d={},e=null,f=null;void 0!==c&&(e=""+c);void 0!==b.key&&(e=""+b.key);void 0!==b.ref&&(f=b.ref);for(c in b)M.call(b,c)&&!Object.prototype.hasOwnProperty.call(N,c)&&(d[c]=b[c]);if(a&&a.defaultProps)for(c in b=a.defaultProps,b)void 0===d[c]&&(d[c]=b[c]);return{$$typeof:i,type:a,key:e,ref:f,props:d,_owner:L.current}}f.Children={map:E,forEach:function(a,b,c){E(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;E(a,function(){b++});return b},toArray:function(a){return E(a,function(a){return a})||[]},only:function(a){if(!z(a))throw Error(s(143));return a}};f.Component=a;f.PureComponent=d;f.SuspenseList=f.unstable_SuspenseList;f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=c;f.cloneElement=function(a,c,d){if(null===a||void 0===a)throw Error(s(267,a));var e=Object.assign({},a.props),f=a.key,h=a.ref,j=a._owner;if(null!=c){void 0!==c.ref&&(h=c.ref,j=(g||(g=b("ReactCurrentOwner"))).current);void 0!==c.key&&(f=""+c.key);if(a.type&&a.type.defaultProps)var k=a.type.defaultProps;for(l in c)v.call(c,l)&&!Object.prototype.hasOwnProperty.call(w,l)&&(e[l]=void 0===c[l]&&void 0!==k?k[l]:c[l])}var l=arguments.length-2;if(1===l)e.children=d;else if(1<l){k=Array(l);for(var m=0;m<l;m++)k[m]=arguments[m+2];e.children=k}return{$$typeof:i,type:a.type,key:f,ref:h,props:e,_owner:j}};f.createContext=function(a){a={$$typeof:l,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:k,_context:a};return a.Consumer=a};f.createElement=x;f.createFactory=function(a){var b=x.bind(null,a);b.type=a;return b};f.createMutableSource=J;f.createRef=function(){return{current:null}};f.forwardRef=function(a){return{$$typeof:m,render:a}};f.isValidElement=z;f.jsx=O;f.jsxDEV=void 0;f.jsxs=O;f.lazy=function(a){return{$$typeof:o,_payload:{_status:-1,_result:a},_init:F}};f.memo=function(a,b){return{$$typeof:n,type:a,compare:void 0===b?null:b}};f.startTransition=K;f.unstable_createMutableSource=J;f.unstable_getCacheForType=function(a){return(h||(h=b("ReactCurrentDispatcher"))).current.getCacheForType(a)};f.unstable_startTransition=K;f.unstable_useCacheRefresh=function(){return(h||(h=b("ReactCurrentDispatcher"))).current.useCacheRefresh()};f.unstable_useDeferredValue=G;f.unstable_useMutableSource=H;f.unstable_useOpaqueIdentifier=function(){return(h||(h=b("ReactCurrentDispatcher"))).current.useOpaqueIdentifier()};f.unstable_useTransition=e;f.useCallback=function(a,c){return(h||(h=b("ReactCurrentDispatcher"))).current.useCallback(a,c)};f.useContext=function(a){return(h||(h=b("ReactCurrentDispatcher"))).current.useContext(a)};f.useDebugValue=function(){};f.useDeferredValue=G;f.useEffect=function(a,c){return(h||(h=b("ReactCurrentDispatcher"))).current.useEffect(a,c)};f.useImperativeHandle=function(a,c,d){return(h||(h=b("ReactCurrentDispatcher"))).current.useImperativeHandle(a,c,d)};f.useLayoutEffect=function(a,c){return(h||(h=b("ReactCurrentDispatcher"))).current.useLayoutEffect(a,c)};f.useMemo=function(a,c){return(h||(h=b("ReactCurrentDispatcher"))).current.useMemo(a,c)};f.useMutableSource=H;f.useReducer=function(a,c,d){return(h||(h=b("ReactCurrentDispatcher"))).current.useReducer(a,c,d)};f.useRef=function(a){return(h||(h=b("ReactCurrentDispatcher"))).current.useRef(a)};f.useState=function(a){return(h||(h=b("ReactCurrentDispatcher"))).current.useState(a)};f.useTransition=e;f.version="17.0.2-061056ca6"}),null);
/**
 * License: https://www.facebook.com/legal/license/WRsJ32R7YJG/
 */
__d("SnappyCompress",[],(function(a,b,c,d,e,f){"use strict";function g(){return typeof process==="object"&&(typeof process.versions==="object"&&typeof process.versions.node!=="undefined")?!0:!1}function h(a){return a instanceof Uint8Array&&(!g()||!Buffer.isBuffer(a))}function i(a){return a instanceof ArrayBuffer}function j(a){return!g()?!1:Buffer.isBuffer(a)}var k="Argument compressed must be type of ArrayBuffer, Buffer, or Uint8Array";function a(a){if(!h(a)&&!i(a)&&!j(a))throw new TypeError(k);var b=!1,c=!1;h(a)?b=!0:i(a)&&(c=!0,a=new Uint8Array(a));a=new A(a);var d=a.readUncompressedLength();if(d===-1)throw new Error("Invalid Snappy bitstream");if(b){b=new Uint8Array(d);if(!a.uncompressToBuffer(b))throw new Error("Invalid Snappy bitstream")}else if(c){b=new ArrayBuffer(d);c=new Uint8Array(b);if(!a.uncompressToBuffer(c))throw new Error("Invalid Snappy bitstream")}else{b=Buffer.alloc(d);if(!a.uncompressToBuffer(b))throw new Error("Invalid Snappy bitstream")}return b}function b(a){if(!h(a)&&!i(a)&&!j(a))throw new TypeError(k);var b=!1,c=!1;h(a)?b=!0:i(a)&&(c=!0,a=new Uint8Array(a));a=new x(a);var d=a.maxCompressedLength(),e,f,g;b?(e=new Uint8Array(d),g=a.compressToBuffer(e)):c?(e=new ArrayBuffer(d),f=new Uint8Array(e),g=a.compressToBuffer(f)):(e=Buffer.alloc(d),g=a.compressToBuffer(e));if(!e.slice){f=new Uint8Array(Array.prototype.slice.call(e,0,g));if(b)return f;else if(c)return f.buffer;else throw new Error("not implemented")}return e.slice(0,g)}c=16;var l=1<<c,m=14,n=new Array(m+1);function o(a,b){return a*506832829>>>b}function p(a,b){return a[b]+(a[b+1]<<8)+(a[b+2]<<16)+(a[b+3]<<24)}function q(a,b,c){return a[b]===a[c]&&a[b+1]===a[c+1]&&a[b+2]===a[c+2]&&a[b+3]===a[c+3]}function r(a,b,c,d,e){var f;for(f=0;f<e;f++)c[d+f]=a[b+f]}function s(a,b,c,d,e){c<=60?(d[e]=c-1<<2,e+=1):c<256?(d[e]=60<<2,d[e+1]=c-1,e+=2):(d[e]=61<<2,d[e+1]=c-1&255,d[e+2]=c-1>>>8,e+=3);r(a,b,d,e,c);return e+c}function t(a,b,c,d){if(d<12&&c<2048){a[b]=1+(d-4<<2)+(c>>>8<<5);a[b+1]=c&255;return b+2}else{a[b]=2+(d-1<<2);a[b+1]=c&255;a[b+2]=c>>>8;return b+3}}function u(a,b,c,d){while(d>=68)b=t(a,b,c,64),d-=64;d>64&&(b=t(a,b,c,60),d-=60);return t(a,b,c,d)}function v(a,b,c,d,e){var f=1;while(1<<f<=c&&f<=m)f+=1;f-=1;var g=32-f;typeof n[f]==="undefined"&&(n[f]=new Uint16Array(1<<f));f=n[f];var h;for(h=0;h<f.length;h++)f[h]=0;h=b+c;var i=b,j=b,k,l,r,t,v,w=!0,x=15;if(c>=x){c=h-x;b+=1;x=o(p(a,b),g);while(w){t=32;l=b;do{b=l;k=x;v=t>>>5;t+=1;l=b+v;if(b>c){w=!1;break}x=o(p(a,l),g);r=i+f[k];f[k]=b-i}while(!q(a,b,r));if(!w)break;e=s(a,j,b-j,d,e);do{v=b;k=4;while(b+k<h&&a[b+k]===a[r+k])k+=1;b+=k;l=v-r;e=u(d,e,l,k);j=b;if(b>=c){w=!1;break}t=o(p(a,b-1),g);f[t]=b-1-i;v=o(p(a,b),g);r=i+f[v];f[v]=b-i}while(q(a,b,r));if(!w)break;b+=1;x=o(p(a,b),g)}}j<h&&(e=s(a,j,h-j,d,e));return e}function w(a,b,c){do b[c]=a&127,a=a>>>7,a>0&&(b[c]+=128),c+=1;while(a>0);return c}function x(a){this.array=a}x.prototype.maxCompressedLength=function(){var a=this.array.length;return 32+a+Math.floor(a/6)};x.prototype.compressToBuffer=function(a){var b=this.array,c=b.length,d=0,e=0,f;e=w(c,a,e);while(d<c)f=Math.min(c-d,l),e=v(b,d,f,a,e),d+=f;return e};var y=[0,255,65535,16777215,4294967295];function r(a,b,c,d,e){var f;for(f=0;f<e;f++)c[d+f]=a[b+f]}function z(a,b,c,d){var e;for(e=0;e<d;e++)a[b+e]=a[b-c+e]}function A(a){this.array=a,this.pos=0}A.prototype.readUncompressedLength=function(){var a=0,b=0,c,d;while(b<32&&this.pos<this.array.length){c=this.array[this.pos];this.pos+=1;d=c&127;if(d<<b>>>b!==d)return-1;a|=d<<b;if(c<128)return a;b+=7}return-1};A.prototype.uncompressToBuffer=function(a){var b=this.array,c=b.length,d=this.pos,e=0,f,g,h,i;while(d<b.length){f=b[d];d+=1;if((f&3)===0){g=(f>>>2)+1;if(g>60){if(d+3>=c)return!1;h=g-60;g=b[d]+(b[d+1]<<8)+(b[d+2]<<16)+(b[d+3]<<24);g=(g&y[h])+1;d+=h}if(d+g>c)return!1;r(b,d,a,e,g);d+=g;e+=g}else{switch(f&3){case 1:g=(f>>>2&7)+4;i=b[d]+(f>>>5<<8);d+=1;break;case 2:if(d+1>=c)return!1;g=(f>>>2)+1;i=b[d]+(b[d+1]<<8);d+=2;break;case 3:if(d+3>=c)return!1;g=(f>>>2)+1;i=b[d]+(b[d+1]<<8)+(b[d+2]<<16)+(b[d+3]<<24);d+=4;break;default:break}if(i===0||i>e)return!1;z(a,e,i,g);e+=g}}return!0};e.exports.uncompress=a;e.exports.compress=b}),null);
__d("SnappyCompressUtil",["SnappyCompress"],(function(a,b,c,d,e,f){"use strict";var g={compressUint8ArrayToSnappy:function(c){if(c==null)return null;var d=null;try{d=b("SnappyCompress").compress(c)}catch(a){return null}c="";for(var e=0;e<d.length;e++)c+=String.fromCharCode(d[e]);return a.btoa(c)},compressStringToSnappy:function(b){if(a.Uint8Array===void 0||a.btoa===void 0)return null;var c=new a.Uint8Array(b.length);for(var d=0;d<b.length;d++){var e=b.charCodeAt(d);if(e>127)return null;c[d]=e}return g.compressUint8ArrayToSnappy(c)},compressStringToSnappyBinary:function(c){if(a.Uint8Array===void 0)return null;var d=null;if(a.TextEncoder!==void 0)d=new TextEncoder().encode(c);else{d=new a.Uint8Array(c.length);for(var e=0;e<c.length;e++){var f=c.charCodeAt(e);if(f>127)return null;d[e]=f}}f=null;try{f=b("SnappyCompress").compress(d)}catch(a){return null}return f}};e.exports=g}),null);
__d("BanzaiCompressionUtils",["FBLogger","Promise","SnappyCompressUtil","once","performanceNow"],(function(a,b,c,d,e,f){"use strict";var g,h=b("once")(function(){if(a.CompressionStream==null)return!1;if(a.Response==null)return!1;try{new a.CompressionStream("deflate")}catch(a){return!1}return!0}),i={compressWad:function(a,c){if(a.needs_compression!==!0){delete a.needs_compression;return}if(c==="deflate"){i.compressWad(a,"snappy");return}var d=(g||(g=b("performanceNow")))(),e=JSON.stringify(a.posts),f;switch(c){case"snappy":f=b("SnappyCompressUtil").compressStringToSnappyBinary(e);break;case"snappy_base64":f=b("SnappyCompressUtil").compressStringToSnappy(e);break;default:break}f!=null&&f.length<e.length?(a.posts=f,a.compression=c,a.snappy_ms=Math.ceil((g||(g=b("performanceNow")))()-d),a.snappy_ms<0&&b("FBLogger")("BanzaiCompressionUtils").warn("Expected positive snappy_ms but got %s",a.snappy_ms)):a.compression="";delete a.needs_compression},compressWadAsync:function(c,d){if(d!=="deflate"){i.compressWad(c,"snappy");return b("Promise").resolve()}if(!h())return i.compressWadAsync(c,"snappy");var e=(g||(g=b("performanceNow")))(),f=JSON.stringify(c.posts),j=new Response(f).body;if(!j){c.compression="";delete c.needs_compression;return b("Promise").resolve()}j=j.pipeThrough(new a.CompressionStream("deflate"));return new Response(j).arrayBuffer().then(function(a){a.byteLength<f.length?(c.posts=new Uint8Array(a),c.compression=d,c.snappy_ms=Math.ceil((g||(g=b("performanceNow")))()-e),c.snappy_ms<0&&b("FBLogger")("BanzaiCompressionUtils").warn("Expected positive snappy_ms but got %s",c.snappy_ms)):c.compression="",delete c.needs_compression})["catch"](function(){c.compression="",delete c.needs_compression})},outOfBandsPosts:function(a){var b=0,c={};for(var d=0;d<a.length;d++){var e=a[d],f=e.compression==="snappy"||e.compression==="deflate";if(f){f=new Blob([e.posts],{type:"application/octet-stream"});e.posts=String(b);c["post_"+String(b)]=f;b++}}return c}};e.exports=i}),null);
__d("BanzaiBase",["BanzaiAdapter","BanzaiCompressionUtils","BanzaiConsts","BanzaiLazyQueue","BanzaiUtils","CurrentUser","ErrorGuard","ExecutionEnvironment","FBLogger","NavigationMetrics","SetIdleTimeoutAcrossTransitions","Visibility","WebSession","performanceAbsoluteNow"],(function(a,b,c,d,e,f){var g,h,i,j,k,l=[],m=null,n={_clearPostBuffer:function(){l=[]},_gatherWadsAndPostsFromBuffer:function(a,c,d,e,f){var g={currentSize:0,keepRetryable:d,overlimit:!1,sendMinimumOnePost:f,wadMap:new Map()};d=e.filter(function(d,e){return b("BanzaiUtils").filterPost(d,a,c,g)});g.overlimit&&d.length&&n._schedule(0);return d},_getEventTime:function(){return(g||(g=b("performanceAbsoluteNow")))()},_getWebSessionId:function(){return b("WebSession").getId()},_getPostBuffer:function(){return l},_getUserId:function(){return b("CurrentUser").getPossiblyNonFacebookUserID()},_getAppId:function(){return b("CurrentUser").getAppID()},_initialize:function(){b("ExecutionEnvironment").canUseDOM&&(n.adapter.useBeacon&&b("Visibility").isSupported()?(b("Visibility").addListener(b("Visibility").HIDDEN,function(){n._getPostBuffer().length>0&&(n._tryToSendViaBeacon()||n._store(!1))}),n.isEnabled("enable_client_logging_clear_on_visible")&&b("Visibility").addListener(b("Visibility").VISIBLE,function(){n._tryToSendViaBeacon()||n._restore(!1)})):n.adapter.setHooks(n),n.adapter.setUnloadHook(n),b("NavigationMetrics").addListener(b("NavigationMetrics").Events.NAVIGATION_DONE,function(a,c){if(c.pageType!=="normal")return;n._restore(!1);b("NavigationMetrics").removeCurrentListener()}))},_sendBeacon:function(b,c){return a.navigator.sendBeacon(b,c)},_prepForTransit:function(a){var c=new FormData();c.append("ts",String(Date.now()));var d={};Object.keys(d).sort().forEach(function(a){var b=d[a];if(b===void 0)return;if(b===null){c.append(a,"");return}c.append(a,String(b))});var e=b("BanzaiCompressionUtils").outOfBandsPosts(a);Object.keys(e).forEach(function(a){c.append(a,e[a])});c.append("q",JSON.stringify(a));return c},_prepWadForTransit:function(a){b("BanzaiCompressionUtils").compressWad(a,b("BanzaiAdapter").preferredCompressionMethod())},_processCallbacksAndSendViaBeacon:function(){var a=[],c=[],d=[];n._gatherWadsAndPostsFromBuffer(c,d,!0,a,!1);if(c.length>0){c[0].send_method="beacon";c.map(n._prepWadForTransit);d=n._prepForTransit(c);a=b("BanzaiAdapter").getEndPointUrl(!0);c=n._sendBeacon(a,d);c||b("FBLogger")("banzai").warn("Error sending beacon")}},_restore:function(a){a=b("BanzaiAdapter").getStorage();var c=function(a){l.push(a)};(h||(h=b("ErrorGuard"))).applyWithGuard(a.restore,a,[c]);n._schedule(b("BanzaiAdapter").config.RESTORE_WAIT||(i||(i=b("BanzaiConsts"))).VITAL_WAIT)},_schedule:function(a){var c=n._getEventTime()+a;if(!k||c<k){k=c;b("SetIdleTimeoutAcrossTransitions").clear(j);j=b("SetIdleTimeoutAcrossTransitions").start(b("BanzaiAdapter").wrapInTimeSlice(n._sendWithCallbacks,"Banzai.send"),a);return!0}return!1},_sendWithCallbacks:function(a,c){k=null;n._schedule(n.BASIC.delay);if(!b("BanzaiAdapter").readyToSend()){c&&c();return}if(n.isEnabled("flush_storage_periodically")){var d=b("BanzaiAdapter").getStorage(),e=function(){n._restore(!1)};(h||(h=b("ErrorGuard"))).applyWithGuard(d.flush,d,[e])}b("BanzaiAdapter").inform((i||(i=b("BanzaiConsts"))).SEND);d=[];var f=[];l=n._gatherWadsAndPostsFromBuffer(d,f,!0,l,!0);if(d.length<=0){b("BanzaiAdapter").inform((i||(i=b("BanzaiConsts"))).OK);a&&a();return}d[0].trigger=m;m=null;d[0].send_method="ajax";d.map(n._prepWadForTransit);b("BanzaiAdapter").send(n._prepForTransit(d),function(){f.forEach(function(a){a=a;a.__meta.status=(i||(i=b("BanzaiConsts"))).POST_SENT;a.__meta.callback&&a.__meta.callback()}),a&&a()},function(a){f.forEach(function(c){b("BanzaiUtils").retryPost(c,a,l)}),c&&c()})},_store:function(a){a=b("BanzaiAdapter").getStorage();(h||(h=b("ErrorGuard"))).applyWithGuard(a.store,a,[l])},_testState:function(){return{postBuffer:l,triggerRoute:m}},_tryToSendViaBeacon:function(){if(!(navigator&&navigator.sendBeacon&&b("BanzaiAdapter").isOkToSendViaBeacon()))return!1;var a=[],c=[];l=n._gatherWadsAndPostsFromBuffer(a,c,!1,l,!1);if(a.length<=0)return!1;a[0].send_method="beacon";a.map(n._prepWadForTransit);a=n._prepForTransit(a);var d=b("BanzaiAdapter").getEndPointUrl(!0);d=n._sendBeacon(d,a);if(!d){c.forEach(function(a){l.push(a)});return!1}return!0},_unload:function(){if(b("BanzaiAdapter").config.disabled)return;navigator&&navigator.sendBeacon&&b("BanzaiAdapter").isOkToSendViaBeacon()&&n._processCallbacksAndSendViaBeacon();b("BanzaiAdapter").cleanup();b("BanzaiAdapter").inform((i||(i=b("BanzaiConsts"))).SHUTDOWN);l.length>0&&((!n.adapter.useBeacon||!n._tryToSendViaBeacon())&&n._store(!1))},BASIC:{delay:b("BanzaiAdapter").config.MAX_WAIT||(i||(i=b("BanzaiConsts"))).BASIC_WAIT},BASIC_WAIT:(i||(i=b("BanzaiConsts"))).BASIC_WAIT,ERROR:i.ERROR,OK:i.OK,SEND:i.SEND,SHUTDOWN:i.SHUTDOWN,VITAL:{delay:b("BanzaiAdapter").config.MIN_WAIT||(i||(i=b("BanzaiConsts"))).VITAL_WAIT},VITAL_WAIT:i.VITAL_WAIT,adapter:b("BanzaiAdapter"),canUseNavigatorBeacon:function(){return Boolean(navigator&&navigator.sendBeacon&&b("BanzaiAdapter").isOkToSendViaBeacon())},flush:function(a,c){b("SetIdleTimeoutAcrossTransitions").clear(j),n._sendWithCallbacks(a,c)},isEnabled:function(a){return Boolean(b("BanzaiAdapter").config.gks&&b("BanzaiAdapter").config.gks[a]&&!b("BanzaiAdapter").config.disabled)},post:function(a,c,d){a||b("FBLogger")("banzai").mustfix("Banzai.post called without specifying a route");var e=a.split(":");if((b("BanzaiAdapter").config.known_routes||[]).indexOf(e[0])===-1){b("BanzaiAdapter").config.should_log_unknown_routes===!0&&b("FBLogger")("banzai").blameToPreviousFrame().mustfix("Attempted to post to invalid Banzai route '"+a+"'. This call site should be cleaned up.");if(b("BanzaiAdapter").config.should_drop_unknown_routes===!0)return}var f="";try{var g;f=(g=JSON.stringify(c))!=null?g:""}catch(c){b("FBLogger")("banzai").catching(c).addToCategoryKey(a).mustfix("Could not JSON.stringify banzai data for route %s",a);return}var h=d==null?void 0:d.retry;if(b("BanzaiAdapter").config.disabled)return;if(!b("ExecutionEnvironment").canUseDOM&&!b("ExecutionEnvironment").isInWorker)return;var j=n.adapter.getTopLevel();if(j){var k;try{k=j.require("Banzai")}catch(a){k=null}if(k){k.post.apply(k,arguments);return}}var o=b("BanzaiAdapter").config.blacklist;if(o&&(o.indexOf&&(typeof o.indexOf=="function"&&o.indexOf(a)!=-1)))return;var p=f.length,q=b("BanzaiUtils").wrapData(a,c,n._getEventTime(),h,p),r=q;(d==null?void 0:d.callback)&&(r.__meta.callback=d==null?void 0:d.callback);(d==null?void 0:d.compress)!=null&&(r.__meta.compress=d==null?void 0:d.compress);var s=d==null?void 0:d.delay;s==null&&(s=(i||(i=b("BanzaiConsts"))).BASIC_WAIT);if(d==null?void 0:d.signal){r.__meta.status=(i||(i=b("BanzaiConsts"))).POST_INFLIGHT;var t=[{user:n._getUserId(),webSessionId:n._getWebSessionId(),app_id:n._getAppId(),posts:[q],trigger:a}];b("BanzaiAdapter").send(n._prepForTransit(t),function(){r.__meta.status=(i||(i=b("BanzaiConsts"))).POST_SENT,r.__meta.callback&&r.__meta.callback()},function(a){b("BanzaiUtils").retryPost(q,a,l)},!0);if(!h)return}l.push(q);(n._schedule(s)||!m)&&(m=a);var u=b("BanzaiLazyQueue").flushQueue();u.forEach(function(a){return n.post.apply(n,a)})},subscribe:b("BanzaiAdapter").subscribe};n._initialize();e.exports=n}),null);