if (self.CavalryLogger) { CavalryLogger.start_js(["DVtSZT5"]); }

__d("useHeroBootloadedComponent",["CometHeroInteractionContext","react"],(function(a,b,c,d,e,f){"use strict";e.exports=a;var g,h=g||b("react");function a(a){var c=h.useContext(b("CometHeroInteractionContext").Context);h.useEffect(function(){c.consumeBootload(a.getModuleId())},[c,a])}}),null);
__d("FBIDCheck",[],(function(a,b,c,d,e,f){"use strict";f.isUser_deprecated=a;var g=/^[1-9]\d*$/;function a(a){if(!a||typeof a==="string"&&!g.test(a))return!1;a=parseInt(a,10);return!a?!1:a>0&&a<22e8||a>=1e14&&a<=100099999989999||a>=89e12&&a<=89999999999999||a>=6000001e7&&a<=60000019999999}}),null);
__d("getReferrerURI",["ErrorUtils","URI","isFacebookURI"],(function(a,b,c,d,e,f){"use strict";e.exports=c;var g,h;function c(){if(a.PageTransitions&&a.PageTransitions.isInitialized())return a.PageTransitions.getReferrerURI();else{var c=(g||(g=b("ErrorUtils"))).applyWithGuard(function(a){return new(h||(h=b("URI")))(a)},null,[document.referrer]);return c&&b("isFacebookURI")(c)?c:null}}}),null);