 
 
 (function(){'use strict';var e={"class":"className",contenteditable:"contentEditable","for":"htmlFor",readonly:"readOnly",maxlength:"maxLength",tabindex:"tabIndex",colspan:"colSpan",rowspan:"rowSpan",usemap:"useMap"};function aa(a,b){try{return a(b)}catch(c){return b}}var k=document,m=window,ba=k.documentElement,n=k.createElement.bind(k),ca=n("div"),p=n("table"),da=n("tbody"),ea=n("tr"),q=Array.isArray,r=Array.prototype,fa=r.concat,t=r.filter,ha=r.indexOf,ia=r.map,ja=r.push,ka=r.slice,u=r.some,la=r.splice,ma=/^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,na=/^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,oa=/<.+>/,pa=/^\w+$/;function v(a,b){return a&&(w(b)||x(b))?na.test(a)?b.getElementsByClassName(a.slice(1)):pa.test(a)?b.getElementsByTagName(a):b.querySelectorAll(a):[]}var B=function(){function a(a,c){if(a){if(a instanceof B)return a;var b=a;if(C(a)){if(b=(c instanceof B?c[0]:c)||k,b=ma.test(a)?b.getElementById(a.slice(1)):oa.test(a)?qa(a):v(a,b),!b)return}else if(D(a))return this.ready(a);if(b.nodeType||b===m)b=[b];this.length=b.length;a=0;for(c=this.length;a<c;a++)this[a]=b[a]}}a.prototype.init=function(b,c){return new a(b,c)};return a}(),E=B.prototype,F=E.init;F.fn=F.prototype=E;E.length=0;E.splice=la;"function"===typeof Symbol&&(E[Symbol.iterator]=r[Symbol.iterator]);E.map=function(a){return F(fa.apply([],ia.call(this,function(b,c){return a.call(b,c,b)})))};E.slice=function(a,b){return F(ka.call(this,a,b))};var ra=/-([a-z])/g;function G(a){return a.replace(ra,function(a,c){return c.toUpperCase()})}F.guid=1;function sa(a,b){var c=a&&(a.matches||a.webkitMatchesSelector||a.msMatchesSelector);return!!c&&!!b&&c.call(a,b)}function H(a){return!!a&&a===a.window}function w(a){return!!a&&9===a.nodeType}function x(a){return!!a&&1===a.nodeType}function D(a){return"function"===typeof a}function C(a){return"string"===typeof a}function ta(a){return!isNaN(parseFloat(a))&&isFinite(a)}function I(a){if("object"!==typeof a||null===a)return!1;a=Object.getPrototypeOf(a);return null===a||a===Object.prototype}F.isWindow=H;F.isFunction=D;F.isArray=q;F.isNumeric=ta;F.isPlainObject=I;E.get=function(a){if(void 0===a)return ka.call(this);a=Number(a);return this[0>a?a+this.length:a]};E.eq=function(a){return F(this.get(a))};E.first=function(){return this.eq(0)};E.last=function(){return this.eq(-1)};function J(a,b,c){if(c)for(c=a.length;c--&&!1!==b.call(a[c],c,a[c]););else if(I(a)){var d=Object.keys(a);c=0;for(var h=d.length;c<h;c++){var f=d[c];if(!1===b.call(a[f],f,a[f]))break}}else for(c=0,h=a.length;c<h&&!1!==b.call(a[c],c,a[c]);c++);return a}F.each=J;E.each=function(a){return J(this,a)};E.prop=function(a,b){if(a){if(C(a))return a=e[a]||a,2>arguments.length?this[0]&&this[0][a]:this.each(function(c,h){h[a]=b});for(var c in a)this.prop(c,a[c]);return this}};E.removeProp=function(a){return this.each(function(b,c){delete c[e[a]||a]})};function K(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];b="boolean"===typeof a[0]?a.shift():!1;var c=a.shift(),d=a.length;if(!c)return{};if(!d)return K(b,F,c);for(var h=0;h<d;h++){var f=a[h],g;for(g in f)b&&(q(f[g])||I(f[g]))?(c[g]&&c[g].constructor===f[g].constructor||(c[g]=new f[g].constructor),K(b,c[g],f[g])):c[g]=f[g]}return c}F.extend=K;E.extend=function(a){return K(E,a)};function L(a){return C(a)?function(b,c){return sa(c,a)}:D(a)?a:a instanceof B?function(b,c){return a.is(c)}:a?function(b,c){return c===a}:function(){return!1}}E.filter=function(a){var b=L(a);return F(t.call(this,function(a,d){return b.call(a,d,a)}))};function M(a,b){return b?a.filter(b):a}var ua=/\S+/g;function N(a){return C(a)?a.match(ua)||[]:[]}E.hasClass=function(a){return!!a&&u.call(this,function(b){return x(b)&&b.classList.contains(a)})};E.removeAttr=function(a){var b=N(a);return this.each(function(a,d){x(d)&&J(b,function(a,b){d.removeAttribute(b)})})};E.attr=function(a,b){if(a){if(C(a)){if(2>arguments.length){if(!this[0]||!x(this[0]))return;var c=this[0].getAttribute(a);return null===c?void 0:c}return void 0===b?this:null===b?this.removeAttr(a):this.each(function(c,h){x(h)&&h.setAttribute(a,b)})}for(c in a)this.attr(c,a[c]);return this}};E.toggleClass=function(a,b){var c=N(a),d=void 0!==b;return this.each(function(a,f){x(f)&&J(c,function(a,c){d?b?f.classList.add(c):f.classList.remove(c):f.classList.toggle(c)})})};E.addClass=function(a){return this.toggleClass(a,!0)};E.removeClass=function(a){return arguments.length?this.toggleClass(a,!1):this.attr("class","")};function O(a,b,c,d){for(var h=[],f=D(b),g=d&&L(d),y=0,z=a.length;y<z;y++)if(f){var l=b(a[y]);l.length&&ja.apply(h,l)}else for(l=a[y][b];!(null==l||d&&g(-1,l));)h.push(l),l=c?l[b]:null;return h}function P(a){return 1<a.length?t.call(a,function(a,c,d){return ha.call(d,a)===c}):a}F.unique=P;E.add=function(a,b){return F(P(this.get().concat(F(a,b).get())))};function Q(a,b,c){if(x(a)){var d=m.getComputedStyle(a,null);return c?d.getPropertyValue(b)||void 0:d[b]||a.style[b]}}function R(a,b){return parseInt(Q(a,b),10)||0}var S=/^--/,T={},va=ca.style,wa=["webkit","moz","ms"];function xa(a,b){void 0===b&&(b=S.test(a));if(b)return a;if(!T[a]){b=G(a);var c=""+b[0].toUpperCase()+b.slice(1);b=(b+" "+wa.join(c+" ")+c).split(" ");J(b,function(b,c){if(c in va)return T[a]=c,!1})}return T[a]}var ya={animationIterationCount:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0};function za(a,b,c){void 0===c&&(c=S.test(a));return c||ya[a]||!ta(b)?b:b+"px"}E.css=function(a,b){if(C(a)){var c=S.test(a);a=xa(a,c);if(2>arguments.length)return this[0]&&Q(this[0],a,c);if(!a)return this;b=za(a,b,c);return this.each(function(d,f){x(f)&&(c?f.style.setProperty(a,b):f.style[a]=b)})}for(var d in a)this.css(d,a[d]);return this};var Aa=/^\s+|\s+$/;function Ba(a,b){a=a.dataset[b]||a.dataset[G(b)];return Aa.test(a)?a:aa(JSON.parse,a)}E.data=function(a,b){if(!a){if(!this[0])return;var c={},d;for(d in this[0].dataset)c[d]=Ba(this[0],d);return c}if(C(a))return 2>arguments.length?this[0]&&Ba(this[0],a):void 0===b?this:this.each(function(c,d){c=b;c=aa(JSON.stringify,c);d.dataset[G(a)]=c});for(d in a)this.data(d,a[d]);return this};function Ca(a,b){var c=a.documentElement;return Math.max(a.body["scroll"+b],c["scroll"+b],a.body["offset"+b],c["offset"+b],c["client"+b])}function Da(a,b){return R(a,"border"+(b?"Left":"Top")+"Width")+R(a,"padding"+(b?"Left":"Top"))+R(a,"padding"+(b?"Right":"Bottom"))+R(a,"border"+(b?"Right":"Bottom")+"Width")}J([!0,!1],function(a,b){J(["Width","Height"],function(a,d){E[(b?"outer":"inner")+d]=function(c){if(this[0])return H(this[0])?b?this[0]["inner"+d]:this[0].document.documentElement["client"+d]:w(this[0])?Ca(this[0],d):this[0][(b?"offset":"client")+d]+(c&&b?R(this[0],"margin"+(a?"Top":"Left"))+R(this[0],"margin"+(a?"Bottom":"Right")):0)}})});J(["Width","Height"],function(a,b){var c=b.toLowerCase();E[c]=function(d){if(!this[0])return void 0===d?void 0:this;if(!arguments.length)return H(this[0])?this[0].document.documentElement["client"+b]:w(this[0])?Ca(this[0],b):this[0].getBoundingClientRect()[c]-Da(this[0],!a);var h=parseInt(d,10);return this.each(function(b,d){x(d)&&(b=Q(d,"boxSizing"),d.style[c]=za(c,h+("border-box"===b?Da(d,!a):0)))})}});var U={};E.toggle=function(a){return this.each(function(b,c){if(x(c))if(void 0===a?"none"===Q(c,"display"):a){if(c.style.display=c.___cd||"","none"===Q(c,"display")){b=c.style;c=c.tagName;if(U[c])c=U[c];else{var d=n(c);k.body.insertBefore(d,null);var h=Q(d,"display");k.body.removeChild(d);c=U[c]="none"!==h?h:"block"}b.display=c}}else c.___cd=Q(c,"display"),c.style.display="none"})};E.hide=function(){return this.toggle(!1)};E.show=function(){return this.toggle(!0)};function Ea(a,b){return!b||!u.call(b,function(b){return 0>a.indexOf(b)})}var V={focus:"focusin",blur:"focusout"},W={mouseenter:"mouseover",mouseleave:"mouseout"},Fa=/^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;function Ga(a,b,c,d,h){var f=a.___ce=a.___ce||{};f[b]=f[b]||[];f[b].push([c,d,h]);a.addEventListener(b,h)}function X(a){a=a.split(".");return[a[0],a.slice(1).sort()]}function Y(a,b,c,d,h){var f=a.___ce=a.___ce||{};if(b)f[b]&&(f[b]=f[b].filter(function(f){var g=f[0],z=f[1];f=f[2];if(h&&f.guid!==h.guid||!Ea(g,c)||d&&d!==z)return!0;a.removeEventListener(b,f)}));else for(b in f)Y(a,b,c,d,h)}E.off=function(a,b,c){var d=this;if(void 0===a)this.each(function(a,b){(x(b)||w(b)||H(b))&&Y(b)});else if(C(a))D(b)&&(c=b,b=""),J(N(a),function(a,h){a=X(h);h=a[0];var f=a[1],g=W[h]||V[h]||h;d.each(function(a,d){(x(d)||w(d)||H(d))&&Y(d,g,f,b,c)})});else for(var h in a)this.off(h,a[h]);return this};E.on=function(a,b,c,d,h){var f=this;if(!C(a)){for(var g in a)this.on(g,b,c,a[g],h);return this}C(b)||(void 0!==b&&null!==b&&(void 0!==c&&(d=c),c=b),b="");D(d)||(d=c,c=void 0);if(!d)return this;J(N(a),function(a,g){a=X(g);g=a[0];var l=a[1],z=W[g]||V[g]||g,y=g in W,Ka=g in V;z&&f.each(function(a,f){if(x(f)||w(f)||H(f))a=function La(a){if(a.target["___i"+a.type])return a.stopImmediatePropagation();if(!a.namespace||Ea(l,a.namespace.split(".")))if(b||!(Ka&&(a.target!==f||a.___ot===z)||y&&a.relatedTarget&& f.contains(a.relatedTarget))){var g=f;if(b){for(var A=a.target;!sa(A,b);){if(A===f)return;A=A.parentNode;if(!A)return}g=A;a.___cd=!0}a.___cd&&Object.defineProperty(a,"currentTarget",{configurable:!0,get:function(){return g}});Object.defineProperty(a,"data",{configurable:!0,get:function(){return c}});A=d.call(g,a,a.___td);h&&Y(f,z,l,b,La);!1===A&&(a.preventDefault(),a.stopPropagation())}},a.guid=d.guid=d.guid||F.guid++,Ga(f,z,l,b,a)})});return this};E.one=function(a,b,c,d){return this.on(a,b,c,d,!0)};E.ready=function(a){function b(){return setTimeout(a,0,F)}"loading"!==k.readyState?b():k.addEventListener("DOMContentLoaded",b);return this};E.trigger=function(a,b){if(C(a)){var c=X(a),d=c[0];c=c[1];var h=W[d]||V[d]||d;if(!h)return this;var f=Fa.test(h)?"MouseEvents":"HTMLEvents";a=k.createEvent(f);a.initEvent(h,!0,!0);a.namespace=c.join(".");a.___ot=d}a.___td=b;var g=a.___ot in V;return this.each(function(b,c){g&&D(c[a.___ot])&&(c["___i"+a.type]=!0,c[a.___ot](),c["___i"+a.type]=!1);c.dispatchEvent(a)})};function Ha(a){return a.multiple&&a.options?O(t.call(a.options,function(a){return a.selected&&!a.disabled&&!a.parentNode.disabled}),"value"):a.value||""}var Ia=/%20/g,Ja=/\r?\n/g,Ma=/file|reset|submit|button|image/i,Na=/radio|checkbox/i;E.serialize=function(){var a="";this.each(function(b,c){J(c.elements||[c],function(b,c){c.disabled||!c.name||"FIELDSET"===c.tagName||Ma.test(c.type)||Na.test(c.type)&&!c.checked||(b=Ha(c),void 0!==b&&(b=q(b)?b:[b],J(b,function(b,d){b=a;d="&"+encodeURIComponent(c.name)+"="+encodeURIComponent(d.replace(Ja,"\r\n")).replace(Ia,"+");a=b+d})))})});return a.slice(1)};E.val=function(a){return arguments.length?this.each(function(b,c){if((b=c.multiple&&c.options)||Na.test(c.type)){var d=q(a)?ia.call(a,String):null===a?[]:[String(a)];b?J(c.options,function(a,b){b.selected=0<=d.indexOf(b.value)},!0):c.checked=0<=d.indexOf(c.value)}else c.value=void 0===a||null===a?"":a}):this[0]&&Ha(this[0])};E.clone=function(){return this.map(function(a,b){return b.cloneNode(!0)})};E.detach=function(a){M(this,a).each(function(a,c){c.parentNode&&c.parentNode.removeChild(c)});return this};var Oa=/^\s*<(\w+)[^>]*>/,Pa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,Qa={"*":ca,tr:da,td:ea,th:ea,thead:p,tbody:p,tfoot:p};function qa(a){if(!C(a))return[];if(Pa.test(a))return[n(RegExp.$1)];var b=Oa.test(a)&&RegExp.$1;b=Qa[b]||Qa["*"];b.innerHTML=a;return F(b.childNodes).detach().get()}F.parseHTML=qa;E.empty=function(){return this.each(function(a,b){for(;b.firstChild;)b.removeChild(b.firstChild)})};E.html=function(a){return arguments.length?void 0===a?this:this.each(function(b,c){x(c)&&(c.innerHTML=a)}):this[0]&&this[0].innerHTML};E.remove=function(a){M(this,a).detach().off();return this};E.text=function(a){return void 0===a?this[0]?this[0].textContent:"":this.each(function(b,c){x(c)&&(c.textContent=a)})};E.unwrap=function(){this.parent().each(function(a,b){"BODY"!==b.tagName&&(a=F(b),a.replaceWith(a.children()))});return this};E.offset=function(){var a=this[0];if(a)return a=a.getBoundingClientRect(),{top:a.top+m.pageYOffset,left:a.left+m.pageXOffset}};E.offsetParent=function(){return this.map(function(a,b){for(a=b.offsetParent;a&&"static"===Q(a,"position");)a=a.offsetParent;return a||ba})};E.position=function(){var a=this[0];if(a){var b="fixed"===Q(a,"position"),c=b?a.getBoundingClientRect():this.offset();if(!b){var d=a.ownerDocument;for(b=a.offsetParent||d.documentElement;(b===d.body||b===d.documentElement)&&"static"===Q(b,"position");)b=b.parentNode;b!==a&&x(b)&&(d=F(b).offset(),c.top-=d.top+R(b,"borderTopWidth"),c.left-=d.left+R(b,"borderLeftWidth"))}return{top:c.top-R(a,"marginTop"),left:c.left-R(a,"marginLeft")}}};E.children=function(a){return M(F(P(O(this,function(a){return a.children}))),a)};E.contents=function(){return F(P(O(this,function(a){return"IFRAME"===a.tagName?[a.contentDocument]:"TEMPLATE"===a.tagName?a.content.childNodes:a.childNodes})))};E.find=function(a){return F(P(O(this,function(b){return v(a,b)})))};var Ra=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Sa=/^$|^module$|\/(java|ecma)script/i,Ta=["type","src","nonce","noModule"];function Ua(a,b){a=F(a);a.filter("script").add(a.find("script")).each(function(a,d){if(Sa.test(d.type)&&ba.contains(d)){var c=n("script");c.text=d.textContent.replace(Ra,"");J(Ta,function(a,b){d[b]&&(c[b]=d[b])});b.head.insertBefore(c,null);b.head.removeChild(c)}})}function Z(a,b,c,d,h,f,g,y){J(a,function(a,f){J(F(f),function(a,f){J(F(b),function(b,g){var l=c?g:f;b=c?a:b;g=c?f:g;l=b?l.cloneNode(!0):l;b=!b;h?g.insertBefore(l,d?g.firstChild:null):g.parentNode.insertBefore(l,d?g:g.nextSibling);b&&Ua(l,g.ownerDocument)},y)},g)},f);return b}E.after=function(){return Z(arguments,this,!1,!1,!1,!0,!0)};E.append=function(){return Z(arguments,this,!1,!1,!0)};E.appendTo=function(a){return Z(arguments,this,!0,!1,!0)};E.before=function(){return Z(arguments,this,!1,!0)};E.insertAfter=function(a){return Z(arguments,this,!0,!1,!1,!1,!1,!0)};E.insertBefore=function(a){return Z(arguments,this,!0,!0)};E.prepend=function(){return Z(arguments,this,!1,!0,!0,!0,!0)};E.prependTo=function(a){return Z(arguments,this,!0,!0,!0,!1,!1,!0)};E.replaceWith=function(a){return this.before(a).remove()};E.replaceAll=function(a){F(a).replaceWith(this);return this};E.wrapAll=function(a){a=F(a);for(var b=a[0];b.children.length;)b=b.firstElementChild;this.first().before(a);return this.appendTo(b)};E.wrap=function(a){return this.each(function(b,c){var d=F(a)[0];F(c).wrapAll(b?d.cloneNode(!0):d)})};E.wrapInner=function(a){return this.each(function(b,c){b=F(c);c=b.contents();c.length?c.wrapAll(a):b.append(a)})};E.has=function(a){var b=C(a)?function(b,d){return v(a,d).length}:function(b,d){return d.contains(a)};return this.filter(b)};E.is=function(a){var b=L(a);return u.call(this,function(a,d){return b.call(a,d,a)})};E.next=function(a,b,c){return M(F(P(O(this,"nextElementSibling",b,c))),a)};E.nextAll=function(a){return this.next(a,!0)};E.nextUntil=function(a,b){return this.next(b,!0,a)};E.not=function(a){var b=L(a);return this.filter(function(c,d){return(!C(a)||x(d))&&!b.call(d,c,d)})};E.parent=function(a){return M(F(P(O(this,"parentNode"))),a)};E.index=function(a){var b=a?F(a)[0]:this[0];a=a?this:F(b).parent().children();return ha.call(a,b)};E.closest=function(a){var b=this.filter(a);if(b.length)return b;var c=this.parent();return c.length?c.closest(a):b};E.parents=function(a,b){return M(F(P(O(this,"parentElement",!0,b))),a)};E.parentsUntil=function(a,b){return this.parents(b,a)};E.prev=function(a,b,c){return M(F(P(O(this,"previousElementSibling",b,c))),a)};E.prevAll=function(a){return this.prev(a,!0)};E.prevUntil=function(a,b){return this.prev(b,!0,a)};E.siblings=function(a){return M(F(P(O(this,function(a){return F(a).parent().children().not(a)}))),a)};"undefined"!==typeof exports?module.exports=F:m.cash=m.$=F;})();
 
 var elementos_css ={};
 var blocos_posicao ={};
 var elementos_posicao ={};
 var elementos_popup ={};
 var elementos_botoes_evento ={};
 var pagina_controle ={
 'classe_bloco':'gpc-b',
 'classe_elemento':'gpc-e',
 'classe_elemento_antigo':'gpc-elemento',
 'classe_elemento_interno':'c',
 'classe_elemento_interno_antigo':'conteudo',
 'elementos_timer':{}
};
 var largura_tela, altura_tela, timeout_resize;
 
 function GreatResize(){
 let tamanho_tela = $(window).width();
 let zoom_default = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, shrink-to-fit=no';
 
 function iOS(){return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)}
 if(tamanho_tela <= 1200){
 let controle = 1200;
 if(tamanho_tela > 360 && tamanho_tela <= 800){
 $('.gpc-b').each(function(){if($(this).css('background-attachment') == 'fixed'){$(this).css('background-position','');}});
 if(iOS()){$('meta[name="viewport"]').attr('content',zoom_default);}
 else{$('body').css('zoom','');}
 return;
}else if(tamanho_tela <= 360){controle = 360;}
 let proporcao = (((tamanho_tela*100)/controle)).toFixed(5), novo_tamanho;
 novo_tamanho = (tamanho_tela-(tamanho_tela*(proporcao/100)));
 if(novo_tamanho != 0){
 $('.gpc-b').each(function(i,bloco){
 if($(bloco).css('background-attachment') == 'fixed'){
 if(iOS()){$(bloco).css('background-attachment','initial');}
 if($(bloco).position().top >= $(window).height()){$(bloco).css('background-position',$(bloco).css('background-position-x')+' 100%');}
 else{$(bloco).css('background-position',$(bloco).css('background-position-x')+' 0%');}
}
});
 if(iOS()){
 $('meta[name="viewport"]').attr('content','width='+novo_tamanho+', initial-scale='+(proporcao/100)+', maximum-scale='+(proporcao/100)+', minimum-scale='+(proporcao/100)+', user-scalable=no, shrink-to-fit=no');
}else{$('body').css({'zoom':proporcao+'%'});}
}else{
 if(iOS()){
 $('.gpc-b').each(function(i,bloco){
 if($(bloco).css('background-attachment') == 'fixed'){
 $(bloco).css('background-attachment','initial');
 if($(bloco).position().top >= $(window).height()){$(bloco).css('background-position',$(bloco).css('background-position-x')+' 100%');}
 else{$(bloco).css('background-position',$(bloco).css('background-position-x')+' 0%');}
}
});
}
}
}else{
 $('.gpc-b').each(function(i,bloco){if($(bloco).css('background-attachment') == 'fixed'){$(bloco).css('background-position','');}});
 if(iOS()){$('meta[name="viewport"]').attr('content',zoom_default);}
 else{$('body').css('zoom','');}
}
}
 GreatResize();
 $(function(){GreatResize();});
 window.addEventListener('resize', function(e){
 e.preventDefault();
 e.stopPropagation();
 if(timeout_resize){clearTimeout(timeout_resize);timeout_resize = null;}
 largura_tela = $(window).width();
 altura_tela = $(window).height();
 timeout_resize = setTimeout(function(){
 if($(window).width() == largura_tela && $(window).height() == altura_tela){GreatResize();}
},50);
},{passive:true});
 
 function GreatFontes(modal){
 if(modal == undefined){modal = false;}
 if((navigator.userAgent.match(/Android/i) && (navigator.userAgent.match(/Instagram/i) || navigator.userAgent.match(/FBAN/i) || navigator.userAgent.match(/FBAV/i))) || (navigator.userAgent.match(/iPhone/i) && $(window).width() < 360)){
 
 $((modal ? '.gm ':'')+'.gpc-e').each(function(){
 
 var elemento = $(this);
 var elemento_id = elemento.attr('id');
 
 if (elementos_css.hasOwnProperty(elemento_id)){
 
 var elemento_conteudo = (elemento.hasClass('e_formulario') ? elemento.find('.gpc_botao') :elemento.children('.c'));
 var fs_aumento = fs_novo = 0;
 
 if (parseFloat(elemento_conteudo.css('font-size')) != elementos_css[elemento_id]['fs']){
 
 fs_aumento = (elementos_css[elemento_id]['fs']*100)/parseFloat(elemento_conteudo.css('font-size'));
 fs_novo = elementos_css[elemento_id]['fs']-((100-fs_aumento)*(elementos_css[elemento_id]['fs']/100));
 
 elemento_conteudo.css('font-size',fs_novo+'px');
 elemento_conteudo.children().each(function(){$(this).css('font-size',fs_novo+'px');});
 
 if (elementos_css[elemento_id]['lh']){
 
 elemento_conteudo.css('line-height',elementos_css[elemento_id]['lh']);
 elemento_conteudo.children().each(function(){$(this).css('line-height',elementos_css[elemento_id]['lh']);});
}
 
 if (elemento.hasClass('e_timer')){
 
 if (parseFloat(elemento_conteudo.css('font-size')) != elementos_css[elemento_id]['fs']){
 elemento_conteudo.find('.contador_titulos').css('line-height','1');
 elemento_conteudo.find('.contador_itens').children('span').css('line-height','1.2');
}
}else if (elemento.hasClass('e_formulario')){
 
 var fs_aumento_form = fs_novo_form = 0;
 fs_aumento_form = (14*100)/parseFloat(elemento_conteudo.find('.gpc_campos-titulo').css('font-size'));
 fs_novo_form = 14-((100-fs_aumento_form)*(14/100));
 elemento_conteudo.find('.gpc_campos-titulo').css({'font-size':fs_novo_form+'px', 'line-height':'1.4'});
 
 fs_aumento_form = (12*100)/parseFloat(elemento_conteudo.find('.gpc_campos-texto').css('font-size'));
 fs_novo_form = 12-((100-fs_aumento_form)*(12/100));
 elemento_conteudo.find('.gpc_campos-texto').css({'font-size':fs_novo_form+'px', 'line-height':'1.4'});
 
 elemento_conteudo.find('.gpc_botao').css({'font-size':fs_novo+'px', 'line-height':elementos_css[elemento_id]['lh']});
}
}
}
});
}
}
 $(function(){
 
 GreatFontes();
});
 
 
 $(function(){GreatLoader('iniciar');});
 
 var gle_fontes ={}, gle_css ={}, gle_scripts ={};
 
 function GreatLoader(acao){
 
 
 gle_fontes['elementos'] = $('.gle_fontes');
 gle_fontes['encontrados'] = gle_fontes['elementos'].length;
 gle_fontes['carregados'] = 0;
 
 if (gle_fontes['encontrados'] != 0){
 if(!window.getCrawler()){
 InserirFontes(acao);
 setTimeout(function(){CarregarFontes();},4500);
}else{CarregarFontes();}
}else{CarregarFontes();}
 
 setTimeout(function(){
 
 gle_scripts['elementos'] = $('.gle_scripts');
 gle_scripts['encontrados'] = gle_scripts['elementos'].length;
 gle_scripts['carregados'] = 0;
 
 if (gle_scripts['encontrados'] != 0){
 InserirScripts(acao);
}else{if (acao == 'iniciar'){if (window.InserirScriptsInline != undefined){InserirScriptsInline();}}}
},20);
 
 setTimeout(function(){
 
 gle_css = $('.gle_css');
 
 InserirCss(acao);
},30);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.e_animacoes',
 'antecipacao' :0,
 'executar' :function(elemento){
 (function(elemento){
 var elemento_carregando = setInterval(function(){
 if (!$(elemento).hasClass('se_imagem') && !$(elemento).hasClass('se_video') && !$(elemento).hasClass('se_caixa') && !$(elemento).find('.c').hasClass('se_fonte') && !$(elemento).hasClass('se_slider')){
 
 clearInterval(elemento_carregando);
 
 var elemento_id = $(elemento).attr('id').replace('_d', '').replace('_m', '');
 var elemento_informacoes = ($(elemento).hasClass('e_video') && $(elemento).find('.carregando').length ? $(elemento).find('.carregando') :$(elemento).find('.c'));
 var animacao_nome = $(elemento_informacoes).attr('data-animation-nome');
 var animacao_duration = ($(elemento_informacoes).attr('data-animation-duration') ? $(elemento_informacoes).attr('data-animation-duration')+'ms' :'1000ms');
 var animacao_delay = ($(elemento_informacoes).attr('data-animation-delay') ? $(elemento_informacoes).attr('data-animation-delay')+'ms' :'0ms');
 var animacao_repeat = ($(elemento_informacoes).attr('data-animation-repeat') == 'loop' ? 'infinite' :'');
 
 if (animacao_nome == 'slide' || animacao_nome == 'zoom' || animacao_nome == 'flip'){var animacao_tipo = 'cubic-bezier(.25,.46,.45,.94)';}
 else if (animacao_nome == 'fade'){var animacao_tipo = 'cubic-bezier(0.390, 0.575, 0.565, 1.000)';}
 else if (animacao_nome == 'roll'){var animacao_tipo = 'ease-out';}
 else if (animacao_nome == 'fold'){var animacao_tipo = 'cubic-bezier(.175,.885,.32,1.275)';}
 else{var animacao_tipo = '';}
 
 $(elemento).removeClass('e_animacoes');
 if(!window.getCrawler()){
 if($(elemento).hasClass('e_faq')){
 var itens = $(elemento).find('.gac-item');
 for (var i = 0;i < itens.length;i++){
 $(itens[i]).css({
 'animation':elemento_id+'_animacao '+animacao_duration+' '+animacao_tipo+' '+(parseInt(animacao_delay)+(500*i))+'ms '+animacao_repeat+' both',
 '-webkit-animation':elemento_id+'_animacao '+animacao_duration+' '+animacao_tipo+' '+(parseInt(animacao_delay)+(500*i))+'ms '+animacao_repeat+' both',
 'transform':'translate3d(0,0,0)',
 '-webkit-transform':'translate3d(0,0,0)'
});
 }
}else{
 $(elemento).find('.c').css({
 'animation':elemento_id+'_animacao '+animacao_duration+' '+animacao_tipo+' '+animacao_delay+' '+animacao_repeat+' both',
 '-webkit-animation':elemento_id+'_animacao '+animacao_duration+' '+animacao_tipo+' '+animacao_delay+' '+animacao_repeat+' both',
 'transform':'translate3d(0,0,0)',
 '-webkit-transform':'translate3d(0,0,0)'
 });
}
}
 
 $(elemento_informacoes).removeAttr('data-animation-nome data-animation-duration data-animation-delay data-animation-repeat');
 }
}, 50);
})(elemento);
}
});
},30);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.se_imagem',
 'antecipacao' :600,
 'executar' :function(elemento){
 
 if (window.innerWidth <= 800){var dispositivo = 'mobile';}else if (window.innerWidth > 800){var dispositivo = 'desktop';}
 
 var imagem_download = new Image();
 imagem_download.onload = function(e){
 
 let img_mobile = elemento.getAttribute('ll_src_mobile'), img_desktop = elemento.getAttribute('ll_src'), html = '<div class="imagem_fundo"></div>';
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.querySelector('.'+pagina_controle['classe_elemento_interno']).removeAttribute('gpc_nome_imagem');
 elemento.classList.remove('se_imagem');
 elemento.children[0].innerHTML = html;
};
 imagem_download.onerror = function(e){
 
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.querySelector('.'+pagina_controle['classe_elemento_interno']).removeAttribute('gpc_nome_imagem');
 elemento.classList.remove('se_imagem');
 elemento.children[0].innerHTML = '<div class="imagem_fundo fallback_background"></div>';
};
 imagem_download.src = ((dispositivo == 'mobile' && elemento.getAttribute('ll_src_mobile')) ? elemento.getAttribute('ll_src_mobile') :elemento.getAttribute('ll_src'));
}
});
},40);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.se_caixa',
 'antecipacao' :500,
 'executar' :function(elemento){
 
 if (window.innerWidth <= 800){var dispositivo = 'mobile';}else if (window.innerWidth > 800){var dispositivo = 'desktop';}
 
 var elemento_carregando_src = '';
 if (dispositivo == 'mobile' && elemento.getAttribute('ll_src_mobile')){elemento_carregando_src = elemento.getAttribute('ll_src_mobile');}
 else if (dispositivo == 'desktop' && elemento.getAttribute('ll_src')){elemento_carregando_src = elemento.getAttribute('ll_src');}
 if (elemento_carregando_src){
 
 var imagem_download = new Image();
 imagem_download.onload = function(e){
 
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('se_caixa');
};
 imagem_download.onerror = function(e){
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('se_caixa');
 elemento.children[0].classList.add('fallback_background');
};
 imagem_download.src = elemento_carregando_src;
}else{
 elemento.classList.remove('se_caixa');
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
}
}
});
},40);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.se_slider',
 'antecipacao' :500,
 'executar' :function(elemento){
 
 if (window.innerWidth <= 800){var dispositivo = 'mobile';}
 else if (window.innerWidth > 800){var dispositivo = 'desktop';}
 
 var imagens = $(elemento).find('.imagem');
 if(imagens.length){
 imagens.each(function(i,imagem){
 var elemento_carregando_src = '';
 if (dispositivo == 'mobile' && imagem.getAttribute('ll_src_mobile')){elemento_carregando_src = imagem.getAttribute('ll_src_mobile');}
 else if (dispositivo == 'desktop' && imagem.getAttribute('ll_src')){elemento_carregando_src = imagem.getAttribute('ll_src');}
 if (elemento_carregando_src){
 
 var imagem_download = new Image();
 imagem_download.onload = function(e){
 
 imagem.removeAttribute('ll_src');
 imagem.removeAttribute('ll_src_mobile');
 imagem.closest('.'+pagina_controle['classe_elemento']).classList.remove('se_slider');
 if(imagem.classList.contains('gsi_clone')){imagem.style.backgroundImage = 'url('+elemento_carregando_src+')';}
};
 imagem_download.onerror = function(e){
 
 imagem.removeAttribute('ll_src');
 imagem.removeAttribute('ll_src_mobile');
 try{
 imagem.closest('.'+pagina_controle['classe_elemento']).classList.remove('se_slider');
 imagem.closest('.'+pagina_controle['classe_elemento']).children[0].classList.add('fallback_background');
 let id_slider = `gsi_${elemento.closest('.'+pagina_controle['classe_elemento']).getAttribute('id')}`;
 if(gsi_intervalo.hasOwnProperty(id_slider)){
 GSlideImage.destruir(id_slider);
 GSlideImage.iniciar(elemento.closest('.'+pagina_controle['classe_elemento']).getAttribute('id'));
 }else{
 GSlideImage.iniciar(elemento.closest('.'+pagina_controle['classe_elemento']).getAttribute('id'));
 }
}catch (error){
}
};
 imagem_download.src = elemento_carregando_src;
 }else{
 imagem.closest('.'+pagina_controle['classe_elemento']).classList.remove('se_slider');
 imagem.removeAttribute('ll_src');
 imagem.removeAttribute('ll_src_mobile');
 }
});
}
}
});
},400);
 
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.ll_background',
 'antecipacao' :500,
 'executar' :function(elemento){
 
 if (window.innerWidth <= 800){var dispositivo = 'mobile';}
 else if (window.innerWidth > 800){var dispositivo = 'desktop';}
 
 var elemento_carregando_src = '';
 if (dispositivo == 'mobile' && elemento.getAttribute('ll_src_mobile')){elemento_carregando_src = elemento.getAttribute('ll_src_mobile');}
 else if (dispositivo == 'desktop' && elemento.getAttribute('ll_src')){elemento_carregando_src = elemento.getAttribute('ll_src');}
 if (elemento_carregando_src){
 
 var background_download = new Image();
 
 var background_timeout = setTimeout(function(){
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('ll_background');
}, 3000);
 background_download.onload = function(e){
 
 clearTimeout(background_timeout);
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('ll_background');
};
 background_download.onerror = function(e){
 clearTimeout(background_timeout);
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('ll_background');
 elemento.classList.add('fallback_background');
};
 background_download.src = elemento_carregando_src;
}else{
 
 elemento.removeAttribute('ll_src');
 elemento.removeAttribute('ll_src_mobile');
 elemento.classList.remove('ll_background');
 elemento.classList.add('fallback_background');
}
}
});
},50);
 
 if(!window.getCrawler()){
 setTimeout(function(){
 GObserver.instalar({
 'elemento' :'.se_video',
 'antecipacao' :0,
 'executar' :function(elemento){
 
 if(document.getElementById(elemento.getAttribute('id')).getElementsByTagName('iframe').length == 0){
 
 var animacao_nome = (elemento.querySelector('.carregando').getAttribute('data-animation-nome') ? elemento.querySelector('.carregando').getAttribute('data-animation-nome') :'none');
 var animacao_duration = (elemento.querySelector('.carregando').getAttribute('data-animation-duration') ? elemento.querySelector('.carregando').getAttribute('data-animation-duration') :1000);
 var animacao_delay = (elemento.querySelector('.carregando').getAttribute('data-animation-delay') ? elemento.querySelector('.carregando').getAttribute('data-animation-delay') :0);
 var animacao_repeat = (elemento.querySelector('.carregando').getAttribute('data-animation-repeat') == 'loop' ? 'infinite' :'show');
 
 var video_download = document.createElement("iframe");
 console.log(elemento.getAttribute('ll_src'));
 video_download.setAttribute('src', elemento.getAttribute('ll_src'));
 video_download.setAttribute('frameborder', 0);
 video_download.setAttribute('allowfullscreen', '');
 video_download.setAttribute('mozallowfullscreen', '');
 video_download.setAttribute('webkitallowfullscreen', '');
 video_download.setAttribute('allow', 'accelerometer;autoplay;picture-in-picture');
 video_download.setAttribute('class', 'c e_video');
 video_download.setAttribute('data-animation-nome', animacao_nome);
 video_download.setAttribute('data-animation-duration', animacao_duration);
 video_download.setAttribute('data-animation-delay', animacao_delay);
 video_download.setAttribute('data-animation-repeat', animacao_repeat);
 video_download.onload = function(){
 if(document.getElementById(elemento.getAttribute('id')).querySelector('.carregando')){
 document.getElementById(elemento.getAttribute('id')).querySelector('.carregando').remove();
}
 elemento.removeAttribute('ll_src');
 elemento.classList.remove('se_video');
 };
 video_download.onreadystatechange = function(){
 if(document.getElementById(elemento.getAttribute('id')).querySelector('.carregando')){
 document.getElementById(elemento.getAttribute('id')).querySelector('.carregando').remove();
}
 if (this.readyState == 'complete'){
 elemento.removeAttribute('ll_src');
 elemento.classList.remove('se_video');
}
 };
 
 document.getElementById(elemento.getAttribute('id')).appendChild(video_download);
}
}
});
},400);
}
}
 
 function InserirFontes(acao){
 if (gle_fontes['elementos'].length){
 for(var i = 0;i < gle_fontes['elementos'].length;i++){
 
 (function(index){
 
 var elemento = $(gle_fontes['elementos'][index]);
 
 gle_fontes['elementos'].splice(index, 1);
 
 var fonte = document.createElement('link');
 fonte.href = elemento.attr('gle_href');
 fonte.rel = 'stylesheet';
 fonte.media = 'all';
 fonte.onload = function(){
 
 elemento.remove();
 
 gle_fontes['carregados']++;
 
 CarregarFontes();
 
 InserirFontes(acao);
};
 fonte.onerror = function(){
 
 elemento.remove();
 
 gle_fontes['carregados']++;
 
 CarregarFontes();
 
 InserirFontes(acao);
};
 fonte.onreadystatechange = function(){if (this.readyState == 'complete'){
 
 elemento.remove();
 
 gle_fontes['carregados']++;
 
 CarregarFontes();
 
 InserirFontes(acao);
}};
 document.head.appendChild(fonte);
})(i, acao);
 
 break;
}
}
}
 function CarregarFontes(){
 var fontes_carregar = $('.se_fonte, .se_contador');
 if (fontes_carregar.length){
 for(var i = 0;i < fontes_carregar.length;i++){
 
 if ($(fontes_carregar[i]).hasClass('se_fonte')){$(fontes_carregar[i]).removeClass('se_fonte');}
 else{$(fontes_carregar[i]).removeClass('se_contador');}
}
}
}
 
 function InserirCss(acao){
 if (gle_css.length){
 for(var i = 0;i < gle_css.length;i++){
 
 (function(index){
 
 var elemento = $(gle_css[index]);
 
 gle_css.splice(index, 1);
 
 var fonte = document.createElement('link');
 
 for (var x = 0;x < elemento[0].attributes.length;x++){
 if(elemento[0].attributes[x].nodeName != 'rel'){fonte.setAttribute(elemento[0].attributes[x].nodeName.replace('gle_',''),elemento[0].attributes[x].nodeValue.replace('gle_css',''));}
}
 
 fonte.onload = function(){
 
 elemento.remove();
 
 InserirCss(acao);
};
 fonte.onerror = function(){
 
 elemento.remove();
 
 InserirCss(acao);
};
 fonte.onreadystatechange = function(){if (this.readyState == 'complete'){
 
 elemento.remove();
 
 InserirCss(acao);
}};
 document.body.appendChild(fonte);
})(i, acao);
 
 break;
}
}
}
 
 function InserirScripts(acao){
 if (gle_scripts['elementos'].length){
 for(var i = 0;i < gle_scripts['elementos'].length;i++){
 
 (function(index){
 
 var elemento = $(gle_scripts['elementos'][index]);
 if((elemento.attr('href').indexOf('gtag') || elemento.attr('href').indexOf('fbevents')) && window.getCrawler()){
 
 elemento.remove();
 
 InserirScripts(acao);
 
 return;
}
 
 gle_scripts['elementos'].splice(index, 1);
 
 var script = document.createElement('script');
 
 for (var x = 0;x < elemento[0].attributes.length;x++){
 let valor = elemento[0].attributes[x].nodeValue;
 if(elemento[0].attributes[x].nodeName != 'href'){
 valor = valor.replace(/dns-prefetch\s+?/gm,'');
 valor = valor.replace(/\s+?dns-prefetch/gm,'');
 valor = valor.replace(/preconnect\s+?/gm,'');
 valor = valor.replace(/\s+?preconnect/gm,'');
 valor = valor.replace('dns-prefetch','');
 valor = valor.replace('preconnect','');
 valor = valor.replace('gle_scripts','');
 if(elemento[0].attributes[x].nodeName != 'async'){script.setAttribute(elemento[0].attributes[x].nodeName,valor);}
}
}
 script.src = elemento.attr('href');
 script.type = 'text/javascript';
 script.defer = true;
 script.onload = function(){
 
 elemento.remove();
 
 gle_scripts['carregados']++;
 
 if (gle_scripts['encontrados'] == gle_scripts['carregados'] && acao == 'iniciar'){
 if (window.InserirScriptsInline != undefined){InserirScriptsInline();}
}
 
 InserirScripts(acao);
};
 script.onerror = function(){
 
 elemento.remove();
 
 gle_scripts['carregados']++;
 
 if (gle_scripts['encontrados'] == gle_scripts['carregados'] && acao == 'iniciar'){
 if (window.InserirScriptsInline != undefined){InserirScriptsInline();}
}
 
 InserirScripts(acao);
};
 script.onreadystatechange = function(){if (this.readyState == 'complete'){
 
 elemento.remove();
 
 gle_scripts['carregados']++;
 
 if (gle_scripts['encontrados'] == gle_scripts['carregados'] && acao == 'iniciar'){
 if (window.InserirScriptsInline != undefined){InserirScriptsInline();}
}
 
 InserirScripts(acao);
}};
 document.body.appendChild(script);
})(i, acao);
 
 break;
}
}
}
 
 
 
 (function(factory){
 if (typeof module === 'object' && module.exports){
 module.exports = factory();
}else{
 window.intlTelInput = factory();
}
}(() =>{
 var factoryOutput=(()=>{var I1=Object.defineProperty;var x2=Object.getOwnPropertyDescriptor;var R2=Object.getOwnPropertyNames;var O2=Object.prototype.hasOwnProperty;var k2=(g,e)=>{for(var n in e)I1(g,n,{get:e[n],enumerable:!0})},B2=(g,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let u of R2(e))!O2.call(g,u)&&u!==n&&I1(g,u,{get:()=>e[u],enumerable:!(r=x2(e,u))||r.enumerable});return g};var H2=g=>B2(I1({},"__esModule",{value:!0}),g);var Y2={};k2(Y2,{default:()=>Z2});var s2=[["af","93"],["ax","358",1],["al","355"],["dz","213"],["as","1",5,["684"]],["ad","376"],["ao","244"],["ai","1",6,["264"]],["ag","1",7,["268"]],["ar","54"],["am","374"],["aw","297"],["ac","247"],["au","61",0,null,"0"],["at","43"],["az","994"],["bs","1",8,["242"]],["bh","973"],["bd","880"],["bb","1",9,["246"]],["by","375"],["be","32"],["bz","501"],["bj","229"],["bm","1",10,["441"]],["bt","975"],["bo","591"],["ba","387"],["bw","267"],["br","55"],["io","246"],["vg","1",11,["284"]],["bn","673"],["bg","359"],["bf","226"],["bi","257"],["kh","855"],["cm","237"],["ca","1",1,["204","226","236","249","250","263","289","306","343","354","365","367","368","382","387","403","416","418","428","431","437","438","450","584","468","474","506","514","519","548","579","581","584","587","604","613","639","647","672","683","705","709","742","753","778","780","782","807","819","825","867","873","879","902","905"]],["cv","238"],["bq","599",1,["3","4","7"]],["ky","1",12,["345"]],["cf","236"],["td","235"],["cl","56"],["cn","86"],["cx","61",2,["89164"],"0"],["cc","61",1,["89162"],"0"],["co","57"],["km","269"],["cg","242"],["cd","243"],["ck","682"],["cr","506"],["ci","225"],["hr","385"],["cu","53"],["cw","599",0],["cy","357"],["cz","420"],["dk","45"],["dj","253"],["dm","1",13,["767"]],["do","1",2,["809","829","849"]],["ec","593"],["eg","20"],["sv","503"],["gq","240"],["er","291"],["ee","372"],["sz","268"],["et","251"],["fk","500"],["fo","298"],["fj","679"],["fi","358",0],["fr","33"],["gf","594"],["pf","689"],["ga","241"],["gm","220"],["ge","995"],["de","49"],["gh","233"],["gi","350"],["gr","30"],["gl","299"],["gd","1",14,["473"]],["gp","590",0],["gu","1",15,["671"]],["gt","502"],["gg","44",1,["1481","7781","7839","7911"],"0"],["gn","224"],["gw","245"],["gy","592"],["ht","509"],["hn","504"],["hk","852"],["hu","36"],["is","354"],["in","91"],["id","62"],["ir","98"],["iq","964"],["ie","353"],["im","44",2,["1624","74576","7524","7924","7624"],"0"],["il","972"],["it","39",0],["jm","1",4,["876","658"]],["jp","81"],["je","44",3,["1534","7509","7700","7797","7829","7937"],"0"],["jo","962"],["kz","7",1,["33","7"],"8"],["ke","254"],["ki","686"],["xk","383"],["kw","965"],["kg","996"],["la","856"],["lv","371"],["lb","961"],["ls","266"],["lr","231"],["ly","218"],["li","423"],["lt","370"],["lu","352"],["mo","853"],["mg","261"],["mw","265"],["my","60"],["mv","960"],["ml","223"],["mt","356"],["mh","692"],["mq","596"],["mr","222"],["mu","230"],["yt","262",1,["269","639"],"0"],["mx","52"],["fm","691"],["md","373"],["mc","377"],["mn","976"],["me","382"],["ms","1",16,["664"]],["ma","212",0,null,"0"],["mz","258"],["mm","95"],["na","264"],["nr","674"],["np","977"],["nl","31"],["nc","687"],["nz","64"],["ni","505"],["ne","227"],["ng","234"],["nu","683"],["nf","672"],["kp","850"],["mk","389"],["mp","1",17,["670"]],["no","47",0],["om","968"],["pk","92"],["pw","680"],["ps","970"],["pa","507"],["pg","675"],["py","595"],["pe","51"],["ph","63"],["pl","48"],["pt","351"],["pr","1",3,["787","939"]],["qa","974"],["re","262",0,null,"0"],["ro","40"],["ru","7",0,null,"8"],["rw","250"],["ws","685"],["sm","378"],["st","239"],["sa","966"],["sn","221"],["rs","381"],["sc","248"],["sl","232"],["sg","65"],["sx","1",21,["721"]],["sk","421"],["si","386"],["sb","677"],["so","252"],["za","27"],["kr","82"],["ss","211"],["es","34"],["lk","94"],["bl","590",1],["sh","290"],["kn","1",18,["869"]],["lc","1",19,["758"]],["mf","590",2],["pm","508"],["vc","1",20,["784"]],["sd","249"],["sr","597"],["sj","47",1,["79"]],["se","46"],["ch","41"],["sy","963"],["tw","886"],["tj","992"],["tz","255"],["th","66"],["tl","670"],["tg","228"],["tk","690"],["to","676"],["tt","1",22,["868"]],["tn","216"],["tr","90"],["tm","993"],["tc","1",23,["649"]],["tv","688"],["ug","256"],["ua","380"],["ae","971"],["gb","44",0,null,"0"],["us","1",0],["uy","598"],["vi","1",24,["340"]],["uz","998"],["vu","678"],["va","39",1,["06698"]],["ve","58"],["vn","84"],["wf","681"],["eh","212",1,["5288","5289"],"0"],["ye","967"],["zm","260"],["zw","263"]],u2=[];for(let g=0;g<s2.length;g++){let e=s2[g];u2[g]={name:"",iso2:e[0],dialCode:e[1],priority:e[2]||0,areaCodes:e[3]||null,nodeById:{},nationalPrefix:e[4]||null}}var K=u2;var G2={ad:"Andorra",ae:"United Arab Emirates",af:"Afghanistan",ag:"Antigua & Barbuda",ai:"Anguilla",al:"Albania",am:"Armenia",ao:"Angola",ar:"Argentina",as:"American Samoa",at:"Austria",au:"Australia",aw:"Aruba",ax:"\xC5land Islands",az:"Azerbaijan",ba:"Bosnia & Herzegovina",bb:"Barbados",bd:"Bangladesh",be:"Belgium",bf:"Burkina Faso",bg:"Bulgaria",bh:"Bahrain",bi:"Burundi",bj:"Benin",bl:"St. Barth\xE9lemy",bm:"Bermuda",bn:"Brunei",bo:"Bolivia",bq:"Caribbean Netherlands",br:"Brazil",bs:"Bahamas",bt:"Bhutan",bw:"Botswana",by:"Belarus",bz:"Belize",ca:"Canada",cc:"Cocos (Keeling) Islands",cd:"Congo - Kinshasa",cf:"Central African Republic",cg:"Congo - Brazzaville",ch:"Switzerland",ci:"C\xF4te d\u2019Ivoire",ck:"Cook Islands",cl:"Chile",cm:"Cameroon",cn:"China",co:"Colombia",cr:"Costa Rica",cu:"Cuba",cv:"Cape Verde",cw:"Cura\xE7ao",cx:"Christmas Island",cy:"Cyprus",cz:"Czechia",de:"Germany",dj:"Djibouti",dk:"Denmark",dm:"Dominica",do:"Dominican Republic",dz:"Algeria",ec:"Ecuador",ee:"Estonia",eg:"Egypt",eh:"Western Sahara",er:"Eritrea",es:"Spain",et:"Ethiopia",fi:"Finland",fj:"Fiji",fk:"Falkland Islands",fm:"Micronesia",fo:"Faroe Islands",fr:"France",ga:"Gabon",gb:"United Kingdom",gd:"Grenada",ge:"Georgia",gf:"French Guiana",gg:"Guernsey",gh:"Ghana",gi:"Gibraltar",gl:"Greenland",gm:"Gambia",gn:"Guinea",gp:"Guadeloupe",gq:"Equatorial Guinea",gr:"Greece",gt:"Guatemala",gu:"Guam",gw:"Guinea-Bissau",gy:"Guyana",hk:"Hong Kong SAR China",hn:"Honduras",hr:"Croatia",ht:"Haiti",hu:"Hungary",id:"Indonesia",ie:"Ireland",il:"Israel",im:"Isle of Man",in:"India",io:"British Indian Ocean Territory",iq:"Iraq",ir:"Iran",is:"Iceland",it:"Italy",je:"Jersey",jm:"Jamaica",jo:"Jordan",jp:"Japan",ke:"Kenya",kg:"Kyrgyzstan",kh:"Cambodia",ki:"Kiribati",km:"Comoros",kn:"St. Kitts & Nevis",kp:"North Korea",kr:"South Korea",kw:"Kuwait",ky:"Cayman Islands",kz:"Kazakhstan",la:"Laos",lb:"Lebanon",lc:"St. Lucia",li:"Liechtenstein",lk:"Sri Lanka",lr:"Liberia",ls:"Lesotho",lt:"Lithuania",lu:"Luxembourg",lv:"Latvia",ly:"Libya",ma:"Morocco",mc:"Monaco",md:"Moldova",me:"Montenegro",mf:"St. Martin",mg:"Madagascar",mh:"Marshall Islands",mk:"North Macedonia",ml:"Mali",mm:"Myanmar (Burma)",mn:"Mongolia",mo:"Macao SAR China",mp:"Northern Mariana Islands",mq:"Martinique",mr:"Mauritania",ms:"Montserrat",mt:"Malta",mu:"Mauritius",mv:"Maldives",mw:"Malawi",mx:"Mexico",my:"Malaysia",mz:"Mozambique",na:"Namibia",nc:"New Caledonia",ne:"Niger",nf:"Norfolk Island",ng:"Nigeria",ni:"Nicaragua",nl:"Netherlands",no:"Norway",np:"Nepal",nr:"Nauru",nu:"Niue",nz:"New Zealand",om:"Oman",pa:"Panama",pe:"Peru",pf:"French Polynesia",pg:"Papua New Guinea",ph:"Philippines",pk:"Pakistan",pl:"Poland",pm:"St. Pierre & Miquelon",pr:"Puerto Rico",ps:"Palestinian Territories",pt:"Portugal",pw:"Palau",py:"Paraguay",qa:"Qatar",re:"R\xE9union",ro:"Romania",rs:"Serbia",ru:"Russia",rw:"Rwanda",sa:"Saudi Arabia",sb:"Solomon Islands",sc:"Seychelles",sd:"Sudan",se:"Sweden",sg:"Singapore",sh:"St. Helena",si:"Slovenia",sj:"Svalbard & Jan Mayen",sk:"Slovakia",sl:"Sierra Leone",sm:"San Marino",sn:"Senegal",so:"Somalia",sr:"Suriname",ss:"South Sudan",st:"S\xE3o Tom\xE9 & Pr\xEDncipe",sv:"El Salvador",sx:"Sint Maarten",sy:"Syria",sz:"Eswatini",tc:"Turks & Caicos Islands",td:"Chad",tg:"Togo",th:"Thailand",tj:"Tajikistan",tk:"Tokelau",tl:"Timor-Leste",tm:"Turkmenistan",tn:"Tunisia",to:"Tonga",tr:"Turkey",tt:"Trinidad & Tobago",tv:"Tuvalu",tw:"Taiwan",tz:"Tanzania",ua:"Ukraine",ug:"Uganda",us:"United States",uy:"Uruguay",uz:"Uzbekistan",va:"Vatican City",vc:"St. Vincent & Grenadines",ve:"Venezuela",vg:"British Virgin Islands",vi:"U.S. Virgin Islands",vn:"Vietnam",vu:"Vanuatu",wf:"Wallis & Futuna",ws:"Samoa",ye:"Yemen",yt:"Mayotte",za:"South Africa",zm:"Zambia",zw:"Zimbabwe"},a2=G2;var U2={selectedCountryAriaLabel:"Selected country",noCountrySelected:"No country selected",countryListAriaLabel:"List of countries",searchPlaceholder:"Search",zeroSearchResults:"No results found",oneSearchResult:"1 result found",multipleSearchResults:"${count}results found",ac:"Ascension Island",xk:"Kosovo"},l2=U2;var F2={...a2,...l2},_1=F2;for(let g=0;g<K.length;g++)K[g].name=_1[K[g].iso2];var K2=0,p2={allowDropdown:!0,autoPlaceholder:"polite",containerClass:"",countryOrder:null,countrySearch:!0,customPlaceholder:null,dropdownContainer:null,excludeCountries:[],fixDropdownWidth:!0,formatAsYouType:!0,formatOnDisplay:!0,geoIpLookup:null,hiddenInput:null,i18n:{},initialCountry:"",loadUtils:null,nationalMode:!0,onlyCountries:[],placeholderNumberType:"MOBILE",showFlags:!0,separateDialCode:!1,strictMode:!1,useFullscreenPopup:typeof navigator<"u"&&typeof window<"u"?/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=500:!1,validationNumberTypes:["MOBILE"]},V2=["800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889"],c1=g=>g.replace(/\D/g,""),h2=(g="")=>g.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),c2=g=>{let e=c1(g);if(e.charAt(0)==="1"){let n=e.substr(1,3);return V2.includes(n)}return!1},j2=(g,e,n,r)=>{if(n===0&&!r)return 0;let u=0;for(let l=0;l<e.length;l++){if(/[+0-9]/.test(e[l])&&u++,u===g&&!r)return l+1;if(r&&u===g+1)return l}return e.length},T=(g,e,n)=>{let r=document.createElement(g);return e&&Object.entries(e).forEach(([u,l])=>r.setAttribute(u,l)),n&&n.appendChild(r),r},e1=(g,...e)=>{let{instances:n}=f;Object.values(n).forEach(r=>r[g](...e))},b1=class{constructor(e,n={}){this.id=K2++,this.telInput=e,this.highlightedItem=null,this.options=Object.assign({},p2,n),this.hadInitialPlaceholder=!!e.getAttribute("placeholder")}_init(){this.options.useFullscreenPopup&&(this.options.fixDropdownWidth=!1),this.options.onlyCountries.length===1&&(this.options.initialCountry=this.options.onlyCountries[0]),this.options.separateDialCode&&(this.options.nationalMode=!1),this.options.allowDropdown&&!this.options.showFlags&&!this.options.separateDialCode&&(this.options.nationalMode=!1),this.options.useFullscreenPopup&&!this.options.dropdownContainer&&(this.options.dropdownContainer=document.body),this.isAndroid=typeof navigator<"u"?/Android/i.test(navigator.userAgent):!1,this.isRTL=!!this.telInput.closest("[dir=rtl]");let e=this.options.allowDropdown||this.options.separateDialCode;this.showSelectedCountryOnLeft=this.isRTL?!e:e,this.options.separateDialCode&&(this.isRTL?this.originalPaddingRight=this.telInput.style.paddingRight:this.originalPaddingLeft=this.telInput.style.paddingLeft),this.options.i18n={..._1,...this.options.i18n};let n=new Promise((u,l)=>{this.resolveAutoCountryPromise=u,this.rejectAutoCountryPromise=l}),r=new Promise((u,l)=>{this.resolveUtilsScriptPromise=u,this.rejectUtilsScriptPromise=l});this.promise=Promise.all([n,r]),this.selectedCountryData={},this._processCountryData(),this._generateMarkup(),this._setInitialState(),this._initListeners(),this._initRequests()}_processCountryData(){this._processAllCountries(),this._processDialCodes(),this._translateCountryNames(),this._sortCountries()}_sortCountries(){this.options.countryOrder&&(this.options.countryOrder=this.options.countryOrder.map(e=>e.toLowerCase())),this.countries.sort((e,n)=>{let{countryOrder:r}=this.options;if(r){let u=r.indexOf(e.iso2),l=r.indexOf(n.iso2),p=u>-1,y=l>-1;if(p||y)return p&&y?u-l:p?-1:1}return e.name.localeCompare(n.name)})}_addToDialCodeMap(e,n,r){n.length>this.dialCodeMaxLen&&(this.dialCodeMaxLen=n.length),this.dialCodeToIso2Map.hasOwnProperty(n)||(this.dialCodeToIso2Map[n]=[]);for(let l=0;l<this.dialCodeToIso2Map[n].length;l++)if(this.dialCodeToIso2Map[n][l]===e)return;let u=r!==void 0?r:this.dialCodeToIso2Map[n].length;this.dialCodeToIso2Map[n][u]=e}_processAllCountries(){let{onlyCountries:e,excludeCountries:n}=this.options;if(e.length){let r=e.map(u=>u.toLowerCase());this.countries=K.filter(u=>r.includes(u.iso2))}else if(n.length){let r=n.map(u=>u.toLowerCase());this.countries=K.filter(u=>!r.includes(u.iso2))}else this.countries=K}_translateCountryNames(){for(let e=0;e<this.countries.length;e++){let n=this.countries[e].iso2.toLowerCase();this.options.i18n.hasOwnProperty(n)&&(this.countries[e].name=this.options.i18n[n])}}_processDialCodes(){this.dialCodes={},this.dialCodeMaxLen=0,this.dialCodeToIso2Map={};for(let e=0;e<this.countries.length;e++){let n=this.countries[e];this.dialCodes[n.dialCode]||(this.dialCodes[n.dialCode]=!0),this._addToDialCodeMap(n.iso2,n.dialCode,n.priority)}for(let e=0;e<this.countries.length;e++){let n=this.countries[e];if(n.areaCodes){let r=this.dialCodeToIso2Map[n.dialCode][0];for(let u=0;u<n.areaCodes.length;u++){let l=n.areaCodes[u];for(let p=1;p<l.length;p++){let y=l.substr(0,p),m=n.dialCode+y;this._addToDialCodeMap(r,m),this._addToDialCodeMap(n.iso2,m)}this._addToDialCodeMap(n.iso2,n.dialCode+l)}}}}_generateMarkup(){this.telInput.classList.add("iti__tel-input"),!this.telInput.hasAttribute("autocomplete")&&!(this.telInput.form&&this.telInput.form.hasAttribute("autocomplete"))&&this.telInput.setAttribute("autocomplete","off");let{allowDropdown:e,separateDialCode:n,showFlags:r,containerClass:u,hiddenInput:l,dropdownContainer:p,fixDropdownWidth:y,useFullscreenPopup:m,countrySearch:_,i18n:I}=this.options,L="iti";e&&(L+=" iti--allow-dropdown"),r&&(L+=" iti--show-flags"),u&&(L+=` ${u}`),m||(L+=" iti--inline-dropdown");let b=T("div",{class:L});if(this.telInput.parentNode?.insertBefore(b,this.telInput),e||r||n){this.countryContainer=T("div",{class:"iti__country-container"},b),this.showSelectedCountryOnLeft?this.countryContainer.style.left="0px":this.countryContainer.style.right="0px",e?(this.selectedCountry=T("button",{type:"button",class:"iti__selected-country","aria-expanded":"false","aria-label":this.options.i18n.selectedCountryAriaLabel,"aria-haspopup":"true","aria-controls":`iti-${this.id}__dropdown-content`,role:"combobox"},this.countryContainer),this.telInput.disabled&&this.selectedCountry.setAttribute("disabled","true")):this.selectedCountry=T("div",{class:"iti__selected-country"},this.countryContainer);let k=T("div",{class:"iti__selected-country-primary"},this.selectedCountry);if(this.selectedCountryInner=T("div",{class:"iti__flag"},k),this.selectedCountryA11yText=T("span",{class:"iti__a11y-text"},this.selectedCountryInner),e&&(this.dropdownArrow=T("div",{class:"iti__arrow","aria-hidden":"true"},k)),n&&(this.selectedDialCode=T("div",{class:"iti__selected-dial-code"},this.selectedCountry)),e){let E=y?"":"iti--flexible-dropdown-width";if(this.dropdownContent=T("div",{id:`iti-${this.id}__dropdown-content`,class:`iti__dropdown-content iti__hide ${E}`}),_&&(this.searchInput=T("input",{type:"text",class:"iti__search-input",placeholder:I.searchPlaceholder,role:"combobox","aria-expanded":"true","aria-label":I.searchPlaceholder,"aria-controls":`iti-${this.id}__country-listbox`,"aria-autocomplete":"list",autocomplete:"off"},this.dropdownContent),this.searchResultsA11yText=T("span",{class:"iti__a11y-text"},this.dropdownContent)),this.countryList=T("ul",{class:"iti__country-list",id:`iti-${this.id}__country-listbox`,role:"listbox","aria-label":I.countryListAriaLabel},this.dropdownContent),this._appendListItems(),_&&this._updateSearchResultsText(),p){let N="iti iti--container";m?N+=" iti--fullscreen-popup":N+=" iti--inline-dropdown",this.dropdown=T("div",{class:N}),this.dropdown.appendChild(this.dropdownContent)}else this.countryContainer.appendChild(this.dropdownContent)}}if(b.appendChild(this.telInput),this._updateInputPadding(),l){let k=this.telInput.getAttribute("name")||"",E=l(k);if(E.phone){let N=this.telInput.form?.querySelector(`input[name="${E.phone}"]`);N?this.hiddenInput=N:(this.hiddenInput=T("input",{type:"hidden",name:E.phone}),b.appendChild(this.hiddenInput))}if(E.country){let N=this.telInput.form?.querySelector(`input[name="${E.country}"]`);N?this.hiddenInputCountry=N:(this.hiddenInputCountry=T("input",{type:"hidden",name:E.country}),b.appendChild(this.hiddenInputCountry))}}}_appendListItems(){for(let e=0;e<this.countries.length;e++){let n=this.countries[e],r=e===0?"iti__highlight":"",u=T("li",{id:`iti-${this.id}__item-${n.iso2}`,class:`iti__country ${r}`,tabindex:"-1",role:"option","data-dial-code":n.dialCode,"data-country-code":n.iso2,"aria-selected":"false"},this.countryList);n.nodeById[this.id]=u;let l="";this.options.showFlags&&(l+=`<div class='iti__flag iti__${n.iso2}'></div>`),l+=`<span class='iti__country-name'>${n.name}</span>`,l+=`<span class='iti__dial-code'>+${n.dialCode}</span>`,u.insertAdjacentHTML("beforeend",l)}}_setInitialState(e=!1){let n=this.telInput.getAttribute("value"),r=this.telInput.value,l=n&&n.charAt(0)==="+"&&(!r||r.charAt(0)!=="+")?n:r,p=this._getDialCode(l),y=c2(l),{initialCountry:m,geoIpLookup:_}=this.options,I=m==="auto"&&_;if(p&&!y)this._updateCountryFromNumber(l);else if(!I||e){let L=m?m.toLowerCase():"";L&&this._getCountryData(L,!0)?this._setCountry(L):p&&y?this._setCountry("us"):this._setCountry()}l&&this._updateValFromNumber(l)}_initListeners(){this._initTelInputListeners(),this.options.allowDropdown&&this._initDropdownListeners(),(this.hiddenInput||this.hiddenInputCountry)&&this.telInput.form&&this._initHiddenInputListener()}_initHiddenInputListener(){this._handleHiddenInputSubmit=()=>{this.hiddenInput&&(this.hiddenInput.value=this.getNumber()),this.hiddenInputCountry&&(this.hiddenInputCountry.value=this.getSelectedCountryData().iso2||"")},this.telInput.form?.addEventListener("submit",this._handleHiddenInputSubmit)}_initDropdownListeners(){this._handleLabelClick=n=>{this.dropdownContent.classList.contains("iti__hide")?this.telInput.focus():n.preventDefault()};let e=this.telInput.closest("label");e&&e.addEventListener("click",this._handleLabelClick),this._handleClickSelectedCountry=()=>{this.dropdownContent.classList.contains("iti__hide")&&!this.telInput.disabled&&!this.telInput.readOnly&&this._openDropdown()},this.selectedCountry.addEventListener("click",this._handleClickSelectedCountry),this._handleCountryContainerKeydown=n=>{this.dropdownContent.classList.contains("iti__hide")&&["ArrowUp","ArrowDown"," ","Enter"].includes(n.key)&&(n.preventDefault(),n.stopPropagation(),this._openDropdown()),n.key==="Tab"&&this._closeDropdown()},this.countryContainer.addEventListener("keydown",this._handleCountryContainerKeydown)}_initRequests(){let{loadUtils:e,initialCountry:n,geoIpLookup:r}=this.options;e&&!f.utils?(this._handlePageLoad=()=>{window.removeEventListener("load",this._handlePageLoad),f.attachUtils(e)?.catch(()=>{})},f.documentReady()?this._handlePageLoad():window.addEventListener("load",this._handlePageLoad)):this.resolveUtilsScriptPromise(),n==="auto"&&r&&!this.selectedCountryData.iso2?this._loadAutoCountry():this.resolveAutoCountryPromise()}_loadAutoCountry(){f.autoCountry?this.handleAutoCountry():f.startedLoadingAutoCountry||(f.startedLoadingAutoCountry=!0,typeof this.options.geoIpLookup=="function"&&this.options.geoIpLookup((e="")=>{let n=e.toLowerCase();n&&this._getCountryData(n,!0)?(f.autoCountry=n,setTimeout(()=>e1("handleAutoCountry"))):(this._setInitialState(!0),e1("rejectAutoCountryPromise"))},()=>{this._setInitialState(!0),e1("rejectAutoCountryPromise")}))}_openDropdownWithPlus(){this._openDropdown(),this.searchInput.value="+",this._filterCountries("",!0)}_initTelInputListeners(){let{strictMode:e,formatAsYouType:n,separateDialCode:r,formatOnDisplay:u,allowDropdown:l,countrySearch:p}=this.options,y=!1;/\p{L}/u.test(this.telInput.value)&&(y=!0),this._handleInputEvent=m=>{if(this.isAndroid&&m?.data==="+"&&r&&l&&p){let b=this.telInput.selectionStart||0,k=this.telInput.value.substring(0,b-1),E=this.telInput.value.substring(b);this.telInput.value=k+E,this._openDropdownWithPlus();return}this._updateCountryFromNumber(this.telInput.value)&&this._triggerCountryChange();let _=m?.data&&/[^+0-9]/.test(m.data),I=m?.inputType==="insertFromPaste"&&this.telInput.value;_||I&&!e?y=!0:/[^+0-9]/.test(this.telInput.value)||(y=!1);let L=m?.detail&&m.detail.isSetNumber&&!u;if(n&&!y&&!L){let b=this.telInput.selectionStart||0,E=this.telInput.value.substring(0,b).replace(/[^+0-9]/g,"").length,N=m?.inputType==="deleteContentForward",z=this._formatNumberAsYouType(),Z=j2(E,z,b,N);this.telInput.value=z,this.telInput.setSelectionRange(Z,Z)}},this.telInput.addEventListener("input",this._handleInputEvent),(e||r)&&(this._handleKeydownEvent=m=>{if(m.key&&m.key.length===1&&!m.altKey&&!m.ctrlKey&&!m.metaKey){if(r&&l&&p&&m.key==="+"){m.preventDefault(),this._openDropdownWithPlus();return}if(e){let _=this.telInput.value,I=_.charAt(0)==="+",L=!I&&this.telInput.selectionStart===0&&m.key==="+",b=/^[0-9]$/.test(m.key),k=r?b:L||b,E=_.slice(0,this.telInput.selectionStart)+m.key+_.slice(this.telInput.selectionEnd),N=this._getFullNumber(E),z=f.utils.getCoreNumber(N,this.selectedCountryData.iso2),Z=this.maxCoreNumberLength&&z.length>this.maxCoreNumberLength,$1=!1;if(I){let p1=this.selectedCountryData.iso2;$1=this._getCountryFromNumber(N)!==p1}(!k||Z&&!$1&&!L)&&m.preventDefault()}}},this.telInput.addEventListener("keydown",this._handleKeydownEvent))}_cap(e){let n=parseInt(this.telInput.getAttribute("maxlength")||"",10);return n&&e.length>n?e.substr(0,n):e}_trigger(e,n={}){let r=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:n});this.telInput.dispatchEvent(r)}_openDropdown(){let{fixDropdownWidth:e,countrySearch:n}=this.options;if(e&&(this.dropdownContent.style.width=`${this.telInput.offsetWidth}px`),this.dropdownContent.classList.remove("iti__hide"),this.selectedCountry.setAttribute("aria-expanded","true"),this._setDropdownPosition(),n){let r=this.countryList.firstElementChild;r&&(this._highlightListItem(r,!1),this.countryList.scrollTop=0),this.searchInput.focus()}this._bindDropdownListeners(),this.dropdownArrow.classList.add("iti__arrow--up"),this._trigger("open:countrydropdown")}_setDropdownPosition(){if(this.options.dropdownContainer&&this.options.dropdownContainer.appendChild(this.dropdown),!this.options.useFullscreenPopup){let e=this.telInput.getBoundingClientRect(),n=this.telInput.offsetHeight;this.options.dropdownContainer&&(this.dropdown.style.top=`${e.top+n}px`,this.dropdown.style.left=`${e.left}px`,this._handleWindowScroll=()=>this._closeDropdown(),window.addEventListener("scroll",this._handleWindowScroll))}}_bindDropdownListeners(){this._handleMouseoverCountryList=u=>{let l=u.target?.closest(".iti__country");l&&this._highlightListItem(l,!1)},this.countryList.addEventListener("mouseover",this._handleMouseoverCountryList),this._handleClickCountryList=u=>{let l=u.target?.closest(".iti__country");l&&this._selectListItem(l)},this.countryList.addEventListener("click",this._handleClickCountryList);let e=!0;this._handleClickOffToClose=()=>{e||this._closeDropdown(),e=!1},document.documentElement.addEventListener("click",this._handleClickOffToClose);let n="",r=null;if(this._handleKeydownOnDropdown=u=>{["ArrowUp","ArrowDown","Enter","Escape"].includes(u.key)&&(u.preventDefault(),u.stopPropagation(),u.key==="ArrowUp"||u.key==="ArrowDown"?this._handleUpDownKey(u.key):u.key==="Enter"?this._handleEnterKey():u.key==="Escape"&&this._closeDropdown()),!this.options.countrySearch&&/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(u.key)&&(u.stopPropagation(),r&&clearTimeout(r),n+=u.key.toLowerCase(),this._searchForCountry(n),r=setTimeout(()=>{n=""},1e3))},document.addEventListener("keydown",this._handleKeydownOnDropdown),this.options.countrySearch){let u=()=>{let p=this.searchInput.value.trim();p?this._filterCountries(p):this._filterCountries("",!0)},l=null;this._handleSearchChange=()=>{l&&clearTimeout(l),l=setTimeout(()=>{u(),l=null},100)},this.searchInput.addEventListener("input",this._handleSearchChange),this.searchInput.addEventListener("click",p=>p.stopPropagation())}}_searchForCountry(e){for(let n=0;n<this.countries.length;n++){let r=this.countries[n];if(r.name.substr(0,e.length).toLowerCase()===e){let l=r.nodeById[this.id];this._highlightListItem(l,!1),this._scrollTo(l);break}}}_filterCountries(e,n=!1){let r=!0;this.countryList.innerHTML="";let u=h2(e);for(let l=0;l<this.countries.length;l++){let p=this.countries[l],y=h2(p.name),m=p.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map(I=>I[0]).join("").toLowerCase(),_=`+${p.dialCode}`;if(n||y.includes(u)||_.includes(u)||p.iso2.includes(u)||m.includes(u)){let I=p.nodeById[this.id];I&&this.countryList.appendChild(I),r&&(this._highlightListItem(I,!1),r=!1)}}r&&this._highlightListItem(null,!1),this.countryList.scrollTop=0,this._updateSearchResultsText()}_updateSearchResultsText(){let{i18n:e}=this.options,n=this.countryList.childElementCount,r;n===0?r=e.zeroSearchResults:n===1?r=e.oneSearchResult:r=e.multipleSearchResults.replace("${count}",n.toString()),this.searchResultsA11yText.textContent=r}_handleUpDownKey(e){let n=e==="ArrowUp"?this.highlightedItem?.previousElementSibling:this.highlightedItem?.nextElementSibling;!n&&this.countryList.childElementCount>1&&(n=e==="ArrowUp"?this.countryList.lastElementChild:this.countryList.firstElementChild),n&&(this._scrollTo(n),this._highlightListItem(n,!1))}_handleEnterKey(){this.highlightedItem&&this._selectListItem(this.highlightedItem)}_updateValFromNumber(e){let n=e;if(this.options.formatOnDisplay&&f.utils&&this.selectedCountryData){let r=this.options.nationalMode||n.charAt(0)!=="+"&&!this.options.separateDialCode,{NATIONAL:u,INTERNATIONAL:l}=f.utils.numberFormat,p=r?u:l;n=f.utils.formatNumber(n,this.selectedCountryData.iso2,p)}n=this._beforeSetNumber(n),this.telInput.value=n}_updateCountryFromNumber(e){let n=this._getCountryFromNumber(e);return n!==null?this._setCountry(n):!1}_ensureHasDialCode(e){let{dialCode:n,nationalPrefix:r}=this.selectedCountryData;if(e.charAt(0)==="+"||!n)return e;let p=r&&e.charAt(0)===r&&!this.options.separateDialCode?e.substring(1):e;return`+${n}${p}`}_getCountryFromNumber(e){let n=e.indexOf("+"),r=n?e.substring(n):e,u=this.selectedCountryData.iso2,l=this.selectedCountryData.dialCode;r=this._ensureHasDialCode(r);let p=this._getDialCode(r,!0),y=c1(r);if(p){let m=c1(p),_=this.dialCodeToIso2Map[m];if(!u&&this.defaultCountry&&_.includes(this.defaultCountry))return this.defaultCountry;let I=u&&_.includes(u)&&(y.length===m.length||!this.selectedCountryData.areaCodes);if(!(l==="1"&&c2(y))&&!I){for(let b=0;b<_.length;b++)if(_[b])return _[b]}}else{if(r.charAt(0)==="+"&&y.length)return"";if((!r||r==="+")&&!this.selectedCountryData.iso2)return this.defaultCountry}return null}_highlightListItem(e,n){let r=this.highlightedItem;if(r&&(r.classList.remove("iti__highlight"),r.setAttribute("aria-selected","false")),this.highlightedItem=e,this.highlightedItem){this.highlightedItem.classList.add("iti__highlight"),this.highlightedItem.setAttribute("aria-selected","true");let u=this.highlightedItem.getAttribute("id")||"";this.selectedCountry.setAttribute("aria-activedescendant",u),this.options.countrySearch&&this.searchInput.setAttribute("aria-activedescendant",u)}n&&this.highlightedItem.focus()}_getCountryData(e,n){for(let r=0;r<this.countries.length;r++)if(this.countries[r].iso2===e)return this.countries[r];if(n)return null;throw new Error(`No country data for '${e}'`)}_setCountry(e){let{separateDialCode:n,showFlags:r,i18n:u}=this.options,l=this.selectedCountryData.iso2?this.selectedCountryData:{};if(this.selectedCountryData=e?this._getCountryData(e,!1)||{}:{},this.selectedCountryData.iso2&&(this.defaultCountry=this.selectedCountryData.iso2),this.selectedCountryInner){let p="",y="";e&&r?(p=`iti__flag iti__${e}`,y=`${this.selectedCountryData.name}+${this.selectedCountryData.dialCode}`):(p="iti__flag iti__globe",y=u.noCountrySelected),this.selectedCountryInner.className=p,this.selectedCountryA11yText.textContent=y}if(this._setSelectedCountryTitleAttribute(e,n),n){let p=this.selectedCountryData.dialCode?`+${this.selectedCountryData.dialCode}`:"";this.selectedDialCode.innerHTML=p,this._updateInputPadding()}return this._updatePlaceholder(),this._updateMaxLength(),l.iso2!==e}_updateInputPadding(){if(this.selectedCountry){let n=(this.selectedCountry.offsetWidth||this._getHiddenSelectedCountryWidth())+6;this.showSelectedCountryOnLeft?this.telInput.style.paddingLeft=`${n}px`:this.telInput.style.paddingRight=`${n}px`}}_updateMaxLength(){let{strictMode:e,placeholderNumberType:n,validationNumberTypes:r}=this.options,{iso2:u}=this.selectedCountryData;if(e&&f.utils)if(u){let l=f.utils.numberType[n],p=f.utils.getExampleNumber(u,!1,l,!0),y=p;for(;f.utils.isPossibleNumber(p,u,r);)y=p,p+="0";let m=f.utils.getCoreNumber(y,u);this.maxCoreNumberLength=m.length,u==="by"&&(this.maxCoreNumberLength=m.length+1)}else this.maxCoreNumberLength=null}_setSelectedCountryTitleAttribute(e=null,n){if(!this.selectedCountry)return;let r;e&&!n?r=`${this.selectedCountryData.name}:+${this.selectedCountryData.dialCode}`:e?r=this.selectedCountryData.name:r="Unknown",this.selectedCountry.setAttribute("title",r)}_getHiddenSelectedCountryWidth(){if(this.telInput.parentNode){let e=this.telInput.parentNode.cloneNode(!1);e.style.visibility="hidden",document.body.appendChild(e);let n=this.countryContainer.cloneNode();e.appendChild(n);let r=this.selectedCountry.cloneNode(!0);n.appendChild(r);let u=r.offsetWidth;return document.body.removeChild(e),u}return 0}_updatePlaceholder(){let{autoPlaceholder:e,placeholderNumberType:n,nationalMode:r,customPlaceholder:u}=this.options,l=e==="aggressive"||!this.hadInitialPlaceholder&&e==="polite";if(f.utils&&l){let p=f.utils.numberType[n],y=this.selectedCountryData.iso2?f.utils.getExampleNumber(this.selectedCountryData.iso2,r,p):"";y=this._beforeSetNumber(y),typeof u=="function"&&(y=u(y,this.selectedCountryData)),this.telInput.setAttribute("placeholder",y)}}_selectListItem(e){let n=this._setCountry(e.getAttribute("data-country-code"));this._closeDropdown(),this._updateDialCode(e.getAttribute("data-dial-code")),this.telInput.focus(),n&&this._triggerCountryChange()}_closeDropdown(){this.dropdownContent.classList.add("iti__hide"),this.selectedCountry.setAttribute("aria-expanded","false"),this.selectedCountry.removeAttribute("aria-activedescendant"),this.highlightedItem&&this.highlightedItem.setAttribute("aria-selected","false"),this.options.countrySearch&&this.searchInput.removeAttribute("aria-activedescendant"),this.dropdownArrow.classList.remove("iti__arrow--up"),document.removeEventListener("keydown",this._handleKeydownOnDropdown),this.options.countrySearch&&this.searchInput.removeEventListener("input",this._handleSearchChange),document.documentElement.removeEventListener("click",this._handleClickOffToClose),this.countryList.removeEventListener("mouseover",this._handleMouseoverCountryList),this.countryList.removeEventListener("click",this._handleClickCountryList),this.options.dropdownContainer&&(this.options.useFullscreenPopup||window.removeEventListener("scroll",this._handleWindowScroll),this.dropdown.parentNode&&this.dropdown.parentNode.removeChild(this.dropdown)),this._handlePageLoad&&window.removeEventListener("load",this._handlePageLoad),this._trigger("close:countrydropdown")}_scrollTo(e){let n=this.countryList,r=document.documentElement.scrollTop,u=n.offsetHeight,l=n.getBoundingClientRect().top+r,p=l+u,y=e.offsetHeight,m=e.getBoundingClientRect().top+r,_=m+y,I=m-l+n.scrollTop;if(m<l)n.scrollTop=I;else if(_>p){let L=u-y;n.scrollTop=I-L}}_updateDialCode(e){let n=this.telInput.value,r=`+${e}`,u;if(n.charAt(0)==="+"){let l=this._getDialCode(n);l?u=n.replace(l,r):u=r,this.telInput.value=u}}_getDialCode(e,n){let r="";if(e.charAt(0)==="+"){let u="";for(let l=0;l<e.length;l++){let p=e.charAt(l);if(!isNaN(parseInt(p,10))){if(u+=p,n)this.dialCodeToIso2Map[u]&&(r=e.substr(0,l+1));else if(this.dialCodes[u]){r=e.substr(0,l+1);break}if(u.length===this.dialCodeMaxLen)break}}}return r}_getFullNumber(e){let n=e||this.telInput.value.trim(),{dialCode:r}=this.selectedCountryData,u,l=c1(n);return this.options.separateDialCode&&n.charAt(0)!=="+"&&r&&l?u=`+${r}`:u="",u+n}_beforeSetNumber(e){let n=e;if(this.options.separateDialCode){let r=this._getDialCode(n);if(r){r=`+${this.selectedCountryData.dialCode}`;let u=n[r.length]===" "||n[r.length]==="-"?r.length+1:r.length;n=n.substr(u)}}return this._cap(n)}_triggerCountryChange(){this._trigger("countrychange")}_formatNumberAsYouType(){let e=this._getFullNumber(),n=f.utils?f.utils.formatNumberAsYouType(e,this.selectedCountryData.iso2):e,{dialCode:r}=this.selectedCountryData;return this.options.separateDialCode&&this.telInput.value.charAt(0)!=="+"&&n.includes(`+${r}`)?(n.split(`+${r}`)[1]||"").trim():n}handleAutoCountry(){this.options.initialCountry==="auto"&&f.autoCountry&&(this.defaultCountry=f.autoCountry,this.selectedCountryData.iso2||this.selectedCountryInner.classList.contains("iti__globe")||this.setCountry(this.defaultCountry),this.resolveAutoCountryPromise())}handleUtils(){f.utils&&(this.telInput.value&&this._updateValFromNumber(this.telInput.value),this.selectedCountryData.iso2&&(this._updatePlaceholder(),this._updateMaxLength())),this.resolveUtilsScriptPromise()}destroy(){let{allowDropdown:e,separateDialCode:n}=this.options;if(e){this._closeDropdown(),this.selectedCountry.removeEventListener("click",this._handleClickSelectedCountry),this.countryContainer.removeEventListener("keydown",this._handleCountryContainerKeydown);let l=this.telInput.closest("label");l&&l.removeEventListener("click",this._handleLabelClick)}let{form:r}=this.telInput;this._handleHiddenInputSubmit&&r&&r.removeEventListener("submit",this._handleHiddenInputSubmit),this.telInput.removeEventListener("input",this._handleInputEvent),this._handleKeydownEvent&&this.telInput.removeEventListener("keydown",this._handleKeydownEvent),this.telInput.removeAttribute("data-intl-tel-input-id"),n&&(this.isRTL?this.telInput.style.paddingRight=this.originalPaddingRight:this.telInput.style.paddingLeft=this.originalPaddingLeft);let u=this.telInput.parentNode;u?.parentNode?.insertBefore(this.telInput,u),u?.parentNode?.removeChild(u),delete f.instances[this.id]}getExtension(){return f.utils?f.utils.getExtension(this._getFullNumber(),this.selectedCountryData.iso2):""}getNumber(e){if(f.utils){let{iso2:n}=this.selectedCountryData;return f.utils.formatNumber(this._getFullNumber(),n,e)}return""}getNumberType(){return f.utils?f.utils.getNumberType(this._getFullNumber(),this.selectedCountryData.iso2):-99}getSelectedCountryData(){return this.selectedCountryData}getValidationError(){if(f.utils){let{iso2:e}=this.selectedCountryData;return f.utils.getValidationError(this._getFullNumber(),e)}return-99}isValidNumber(){if(!this.selectedCountryData.iso2)return!1;let e=this._getFullNumber(),n=e.search(/\p{L}/u);if(n>-1){let r=e.substring(0,n),u=this._utilsIsPossibleNumber(r),l=this._utilsIsPossibleNumber(e);return u&&l}return this._utilsIsPossibleNumber(e)}_utilsIsPossibleNumber(e){return f.utils?f.utils.isPossibleNumber(e,this.selectedCountryData.iso2,this.options.validationNumberTypes):null}isValidNumberPrecise(){if(!this.selectedCountryData.iso2)return!1;let e=this._getFullNumber(),n=e.search(/\p{L}/u);if(n>-1){let r=e.substring(0,n),u=this._utilsIsValidNumber(r),l=this._utilsIsValidNumber(e);return u&&l}return this._utilsIsValidNumber(e)}_utilsIsValidNumber(e){return f.utils?f.utils.isValidNumber(e,this.selectedCountryData.iso2,this.options.validationNumberTypes):null}setCountry(e){let n=e?.toLowerCase(),r=this.selectedCountryData.iso2;(e&&n!==r||!e&&r)&&(this._setCountry(n),this._updateDialCode(this.selectedCountryData.dialCode),this._triggerCountryChange())}setNumber(e){let n=this._updateCountryFromNumber(e);this._updateValFromNumber(e),n&&this._triggerCountryChange(),this._trigger("input",{isSetNumber:!0})}setPlaceholderNumberType(e){this.options.placeholderNumberType=e,this._updatePlaceholder()}setDisabled(e){this.telInput.disabled=e,e?this.selectedCountry.setAttribute("disabled","true"):this.selectedCountry.removeAttribute("disabled")}},W2=g=>{if(!f.utils&&!f.startedLoadingUtilsScript){let e;if(typeof g=="function")try{e=Promise.resolve(g())}catch(n){return Promise.reject(n)}else return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof g}`));return f.startedLoadingUtilsScript=!0,e.then(n=>{let r=n?.default;if(!r||typeof r!="object")throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");return f.utils=r,e1("handleUtils"),!0}).catch(n=>{throw e1("rejectUtilsScriptPromise",n),n})}return null},f=Object.assign((g,e)=>{let n=new b1(g,e);return n._init(),g.setAttribute("data-intl-tel-input-id",n.id.toString()),f.instances[n.id]=n,n},{defaults:p2,documentReady:()=>document.readyState==="complete",getCountryData:()=>K,getInstance:g=>{let e=g.getAttribute("data-intl-tel-input-id");return e?f.instances[e]:null},instances:{},attachUtils:W2,startedLoadingUtilsScript:!1,startedLoadingAutoCountry:!1,version:"25.3.1"}),S1=f;(function(){var g=this||self;function e(d,t){d=d.split(".");var $=g;d[0]in $||typeof $.execScript>"u"||$.execScript("var "+d[0]);for(var i;d.length&&(i=d.shift());)d.length||t===void 0?$[i]&&$[i]!==Object.prototype[i]?$=$[i]:$=$[i]={}:$[i]=t}function n(d,t){function $(){}$.prototype=t.prototype,d.ma=t.prototype,d.prototype=new $,d.prototype.constructor=d,d.sa=function(i,o,s){for(var a=Array(arguments.length-2),h=2;h<arguments.length;h++)a[h-2]=arguments[h];return t.prototype[o].apply(i,a)}}function r(d){let t=[],$=0;for(let i in d)t[$++]=d[i];return t}var u=class{constructor(d){if(l!==l)throw Error("SafeUrl is not meant to be built directly");this.g=d}toString(){return this.g.toString()}},l={};new u("about:invalid#zClosurez"),new u("about:blank");let p={};class y{constructor(){if(p!==p)throw Error("SafeStyle is not meant to be built directly")}toString(){return""}}new y;let m={};class _{constructor(){if(m!==m)throw Error("SafeStyleSheet is not meant to be built directly")}toString(){return""}}new _;let I={};class L{constructor(){var t=g.trustedTypes&&g.trustedTypes.emptyHTML||"";if(I!==I)throw Error("SafeHtml is not meant to be built directly");this.g=t}toString(){return this.g.toString()}}new L;function b(d,t){switch(this.g=d,this.l=!!t.aa,this.h=t.i,this.s=t.type,this.o=!1,this.h){case N:case z:case Z:case $1:case p1:case E:case k:this.o=!0}this.j=t.defaultValue}var k=1,E=2,N=3,z=4,Z=6,$1=16,p1=18;function L1(d,t){for(this.h=d,this.g={},d=0;d<t.length;d++){var $=t[d];this.g[$.g]=$}}function g2(d){return d=r(d.g),d.sort(function(t,$){return t.g-$.g}),d}function P(){this.h={},this.j=this.m().g,this.g=this.l=null}P.prototype.has=function(d){return x(this,d.g)},P.prototype.get=function(d,t){return c(this,d.g,t)},P.prototype.set=function(d,t){A(this,d.g,t)},P.prototype.add=function(d,t){T1(this,d.g,t)};function w1(d,t){for(var $=g2(d.m()),i=0;i<$.length;i++){var o=$[i],s=o.g;if(x(t,s)){d.g&&delete d.g[o.g];var a=o.h==11||o.h==10;if(o.l){o=D(t,s);for(var h=0;h<o.length;h++)T1(d,s,a?o[h].clone():o[h])}else o=n1(t,s),a?(a=n1(d,s))?w1(a,o):A(d,s,o.clone()):A(d,s,o)}}}P.prototype.clone=function(){var d=new this.constructor;return d!=this&&(d.h={},d.g&&(d.g={}),w1(d,this)),d};function x(d,t){return d.h[t]!=null}function n1(d,t){var $=d.h[t];if($==null)return null;if(d.l){if(!(t in d.g)){var i=d.l,o=d.j[t];if($!=null)if(o.l){for(var s=[],a=0;a<$.length;a++)s[a]=i.h(o,$[a]);$=s}else $=i.h(o,$);return d.g[t]=$}return d.g[t]}return $}function c(d,t,$){var i=n1(d,t);return d.j[t].l?i[$||0]:i}function v(d,t){if(x(d,t))d=c(d,t);else d:{if(d=d.j[t],d.j===void 0)if(t=d.s,t===Boolean)d.j=!1;else if(t===Number)d.j=0;else if(t===String)d.j=d.o?"0":"";else{d=new t;break d}d=d.j}return d}function D(d,t){return n1(d,t)||[]}function G(d,t){return d.j[t].l?x(d,t)?d.h[t].length:0:x(d,t)?1:0}function A(d,t,$){d.h[t]=$,d.g&&(d.g[t]=$)}function T1(d,t,$){d.h[t]||(d.h[t]=[]),d.h[t].push($),d.g&&delete d.g[t]}function i1(d,t){var $=[],i;for(i in t)i!=0&&$.push(new b(i,t[i]));return new L1(d,$)}function r1(){}r1.prototype.g=function(d){throw new d.h,Error("Unimplemented")},r1.prototype.h=function(d,t){if(d.h==11||d.h==10)return t instanceof P?t:this.g(d.s.prototype.m(),t);if(d.h==14)return typeof t=="string"&&E1.test(t)&&(d=Number(t),0<d)?d:t;if(!d.o)return t;if(d=d.s,d===String){if(typeof t=="number")return String(t)}else if(d===Number&&typeof t=="string"&&(t==="Infinity"||t==="-Infinity"||t==="NaN"||E1.test(t)))return Number(t);return t};var E1=/^-?[0-9]+$/;function f1(){}n(f1,r1),f1.prototype.g=function(d,t){return d=new d.h,d.l=this,d.h=t,d.g={},d};function J(){}n(J,f1),J.prototype.h=function(d,t){return d.h==8?!!t:r1.prototype.h.apply(this,arguments)},J.prototype.g=function(d,t){return J.ma.g.call(this,d,t)};function w(d,t){d!=null&&this.g.apply(this,arguments)}w.prototype.h="",w.prototype.set=function(d){this.h=""+d},w.prototype.g=function(d,t,$){if(this.h+=String(d),t!=null)for(let i=1;i<arguments.length;i++)this.h+=arguments[i];return this};function R(d){d.h=""}w.prototype.toString=function(){return this.h};function V(){P.call(this)}n(V,P);var N1=null;function S(){P.call(this)}n(S,P);var A1=null;function j(){P.call(this)}n(j,P);var M1=null;V.prototype.m=function(){var d=N1;return d||(N1=d=i1(V,{0:{name:"NumberFormat",ia:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,i:9,type:String},2:{name:"format",required:!0,i:9,type:String},3:{name:"leading_digits_pattern",aa:!0,i:9,type:String},4:{name:"national_prefix_formatting_rule",i:9,type:String},6:{name:"national_prefix_optional_when_formatting",i:8,defaultValue:!1,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",i:9,type:String}})),d},V.m=V.prototype.m,S.prototype.m=function(){var d=A1;return d||(A1=d=i1(S,{0:{name:"PhoneNumberDesc",ia:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",i:9,type:String},9:{name:"possible_length",aa:!0,i:5,type:Number},10:{name:"possible_length_local_only",aa:!0,i:5,type:Number},6:{name:"example_number",i:9,type:String}})),d},S.m=S.prototype.m,j.prototype.m=function(){var d=M1;return d||(M1=d=i1(j,{0:{name:"PhoneMetadata",ia:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",i:11,type:S},2:{name:"fixed_line",i:11,type:S},3:{name:"mobile",i:11,type:S},4:{name:"toll_free",i:11,type:S},5:{name:"premium_rate",i:11,type:S},6:{name:"shared_cost",i:11,type:S},7:{name:"personal_number",i:11,type:S},8:{name:"voip",i:11,type:S},21:{name:"pager",i:11,type:S},25:{name:"uan",i:11,type:S},27:{name:"emergency",i:11,type:S},28:{name:"voicemail",i:11,type:S},29:{name:"short_code",i:11,type:S},30:{name:"standard_rate",i:11,type:S},31:{name:"carrier_specific",i:11,type:S},33:{name:"sms_services",i:11,type:S},24:{name:"no_international_dialling",i:11,type:S},9:{name:"id",required:!0,i:9,type:String},10:{name:"country_code",i:5,type:Number},11:{name:"international_prefix",i:9,type:String},17:{name:"preferred_international_prefix",i:9,type:String},12:{name:"national_prefix",i:9,type:String},13:{name:"preferred_extn_prefix",i:9,type:String},15:{name:"national_prefix_for_parsing",i:9,type:String},16:{name:"national_prefix_transform_rule",i:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",i:8,defaultValue:!1,type:Boolean},19:{name:"number_format",aa:!0,i:11,type:V},20:{name:"intl_number_format",aa:!0,i:11,type:V},22:{name:"main_country_for_code",i:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",i:9,type:String}})),d},j.m=j.prototype.m;function U(){P.call(this)}n(U,P);var D1=null,m2={ra:0,qa:1,pa:5,oa:10,na:20};U.prototype.m=function(){var d=D1;return d||(D1=d=i1(U,{0:{name:"PhoneNumber",ia:"i18n.phonenumbers.PhoneNumber"},1:{name:"country_code",required:!0,i:5,type:Number},2:{name:"national_number",required:!0,i:4,type:Number},3:{name:"extension",i:9,type:String},4:{name:"italian_leading_zero",i:8,type:Boolean},8:{name:"number_of_leading_zeros",i:5,defaultValue:1,type:Number},5:{name:"raw_input",i:9,type:String},6:{name:"country_code_source",i:14,defaultValue:0,type:m2},7:{name:"preferred_domestic_carrier_code",i:9,type:String}})),d},U.ctor=U,U.ctor.m=U.prototype.m;var q={1:"US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],383:["XK"],385:["HR"],386:["SI"],387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],691:["FM"],692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]},P1={AC:[,[,,"(?:[01589]\\d|[46])\\d{4}",,,,,,,[5,6]],[,,"6[2-467]\\d{3}",,,,"62889",,,[5]],[,,"4\\d{4}",,,,"40123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AC",247,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:0[1-9]|[1589]\\d)\\d{4}",,,,"542011",,,[6]],,,[,,,,,,,,,[-1]]],AD:[,[,,"(?:1|6\\d)\\d{7}|[135-9]\\d{5}",,,,,,,[6,8,9]],[,,"[78]\\d{5}",,,,"712345",,,[6]],[,,"690\\d{6}|[356]\\d{5}",,,,"312345",,,[6,9]],[,,"180[02]\\d{4}",,,,"18001234",,,[8]],[,,"[19]\\d{5}",,,,"912345",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AD",376,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[135-9]"]],[,"(\\d{4})(\\d{4})","$1 $2",["1"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],,[,,,,,,,,,[-1]],,,[,,"1800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AE:[,[,,"(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"[2-4679][2-8]\\d{6}",,,,"22345678",,,[8],[7]],[,,"5[024-68]\\d{7}",,,,"501234567",,,[9]],[,,"400\\d{6}|800\\d{2,9}",,,,"800123456"],[,,"900[02]\\d{5}",,,,"900234567",,,[9]],[,,"700[05]\\d{5}",,,,"700012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AE",971,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],[,"(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"600[25]\\d{5}",,,,"600212345",,,[9]],,,[,,,,,,,,,[-1]]],AF:[,[,,"[2-7]\\d{8}",,,,,,,[9],[7]],[,,"(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",,,,"234567890",,,,[7]],[,,"7\\d{8}",,,,"701234567",,,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AF",93,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[1-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AG:[,[,,"(?:268|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",,,,"2684601234",,,,[7]],[,,"268(?:464|7(?:1[3-9]|[28]\\d|3[0246]|64|7[0-689]))\\d{4}",,,,"2684641234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"26848[01]\\d{4}",,,,"2684801234",,,,[7]],"AG",1,"011","1",,,"([457]\\d{6})$|1","268$1",,,,,[,,"26840[69]\\d{4}",,,,"2684061234",,,,[7]],,"268",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AI:[,[,,"(?:264|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"264(?:292|4(?:6[12]|9[78]))\\d{4}",,,,"2644612345",,,,[7]],[,,"264(?:235|4(?:69|76)|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",,,,"2642351234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AI",1,"011","1",,,"([2457]\\d{6})$|1","264$1",,,,,[,,"264724\\d{4}",,,,"2647241234",,,,[7]],,"264",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AL:[,[,,"(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",,,,,,,[6,7,8,9],[5]],[,,"4505[0-2]\\d{3}|(?:[2358][16-9]\\d[2-9]|4410)\\d{4}|(?:[2358][2-5][2-9]|4(?:[2-57-9][2-9]|6\\d))\\d{5}",,,,"22345678",,,[8],[5,6,7]],[,,"6(?:[78][2-9]|9\\d)\\d{6}",,,,"672123456",,,[9]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"900[1-9]\\d\\d",,,,"900123",,,[6]],[,,"808[1-9]\\d\\d",,,,"808123",,,[6]],[,,"700[2-9]\\d{4}",,,,"70021234",,,[8]],[,,,,,,,,,[-1]],"AL",355,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AM:[,[,,"(?:[1-489]\\d|55|60|77)\\d{6}",,,,,,,[8],[5,6]],[,,"(?:(?:1[0-25]|47)\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2)\\d{5}",,,,"10123456",,,,[5,6]],[,,"(?:33|4[1349]|55|77|88|9[13-9])\\d{6}",,,,"77123456"],[,,"800\\d{5}",,,,"80012345"],[,,"90[016]\\d{5}",,,,"90012345"],[,,"80[1-4]\\d{5}",,,,"80112345"],[,,,,,,,,,[-1]],[,,"60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|9[0-2])\\d{4}",,,,"60271234"],"AM",374,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0 $1"],[,"(\\d{3})(\\d{5})","$1 $2",["2|3[12]"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[3-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AO:[,[,,"[29]\\d{8}",,,,,,,[9]],[,,"2\\d(?:[0134][25-9]|[25-9]\\d)\\d{5}",,,,"222123456"],[,,"9[1-79]\\d{7}",,,,"923123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AO",244,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AR:[,[,,"(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}",,,,,,,[10,11],[6,7,8]],[,,"3(?:7(?:1[15]|81)|8(?:21|4[16]|69|9[12]))[46]\\d{5}|(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|47[35]|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|(?:2(?:657|9(?:54|66))|3(?:48[27]|7(?:55|77)|8(?:65|78)))[2-8]\\d{5}|(?:2(?:284|3(?:02|23)|477|622|920)|3(?:4(?:46|89|92)|541))[2-7]\\d{5}|(?:(?:11[1-8]|670)\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-8]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-8]|[25][4-6]|3[3-6]|84)|5(?:1[2-9]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|1[2-7]|3[4-6]|5[3-6]|7[2-6]|8[3-68])))\\d{6}|(?:2(?:2(?:62|81)|320|9(?:42|83))|3(?:329|4(?:62|7[16])|5(?:43|64)|7(?:18|5[17])))[2-6]\\d{5}|2(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|(?:2(?:257|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|64)|5(?:25|37|4[47]|71)|7(?:35|72)|825))[3-6]\\d{5}|(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[035-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[14]|4[13]|5[468]|7[3-5]|8[26])|8(?:2[67]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}",,,,"1123456789",,,[10],[6,7,8]],[,,"93(?:7(?:1[15]|81)|8(?:21|4[16]|69|9[12]))[46]\\d{5}|9(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|47[35]|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|9(?:2(?:657|9(?:54|66))|3(?:48[27]|7(?:55|77)|8(?:65|78)))[2-8]\\d{5}|9(?:2(?:284|3(?:02|23)|477|622|920)|3(?:4(?:46|89|92)|541))[2-7]\\d{5}|(?:675\\d|9(?:11[1-8]\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-8]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-8]|[25][4-6]|3[3-6]|84)|5(?:1[2-9]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|1[2-7]|3[4-6]|5[3-6]|7[2-6]|8[3-68]))))\\d{6}|9(?:2(?:2(?:62|81)|320|9(?:42|83))|3(?:329|4(?:62|7[16])|5(?:43|64)|7(?:18|5[17])))[2-6]\\d{5}|92(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|9(?:2(?:257|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|64)|5(?:25|37|4[47]|71)|7(?:35|72)|825))[3-6]\\d{5}|9(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[035-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[14]|4[13]|5[468]|7[3-5]|8[26])|8(?:2[67]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}",,,,"91123456789",,,,[6,7,8]],[,,"800\\d{7,8}",,,,"8001234567"],[,,"60[04579]\\d{7}",,,,"6001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AR",54,"00","0",,,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?","9$1",,,[[,"(\\d{3})","$1",["0|1(?:0[0-35-7]|1[02-5]|2[015]|3[47]|4[478])|911"]],[,"(\\d{2})(\\d{4})","$1-$2",["[1-9]"]],[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["[1-8]"]],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1"],[,"(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 15-$3-$4",["91"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{5})","$1-$2-$3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9"],"0$1"]],[[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d)(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"]],[,"(\\d)(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3-$4",["91"]],[,"(\\d{3})(\\d{3})(\\d{5})","$1-$2-$3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3-$4",["9"]]],[,,,,,,,,,[-1]],,,[,,"810\\d{7}",,,,,,,[10]],[,,"810\\d{7}",,,,"8101234567",,,[10]],,,[,,,,,,,,,[-1]]],AS:[,[,,"(?:[58]\\d\\d|684|900)\\d{7}",,,,,,,[10],[7]],[,,"6846(?:22|33|44|55|77|88|9[19])\\d{4}",,,,"6846221234",,,,[7]],[,,"684(?:2(?:48|5[2468]|7[26])|7(?:3[13]|70|82))\\d{4}",,,,"6847331234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AS",1,"011","1",,,"([267]\\d{6})$|1","684$1",,,,,[,,,,,,,,,[-1]],,"684",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AT:[,[,,"1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",,,,,,,[4,5,6,7,8,9,10,11,12,13],[3]],[,,"1(?:11\\d|[2-9]\\d{3,11})|(?:316|463|(?:51|66|73)2)\\d{3,10}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-578]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|7[1368]|8[2457])|5(?:2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[135-8]|5[468])|7(?:2[1-8]|35|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{4,10}",,,,"1234567890",,,,[3]],[,,"6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}",,,,"664123456",,,[7,8,9,10,11,12,13]],[,,"800\\d{6,10}",,,,"800123456",,,[9,10,11,12,13]],[,,"(?:8[69][2-68]|9(?:0[01]|3[019]))\\d{6,10}",,,,"900123456",,,[9,10,11,12,13]],[,,"8(?:10|2[018])\\d{6,10}|828\\d{5}",,,,"810123456",,,[8,9,10,11,12,13]],[,,,,,,,,,[-1]],[,,"5(?:0[1-9]|17|[79]\\d)\\d{2,10}|7[28]0\\d{6,10}",,,,"780123456",,,[5,6,7,8,9,10,11,12,13]],"AT",43,"00","0",,,"0",,,,[[,"(\\d{4})","$1",["14"]],[,"(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],[,"(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],[,"(\\d{6})","$1",["[18]"]],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],[[,"(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],[,"(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AU:[,[,,"1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}",,,,,,,[5,6,7,8,9,10,12]],[,,"(?:(?:(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|7(?:[013-57-9]\\d|2[0-8]))\\d|3(?:(?:[0-3589]\\d|6[1-9]|7[0-35-9])\\d|4(?:[0-578]\\d|90)))\\d\\d|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4])|3\\d\\d)|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}",,,,"212345678",,,[9],[8]],[,,"4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}",,,,"1300123456",,,[6,8,10,12]],[,,,,,,,,,[-1]],[,,"14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",,,,"147101234",,,[9]],"AU",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"(183[12])|0",,"0011",,[[,"(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["13"]],[,"(\\d{3})(\\d{3})","$1 $2",["19"]],[,"(\\d{3})(\\d{4})","$1 $2",["180","1802"]],[,"(\\d{4})(\\d{3,4})","$1 $2",["19"]],[,"(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|4"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)","$CC ($1)"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["130"]]],[[,"(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|4"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)","$CC ($1)"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]]],[,,"163\\d{2,6}",,,,"1631234",,,[5,6,7,8,9]],1,,[,,"1(?:3(?:00\\d{5}|45[0-4])|802)\\d{3}|1[38]00\\d{6}|13\\d{4}",,,,,,,[6,7,8,10,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AW:[,[,,"(?:[25-79]\\d\\d|800)\\d{4}",,,,,,,[7]],[,,"5(?:2\\d|8[1-9])\\d{4}",,,,"5212345"],[,,"(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}",,,,"5601234"],[,,"800\\d{4}",,,,"8001234"],[,,"900\\d{4}",,,,"9001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:28\\d|501)\\d{4}",,,,"5011234"],"AW",297,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AX:[,[,,"2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"18[1-8]\\d{3,6}",,,,"181234567",,,[6,7,8,9]],[,,"4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AX",358,"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","0",,,"0",,"00",,,,[,,,,,,,,,[-1]],,"18",[,,,,,,,,,[-1]],[,,"20\\d{4,8}|60[12]\\d{5,6}|7(?:099\\d{4,5}|5[03-9]\\d{3,7})|20[2-59]\\d\\d|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:10|29|3[09]|70[1-5]\\d)\\d{4,8}",,,,"10112345"],,,[,,,,,,,,,[-1]]],AZ:[,[,,"365\\d{6}|(?:[124579]\\d|60|88)\\d{7}",,,,,,,[9],[7]],[,,"(?:2[12]428|3655[02])\\d{4}|(?:2(?:22[0-79]|63[0-28])|3654)\\d{5}|(?:(?:1[28]|46)\\d|2(?:[014-6]2|[23]3))\\d{6}",,,,"123123456",,,,[7]],[,,"36554\\d{4}|(?:[16]0|4[04]|5[015]|7[07]|99)\\d{7}",,,,"401234567"],[,,"88\\d{7}",,,,"881234567"],[,,"900200\\d{3}",,,,"900200123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AZ",994,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[1-9]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[28]|2|365|46","1[28]|2|365[45]|46","1[28]|2|365(?:4|5[02])|46"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-9]"],"0$1"]],[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[28]|2|365|46","1[28]|2|365[45]|46","1[28]|2|365(?:4|5[02])|46"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-9]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BA:[,[,,"6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",,,,,,,[8,9],[6]],[,,"(?:3(?:[05-79][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}",,,,"30212345",,,[8],[6]],[,,"6040\\d{5}|6(?:03|[1-356]|44|7\\d)\\d{6}",,,,"61123456"],[,,"8[08]\\d{6}",,,,"80123456",,,[8]],[,,"9[0246]\\d{6}",,,,"90123456",,,[8]],[,,"8[12]\\d{6}",,,,"82123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BA",387,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-3]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]|6[56]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-3]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]|6[56]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"703[235]0\\d{3}|70(?:2[0-5]|3[0146]|[56]0)\\d{4}",,,,"70341234",,,[8]],,,[,,,,,,,,,[-1]]],BB:[,[,,"(?:246|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"246521[0369]\\d{3}|246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7[35]7|9(?:1[89]|63))\\d{4}",,,,"2464123456",,,,[7]],[,,"246(?:(?:2(?:[3568]\\d|4[0-57-9])|3(?:5[2-9]|6[0-6])|4(?:46|5\\d)|69[5-7]|8(?:[2-5]\\d|83))\\d|52(?:1[147]|20))\\d{3}",,,,"2462501234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"(?:246976|900[2-9]\\d\\d)\\d{4}",,,,"9002123456",,,,[7]],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"24631\\d{5}",,,,"2463101234",,,,[7]],"BB",1,"011","1",,,"([2-9]\\d{6})$|1","246$1",,,,,[,,,,,,,,,[-1]],,"246",[,,,,,,,,,[-1]],[,,"246(?:292|367|4(?:1[7-9]|3[01]|4[47-9]|67)|7(?:1[2-9]|2\\d|3[016]|53))\\d{4}",,,,"2464301234",,,,[7]],,,[,,,,,,,,,[-1]]],BD:[,[,,"[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}",,,,,,,[6,7,8,9,10]],[,,"(?:4(?:31\\d\\d|423)|5222)\\d{3}(?:\\d{2})?|8332[6-9]\\d\\d|(?:3(?:03[56]|224)|4(?:22[25]|653))\\d{3,4}|(?:3(?:42[47]|529|823)|4(?:027|525|65(?:28|8))|562|6257|7(?:1(?:5[3-5]|6[12]|7[156]|89)|22[589]56|32|42675|52(?:[25689](?:56|8)|[347]8)|71(?:6[1267]|75|89)|92374)|82(?:2[59]|32)56|9(?:03[23]56|23(?:256|373)|31|5(?:1|2[4589]56)))\\d{3}|(?:3(?:02[348]|22[35]|324|422)|4(?:22[67]|32[236-9]|6(?:2[46]|5[57])|953)|5526|6(?:024|6655)|81)\\d{4,5}|(?:2(?:7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|1[1-6]|2[0157-9]|3[1-69]|41|6[1-35]|7[1-5]|8[1-8]|9[0-6])|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0136-9]|7[0-7]|8[014-9]))|3(?:0(?:2[025-79]|3[2-4])|181|22[12]|32[2356]|824)|4(?:02[09]|22[348]|32[045]|523|6(?:27|54))|666(?:22|53)|7(?:22[57-9]|42[56]|82[35])8|8(?:0[124-9]|2(?:181|2[02-4679]8)|4[12]|[5-7]2)|9(?:[04]2|2(?:2|328)|81))\\d{4}|(?:2(?:[23]\\d|[45])\\d\\d|3(?:1(?:2[5-7]|[5-7])|425|822)|4(?:033|1\\d|[257]1|332|4(?:2[246]|5[25])|6(?:2[35]|56|62)|8(?:23|54)|92[2-5])|5(?:02[03489]|22[457]|32[35-79]|42[46]|6(?:[18]|53)|724|826)|6(?:023|2(?:2[2-5]|5[3-5]|8)|32[3478]|42[34]|52[47]|6(?:[18]|6(?:2[34]|5[24]))|[78]2[2-5]|92[2-6])|7(?:02|21\\d|[3-589]1|6[12]|72[24])|8(?:217|3[12]|[5-7]1)|9[24]1)\\d{5}|(?:(?:3[2-8]|5[2-57-9]|6[03-589])1|4[4689][18])\\d{5}|[59]1\\d{5}",,,,"27111234"],[,,"(?:1[13-9]\\d|644)\\d{7}|(?:3[78]|44|66)[02-9]\\d{7}",,,,"1812345678",,,[10]],[,,"80[03]\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"96(?:0[469]|1[0-47]|3[389]|43|6[69]|7[78])\\d{6}",,,,"9604123456",,,[10]],"BD",880,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4,6})","$1-$2",["31[5-8]|[459]1"],"0$1"],[,"(\\d{3})(\\d{3,7})","$1-$2",["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],"0$1"],[,"(\\d{4})(\\d{3,6})","$1-$2",["[13-9]|2[23]"],"0$1"],[,"(\\d)(\\d{7,8})","$1-$2",["2"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BE:[,[,,"4\\d{8}|[1-9]\\d{7}",,,,,,,[8,9]],[,,"80[2-8]\\d{5}|(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}",,,,"12345678",,,[8]],[,,"4[5-9]\\d{7}",,,,"470123456",,,[9]],[,,"800[1-9]\\d{4}",,,,"80012345",,,[8]],[,,"(?:70(?:2[0-57]|3[04-7]|44|6[04-69]|7[0579])|90\\d\\d)\\d{4}",,,,"90012345",,,[8]],[,,"7879\\d{4}",,,,"78791234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BE",32,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[239]|4[23]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-8]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"78(?:0[578]|1[014-8]|2[25]|3[15-8]|48|5[05]|60|7[06-8]|9\\d)\\d{4}",,,,"78102345",,,[8]],,,[,,,,,,,,,[-1]]],BF:[,[,,"[025-7]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:49|5[23]|6[5-7]|9[016-9])|4(?:4[569]|5[4-6]|6[5-7]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}",,,,"20491234"],[,,"(?:0[1-7]|5[0-8]|[67]\\d)\\d{6}",,,,"70123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BF",226,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[025-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BG:[,[,,"00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",,,,,,,[6,7,8,9,12],[4,5]],[,,"2\\d{5,7}|(?:43[1-6]|70[1-9])\\d{4,5}|(?:[36]\\d|4[124-7]|[57][1-9]|8[1-6]|9[1-7])\\d{5,6}",,,,"2123456",,,[6,7,8],[4,5]],[,,"(?:43[07-9]|99[69]\\d)\\d{5}|(?:8[7-9]|98)\\d{7}",,,,"43012345",,,[8,9]],[,,"(?:00800\\d\\d|800)\\d{5}",,,,"80012345",,,[8,12]],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,"700\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BG",359,"00","0",,,"0",,,,[[,"(\\d{6})","$1",["1"]],[,"(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],[[,"(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BH:[,[,,"[136-9]\\d{7}",,,,,,,[8]],[,,"(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|55|7[7-9]|88)|9[69][69])|7(?:[07]\\d\\d|1(?:11|78)))\\d{4}",,,,"17001234"],[,,"(?:3(?:[0-79]\\d|8[0-57-9])\\d|6(?:3(?:00|33|6[16])|441|6(?:3[03-9]|[69]\\d|7[0-689])))\\d{4}",,,,"36001234"],[,,"8[02369]\\d{6}",,,,"80123456"],[,,"(?:87|9[0-8])\\d{6}",,,,"90123456"],[,,"84\\d{6}",,,,"84123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BH",973,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[13679]|8[02-4679]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BI:[,[,,"(?:[267]\\d|31)\\d{6}",,,,,,,[8]],[,,"(?:22|31)\\d{6}",,,,"22201234"],[,,"(?:29|[67][125-9])\\d{6}",,,,"79561234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BI",257,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2367]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BJ:[,[,,"(?:01\\d|[24-689])\\d{7}",,,,,,,[8,10]],[,,"2090\\d{4}|(?:012\\d\\d|2(?:02|1[037]|2[45]|3[68]|4\\d))\\d{5}",,,,"0120211234"],[,,"(?:01(?:2[5-9]|[4-69]\\d)|4[0-8]|[56]\\d|9[013-9])\\d{6}",,,,"0195123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"857[58]\\d{4}",,,,"85751234",,,[8]],"BJ",229,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-689]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"81\\d{6}",,,,"81123456",,,[8]],,,[,,,,,,,,,[-1]]],BL:[,[,,"(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}",,,,,,,[9]],[,,"590(?:2[7-9]|3[3-7]|5[12]|87)\\d{4}",,,,"590271234"],[,,"(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}",,,,"690001234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}",,,,"976012345"],"BL",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BM:[,[,,"(?:441|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"441(?:[46]\\d\\d|5(?:4\\d|60|89))\\d{4}",,,,"4414123456",,,,[7]],[,,"441(?:[2378]\\d|5[0-39]|9[02])\\d{5}",,,,"4413701234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BM",1,"011","1",,,"([2-9]\\d{6})$|1","441$1",,,,,[,,,,,,,,,[-1]],,"441",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BN:[,[,,"[2-578]\\d{6}",,,,,,,[7]],[,,"22[0-7]\\d{4}|(?:2[013-9]|[34]\\d|5[0-25-9])\\d{5}",,,,"2345678"],[,,"(?:22[89]|[78]\\d\\d)\\d{4}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[34]\\d{5}",,,,"5345678"],"BN",673,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BO:[,[,,"8001\\d{5}|(?:[2-467]\\d|50)\\d{6}",,,,,,,[8,9],[7]],[,,"(?:2(?:2\\d\\d|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d\\d|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:[27]\\d|3[2-4]|4[248]|5[24]|6[2-6]))|4(?:4\\d\\d|6(?:11|[24689]\\d|72)))\\d{4}",,,,"22123456",,,[8],[7]],[,,"[67]\\d{7}",,,,"71234567",,,[8]],[,,"8001[07]\\d{4}",,,,"800171234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"50\\d{6}",,,,"50123456",,,[8],[7]],"BO",591,"00(?:1\\d)?","0",,,"0(1\\d)?",,,,[[,"(\\d)(\\d{7})","$1 $2",["[235]|4[46]"],,"0$CC $1"],[,"(\\d{8})","$1",["[67]"],,"0$CC $1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["8"],,"0$CC $1"]],,[,,,,,,,,,[-1]],,,[,,"8001[07]\\d{4}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BQ:[,[,,"(?:[34]1|7\\d)\\d{5}",,,,,,,[7]],[,,"(?:318[023]|41(?:6[023]|70)|7(?:1[578]|2[05]|50)\\d)\\d{3}",,,,"7151234"],[,,"(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}",,,,"3181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BQ",599,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"[347]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BR:[,[,,"(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",,,,,,,[8,9,10,11]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",,,,"1123456789",,,[10],[8]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])(?:7|9\\d)\\d{7}",,,,"11961234567",,,[10,11],[8,9]],[,,"800\\d{6,7}",,,,"800123456",,,[9,10]],[,,"300\\d{6}|[59]00\\d{6,7}",,,,"300123456",,,[9,10]],[,,"(?:30[03]\\d{3}|4(?:0(?:0\\d|20)|370))\\d{4}|300\\d{5}",,,,"40041234",,,[8,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",,,"(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",,,[[,"(\\d{3,6})","$1",["1(?:1[25-8]|2[357-9]|3[02-68]|4[12568]|5|6[0-8]|8[015]|9[0-47-9])|321|610"]],[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],[,"(\\d{4})(\\d{4})","$1-$2",["[2-57]","[2357]|4(?:[0-24-9]|3(?:[0-689]|7[1-9]))"]],[,"(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],[,"(\\d{5})(\\d{4})","$1-$2",["9"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)","0 $CC ($1)"]],[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],[,"(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)","0 $CC ($1)"]],[,,,,,,,,,[-1]],,,[,,"30(?:0\\d{5,7}|3\\d{7})|40(?:0\\d|20)\\d{4}|800\\d{6,7}",,,,,,,[8,9,10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BS:[,[,,"(?:242|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-5]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",,,,"2423456789",,,,[7]],[,,"242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|3[0-4]|[89]9))\\d{4}",,,,"2423591234",,,,[7]],[,,"242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456",,,,[7]],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BS",1,"011","1",,,"([3-8]\\d{6})$|1","242$1",,,,,[,,,,,,,,,[-1]],,"242",[,,,,,,,,,[-1]],[,,"242225\\d{4}",,,,"2422250123"],,,[,,,,,,,,,[-1]]],BT:[,[,,"[17]\\d{7}|[2-8]\\d{6}",,,,,,,[7,8],[6]],[,,"(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}",,,,"2345678",,,[7],[6]],[,,"(?:1[67]|77)\\d{6}",,,,"17123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BT",975,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[2-7]"]],[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]],[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BW:[,[,,"(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}",,,,,,,[7,8,10]],[,,"(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[013]|81)|4(?:6[03]|7[1267]|9[0-5])|5(?:3[03489]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[013467]))\\d{4}",,,,"2401234",,,[7]],[,,"(?:321|7[1-8]\\d)\\d{5}",,,,"71123456",,,[8]],[,,"(?:0800|800\\d)\\d{6}",,,,"0800012345",,,[10]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"79(?:1(?:[0-2]\\d|3[0-3])|2[0-7]\\d)\\d{3}",,,,"79101234",,,[8]],"BW",267,"00",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["90"]],[,"(\\d{3})(\\d{4})","$1 $2",["[24-6]|3[15-9]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37]"]],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BY:[,[,,"(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",,,,,,,[6,7,8,9,10,11],[5]],[,,"(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d\\d)|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",,,,"152450911",,,[9],[5,6,7]],[,,"(?:2(?:5[5-79]|9[1-9])|(?:33|44)\\d)\\d{6}",,,,"294911911",,,[9]],[,,"800\\d{3,7}|8(?:0[13]|20\\d)\\d{7}",,,,"8011234567"],[,,"(?:810|902)\\d{7}",,,,"9021234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"249\\d{6}",,,,"249123456",,,[9]],"BY",375,"810","8",,,"0|80?",,"8~10",,[[,"(\\d{3})(\\d{3})","$1 $2",["800"],"8 $1"],[,"(\\d{3})(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"],[,"(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:[56]|7[467])|2[1-3]"],"8 0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-4]"],"8 0$1"],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["[89]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,"800\\d{3,7}|(?:8(?:0[13]|10|20\\d)|902)\\d{7}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BZ:[,[,,"(?:0800\\d|[2-8])\\d{6}",,,,,,,[7,11]],[,,"(?:2(?:[02]\\d|36|[68]0)|[3-58](?:[02]\\d|[68]0)|7(?:[02]\\d|32|[68]0))\\d{4}",,,,"2221234",,,[7]],[,,"6[0-35-7]\\d{5}",,,,"6221234",,,[7]],[,,"0800\\d{7}",,,,"08001234123",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BZ",501,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CA:[,[,,"[2-9]\\d{9}|3\\d{6}",,,,,,,[7,10]],[,,"(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}",,,,"5062345678",,,[10],[7]],[,,"(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}",,,,"5062345678",,,[10],[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456",,,[10]],[,,"900[2-9]\\d{6}",,,,"9002123456",,,[10]],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:2[125-9]|33|44|66|77|88)|6(?:22|33))[2-9]\\d{6}",,,,"5219023456",,,[10]],[,,"600[2-9]\\d{6}",,,,"6002012345",,,[10]],"CA",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"310\\d{4}",,,,"3101234",,,[7]],,,[,,,,,,,,,[-1]]],CC:[,[,,"1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",,,,,,,[6,7,8,9,10,12]],[,,"8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",,,,"891621234",,,[9],[8]],[,,"4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}",,,,"1300123456",,,[6,8,10,12]],[,,,,,,,,,[-1]],[,,"14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",,,,"147101234",,,[9]],"CC",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"([59]\\d{7})$|0","8$1","0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CD:[,[,,"(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}",,,,,,,[7,8,9,10]],[,,"(?:(?:12|573)\\d\\d|276)\\d{5}|[1-6]\\d{6}",,,,"1234567"],[,,"88\\d{5}|(?:8[0-69]|9[017-9])\\d{7}",,,,"991234567",,,[7,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CD",243,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CF:[,[,,"(?:[27]\\d{3}|8776)\\d{4}",,,,,,,[8]],[,,"2[12]\\d{6}",,,,"21612345"],[,,"7[024-7]\\d{6}",,,,"70012345"],[,,,,,,,,,[-1]],[,,"8776\\d{4}",,,,"87761234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CF",236,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CG:[,[,,"222\\d{6}|(?:0\\d|80)\\d{7}",,,,,,,[9]],[,,"222[1-589]\\d{5}",,,,"222123456"],[,,"026(?:1[0-5]|6[6-9])\\d{4}|0(?:[14-6]\\d\\d|2(?:40|5[5-8]|6[07-9]))\\d{5}",,,,"061234567"],[,,,,,,,,,[-1]],[,,"80[0-2]\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CG",242,"00",,,,,,,,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CH:[,[,,"8\\d{11}|[2-9]\\d{8}",,,,,,,[9,12]],[,,"(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}",,,,"212345678",,,[9]],[,,"(?:6[89]|7[235-9])\\d{7}",,,,"781234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[016]\\d{6}",,,,"900123456",,,[9]],[,,"84[0248]\\d{6}",,,,"840123456",,,[9]],[,,"878\\d{6}",,,,"878123456",,,[9]],[,,,,,,,,,[-1]],"CH",41,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]|81"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],,[,,"74[0248]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"5[18]\\d{7}",,,,"581234567",,,[9]],,,[,,"860\\d{9}",,,,"860123456789",,,[12]]],CI:[,[,,"[02]\\d{9}",,,,,,,[10]],[,,"2(?:[15]\\d{3}|7(?:2(?:0[23]|1[2357]|2[245]|3[45]|4[3-5])|3(?:06|1[69]|[2-6]7)))\\d{5}",,,,"2123456789"],[,,"0[157]\\d{8}",,,,"0123456789"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CI",225,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d)(\\d{5})","$1 $2 $3 $4",["2"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CK:[,[,,"[2-578]\\d{4}",,,,,,,[5]],[,,"(?:2\\d|3[13-7]|4[1-5])\\d{3}",,,,"21234"],[,,"[578]\\d{4}",,,,"71234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CK",682,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CL:[,[,,"12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",,,,,,,[9,10,11]],[,,"2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|3(?:2\\d\\d|3(?:[03467]\\d|1[0-35-9]|2[1-9]|5[0-24-9]|8[0-3])|600)|646[59])|80[1-9]\\d\\d|9(?:3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|7[1-9]\\d\\d|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2458])\\d{7}",,,,"221234567",,,[9]],[,,"2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|3(?:2\\d\\d|3(?:[03467]\\d|1[0-35-9]|2[1-9]|5[0-24-9]|8[0-3])|600)|646[59])|80[1-9]\\d\\d|9(?:3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|7[1-9]\\d\\d|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2458])\\d{7}",,,,"221234567",,,[9]],[,,"(?:123|8)00\\d{6}",,,,"800123456",,,[9,11]],[,,,,,,,,,[-1]],[,,"600\\d{7,8}",,,,"6001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,"44\\d{7}",,,,"441234567",,,[9]],"CL",56,"(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0",,,,,,,1,[[,"(\\d{4})","$1",["1(?:[03-589]|21)|[29]0|78"]],[,"(\\d{5})(\\d{4})","$1 $2",["219","2196"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[1-36]"],"($1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]],[[,"(\\d{5})(\\d{4})","$1 $2",["219","2196"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[1-36]"],"($1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]],[,,,,,,,,,[-1]],,,[,,"600\\d{7,8}",,,,,,,[10,11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CM:[,[,,"[26]\\d{8}|88\\d{6,7}",,,,,,,[8,9]],[,,"2(?:22|33)\\d{6}",,,,"222123456",,,[9]],[,,"(?:24[23]|6(?:[25-9]\\d|40))\\d{6}",,,,"671234567",,,[9]],[,,"88\\d{6,7}",,,,"88012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CM",237,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]|88"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CN:[,[,,"(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"(?:10(?:[02-79]\\d\\d|[18](?:0[1-9]|[1-9]\\d))|2(?:[02-57-9]\\d{3}|1(?:[18](?:0[1-9]|[1-9]\\d)|[2-79]\\d\\d))|(?:41[03]|8078|9(?:78|94))\\d\\d)\\d{5}|(?:10|2[0-57-9])(?:1(?:00|23)\\d\\d|95\\d{3,4})|(?:41[03]|9(?:78|94))(?:100\\d\\d|95\\d{3,4})|8078123|(?:43[35]|754|851)\\d{7,8}|(?:43[35]|754|851)(?:1(?:00\\d|23)\\d|95\\d{3,4})|(?:3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[57]|6[09])|8(?:71|98))(?:[02-8]\\d{7}|1(?:0(?:0\\d\\d(?:\\d{3})?|[1-9]\\d{5})|[13-9]\\d{6}|2(?:[0-24-9]\\d{5}|3\\d(?:\\d{4})?))|9(?:[0-46-9]\\d{6}|5\\d{3}(?:\\d(?:\\d{2})?)?))|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[24-9]|2[179]|3[46-9]|5[2-9]|6[47-9]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-3689]|6[2368]|9[02-9])|8(?:1[236-8]|2[5-7]|3\\d|5[2-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))(?:[02-8]\\d{6}|1(?:0(?:0\\d\\d(?:\\d{2})?|[1-9]\\d{4})|[13-9]\\d{5}|2(?:[0-24-9]\\d{4}|3\\d(?:\\d{3})?))|9(?:[0-46-9]\\d{5}|5\\d{3,5}))",,,,"1012345678",,,[7,8,9,10,11],[5,6]],[,,"1740[0-5]\\d{6}|1(?:[38]\\d|4[57]|[59][0-35-9]|6[25-7]|7[0-35-8])\\d{8}",,,,"13123456789",,,[11]],[,,"(?:(?:10|21)8|8)00\\d{7}",,,,"8001234567",,,[10,12]],[,,"16[08]\\d{5}",,,,"16812345",,,[8]],[,,"10(?:10\\d{4}|96\\d{3,4})|400\\d{7}|950\\d{7,8}|(?:2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",,,,"4001234567",,,[7,8,9,10,11],[5,6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CN",86,"00|1(?:[12]\\d|79)\\d\\d00","0",,,"(1(?:[12]\\d|79)\\d\\d)|0",,"00",,[[,"(\\d{5,6})","$1",["1(?:00|2[13])|9[56]","1(?:00|2(?:1|39))|9[56]","1(?:00|2(?:1|395))|9[56]"]],[,"(\\d{5,6})","$1",["1(?:0|23)|781|[1-9]12","1(?:0|23)|7812|[1-9]123","1(?:0|23(?:[0-8]|9[0-46-9]))|78123|[1-9]123"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]","(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"],"0$1","$CC $1"],[,"(\\d{3})(\\d{4})","$1 $2",["[1-9]","1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])","1(?:0(?:[02-8]|1(?:[013-9]|2[0-24-9])|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[02-8]|1(?:0[1-9]|[13-9]|2[0-24-9])|9[0-47-9])|6)|[3-9]","1(?:0(?:[02-8]|1(?:[013-9]|2[0-24-9])|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[02-8]|1(?:0[1-9]|[13-9]|2[0-24-9])|9[0-47-9])|6)|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|1[03]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|8[1-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|50|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9]|78|94)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))(?:[02-9]|1(?:[013-9]|2[0-24-9]))","1(?:0(?:[02-8]|1(?:[013-9]|2[0-24-9])|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[02-8]|1(?:0[1-9]|[13-9]|2[0-24-9])|9[0-47-9])|6)|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|1[03]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|8[1-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:0(?:[0-689]|7[0-79])|1[01459]|2[0-489]|[46]|50|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9]|78|94)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))(?:[02-9]|1(?:[013-9]|2[0-24-9]))"]],[,"(\\d{4})(\\d{4})","$1 $2",["16[08]"]],[,"(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{4})(\\d{4})","$1 $2",["[1-9]","1(?:0(?:[02-8]|1[1-9]|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[0-8]|9[0-47-9])|6)|[3-9]","1(?:0(?:[02-8]|1[1-9]|9[0-47-9])|[1-9])|26|3(?:[0268]|4[0-8]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|8[1-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|5(?:0|[23][0-8])|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9])|(?:33|85[23]9)[0-46-9]|(?:2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[0-8]|9[0-47-9])","1(?:0[02-8]|[1-9])|2(?:[0-57-9][0-8]|6)|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|5(?:0|[23](?:[02-8]|1[1-9]|9[0-46-9]))|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9])|(?:10|2[0-57-9])9[0-47-9]|(?:101|58|85[23]10)[1-9]|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[02-8]|1(?:0[1-9]|[1-9])|9[0-47-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{7,8})","$1 $2",["9"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"],,"$CC $1"],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",,1]],[[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]","(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{7,8})","$1 $2",["9"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"],,"$CC $1"],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"(?:(?:10|21)8|[48])00\\d{7}|950\\d{7,8}",,,,,,,[10,11,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CO:[,[,,"(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}",,,,,,,[8,10,11],[4,7]],[,,"601055(?:[0-4]\\d|50)\\d\\d|6010(?:[0-4]\\d|5[0-4])\\d{4}|(?:46|60(?:[124-7][2-9]|8[1-9]))\\d{6}",,,,"6012345678",,,[8,10],[4,7]],[,,"333301[0-5]\\d{3}|3333(?:00|2[5-9]|[3-9]\\d)\\d{4}|(?:3(?:24[1-9]|3(?:00|3[0-24-9]))|9101)\\d{6}|3(?:0[0-5]|1\\d|2[0-3]|5[01]|70)\\d{7}",,,,"3211234567",,,[10]],[,,"1800\\d{7}",,,,"18001234567",,,[11]],[,,"(?:19(?:0[01]|4[78])|901)\\d{7}",,,,"19001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CO",57,"00(?:4(?:[14]4|56)|[579])","0",,,"0([3579]|4(?:[14]4|56))?",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["46"]],[,"(\\d{3})(\\d{7})","$1 $2",["6|90"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3[0-357]|91"],,"0$CC $1"],[,"(\\d)(\\d{3})(\\d{7})","$1-$2-$3",["1"],"0$1"]],[[,"(\\d{4})(\\d{4})","$1 $2",["46"]],[,"(\\d{3})(\\d{7})","$1 $2",["6|90"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3[0-357]|91"],,"0$CC $1"],[,"(\\d)(\\d{3})(\\d{7})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CR:[,[,,"(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}",,,,,,,[8,10]],[,,"210[7-9]\\d{4}|2(?:[024-7]\\d|1[1-9])\\d{5}",,,,"22123456",,,[8]],[,,"(?:3005\\d|6500[01])\\d{3}|(?:5[07]|6[0-4]|7[0-3]|8[3-9])\\d{6}",,,,"83123456",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"90[059]\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:210[0-6]|4\\d{3}|5100)\\d{4}",,,,"40001234",,,[8]],"CR",506,"00",,,,"(19(?:0[0-2468]|1[09]|20|66|77|99))",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[3-9]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CU:[,[,,"(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}",,,,,,,[6,7,8,10],[4,5]],[,,"(?:3[23]|4[89])\\d{4,6}|(?:31|4[36]|8(?:0[25]|78)\\d)\\d{6}|(?:2[1-4]|4[1257]|7\\d)\\d{5,6}",,,,"71234567",,,,[4,5]],[,,"(?:5\\d|6[2-4])\\d{6}",,,,"51234567",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,"807\\d{7}",,,,"8071234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CU",53,"119","0",,,"0",,,,[[,"(\\d{2})(\\d{4,6})","$1 $2",["2[1-4]|[34]"],"(0$1)"],[,"(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["[56]"],"0$1"],[,"(\\d{3})(\\d{7})","$1 $2",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CV:[,[,,"(?:[2-59]\\d\\d|800)\\d{4}",,,,,,,[7]],[,,"2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}",,,,"2211234"],[,,"(?:36|5[1-389]|9\\d)\\d{5}",,,,"9911234"],[,,"800\\d{4}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:3[3-5]|4[356])\\d{5}",,,,"3401234"],"CV",238,"0",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-589]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CW:[,[,,"(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",,,,,,,[7,8]],[,,"9(?:4(?:3[0-5]|4[14]|6\\d)|50\\d|7(?:2[014]|3[02-9]|4[4-9]|6[357]|77|8[7-9])|8(?:3[39]|[46]\\d|7[01]|8[57-9]))\\d{4}",,,,"94351234"],[,,"953[01]\\d{4}|9(?:5[12467]|6[5-9])\\d{5}",,,,"95181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"60[0-2]\\d{4}",,,,"6001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CW",599,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[3467]"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],,[,,"955\\d{5}",,,,"95581234",,,[8]],1,"[69]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CX:[,[,,"1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",,,,,,,[6,7,8,9,10,12]],[,,"8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",,,,"891641234",,,[9],[8]],[,,"4(?:79[01]|83[0-389]|94[0-4])\\d{5}|4(?:[0-36]\\d|4[047-9]|5[0-25-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}",,,,"1300123456",,,[6,8,10,12]],[,,,,,,,,,[-1]],[,,"14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",,,,"147101234",,,[9]],"CX",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"([59]\\d{7})$|0","8$1","0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CY:[,[,,"(?:[279]\\d|[58]0)\\d{6}",,,,,,,[8]],[,,"2[2-6]\\d{6}",,,,"22345678"],[,,"9(?:10|[4-79]\\d)\\d{5}",,,,"96123456"],[,,"800\\d{5}",,,,"80001234"],[,,"90[09]\\d{5}",,,,"90012345"],[,,"80[1-9]\\d{5}",,,,"80112345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"CY",357,"00",,,,,,,,[[,"(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:50|77)\\d{6}",,,,"77123456"],,,[,,,,,,,,,[-1]]],CZ:[,[,,"(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",,,,,,,[9,10,11,12]],[,,"(?:2\\d|3[1257-9]|4[16-9]|5[13-9])\\d{7}",,,,"212345678",,,[9]],[,,"(?:60[1-8]\\d|7(?:0(?:[2-5]\\d|60)|19[0-2]|[2379]\\d\\d))\\d{5}",,,,"601123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:0[05689]|76)\\d{6}",,,,"900123456",,,[9]],[,,"8[134]\\d{7}",,,,"811234567",,,[9]],[,,"70[01]\\d{6}",,,,"700123456",,,[9]],[,,"9[17]0\\d{6}",,,,"910123456",,,[9]],"CZ",420,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["96"]],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"9(?:5\\d|7[2-4])\\d{6}",,,,"972123456",,,[9]],,,[,,"9(?:3\\d{9}|6\\d{7,10})",,,,"93123456789"]],DE:[,[,,"[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}",,,,,,,[4,5,6,7,8,9,10,11,12,13,14,15],[2,3]],[,,"32\\d{9,11}|49[1-6]\\d{10}|322\\d{6}|49[0-7]\\d{3,9}|(?:[34]0|[68]9)\\d{3,13}|(?:2(?:0[1-689]|[1-3569]\\d|4[0-8]|7[1-7]|8[0-7])|3(?:[3569]\\d|4[0-79]|7[1-7]|8[1-8])|4(?:1[02-9]|[2-48]\\d|5[0-6]|6[0-8]|7[0-79])|5(?:0[2-8]|[124-6]\\d|[38][0-8]|[79][0-7])|6(?:0[02-9]|[1-358]\\d|[47][0-8]|6[1-9])|7(?:0[2-8]|1[1-9]|[27][0-7]|3\\d|[4-6][0-8]|8[0-5]|9[013-7])|8(?:0[2-9]|1[0-79]|2\\d|3[0-46-9]|4[0-6]|5[013-9]|6[1-8]|7[0-8]|8[0-24-6])|9(?:0[6-9]|[1-4]\\d|[589][0-7]|6[0-8]|7[0-467]))\\d{3,12}",,,,"30123456",,,[5,6,7,8,9,10,11,12,13,14,15],[2,3,4]],[,,"1(?:(?:5(?:[0-25-9]\\d\\d|310)|76\\d\\d)\\d{6}|6[023]\\d{7,8})|17\\d{8}",,,,"15123456789",,,[10,11]],[,,"800\\d{7,12}",,,,"8001234567890",,,[10,11,12,13,14,15]],[,,"(?:137[7-9]|900(?:[135]|9\\d))\\d{6}",,,,"9001234567",,,[10,11]],[,,"180\\d{5,11}|13(?:7[1-6]\\d\\d|8)\\d{4}",,,,"18012345",,,[7,8,9,10,11,12,13,14]],[,,"700\\d{8}",,,,"70012345678",,,[11]],[,,,,,,,,,[-1]],"DE",49,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,13})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{3})(\\d{3,12})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1","2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["138"],"0$1"],[,"(\\d{5})(\\d{2,10})","$1 $2",["3"],"0$1"],[,"(\\d{3})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:3|80)|9"],"0$1"],[,"(\\d{3})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(\\d{3})(\\d{7,12})","$1 $2",["8"],"0$1"],[,"(\\d{5})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{4})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(\\d{4})(\\d{7})","$1 $2",["15[1279]"],"0$1"],[,"(\\d{5})(\\d{6})","$1 $2",["15[03568]","15(?:[0568]|31)"],"0$1"],[,"(\\d{3})(\\d{8})","$1 $2",["18"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{8})","$1 $2 $3",["15"],"0$1"]],,[,,"16(?:4\\d{1,10}|[89]\\d{1,11})",,,,"16412345",,,[4,5,6,7,8,9,10,11,12,13,14]],,,[,,,,,,,,,[-1]],[,,"18(?:1\\d{5,11}|[2-9]\\d{8})",,,,"18500123456",,,[8,9,10,11,12,13,14]],,,[,,"1(?:6(?:013|255|399)|7(?:(?:[015]1|[69]3)3|[2-4]55|[78]99))\\d{7,8}|15(?:(?:[03-68]00|113)\\d|2\\d55|7\\d99|9\\d33)\\d{7}",,,,"177991234567",,,[12,13]]],DJ:[,[,,"(?:2\\d|77)\\d{6}",,,,,,,[8]],[,,"2(?:1[2-5]|7[45])\\d{5}",,,,"21360003"],[,,"77\\d{6}",,,,"77831001"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DJ",253,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DK:[,[,,"[2-9]\\d{7}",,,,,,,[8]],[,,"(?:2(?:[0-59][1-9]|[6-8]\\d)|3(?:[0-3][1-9]|4[13]|5[1-58]|6[1347-9]|7\\d|8[1-8]|9[1-79])|4(?:[0-25][1-9]|[34][2-9]|6[13-579]|7[13579]|8[1-47]|9[127])|5(?:[0-36][1-9]|4[146-9]|5[3-57-9]|7[568]|8[1-358]|9[1-69])|6(?:[0135][1-9]|2[1-68]|4[2-8]|6[1689]|[78]\\d|9[15689])|7(?:[0-69][1-9]|7[3-9]|8[147])|8(?:[16-9][1-9]|2[1-58])|9(?:[1-47-9][1-9]|6\\d))\\d{5}",,,,"32123456"],[,,"(?:2[6-8]|37|6[78]|96)\\d{6}|(?:2[0-59]|3[0-689]|[457]\\d|6[0-69]|8[126-9]|9[1-47-9])[1-9]\\d{5}",,,,"34412345"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DK",45,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DM:[,[,,"(?:[58]\\d\\d|767|900)\\d{7}",,,,,,,[10],[7]],[,,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4])\\d{4}",,,,"7674201234",,,,[7]],[,,"767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-8]|70[1-6])\\d{4}",,,,"7672251234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DM",1,"011","1",,,"([2-7]\\d{6})$|1","767$1",,,,,[,,,,,,,,,[-1]],,"767",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DO:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"8(?:[04]9[2-9]\\d\\d|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d\\d|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9])))\\d{4}",,,,"8092345678",,,,[7]],[,,"8[024]9[2-9]\\d{6}",,,,"8092345678",,,,[7]],[,,"8(?:00(?:14|[2-9]\\d)|(?:33|44|55|66|77|88)[2-9]\\d)\\d{5}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DO",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"8001|8[024]9",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DZ:[,[,,"(?:[1-4]|[5-79]\\d|80)\\d{7}",,,,,,,[8,9]],[,,"9619\\d{5}|(?:1\\d|2[013-79]|3[0-8]|4[013-689])\\d{6}",,,,"12345678"],[,,"(?:5(?:4[0-29]|5\\d|6[0-3])|6(?:[569]\\d|7[0-6])|7[7-9]\\d)\\d{6}",,,,"551234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"80[3-689]1\\d{5}",,,,"808123456",,,[9]],[,,"80[12]1\\d{5}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,"98[23]\\d{6}",,,,"983123456",,,[9]],"DZ",213,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EC:[,[,,"1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}",,,,,,,[8,9,10,11],[7]],[,,"[2-7][2-7]\\d{6}",,,,"22123456",,,[8],[7]],[,,"964[0-2]\\d{5}|9(?:39|[57][89]|6[0-36-9]|[89]\\d)\\d{6}",,,,"991234567",,,[9]],[,,"1800\\d{7}|1[78]00\\d{6}",,,,"18001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[2-7]890\\d{4}",,,,"28901234",,,[8]],"EC",593,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-7]"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[2-7]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],[[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-7]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EE:[,[,,"8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}",,,,,,,[7,8,10]],[,,"(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}",,,,"3212345",,,[7]],[,,"(?:5\\d{5}|8(?:1(?:0(?:0(?:00|[178]\\d)|[3-9]\\d\\d)|(?:1(?:0[2-6]|1\\d)|(?:2[0-59]|[3-79]\\d)\\d)\\d)|2(?:0(?:0(?:00|4\\d)|(?:19|[2-7]\\d)\\d)|(?:(?:[124-69]\\d|3[5-9])\\d|7(?:[0-79]\\d|8[13-9])|8(?:[2-6]\\d|7[01]))\\d)|[349]\\d{4}))\\d\\d|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}",,,,"51234567",,,[7,8]],[,,"800(?:(?:0\\d\\d|1)\\d|[2-9])\\d{3}",,,,"80012345"],[,,"(?:40\\d\\d|900)\\d{4}",,,,"9001234",,,[7,8]],[,,,,,,,,,[-1]],[,,"70[0-2]\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"EE",372,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]],[,"(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-49])","[45]|8(?:00[1-9]|[1-49])"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,"800[2-9]\\d{3}",,,,,,,[7]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EG:[,[,,"[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"13[23]\\d{6}|(?:15|57)\\d{6,7}|(?:2\\d|3|4[05-8]|5[05]|6[24-689]|8[2468]|9[235-7])\\d{7}",,,,"234567890",,,[8,9],[6,7]],[,,"1[0-25]\\d{8}",,,,"1001234567",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"EG",20,"00","0",,,"0",,,,[[,"(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],[,"(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|8[2468]|9[235-7]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{2})(\\d{8})","$1 $2",["1"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EH:[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"528[89]\\d{5}",,,,"528812345"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-467]|5[0-3]|8[0-5]))\\d{6}",,,,"650123456"],[,,"80[0-7]\\d{6}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}",,,,"592401234"],"EH",212,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"528[89]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ER:[,[,,"[178]\\d{6}",,,,,,,[7],[6]],[,,"(?:1(?:1[12568]|[24]0|55|6[146])|8\\d\\d)\\d{4}",,,,"8370362",,,,[6]],[,,"(?:17[1-3]|7\\d\\d)\\d{4}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ER",291,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[178]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ES:[,[,,"[5-9]\\d{8}",,,,,,,[9]],[,,"96906(?:0[0-8]|1[1-9]|[2-9]\\d)\\d\\d|9(?:69(?:0[0-57-9]|[1-9]\\d)|73(?:[0-8]\\d|9[1-9]))\\d{4}|(?:8(?:[1356]\\d|[28][0-8]|[47][1-9])|9(?:[135]\\d|[268][0-8]|4[1-9]|7[124-9]))\\d{6}",,,,"810123456"],[,,"(?:590[16]00\\d|9(?:6906(?:09|10)|7390\\d\\d))\\d\\d|(?:6\\d|7[1-48])\\d{7}",,,,"612345678"],[,,"[89]00\\d{6}",,,,"800123456"],[,,"80[367]\\d{6}",,,,"803123456"],[,,"90[12]\\d{6}",,,,"901123456"],[,,"70\\d{7}",,,,"701234567"],[,,,,,,,,,[-1]],"ES",34,"00",,,,,,,,[[,"(\\d{4})","$1",["905"]],[,"(\\d{6})","$1",["[79]9"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"51\\d{7}",,,,"511234567"],,,[,,,,,,,,,[-1]]],ET:[,[,,"(?:11|[2-579]\\d)\\d{7}",,,,,,,[9],[7]],[,,"11667[01]\\d{3}|(?:11(?:1(?:1[124]|2[2-7]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8]|7\\d)|5(?:1[578]|44|5[0-4])|6(?:1[578]|2[69]|39|4[5-7]|5[0-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|(?:22|55)[0-6]|33[0134689]|44[04]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:119|22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:(?:11|22)[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",,,,"111112345",,,,[7]],[,,"700[1-9]\\d{5}|(?:7(?:0[1-9]|1[0-8]|22|77|86|99)|9\\d\\d)\\d{6}",,,,"911234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ET",251,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-579]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FI:[,[,,"[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"1[3-7][1-8]\\d{3,6}|(?:19[1-8]|[23568][1-8]\\d|9(?:00|[1-8]\\d))\\d{2,6}",,,,"131234567",,,[5,6,7,8,9]],[,,"4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FI",358,"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","0",,,"0",,"00",,[[,"(\\d{5})","$1",["75[12]"],"0$1"],[,"(\\d{5})","$1",["20[2-59]"],"0$1"],[,"(\\d{6})","$1",["11"]],[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]0|[68])0|70[07-9]"],"0$1"],[,"(\\d{2})(\\d{4,8})","$1 $2",["[14]|2[09]|50|7[135]"],"0$1"],[,"(\\d{2})(\\d{6,10})","$1 $2",["7"],"0$1"],[,"(\\d)(\\d{4,9})","$1 $2",["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"]],[[,"(\\d{5})","$1",["20[2-59]"],"0$1"],[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]0|[68])0|70[07-9]"],"0$1"],[,"(\\d{2})(\\d{4,8})","$1 $2",["[14]|2[09]|50|7[135]"],"0$1"],[,"(\\d{2})(\\d{6,10})","$1 $2",["7"],"0$1"],[,"(\\d)(\\d{4,9})","$1 $2",["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"]],[,,,,,,,,,[-1]],1,"1[03-79]|[2-9]",[,,"20(?:2[023]|9[89])\\d{1,6}|(?:60[12]\\d|7099)\\d{4,5}|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:[1-3]00|7(?:0[1-5]\\d\\d|5[03-9]))\\d{3,7}"],[,,"20\\d{4,8}|60[12]\\d{5,6}|7(?:099\\d{4,5}|5[03-9]\\d{3,7})|20[2-59]\\d\\d|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:10|29|3[09]|70[1-5]\\d)\\d{4,8}",,,,"10112345"],,,[,,,,,,,,,[-1]]],FJ:[,[,,"45\\d{5}|(?:0800\\d|[235-9])\\d{6}",,,,,,,[7,11]],[,,"603\\d{4}|(?:3[0-5]|6[25-7]|8[58])\\d{5}",,,,"3212345",,,[7]],[,,"(?:[279]\\d|45|5[01568]|8[034679])\\d{5}",,,,"7012345",,,[7]],[,,"0800\\d{7}",,,,"08001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FJ",679,"0(?:0|52)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FK:[,[,,"[2-7]\\d{4}",,,,,,,[5]],[,,"[2-47]\\d{4}",,,,"31234"],[,,"[56]\\d{4}",,,,"51234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FK",500,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FM:[,[,,"(?:[39]\\d\\d|820)\\d{4}",,,,,,,[7]],[,,"31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-6]\\d)\\d)\\d{3}",,,,"3201234"],[,,"31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-7]\\d)\\d)\\d{3}",,,,"3501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FM",691,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[389]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FO:[,[,,"[2-9]\\d{5}",,,,,,,[6]],[,,"(?:20|[34]\\d|8[19])\\d{4}",,,,"201234"],[,,"(?:[27][1-9]|5\\d|9[16])\\d{4}",,,,"211234"],[,,"80[257-9]\\d{3}",,,,"802123"],[,,"90(?:[13-5][15-7]|2[125-7]|9\\d)\\d\\d",,,,"901123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6[0-36]|88)\\d{4}",,,,"601234"],"FO",298,"00",,,,"(10(?:01|[12]0|88))",,,,[[,"(\\d{6})","$1",["[2-9]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FR:[,[,,"[1-9]\\d{8}",,,,,,,[9]],[,,"(?:26[013-9]|59[1-35-9])\\d{6}|(?:[13]\\d|2[0-57-9]|4[1-9]|5[0-8])\\d{7}",,,,"123456789"],[,,"(?:6(?:[0-24-8]\\d|3[0-8]|9[589])|7[3-9]\\d)\\d{6}",,,,"612345678"],[,,"80[0-5]\\d{6}",,,,"801234567"],[,,"836(?:0[0-36-9]|[1-9]\\d)\\d{4}|8(?:1[2-9]|2[2-47-9]|3[0-57-9]|[569]\\d|8[0-35-9])\\d{6}",,,,"891123456"],[,,"8(?:1[01]|2[0156]|4[024]|84)\\d{6}",,,,"884012345"],[,,,,,,,,,[-1]],[,,"9\\d{8}",,,,"912345678"],"FR",33,"00","0",,,"0",,,,[[,"(\\d{4})","$1",["10"]],[,"(\\d{3})(\\d{3})","$1 $2",["1"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"80[6-9]\\d{6}",,,,"806123456"],,,[,,,,,,,,,[-1]]],GA:[,[,,"(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}",,,,,,,[7,8]],[,,"[01]1\\d{6}",,,,"01441234",,,[8]],[,,"(?:(?:0[2-7]|7[467])\\d|6(?:0[0-4]|10|[256]\\d))\\d{5}|[2-7]\\d{6}",,,,"06031234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GA",241,"00",,,,"0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})","$1",,,[[,"(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["11|[67]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GB:[,[,,"[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",,,,,,,[7,9,10],[4,5,6,8]],[,,"(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0-35])|4(?:(?:[0-5]\\d|70)\\d|69[7-9])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|50))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-3]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}",,,,"1212345678",,,[9,10],[4,5,6,7,8]],[,,"7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",,,,"7400123456",,,[10]],[,,"80[08]\\d{7}|800\\d{6}|8001111",,,,"8001234567"],[,,"(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d",,,,"9012345678",,,[7,10]],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GB",44,"00","0"," x",,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["845","8454","84546","845464"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["800"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],[,"(\\d{4})(\\d{5,6})","$1 $2",["1(?:[2-69][02-9]|[78])"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[25]|7(?:0|6[02-9])","[25]|7(?:0|6(?:[03-9]|2[356]))"],"0$1"],[,"(\\d{4})(\\d{6})","$1 $2",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[1389]"],"0$1"]],,[,,"76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}",,,,"7640123456",,,[10]],1,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],GD:[,[,,"(?:473|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-4]|5[579]|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",,,,"4732691234",,,,[7]],[,,"473(?:4(?:0[2-79]|1[04-9]|2[0-5]|49|5[68])|5(?:2[01]|3[3-8])|901)\\d{4}",,,,"4734031234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GD",1,"011","1",,,"([2-9]\\d{6})$|1","473$1",,,,,[,,,,,,,,,[-1]],,"473",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GE:[,[,,"(?:[3-57]\\d\\d|800)\\d{6}",,,,,,,[9],[6,7]],[,,"(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}",,,,"322123456",,,,[6,7]],[,,"5(?:(?:(?:0555|1(?:[17]77|555))[5-9]|757(?:7[7-9]|8[01]))\\d|22252[0-4])\\d\\d|5(?:0(?:0[17]0|505)|1(?:0[01]0|1(?:07|33|51))|2(?:0[02]0|2[25]2)|3(?:0[03]0|3[35]3)|(?:40[04]|900)0|5222)[0-4]\\d{3}|(?:5(?:0(?:0(?:0\\d|11|22|3[0-6]|44|5[05]|77|88|9[09])|(?:[14]\\d|77)\\d|22[02])|1(?:1(?:[03][01]|[124]\\d|5[2-6]|7[0-4])|4\\d\\d)|[23]555|4(?:4\\d\\d|555)|5(?:[0157-9]\\d\\d|200|333|444)|6[89]\\d\\d|7(?:[0147-9]\\d\\d|5(?:00|[57]5))|8(?:0(?:[018]\\d|2[0-4])|5(?:55|8[89])|8(?:55|88))|9(?:090|[1-35-9]\\d\\d))|790\\d\\d)\\d{4}",,,,"555123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70[67]\\d{6}",,,,"706123456"],"GE",995,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["32"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[57]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"70[67]\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GF:[,[,,"(?:[56]94\\d|7093)\\d{5}|(?:80|9\\d)\\d{7}",,,,,,,[9]],[,,"594(?:[02-49]\\d|1[0-5]|5[6-9]|6[0-3]|80)\\d{4}",,,,"594101234"],[,,"(?:694(?:[0-249]\\d|3[0-8])|7093[0-3])\\d{4}",,,,"694201234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:396|76\\d)\\d|476[0-6])\\d{4}",,,,"976012345"],"GF",594,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]|9[47]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GG:[,[,,"(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",,,,,,,[7,9,10],[6]],[,,"1481[25-9]\\d{5}",,,,"1481256789",,,[10],[6]],[,,"7(?:(?:781|839)\\d|911[17])\\d{5}",,,,"7781123456",,,[10]],[,,"80[08]\\d{7}|800\\d{6}|8001111",,,,"8001234567"],[,,"(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d",,,,"9012345678",,,[7,10]],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GG",44,"00","0",,,"([25-9]\\d{5})$|0","1481$1",,,,,[,,"76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}",,,,"7640123456",,,[10]],,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],GH:[,[,,"(?:[235]\\d{3}|800)\\d{5}",,,,,,,[8,9],[7]],[,,"3082[0-5]\\d{4}|3(?:0(?:[237]\\d|8[01])|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}",,,,"302345678",,,[9],[7]],[,,"(?:2(?:[0346-9]\\d|5[67])|5(?:[03-7]\\d|9[1-9]))\\d{6}",,,,"231234567",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GH",233,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[237]|8[0-2]"]],[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],[[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"800\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GI:[,[,,"(?:[25]\\d|60)\\d{6}",,,,,,,[8]],[,,"2190[0-2]\\d{3}|2(?:0(?:[02]\\d|3[01])|16[24-9]|2[2-5]\\d)\\d{4}",,,,"20012345"],[,,"5251[0-4]\\d{3}|(?:5(?:[146-8]\\d\\d|250)|60(?:1[01]|6\\d))\\d{4}",,,,"57123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GI",350,"00",,,,,,,,[[,"(\\d{3})(\\d{5})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GL:[,[,,"(?:19|[2-689]\\d|70)\\d{4}",,,,,,,[6]],[,,"(?:19|3[1-7]|[68][1-9]|70|9\\d)\\d{4}",,,,"321000"],[,,"[245]\\d{5}",,,,"221234"],[,,"80\\d{4}",,,,"801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[89]\\d{4}",,,,"381234"],"GL",299,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GM:[,[,,"[2-9]\\d{6}",,,,,,,[7]],[,,"(?:4(?:[23]\\d\\d|4(?:1[024679]|[6-9]\\d))|5(?:5(?:3\\d|4[0-7])|6[67]\\d|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}",,,,"5661234"],[,,"(?:[23679]\\d|4[015]|5[0-489])\\d{5}",,,,"3012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GM",220,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GN:[,[,,"722\\d{6}|(?:3|6\\d)\\d{7}",,,,,,,[8,9]],[,,"3(?:0(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])|1\\d\\d)\\d{4}",,,,"30241234",,,[8]],[,,"6[0-356]\\d{7}",,,,"601123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"722\\d{6}",,,,"722123456",,,[9]],"GN",224,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GP:[,[,,"(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}",,,,,,,[9]],[,,"590(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)\\d{4}",,,,"590201234"],[,,"(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}",,,,"690001234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}",,,,"976012345"],"GP",590,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-79]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GQ:[,[,,"222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",,,,,,,[9]],[,,"33[0-24-9]\\d[46]\\d{4}|3(?:33|5\\d)\\d[7-9]\\d{4}",,,,"333091234"],[,,"(?:222|55\\d)\\d{6}",,,,"222123456"],[,,"80\\d[1-9]\\d{5}",,,,"800123456"],[,,"90\\d[1-9]\\d{5}",,,,"900123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GQ",240,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],[,"(\\d{3})(\\d{6})","$1 $2",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GR:[,[,,"5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}",,,,,,,[10,11,12]],[,,"2(?:1\\d\\d|2(?:2[1-46-9]|[36][1-8]|4[1-7]|5[1-4]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|[269][1-6]|3[1245]|4[1-7]|5[13-9]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",,,,"2123456789",,,[10]],[,,"68[57-9]\\d{7}|(?:69|94)\\d{8}",,,,"6912345678",,,[10]],[,,"800\\d{7,9}",,,,"8001234567"],[,,"90[19]\\d{7}",,,,"9091234567",,,[10]],[,,"8(?:0[16]|12|[27]5|50)\\d{7}",,,,"8011234567",,,[10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,,,,,,,,[-1]],"GR",30,"00",,,,,,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],[,"(\\d{4})(\\d{6})","$1 $2",["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2689]"]],[,"(\\d{3})(\\d{3,4})(\\d{5})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"5005000\\d{3}",,,,"5005000123",,,[10]],,,[,,,,,,,,,[-1]]],GT:[,[,,"80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}",,,,,,,[8,11]],[,,"[267][2-9]\\d{6}",,,,"22456789",,,[8]],[,,"(?:[3-5]\\d\\d|80[0-4])\\d{5}",,,,"51234567",,,[8]],[,,"18[01]\\d{8}",,,,"18001112222",,,[11]],[,,"19\\d{9}",,,,"19001112222",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GT",502,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-8]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GU:[,[,,"(?:[58]\\d\\d|671|900)\\d{7}",,,,,,,[10],[7]],[,,"671(?:2\\d\\d|3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[02-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[478])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"671(?:2\\d\\d|3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[02-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[478])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GU",1,"011","1",,,"([2-9]\\d{6})$|1","671$1",,1,,,[,,,,,,,,,[-1]],,"671",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GW:[,[,,"[49]\\d{8}|4\\d{6}",,,,,,,[7,9]],[,,"443\\d{6}",,,,"443201234",,,[9]],[,,"9(?:5\\d|6[569]|77)\\d{6}",,,,"955012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"40\\d{5}",,,,"4012345",,,[7]],"GW",245,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["40"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GY:[,[,,"(?:[2-8]\\d{3}|9008)\\d{3}",,,,,,,[7]],[,,"(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|50[0-6]|77[1-57])\\d{4}",,,,"2201234"],[,,"(?:510|6\\d\\d|7(?:[0-5]\\d|6[01]))\\d{4}",,,,"6091234"],[,,"(?:289|8(?:00|6[28]|88|99))\\d{4}",,,,"2891234"],[,,"9008\\d{3}",,,,"9008123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"515\\d{4}",,,,"5151234"],"GY",592,"001",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HK:[,[,,"8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}",,,,,,,[5,6,7,8,9,11]],[,,"(?:2(?:[13-9]\\d|2[013-9])\\d|3(?:(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69])\\d|8(?:4[0-8]|[579]\\d|6[0-2]))|58(?:0[1-9]|1[2-9]))\\d{4}",,,,"21234567",,,[8]],[,,"(?:4(?:44[0-35-9]|6(?:1[0-79]|4[0-57-9]|6[0-4])|7(?:4[0-28]|6[0-5]))|5(?:73[0-6]|95[0-8])|6(?:26[013-8]|66[0-3])|70(?:7[1-8]|8[0-4])|84(?:4[0-2]|8[0-35-9])|9(?:29[013-9]|39[014-9]|59[0-4]|899))\\d{4}|(?:4(?:4[0-35-9]|6[02357-9]|7[015])|5(?:[1-59][0-46-9]|6[0-4689]|7[0-246-9])|6(?:0[1-9]|[13-59]\\d|[268][0-57-9]|7[0-79])|70[1-59]|84[0-39]|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}",,,,"51234567",,,[8]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900(?:[0-24-9]\\d{7}|3\\d{1,4})",,,,"90012345678",,,[5,6,7,8,11]],[,,,,,,,,,[-1]],[,,"8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}",,,,"81123456",,,[8]],[,,,,,,,,,[-1]],"HK",852,"00(?:30|5[09]|[126-9]?)",,,,,,"00",,[[,"(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],,[,,"7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[0136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}",,,,"71123456",,,[8]],,,[,,,,,,,,,[-1]],[,,"30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}",,,,"30161234",,,[8]],,,[,,,,,,,,,[-1]]],HN:[,[,,"8\\d{10}|[237-9]\\d{7}",,,,,,,[8,11]],[,,"2(?:2(?:0[0-59]|1[1-9]|[23]\\d|4[02-7]|5[57]|6[245]|7[0135689]|8[01346-9]|9[0-2])|4(?:0[578]|2[3-59]|3[13-9]|4[0-68]|5[1-3589])|5(?:0[2357-9]|1[1-356]|4[03-5]|5\\d|6[014-69]|7[04]|80)|6(?:[056]\\d|17|2[067]|3[047]|4[0-378]|[78][0-8]|9[01])|7(?:0[5-79]|6[46-9]|7[02-9]|8[034]|91)|8(?:79|8[0-357-9]|9[1-57-9]))\\d{4}",,,,"22123456",,,[8]],[,,"[37-9]\\d{7}",,,,"91234567",,,[8]],[,,"8002\\d{7}",,,,"80021234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"HN",504,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1-$2",["[237-9]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["8"]]],[[,"(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]],[,,,,,,,,,[-1]],,,[,,"8002\\d{7}",,,,,,,[11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HR:[,[,,"(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",,,,,,,[6,7,8,9]],[,,"1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"9(?:(?:0[1-9]|[12589]\\d)\\d\\d|7(?:[0679]\\d\\d|5(?:[01]\\d|44|55|77|9[5-79])))\\d{4}|98\\d{6}",,,,"921234567",,,[8,9]],[,,"80\\d{5,7}",,,,"800123456",,,[7,8,9]],[,,"6[01459]\\d{6}|6[01]\\d{4,5}",,,,"611234",,,[6,7,8]],[,,,,,,,,,[-1]],[,,"7[45]\\d{6}",,,,"74123456",,,[8]],[,,,,,,,,,[-1]],"HR",385,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6|7[245]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-57]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"62\\d{6,7}|72\\d{6}",,,,"62123456",,,[8,9]],,,[,,,,,,,,,[-1]]],HT:[,[,,"(?:[2-489]\\d|55)\\d{6}",,,,,,,[8]],[,,"2(?:2\\d|5[1-5]|81|9[149])\\d{5}",,,,"22453300"],[,,"(?:[34]\\d|55)\\d{6}",,,,"34101234"],[,,"8\\d{7}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:[67][0-4]|8[0-3589]|9\\d)\\d{5}",,,,"98901234"],"HT",509,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-589]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HU:[,[,,"[235-7]\\d{8}|[1-9]\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:1\\d|[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|8[2-57-9]|9[2-69])\\d{6}",,,,"12345678",,,[8],[6,7]],[,,"(?:[257]0|3[01])\\d{7}",,,,"201234567",,,[9]],[,,"(?:[48]0\\d|680[29])\\d{5}",,,,"80123456"],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"21\\d{7}",,,,"211234567",,,[9]],"HU",36,"00","06",,,"06",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"(06 $1)"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"],"(06 $1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"06 $1"]],,[,,,,,,,,,[-1]],,,[,,"(?:[48]0\\d|680[29])\\d{5}"],[,,"38\\d{7}",,,,"381234567",,,[9]],,,[,,,,,,,,,[-1]]],ID:[,[,,"00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}",,,,,,,[7,8,9,10,11,12,13,14,15,16,17],[5,6]],[,,"2[124]\\d{7,8}|619\\d{8}|2(?:1(?:14|500)|2\\d{3})\\d{3}|61\\d{5,8}|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}",,,,"218350123",,,[7,8,9,10,11],[5,6]],[,,"8[1-35-9]\\d{7,10}",,,,"812345678",,,[9,10,11,12]],[,,"00(?:1803\\d{5,11}|7803\\d{7})|(?:177\\d|800)\\d{5,7}",,,,"8001234567",,,[8,9,10,11,12,13,14,15,16,17]],[,,"809\\d{7}",,,,"8091234567",,,[10]],[,,"804\\d{7}",,,,"8041234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ID",62,"00[89]","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],[,"(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],[,"(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{2,8})","$1 $2 $3 $4",["001"]],[,"(\\d{2})(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3 $4",["0"]]],[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],[,"(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],[,"(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"001803\\d{5,11}|(?:007803\\d|8071)\\d{6}",,,,,,,[10,11,12,13,14,15,16,17]],[,,"(?:1500|8071\\d{3})\\d{3}",,,,"8071123456",,,[7,10]],,,[,,,,,,,,,[-1]]],IE:[,[,,"(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",,,,,,,[7,8,9,10],[5,6]],[,,"(?:1\\d|21)\\d{6,7}|(?:2[24-9]|4(?:0[24]|5\\d|7)|5(?:0[45]|1\\d|8)|6(?:1\\d|[237-9])|9(?:1\\d|[35-9]))\\d{5}|(?:23|4(?:[1-469]|8\\d)|5[23679]|6[4-6]|7[14]|9[04])\\d{7}",,,,"2212345",,,,[5,6]],[,,"8(?:22|[35-9]\\d)\\d{6}",,,,"850123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"15(?:1[2-8]|[2-8]0|9[089])\\d{6}",,,,"1520123456",,,[10]],[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,,"700\\d{6}",,,,"700123456",,,[9]],[,,"76\\d{7}",,,,"761234567",,,[9]],"IE",353,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["[45]0"],"(0$1)"],[,"(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2569]|4[1-69]|7[14]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[78]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["4"],"(0$1)"],[,"(\\d{2})(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"18[59]0\\d{6}",,,,,,,[10]],[,,"818\\d{6}",,,,"818123456",,,[9]],,,[,,"88210[1-9]\\d{4}|8(?:[35-79]5\\d\\d|8(?:[013-9]\\d\\d|2(?:[01][1-9]|[2-9]\\d)))\\d{5}",,,,"8551234567",,,[10]]],IL:[,[,,"1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",,,,,,,[7,8,9,10,11,12]],[,,"153\\d{8,9}|29[1-9]\\d{5}|(?:2[0-8]|[3489]\\d)\\d{6}",,,,"21234567",,,[8,11,12],[7]],[,,"55(?:4(?:[01]0|5[0-2])|57[0-289])\\d{4}|5(?:(?:[0-2][02-9]|[36]\\d|[49][2-9]|8[3-7])\\d|5(?:01|2\\d|3[0-3]|4[34]|5[0-25689]|6[6-8]|7[0-267]|8[7-9]|9[1-9]))\\d{5}",,,,"502345678",,,[9]],[,,"1(?:255|80[019]\\d{3})\\d{3}",,,,"1800123456",,,[7,10]],[,,"1212\\d{4}|1(?:200|9(?:0[0-2]|19))\\d{6}",,,,"1919123456",,,[8,10]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,"7(?:38(?:0\\d|5[0-3569]|88)|8(?:33|55|77|81)\\d)\\d{4}|7(?:18|2[23]|3[237]|47|6[258]|7\\d|82|9[2-9])\\d{6}",,,,"771234567",,,[9]],"IL",972,"0(?:0|1[2-9])","0",,,"0",,,,[[,"(\\d{4})(\\d{3})","$1-$2",["125"]],[,"(\\d{4})(\\d{2})(\\d{2})","$1-$2-$3",["121"]],[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1-$2-$3",["12"]],[,"(\\d{4})(\\d{6})","$1-$2",["159"]],[,"(\\d)(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],[,"(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["15"]]],,[,,,,,,,,,[-1]],,,[,,"1700\\d{6}",,,,,,,[10]],[,,"1599\\d{6}",,,,"1599123456",,,[10]],,,[,,"151\\d{8,9}",,,,"15112340000",,,[11,12]]],IM:[,[,,"1624\\d{6}|(?:[3578]\\d|90)\\d{8}",,,,,,,[10],[6]],[,,"1624(?:230|[5-8]\\d\\d)\\d{3}",,,,"1624756789",,,,[6]],[,,"76245[06]\\d{4}|7(?:4576|[59]24\\d|624[0-4689])\\d{5}",,,,"7924123456"],[,,"808162\\d{4}",,,,"8081624567"],[,,"8(?:440[49]06|72299\\d)\\d{3}|(?:8(?:45|70)|90[0167])624\\d{4}",,,,"9016247890"],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678"],[,,"56\\d{8}",,,,"5612345678"],"IM",44,"00","0",,,"([25-8]\\d{5})$|0","1624$1",,,,,[,,,,,,,,,[-1]],,"74576|(?:16|7[56])24",[,,,,,,,,,[-1]],[,,"3440[49]06\\d{3}|(?:3(?:08162|3\\d{4}|45624|7(?:0624|2299))|55\\d{4})\\d{4}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],IN:[,[,,"(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",,,,,,,[8,9,10,11,12,13],[6,7]],[,,"2717(?:[2-7]\\d|95)\\d{4}|(?:271[0-689]|782[0-6])[2-7]\\d{5}|(?:170[24]|2(?:(?:[02][2-79]|90)\\d|80[13468])|(?:3(?:23|80)|683|79[1-7])\\d|4(?:20[24]|72[2-8])|552[1-7])\\d{6}|(?:11|33|4[04]|80)[2-7]\\d{7}|(?:342|674|788)(?:[0189][2-7]|[2-7]\\d)\\d{5}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[13]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[014-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[3-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1245]|4[5-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])|7(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|8[013-7]|9[089])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d[2-7]\\d{5}",,,,"7410410123",,,[10],[6,7,8]],[,,"(?:61279|7(?:887[02-9]|9(?:313|79[07-9]))|8(?:079[04-9]|(?:84|91)7[02-8]))\\d{5}|(?:6(?:12|[2-47]1|5[17]|6[13]|80)[0189]|7(?:1(?:2[0189]|9[0-5])|2(?:[14][017-9]|8[0-59])|3(?:2[5-8]|[34][017-9]|9[016-9])|4(?:1[015-9]|[29][89]|39|8[389])|5(?:[15][017-9]|2[04-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589])|70[0289]|88[089]|97[02-8])|8(?:0(?:6[67]|7[02-8])|70[017-9]|84[01489]|91[0-289]))\\d{6}|(?:7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[0189]\\d|7[02-8])\\d{5}|(?:6(?:[09]\\d|1[04679]|2[03689]|3[05-9]|4[0489]|50|6[069]|7[07]|8[7-9])|7(?:0\\d|2[0235-79]|3[05-8]|40|5[0346-8]|6[6-9]|7[1-9]|8[0-79]|9[089])|8(?:0[01589]|1[0-57-9]|2[235-9]|3[03-57-9]|[45]\\d|6[02457-9]|7[1-69]|8[0-25-9]|9[02-9])|9\\d\\d)\\d{7}|(?:6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|8[124-6])\\d|7(?:[235689]\\d|4[0189]))|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-5])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]|881))[0189]\\d{5}",,,,"8123456789",,,[10]],[,,"000800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))",,,,"1800123456"],[,,"186[12]\\d{9}",,,,"1861123456789",,,[13]],[,,"1860\\d{7}",,,,"18603451234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IN",91,"00","0",,,"0",,,,[[,"(\\d{7})","$1",["575"]],[,"(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],,,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],,,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"],"0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]","1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],,,1],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["0"]],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],,,1]],[[,"(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],,,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],,,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"],"0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]","1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],,,1],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],,,1]],[,,,,,,,,,[-1]],,,[,,"1(?:600\\d{6}|800\\d{4,9})|(?:000800|18(?:03\\d\\d|6(?:0|[12]\\d\\d)))\\d{7}"],[,,"140\\d{7}",,,,"1409305260",,,[10]],,,[,,,,,,,,,[-1]]],IO:[,[,,"3\\d{6}",,,,,,,[7]],[,,"37\\d{5}",,,,"3709100"],[,,"38\\d{5}",,,,"3801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IO",246,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],IQ:[,[,,"(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",,,,,,,[8,9,10],[6,7]],[,,"1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"7[3-9]\\d{8}",,,,"7912345678",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IQ",964,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],IR:[,[,,"[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",,,,,,,[4,5,6,7,10],[8]],[,,"(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:[03-57]\\d{7}|[16]\\d{3}(?:\\d{4})?|[289]\\d{3}(?:\\d(?:\\d{3})?)?)|94(?:000[09]|(?:12\\d|30[0-2])\\d|2(?:121|[2689]0\\d)|4(?:111|40\\d))\\d{4}",,,,"2123456789",,,[6,7,10],[4,5,8]],[,,"9(?:(?:0(?:[0-35]\\d|4[4-6])|(?:[13]\\d|2[0-3])\\d)\\d|9(?:[0-46]\\d\\d|5[15]0|8(?:[12]\\d|88)|9(?:0[0-3]|[19]\\d|21|69|77|8[7-9])))\\d{5}",,,,"9123456789",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IR",98,"00","0",,,"0",,,,[[,"(\\d{4,5})","$1",["96"],"0$1"],[,"(\\d{2})(\\d{4,5})","$1 $2",["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"9(?:4440\\d{5}|6(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19]))",,,,,,,[4,5,10]],[,,"96(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19])",,,,"9601",,,[4,5]],,,[,,,,,,,,,[-1]]],IS:[,[,,"(?:38\\d|[4-9])\\d{6}",,,,,,,[7,9]],[,,"(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-24589]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|872)\\d{4}",,,,"4101234",,,[7]],[,,"(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[026-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-9]\\d)|8(?:2[0-59]|[3-69]\\d|8[238]))\\d{4}",,,,"6111234"],[,,"80[0-8]\\d{4}",,,,"8001234",,,[7]],[,,"90(?:0\\d|1[5-79]|2[015-79]|3[135-79]|4[125-7]|5[25-79]|7[1-37]|8[0-35-7])\\d{3}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"49[0-24-79]\\d{4}",,,,"4921234",,,[7]],"IS",354,"00|1(?:0(?:01|[12]0)|100)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"809\\d{4}",,,,"8091234",,,[7]],,,[,,"(?:689|8(?:7[18]|80)|95[48])\\d{4}",,,,"6891234",,,[7]]],IT:[,[,,"0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?",,,,,,,[6,7,8,9,10,11,12]],[,,"0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}",,,,"0212345678",,,[6,7,8,9,10,11]],[,,"3[2-9]\\d{7,8}|(?:31|43)\\d{8}",,,,"3123456789",,,[9,10]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"IT",39,"00",,,,,,,,[[,"(\\d{4,5})","$1",["1(?:0|9[246])","1(?:0|9(?:2[2-9]|[46]))"]],[,"(\\d{6})","$1",["1(?:1|92)"]],[,"(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]],[,"(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],[,"(\\d{4})(\\d{4})","$1 $2",["894"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1(?:44|[679])|[378]|43"]],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]|14"]],[,"(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["3"]]],[[,"(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]],[,"(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],[,"(\\d{4})(\\d{4})","$1 $2",["894"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1(?:44|[679])|[378]|43"]],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]|14"]],[,"(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["3"]]],[,,,,,,,,,[-1]],1,,[,,"848\\d{6}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,"3[2-8]\\d{9,10}",,,,"33101234501",,,[11,12]]],JE:[,[,,"1534\\d{6}|(?:[3578]\\d|90)\\d{8}",,,,,,,[10],[6]],[,,"1534[0-24-8]\\d{5}",,,,"1534456789",,,,[6]],[,,"7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}",,,,"7797712345"],[,,"80(?:07(?:35|81)|8901)\\d{4}",,,,"8007354567"],[,,"(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}",,,,"9018105678"],[,,,,,,,,,[-1]],[,,"701511\\d{4}",,,,"7015115678"],[,,"56\\d{8}",,,,"5612345678"],"JE",44,"00","0",,,"([0-24-8]\\d{5})$|0","1534$1",,,,,[,,"76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}",,,,"7640123456"],,,[,,,,,,,,,[-1]],[,,"(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],JM:[,[,,"(?:[58]\\d\\d|658|900)\\d{7}",,,,,,,[10],[7]],[,,"8766060\\d{3}|(?:658(?:2(?:[0-8]\\d|9[0-46-9])|[3-9]\\d\\d)|876(?:52[35]|6(?:0[1-3579]|1[0235-9]|[23]\\d|40|5[06]|6[2-589]|7[0-25-9]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468])))\\d{4}",,,,"8765230123",,,,[7]],[,,"(?:658295|876(?:2(?:0[1-9]|[13-9]\\d|2[013-9])|[348]\\d\\d|5(?:0[1-9]|[1-9]\\d)|6(?:4[89]|6[67])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579])))\\d{4}",,,,"8762101234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"JM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"658|876",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],JO:[,[,,"(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}",,,,,,,[8,9]],[,,"87(?:000|90[01])\\d{3}|(?:2(?:6(?:2[0-35-9]|3[0-578]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[5-7][023])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2(?:[05]0|22)|3(?:00|33)|4(?:0[0-25]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[178]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[0239]))|87(?:20|7[078]|99))\\d{4}",,,,"62001234",,,[8]],[,,"7(?:[78][0-25-9]|9\\d)\\d{6}",,,,"790123456",,,[9]],[,,"80\\d{6}",,,,"80012345",,,[8]],[,,"9\\d{7}",,,,"90012345",,,[8]],[,,"85\\d{6}",,,,"85012345",,,[8]],[,,"70\\d{7}",,,,"700123456",,,[9]],[,,,,,,,,,[-1]],"JO",962,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["70"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,"74(?:66|77)\\d{5}",,,,"746612345",,,[9]],,,[,,,,,,,,,[-1]],[,,"8(?:10|8\\d)\\d{5}",,,,"88101234",,,[8]],,,[,,,,,,,,,[-1]]],JP:[,[,,"00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",,,,,,,[8,9,10,11,12,13,14,15,16,17]],[,,"(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|(?:2[2-9]|[36][1-9])\\d|4(?:[2-578]\\d|6[02-8]|9[2-59])|5(?:[2-589]\\d|6[1-9]|7[2-8])|7(?:[25-9]\\d|3[4-9]|4[02-9])|8(?:[2679]\\d|3[2-9]|4[5-9]|5[1-9]|8[03-9])|9(?:[2-58]\\d|[679][1-9]))\\d{6}",,,,"312345678",,,[9]],[,,"[7-9]0[1-9]\\d{7}",,,,"9012345678",,,[10]],[,,"00777(?:[01]|5\\d)\\d\\d|(?:00(?:7778|882[1245])|(?:120|800\\d)\\d\\d)\\d{4}|00(?:37|66|78)\\d{6,13}",,,,"120123456"],[,,"990\\d{6}",,,,"990123456",,,[9]],[,,,,,,,,,[-1]],[,,"60\\d{7}",,,,"601234567",,,[9]],[,,"50[1-9]\\d{7}",,,,"5012345678",,,[10]],"JP",81,"010","0",,,"(000[259]\\d{6})$|(?:(?:003768)0?)|0","$1",,,[[,"(\\d{4})(\\d{4})","$1-$2",["007","0077","00777","00777[01]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])","[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[289][2-9]|5[3-9]|7[2-4679]"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{3,4})","$1-$2-$3",["007","0077"]],[,"(\\d{4})(\\d{2})(\\d{4})","$1-$2-$3",["008"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[257-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{4})(\\d{4,5})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{5})(\\d{5,6})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{6})(\\d{6,7})","$1-$2-$3",["0"]]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])","[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[289][2-9]|5[3-9]|7[2-4679]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[257-9]"],"0$1"]],[,,"20\\d{8}",,,,"2012345678",,,[10]],,,[,,"00(?:777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d|00(?:37|66|78)\\d{6,13}"],[,,"570\\d{6}",,,,"570123456",,,[9]],,,[,,,,,,,,,[-1]]],KE:[,[,,"(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",,,,,,,[7,8,9,10]],[,,"(?:4[245]|5[1-79]|6[01457-9])\\d{5,7}|(?:4[136]|5[08]|62)\\d{7}|(?:[24]0|66)\\d{6,7}",,,,"202012345",,,[7,8,9]],[,,"(?:1(?:0[0-8]|1[0-7]|2[014]|30)|7\\d\\d)\\d{6}",,,,"712123456",,,[9]],[,,"800[02-8]\\d{5,6}",,,,"800223456",,,[9,10]],[,,"900[02-9]\\d{5}",,,,"900223456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KE",254,"000","0",,,"0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["[17]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KG:[,[,,"8\\d{9}|[235-9]\\d{8}",,,,,,,[9,10],[5,6]],[,,"312(?:5[0-79]\\d|9(?:[0-689]\\d|7[0-24-9]))\\d{3}|(?:3(?:1(?:2[0-46-8]|3[1-9]|47|[56]\\d)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}",,,,"312123456",,,[9],[5,6]],[,,"312(?:58\\d|973)\\d{3}|(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|600|7(?:[07]\\d|55)|88[08]|9(?:12|9[05-9]))\\d{6}",,,,"700123456",,,[9]],[,,"800\\d{6,7}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KG",996,"00","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["3(?:1[346]|[24-79])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-79]|88"],"0$1"],[,"(\\d{3})(\\d{3})(\\d)(\\d{2,3})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KH:[,[,,"1\\d{9}|[1-9]\\d{7,8}",,,,,,,[8,9,10],[6,7]],[,,"23(?:4(?:[2-4]|[56]\\d)|[568]\\d\\d)\\d{4}|23[236-9]\\d{5}|(?:2[4-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:(?:[237-9]|4[56]|5\\d)\\d{5}|6\\d{5,6})",,,,"23756789",,,[8,9],[6,7]],[,,"(?:(?:1[28]|3[18]|9[67])\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d))\\d{6}|(?:1\\d|9[0-57-9])\\d{6}|(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])48\\d{5}",,,,"91234567",,,[8,9]],[,,"1800(?:1\\d|2[019])\\d{4}",,,,"1800123456",,,[10]],[,,"1900(?:1\\d|2[09])\\d{4}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KH",855,"00[14-9]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KI:[,[,,"(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",,,,,,,[5,8]],[,,"(?:[24]\\d|3[1-9]|50|65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d\\d|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500))|8[0-5])\\d{3}",,,,"31234"],[,,"(?:6200[01]|7(?:310[1-9]|5(?:02[03-9]|12[0-47-9]|22[0-7]|[34](?:0[1-9]|8[02-9])|50[1-9])))\\d{3}|(?:63\\d\\d|7(?:(?:[0146-9]\\d|2[0-689])\\d|3(?:[02-9]\\d|1[1-9])|5(?:[0-2][013-9]|[34][1-79]|5[1-9]|[6-9]\\d)))\\d{4}",,,,"72001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"30(?:0[01]\\d\\d|12(?:11|20))\\d\\d",,,,"30010000",,,[8]],"KI",686,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KM:[,[,,"[3478]\\d{6}",,,,,,,[7],[4]],[,,"7[4-7]\\d{5}",,,,"7712345",,,,[4]],[,,"[34]\\d{6}",,,,"3212345"],[,,,,,,,,,[-1]],[,,"8\\d{6}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KM",269,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KN:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"869(?:2(?:29|36)|302|4(?:6[015-9]|70)|56[5-7])\\d{4}",,,,"8692361234",,,,[7]],[,,"869(?:48[89]|55[6-8]|66\\d|76[02-7])\\d{4}",,,,"8697652917",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KN",1,"011","1",,,"([2-7]\\d{6})$|1","869$1",,,,,[,,,,,,,,,[-1]],,"869",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KP:[,[,,"85\\d{6}|(?:19\\d|[2-7])\\d{7}",,,,,,,[8,10],[6,7]],[,,"(?:(?:195|2)\\d|3[19]|4[159]|5[37]|6[17]|7[39]|85)\\d{6}",,,,"21234567",,,,[6,7]],[,,"19[1-3]\\d{7}",,,,"1921234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KP",850,"00|99","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"238[02-9]\\d{4}|2(?:[0-24-9]\\d|3[0-79])\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KR:[,[,,"00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",,,,,,,[5,6,8,9,10,11,12,13,14],[3,4,7]],[,,"(?:2|3[1-3]|[46][1-4]|5[1-5])[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])1\\d{2,3}",,,,"22123456",,,[5,6,8,9,10],[3,4,7]],[,,"1(?:05(?:[0-8]\\d|9[0-6])|22[13]\\d)\\d{4,5}|1(?:0[0-46-9]|[16-9]\\d|2[013-9])\\d{6,7}",,,,"1020000000",,,[9,10]],[,,"00(?:308\\d{6,7}|798\\d{7,9})|(?:00368|[38]0)\\d{7}",,,,"801234567",,,[9,11,12,13,14]],[,,"60[2-9]\\d{6}",,,,"602345678",,,[9]],[,,,,,,,,,[-1]],[,,"50\\d{8,9}",,,,"5012345678",,,[10,11]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"KR",82,"00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","0",,,"0(8(?:[1-46-8]|5\\d\\d))?",,,,[[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11","1[016-9]114"],"0$1"],[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1"]],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[36]0|8"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3})(\\d{3})","$1 $2 $3",["003","0030"]],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3,4})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{5})(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["0"]]],[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1"]],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[36]0|8"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1","0$CC-$1"]],[,,"15\\d{7,8}",,,,"1523456789",,,[9,10]],,,[,,"00(?:3(?:08\\d{6,7}|68\\d{7})|798\\d{7,9})",,,,,,,[11,12,13,14]],[,,"1(?:5(?:22|33|44|66|77|88|99)|6(?:[07]0|44|6[0168]|88)|8(?:00|33|55|77|99))\\d{4}",,,,"15441234",,,[8]],,,[,,,,,,,,,[-1]]],KW:[,[,,"18\\d{5}|(?:[2569]\\d|41)\\d{6}",,,,,,,[7,8]],[,,"2(?:[23]\\d\\d|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7]))\\d{4}",,,,"22345678",,,[8]],[,,"(?:41\\d\\d|5(?:(?:[05]\\d|1[0-7]|6[56])\\d|2(?:22|5[25])|7(?:55|77)|88[58])|6(?:(?:0[034679]|5[015-9]|6\\d)\\d|1(?:00|11|6[16])|2[26]2|3[36]3|4[46]4|7(?:0[013-9]|[67]\\d)|8[68]8|9(?:[069]\\d|3[039]))|9(?:(?:[04679]\\d|8[057-9])\\d|1(?:1[01]|99)|2(?:00|2\\d)|3(?:00|3[03])|5(?:00|5\\d)))\\d{4}",,,,"50012345",,,[8]],[,,"18\\d{5}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KW",965,"00",,,,,,,,[[,"(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],[,"(\\d{3})(\\d{5})","$1 $2",["[245]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KY:[,[,,"(?:345|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"345(?:2(?:22|3[23]|44|66)|333|444|6(?:23|38|40)|7(?:30|4[35-79]|6[6-9]|77)|8(?:00|1[45]|4[89]|88)|9(?:14|4[035-9]))\\d{4}",,,,"3452221234",,,,[7]],[,,"345(?:32[1-9]|42[0-4]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|82[56]|9(?:1[679]|2[2-9]|3[06-9]|90))\\d{4}",,,,"3453231234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"(?:345976|900[2-9]\\d\\d)\\d{4}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KY",1,"011","1",,,"([2-9]\\d{6})$|1","345$1",,,,,[,,,,,,,,,[-1]],,"345",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KZ:[,[,,"(?:33622|8\\d{8})\\d{5}|[78]\\d{9}",,,,,,,[10,14],[5,6,7]],[,,"(?:33622|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9]|97)|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[2-4]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]|59))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[2-4]\\d|5[139])|4(?:2\\d|3[1-35-9]|59)|5(?:[23]\\d|4[0-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59))))\\d{5}",,,,"7123456789",,,[10],[5,6,7]],[,,"7(?:0[0-25-8]|47|6[0-4]|7[15-8]|85)\\d{7}",,,,"7710009998",,,[10]],[,,"8(?:00|108\\d{3})\\d{7}",,,,"8001234567"],[,,"809\\d{7}",,,,"8091234567",,,[10]],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567",,,[10]],[,,"751\\d{7}",,,,"7511234567",,,[10]],"KZ",7,"810","8",,,"8",,"8~10",,,,[,,,,,,,,,[-1]],,"33|7",[,,"751\\d{7}",,,,,,,[10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LA:[,[,,"[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}",,,,,,,[8,9,10],[6]],[,,"(?:2[13]|[35-7][14]|41|8[1468])\\d{6}",,,,"21212862",,,[8],[6]],[,,"208[78]\\d{6}|(?:20[23579]|30[24])\\d{7}",,,,"2023123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LA",856,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30[0135-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"30[0135-9]\\d{6}",,,,"301234567",,,[9]],,,[,,,,,,,,,[-1]]],LB:[,[,,"[27-9]\\d{7}|[13-9]\\d{6}",,,,,,,[7,8]],[,,"7(?:62|8[0-7]|9[04-9])\\d{4}|(?:[14-69]\\d|2(?:[14-69]\\d|[78][1-9])|7[2-57]|8[02-9])\\d{5}",,,,"1123456"],[,,"793(?:[01]\\d|2[0-4])\\d{3}|(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[12]))\\d{5}",,,,"71123456"],[,,,,,,,,,[-1]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,"80\\d{6}",,,,"80123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LB",961,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[27-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LC:[,[,,"(?:[58]\\d\\d|758|900)\\d{7}",,,,,,,[10],[7]],[,,"758(?:234|4(?:30|5\\d|6[2-9]|8[0-2])|57[0-2]|(?:63|75)8)\\d{4}",,,,"7584305678",,,,[7]],[,,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[0-3])|812)\\d{4}",,,,"7582845678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"LC",1,"011","1",,,"([2-8]\\d{6})$|1","758$1",,,,,[,,,,,,,,,[-1]],,"758",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LI:[,[,,"[68]\\d{8}|(?:[2378]\\d|90)\\d{5}",,,,,,,[7,9]],[,,"(?:2(?:01|1[27]|2[02]|3\\d|6[02-578]|96)|3(?:[24]0|33|7[0135-7]|8[048]|9[0269]))\\d{4}",,,,"2345678",,,[7]],[,,"(?:6(?:(?:4[5-9]|5[0-469])\\d|6(?:[024-6]\\d|[17]0|3[7-9]))\\d|7(?:[37-9]\\d|42|56))\\d{4}",,,,"660234567"],[,,"8002[28]\\d\\d|80(?:05\\d|9)\\d{4}",,,,"8002222"],[,,"90(?:02[258]|1(?:23|3[14])|66[136])\\d\\d",,,,"9002222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LI",423,"00","0",,,"(1001)|0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2379]|8(?:0[09]|7)","[2379]|8(?:0(?:02|9)|7)"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["69"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"870(?:28|87)\\d\\d",,,,"8702812",,,[7]],,,[,,"697(?:42|56|[78]\\d)\\d{4}",,,,"697861234",,,[9]]],LK:[,[,,"[1-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:12[2-9]|602|8[12]\\d|9(?:1\\d|22|9[245]))\\d{6}|(?:11|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}",,,,"112345678",,,,[7]],[,,"7(?:[0-25-8]\\d|4[0-4])\\d{6}",,,,"712345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LK",94,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"1973\\d{5}",,,,"197312345"],,,[,,,,,,,,,[-1]]],LR:[,[,,"(?:[245]\\d|33|77|88)\\d{7}|(?:2\\d|[4-6])\\d{6}",,,,,,,[7,8,9]],[,,"2\\d{7}",,,,"21234567",,,[8]],[,,"(?:(?:(?:22|33)0|555|(?:77|88)\\d)\\d|4(?:240|[67]))\\d{5}|[56]\\d{6}",,,,"770123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"332(?:02|[34]\\d)\\d{4}",,,,"332021234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LR",231,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["4[67]|[56]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-578]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LS:[,[,,"(?:[256]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"2\\d{7}",,,,"22123456"],[,,"[56]\\d{7}",,,,"50123456"],[,,"800[1256]\\d{4}",,,,"80021234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LS",266,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2568]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LT:[,[,,"(?:[3469]\\d|52|[78]0)\\d{6}",,,,,,,[8]],[,,"(?:3[1478]|4[124-6]|52)\\d{6}",,,,"31234567"],[,,"6\\d{7}",,,,"61234567"],[,,"80[02]\\d{5}",,,,"80012345"],[,,"9(?:0[0239]|10)\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,"70[05]\\d{5}",,,,"70012345"],[,,"[89]01\\d{5}",,,,"80123456"],"LT",370,"00","0",,,"[08]",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["52[0-7]"],"(0-$1)",,1],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"0 $1",,1],[,"(\\d{2})(\\d{6})","$1 $2",["37|4(?:[15]|6[1-8])"],"(0-$1)",,1],[,"(\\d{3})(\\d{5})","$1 $2",["[3-6]"],"(0-$1)",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70[67]\\d{5}",,,,"70712345"],,,[,,,,,,,,,[-1]]],LU:[,[,,"35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",,,,,,,[4,5,6,7,8,9,10,11]],[,,"(?:35[013-9]|80[2-9]|90[89])\\d{1,8}|(?:2[2-9]|3[0-46-9]|[457]\\d|8[13-9]|9[2-579])\\d{2,9}",,,,"27123456"],[,,"6(?:[269][18]|5[1568]|7[189]|81)\\d{6}",,,,"628123456",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90[015]\\d{5}",,,,"90012345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,,,,,,,,[-1]],[,,"20(?:1\\d{5}|[2-689]\\d{1,7})",,,,"20201234",,,[4,5,6,7,8,9,10]],"LU",352,"00",,,,"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)",,,,[[,"(\\d{2})(\\d{3})","$1 $2",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20[2-689]"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["80[01]|90[015]"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})","$1 $2 $3 $4",["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LV:[,[,,"(?:[268]\\d|90)\\d{6}",,,,,,,[8]],[,,"6\\d{7}",,,,"63123456"],[,,"2333[0-8]\\d{3}|2(?:[0-24-9]\\d\\d|3(?:0[07]|[14-9]\\d|2[02-9]|3[0-24-9]))\\d{4}",,,,"21234567"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,"81\\d{6}",,,,"81123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LV",371,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[269]|8[01]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LY:[,[,,"[2-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:2(?:0[56]|[1-6]\\d|7[124579]|8[124])|3(?:1\\d|2[2356])|4(?:[17]\\d|2[1-357]|5[2-4]|8[124])|5(?:[1347]\\d|2[1-469]|5[13-5]|8[1-4])|6(?:[1-479]\\d|5[2-57]|8[1-5])|7(?:[13]\\d|2[13-79])|8(?:[124]\\d|5[124]|84))\\d{6}",,,,"212345678",,,,[7]],[,,"9[1-6]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LY",218,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{7})","$1-$2",["[2-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MA:[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"5(?:2(?:[0-25-79]\\d|3[1-578]|4[02-46-8]|8[0235-7])|3(?:[0-47]\\d|5[02-9]|6[02-8]|8[014-9]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}",,,,"520123456"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-467]|5[0-3]|8[0-5]))\\d{6}",,,,"650123456"],[,,"80[0-7]\\d{6}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}",,,,"592401234"],"MA",212,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[45]"],"0$1"],[,"(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-46-9]|3[3-9]|9)|8(?:0[89]|92)"],"0$1"],[,"(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"],[,"(\\d{3})(\\d{6})","$1-$2",["[5-7]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MC:[,[,,"(?:[3489]|6\\d)\\d{7}",,,,,,,[8,9]],[,,"(?:870|9[2-47-9]\\d)\\d{5}",,,,"99123456",,,[8]],[,,"4(?:[469]\\d|5[1-9])\\d{5}|(?:3|6\\d)\\d{7}",,,,"612345678"],[,,"(?:800|90\\d)\\d{5}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MC",377,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["87"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[389]"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[389]"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"8[07]0\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MD:[,[,,"(?:[235-7]\\d|[89]0)\\d{6}",,,,,,,[8]],[,,"(?:(?:2[1-9]|3[1-79])\\d|5(?:33|5[257]))\\d{5}",,,,"22212345"],[,,"562\\d{5}|(?:6\\d|7[16-9])\\d{6}",,,,"62112345"],[,,"800\\d{5}",,,,"80012345"],[,,"90[056]\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,,,,,,,,[-1]],[,,"3[08]\\d{6}",,,,"30123456"],"MD",373,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"803\\d{5}",,,,"80312345"],,,[,,,,,,,,,[-1]]],ME:[,[,,"(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",,,,,,,[8,9],[6]],[,,"(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:0[2467]|1[24-7]|2[2-467]))\\d{5}",,,,"30234567",,,[8],[6]],[,,"6(?:[07-9]\\d|3[024]|6[0-25])\\d{5}",,,,"67622901",,,[8]],[,,"80(?:[0-2578]|9\\d)\\d{5}",,,,"80080002"],[,,"9(?:4[1568]|5[178])\\d{5}",,,,"94515151",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"78[1-49]\\d{5}",,,,"78108780",,,[8]],"ME",382,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"77[1-9]\\d{5}",,,,"77273012",,,[8]],,,[,,,,,,,,,[-1]]],MF:[,[,,"(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}",,,,,,,[9]],[,,"590(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)\\d{4}",,,,"590271234"],[,,"(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}",,,,"690001234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}",,,,"976012345"],"MF",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MG:[,[,,"[23]\\d{8}",,,,,,,[9],[7]],[,,"2072[29]\\d{4}|20(?:2\\d|4[47]|5[3467]|6[279]|7[356]|8[268]|9[2457])\\d{5}",,,,"202123456",,,,[7]],[,,"3[2-47-9]\\d{7}",,,,"321234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"22\\d{7}",,,,"221234567"],"MG",261,"00","0",,,"([24-9]\\d{6})$|0","20$1",,,[[,"(\\d{2})(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MH:[,[,,"329\\d{4}|(?:[256]\\d|45)\\d{5}",,,,,,,[7]],[,,"(?:247|528|625)\\d{4}",,,,"2471234"],[,,"(?:(?:23|54)5|329|45[35-8])\\d{4}",,,,"2351234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"635\\d{4}",,,,"6351234"],"MH",692,"011","1",,,"1",,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-6]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MK:[,[,,"[2-578]\\d{7}",,,,,,,[8],[6,7]],[,,"(?:(?:2(?:62|77)0|3444)\\d|4[56]440)\\d{3}|(?:34|4[357])700\\d{3}|(?:2(?:[0-3]\\d|5[0-578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}",,,,"22012345",,,,[6,7]],[,,"7(?:3555|(?:474|9[019]7)7)\\d{3}|7(?:[0-25-8]\\d\\d|3(?:[1-478]\\d|6[01])|4(?:2\\d|60|7[01578])|9(?:[2-4]\\d|5[01]|7[015]))\\d{4}",,,,"72345678"],[,,"800\\d{5}",,,,"80012345"],[,,"5\\d{7}",,,,"50012345"],[,,"8(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"80123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MK",389,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2|34[47]|4(?:[37]7|5[47]|64)"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ML:[,[,,"[24-9]\\d{7}",,,,,,,[8]],[,,"2(?:07[0-8]|12[67])\\d{4}|(?:2(?:02|1[4-689])|4(?:0[0-4]|4[1-59]))\\d{5}",,,,"20212345"],[,,"2(?:0(?:01|79)|17\\d)\\d{4}|(?:5[01]|[679]\\d|8[2-59])\\d{6}",,,,"65012345"],[,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ML",223,"00",,,,,,,,[[,"(\\d{4})","$1",["67[057-9]|74[045]","67(?:0[09]|[59]9|77|8[89])|74(?:0[02]|44|55)"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[,,,,,,,,,[-1]],,,[,,"80\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MM:[,[,,"1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",,,,,,,[6,7,8,9,10],[5]],[,,"(?:1(?:(?:12|[28]\\d|3[56]|7[3-6]|9[0-6])\\d|4(?:2[29]|7[0-2]|83)|6)|2(?:2(?:00|8[34])|4(?:0\\d|22|7[0-2]|83)|51\\d\\d)|4(?:2(?:2\\d\\d|48[013])|3(?:20\\d|4(?:70|83)|56)|420\\d|5(?:2\\d|470))|6(?:0(?:[23]|88\\d)|(?:124|[56]2\\d)\\d|2472|3(?:20\\d|470)|4(?:2[04]\\d|472)|7(?:3\\d\\d|4[67]0|8(?:[01459]\\d|8))))\\d{4}|5(?:2(?:2\\d{5,6}|47[02]\\d{4})|(?:3472|4(?:2(?:1|86)|470)|522\\d|6(?:20\\d|483)|7(?:20\\d|48[01])|8(?:20\\d|47[02])|9(?:20\\d|470))\\d{4})|7(?:(?:0470|4(?:25\\d|470)|5(?:202|470|96\\d))\\d{4}|1(?:20\\d{4,5}|4(?:70|83)\\d{4}))|8(?:1(?:2\\d{5,6}|4(?:10|7[01]\\d)\\d{3})|2(?:2\\d{5,6}|(?:320|490\\d)\\d{3})|(?:3(?:2\\d\\d|470)|4[24-7]|5(?:(?:2\\d|51)\\d|4(?:[1-35-9]\\d|4[0-57-9]))|6[23])\\d{4})|(?:1[2-6]\\d|4(?:2[24-8]|3[2-7]|[46][2-6]|5[3-5])|5(?:[27][2-8]|3[2-68]|4[24-8]|5[23]|6[2-4]|8[24-7]|9[2-7])|6(?:[19]20|42[03-6]|(?:52|7[45])\\d)|7(?:[04][24-8]|[15][2-7]|22|3[2-4])|8(?:1[2-689]|2[2-8]|(?:[35]2|64)\\d))\\d{4}|25\\d{5,6}|(?:2[2-9]|6(?:1[2356]|[24][2-6]|3[24-6]|5[2-4]|6[2-8]|7[235-7]|8[245]|9[24])|8(?:3[24]|5[245]))\\d{4}",,,,"1234567",,,[6,7,8,9],[5]],[,,"(?:17[01]|9(?:2(?:[0-4]|[56]\\d\\d)|(?:3(?:[0-36]|4\\d)|(?:6\\d|8[89]|9[4-8])\\d|7(?:3|40|[5-9]\\d))\\d|4(?:(?:[0245]\\d|[1379])\\d|88)|5[0-6])\\d)\\d{4}|9[69]1\\d{6}|9(?:[68]\\d|9[089])\\d{5}",,,,"92123456",,,[7,8,9,10]],[,,"80080(?:0[1-9]|2\\d)\\d{3}",,,,"8008001234",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1333\\d{4}",,,,"13331234",,,[8]],"MM",95,"00","0",,,"0",,,,[[,"(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["4(?:[2-46]|5[3-5])|5|6(?:[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-5]|(?:60|86)[23]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|452|678|86","[12]|452|6788|86"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-7]|8[1-35]"],"0$1"],[,"(\\d)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92"],"0$1"],[,"(\\d)(\\d{5})(\\d{4})","$1 $2 $3",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MN:[,[,,"[12]\\d{7,9}|[5-9]\\d{7}",,,,,,,[8,9,10],[4,5,6]],[,,"[12]2[1-3]\\d{5,6}|(?:(?:[12](?:1|27)|5[368])\\d\\d|7(?:0(?:[0-5]\\d|7[078]|80)|128))\\d{4}|[12](?:3[2-8]|4[2-68]|5[1-4689])\\d{6,7}",,,,"53123456",,,,[4,5,6]],[,,"(?:83[01]|92[039])\\d{5}|(?:5[05]|6[069]|72|8[015689]|9[013-9])\\d{6}",,,,"88123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"712[0-79]\\d{4}|7(?:1[013-9]|[5-9]\\d)\\d{5}",,,,"75123456",,,[8]],"MN",976,"001","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[5-9]"]],[,"(\\d{3})(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],[,"(\\d{4})(\\d{5,6})","$1 $2",["[12](?:27|3[2-8]|4[2-68]|5[1-4689])","[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["[12]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MO:[,[,,"0800\\d{3}|(?:28|[68]\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:28[2-9]|8(?:11|[2-57-9]\\d))\\d{5}",,,,"28212345",,,[8]],[,,"6800[0-79]\\d{3}|6(?:[235]\\d\\d|6(?:0[0-5]|[1-9]\\d)|8(?:0[1-9]|[14-8]\\d|2[5-9]|[39][0-4]))\\d{4}",,,,"66123456",,,[8]],[,,"0800\\d{3}",,,,"0800501",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MO",853,"00",,,,,,,,[[,"(\\d{4})(\\d{3})","$1 $2",["0"]],[,"(\\d{4})(\\d{4})","$1 $2",["[268]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MP:[,[,,"[58]\\d{9}|(?:67|90)0\\d{7}",,,,,,,[10],[7]],[,,"670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MP",1,"011","1",,,"([2-9]\\d{6})$|1","670$1",,1,,,[,,,,,,,,,[-1]],,"670",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MQ:[,[,,"(?:596\\d|7091)\\d{5}|(?:69|[89]\\d)\\d{7}",,,,,,,[9]],[,,"(?:596(?:[03-7]\\d|1[05]|2[7-9]|8[0-39]|9[04-9])|80[6-9]\\d\\d|9(?:477[6-9]|767[4589]))\\d{4}",,,,"596301234"],[,,"(?:69[67]\\d\\d|7091[0-3])\\d{4}",,,,"696201234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,"8[129]\\d{7}",,,,"810123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:397[0-3]|477[0-5]|76(?:6\\d|7[0-367]))\\d{4}",,,,"976612345"],"MQ",596,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-79]|8(?:0[6-9]|[36])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MR:[,[,,"(?:[2-4]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"(?:25[08]|35\\d|45[1-7])\\d{5}",,,,"35123456"],[,,"[2-4][0-46-9]\\d{6}",,,,"22123456"],[,,"800\\d{5}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MR",222,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MS:[,[,,"(?:[58]\\d\\d|664|900)\\d{7}",,,,,,,[10],[7]],[,,"6644(?:1[0-3]|91)\\d{4}",,,,"6644912345",,,,[7]],[,,"664(?:3(?:49|9[1-6])|49[2-6])\\d{4}",,,,"6644923456",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MS",1,"011","1",,,"([34]\\d{6})$|1","664$1",,,,,[,,,,,,,,,[-1]],,"664",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MT:[,[,,"3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"20(?:3[1-4]|6[059])\\d{4}|2(?:0[19]|[1-357]\\d|60)\\d{5}",,,,"21001234"],[,,"(?:7(?:210|[79]\\d\\d)|9(?:[29]\\d\\d|69[67]|8(?:1[1-3]|89|97)))\\d{4}",,,,"96961234"],[,,"800(?:02|[3467]\\d)\\d{3}",,,,"80071234"],[,,"5(?:0(?:0(?:37|43)|(?:6\\d|70|9[0168])\\d)|[12]\\d0[1-5])\\d{3}",,,,"50037123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3550\\d{4}",,,,"35501234"],"MT",356,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]],,[,,"7117\\d{4}",,,,"71171234"],,,[,,,,,,,,,[-1]],[,,"501\\d{5}",,,,"50112345"],,,[,,,,,,,,,[-1]]],MU:[,[,,"(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}",,,,,,,[7,8,10]],[,,"(?:2(?:[0346-8]\\d|1[0-7])|4(?:[013568]\\d|2[4-8]|71|90)|54(?:[3-5]\\d|71)|6\\d\\d|8(?:14|3[129]))\\d{4}",,,,"54480123",,,[7,8]],[,,"5(?:4(?:2[1-389]|7[1-9])|87[15-8])\\d{4}|(?:5(?:2[5-9]|4[3-689]|[57]\\d|8[0-689]|9[0-8])|7(?:0[0-4]|3[013]))\\d{5}",,,,"52512345",,,[8]],[,,"802\\d{7}|80[0-2]\\d{4}",,,,"8001234",,,[7,10]],[,,"30\\d{5}",,,,"3012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3(?:20|9\\d)\\d{4}",,,,"3201234",,,[7]],"MU",230,"0(?:0|[24-7]0|3[03])",,,,,,"020",,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-46]|8[013]"]],[,"(\\d{4})(\\d{4})","$1 $2",["[57]"]],[,"(\\d{5})(\\d{5})","$1 $2",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MV:[,[,,"(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",,,,,,,[7,10]],[,,"(?:3(?:0[0-4]|3[0-59])|6(?:[58][024689]|6[024-68]|7[02468]))\\d{4}",,,,"6701234",,,[7]],[,,"(?:46[46]|[79]\\d\\d)\\d{4}",,,,"7712345",,,[7]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MV",960,"0(?:0|19)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1-$2",["[34679]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"4(?:0[01]|50)\\d{4}",,,,"4001234",,,[7]],,,[,,,,,,,,,[-1]]],MW:[,[,,"(?:[1289]\\d|31|77)\\d{7}|1\\d{6}",,,,,,,[7,9]],[,,"(?:1[2-9]|2[12]\\d\\d)\\d{5}",,,,"1234567"],[,,"111\\d{6}|(?:31|77|[89][89])\\d{7}",,,,"991234567",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MW",265,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[137-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MX:[,[,,"[2-9]\\d{9}",,,,,,,[10],[7,8]],[,,"657[12]\\d{6}|(?:2(?:0[01]|2\\d|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[267][1-9]|3[1-8]|[45]\\d|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[0-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1346][1-9]|[27]\\d|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[0-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69]\\d|7[12]|8[1-8]))\\d{7}",,,,"2001234567",,,,[7,8]],[,,"657[12]\\d{6}|(?:2(?:2\\d|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[267][1-9]|3[1-8]|[45]\\d|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[0-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1346][1-9]|[27]\\d|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[0-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69]\\d|7[12]|8[1-8]))\\d{7}",,,,"2221234567",,,,[7,8]],[,,"8(?:00|88)\\d{7}",,,,"8001234567"],[,,"900\\d{7}",,,,"9001234567"],[,,"300\\d{7}",,,,"3001234567"],[,,"500\\d{7}",,,,"5001234567"],[,,,,,,,,,[-1]],"MX",52,"0[09]",,,,,,"00",,[[,"(\\d{5})","$1",["53"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"]]],[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MY:[,[,,"1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"4270\\d{4}|(?:3(?:2[0-36-9]|3[0-368]|4[0-278]|5[0-24-8]|6[0-467]|7[1246-9]|8\\d|9[0-57])\\d|4(?:2[0-689]|[3-79]\\d|8[1-35689])|5(?:2[0-589]|[3468]\\d|5[0-489]|7[1-9]|9[23])|6(?:2[2-9]|3[1357-9]|[46]\\d|5[0-6]|7[0-35-9]|85|9[015-8])|7(?:[2579]\\d|3[03-68]|4[0-8]|6[5-9]|8[0-35-9])|8(?:[24][2-8]|3[2-5]|5[2-7]|6[2-589]|7[2-578]|[89][2-9])|9(?:0[57]|13|[25-7]\\d|[3489][0-8]))\\d{5}",,,,"323856789",,,[8,9],[6,7]],[,,"1(?:1888[689]|4400|8(?:47|8[27])[0-4])\\d{4}|1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])|1(?:[1-5]\\d\\d|6(?:0[5-9]|[1-9]\\d)|7(?:[0-4]\\d|5[0-7]))|(?:[269]\\d|[37][1-9]|4[235-9])\\d|5(?:31|9\\d\\d)|8(?:1[23]|[236]\\d|4[06]|5(?:46|[7-9])|7[016-9]|8[01]|9[0-8]))\\d{5}",,,,"123456789",,,[9,10]],[,,"1[378]00\\d{6}",,,,"1300123456",,,[10]],[,,"1600\\d{6}",,,,"1600123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"15(?:4(?:6[0-4]\\d|8(?:0[125]|[17]\\d|21|3[01]|4[01589]|5[014]|6[02]))|6(?:32[0-6]|78\\d))\\d{4}",,,,"1546012345",,,[10]],"MY",60,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1-$2 $3",["1(?:[02469]|[378][1-9]|53)|8","1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3-$4",["1(?:[367]|80)"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2 $3",["1"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MZ:[,[,,"(?:2|8\\d)\\d{7}",,,,,,,[8,9]],[,,"2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}",,,,"21123456",,,[8]],[,,"8[2-79]\\d{7}",,,,"821234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MZ",258,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-79]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NA:[,[,,"[68]\\d{7,8}",,,,,,,[8,9]],[,,"64426\\d{3}|6(?:1(?:2[2-7]|3[01378]|4[0-4])|254|32[0237]|4(?:27|41|5[25])|52[236-8]|626|7(?:2[2-4]|30))\\d{4,5}|6(?:1(?:(?:0\\d|2[0189]|3[24-69]|4[5-9])\\d|17|69|7[014])|2(?:17|5[0-36-8]|69|70)|3(?:17|2[14-689]|34|6[289]|7[01]|81)|4(?:17|2[0-2]|4[06]|5[0137]|69|7[01])|5(?:17|2[0459]|69|7[01])|6(?:17|25|38|42|69|7[01])|7(?:17|2[569]|3[13]|6[89]|7[01]))\\d{4}",,,,"61221234"],[,,"(?:60|8[1245])\\d{7}",,,,"811234567",,,[9]],[,,"80\\d{7}",,,,"800123456",,,[9]],[,,"8701\\d{5}",,,,"870123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8(?:3\\d\\d|86)\\d{5}",,,,"88612345"],"NA",264,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["87"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NC:[,[,,"(?:050|[2-57-9]\\d\\d)\\d{3}",,,,,,,[6]],[,,"(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}",,,,"201234"],[,,"(?:[579]\\d|8[0-79])\\d{4}",,,,"751234"],[,,"050\\d{3}",,,,"050012"],[,,"36\\d{4}",,,,"366711"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NC",687,"00",,,,,,,,[[,"(\\d{3})","$1",["5[6-8]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[02-57-9]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[02-57-9]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NE:[,[,,"[027-9]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:20|3[1-8]|4[13-5]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",,,,"20201234"],[,,"(?:23|7[0467]|[89]\\d)\\d{6}",,,,"93123456"],[,,"08\\d{6}",,,,"08123456"],[,,"09\\d{6}",,,,"09123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NE",227,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["08"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[089]|2[013]|7[0467]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NF:[,[,,"[13]\\d{5}",,,,,,,[6],[5]],[,,"(?:1(?:06|17|28|39)|3[0-2]\\d)\\d{3}",,,,"106609",,,,[5]],[,,"(?:14|3[58])\\d{4}",,,,"381234",,,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NF",672,"00",,,,"([0-258]\\d{4})$","3$1",,,[[,"(\\d{2})(\\d{4})","$1 $2",["1[0-3]"]],[,"(\\d)(\\d{5})","$1 $2",["[13]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NG:[,[,,"38\\d{6}|[78]\\d{9,13}|(?:20|9\\d)\\d{8}",,,,,,,[8,10,11,12,13,14],[6,7]],[,,"(?:20(?:[1259]\\d|3[013-9]|4[1-8]|6[024-689]|7[1-79]|8[2-9])|38)\\d{6}",,,,"2033123456",,,[8,10],[6,7]],[,,"(?:702[0-24-9]|819[01])\\d{6}|(?:7(?:0[13-9]|[12]\\d)|8(?:0[1-9]|1[0-8])|9(?:0[1-9]|1[1-6]))\\d{7}",,,,"8021234567",,,[10]],[,,"800\\d{7,11}",,,,"80017591759",,,[10,11,12,13,14]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NG",234,"009","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["3"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[7-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["20[129]"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]"],"0$1"],[,"(\\d{3})(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"700\\d{7,11}",,,,"7001234567",,,[10,11,12,13,14]],,,[,,,,,,,,,[-1]]],NI:[,[,,"(?:1800|[25-8]\\d{3})\\d{4}",,,,,,,[8]],[,,"2\\d{7}",,,,"21234567"],[,,"(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}",,,,"81234567"],[,,"1800\\d{4}",,,,"18001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NI",505,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NL:[,[,,"(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}",,,,,,,[5,6,7,8,9,10,11]],[,,"(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d\\d)\\d{6}",,,,"101234567",,,[9]],[,,"(?:6[1-58]|970\\d)\\d{7}",,,,"612345678",,,[9,11]],[,,"800\\d{4,7}",,,,"8001234",,,[7,8,9,10]],[,,"90[069]\\d{4,7}",,,,"9061234",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:85|91)\\d{7}",,,,"851234567",,,[9]],"NL",31,"00","0",,,"0",,,,[[,"(\\d{4})","$1",["1[238]|[34]"]],[,"(\\d{2})(\\d{3,4})","$1 $2",["14"]],[,"(\\d{6})","$1",["1"]],[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-578]|91"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3",["9"],"0$1"]],[[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-578]|91"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3",["9"],"0$1"]],[,,"66\\d{7}",,,,"662345678",,,[9]],,,[,,"140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)\\d",,,,,,,[5,6]],[,,"140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|(?:140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)|8[478]\\d{6})\\d",,,,"14020",,,[5,6,9]],,,[,,,,,,,,,[-1]]],NO:[,[,,"(?:0|[2-9]\\d{3})\\d{4}",,,,,,,[5,8]],[,,"(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}",,,,"21234567",,,[8]],[,,"(?:4[015-8]|9\\d)\\d{6}",,,,"40612345",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"NO",47,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]"]]],,[,,,,,,,,,[-1]],1,"[02-689]|7[0-8]",[,,,,,,,,,[-1]],[,,"(?:0[235-9]|81(?:0(?:0[7-9]|1\\d)|5\\d\\d))\\d{3}",,,,"02000"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],NP:[,[,,"(?:1\\d|9)\\d{9}|[1-9]\\d{7}",,,,,,,[8,10,11],[6,7]],[,,"(?:1[0-6]\\d|99[02-6])\\d{5}|(?:2[13-79]|3[135-8]|4[146-9]|5[135-7]|6[13-9]|7[15-9]|8[1-46-9]|9[1-7])[2-6]\\d{5}",,,,"14567890",,,[8],[6,7]],[,,"9(?:00|6[0-3]|7[024-6]|8[0-24-68])\\d{7}",,,,"9841234567",,,[10]],[,,"1(?:66001|800\\d\\d)\\d{5}",,,,"16600101234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NP",977,"00","0",,,"0",,,,[[,"(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"],"0$1"],[,"(\\d{3})(\\d{7})","$1-$2",["9"]],[,"(\\d{4})(\\d{2})(\\d{5})","$1-$2-$3",["1"]]],[[,"(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"],"0$1"],[,"(\\d{3})(\\d{7})","$1-$2",["9"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NR:[,[,,"(?:222|444|(?:55|8\\d)\\d|666|777|999)\\d{4}",,,,,,,[7]],[,,"444\\d{4}",,,,"4441234"],[,,"(?:222|55[3-9]|666|777|8\\d\\d|999)\\d{4}",,,,"5551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NR",674,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[24-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NU:[,[,,"(?:[4-7]|888\\d)\\d{3}",,,,,,,[4,7]],[,,"[47]\\d{3}",,,,"7012",,,[4]],[,,"(?:[56]|888[1-9])\\d{3}",,,,"8884012"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NU",683,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NZ:[,[,,"[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}",,,,,,,[5,6,7,8,9,10]],[,,"240\\d{5}|(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}",,,,"32345678",,,[8],[7]],[,,"2(?:[0-27-9]\\d|6)\\d{6,7}|2(?:1\\d|75)\\d{5}",,,,"211234567",,,[8,9,10]],[,,"508\\d{6,7}|80\\d{6,8}",,,,"800123456",,,[8,9,10]],[,,"(?:1[13-57-9]\\d{5}|50(?:0[08]|30|66|77|88))\\d{3}|90\\d{6,8}",,,,"900123456",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,"70\\d{7}",,,,"701234567",,,[9]],[,,,,,,,,,[-1]],"NZ",64,"0(?:0|161)","0",,,"0",,"00",,[[,"(\\d{2})(\\d{3,8})","$1 $2",["8[1-79]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["50[036-8]|8|90","50(?:[0367]|88)|8|90"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["24|[346]|7[2-57-9]|9[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|[589]"],"0$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1|2[028]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:[169]|7[0-35-9])|7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"8(?:1[16-9]|22|3\\d|4[045]|5[459]|6[235-9]|7[0-3579]|90)\\d{2,7}",,,,"83012378"],,,[,,,,,,,,,[-1]]],OM:[,[,,"(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}",,,,,,,[7,8,9]],[,,"2[1-6]\\d{6}",,,,"23123456",,,[8]],[,,"(?:1505|90[1-9]\\d)\\d{4}|(?:7[126-9]|9[1-9])\\d{6}",,,,"92123456",,,[8]],[,,"8007\\d{4,5}|(?:500|800[05])\\d{4}",,,,"80071234"],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"OM",968,"00",,,,,,,,[[,"(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],[,"(\\d{2})(\\d{6})","$1 $2",["2"]],[,"(\\d{4})(\\d{4})","$1 $2",["[179]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PA:[,[,,"(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}",,,,,,,[7,8,10,11]],[,,"(?:1(?:0\\d|1[479]|2[37]|3[0137]|4[17]|5[05]|6[058]|7[0167]|8[2358]|9[1389])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[02-9])|3(?:[07-9]\\d|1[0-7]|2[0-5]|33|4[0-79]|5[0-35]|6[068])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[0156]|7[0-24-9]|8[5-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}",,,,"2001234",,,[7]],[,,"(?:1[16]1|21[89]|6\\d{3}|8(?:1[01]|7[23]))\\d{4}",,,,"61234567",,,[7,8]],[,,"800\\d{4,5}|(?:00800|800\\d)\\d{6}",,,,"8001234"],[,,"(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}",,,,"8601234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PA",507,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["[68]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PE:[,[,,"(?:[14-8]|9\\d)\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:(?:(?:4[34]|5[14])[0-8]|687)\\d|7(?:173|(?:3[0-8]|55)\\d)|8(?:10[05689]|6(?:0[06-9]|1[6-9]|29)|7(?:0[0569]|[56]0)))\\d{4}|(?:1[0-8]|4[12]|5[236]|6[1-7]|7[246]|8[2-4])\\d{6}",,,,"11234567",,,[8],[6,7]],[,,"9\\d{8}",,,,"912345678",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"805\\d{5}",,,,"80512345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,"80[24]\\d{5}",,,,"80212345",,,[8]],[,,,,,,,,,[-1]],"PE",51,"00|19(?:1[124]|77|90)00","0"," Anexo ",,"0",,"00",,[[,"(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["1"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[4-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PF:[,[,,"4\\d{5}(?:\\d{2})?|8\\d{7,8}",,,,,,,[6,8,9]],[,,"4(?:0[4-689]|9[4-68])\\d{5}",,,,"40412345",,,[8]],[,,"8[7-9]\\d{6}",,,,"87123456",,,[8]],[,,"80[0-5]\\d{6}",,,,"800012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"499\\d{5}",,,,"49901234",,,[8]],"PF",689,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4|8[7-9]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,,,,,,,,[-1]],,,[,,"44\\d{4}",,,,,,,[6]],[,,"44\\d{4}",,,,"440123",,,[6]],,,[,,,,,,,,,[-1]]],PG:[,[,,"(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",,,,,,,[7,8]],[,,"(?:(?:3[0-2]|4[257]|5[34]|9[78])\\d|64[1-9]|85[02-46-9])\\d{4}",,,,"3123456",,,[7]],[,,"(?:7\\d|8[1-38])\\d{6}",,,,"70123456",,,[8]],[,,"180\\d{4}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"2(?:0[0-57]|7[568])\\d{4}",,,,"2751234",,,[7]],"PG",675,"00|140[1-3]",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["18|[2-69]|85"]],[,"(\\d{4})(\\d{4})","$1 $2",["[78]"]]],,[,,"27[01]\\d{4}",,,,"2700123",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PH:[,[,,"(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}",,,,,,,[6,8,9,10,11,12,13],[4,5,7]],[,,"(?:(?:2[3-8]|3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578])\\d{3}|88(?:22\\d\\d|42))\\d{4}|(?:2|8[2-8]\\d\\d)\\d{5}",,,,"232345678",,,[6,8,9,10],[4,5,7]],[,,"(?:8(?:1[37]|9[5-8])|9(?:0[5-9]|1[0-24-9]|[235-7]\\d|4[2-9]|8[135-9]|9[1-9]))\\d{7}",,,,"9051234567",,,[10]],[,,"1800\\d{7,9}",,,,"180012345678",,,[11,12,13]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PH",63,"00","0",,,"0",,,,[[,"(\\d)(\\d{5})","$1 $2",["2"],"(0$1)"],[,"(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],[,"(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|8[2-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PK:[,[,,"122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",,,,,,,[8,9,10,11,12],[5,6,7]],[,,"(?:(?:21|42)[2-9]|58[126])\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6,7}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}",,,,"2123456789",,,[9,10],[5,6,7,8]],[,,"3(?:[0-247]\\d|3[0-79]|55|64)\\d{7}",,,,"3012345678",,,[10]],[,,"800\\d{5}(?:\\d{3})?",,,,"80012345",,,[8,11]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,"122\\d{6}",,,,"122044444",,,[9]],[,,,,,,,,,[-1]],"PK",92,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2,7})","$1 $2 $3",["[89]0"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["1"]],[,"(\\d{3})(\\d{6,7})","$1 $2",["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])","9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],"(0$1)"],[,"(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],[,"(\\d{5})(\\d{5})","$1 $2",["58"],"(0$1)"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[24-9]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:0[468]|[1-8])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}",,,,"21111825888",,,[11,12]],,,[,,,,,,,,,[-1]]],PL:[,[,,"(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}",,,,,,,[6,7,8,9,10]],[,,"47\\d{7}|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:[02-9]\\d{6}|1(?:[0-8]\\d{5}|9\\d{3}(?:\\d{2})?))",,,,"123456789",,,[7,9]],[,,"2131[89]\\d{4}|21(?:1[013-5]|2\\d|3[2-9])\\d{5}|(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}",,,,"512345678",,,[9]],[,,"800\\d{6,7}",,,,"800123456",,,[9,10]],[,,"70[01346-8]\\d{6}",,,,"701234567",,,[9]],[,,"801\\d{6}",,,,"801234567",,,[9]],[,,,,,,,,,[-1]],[,,"39\\d{7}",,,,"391234567",,,[9]],"PL",48,"00",,,,,,,,[[,"(\\d{5})","$1",["19"]],[,"(\\d{3})(\\d{3})","$1 $2",["11|20|64"]],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1","(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2-8]|[2-7]|8[1-79]|9[145]"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["8"]]],,[,,"64\\d{4,7}",,,,"641234567",,,[6,7,8,9]],,,[,,,,,,,,,[-1]],[,,"804\\d{6}",,,,"804123456",,,[9]],,,[,,,,,,,,,[-1]]],PM:[,[,,"[45]\\d{5}|(?:708|8\\d\\d)\\d{6}",,,,,,,[6,9]],[,,"(?:4[1-35-9]|5[0-47-9]|80[6-9]\\d\\d)\\d{4}",,,,"430123"],[,,"(?:4[02-489]|5[02-9]|708(?:4[0-5]|5[0-6]))\\d{4}",,,,"551234"],[,,"80[0-5]\\d{6}",,,,"800012345",,,[9]],[,,"8[129]\\d{7}",,,,"810123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PM",508,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PR:[,[,,"(?:[589]\\d\\d|787)\\d{7}",,,,,,,[10],[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"PR",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"787|939",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PS:[,[,,"[2489]2\\d{6}|(?:1\\d|5)\\d{8}",,,,,,,[8,9,10],[7]],[,,"(?:22[2-47-9]|42[45]|82[014-68]|92[3569])\\d{5}",,,,"22234567",,,[8],[7]],[,,"5[69]\\d{7}",,,,"599123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,,,,,,,,[-1]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PS",970,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["5"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PT:[,[,,"1693\\d{5}|(?:[26-9]\\d|30)\\d{7}",,,,,,,[9]],[,,"2(?:[12]\\d|3[1-689]|4[1-59]|[57][1-9]|6[1-35689]|8[1-69]|9[1256])\\d{6}",,,,"212345678"],[,,"6(?:[06]92(?:30|9\\d)|[35]92(?:[049]\\d|3[034]))\\d{3}|(?:(?:16|6[0356])93|9(?:[1-36]\\d\\d|480))\\d{5}",,,,"912345678"],[,,"80[02]\\d{6}",,,,"800123456"],[,,"(?:6(?:0[178]|4[68])\\d|76(?:0[1-57]|1[2-47]|2[237]))\\d{5}",,,,"760123456"],[,,"80(?:8\\d|9[1579])\\d{5}",,,,"808123456"],[,,"884[0-4689]\\d{5}",,,,"884123456"],[,,"30\\d{7}",,,,"301234567"],"PT",351,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["16|[236-9]"]]],,[,,"6(?:222\\d|8988)\\d{4}",,,,"622212345"],,,[,,,,,,,,,[-1]],[,,"70(?:38[01]|596|(?:7\\d|8[17])\\d)\\d{4}",,,,"707123456"],,,[,,"600\\d{6}|6[06]92(?:0\\d|3[349]|49)\\d{3}",,,,"600110000"]],PW:[,[,,"(?:[24-8]\\d\\d|345|900)\\d{4}",,,,,,,[7]],[,,"(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}",,,,"2771234"],[,,"(?:(?:46|83)[0-5]|(?:6[2-4689]|78)0)\\d{4}|(?:45|77|88)\\d{5}",,,,"6201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PW",680,"01[12]",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PY:[,[,,"59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}",,,,,,,[6,7,8,9,10,11],[5]],[,,"(?:[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36])\\d{5,7}|(?:2(?:2[4-68]|[4-68]\\d|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51|[67]\\d)|4(?:3[12]|5[13]|9[1-47])|5(?:[1-4]\\d|5[02-4])|6(?:3[1-3]|44|7[1-8])|7(?:4[0-4]|5\\d|6[1-578]|75|8[0-8])|858)\\d{5,6}",,,,"212345678",,,[7,8,9],[5,6]],[,,"9(?:51|6[129]|7[1-6]|8[1-7]|9[1-5])\\d{6}",,,,"961456789",,,[9]],[,,"9800\\d{5,7}",,,,"98000123456",,,[9,10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8700[0-4]\\d{4}",,,,"870012345",,,[9]],"PY",595,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{3})(\\d{4,5})","$1 $2",["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["87"]],[,"(\\d{3})(\\d{6})","$1 $2",["9(?:[5-79]|8[1-7])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[2-9]0\\d{4,7}",,,,"201234567",,,[6,7,8,9]],,,[,,,,,,,,,[-1]]],QA:[,[,,"800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}",,,,,,,[7,8,9,11]],[,,"4(?:1111|2022)\\d{3}|4(?:[04]\\d\\d|14[0-6]|999)\\d{4}",,,,"44123456",,,[8]],[,,"[35-7]\\d{7}",,,,"33123456",,,[8]],[,,"800\\d{4}|(?:0080[01]|800)\\d{6}",,,,"8001234",,,[7,9,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"QA",974,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["2[16]|8"]],[,"(\\d{4})(\\d{4})","$1 $2",["[3-7]"]]],,[,,"2[16]\\d{5}",,,,"2123456",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RE:[,[,,"709\\d{6}|(?:26|[689]\\d)\\d{7}",,,,,,,[9]],[,,"26(?:2\\d\\d|3(?:0\\d|1[0-6]))\\d{4}",,,,"262161234"],[,,"(?:69(?:2\\d\\d|3(?:[06][0-6]|1[013]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))|7092[0-3])\\d{4}",,,,"692123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89[1-37-9]\\d{6}",,,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"9(?:399[0-3]|479[0-6]|76(?:2[278]|3[0-37]))\\d{4}",,,,"939901234"],"RE",262,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[26-9]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RO:[,[,,"(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}",,,,,,,[6,9]],[,,"[23][13-6]\\d{7}|(?:2(?:19\\d|[3-6]\\d9)|31\\d\\d)\\d\\d",,,,"211234567"],[,,"(?:630|702)0\\d{5}|(?:6(?:00|2\\d)|7(?:0[013-9]|1[0-3]|[2-7]\\d|8[03-8]|9[0-39]))\\d{6}",,,,"712034567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[0136]\\d{6}",,,,"900123456",,,[9]],[,,"801\\d{6}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RO",40,"00","0"," int ",,"0",,,,[[,"(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],[,"(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:37\\d|80[578])\\d{6}",,,,"372123456",,,[9]],,,[,,,,,,,,,[-1]]],RS:[,[,,"38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",,,,,,,[6,7,8,9,10,11,12],[4,5]],[,,"(?:11[1-9]\\d|(?:2[389]|39)(?:0[2-9]|[2-9]\\d))\\d{3,8}|(?:1[02-9]|2[0-24-7]|3[0-8])[2-9]\\d{4,9}",,,,"10234567",,,[7,8,9,10,11,12],[4,5,6]],[,,"6(?:[0-689]|7\\d)\\d{6,7}",,,,"601234567",,,[8,9,10]],[,,"800\\d{3,9}",,,,"80012345"],[,,"(?:78\\d|90[0169])\\d{3,7}",,,,"90012345",,,[6,7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RS",381,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,9})","$1 $2",["(?:2[389]|39)0|[7-9]"],"0$1"],[,"(\\d{2})(\\d{5,10})","$1 $2",["[1-36]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7[06]\\d{4,10}",,,,"700123456"],,,[,,,,,,,,,[-1]]],RU:[,[,,"8\\d{13}|[347-9]\\d{9}",,,,,,,[10,14],[7]],[,,"(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",,,,"3011234567",,,[10],[7]],[,,"9\\d{9}",,,,"9123456789",,,[10]],[,,"8(?:0[04]|108\\d{3})\\d{7}",,,,"8001234567"],[,,"80[39]\\d{7}",,,,"8091234567",,,[10]],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567",,,[10]],[,,,,,,,,,[-1]],"RU",7,"810","8",,,"8",,"8~10",,[[,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3",["[0-79]"]],[,"(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",,1],[,"(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[349]|8(?:[02-7]|1[1-8])"],"8 ($1)",,1],[,"(\\d{4})(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3 $4",["8"],"8 ($1)"]],[[,"(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",,1],[,"(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[349]|8(?:[02-7]|1[1-8])"],"8 ($1)",,1],[,"(\\d{4})(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3 $4",["8"],"8 ($1)"]],[,,,,,,,,,[-1]],1,"3[04-689]|[489]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RW:[,[,,"(?:06|[27]\\d\\d|[89]00)\\d{6}",,,,,,,[8,9]],[,,"(?:06|2[23568]\\d)\\d{6}",,,,"250123456"],[,,"7[237-9]\\d{7}",,,,"720123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900\\d{6}",,,,"900123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RW",250,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SA:[,[,,"92\\d{7}|(?:[15]|8\\d)\\d{8}",,,,,,,[9,10],[7]],[,,"1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}",,,,"112345678",,,[9],[7]],[,,"579[01]\\d{5}|5(?:[013-689]\\d|7[0-8])\\d{6}",,,,"512345678",,,[9]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"925\\d{6}",,,,"925012345",,,[9]],[,,"920\\d{6}",,,,"920012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SA",966,"00","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["9"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["81"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"811\\d{7}",,,,"8110123456",,,[10]],,,[,,,,,,,,,[-1]]],SB:[,[,,"[6-9]\\d{6}|[1-6]\\d{4}",,,,,,,[5,7]],[,,"(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}",,,,"40123",,,[5]],[,,"48\\d{3}|(?:(?:6[89]|7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d{4}",,,,"7421234"],[,,"1[38]\\d{3}",,,,"18123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[12]\\d{3}",,,,"51123",,,[5]],"SB",677,"0[01]",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["6[89]|7|8[4-9]|9(?:[1-8]|9[0-8])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SC:[,[,,"(?:[2489]\\d|64)\\d{5}",,,,,,,[7]],[,,"4[2-46]\\d{5}",,,,"4217123"],[,,"2[125-8]\\d{5}",,,,"2510123"],[,,"800[08]\\d{3}",,,,"8000000"],[,,"85\\d{5}",,,,"8512345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"971\\d{4}|(?:64|95)\\d{5}",,,,"6412345"],"SC",248,"010|0[0-2]",,,,,,"00",,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]|9[57]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SD:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1(?:5\\d|8[35-7])\\d{6}",,,,"153123456"],[,,"(?:1[0-2]|9[0-3569])\\d{7}",,,,"911231234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SD",249,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[19]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SE:[,[,,"(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",,,,,,,[6,7,8,9,10,12]],[,,"(?:(?:[12][136]|3[356]|4[0246]|6[03]|8\\d)\\d|90[1-9])\\d{4,6}|(?:1(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)|2(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])|3(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])|4(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])|6(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])|9(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8]))\\d{5,6}",,,,"8123456",,,[7,8,9]],[,,"7[02369]\\d{7}",,,,"701234567",,,[9]],[,,"20\\d{4,7}",,,,"20123456",,,[6,7,8,9]],[,,"649\\d{6}|99[1-59]\\d{4}(?:\\d{3})?|9(?:00|39|44)[1-8]\\d{3,6}",,,,"9001234567",,,[7,8,9,10]],[,,"77[0-7]\\d{6}",,,,"771234567",,,[9]],[,,"75[1-8]\\d{6}",,,,"751234567",,,[9]],[,,,,,,,,,[-1]],"SE",46,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1"],[,"(\\d{3})(\\d{4})","$1-$2",["9(?:00|39|44|9)"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1"],[,"(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{3})","$1-$2 $3",["9(?:00|39|44)"],"0$1"],[,"(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["10|7"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["[26]"],"0$1"]],[[,"(\\d{2})(\\d{2,3})(\\d{2})","$1 $2 $3",["20"]],[,"(\\d{3})(\\d{4})","$1 $2",["9(?:00|39|44|9)"]],[,"(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"]],[,"(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1 $2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"]],[,"(\\d{3})(\\d{2,3})(\\d{3})","$1 $2 $3",["9(?:00|39|44)"]],[,"(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["10|7"]],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["8"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["9"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]]],[,,"74[02-9]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"10[1-8]\\d{6}",,,,"102345678",,,[9]],,,[,,"(?:25[245]|67[3-68])\\d{9}",,,,"254123456789",,,[12]]],SG:[,[,,"(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",,,,,,,[8,10,11]],[,,"662[0-24-9]\\d{4}|6(?:[0-578]\\d|6[013-57-9]|9[0-35-9])\\d{5}",,,,"61234567",,,[8]],[,,"896[0-8]\\d{4}|(?:8(?:0[1-9]|[1-8]\\d|9[0-5])|9[0-8]\\d)\\d{5}",,,,"81234567",,,[8]],[,,"(?:18|8)00\\d{7}",,,,"18001234567",,,[10,11]],[,,"1900\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:3[12]\\d|666)\\d{5}",,,,"31234567",,,[8]],"SG",65,"0[0-3]\\d",,,,,,,,[[,"(\\d{4,5})","$1",["1[013-9]|77","1(?:[013-8]|9(?:0[1-9]|[1-9]))|77"]],[,"(\\d{4})(\\d{4})","$1 $2",["[369]|8(?:0[1-9]|[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],[[,"(\\d{4})(\\d{4})","$1 $2",["[369]|8(?:0[1-9]|[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7000\\d{7}",,,,"70001234567",,,[11]],,,[,,,,,,,,,[-1]]],SH:[,[,,"(?:[256]\\d|8)\\d{3}",,,,,,,[4,5]],[,,"2(?:[0-57-9]\\d|6[4-9])\\d\\d",,,,"22158"],[,,"[56]\\d{4}",,,,"51234",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"262\\d\\d",,,,"26212",,,[5]],"SH",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],1,"[256]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SI:[,[,,"[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",,,,,,,[5,6,7,8]],[,,"(?:[1-357][2-8]|4[24-8])\\d{6}",,,,"12345678",,,[8],[7]],[,,"65(?:[178]\\d|5[56]|6[01])\\d{4}|(?:[37][01]|4[0139]|51|6[489])\\d{6}",,,,"31234567",,,[8]],[,,"80\\d{4,6}",,,,"80123456",,,[6,7,8]],[,,"89[1-3]\\d{2,5}|90\\d{4,6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:59\\d\\d|8(?:1(?:[67]\\d|8[0-589])|2(?:0\\d|2[0-37-9]|8[0-2489])|3[389]\\d))\\d{4}",,,,"59012345",,,[8]],"SI",386,"00|10(?:22|66|88|99)","0",,,"0",,"00",,[[,"(\\d{2})(\\d{3,6})","$1 $2",["8[09]|9"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["59|8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-57]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SJ:[,[,,"0\\d{4}|(?:[489]\\d|79)\\d{6}",,,,,,,[5,8]],[,,"79\\d{6}",,,,"79123456",,,[8]],[,,"(?:4[015-8]|9\\d)\\d{6}",,,,"41234567",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"SJ",47,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"79",[,,,,,,,,,[-1]],[,,"(?:0[235-9]|81(?:0(?:0[7-9]|1\\d)|5\\d\\d))\\d{3}",,,,"02000"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],SK:[,[,,"[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",,,,,,,[6,7,9]],[,,"(?:2(?:16|[2-9]\\d{3})|(?:(?:[3-5][1-8]\\d|819)\\d|601[1-5])\\d)\\d{4}|(?:2|[3-5][1-8])1[67]\\d{3}|[3-5][1-8]16\\d\\d",,,,"221234567"],[,,"909[1-9]\\d{5}|9(?:0[1-8]|1[0-24-9]|4[03-57-9]|5\\d)\\d{6}",,,,"912123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:00|[78]\\d)\\d{6}",,,,"900123456",,,[9]],[,,"8[5-9]\\d{7}",,,,"850123456",,,[9]],[,,,,,,,,,[-1]],[,,"6(?:02|5[0-4]|9[0-6])\\d{6}",,,,"690123456",,,[9]],"SK",421,"00","0",,,"0",,,,[[,"(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],[,"(\\d{4})(\\d{3})","$1 $2",["909","9090"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],[[,"(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],[,,"9090\\d{3}",,,,"9090123",,,[7]],,,[,,"9090\\d{3}|(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}",,,,,,,[7,9]],[,,"96\\d{7}",,,,"961234567",,,[9]],,,[,,,,,,,,,[-1]]],SL:[,[,,"(?:[237-9]\\d|66)\\d{6}",,,,,,,[8],[6]],[,,"22[2-4][2-9]\\d{4}",,,,"22221234",,,,[6]],[,,"(?:25|3[0-5]|66|7[1-9]|8[08]|9[09])\\d{6}",,,,"25123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SL",232,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",["[236-9]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SM:[,[,,"(?:0549|[5-7]\\d)\\d{6}",,,,,,,[8,10],[6]],[,,"0549(?:8[0157-9]|9\\d)\\d{4}",,,,"0549886377",,,[10],[6]],[,,"6[16]\\d{6}",,,,"66661212",,,[8]],[,,,,,,,,,[-1]],[,,"7[178]\\d{6}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[158]\\d{6}",,,,"58001110",,,[8]],"SM",378,"00",,,,"([89]\\d{5})$","0549$1",,,[[,"(\\d{6})","$1",["[89]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(\\d{4})(\\d{6})","$1 $2",["0"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(\\d{4})(\\d{6})","$1 $2",["0"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SN:[,[,,"(?:[378]\\d|93)\\d{7}",,,,,,,[9]],[,,"3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}",,,,"301012345"],[,,"7(?:(?:[06-8]\\d|[19]0|21)\\d|5(?:0[01]|[19]0|2[25]|3[356]|[4-7]\\d|8[35]))\\d{5}",,,,"701234567"],[,,"800\\d{6}",,,,"800123456"],[,,"88[4689]\\d{6}",,,,"884123456"],[,,"81[02468]\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"(?:3(?:392|9[01]\\d)\\d|93(?:3[13]0|929))\\d{4}",,,,"933301234"],"SN",221,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SO:[,[,,"[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}",,,,,,,[6,7,8,9]],[,,"(?:1\\d|2[0-79]|3[0-46-8]|4[0-7]|5[57-9])\\d{5}|(?:[134]\\d|8[125])\\d{4}",,,,"4012345",,,[6,7]],[,,"(?:(?:15|(?:3[59]|4[89]|6\\d|7[679]|8[08])\\d|9(?:0\\d|[2-9]))\\d|2(?:4\\d|8))\\d{5}|(?:[67]\\d\\d|904)\\d{5}",,,,"71123456",,,[7,8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SO",252,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})","$1 $2",["8[125]"]],[,"(\\d{6})","$1",["[134]"]],[,"(\\d)(\\d{6})","$1 $2",["[15]|2[0-79]|3[0-46-8]|4[0-7]"]],[,"(\\d)(\\d{7})","$1 $2",["(?:2|90)4|[67]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[348]|64|79|90"]],[,"(\\d{2})(\\d{5,7})","$1 $2",["1|28|6[0-35-9]|7[67]|9[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SR:[,[,,"(?:[2-5]|68|[78]\\d)\\d{5}",,,,,,,[6,7]],[,,"(?:2[1-3]|3[0-7]|(?:4|68)\\d|5[2-58])\\d{4}",,,,"211234"],[,,"(?:7[124-7]|8[1-9])\\d{5}",,,,"7412345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"56\\d{4}",,,,"561234",,,[6]],"SR",597,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],[,"(\\d{3})(\\d{3})","$1-$2",["[2-5]"]],[,"(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SS:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1[89]\\d{7}",,,,"181234567"],[,,"(?:12|9[1257-9])\\d{7}",,,,"977123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SS",211,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ST:[,[,,"(?:22|9\\d)\\d{5}",,,,,,,[7]],[,,"22\\d{5}",,,,"2221234"],[,,"900[5-9]\\d{3}|9(?:0[1-9]|[89]\\d)\\d{4}",,,,"9812345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ST",239,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SV:[,[,,"[267]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?",,,,,,,[7,8,11]],[,,"2(?:79(?:0[0347-9]|[1-9]\\d)|89(?:0[024589]|[1-9]\\d))\\d{3}|2(?:[1-69]\\d|[78][0-8])\\d{5}",,,,"21234567",,,[8]],[,,"[67]\\d{7}",,,,"70123456",,,[8]],[,,"800\\d{8}|80[01]\\d{4}",,,,"8001234",,,[7,11]],[,,"900\\d{4}(?:\\d{4})?",,,,"9001234",,,[7,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SV",503,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[89]"]],[,"(\\d{4})(\\d{4})","$1 $2",["[267]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SX:[,[,,"7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"7215(?:4[2-8]|8[239]|9[056])\\d{4}",,,,"7215425678",,,,[7]],[,,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",,,,"7215205678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"SX",1,"011","1",,,"(5\\d{6})$|1","721$1",,,,,[,,,,,,,,,[-1]],,"721",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SY:[,[,,"[1-359]\\d{8}|[1-5]\\d{7}",,,,,,,[8,9],[6,7]],[,,"21\\d{6,7}|(?:1(?:[14]\\d|[2356])|2[235]|3(?:[13]\\d|4)|4[134]|5[1-3])\\d{6}",,,,"112345678",,,,[6,7]],[,,"(?:50|9[1-689])\\d{7}",,,,"944567890",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SY",963,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-4]|5[1-3]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[59]"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SZ:[,[,,"0800\\d{4}|(?:[237]\\d|900)\\d{6}",,,,,,,[8,9]],[,,"[23][2-5]\\d{6}",,,,"22171234",,,[8]],[,,"7[6-9]\\d{6}",,,,"76123456",,,[8]],[,,"0800\\d{4}",,,,"08001234",,,[8]],[,,"900\\d{6}",,,,"900012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70\\d{6}",,,,"70012345",,,[8]],"SZ",268,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[0237]"]],[,"(\\d{5})(\\d{4})","$1 $2",["9"]]],,[,,,,,,,,,[-1]],,,[,,"0800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TA:[,[,,"8\\d{3}",,,,,,,[4]],[,,"8\\d{3}",,,,"8999"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TA",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TC:[,[,,"(?:[58]\\d\\d|649|900)\\d{7}",,,,,,,[10],[7]],[,,"649(?:266|712|9(?:4\\d|50))\\d{4}",,,,"6497121234",,,,[7]],[,,"649(?:2(?:3[129]|4[1-79])|3\\d\\d|4[34][1-3])\\d{4}",,,,"6492311234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"649(?:71[01]|966)\\d{4}",,,,"6497101234",,,,[7]],"TC",1,"011","1",,,"([2-479]\\d{6})$|1","649$1",,,,,[,,,,,,,,,[-1]],,"649",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TD:[,[,,"(?:22|[689]\\d|77)\\d{6}",,,,,,,[8]],[,,"22(?:[37-9]0|5[0-5]|6[89])\\d{4}",,,,"22501234"],[,,"(?:[69]\\d|77|8[56])\\d{6}",,,,"63012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TD",235,"00|16",,,,,,"00",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[26-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TG:[,[,,"[279]\\d{7}",,,,,,,[8]],[,,"2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}",,,,"22212345"],[,,"(?:7[0-29]|9[0-36-9])\\d{6}",,,,"90112345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TG",228,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TH:[,[,,"(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}",,,,,,,[8,9,10,13]],[,,"(?:1[0689]|2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}",,,,"21234567",,,[8]],[,,"67(?:1[0-8]|2[4-7])\\d{5}|(?:14|6[1-6]|[89]\\d)\\d{7}",,,,"812345678",,,[9]],[,,"(?:001800\\d|1800)\\d{6}",,,,"1800123456",,,[10,13]],[,,"1900\\d{6}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"6[08]\\d{7}",,,,"601234567",,,[9]],"TH",66,"00[1-9]","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TJ:[,[,,"[0-57-9]\\d{8}",,,,,,,[9],[3,5,6,7]],[,,"(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",,,,"372123456",,,,[3,5,6,7]],[,,"(?:33[03-9]|4(?:1[18]|4[02-479])|81[1-9])\\d{6}|(?:[09]\\d|1[0-27-9]|2[0-27]|[34]0|5[05]|7[01578]|8[078])\\d{7}",,,,"917123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TJ",992,"810",,,,,,"8~10",,[[,"(\\d{6})(\\d)(\\d{2})","$1 $2 $3",["331","3317"]],[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["44[02-479]|[34]7"]],[,"(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3(?:[1245]|3[12])"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[0-57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TK:[,[,,"[2-47]\\d{3,6}",,,,,,,[4,5,6,7]],[,,"(?:2[2-4]|[34]\\d)\\d{2,5}",,,,"3101"],[,,"7[2-4]\\d{2,5}",,,,"7290"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TK",690,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TL:[,[,,"7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",,,,,,,[7,8]],[,,"(?:2[1-5]|3[1-9]|4[1-4])\\d{5}",,,,"2112345",,,[7]],[,,"7[2-8]\\d{6}",,,,"77212345",,,[8]],[,,"80\\d{5}",,,,"8012345",,,[7]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,"70\\d{5}",,,,"7012345",,,[7]],[,,,,,,,,,[-1]],"TL",670,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],[,"(\\d{4})(\\d{4})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TM:[,[,,"(?:[1-6]\\d|71)\\d{6}",,,,,,,[8]],[,,"(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}",,,,"12345678"],[,,"(?:6\\d|71)\\d{6}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TM",993,"810","8",,,"8",,"8~10",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[67]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TN:[,[,,"[2-57-9]\\d{7}",,,,,,,[8]],[,,"81200\\d{3}|(?:3[0-2]|7\\d)\\d{6}",,,,"30010123"],[,,"3(?:001|[12]40)\\d{4}|(?:(?:[259]\\d|4[0-8])\\d|3(?:1[1-35]|6[0-4]|91))\\d{5}",,,,"20123456"],[,,"8010\\d{4}",,,,"80101234"],[,,"88\\d{6}",,,,"88123456"],[,,"8[12]10\\d{4}",,,,"81101234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TN",216,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TO:[,[,,"(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}",,,,,,,[5,7]],[,,"(?:2\\d|3[0-8]|4[0-4]|50|6[09]|7[0-24-69]|8[05])\\d{3}",,,,"20123",,,[5]],[,,"(?:5(?:4[0-5]|5[4-6])|6(?:[09]\\d|3[02]|8[15-9])|(?:7\\d|8[46-9])\\d|999)\\d{4}",,,,"7715123",,,[7]],[,,"0800\\d{3}",,,,"0800222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"55[0-37-9]\\d{4}",,,,"5510123",,,[7]],"TO",676,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1-$2",["[2-4]|50|6[09]|7[0-24-69]|8[05]"]],[,"(\\d{4})(\\d{3})","$1 $2",["0"]],[,"(\\d{3})(\\d{4})","$1 $2",["[5-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TR:[,[,,"4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}",,,,,,,[7,10,12,13]],[,,"(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}",,,,"2123456789",,,[10]],[,,"561(?:011|61\\d)\\d{4}|5(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{7}",,,,"5012345678",,,[10]],[,,"8(?:00\\d{7}(?:\\d{2,3})?|11\\d{7})",,,,"8001234567",,,[10,12,13]],[,,"(?:8[89]8|900)\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,"592(?:21[12]|461)\\d{4}",,,,"5922121234",,,[10]],[,,"850\\d{7}",,,,"8500123456",,,[10]],"TR",90,"00","0",,,"0",,,,[[,"(\\d{3})(\\d)(\\d{3})","$1 $2 $3",["444"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[01589]|90"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|61[06])","5(?:[0-59]|61[06]1)"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{6,7})","$1 $2 $3",["80"],"0$1",,1]],[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[01589]|90"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|61[06])","5(?:[0-59]|61[06]1)"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{6,7})","$1 $2 $3",["80"],"0$1",,1]],[,,"512\\d{7}",,,,"5123456789",,,[10]],,,[,,"(?:444|811\\d{3})\\d{4}",,,,,,,[7,10]],[,,"444\\d{4}",,,,"4441444",,,[7]],,,[,,,,,,,,,[-1]]],TT:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"868(?:2(?:01|1[5-9]|[23]\\d|4[0-2])|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",,,,"8682211234",,,,[7]],[,,"868(?:(?:2[5-9]|3\\d)\\d|4(?:3[0-6]|[6-9]\\d)|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}",,,,"8682911234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"TT",1,"011","1",,,"([2-46-8]\\d{6})$|1","868$1",,,,,[,,,,,,,,,[-1]],,"868",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"868619\\d{4}",,,,"8686191234",,,,[7]]],TV:[,[,,"(?:2|7\\d\\d|90)\\d{4}",,,,,,,[5,6,7]],[,,"2[02-9]\\d{3}",,,,"20123",,,[5]],[,,"(?:7[01]\\d|90)\\d{4}",,,,"901234",,,[6,7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TV",688,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2",["2"]],[,"(\\d{2})(\\d{4})","$1 $2",["90"]],[,"(\\d{2})(\\d{5})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TW:[,[,,"[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}",,,,,,,[7,8,9,10,11]],[,,"(?:2[2-8]\\d|370|55[01]|7[1-9])\\d{6}|4(?:(?:0(?:0[1-9]|[2-48]\\d)|1[023]\\d)\\d{4,5}|(?:[239]\\d\\d|4(?:0[56]|12|49))\\d{5})|6(?:[01]\\d{7}|4(?:0[56]|12|24|4[09])\\d{4,5})|8(?:(?:2(?:3\\d|4[0-269]|[578]0|66)|36[24-9]|90\\d\\d)\\d{4}|4(?:0[56]|12|24|4[09])\\d{4,5})|(?:2(?:2(?:0\\d\\d|4(?:0[68]|[249]0|3[0-467]|5[0-25-9]|6[0235689]))|(?:3(?:[09]\\d|1[0-4])|(?:4\\d|5[0-49]|6[0-29]|7[0-5])\\d)\\d)|(?:(?:3[2-9]|5[2-8]|6[0-35-79]|8[7-9])\\d\\d|4(?:2(?:[089]\\d|7[1-9])|(?:3[0-4]|[78]\\d|9[01])\\d))\\d)\\d{3}",,,,"221234567",,,[8,9]],[,,"(?:40001[0-2]|9[0-8]\\d{4})\\d{3}",,,,"912345678",,,[9]],[,,"80[0-79]\\d{6}|800\\d{5}",,,,"800123456",,,[8,9]],[,,"20(?:[013-9]\\d\\d|2)\\d{4}",,,,"203123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"99\\d{7}",,,,"990123456",,,[9]],[,,"7010(?:[0-2679]\\d|3[0-7]|8[0-5])\\d{5}|70\\d{8}",,,,"7012345678",,,[10,11]],"TW",886,"0(?:0[25-79]|19)","0","#",,"0",,,,[[,"(\\d{2})(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[258]0"],"0$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]","[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,5})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"50[0-46-9]\\d{6}",,,,"500123456",,,[9]],,,[,,,,,,,,,[-1]]],TZ:[,[,,"(?:[25-8]\\d|41|90)\\d{7}",,,,,,,[9]],[,,"2[2-8]\\d{7}",,,,"222345678"],[,,"(?:6[125-9]|7[13-9])\\d{7}",,,,"621234567"],[,,"80[08]\\d{6}",,,,"800123456"],[,,"90\\d{7}",,,,"900123456"],[,,"8(?:40|6[01])\\d{6}",,,,"840123456"],[,,,,,,,,,[-1]],[,,"41\\d{7}",,,,"412345678"],"TZ",255,"00[056]","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["5"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:8(?:[04]0|6[01])|90\\d)\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UA:[,[,,"[89]\\d{9}|[3-9]\\d{8}",,,,,,,[9,10],[5,6,7]],[,,"(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",,,,"311234567",,,[9],[5,6,7]],[,,"790\\d{6}|(?:39|50|6[36-8]|7[1-357]|9[1-9])\\d{7}",,,,"501234567",,,[9]],[,,"800[1-8]\\d{5,6}",,,,"800123456"],[,,"900[239]\\d{5,6}",,,,"900212345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"89[1-579]\\d{6}",,,,"891234567",,,[9]],"UA",380,"00","0",,,"0",,"0~0",,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]","6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])","3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|89|9[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UG:[,[,,"800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",,,,,,,[9],[5,6,7]],[,,"20(?:(?:240|30[67])\\d|6(?:00[0-2]|30[0-4]))\\d{3}|(?:20(?:[017]\\d|2[5-9]|3[1-4]|5[0-4]|6[15-9])|[34]\\d{3})\\d{5}",,,,"312345678",,,,[5,6,7]],[,,"72[48]0\\d{5}|7(?:[015-8]\\d|2[067]|36|4[0-8]|9[089])\\d{6}",,,,"712345678"],[,,"800[1-3]\\d{5}",,,,"800123456"],[,,"90[1-3]\\d{6}",,,,"901123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UG",256,"00[057]","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["202","2024"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["[27-9]|4(?:6[45]|[7-9])"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["[34]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],US:[,[,,"[2-9]\\d{9}|3\\d{6}",,,,,,,[10],[7]],[,,"(?:3052(?:0[0-8]|[1-9]\\d)|5056(?:[0-35-9]\\d|4[0-468]))\\d{4}|(?:2742|305[3-9]|472[247-9]|505[2-57-9]|983[2-47-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-47-9]|1[02-9]|2[0135-79]|3[0-24679]|4[167]|5[0-2]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[0168]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",,,,"2015550123",,,,[7]],[,,"(?:3052(?:0[0-8]|[1-9]\\d)|5056(?:[0-35-9]\\d|4[0-468]))\\d{4}|(?:2742|305[3-9]|472[247-9]|505[2-57-9]|983[2-47-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-47-9]|1[02-9]|2[0135-79]|3[0-24679]|4[167]|5[0-2]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[0168]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",,,,"2015550123",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"305209\\d{4}",,,,"3052090123",,,,[7]],"US",1,"011","1",,,"1",,,1,[[,"(\\d{3})(\\d{4})","$1-$2",["310"],,,1],[,"(\\d{3})(\\d{4})","$1-$2",["[24-9]|3(?:[02-9]|1[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],,,1]],[[,"(\\d{3})(\\d{4})","$1-$2",["310"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[2-9]"]]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UY:[,[,,"0004\\d{2,9}|[1249]\\d{7}|(?:[49]\\d|80)\\d{5}",,,,,,,[6,7,8,9,10,11,12,13]],[,,"(?:1(?:770|9(?:20|[89]7))|(?:2\\d|4[2-7])\\d\\d)\\d{4}",,,,"21231234",,,[8],[7]],[,,"9[1-9]\\d{6}",,,,"94231234",,,[8]],[,,"0004\\d{2,9}|(?:405|80[05])\\d{4}",,,,"8001234"],[,,"90[0-8]\\d{4}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UY",598,"0(?:0|1[3-9]\\d)","0"," int. ",,"0",,"00",,[[,"(\\d{3})(\\d{3,4})","$1 $2",["0"]],[,"(\\d{3})(\\d{4})","$1 $2",["[49]0|8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[124]"]],[,"(\\d{3})(\\d{3})(\\d{2,4})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UZ:[,[,,"(?:20|33|[5-9]\\d)\\d{7}",,,,,,,[9]],[,,"(?:55\\d\\d|6(?:1(?:22|3[124]|4[1-4]|5[1-3578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|[69]\\d\\d|7(?:[23]\\d|7[69]))|7(?:0(?:5[4-9]|6[0146]|7[124-6]|9[135-8])|[168]\\d\\d|2(?:22|3[13-57-9]|4[1-3579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|9(?:22|5[1-9])))\\d{5}",,,,"669050123"],[,,"(?:(?:[25]0|33|8[78]|9[0-57-9])\\d{3}|6(?:1(?:2(?:2[01]|98)|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:(?:11|7\\d)\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4]))|5(?:19[01]|2(?:27|9[26])|(?:30|59|7\\d)\\d)|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|(?:3[79]|9[0-3])\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79]))|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079])))|7(?:[07]\\d{3}|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|(?:33|9[4-6])\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078]))|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0-27]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[02569]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07]))))\\d{4}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UZ",998,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VA:[,[,,"0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",,,,,,,[6,7,8,9,10,11,12]],[,,"06698\\d{1,6}",,,,"0669812345",,,[6,7,8,9,10,11]],[,,"3[1-9]\\d{8}|3[2-9]\\d{7}",,,,"3123456789",,,[9,10]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"VA",39,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"06698",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"3[2-8]\\d{9,10}",,,,"33101234501",,,[11,12]]],VC:[,[,,"(?:[58]\\d\\d|784|900)\\d{7}",,,,,,,[10],[7]],[,,"784(?:266|3(?:6[6-9]|7\\d|8[0-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",,,,"7842661234",,,,[7]],[,,"784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4])|720)\\d{4}",,,,"7844301234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"78451[0-2]\\d{4}",,,,"7845101234",,,,[7]],"VC",1,"011","1",,,"([2-7]\\d{6})$|1","784$1",,,,,[,,,,,,,,,[-1]],,"784",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VE:[,[,,"[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}",,,,,,,[10],[7]],[,,"(?:2(?:12|3[457-9]|[467]\\d|[58][1-9]|9[1-6])|[4-6]00)\\d{7}",,,,"2121234567",,,,[7]],[,,"4(?:1[24-8]|2[246])\\d{7}",,,,"4121234567"],[,,"800\\d{7}",,,,"8001234567"],[,,"90[01]\\d{7}",,,,"9001234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VE",58,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{7})","$1-$2",["[24-689]"],"0$1","$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"501\\d{7}",,,,"5010123456",,,,[7]],,,[,,,,,,,,,[-1]]],VG:[,[,,"(?:284|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"284(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}",,,,"2842291234",,,,[7]],[,,"284(?:245|3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|9[69])|5(?:4[0-7]|68|9[69]))\\d{4}",,,,"2843001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VG",1,"011","1",,,"([2-578]\\d{6})$|1","284$1",,,,,[,,,,,,,,,[-1]],,"284",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VI:[,[,,"[58]\\d{9}|(?:34|90)0\\d{7}",,,,,,,[10],[7]],[,,"340(?:2(?:0\\d|10|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"340(?:2(?:0\\d|10|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VI",1,"011","1",,,"([2-9]\\d{6})$|1","340$1",,1,,,[,,,,,,,,,[-1]],,"340",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VN:[,[,,"[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",,,,,,,[7,8,9,10]],[,,"2(?:0[3-9]|1[0-689]|2[0-25-9]|[38][2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|9[0-4679])\\d{7}",,,,"2101234567",,,[10]],[,,"(?:5(?:2[238]|59)|89[6-9]|99[013-9])\\d{6}|(?:3\\d|5[1689]|7[06-9]|8[1-8]|9[0-8])\\d{7}",,,,"912345678",,,[9]],[,,"1800\\d{4,6}|12(?:0[13]|28)\\d{4}",,,,"1800123456",,,[8,9,10]],[,,"1900\\d{4,6}",,,,"1900123456",,,[8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"672\\d{6}",,,,"672012345",,,[9]],"VN",84,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[17]99"],"0$1",,1],[,"(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(\\d{3})(\\d{4,5})","$1 $2",["69"],"0$1",,1],[,"(\\d{4})(\\d{4,6})","$1 $2",["1"],,,1],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["6"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[357-9]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",,1]],[[,"(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(\\d{4})(\\d{4,6})","$1 $2",["1"],,,1],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["6"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[357-9]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"[17]99\\d{4}|69\\d{5,6}",,,,,,,[7,8]],[,,"(?:[17]99|80\\d)\\d{4}|69\\d{5,6}",,,,"1992000",,,[7,8]],,,[,,,,,,,,,[-1]]],VU:[,[,,"[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}",,,,,,,[5,7]],[,,"(?:38[0-8]|48[4-9])\\d\\d|(?:2[02-9]|3[4-7]|88)\\d{3}",,,,"22123",,,[5]],[,,"(?:[58]\\d|7[013-7])\\d{5}",,,,"5912345",,,[7]],[,,"81[18]\\d\\d",,,,"81123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:0[1-9]|1[01])\\d{4}",,,,"9010123",,,[7]],"VU",678,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:3[03]|900\\d)\\d{3}",,,,"30123"],,,[,,,,,,,,,[-1]]],WF:[,[,,"(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}",,,,,,,[6,9]],[,,"72\\d{4}",,,,"721234",,,[6]],[,,"(?:72|8[23])\\d{4}",,,,"821234",,,[6]],[,,"80[0-5]\\d{6}",,,,"800012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9[23]\\d{4}",,,,"921234",,,[6]],"WF",681,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[47-9]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"[48]0\\d{4}",,,,"401234",,,[6]]],WS:[,[,,"(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}",,,,,,,[5,6,7,10]],[,,"6[1-9]\\d{3}|(?:[2-5]|60)\\d{4}",,,,"22123",,,[5,6]],[,,"(?:7[1-35-7]|8(?:[3-7]|9\\d{3}))\\d{5}",,,,"7212345",,,[7,10]],[,,"800\\d{3}",,,,"800123",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WS",685,"0",,,,,,,,[[,"(\\d{5})","$1",["[2-5]|6[1-9]"]],[,"(\\d{3})(\\d{3,7})","$1 $2",["[68]"]],[,"(\\d{2})(\\d{5})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],XK:[,[,,"2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}",,,,,,,[8,9,10,11,12]],[,,"38\\d{6,10}|(?:2[89]|39)(?:0\\d{5,6}|[1-9]\\d{5})",,,,"28012345"],[,,"4[3-9]\\d{6}",,,,"43201234",,,[8]],[,,"800\\d{5}",,,,"80001234",,,[8]],[,,"900\\d{5}",,,,"90001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"XK",383,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-4]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2|39"],"0$1"],[,"(\\d{2})(\\d{7,10})","$1 $2",["3"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YE:[,[,,"(?:1|7\\d)\\d{7}|[1-7]\\d{6}",,,,,,,[7,8,9],[6]],[,,"78[0-7]\\d{4}|17\\d{6}|(?:[12][2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-6])\\d{5}",,,,"1234567",,,[7,8],[6]],[,,"7[01378]\\d{7}",,,,"712345678",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YE",967,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7(?:[24-6]|8[0-7])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YT:[,[,,"7093\\d{5}|(?:80|9\\d)\\d{7}|(?:26|63)9\\d{6}",,,,,,,[9]],[,,"269(?:0[0-467]|15|5[0-4]|6\\d|[78]0)\\d{4}",,,,"269601234"],[,,"(?:639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])|7093[5-7])\\d{4}",,,,"639012345"],[,,"80\\d{7}",,,,"801234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:39|47)8[01]|769\\d)\\d{4}",,,,"939801234"],"YT",262,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZA:[,[,,"[1-79]\\d{8}|8\\d{4,9}",,,,,,,[5,6,7,8,9,10]],[,,"(?:2(?:0330|4302)|52087)0\\d{3}|(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}",,,,"101234567",,,[9]],[,,"(?:1(?:3492[0-25]|4495[0235]|549(?:20|5[01]))|4[34]492[01])\\d{3}|8[1-4]\\d{3,7}|(?:2[27]|47|54)4950\\d{3}|(?:1(?:049[2-4]|9[12]\\d\\d)|(?:50[0-2]|6\\d\\d|7(?:[0-46-9]\\d|5[0-4]))\\d\\d|8(?:5\\d{3}|7(?:08[67]|158|28[5-9]|310)))\\d{4}|(?:1[6-8]|28|3[2-69]|4[025689]|5[36-8])4920\\d{3}|(?:12|[2-5]1)492\\d{4}",,,,"711234567",,,[5,6,7,8,9]],[,,"80\\d{7}",,,,"801234567",,,[9]],[,,"(?:86[2-9]|9[0-2]\\d)\\d{6}",,,,"862345678",,,[9]],[,,"860\\d{6}",,,,"860123456",,,[9]],[,,,,,,,,,[-1]],[,,"87(?:08[0-589]|15[0-79]|28[0-4]|31[1-9])\\d{4}|87(?:[02][0-79]|1[0-46-9]|3[02-9]|[4-9]\\d)\\d{5}",,,,"871234567",,,[9]],"ZA",27,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"861\\d{6,7}",,,,"861123456",,,[9,10]],,,[,,,,,,,,,[-1]]],ZM:[,[,,"800\\d{6}|(?:21|[579]\\d|63)\\d{7}",,,,,,,[9],[6]],[,,"21[1-8]\\d{6}",,,,"211234567",,,,[6]],[,,"(?:[59][5-8]|7[5-9])\\d{7}",,,,"955123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"63\\d{7}",,,,"630123456"],"ZM",260,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[1-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["[579]"],"0$1"]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["[579]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZW:[,[,,"2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",,,,,,,[5,6,7,8,9,10],[3,4]],[,,"(?:1(?:(?:3\\d|9)\\d|[4-8])|2(?:(?:(?:0(?:2[014]|5)|(?:2[0157]|31|84|9)\\d\\d|[56](?:[14]\\d\\d|20)|7(?:[089]|2[03]|[35]\\d\\d))\\d|4(?:2\\d\\d|8))\\d|1(?:2|[39]\\d{4}))|3(?:(?:123|(?:29\\d|92)\\d)\\d\\d|7(?:[19]|[56]\\d))|5(?:0|1[2-478]|26|[37]2|4(?:2\\d{3}|83)|5(?:25\\d\\d|[78])|[689]\\d)|6(?:(?:[16-8]21|28|52[013])\\d\\d|[39])|8(?:[1349]28|523)\\d\\d)\\d{3}|(?:4\\d\\d|9[2-9])\\d{4,5}|(?:(?:2(?:(?:(?:0|8[146])\\d|7[1-7])\\d|2(?:[278]\\d|92)|58(?:2\\d|3))|3(?:[26]|9\\d{3})|5(?:4\\d|5)\\d\\d)\\d|6(?:(?:(?:[0-246]|[78]\\d)\\d|37)\\d|5[2-8]))\\d\\d|(?:2(?:[569]\\d|8[2-57-9])|3(?:[013-59]\\d|8[37])|6[89]8)\\d{3}",,,,"1312345",,,,[3,4]],[,,"7(?:[1278]\\d|3[1-9])\\d{6}",,,,"712345678",,,[9]],[,,"80(?:[01]\\d|20|8[0-8])\\d{3}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"86(?:1[12]|22|30|44|55|77|8[368])\\d{6}",,,,"8686123456",,,[10]],"ZW",263,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],"0$1"],[,"(\\d)(\\d{3})(\\d{2,4})","$1 $2 $3",["[49]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["80"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2","2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)","2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],"0$1"],[,"(\\d{4})(\\d{6})","$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["29[013-9]|39|54"],"0$1"],[,"(\\d{4})(\\d{3,5})","$1 $2",["(?:25|54)8","258|5483"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],800:[,[,,"(?:00|[1-9]\\d)\\d{6}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:00|[1-9]\\d)\\d{6}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",800,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2",["\\d"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],808:[,[,,"[1-9]\\d{7}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[1-9]\\d{7}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",808,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2",["[1-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],870:[,[,,"7\\d{11}|[235-7]\\d{8}",,,,,,,[9,12]],[,,,,,,,,,[-1]],[,,"(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}",,,,"301234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"2\\d{8}",,,,"201234567",,,[9]],"001",870,,,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],878:[,[,,"10\\d{10}",,,,,,,[12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"10\\d{10}",,,,"101234567890"],"001",878,,,,,,,,1,[[,"(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],881:[,[,,"6\\d{9}|[0-36-9]\\d{8}",,,,,,,[9,10]],[,,,,,,,,,[-1]],[,,"6\\d{9}|[0-36-9]\\d{8}",,,,"612345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",881,,,,,,,,,[[,"(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[0-37-9]"]],[,"(\\d)(\\d{3})(\\d{5,6})","$1 $2 $3",["6"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],882:[,[,,"[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?",,,,,,,[7,8,9,10,11,12]],[,,,,,,,,,[-1]],[,,"342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|50\\d{3})\\d{7}",,,,"3421234",,,[7,8,9,10,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}",,,,"390123456789"],"001",882,,,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["16|342"]],[,"(\\d{2})(\\d{6})","$1 $2",["49"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["1[36]|9"]],[,"(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["16"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|23|3(?:[15]|4[57])|4|51"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["34"]],[,"(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["[1-35]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"348[57]\\d{7}",,,,"34851234567",,,[11]]],883:[,[,,"(?:[1-4]\\d|51)\\d{6,10}",,,,,,,[8,9,10,11,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}",,,,"510012345"],"001",883,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{2,8})","$1 $2 $3",["[14]|2[24-689]|3[02-689]|51[24-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["21"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["51[13]"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[235]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],888:[,[,,"\\d{11}",,,,,,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",888,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"\\d{11}",,,,"12345678901"],,,[,,,,,,,,,[-1]]],979:[,[,,"[1359]\\d{8}",,,,,,,[9],[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[1359]\\d{8}",,,,"123456789",,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",979,,,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[1359]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]]};function M(){this.g={}}M.h=void 0,M.g=function(){return M.h?M.h:M.h=new M};var g1={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uFF10":"0","\uFF11":"1","\uFF12":"2","\uFF13":"3","\uFF14":"4","\uFF15":"5","\uFF16":"6","\uFF17":"7","\uFF18":"8","\uFF19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9"},C2={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","+":"+","*":"*","#":"#"},y2={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uFF10":"0","\uFF11":"1","\uFF12":"2","\uFF13":"3","\uFF14":"4","\uFF15":"5","\uFF16":"6","\uFF17":"7","\uFF18":"8","\uFF19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9",A:"2",B:"2",C:"2",D:"3",E:"3",F:"3",G:"4",H:"4",I:"4",J:"5",K:"5",L:"5",M:"6",N:"6",O:"6",P:"7",Q:"7",R:"7",S:"7",T:"8",U:"8",V:"8",W:"9",X:"9",Y:"9",Z:"9"},v2=RegExp("[+\uFF0B]+"),X=RegExp("^[+\uFF0B]+"),x1=RegExp("([0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9])"),I2=RegExp("[+\uFF0B0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]"),_2=/[\\\/] *x/,b2=RegExp("[^0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9A-Za-z#]+$"),S2=/(?:.*?[A-Za-z]){3}.*/,L2=RegExp("^\\+([0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]|[\\-\\.\\(\\)]?)*[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]([0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]|[\\-\\.\\(\\)]?)*$"),w2=RegExp("^([A-Za-z0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]+((\\-)*[A-Za-z0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9])*\\.)*[A-Za-z]+((\\-)*[A-Za-z0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9])*\\.?$");function Y(d){return"([0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]{1,"+d+"})"}function R1(){return";ext="+Y("20")+"|[ \xA0\\t,]*(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|\u0434\u043E\u0431|anexo)[:\\.\uFF0E]?[ \xA0\\t,-]*"+(Y("20")+"#?|[ \xA0\\t,]*(?:[x\uFF58#\uFF03~\uFF5E]|int|\uFF49\uFF4E\uFF54)[:\\.\uFF0E]?[ \xA0\\t,-]*")+(Y("9")+"#?|[- ]+")+(Y("6")+"#|[ \xA0\\t]*(?:,{2}|;)[:\\.\uFF0E]?[ \xA0\\t,-]*")+(Y("15")+"#?|[ \xA0\\t]*(?:,)+[:\\.\uFF0E]?[ \xA0\\t,-]*")+(Y("9")+"#?")}var O1=new RegExp("(?:"+R1()+")$","i"),T2=new RegExp("^[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]{2}$|^[+\uFF0B]*(?:[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E*]*[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]){3,}[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E*A-Za-z0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]*(?:"+R1()+")?$","i"),E2=/(\$\d)/,N2=/^\(?\$1\)?$/;function k1(d){return 2>d.length?!1:B(T2,d)}function B1(d){return B(S2,d)?o1(d,y2):o1(d,g1)}function H1(d){var t=B1(d.toString());R(d),d.g(t)}function G1(d){return d!=null&&(G(d,9)!=1||D(d,9)[0]!=-1)}function o1(d,t){for(var $=new w,i,o=d.length,s=0;s<o;++s)i=d.charAt(s),i=t[i.toUpperCase()],i!=null&&$.g(i);return $.toString()}function U1(d){return d.length==0||N2.test(d)}function s1(d){return d!=null&&isNaN(d)&&d.toUpperCase()in P1}M.prototype.format=function(d,t){if(c(d,2)==0&&x(d,5)){var $=v(d,5);if(0<$.length)return $}$=v(d,1);var i=d1(d);if(t==0)return F1($,0,i,"");if(!($ in q))return i;var o=Q(this,$,t1($));d=x(d,3)&&c(d,3).length!=0?t==3?";ext="+c(d,3):x(o,13)?c(o,13)+v(d,3):" ext. "+v(d,3):"";d:{o=D(o,20).length==0||t==2?D(o,19):D(o,20);for(var s,a=o.length,h=0;h<a;++h){s=o[h];var C=G(s,3);if((C==0||i.search(c(s,3,C-1))==0)&&(C=new RegExp(c(s,1)),B(C,i))){o=s;break d}}o=null}return o!=null&&(a=o,o=v(a,2),s=new RegExp(c(a,1)),v(a,5),a=v(a,4),i=t==2&&a!=null&&0<a.length?i.replace(s,o.replace(E2,a)):i.replace(s,o),t==3&&(i=i.replace(RegExp("^[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]+"),""),i=i.replace(RegExp("[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]+","g"),"-"))),F1($,t,i,d)};function Q(d,t,$){return $=="001"?F(d,""+t):F(d,$)}function d1(d){if(!x(d,2))return"";var t=""+c(d,2);return x(d,4)&&c(d,4)&&0<v(d,8)?Array(v(d,8)+1).join("0")+t:t}function F1(d,t,$,i){switch(t){case 0:return"+"+d+$+i;case 1:return"+"+d+" "+$+i;case 3:return"tel:+"+d+"-"+$+i;default:return $+i}}function u1(d,t){switch(t){case 4:return c(d,5);case 3:return c(d,4);case 1:return c(d,3);case 0:case 2:return c(d,2);case 5:return c(d,6);case 6:return c(d,8);case 7:return c(d,7);case 8:return c(d,21);case 9:return c(d,25);case 10:return c(d,28);default:return c(d,1)}}function K1(d,t){var $=V1(d,t);return d=Q(d,v(t,1),$),d==null?-1:(t=d1(t),m1(t,d))}function m1(d,t){return O(d,c(t,1))?O(d,c(t,5))?4:O(d,c(t,4))?3:O(d,c(t,6))?5:O(d,c(t,8))?6:O(d,c(t,7))?7:O(d,c(t,21))?8:O(d,c(t,25))?9:O(d,c(t,28))?10:O(d,c(t,2))?c(t,18)||O(d,c(t,3))?2:0:!c(t,18)&&O(d,c(t,3))?1:-1:-1}function F(d,t){if(t==null)return null;t=t.toUpperCase();var $=d.g[t];if($==null){if($=P1[t],$==null)return null;$=new J().g(j.m(),$),d.g[t]=$}return $}function O(d,t){var $=d.length;return 0<G(t,9)&&D(t,9).indexOf($)==-1?!1:B(v(t,2),d)}function A2(d,t){var $=V1(d,t),i=v(t,1),o=Q(d,i,$);return o==null||$!="001"&&i!=j1(d,$)?o=!1:(d=d1(t),o=m1(d,o)!=-1),o}function V1(d,t){if(t==null)return null;var $=v(t,1);if($=q[$],$==null)d=null;else if($.length==1)d=$[0];else d:{t=d1(t);for(var i,o=$.length,s=0;s<o;s++){i=$[s];var a=F(d,i);if(x(a,23)){if(t.search(c(a,23))==0){d=i;break d}}else if(m1(t,a)!=-1){d=i;break d}}d=null}return d}function t1(d){return d=q[d],d==null?"ZZ":d[0]}function j1(d,t){if(d=F(d,t),d==null)throw Error("Invalid region code:"+t);return v(d,10)}function a1(d,t,$,i){var o=u1($,i),s=G(o,9)==0?D(c($,1),9):D(o,9);if(o=D(o,10),i==2)if(G1(u1($,0)))d=u1($,1),G1(d)&&(s=s.concat(G(d,9)==0?D(c($,1),9):D(d,9)),s.sort(),o.length==0?o=D(d,10):(o=o.concat(D(d,10)),o.sort()));else return a1(d,t,$,1);return s[0]==-1?5:(t=t.length,-1<o.indexOf(t)?4:($=s[0],$==t?0:$>t?2:s[s.length-1]<t?3:-1<s.indexOf(t,1)?0:5))}function l1(d,t,$){var i=d1(t);return t=v(t,1),t in q?(t=Q(d,t,t1(t)),a1(d,i,t,$)):1}function W1(d,t){if(d=d.toString(),d.length==0||d.charAt(0)=="0")return 0;for(var $,i=d.length,o=1;3>=o&&o<=i;++o)if($=parseInt(d.substring(0,o),10),$ in q)return t.g(d.substring(o)),$;return 0}function z1(d,t,$,i,o,s){if(t.length==0)return 0;t=new w(t);var a;$!=null&&(a=c($,11)),a==null&&(a="NonMatch");var h=t.toString();if(h.length==0)a=20;else if(X.test(h))h=h.replace(X,""),R(t),t.g(B1(h)),a=1;else{if(h=new RegExp(a),H1(t),a=t.toString(),a.search(h)==0){h=a.match(h)[0].length;var C=a.substring(h).match(x1);C&&C[1]!=null&&0<C[1].length&&o1(C[1],g1)=="0"?a=!1:(R(t),t.g(a.substring(h)),a=!0)}else a=!1;a=a?5:20}if(o&&A(s,6,a),a!=20){if(2>=t.h.length)throw Error("Phone number too short after IDD");if(d=W1(t,i),d!=0)return A(s,1,d),d;throw Error("Invalid country calling code")}return $!=null&&(a=v($,10),h=""+a,C=t.toString(),C.lastIndexOf(h,0)==0&&(h=new w(C.substring(h.length)),C=c($,1),C=new RegExp(v(C,2)),Z1(h,$,null),h=h.toString(),!B(C,t.toString())&&B(C,h)||a1(d,t.toString(),$,-1)==3))?(i.g(h),o&&A(s,6,10),A(s,1,a),a):(A(s,1,0),0)}function Z1(d,t,$){var i=d.toString(),o=i.length,s=c(t,15);if(o!=0&&s!=null&&s.length!=0){var a=new RegExp("^(?:"+s+")");if(o=a.exec(i)){s=new RegExp(v(c(t,1),2));var h=B(s,i),C=o.length-1;t=c(t,16),t==null||t.length==0||o[C]==null||o[C].length==0?(!h||B(s,i.substring(o[0].length)))&&($!=null&&0<C&&o[C]!=null&&$.g(o[1]),d.set(i.substring(o[0].length))):(i=i.replace(a,t),(!h||B(s,i))&&($!=null&&0<C&&$.g(o[1]),d.set(i)))}}}function W(d,t,$){if(!s1($)&&0<t.length&&t.charAt(0)!="+")throw Error("Invalid country calling code");return Y1(d,t,$,!0)}function Y1(d,t,$,i){if(t==null)throw Error("The string supplied did not seem to be a phone number");if(250<t.length)throw Error("The string supplied is too long to be a phone number");var o=new w,s=t.indexOf(";phone-context=");if(s===-1)s=null;else if(s+=15,s>=t.length)s="";else{var a=t.indexOf(";",s);s=a!==-1?t.substring(s,a):t.substring(s)}var h=s;if(h==null?a=!0:h.length===0?a=!1:(a=L2.exec(h),h=w2.exec(h),a=a!==null||h!==null),!a||(s!=null?(s.charAt(0)==="+"&&o.g(s),s=t.indexOf("tel:"),o.g(t.substring(0<=s?s+4:0,t.indexOf(";phone-context=")))):(s=o.g,a=t??"",h=a.search(I2),0<=h?(a=a.substring(h),a=a.replace(b2,""),h=a.search(_2),0<=h&&(a=a.substring(0,h))):a="",s.call(o,a)),s=o.toString(),a=s.indexOf(";isub="),0<a&&(R(o),o.g(s.substring(0,a))),!k1(o.toString())))throw Error("The string supplied did not seem to be a phone number");if(s=o.toString(),!(s1($)||s!=null&&0<s.length&&X.test(s)))throw Error("Invalid country calling code");s=new U,i&&A(s,5,t);d:{if(t=o.toString(),a=t.search(O1),0<=a&&k1(t.substring(0,a))){h=t.match(O1);for(var C=h.length,H=1;H<C;++H)if(h[H]!=null&&0<h[H].length){R(o),o.g(t.substring(0,a)),t=h[H];break d}}t=""}0<t.length&&A(s,3,t),a=F(d,$),t=new w,h=0,C=o.toString();try{h=z1(d,C,a,t,i,s)}catch(v1){if(v1.message=="Invalid country calling code"&&X.test(C)){if(C=C.replace(X,""),h=z1(d,C,a,t,i,s),h==0)throw v1}else throw v1}if(h!=0?(o=t1(h),o!=$&&(a=Q(d,h,o))):(H1(o),t.g(o.toString()),$!=null?(h=v(a,10),A(s,1,h)):i&&(delete s.h[6],s.g&&delete s.g[6])),2>t.h.length||(a!=null&&($=new w,o=new w(t.toString()),Z1(o,a,$),d=a1(d,o.toString(),a,-1),d!=2&&d!=4&&d!=5&&(t=o,i&&0<$.toString().length&&A(s,7,$.toString()))),i=t.toString(),d=i.length,2>d))throw Error("The string supplied is too short to be a phone number");if(17<d)throw Error("The string supplied is too long to be a phone number");if(1<i.length&&i.charAt(0)=="0"){for(A(s,4,!0),d=1;d<i.length-1&&i.charAt(d)=="0";)d++;d!=1&&A(s,8,d)}return A(s,2,parseInt(i,10)),s}function B(d,t){return!!((d=t.match(new RegExp("^(?:"+(typeof d=="string"?d:d.source)+")$","i")))&&d[0].length==t.length)}function M2(d){this.fa=RegExp("\u2008"),this.ja="",this.v=new w,this.da="",this.s=new w,this.ba=new w,this.u=!0,this.ea=this.ca=this.la=!1,this.ga=M.g(),this.$=0,this.h=new w,this.ha=!1,this.o="",this.g=new w,this.j=[],this.ka=d,this.l=X1(this,this.ka)}var J1=new j;A(J1,11,"NA");var D2=RegExp("^[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]*\\$1[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]*(\\$\\d[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]*)*$"),q1=/[- ]/;function X1(d,t){var $=d.ga;return t=s1(t)?j1($,t):0,d=F(d.ga,t1(t)),d??J1}function Q1(d){for(var t=d.j.length,$=0;$<t;++$){var i=d.j[$],o=v(i,1);if(d.da==o)return!1;var s=d,a=i,h=v(a,1);R(s.v);var C=s;a=v(a,2);var H="999999999999999".match(h)[0];if(H.length<C.g.h.length?C="":(C=H.replace(new RegExp(h,"g"),a),C=C.replace(RegExp("9","g"),"\u2008")),0<C.length?(s.v.g(C),s=!0):s=!1,s)return d.da=o,d.ha=q1.test(c(i,4)),d.$=0,!0}return d.u=!1}function d2(d,t){for(var $=[],i=t.length-3,o=d.j.length,s=0;s<o;++s){var a=d.j[s];G(a,3)==0?$.push(d.j[s]):(a=c(a,3,Math.min(i,G(a,3)-1)),t.search(a)==0&&$.push(d.j[s]))}d.j=$}function P2(d,t){d.s.g(t);var $=t;if(x1.test($)||d.s.h.length==1&&v2.test($)?(t=="+"?($=t,d.ba.g(t)):($=g1[t],d.ba.g($),d.g.g($)),t=$):(d.u=!1,d.la=!0),!d.u){if(!d.la){if(i2(d)){if(r2(d))return t2(d)}else if(0<d.o.length&&(t=d.g.toString(),R(d.g),d.g.g(d.o),d.g.g(t),t=d.h.toString(),$=t.lastIndexOf(d.o),R(d.h),d.h.g(t.substring(0,$))),d.o!=n2(d))return d.h.g(" "),t2(d)}return d.s.toString()}switch(d.ba.h.length){case 0:case 1:case 2:return d.s.toString();case 3:if(i2(d))d.ea=!0;else return d.o=n2(d),C1(d);default:return d.ea?(r2(d)&&(d.ea=!1),d.h.toString()+d.g.toString()):0<d.j.length?(t=o2(d,t),$=e2(d),0<$.length?$:(d2(d,d.g.toString()),Q1(d)?$2(d):d.u?h1(d,t):d.s.toString())):C1(d)}}function t2(d){return d.u=!0,d.ea=!1,d.j=[],d.$=0,R(d.v),d.da="",C1(d)}function e2(d){for(var t=d.g.toString(),$=d.j.length,i=0;i<$;++i){var o=d.j[i],s=v(o,1);if(new RegExp("^(?:"+s+")$").test(t)&&(d.ha=q1.test(c(o,4)),o=t.replace(new RegExp(s,"g"),c(o,2)),o=h1(d,o),o1(o,C2)==d.ba))return o}return""}function h1(d,t){var $=d.h.h.length;return d.ha&&0<$&&d.h.toString().charAt($-1)!=" "?d.h+" "+t:d.h+t}function C1(d){var t=d.g.toString();if(3<=t.length){for(var $=d.ca&&d.o.length==0&&0<G(d.l,20)?D(d.l,20):D(d.l,19),i=$.length,o=0;o<i;++o){var s=$[o];0<d.o.length&&U1(v(s,4))&&!c(s,6)&&!x(s,5)||(d.o.length!=0||d.ca||U1(v(s,4))||c(s,6))&&D2.test(v(s,2))&&d.j.push(s)}return d2(d,t),t=e2(d),0<t.length?t:Q1(d)?$2(d):d.s.toString()}return h1(d,t)}function $2(d){var t=d.g.toString(),$=t.length;if(0<$){for(var i="",o=0;o<$;o++)i=o2(d,t.charAt(o));return d.u?h1(d,i):d.s.toString()}return d.h.toString()}function n2(d){var t=d.g.toString(),$=0;if(c(d.l,10)!=1)var i=!1;else i=d.g.toString(),i=i.charAt(0)=="1"&&i.charAt(1)!="0"&&i.charAt(1)!="1";return i?($=1,d.h.g("1").g(" "),d.ca=!0):x(d.l,15)&&(i=new RegExp("^(?:"+c(d.l,15)+")"),i=t.match(i),i!=null&&i[0]!=null&&0<i[0].length&&(d.ca=!0,$=i[0].length,d.h.g(t.substring(0,$)))),R(d.g),d.g.g(t.substring($)),t.substring(0,$)}function i2(d){var t=d.ba.toString(),$=new RegExp("^(?:\\+|"+c(d.l,11)+")");return $=t.match($),$!=null&&$[0]!=null&&0<$[0].length?(d.ca=!0,$=$[0].length,R(d.g),d.g.g(t.substring($)),R(d.h),d.h.g(t.substring(0,$)),t.charAt(0)!="+"&&d.h.g(" "),!0):!1}function r2(d){if(d.g.h.length==0)return!1;var t=new w,$=W1(d.g,t);return $==0?!1:(R(d.g),d.g.g(t.toString()),t=t1($),t=="001"?d.l=F(d.ga,""+$):t!=d.ka&&(d.l=X1(d,t)),d.h.g(""+$).g(" "),d.o="",!0)}function o2(d,t){var $=d.v.toString();if(0<=$.substring(d.$).search(d.fa)){var i=$.search(d.fa);return t=$.replace(d.fa,t),R(d.v),d.v.g(t),d.$=i,t.substring(0,d.$+1)}return d.j.length==1&&(d.u=!1),d.da="",d.s.toString()}let y1={FIXED_LINE:0,MOBILE:1,FIXED_LINE_OR_MOBILE:2,TOLL_FREE:3,PREMIUM_RATE:4,SHARED_COST:5,VOIP:6,PERSONAL_NUMBER:7,PAGER:8,UAN:9,VOICEMAIL:10,UNKNOWN:-1};e("intlTelInputUtilsTemp",{}),e("intlTelInputUtilsTemp.formatNumberAsYouType",(d,t)=>{try{let $=d.replace(/[^+0-9]/g,""),i=new M2(t);t="";for(let o=0;o<$.length;o++)i.ja=P2(i,$.charAt(o)),t=i.ja;return t}catch{return d}}),e("intlTelInputUtilsTemp.formatNumber",(d,t,$)=>{try{let o=M.g(),s=W(o,d,t);var i=l1(o,s,-1);return i==0||i==4?o.format(s,typeof $>"u"?0:$):d}catch{return d}}),e("intlTelInputUtilsTemp.getExampleNumber",(d,t,$,i)=>{try{let C=M.g();d:{var o=C;if(s1(d)){var s=u1(F(o,d),$);try{if(x(s,6)){var a=c(s,6),h=Y1(o,a,d,!1);break d}}catch{}}h=null}return C.format(h,i?0:t?2:1)}catch{return""}}),e("intlTelInputUtilsTemp.getExtension",(d,t)=>{try{return c(W(M.g(),d,t),3)}catch{return""}}),e("intlTelInputUtilsTemp.getNumberType",(d,t)=>{try{let $=M.g(),i=W($,d,t);return K1($,i)}catch{return-99}}),e("intlTelInputUtilsTemp.getValidationError",(d,t)=>{if(!t)return 1;try{let $=M.g(),i=W($,d,t);return l1($,i,-1)}catch($){return $.message==="Invalid country calling code"?1:3>=d.length||$.message==="Phone number too short after IDD"||$.message==="The string supplied is too short to be a phone number"?2:$.message==="The string supplied is too long to be a phone number"?3:-99}}),e("intlTelInputUtilsTemp.isValidNumber",(d,t,$)=>{try{let i=M.g(),o=W(i,d,t),s=A2(i,o);if($){let a=$.map(h=>y1[h]);return s&&a.includes(K1(i,o))}return s}catch{return!1}}),e("intlTelInputUtilsTemp.isPossibleNumber",(d,t,$)=>{try{let i=M.g(),o=W(i,d,t);if($){$.includes("FIXED_LINE_OR_MOBILE")&&($.includes("MOBILE")||$.push("MOBILE"),$.includes("FIXED_LINE")||$.push("FIXED_LINE"));for(let s of $)if(l1(i,o,y1[s])===0)return!0;return!1}return l1(i,o,-1)===0}catch{return!1}}),e("intlTelInputUtilsTemp.getCoreNumber",(d,t)=>{try{return c(W(M.g(),d,t),2).toString()}catch{return""}}),e("intlTelInputUtilsTemp.numberFormat",{E164:0,INTERNATIONAL:1,NATIONAL:2,RFC3966:3}),e("intlTelInputUtilsTemp.numberType",y1),e("intlTelInputUtilsTemp.validationError",{IS_POSSIBLE:0,INVALID_COUNTRY_CODE:1,TOO_SHORT:2,TOO_LONG:3,IS_POSSIBLE_LOCAL_ONLY:4,INVALID_LENGTH:5})})();var z2=window.intlTelInputUtilsTemp;delete window.intlTelInputUtilsTemp;var f2=z2;S1.utils=f2;var Z2=S1;return H2(Y2);})();
 return factoryOutput.default;
}));
 
 var elementos_formulario_redirecionamento ={};
 function ValidacaoFormularios (formulario){
 var formulario_passos = formulario.find("fieldset");
 var formulario_validado = true;
 $(formulario_passos).each(function(formulario_passos_total){if (!ValidacaoPasso($(this))){formulario_validado = false;}});
 return formulario_validado;
}
 function ValidacaoPasso (passo){
 var passo_campo = passo.find(".gpc_campos");
 var passo_validado = true;
 if(passo_campo.length){
 $(passo_campo).each(function(passo_campo_total){
 if($(this).find(".gpc_campos-campo-opcao").length){if (!ValidacaoCampos($(this))){passo_validado = false;}}
 else{if (!ValidacaoCampos($(this).find(".gpc_campo"))){passo_validado = false;}}
});
}else{
 var caixa = passo.closest('.gm');
 var passo_campo = passo.find(".admin_campos");
 $(passo_campo).each(function(passo_campo_total){
 if (!ValidacaoCampos($(this).find(".admin_campo"))){
 passo_validado = false;
 
 if (caixa.length){
 if (passo.hasClass('passo_fechado')){
 
 var caixa_andamento = caixa.children('.gmf-andamento');
 var caixa_rodape = caixa.children('.gmf-rodape');
 var formulario = caixa.find('#formulario').find("fieldset.passo");
 var passos_atual = parseInt(passo.attr('passo'));
 var passos_quantidade = parseInt(caixa_andamento.attr('caixa_passos_quantidade'));
 
 $(formulario).each(function(formulario_passos_total){if ($(this).hasClass('passo_aberto')){$(this).removeClass('passo_aberto').addClass('passo_fechado');}});
 
 passo.removeClass('passo_fechado').addClass('passo_aberto');
 
 PosicionarGM(caixa.attr('id'), false);
 
 caixa_andamento.attr('caixa_passos_atual', passos_atual);
 caixa_andamento.children('.gmf-andamento-barra').css({'width':((100/passos_quantidade)*passos_atual)+'%'});
 
 if (passos_quantidade == (passos_atual+1)){
 if (!caixa_rodape.find('.passo_proximo').hasClass('esconder')){caixa_rodape.find('.passo_proximo').addClass('esconder');}
 if (caixa_rodape.find('#enviar_formulario_ajax').hasClass('esconder')){caixa_rodape.find('#enviar_formulario_ajax').removeClass('esconder');}
 }else{
 if (caixa_rodape.find('.passo_proximo').hasClass('esconder')){caixa_rodape.find('.passo_proximo').removeClass('esconder');}
 if (!caixa_rodape.find('#enviar_formulario_ajax').hasClass('esconder')){caixa_rodape.find('#enviar_formulario_ajax').addClass('esconder');}
 }
 if (passos_atual == 0){
 if (!caixa_rodape.find('.passo_anterior').hasClass('esconder')){caixa_rodape.find('.passo_anterior').addClass('esconder');}
 if (caixa_rodape.find('#cancelar_formulario_ajax').hasClass('esconder')){caixa_rodape.find('#cancelar_formulario_ajax').removeClass('esconder');}
 }else{
 if (caixa_rodape.find('.passo_anterior').hasClass('esconder')){caixa_rodape.find('.passo_anterior').removeClass('esconder');}
 if (!caixa_rodape.find('#cancelar_formulario_ajax').hasClass('esconder')){caixa_rodape.find('#cancelar_formulario_ajax').addClass('esconder');}
 }
}
}
}
});
}
 if(passo_validado){return true;}
 else{return false;}
}
 function ValidacaoCampos (campo){
 
 if($(campo).hasClass('admin_campo')){
 
 var campo_validado = true;
 var campo_auxiliar = campo.closest('.admin_campos').children('.admin_auxiliar');
 var campo_valor = campo.val();
 var campo_area = campo.closest('.admin_campos');
 if(campo_valor){
 if(campo_valor.substr(0,1) == ' '){
 campo.val(campo_valor.substr(1));
 campo_valor = campo_valor.substr(1);
}
 if(campo_valor.substr(-1) == ' '){
 campo.val(campo_valor.substr(0,(campo_valor.length-1)));
 campo_valor = campo_valor.substr(0,(campo_valor.length-1));
}
}
 
 if (campo_auxiliar.attr('html_original') == '' && campo_auxiliar.html() != ''){campo_auxiliar.attr('html_original',campo_auxiliar.html());}
 
 if (campo.hasClass('required') && campo_valor == ''){
 campo_validado = false;
 if (campo_auxiliar.html() != 'Campo obrigatório.' && campo_auxiliar.html() != ''){campo_auxiliar.attr('html_original',campo_auxiliar.html());}
 campo_auxiliar.html('Campo obrigatório.');
}else{if (campo_auxiliar.html() == 'Campo obrigatório.'){campo_auxiliar.html('');}}
 if ((campo.hasClass('email') || campo.hasClass('email_multiplo') || campo.hasClass('cemail')) && campo_validado && campo_valor != ''){
 campo_valor = campo_valor.replace(/ /g, '');
 campo.val(campo_valor);
 var filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if(campo.hasClass('email_multiplo')){
 var emails = campo_valor.split(',');
 for (var i = 0;i < emails.length;i++){
 if(!filtro.test(emails[i])){
 campo_validado = false;
 campo_auxiliar.html('Informe um endereço de e-mail válido.');
 break;
}
}
}else{
 if(!filtro.test(campo_valor)){
 campo_validado = false;
 campo_auxiliar.html('Informe um endereço de e-mail válido.');
}
}
}
 if(campo.attr('maxlength') != undefined && campo.hasClass('required_max_length') && campo_validado ){
 var total_caracteres = campo_valor.length, tamanho_maximo = campo.attr('maxlength');
 if(tamanho_maximo < total_caracteres){
 campo_validado = false;
 campo_auxiliar.html("Informe no máximo "+tamanho_maximo+" caracteres.");
}else{campo_validado = true;}
 if (campo_validado){
 campo_auxiliar.html('');
 if(campo_auxiliar.attr('html_original') == "Informe no máximo "+tamanho_maximo+" caracteres."){campo_auxiliar.attr('html_original','');}
}
}
 if((campo.attr('min') != undefined || campo.attr('max') != undefined) && campo.hasClass('required') && campo_validado ){
 campo_valor = parseInt(campo_valor);
 if(campo.attr('min') != undefined && campo.attr('max') != undefined){
 var minimo = parseInt(campo.attr('min')), maximo = parseInt(campo.attr('max'));
 if(campo_valor >= minimo && campo_valor <= maximo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.html("Informe um valor entre "+minimo+" e "+maximo+".");
}
}else if(campo.attr('min') != undefined){
 var minimo = parseInt(campo.attr('min'));
 if(campo_valor >= minimo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.html("Informe um valor maior ou igual a "+minimo+".");
}
}else if(campo.attr('max') != undefined){
 var maximo = parseInt(campo.attr('max'));
 if(campo_valor <= minimo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.html("Informe um valor menor ou igual a "+minimo+".");
}
}
 if (campo_validado){
 campo_auxiliar.html('');
 if(campo_auxiliar.attr('html_original') == "Informe um valor menor ou igual a "+minimo+"." || campo_auxiliar.attr('html_original') == "Informe um valor maior ou igual a "+minimo+"."|| campo_auxiliar.attr('html_original') == "Informe um valor entre "+minimo+" e "+maximo+"."){campo_auxiliar.attr('html_original','');}
}
}
 if (campo.hasClass('required_travar_zero') && (campo_valor == 0 || campo_valor == '') && campo_validado){campo_validado = false;campo_auxiliar.html('Campo obrigatório.');}
 if (campo.hasClass('required_telefone_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarTelefone(campo_valor);
 if(campo_validado == false){campo_auxiliar.html('Informe um número de telefone válido.');}
 else{campo_auxiliar.html('');}
}
 if (campo.hasClass('required_cpf_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarCpf(campo_valor);
 if(campo_validado == false){campo_auxiliar.html('Informe um CPF válido.');}
 else{campo_auxiliar.html('');}
}
 if (campo.hasClass('required_cnpj_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarCnpj(campo_valor);
 if(campo_validado == false){campo_auxiliar.html('Informe um CNPJ válido.');}
 else{campo_auxiliar.html('');}
}
 
 if (campo_validado){
 if (campo_auxiliar.attr('html_original') == 'Campo obrigatório.' || campo_auxiliar.attr('html_original') == 'Link da página informado não é válido.' || campo_auxiliar.attr('html_original') == 'Informe seu domínio no formato do exemplo abaixo.' || campo_auxiliar.attr('html_original') == 'Informe um endereço de e-mail válido.' || campo_auxiliar.attr('html_original') == 'Cartão informado está expirado.' || campo_auxiliar.attr('html_original') == 'Informe um número de telefone válido.' || campo_auxiliar.attr('html_original') == 'Informe um CPF válido.' || campo_auxiliar.attr('html_original') == 'Informe um CNPJ válido.' || campo_auxiliar.attr('html_original') == 'Bandeiras aceitas Visa, MasterCard, Elo e Diners' || campo_auxiliar.attr('html_original') == 'Número do cartão inválido' || campo_auxiliar.attr('html_original') == 'Informe um número de cartão' || campo_auxiliar.attr('html_original') == 'Senha informada não confere com a utilizada.' || campo_auxiliar.attr('html_original') == 'Link de acesso em uso, tente outro.' || campo_auxiliar.attr('html_original') == 'Já cadastrado' || campo_auxiliar.attr('html_original') == 'Informe seu domínio no formato do exemplo abaixo.' || campo_auxiliar.attr('html_original') == 'Subdomínio informado já foi cadastrado.'){campo_auxiliar.attr({'html_original':''});}
 if (campo_area.hasClass('admin_campos-error')){campo_area.removeClass('admin_campos-error');}
 if (campo_auxiliar.attr('html_original') != undefined && campo_auxiliar.attr('html_original') != ''){campo_auxiliar.html(campo_auxiliar.attr('html_original'));bindEvents();}
 else{campo_auxiliar.html('');}
 return true;
}else{
 if (!campo_area.hasClass('admin_campos-error')){campo_area.addClass('admin_campos-error');}
 return false;
}
}else{
 var campo_validado = true;
 var campo_valor = '';
 if($(campo).hasClass('gpc_campos-check') || $(campo).hasClass('gpc_campos-radio') || $(campo).hasClass('gpc_campos-consentimento_lgpd')){
 if(campo.find('.gpc_campos-erro').length == 0){campo.append('<div class="gpc_campos-erro icone_bold-aviso gtt-esquerda" data-gtt=""></div>');bindEvents();}
 var campo_auxiliar = campo.find('.gpc_campos-erro');
 $(campo).find('input').each(function(campo_atual){if($(this).prop('checked')){campo_valor = $(this).val();}});
}else{
 if(campo.closest('.gpc_campos-campo').find('.gpc_campos-erro').length == 0){campo.after('<div class="gpc_campos-erro icone_bold-aviso gtt-esquerda" data-gtt=""></div>');bindEvents();}
 var campo_auxiliar = campo.closest('.gpc_campos').find('.gpc_campos-erro');
 campo_valor = campo.val();
 if($(campo).closest('.gpc_campos').hasClass('gpc_campos-select')){let opcoes = $(campo).find('option');for (var i = 0;i < opcoes.length;i++){if(campo_valor == opcoes[i].value && opcoes[i].disabled){campo_valor = '';}}}
}
 if(campo_valor == null){campo_valor = '';}
 var campo_area = campo.closest('.gpc_campos');
 if(campo_valor && !$(campo).hasClass('gpc_campos-check') && !$(campo).hasClass('gpc_campos-radio') && !$(campo).hasClass('gpc_campos-consentimento_lgpd') && !$(campo).hasClass('gpc_campos-select')){
 campo_valor = campo_valor.trim(true);
}
 
 if ((campo_auxiliar.attr('data-gtt') == '' || campo_auxiliar.attr('data-gtt') == undefined) && campo_auxiliar.html() != ''){campo_auxiliar.attr('data-gtt','');}
 
 if($(campo).hasClass('gpc_campos-check') || $(campo).hasClass('gpc_campos-radio') || $(campo).hasClass('gpc_campos-consentimento_lgpd')){
 if (campo.find('em').length && campo_valor == ''){
 campo_validado = false;
 if (campo_auxiliar.attr('data-gtt') != 'Campo obrigatório.' && campo_auxiliar.attr('data-gtt') != '' && campo_auxiliar.attr('data-gtt') != undefined){campo_auxiliar.attr({'data-gtt':''});}
 campo_auxiliar.attr({'data-gtt':'Campo obrigatório.'});
}else{if (campo_auxiliar.attr('data-gtt') == 'Campo obrigatório.'){campo_auxiliar.attr({'data-gtt':''});}}
}else{
 if (campo.hasClass('obrigatorio') && campo_valor == ''){
 campo_validado = false;
 if (campo_auxiliar.attr('data-gtt') != 'Campo obrigatório.' && campo_auxiliar.attr('data-gtt') != '' && campo_auxiliar.attr('data-gtt') != undefined){campo_auxiliar.attr({'data-gtt':''});}
 campo_auxiliar.attr({'data-gtt':'Campo obrigatório.'});
}else{if (campo_auxiliar.attr('data-gtt') == 'Campo obrigatório.'){campo_auxiliar.attr({'data-gtt':''});}}
 if ((campo.hasClass('email') || campo.hasClass('email_multiplo') || campo.hasClass('cemail')) && campo_validado && campo_valor != ''){
 campo_valor = campo_valor.replace(/ /g, '');
 campo.val(campo_valor);
 var filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if(campo.hasClass('email_multiplo')){
 var emails = campo_valor.split(',');
 for (var i = 0;i < emails.length;i++){
 if(!filtro.test(emails[i])){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':'Informe um endereço de e-mail válido.'});
 break;
 }
}
}else{
 if(!filtro.test(campo_valor)){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':'Informe um endereço de e-mail válido.'});
}
}
}
 if(campo.attr('maxlength') != undefined && campo.hasClass('required_max_length') && campo_validado ){
 var total_caracteres = campo_valor.length, tamanho_maximo = campo.attr('maxlength');
 if(tamanho_maximo < total_caracteres){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':"Informe no máximo "+tamanho_maximo+" caracteres."});
}else{campo_validado = true;}
}
 if((campo.attr('min') != undefined || campo.attr('max') != undefined) && campo.hasClass('required') && campo_validado ){
 campo_valor = parseInt(campo_valor);
 if(campo.attr('min') != undefined && campo.attr('max') != undefined){
 var minimo = parseInt(campo.attr('min')), maximo = parseInt(campo.attr('max'));
 if(campo_valor >= minimo && campo_valor <= maximo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':"Informe um valor entre "+minimo+" e "+maximo+"."});
}
}else if(campo.attr('min') != undefined){
 var minimo = parseInt(campo.attr('min'));
 if(campo_valor >= minimo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':"Informe um valor maior ou igual a "+minimo+"."});
}
}else if(campo.attr('max') != undefined){
 var maximo = parseInt(campo.attr('max'));
 if(campo_valor <= minimo){campo_validado = true;}
 else{
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':"Informe um valor menor ou igual a "+minimo+"."});
}
}
}
 if (campo.hasClass('required_travar_zero') && (campo_valor == 0 || campo_valor == '') && campo_validado){
 campo_validado = false;
 campo_auxiliar.attr({'data-gtt':'Campo obrigatório.'});
}
 if (campo.hasClass('telefone') && (campo.hasClass('obrigatorio') || campo_valor != '') && campo_validado){
 campo_validado = ValidarTelefone(campo,campo_valor);
 if(campo_validado == false){campo_auxiliar.attr({'data-gtt':'Informe um número de telefone válido.'});}
 else{campo_auxiliar.attr({'data-gtt':''});}
}
 if (campo.hasClass('telefone_ddi') && (campo.hasClass('obrigatorio') || campo_valor != '') && campo_validado){
 campo_validado = ValidarTelefone(campo,campo_valor);
 if(campo_validado == false){campo_auxiliar.attr({'data-gtt':'Informe um número de telefone válido.'});}
 else{campo_auxiliar.attr({'data-gtt':''});}
}
 if (campo.hasClass('required_cpf_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarCpf(campo_valor);
 if(campo_validado == false){campo_auxiliar.attr({'data-gtt':'Informe um CPF válido.'});}
 else{campo_auxiliar.attr({'data-gtt':''});}
}
 if (campo.hasClass('required_cnpj_validar') && campo.hasClass('required') && campo_validado){
 campo_validado = ValidarCnpj(campo_valor);
 if(campo_validado == false){campo_auxiliar.attr({'data-gtt':'Informe um CNPJ válido.'});}
 else{campo_auxiliar.attr({'data-gtt':''});}
}
 if (campo.hasClass('personalized_error')){campo_validado = false;}
}
 
 if (campo_validado){
 if (
 campo_auxiliar.attr('data-gtt') == 'Campo obrigatório.' ||
 campo_auxiliar.attr('data-gtt') == 'Informe um endereço de e-mail válido.' ||
 campo_auxiliar.attr('data-gtt') == 'Informe um número de telefone válido.' ||
 campo_auxiliar.attr('data-gtt') == 'Informe um CPF válido.' ||
 campo_auxiliar.attr('data-gtt') == 'Informe um CNPJ válido.' ||
 campo_auxiliar.attr('data-gtt') == 'Já cadastrado'
 ){campo_auxiliar.attr({'data-gtt':''});}
 if (campo_area.hasClass('gpc_campos-error')){campo_area.removeClass('gpc_campos-error');}
 campo_auxiliar.attr({'data-gtt':''});
 return true;
}else{
 if (!campo_area.hasClass('gpc_campos-error')){campo_area.addClass('gpc_campos-error');}
 return false;
}
}
}
 function ValidarTelefone(campo, campo_valor){
 let valor = campo_valor.replace(/\D/g, '');
 if(valor.replace(/9/g,'') == '' || valor.replace(/8/g,'') == '' || valor.replace(/7/g,'') == '' || valor.replace(/6/g,'') == '' || valor.replace(/5/g,'') == '' || valor.replace(/4/g,'') == '' || valor.replace(/3/g,'') == '' || valor.replace(/2/g,'') == '' || valor.replace(/1/g,'') == '' || valor.replace(/0/g,'') == ''){return false;}
 let mascara_telefone = phoneMaskGreat['#'+$(campo).closest('.gpc-e').attr('id')+'#'+$(campo).attr('id')];
 
 let valor_bruto = ($(campo).val() || '').trim();
 if (valor_bruto.charAt(0) === '+'){mascara_telefone.setNumber(valor_bruto);}
 return mascara_telefone.isValidNumber();
}
 function ValidarCpf(cpf){
 
 cpf = cpf.replace('-', "").replace('.', "").replace('.', "").trim();
 
 var numeros, digitos, soma, i, resultado, digitos_iguais;
 digitos_iguais = 1;
 
 if (cpf.length < 11){return false;}
 
 for (i = 0;i < cpf.length - 1;i++){
 if (cpf.charAt(i) != cpf.charAt(i + 1)){
 digitos_iguais = 0;
 break;
}
}
 if (!digitos_iguais){
 
 numeros = cpf.substring(0,9);
 
 digitos = cpf.substring(9);
 
 soma = 0;
 for (i = 10;i > 1;i--){soma += numeros.charAt(10 - i) * i;}
 resultado = soma % 11 < 2 ? 0 :11 - soma % 11;
 
 if (resultado != digitos.charAt(0)){return false;}
 numeros = cpf.substring(0,10);
 soma = 0;
 for (i = 11;i > 1;i--){soma += numeros.charAt(11 - i) * i;}
 resultado = soma % 11 < 2 ? 0 :11 - soma % 11;
 if (resultado != digitos.charAt(1)){return false;}
 return true;
}else{return false;}
}
 function ValidarCnpj(cnpj){
 
 cnpj = cnpj.replace(/[^\d]+/g,'');
 
 if (cnpj == ''){return false;}
 if (cnpj.length != 14){return false;}
 
 if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999"){return false;}
 
 tamanho = cnpj.length - 2;
 numeros = cnpj.substring(0,tamanho);
 digitos = cnpj.substring(tamanho);
 soma = 0;
 pos = tamanho - 7;
 for (i = tamanho;i >= 1;i--){
 soma += numeros.charAt(tamanho - i) * pos--;
 if (pos < 2){pos = 9;}
}
 resultado = soma % 11 < 2 ? 0 :11 - soma % 11;
 if (resultado != digitos.charAt(0)){return false;}
 tamanho = tamanho + 1;
 numeros = cnpj.substring(0,tamanho);
 soma = 0;
 pos = tamanho - 7;
 for (i = tamanho;i >= 1;i--){
 soma += numeros.charAt(tamanho - i) * pos--;
 if (pos < 2){pos = 9;}
}
 resultado = soma % 11 < 2 ? 0 :11 - soma % 11;
 if (resultado != digitos.charAt(1)){return false;}
 return true;
}
 window.tempo_tela_obrigado = 500;
 function hash(string){
 const utf8 = new TextEncoder().encode(string);
 return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) =>{
 return Array.from(new Uint8Array(hashBuffer)).map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
});
}
 function EnviarFormulario(elemento){
 GLoading.carregar({'ativar':true});
 
 var formulario_validado = ValidacaoFormularios(elemento);
 
 if (formulario_validado){
 
 var html_aviso = '<div class="aviso_fundo"></div><div class="aviso_texto"><div class="aviso_texto_carregando"></div></div>';
 $('body').addClass('body_bloquear').append(html_aviso);
 $('.aviso_fundo, .aviso_texto').addClass('mostrar_aviso');
 
 elemento.find('.gpc_botao').css({'pointer-events':'none'});
 GLoading.carregar({'ativar':false});
 var campos = $(elemento).find('.gpc_campos');
 var elemento_envio = elemento.closest('.'+pagina_controle['classe_elemento']).attr('id');
 if(elemento_envio == undefined || elemento_envio == ''){elemento_envio = elemento.closest('.'+pagina_controle['classe_elemento_antigo']).attr('id');}
 var campos = $(elemento).find('.gpc_campos');
 var total_campos = 0;
 var post ={'campos':{},'elemento':elemento_envio};
 campos.each(function(i){
 var id = $(this).find('.gpc_campos-titulo label').attr('for');
 var titulo = $(this).find('.gpc_campos-titulo label').text();
 if(titulo.substr(0,1) == '*'){titulo = titulo.substr(1);}
 if($(this).hasClass('gpc_campos-check') || $(this).hasClass('gpc_campos-radio') || $(this).hasClass('gpc_campos-consentimento_lgpd')){
 var valor ={};
 var posicao = 0;
 if($(this).hasClass('gpc_campos-consentimento_lgpd')){
 valor = false;
 $(this).find('input').each(function(x, campo_atual){valor = $(campo_atual).prop('checked');});
}else if($(this).hasClass('gpc_campos-radio')){
 $(this).find('input').each(function(x, campo_atual){if($(campo_atual).prop('checked')){valor = $(this).val().replace(/\*/g, '');}});
}else{
 $(this).find('input').each(function(x, campo_atual){
 if($(campo_atual).prop('checked')){
 valor[posicao] = $(this).val().replace(/\*/g, '');
 posicao++;
 }
});
}
 if($(this).hasClass('gpc_campos-consentimento_lgpd')){post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':valor};}
 else{post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':valor};}
}else{
 if($(this).find('.gpc_campo').hasClass('telefone')){
 post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':$(this).find('.gpc_campo').val(), 'tipo':'telefone'};
}else if( $(this).find('.gpc_campo').hasClass('telefone_ddi')){
 
 const mascara_telefone = phoneMaskGreat['#'+elemento_envio+'#'+id];
 let numero_telefone = mascara_telefone.getNumber();
 if (!numero_telefone){numero_telefone = `+${mascara_telefone.getSelectedCountryData().dialCode}${$(this).find('.gpc_campo').val()}`;}
 post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':numero_telefone, 'tipo':'telefone'};
}
 else{post['campos'][i] ={'id':id, 'titulo':titulo, 'valor':$(this).find('.gpc_campo').val()};}
}
 total_campos = i;
});
 total_campos +=1;
 post['campos'][total_campos] ={'id':'input_referral_source', 'titulo':'Referral source', 'valor':(document.referrer == "" ? 'Acesso direto' :document.referrer)};
 total_campos +=1;
 post['campos'][total_campos] ={'id':'input_mobile', 'titulo':'Dispositivo', 'valor':(Mobile() ? 'Mobile' :'Desktop')};
 total_campos +=1;
 post['campos'][total_campos] ={'id':'input_uri', 'titulo':'URL', 'valor':window.location.href};
 
 let random = Math.random().toString();
 let IdConversion = 'GPages.'+random.substr(random.length-4)+(new Date()).getTime();
 post['eid'] = IdConversion;
 post['enav'] = typeof c == 'undefined' ? '' :c;
 post['eclid'] = typeof fbclid == 'undefined' ? '' :fbclid;
 post['euser'] = typeof u == 'undefined' ? '' :u;
 
 
 AdicionarFilaGQA({
 'verbo' :'POST',
 'uri' :JSON.stringify(post),
 'timeout' :10000,
 'prioridade' :'baixa',
 'carregar' :true,
 'externo' :true,
 'url' :'/conversion',
 'funcao_sucesso' :async function(retorno){
 let phone = '';
 let email = '';
 try{
 let regex = /((?:[a-z0-9!#$%&\'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))/m;
 let regex_resultado;
 for (let index in post['campos']){
 let valor = JSON.stringify(post['campos'][index].valor).toLowerCase();
 if ((regex_resultado = regex.exec(valor)) !== null && email == ''){email = await hash(regex_resultado[0]);}
 if (post['campos'][index]?.tipo == 'telefone' && phone == ''){phone = await hash(valor);}
 if (email != '' && phone != '') break;
}
 document.cookie = 'gpages_conversions=' + JSON.stringify({em:email, ph:phone}) + ';path=/;max-age=' + (6 * 30 * 24 * 60 * 60) + ';secure;samesite=Lax';
}catch (error){console.error('Erro ao processar campos para email/telefone:', error);}
 
 if(elementos_botoes_evento.hasOwnProperty(elemento.closest('.gpc-e').attr('id'))){elementos_botoes_evento[elemento.closest('.gpc-e').attr('id')]['conteudo']();}
 setTimeout(function(){
 elemento.find('.gpc_campos').each(function(){
 if(!$(this).hasClass('gpc_campos-hidden')){
 if($(this).hasClass('gpc_campos-check') || $(this).hasClass('gpc_campos-radio') || $(this).hasClass('gpc_campos-consentimento_lgpd')){
 $(this).find('input').each(function(campo_atual){
 if($(this).prop('checked')){$(this).prop({'checked':false});}
});
}else{$(this).find('.gpc_campo').val('');}
 }
});
},800);
 $('.aviso_texto').html((elemento.find('.gpc_botao').attr('gpc-mensagem_parabens') != undefined && elemento.find('.gpc_botao').attr('gpc-mensagem_parabens') != '' ? elemento.find('.gpc_botao').attr('gpc-mensagem_parabens') :"Obrigado!!!"));
 let link_botao = '';
 if(elemento.find('.gpc_botao').attr('gpc-link') != undefined && elemento.find('.gpc_botao').attr('gpc-link') != ''){
 link_botao = (elemento.find('.gpc_botao').attr('gpc-link').substr(0,7) == 'http://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,8) == 'https://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'sms://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'ftp://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'tel://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,7) == 'mailto:' ? elemento.find('.gpc_botao').attr('gpc-link') :'https://'+elemento.find('.gpc_botao').attr('gpc-link'));
 if(tempo_tela_obrigado == 500){
 if(link_botao != '' && link_botao != undefined){tempo_tela_obrigado = 1000;}
}
}
 setTimeout(function(){
 $('body').removeClass('body_bloquear');
 $('.aviso_fundo, .aviso_texto').removeClass('mostrar_aviso');
 setTimeout(function(){$('.aviso_fundo, .aviso_texto').remove();},100);
 if(elemento.find('.gpc_botao').attr('gpc-link') != undefined && elemento.find('.gpc_botao').attr('gpc-link') != ''){
 let id_elemento = elemento.closest('.gpc-e').attr('id');
 let link_usar = '';
 try{
 let link_new = new URL(link_botao);
 if(elementos_formulario_redirecionamento.hasOwnProperty(id_elemento)){
 for (var i = 0;i < total_campos;i++){
 let id = post['campos'][i].id;
 if(elementos_formulario_redirecionamento[id_elemento]['conteudo'].hasOwnProperty(id)){
 if(typeof post['campos'][i].valor == 'string'){if(post['campos'][i].valor.substr(0,1) == '"' && post['campos'][i].valor.substr(-1) == '"'){post['campos'][i].valor = post['campos'][i].valor.substr(1,post['campos'][i].valor.length-2);}}
 link_new.searchParams.set(elementos_formulario_redirecionamento[id_elemento]['conteudo'][id],post['campos'][i].valor);
}
 }
}
 link_usar = link_new.href;
}catch (e){
 var link = '';
 if(elementos_formulario_redirecionamento.hasOwnProperty(id_elemento)){
 for (var i = 0;i < total_campos;i++){
 let id = post['campos'][i].id;
 if(elementos_formulario_redirecionamento[id_elemento]['conteudo'][id] != undefined){
 link += elementos_formulario_redirecionamento[id_elemento]['conteudo'][id]+'='+post['campos'][i].valor+'&';
}
 }
 if(link){link = link.substr(0,(link.length-1));}
}
 let concatenar = elemento.find('.gpc_botao').attr('gpc-link').indexOf('?') ? '&' :'?';
 link_usar = (elemento.find('.gpc_botao').attr('gpc-link').substr(0,7) == 'http://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,8) == 'https://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'sms://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'ftp://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,6) == 'tel://' || elemento.find('.gpc_botao').attr('gpc-link').substr(0,7) == 'mailto:' ? elemento.find('.gpc_botao').attr('gpc-link') :'https://'+elemento.find('.gpc_botao').attr('gpc-link'))+concatenar+link;
}
 setTimeout(function(){
 GLoading.carregar({'ativar':false});
 window.location.href = link_usar;
},150);
}
 elemento.find('.gpc_botao').css({'pointer-events':''});
},tempo_tela_obrigado);
},
 'funcao_erro' :function(retorno){
 if($('.aviso_fundo').length){
 var html_aviso = 'Não foi possivel fazer seu cadastro, tente novamente.';
 $('.aviso_texto').html(html_aviso);
}else{
 var html_aviso = '<div class="aviso_fundo"></div><div class="aviso_texto">Não foi possivel fazer seu cadastro, tente novamente.</div>';
 $('body').addClass('body_bloquear').append(html_aviso);
 $('.aviso_fundo, .aviso_texto').addClass('mostrar_aviso');
}
 setTimeout(function(){
 $('body').removeClass('body_bloquear');
 $('.aviso_fundo, .aviso_texto').removeClass('mostrar_aviso');
 setTimeout(function(){$('.aviso_fundo, .aviso_texto').remove();},100);
 elemento.find('.gpc_botao').css({'pointer-events':''});
},4000);
}
});
 return true;
}else{
 
 GLoading.carregar({'ativar':false});
 window.scroll({top:0, behavior:"smooth"});
 return false;
}
}
 $(function(){
 if(typeof window.jQuery == 'undefined'){
 Object.defineProperty(window, 'jQuery',{
 configurable:true,
 set(value){
 value('body').off('submit','form', function (e){e.preventDefault();return false;});
 value('body').on('submit','form', function (e){
 e.preventDefault();
 e.stopPropagation();
 var elemento = $(this).closest('.e_formulario');
 if ($(elemento).length){return EnviarFormulario(elemento);}
 return false;
});
 Object.defineProperty(window, 'jQuery',{
 value,
 writable:true,
 configurable:true,
 enumerable:true
});
}
});
}
 $("body").on('submit', 'form', function(e){
 e.preventDefault();
 var elemento = $(this).closest('.e_formulario');
 if ($(elemento).length){return EnviarFormulario(elemento);}
});
 $('body').on('click','.gpc_campos-campo-opcao',function(e){
 if($(e.target).prop('nodeName') != 'A'){
 e.preventDefault();
 e.stopPropagation();
 if($(this).find('input').first().prop('checked')){$(this).find('input').first().prop('checked',false);}
 else{$(this).find('input').first().prop('checked',true);}
 ValidacaoCampos($(this).closest('.gpc_campos'));
}
});
 $('body').on('click','.gpc_campos-erro',function(e){
 e.preventDefault();
 e.stopPropagation();
 if($(this).closest('.gpc_campos').hasClass('gpc_campos-check') || $(this).closest('.gpc_campos').hasClass('gpc_campos-radio') || $(this).closest('.gpc_campos').hasClass('gpc_campos-consentimento_lgpd')){$(this).closest('.gpc_campos-campo').find('input').first().trigger('click');}
 else if($(this).closest('.gpc_campos').hasClass('gpc_campos-select')){$(this).closest('.gpc_campos-campo').find('select').trigger('click');}
 else{$(this).closest('.gpc_campos-campo').find('.gpc_campo').trigger('focus');}
});
 $('body').on('click','.gpc_botao',function(e){
 
 GLoading.carregar({'ativar':true});
 var formulario_validado = ValidacaoFormularios($(this).closest('form'));
 if(formulario_validado == false){
 e.preventDefault();
 e.stopPropagation();
}else{$(this).closest('form').trigger('submit');}
});
 $('body').on('focusout','.gpc_campo',function(e){
 
 e.preventDefault();
 e.stopPropagation();
 GLoading.carregar({'ativar':true});
 var passo_validado = true;
 if (!ValidacaoCampos($(this))){passo_validado = false;}
 if (passo_validado){return true;}
 else{return false;}
});
 $("body").on('focusin','.admin_campo',function(evento){
 if ($(this).attr('type') != 'hidden'){
 if ($(this).hasClass('readonly') && this.hasAttribute('readonly')){
 if($(this).hasClass('data_calendario') || $(this).hasClass('data_calendario2') || $(this).hasClass('data_calendario3') || $(this).hasClass('data_calendario4') || $(this).hasClass('data_calendario4') || $(this).attr('id') == '#data_vencimento' || $(this).attr('id') == '#data_pagamento' || $(this).attr('id') == '#pagamento_data_inicio' || $(this).attr('id') == '#data_prazo' || $(this).attr('id') == '#data_de' || $(this).attr('id') == '#data_ate' || $(this).attr('id') == '#data_inicio'){$(this).removeClass('readonly').closest('.admin_campos').addClass('admin_campos-focus');}
 else{$(this).removeAttr('readonly').removeClass('readonly').closest('.admin_campos').addClass('admin_campos-focus');}
}else{$(this).closest('.admin_campos').addClass('admin_campos-focus');}
}
}).on('focusout','.admin_campo', function (evento){
 if ($(this).attr('type') != 'hidden'){
 if ($(this).hasClass('readonly') && this.hasAttribute('readonly')){$(this).removeAttr('readonly');}
 else{
 var caixa = $(this).closest('.admin_campos');
 caixa.removeClass('admin_campos-focus');
 if ($(this).val()){if (!caixa.hasClass('admin_campos-valor')){caixa.addClass('admin_campos-valor');}}
 else{if (caixa.hasClass('admin_campos-valor')){caixa.removeClass('admin_campos-valor');}}
 ValidacaoCampos($(this));
}
}
});
});
 
 if($('.'+pagina_controle['classe_elemento']+'.e_faq').length){
 setTimeout(function(){
 GAccordion.instalar();
},600);
}
 
 
 let phoneMaskGreat ={};
 function bindEvents(){
 var caixa = $('gmf').last().attr('id');
 if(caixa != undefined){caixa = '#'+caixa+' ';}else{caixa = '';}
 
 let telefone = $(caixa+".gpc_campo.telefone");
 let telefone_ddi = $(caixa+".gpc_campo.telefone_ddi");
 let total = telefone.length+telefone_ddi.length;
 if(telefone.length > 0){
 for (let i = 0;i < telefone.length;i++){
 const tel = telefone[i];
 let id_campo = '#'+$(tel).closest('.gpc-e').attr('id')+'#'+$(tel).attr('id');
 if($(tel).closest('.gpc_modal').length > 0){delete phoneMaskGreat[id_campo];}
 if(typeof phoneMaskGreat[id_campo] != 'object'){
 phoneMaskGreat[id_campo] = window.intlTelInput(tel,{
 useFullscreenPopup:false,
 autoPlaceholder:"off",
 strictMode:true,
 initialCountry:"BR",
 onlyCountries:["BR"],
 allowDropdown:false,
 showFlags:false,
 utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/25.3.1/build/js/intlTelInputWithUtils.min.js"
});
 let zIndex = $(tel).closest('.gpc_campos').find('.iti__country-container').css('z-index');
 $(tel).closest('.gpc_campos').css('z-index',(parseInt(zIndex)+total));
 $(tel).closest('.gpc_campos').find('.gpc_campos-campo').css('z-index',(parseInt(zIndex)+total));
 $(tel).closest('.gpc_campos').find('.iti__country-container').css('z-index',(parseInt(zIndex)+total));
}
 total--;
}
 
}
 if(telefone_ddi.length > 0){
 for (let i = 0;i < telefone_ddi.length;i++){
 const tel = telefone_ddi[i];
 let id_campo = '#'+$(tel).closest('.gpc-e').attr('id')+'#'+$(tel).attr('id');
 if($(tel).closest('.gpc_modal').length > 0){delete phoneMaskGreat[id_campo];}
 if(typeof phoneMaskGreat[id_campo] != 'object'){
 phoneMaskGreat[id_campo] = window.intlTelInput(tel,{
 initialCountry:"BR",
 separateDialCode:true,
 useFullscreenPopup:false,
 strictMode:true,
 utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/25.3.1/build/js/intlTelInputWithUtils.min.js"
});
 $(tel).closest('.gpc_campos').css('z-index','9999');
 $(tel).css('padding-left','86px');
 $(tel).on('countrychange', function(e){
 
 let countryData = phoneMaskGreat['#'+$(this).closest('.gpc-e').attr('id')+'#'+$(this).attr('id')].getSelectedCountryData();
 if (countryData.dialCode){
 tel.value = tel.value.replace(`+${countryData.dialCode}`, "");
 tel.value = tel.value.replace(`+ ${countryData.dialCode}`, "");
}
 console.log($(this).closest('.gpc_campos').find('.iti__country-container').width());
 tel.style.paddingLeft = $(this).closest('.gpc_campos').find('.iti__country-container').width()+8+'px';
 
 ValidacaoCampos($(caixa+'#'+$(this).attr('id')));
});
 let zIndex = $(tel).closest('.gpc_campos').find('.iti__country-container').css('z-index');
 $(tel).closest('.gpc_campos').css('z-index',(parseInt(zIndex)+total));
 $(tel).closest('.gpc_campos').find('.gpc_campos-campo').css('z-index',(parseInt(zIndex)+total));
 $(tel).closest('.gpc_campos').find('.iti__country-container').css('z-index',(parseInt(zIndex)+total));
}
 total--;
}
}
 GFM.instalar({'elemento' :'#celular', 'mascara' :'(00) 0000-00009', 'placeholder' :'(__) ____-_____'});
 GFM.instalar({'elemento' :'input.cnpj', 'mascara' :'00.000.000/0000-00', 'placeholder' :'__.___.___/____-__'});
 GFM.instalar({'elemento' :'input.cpf', 'mascara' :'000.000.000-00', 'placeholder' :'___.___.___-__'});
 GFM.instalar({'elemento' :'input.hora', 'mascara' :'00:00', 'placeholder' :'__:__'});
 GFM.instalar({'elemento' :'input.data', 'mascara' :'00/00/0000', 'placeholder' :'__/__/____'});
 GFM.instalar({'elemento' :'input.datahora', 'mascara' :'00/00/0000 00:00', 'placeholder' :'__/__/____ __:__'});
 
 GTooltip.instalar({'elemento' :'.gtt-direita', 'direcao' :'direita'});
 GTooltip.instalar({'elemento' :'.gtt-esquerda', 'direcao' :'esquerda'});
 GTooltip.instalar({'elemento' :'.gtt-cima', 'direcao' :'cima'});
 GTooltip.instalar({'elemento' :'.gtt-baixo', 'direcao' :'baixo'});
 GTooltip.instalar({'elemento' :'.balao_direita', 'direcao' :'direita'});
 GTooltip.instalar({'elemento' :'.balao_esquerda', 'direcao' :'esquerda'});
 GTooltip.instalar({'elemento' :'.balao_cima', 'direcao' :'cima'});
 GTooltip.instalar({'elemento' :'.balao_baixo', 'direcao' :'baixo'});
}
 function Mobile(){
 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){return true;}
 return false;
}
 window.smoothScrollTo = function (endX, endY, duration){
 let startX = window.scrollX || window.pageXOffset,
 startY = window.scrollY || window.pageYOffset,
 distanceX = endX - startX,
 distanceY = endY - startY,
 startTime = new Date().getTime();
 let easeInOutQuart = function (time, from, distance, duration){
 if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
 return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
};
 let timer = window.setInterval(function (){
 let time = new Date().getTime() - startTime,
 newX = easeInOutQuart(time, startX, distanceX, duration),
 newY = easeInOutQuart(time, startY, distanceY, duration);
 if (time >= duration){
 window.clearInterval(timer);
}
 window.scrollTo(newX, newY);
}, 1000 / 60);
};
 $(function(){
 
 GLoading.carregar({'ativar':false});
 
 $('body').removeClass('preload');
 
 bindEvents();
 
 $('.mensagem_fechar').on('click',function(evento){$('.mensagens').removeAttr('style');});
 
 $(document).on('keydown', function(e){
 var tecla = (e.keyCode?e.keyCode:e.which);
 if($('.gm').length){
 var caixa = $('.gm').last().attr('id');
 var caixa_andamento = $('#'+caixa).find('.gmf-andamento');
 if((e.ctrlKey && tecla == 83)){
 e.preventDefault();
 e.stopPropagation();
 if (caixa_andamento.length){
 if (caixa_andamento.attr('caixa_passos_controle') == (caixa_andamento.attr('caixa_passos_quantidade')-1)){$('#'+caixa+' #enviar_formulario_ajax').trigger('click');}
 else{PassosGMF(caixa, 'proximo');}
}else{$('#'+caixa+' #enviar_formulario_ajax').trigger('click');}
 return false;
}else if(tecla == 27){
 e.preventDefault();
 e.stopPropagation();
 if ($('#'+caixa).attr('gm_componente') == 'gsp'){FecharGSP(caixa);}
 else if($('#'+caixa).attr('gm_componente') == 'gmf'){$('#'+caixa+' .gmf-topo-fechar').click();}
 else if($('#'+caixa).attr('gm_componente') == 'guo' || $('#'+caixa).attr('gm_componente') == 'gd'){PulsarGM($('#'+caixa).attr('id'));}
 else if ($('#'+caixa).attr('gm_componente') == 'gmi'){
 
 gmi_caixa['elemento'] = '';
 gmi_caixa_imagem['elemento'] = '';
 gmi_fundo['elemento'] = '';
 
 FecharGM(caixa);
}else{FecharGM(caixa);}
 return false;
}
}else{
 if((e.ctrlKey && tecla == 83)){
 e.preventDefault();
 e.stopPropagation();
 if($('#editar_formulario').length){$('#editar_formulario').trigger('click');}
 else if($('#enviar_formulario').length){$('#enviar_formulario').trigger('click');}
 else if($('.admin_botao-login').length){$('.admin_botao-login').trigger('click');}
 else if($('.admin_botao-esqueci_minha_senha').length){$('.admin_botao-esqueci_minha_senha').trigger('click');}
 return false;
}
}
 if((e.ctrlKey && tecla == 85) || tecla == 123){
 e.preventDefault();
 e.stopPropagation();
 return false;
}
});
 
 $('body').on('click','.botao_evento',function(e){
 
 elementos_botoes_evento[$(this).parent().attr('id')]['conteudo']();
});
 
 $('body').on('click','.link_popup',function(e){
 if($(this).closest('.'+pagina_controle['classe_elemento'])){var elemento = $(this).closest('.'+pagina_controle['classe_elemento']);}
 else{var elemento = $(this).closest('.'+pagina_controle['classe_elemento_antigo']);}
 
 var conteudo = elementos_popup[elemento.attr('id')]['conteudo'];
 if(conteudo == undefined || conteudo == ''){conteudo = '<div></div>';}
 
 gm_quantidade++;
 
 var configuracao ={
 'gm' :{
 'conteudos' :{
 'topo' :{
 'conteudo' :"<div class='gpc_modal_popup-topo-fechar icone-fechar'></div>",
 'estilos' :'',
 'extras' :''
},
 'centro' :{
 'conteudo' :conteudo,
 'estilos' :'',
 'extras' :''
},
 'rodape' :{
 'conteudo' :'<div></div>',
 'estilos' :'',
 'extras' :''
}
},
 'classes' :'gpc_modal',
 'estilos' :elementos_popup[elemento.attr('id')]['estilos'][($(window).width() > 960 ? 'desktop' :'mobile')],
 'extras' :'gpc_id_elemento="'+elemento.attr('id')+'"'
},
 'gm_fundo' :{
 'conteudos' :{'topo' :{'conteudo' :"<div class='gpc_modal_popup-fundo-fechar icone-fechar'></div>"}},
 'classes' :'gpc_modal-fundo',
 'estilos' :'overflow:hidden;',
 'extras' :'gm_fundo_acao="fechar"'
}
};
 
 AbrirGM('gpc_modal_'+gm_quantidade, 'gpc_modal_popup',configuracao);
 
 setTimeout(function(){
 if($('#gpc_modal_'+gm_quantidade+' .'+pagina_controle['classe_elemento']+'.e_slider').length){
 GSlideImage.iniciar();
}
 if($('#gpc_modal_'+gm_quantidade+' .'+pagina_controle['classe_elemento']+'.e_faq').length){
 GAccordion.instalar();
}
 GreatLoader('atualizar');
 GreatFontes(true);
 bindEvents();
},400);
 
 return false;
});
 $('body').on('click','.gpc_modal_popup-topo-fechar, .gpc_modal_popup-fundo-fechar',function(e){FecharGM($('.gpc_modal').last().attr('id'));});
 
 $('body').on('click','.link_interno',function(e){
 if($(this).attr('data-bloco-mobile') !== undefined && $(window).width() < 720){
 var bloco = $(this).attr('data-bloco-mobile');
 if(!$((bloco.substr(0,1) == '#' ? bloco :'#'+bloco)).length){bloco = $(this).attr('data-bloco');}
}else{var bloco = $(this).attr('data-bloco');}
 if(bloco != undefined){
 if($((bloco.substr(0,1) == '#' ? bloco :'#'+bloco)).length){
 var offset = $((bloco.substr(0,1) == '#' ? bloco :'#'+bloco)).offset();
 if ('scrollBehavior' in document.documentElement.style){window.scroll({top:(offset.top-60), behavior:"smooth"});}
 else{smoothScrollTo(0, (offset.top-60), 800);}
}
}
 return false;
});
 
 $('body').on('click','.link_externo',function(e){
});
 
 
 if(!window.getCrawler()){
 GModalApproval.instalar({
 'barra':{
 'cor':'ffffff',
 'classe':'',
 'texto':'Usamos cookies e pixels da Meta e Google para personalizar conteúdos e melhorar a sua experiência.&nbsp;Ao navegar nesse site, você está ciente do nosso <a href="https://www.alisat.com.br/privacidade" title="Aviso de Privacidade" target="_blank" class="link_externo">Aviso de Privacidade</a>.',
 'botao_configurar':'Configurar',
 'botao_aceitar':'Entendi e aceito',
 'fechar':true,
 'fechar_acao':'cookies_remover'
},
 'textos':[
{'tipo':'titulo', 'texto':'Configurações de cookies'},
{'tipo':'texto', 'texto':'Você pode escolher quais cookies quer aceitar'},
 ],
 'opcoes':[
{
 'titulo':'Cookies obrigatórios',
 'texto':'Eles são cookies para garantir o funcionamento adequado do site.',
 'aviso':'Sempre ativo',
 'id':'o'
},
{
 'titulo':'Cookies de estatísticas',
 'texto':'São usados para coletar informações para exibir conteúdos específicos para um navegador em particular ao criar diferentes grupos-alvo.',
 'id':'e',
 'valor':true,
 'codigos':function(){
 
 return scripts_estatisticas;
 }
},
{
 'titulo':'Cookies de marketing',
 'texto':'Eles são usados para coletar informações para exibir publicidade ou conteúdos específicos para um navegador em particular ao criar diferentes grupos-alvo.',
 'id':'m',
 'valor':true,
 'codigos':function(){
 
 return scripts_marketing;
 }
}
 ],
 'dominio':'.alisat.com.br',
 'editado':(GModalApproval.preferencias() ? true :false)
});
}
});
 
 'use strict';

var gac_timeout ={}, gac_timeout_resize;
var GAccordion = function (){
 return{
 instalar:function (id){
 let instancias;
 if (id != undefined){instancias = document.querySelectorAll('#' + id + ' .gac');}
 else{instancias = document.querySelectorAll('.gac');}
 if (instancias){
 for (var i = 0;i < instancias.length;i++){
 id = instancias[i].closest('.gpc-e, .gpc-blocos_bloco_elemento').getAttribute('id');
 let ja_iniciado = false, abrir_primeiro = false;
 if (instancias[i].getAttribute('gac-abrir_primeiro') == 'true'){abrir_primeiro = true;}
 let itens = instancias[i].querySelectorAll('.gac-item_cabecalho');
 if (instancias[i].parentElement.classList.contains('gpc-e')){
 ja_iniciado = instancias[i].classList.contains('gac-ativo');
 instancias[i].classList.add('gac-ativo');
}
 if (itens){
 if (!ja_iniciado){
 for (var x = 0;x < itens.length;x++){
 let atual = itens[x];
 if (document.getElementById(id).classList.contains('gpc-e')){itens[x].addEventListener('click', function (){GAccordion.abrir(atual.closest('.gpc-e').getAttribute('id'), atual);}, false);}
 else{
 atual.closest('.gac-item').classList.remove('gac-aberto');
 let conteudo = atual.closest('.gac-item').querySelector('.gac-item_conteudo');
 conteudo.style.height = '';
 if (atual.closest('.gpc-blocos_bloco_elemento')){
 atual.style.color = atual.closest('.gac').getAttribute('data-color');
 atual.style.backgroundColor = atual.closest('.gac').getAttribute('data-background-color');
}
}
}
}
 if (instancias[i].closest('.gpc-e')){
 let visivel = getComputedStyle(instancias[i].closest('.gpc-e'));
 if (abrir_primeiro && visivel.visibility === 'visible' && visivel.display === 'block'){
 GAccordion.abrir(itens[0].closest('.gpc-e').getAttribute('id'), itens[0], true);
}
}
}
}
}
}, abrir:function (id, item, primeiro){
 if (primeiro == undefined){primeiro = false;}
 let instancia = document.querySelector("#" + id);
 if (instancia){
 if (item.closest('.gac-item').classList.contains('gac-aberto') && !primeiro){GAccordion.fechar(id, item);}
 else{
 let versao = 'desktop';
 if (window.innerWidth < 800){versao = 'mobile';}
 let item_ativo_altura = instancia.querySelector('.gac-aberto');
 if(item_ativo_altura){item_ativo_altura = item_ativo_altura.querySelector('.gac-item_conteudo').offsetHeight;}
 else{item_ativo_altura = 0;}
 let abertos = document.querySelectorAll('.gac-aberto');
 if (abertos && !primeiro){
 for (var i = 0;i < abertos.length;i++){
 if (abertos[i].closest('.gpc-e')){
 if (abertos[i].closest('.gpc-b')){
 if (abertos[i].closest('.gpc-b').getAttribute('id') == abertos[i].closest('.gpc-b').getAttribute('id')){GAccordion.fechar(abertos[i].closest('.gpc-e').getAttribute('id'), abertos[i],true);}
}else if (abertos[i].closest('.gpc_modal')){
 GAccordion.fechar(abertos[i].closest('.gpc-e').getAttribute('id'), abertos[i])
}
}
}
}
 item.closest('.gac-item').classList.add('gac-aberto');
 let conteudo = item.closest('.gac-item').querySelector('.gac-item_conteudo');
 let tamanho_conteudo = conteudo.scrollHeight;
 conteudo.style.height = tamanho_conteudo + 'px';
 if (instancia.closest('.gpc-blocos_bloco_elemento')){
 let itens = instancia.querySelectorAll('.gac-item_cabecalho');
 for (var x = 1;x < itens.length;x++){
 itens[x].closest('.gac-item').classList.remove('gac-aberto');
 itens[x].closest('.gac-item').querySelector('.gac-item_cabecalho').style.color = itens[0].closest('.conteudo').getAttribute('data-color');
 itens[x].closest('.gac-item').querySelector('.gac-item_cabecalho').style.backgroundColor = itens[0].closest('.conteudo').getAttribute('data-background-color');
 itens[x].closest('.gac-item').querySelector('.gac-item_conteudo').style.height = '';
}
 itens[0].closest('.gac-item').querySelector('.gac-item_cabecalho').style.color = itens[0].closest('.conteudo').getAttribute('data-color-hover');
 itens[0].closest('.gac-item').querySelector('.gac-item_cabecalho').style.backgroundColor = itens[0].closest('.conteudo').getAttribute('data-background-color-hover');
 itens[0].closest('.gac-item').querySelector('.gac-item_conteudo').style.color = itens[0].closest('.conteudo').getAttribute('data-color-texto');
 itens[0].closest('.gac-item').querySelector('.gac-item_conteudo').style.backgroundColor = itens[0].closest('.conteudo').getAttribute('data-background-color-hover');
}
 if ((instancia.closest('.gpc-b') || instancia.closest('.gpc_modal')) && !document.querySelectorAll('#admin_centro').length){
 let elemento = instancia.closest('.gpc-e');
 let rotacao = GAccordion.rotacao(getComputedStyle(elemento)['transform']);
 let dif = GAccordion.calcularAjuste(rotacao, tamanho_conteudo);
 elemento.style.transform = `translate(${dif.deltaX}px, ${dif.deltaY}px) rotate(${rotacao}deg)`;
 if(rotacao != 0){conteudo.style.transition = 'none';}
 else{conteudo.style.transition = '';}
 tamanho_conteudo = tamanho_conteudo + dif.deltaY;
 if (rotacao == 90 || rotacao == 270){tamanho_conteudo = 0;}
 let id_bloco = (instancia.closest('.gpc-b') ? instancia.closest('.gpc-b').getAttribute('id') :instancia.closest('.gpc_modal').getAttribute('gpc_id_elemento'));
 let elementos = instancia.closest('.centralizar, .gpc_modal').querySelectorAll('.gpc-e');
 if (elementos){
 let total_elementos = elementos.length;
 for (var i = 0;i < total_elementos;i++){
 if (elementos[i].getAttribute('id') != item.closest('.gpc-e').getAttribute('id')){
 elementos[i].classList.add('gac-movendo');
 if (parseFloat(elementos_posicao[elementos[i].getAttribute('id')][versao]) >= (item.closest('.gpc-e').offsetTop + item.closest('.gpc-e').offsetHeight - item_ativo_altura) && elementos[i].getAttribute('id') != item.closest('.gpc-e').getAttribute('id') && elementos[i].offsetParent){elementos[i].style.top = (elementos_posicao[elementos[i].getAttribute('id')][versao] + tamanho_conteudo) + 'px';}
 else if (elementos[i].offsetParent == null){elementos[i].style.top = '';}
}
}
}
 instancia.closest('.gpc-b, .gpc_modal').classList.add('gac-movendo');
 instancia.closest('.gpc-b, .gpc_modal').style.setProperty('height', (blocos_posicao[id_bloco][versao] + tamanho_conteudo) + 'px', 'important');
 if (instancia.closest('.gpc_modal')){PosicionarGM(instancia.closest('.gpc_modal').getAttribute('id'), false);}
}else{
 let elemento = instancia.closest('.gpc-blocos_bloco_elemento');
 let rotacao = GAccordion.rotacao(getComputedStyle(elemento)['transform']);
 let dif = GAccordion.calcularAjuste(rotacao, tamanho_conteudo);
 tamanho_conteudo = tamanho_conteudo + dif.deltaY;
 if(rotacao != 0){conteudo.style.transition = 'none';}
 else{conteudo.style.transition = '';}
 elemento.style.transform = `translate(${dif.deltaX}px, ${dif.deltaY}px) rotate(${rotacao}deg)`;
 
 let elementos, bloco;
 if (instancia.closest('.gpc_modal')){
 elementos = instancia.closest('.gpc_modal').querySelectorAll('.gpc-blocos_bloco_elemento');
 bloco = instancia.closest('.gpc_modal');
}else{
 elementos = instancia.closest('.gpc-blocos_bloco_interno').querySelectorAll('.gpc-blocos_bloco_elemento');
 bloco = instancia.closest('.gpc-blocos_bloco_interno');
}
 if (elementos){
 let total_elementos = elementos.length;
 for (var i = 0;i < total_elementos;i++){
 if (elementos[i].getAttribute('id') != item.closest('.gpc-blocos_bloco_elemento').getAttribute('id')){
 elementos[i].classList.add('gac-movendo');
 if (
 parseFloat(elementos[i].offsetTop) >= (item.closest('.gpc-blocos_bloco_elemento').offsetTop + item.closest('.gpc-blocos_bloco_elemento').offsetHeight) &&
 elementos[i].getAttribute('id') != item.closest('.gpc-blocos_bloco_elemento').getAttribute('id') &&
 elementos[i].offsetParent
 ){elementos[i].style.top = (parseFloat(elementos[i].style.top) + tamanho_conteudo) + 'px';}
}
}
}
 bloco.classList.add('gac-movendo');
 bloco.style.setProperty('height', (parseFloat(bloco.style.height) + tamanho_conteudo) + 'px');
 if (instancia.closest('.gpc_modal')){PosicionarGM(instancia.closest('.gpc_modal').getAttribute('id'), false);}
 for (let i = 0;i < 8;i++){setTimeout(function (){gpc_controle['elementos_iniciados']['elemento'].updateRect();}, 40 * i);}
}
}
}
}, fechar:function (id, item, abrir_outro){
 let instancia = document.querySelector("#" + id);
 if (abrir_outro == undefined){abrir_outro = false;}
 if (instancia){
 if (gac_timeout.hasOwnProperty(id)){
 clearTimeout(gac_timeout[id]);
 delete gac_timeout[id];
}
 if (instancia.closest('.gpc-blocos_bloco_elemento')){
 let itens = item.closest('.gac').querySelectorAll('.gac-item_cabecalho');
 for (var x = 0;x < itens.length;x++){
 itens[x].closest('.gac-item').classList.remove('gac-aberto');
 itens[x].closest('.gac-item').querySelector('.gac-item_cabecalho').style.color = item.closest('.gac').getAttribute('data-color');
 itens[x].closest('.gac-item').querySelector('.gac-item_cabecalho').style.backgroundColor = item.closest('.gac').getAttribute('data-background-color');
 itens[x].closest('.gac-item').querySelector('.gac-item_conteudo').style.height = '';
}
}
 let versao = 'desktop';
 if (window.innerWidth < 800){versao = 'mobile';}
 item.closest('.gac-item').classList.remove('gac-aberto');
 let conteudo = item.closest('.gac-item').querySelector('.gac-item_conteudo');
 conteudo.style.height = '';
 if ((instancia.closest('.gpc-b') || instancia.closest('.gpc_modal')) && !document.querySelectorAll('#admin_centro').length){
 let elemento = instancia.closest('.gpc-e');
 let rotacao = GAccordion.rotacao(getComputedStyle(elemento)['transform']);
 let elementos = instancia.closest('.centralizar, .gpc_modal').querySelectorAll('.gpc-e');
 if (elementos){
 let total_elementos = elementos.length;
 for (var i = 0;i < total_elementos;i++){
 elementos[i].classList.add('gac-movendo');
 if (elementos[i].getAttribute('id') != item.closest('.gpc-e').getAttribute('id')){
 if (
 parseFloat(elementos[i].offsetTop) != elementos_posicao[elementos[i].getAttribute('id')][versao] &&
 elementos[i].getAttribute('id') != id &&
 elementos[i].offsetParent
 ){elementos[i].style.top = '';}
}
 elementos[i].classList.remove('gac-movendo');
}
}
 elemento.style.transform = `translate(0px, 0px) rotate(${rotacao}deg)`;
 instancia.closest('.gpc-b, .gpc_modal').style.height = '';
 if (instancia.closest('.gpc_modal')){PosicionarGM(instancia.closest('.gpc_modal').getAttribute('id'), false);}
}else{
 let elemento = instancia.closest('.gpc-blocos_bloco_elemento');
 let rotacao = GAccordion.rotacao(getComputedStyle(elemento)['transform']);
 elemento.style.transform = `translate(0px, 0px) rotate(${rotacao}deg)`;
 versao = '';
 if (document.getElementById('gpc-blocos').classList.contains('mobile')){versao = '_mobile';}
 
 let elementos, bloco;
 if (instancia.closest('.gpc_modal')){
 elementos = instancia.closest('.gpc_modal').querySelectorAll('.gpc-blocos_bloco_elemento');
 bloco = instancia.closest('.gpc_modal');
}else{
 elementos = instancia.closest('.gpc-blocos_bloco_interno').querySelectorAll('.gpc-blocos_bloco_elemento');
 bloco = instancia.closest('.gpc-blocos_bloco_interno');
}
 if (elementos){
 let total_elementos = elementos.length;
 for (var i = 0;i < total_elementos;i++){
 if (
 parseFloat(elementos[i].style.top) >= (parseFloat(instancia.style.top) + parseFloat(getComputedStyle(instancia)['height'])) &&
 elementos[i].getAttribute('id') != id &&
 elementos[i].offsetParent
 ){elementos[i].setAttribute('style', elementos_pagina[elementos[i].getAttribute('gpc_id_elemento')]['estilos' + versao]);}
}
}
 bloco.setAttribute('style', blocos_pagina[bloco.getAttribute('gpc_id_bloco')]['estilos' + versao]);
 if (instancia.closest('.gpc_modal')){PosicionarGM(instancia.closest('.gpc_modal').getAttribute('id'), false);}
 for (let i = 0;i < 8;i++){setTimeout(function (){gpc_controle['elementos_iniciados']['elemento'].updateRect();}, 40 * i);}
}
 
 let elementos = document.querySelectorAll('.gac-movendo');
 if (elementos){for (var i = 0;i < elementos.length;i++){elementos[i].classList.remove('gac-movendo');}}
}
}, resize:function (id){
 if (document.querySelectorAll('#admin_centro').length){return false;}
 let instancias;
 if (id != undefined){instancias = document.querySelectorAll('#' + id + ' .gac');}
 else{instancias = document.querySelectorAll('.gac');}
 if (instancias){
 let versao = 'desktop';
 if (window.innerWidth < 800){versao = 'mobile';}
 for (var i = 0;i < instancias.length;i++){
 id = instancias[i].closest('.gpc-e').getAttribute('id');
 let itens = instancias[i].querySelectorAll('.gac-aberto');
 let tamanho_conteudo = 0;
 if (itens){
 for (var x = 0;x < itens.length;x++){
 let atual = itens[x];
 let conteudo = atual.closest('.gac-item').querySelector('.gac-item_conteudo');
 conteudo.style.height = 'auto';
 tamanho_conteudo = conteudo.scrollHeight;
 if (atual.closest('.gpc-b') || atual.closest('.gpc_modal')){
 let id_bloco = (atual.closest('.gpc-b') ? atual.closest('.gpc-b').getAttribute('id') :atual.closest('.gpc_modal').getAttribute('gpc_id_elemento'));
 let elementos = atual.closest('.centralizar, .gpc_modal').querySelectorAll('.gpc-e');
 if (elementos){
 let total_elementos = elementos.length;
 for (var y = 0;y < total_elementos;y++){
 elementos[y].classList.add('gac-movendo');
 if ((parseFloat(elementos[y].offsetTop) >= (atual.closest('.gpc-e').offsetTop + atual.closest('.gpc-e').offsetHeight - tamanho_conteudo) || elementos[y].offsetParent == null) && elementos[y].getAttribute('id') != atual.closest('.gpc-e').getAttribute('id')){elementos[y].style.top = (elementos_posicao[elementos[y].getAttribute('id')][versao] + tamanho_conteudo) + 'px';}
}
}
 atual.closest('.gpc-b, .gpc_modal').classList.add('gac-movendo');
 atual.closest('.gpc-b, .gpc_modal').style.setProperty('height', (blocos_posicao[id_bloco][versao] + tamanho_conteudo) + 'px', 'important');
 if (atual.closest('.gpc_modal')){PosicionarGM(atual.closest('.gpc_modal').getAttribute('id'), false);}
}
}
}
}
}
}, rotacao:function (transform){
 
 const resultados = transform.match(/matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/);
 if (!resultados) return 0;
 
 const a = parseFloat(resultados[1]);
 const b = parseFloat(resultados[2]);
 
 let graus = Math.atan2(b, a) * (180 / Math.PI);
 graus = graus % 360;
 if (graus < 0){graus += 360;}
 
 return parseFloat(graus.toFixed(2));
}, calcularAjuste:function (angulo, tamanhoConteudo){
 // Convertendo o ângulo de rotação para radianos
 let radianos = angulo * Math.PI / 180;
 // Calculando os ajustes baseado na expansão do conteúdo e no ângulo de rotação
 let ajusteX = (Math.sin(radianos) * tamanhoConteudo / 2) * -1;
 let ajusteY = ((1 - Math.cos(radianos)) * tamanhoConteudo / 2) * -1;
 // Retornando os ajustes
 return{deltaX:ajusteX, deltaY:ajusteY};
}

}
}();
window.addEventListener('load', function (){GAccordion.instalar();}, false);
window.addEventListener('resize', function (){
 const elementos = document.querySelectorAll('.gac-movendo');
 if (elementos){for (var i = 0;i < elementos.length;i++){elementos[i].classList.remove('gac-movendo');}}
 if (gac_timeout_resize){clearTimeout(gac_timeout_resize);}
 const largura = window.innerWidth;
 gac_timeout_resize = setTimeout(function (){if (largura == window.innerWidth){GAccordion.resize();}}, 50);
}, false);'use strict';

var carregando = false;

var GLoading = function(){
 return{
 instalar :function(){
 
 var gl = document.querySelector('#gloading');
 if (gl == null || gl == undefined){
 var gl_loading = document.createElement("div");
 gl_loading.id = 'gloading';
 gl_loading.className = 'gloading_esconder';
 gl_loading.innerHTML = '<span></span>';
 document.body.appendChild(gl_loading);
}
},
 carregar :function(configuracao){
 
 if (configuracao.hasOwnProperty('ativar') == false){configuracao.ativar = false;}
 if (configuracao.ativar != true && configuracao.ativar != false){configuracao.ativar = false;}
 if (configuracao.hasOwnProperty('tempo') == false){configuracao.tempo = 0;}
 if (configuracao.hasOwnProperty('tipo') == false){configuracao.tipo = 'barra';}
 if (configuracao.tipo != 'barra' && configuracao.tipo != 'tela'){configuracao.tipo = 'barra';}
 
 var gl = document.querySelector('#gloading');
 
 if (gl != null && gl != undefined){
 
 if (configuracao.ativar == true){GLoading.carregar_mostrar(gl, configuracao);}
 
 if (configuracao.ativar == false || configuracao.tempo != 0){GLoading.carregar_esconder(gl, configuracao);}
}
},
 carregar_mostrar :function(gl, configuracao){
 
 carregando = true;
 
 gl.classList.add('gloading_'+configuracao.tipo+'_carregando');
},
 carregar_esconder :function(gl, configuracao){
 (function(gl, configuracao){
 if(configuracao.tempo > 0){
 setTimeout(function(){
 
 if (gl.classList.contains('gloading_tela_carregando')){gl.classList.remove('gloading_tela_carregando');}
 if (gl.classList.contains('gloading_barra_carregando')){gl.classList.remove('gloading_barra_carregando');}
 
 carregando = false;
}, configuracao.tempo);
}else{
 
 if (gl.classList.contains('gloading_tela_carregando')){gl.classList.remove('gloading_tela_carregando');}
 if (gl.classList.contains('gloading_barra_carregando')){gl.classList.remove('gloading_barra_carregando');}
 
 carregando = false;
}
})(gl, configuracao);
}
};
}();




 $(function(){
 $('body').on('click', '.check .check-borda, .check .check-texto',function(evento){
 
 var check = $(this).closest('.check');
 var check_borda = check.find('.check-borda');
 var campo = check.closest('.admin_campos-campo').find('.admin_campo');
 
 if (!check.hasClass('check_selecionado')){
 
 check.addClass('check_selecionado');
 check_borda.addClass('check-borda_efeito').html("<span class='check-borda-bolinha'></span>");
}else{
 
 check.removeClass('check_selecionado');
 check_borda.html("");
}
 var valores = '', opcoes = check.closest('.checks').find('.check_selecionado');
 if(opcoes.length){
 opcoes.each(function(){valores += $(this).attr('id')+',';});
 valores = valores.substr(0,(valores.length-1));
}
 campo.val(valores).trigger('change');
 ValidacaoCampos(campo);
 setTimeout(function(){check_borda.removeClass('check-borda_efeito');},200);
});
});
'use strict';
var GFM = function(){
 return{
 instalar :function(configuracao){
 
 if (configuracao.hasOwnProperty('elemento') == false){configuracao.elemento = '';}
 if (configuracao.hasOwnProperty('mascara') == false){configuracao.mascara = '';}
 if (configuracao.hasOwnProperty('placeholder') == false){configuracao.placeholder = '';}
 
 var elementos = document.querySelectorAll(configuracao.elemento);
 
 for (var i = 0;i < elementos.length;i++){
 (function(configuracao, elemento){
 
 if (elemento !== undefined && elemento !== null){
 
 if (elemento.dataset.gfm_mascara !== undefined && elemento.dataset.gfm_mascara !== null){configuracao.mascara = elemento.dataset.gfm_mascara;}
 if (elemento.dataset.gfm_placeholder !== undefined && elemento.dataset.gfm_placeholder !== null){configuracao.placeholder = elemento.dataset.gfm_placeholder;}
 
 if (elemento.addEventListener){
 elemento.addEventListener("focusin", function (evento){GFM.campo_focusin(configuracao, elemento, evento);});
 elemento.addEventListener("focusout", function (evento){GFM.campo_focusout(configuracao, elemento, evento);});
 elemento.addEventListener('input', function (evento){GFM.campo_digitar(configuracao, elemento, evento);});
}else if (elemento.attachEvent){
 elemento.attachEvent("onfocusin", function (evento){GFM.campo_focusin(configuracao, elemento, evento);});
 elemento.attachEvent("onfocusout", function (evento){GFM.campo_focusout(configuracao, elemento, evento);});
 elemento.attachEvent('oninput', function (evento){GFM.campo_digitar(configuracao, elemento, evento);});
}
}
})(configuracao, elementos[i]);
}
},
 campo_focusin :function(configuracao, elemento, evento){
 
 if (elemento.placeholder){elemento.dataset.gfm_placeholder_anterior = elemento.placeholder;}
 else{elemento.dataset.gfm_placeholder_anterior = ' ';}
 if (configuracao.placeholder){elemento.placeholder = configuracao.placeholder;}
 
 elemento.maxLength = configuracao.mascara.length;
},
 campo_focusout :function(configuracao, elemento, evento){
 
 if (elemento.value.length < configuracao.mascara.replace('9','').replace('Z','').replace('D','').replace('?','').length){elemento.value = '';}
 
 if (elemento.dataset.gfm_placeholder_anterior){elemento.placeholder = elemento.dataset.gfm_placeholder_anterior;}
},
 campo_digitar :function(configuracao, elemento, evento){
 
 if (evento.inputType && evento.inputType.indexOf('delete') === 0){return;}
 
 if (evento.data != null){
 
 var tecla_codigo = evento.data.charCodeAt(0);
 
 if (tecla_codigo === 8 || tecla_codigo === 46 || tecla_codigo === 16 || tecla_codigo === 17 || tecla_codigo === 18){return;}
 
 if (tecla_codigo === 37 || tecla_codigo === 38 || tecla_codigo === 39 || tecla_codigo === 40){return;}
}
 
 evento.preventDefault();
 evento.stopPropagation();
 
 var texto = elemento.value;
 
 var posicionar_cursor = false;
 
 if (typeof elemento.selectionStart == "number" && typeof elemento.selectionEnd == "number"){
 var selecao_inicio = elemento.selectionStart;
 var selecao_fim = elemento.selectionEnd;
 if (selecao_inicio != selecao_fim || elemento.value.length != selecao_fim){
 
 
 
 
 posicionar_cursor = true;
 
}
}
 
 var texto_tamanho = texto.length;
 var texto_novo = '';
 var caractere = '';
 
 for (var numero_mascara = 0, numero_texto = 0;numero_mascara < configuracao.mascara.length;++numero_mascara){
 
 caractere = texto.charAt(numero_texto);
 
 switch (configuracao.mascara.charAt(numero_mascara)){
 case '0' :
 case '9' :
 if (/\d/.test(caractere)){texto_novo += caractere;}
 ++numero_texto;
 break;
 case 'A' :
 case 'Z' :
 if (/[a-z]/i.test(caractere)){texto_novo += caractere;}
 ++numero_texto;
 break;
 case 'C' :
 case 'D' :
 if (/[a-z0-9]/i.test(caractere)){texto_novo += caractere;}
 ++numero_texto;
 break;
 case 'X' :
 case '?' :
 texto_novo += caractere;
 ++numero_texto;
 break;
 default :
 texto_novo += configuracao.mascara.charAt(numero_mascara);
 if (configuracao.mascara.charAt(numero_mascara) == texto.charAt(numero_mascara)){
 ++numero_texto;
}else{if (posicionar_cursor && numero_texto+1 == selecao_inicio){++selecao_inicio;}}
 break;
}
 
 if (numero_texto == texto_tamanho){break;}
}
 
 elemento.value = texto_novo;
 
 if (posicionar_cursor && elemento.setSelectionRange){elemento.setSelectionRange(selecao_inicio, selecao_inicio);}
}
};
}();


 
 var gm_quantidade = 0;
 function AbrirGM(id_gm, componente, configuracao){
 
 var z_index_fundo = 999, z_index_caixa = 1000;
 if($('#gpc-menu').length){
 z_index_fundo = 999999999999902;
 z_index_caixa = 999999999999903;
}
 var gm_conteudos = '';
 if (configuracao['gm']['conteudos']){$.each(configuracao['gm']['conteudos'], function (classe, div){if (div.conteudo){gm_conteudos += "<div class='"+componente+"-"+classe+"' "+div.extras+" style='"+div.estilos+"'>"+div.conteudo+"</div>";}});}
 var gm_fundo_conteudos = '';
 if (configuracao['gm']['conteudos']){$.each(configuracao['gm_fundo']['conteudos'], function (classe, div){if (div.conteudo){gm_fundo_conteudos += "<div class='"+componente+"_fundo-"+classe+"' "+div.extras+" style='"+div.estilos+"'>"+div.conteudo+"</div>";}});}
 var scroll = window.scrollY;
 var tela_altura = $(window).height();
 if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){
 scroll = (document.getElementById("gpc-blocos").scrollTop-$('#gpc-blocos').offset().top);
 tela_altura = $('#gpc-blocos_editor').height();
}
 
 if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){$('#gpc-blocos_editor').append("<div gm_id='"+id_gm+"' gm_componente='"+componente+"' class='gm_fundo "+id_gm+" "+configuracao['gm_fundo']['classes']+"' "+configuracao['gm_fundo']['extras']+" style='z-index:"+(z_index_fundo+gm_quantidade)+";"+configuracao['gm_fundo']['estilos']+"'>"+gm_fundo_conteudos+"</div>");}
 else{$("body").append("<div gm_id='"+id_gm+"' gm_componente='"+componente+"' class='gm_fundo "+id_gm+" "+configuracao['gm_fundo']['classes']+"' "+configuracao['gm_fundo']['extras']+" style='z-index:"+(z_index_fundo+gm_quantidade)+";"+configuracao['gm_fundo']['estilos']+"'>"+gm_fundo_conteudos+"</div>");}
 
 $("."+id_gm).addClass('gm_fundo_ativo');
 if(!$(".gm").length || $('.gpc_modal').lenght){
 
 if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){$('#gpc-blocos_editor').addClass('body_bloquear');}
 else{
 if(componente == 'gpc_modal_popup'){$("body").addClass('body_bloquear_site');}
 else{
 $("body").addClass('body_bloquear');
 if(componente == 'gpc_modal_imagens'){$("body").css({'overflow':'hidden'});}
}
}
 
 if($('#site').length && componente != 'gma_modal'){$('#site').addClass('site_borrar').css({'top':-scroll+'px','height':($('#site').height()+scroll)+''});}
 else if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){$('#gpc-blocos_editor-blocos').addClass('administrador_borrar').css({'top':-(scroll)+'px'});}
 else{$('#administrador').addClass('administrador_borrar').css({'top':-scroll+'px'});}
}
 
 if(componente == 'gpc_modal' && $('#gpc-blocos_editor').length){$('#gpc-blocos_editor').append("<div id='"+id_gm+"' gm_componente='"+componente+"' gm_scroll='"+scroll+"' class='gm "+configuracao['gm']['classes']+"' "+configuracao['gm']['extras']+" style='z-index:"+(z_index_caixa+gm_quantidade)+";top:"+tela_altura+"px;"+configuracao['gm']['estilos']+"'>"+gm_conteudos+"</div>");}
 else if(componente == 'gma_modal'){$("body").append("<div id='"+id_gm+"' gm_componente='"+componente+"' gm_scroll='"+scroll+"' class='gm gm_efeitos "+configuracao['gm']['classes']+"' "+configuracao['gm']['extras']+" style='z-index:"+(z_index_caixa+gm_quantidade)+";top:"+((tela_altura/100)*5)+"px;"+configuracao['gm']['estilos']+"'>"+gm_conteudos+"</div>");}
 else if(componente == 'gpc_modal_popup'){$("body").append("<div id='"+id_gm+"' gm_componente='"+componente+"' gm_scroll='"+scroll+"' class='gm gm_esconder "+configuracao['gm']['classes']+"' "+configuracao['gm']['extras']+" style='z-index:"+(z_index_caixa+gm_quantidade)+";top:"+(tela_altura+scroll)+"px;"+configuracao['gm']['estilos']+"'>"+gm_conteudos+"</div>");}
 else{$("body").append("<div id='"+id_gm+"' gm_componente='"+componente+"' gm_scroll='"+scroll+"' class='gm gm_esconder "+configuracao['gm']['classes']+"' "+configuracao['gm']['extras']+" style='z-index:"+(z_index_caixa+gm_quantidade)+";top:"+tela_altura+"px;"+configuracao['gm']['estilos']+"'>"+gm_conteudos+"</div>");}
 
 if(componente == 'gma_modal'){
 setTimeout(function(){
 $('#'+id_gm).css('opacity', '1');
 PosicionarGM(id_gm);
},250);
}else{setTimeout(function(){PosicionarGM(id_gm);},150);}
 
 window.addEventListener('resize', function(event){
 if(componente != 'gpc_modal'){
 if (componente == 'gmi'){PosicionarGM(id_gm, false);}
 else{PosicionarGM(id_gm);}
}
});
}
 function PosicionarGM(id_gm, efeitos){
 
 if(efeitos === undefined || efeitos === ''){efeitos = true;}
 
 var gm = $("#"+id_gm);
 if (gm.length){
 
 var tela_altura = $(window).height();
 var tela_largura = $(window).width();
 var tela = window.scrollY;
 if($('.gm').length > 1){tela = 0;}
 
 if (gm.attr('gm_componente') == 'gpc_modal'){
 tela = document.getElementById("gpc-blocos").scrollTop;
 tela_altura = $('#gpc-blocos_editor').height();
 gm.find('.gpc_modal-centro').removeAttr('style');
 var gm_fundo = $("."+id_gm);
 var height = 20;
 $('.'+gpc_controle['classe_bloco']).each(function(){height += $(this).height();});
 gm_fundo.css({'height':height+'px'});
}
 if (gm.attr('gm_componente') == 'gpc_modal_formulario'){gm.find('.gpc_modal_formulario-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gml'){gm.find('.gml-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gmf'){gm.find('.gmf-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gm_configurar_dns_completo'){gm.find('.gm_configurar_dns_completo-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'guo'){gm.find('.guo-passos').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gsp'){gm.find('.gmf-opcoes').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gpc_modal_imagens'){gm.find('.gpc_modal_imagens-centro, .gpc_modal_imagens-centro-pastas, .gpc_modal_imagens-centro-fotos').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gmi'){
 
 var imagem = CalcularGMI(gmi_elemento['elemento']);
 
 if (gmi_caixa['elemento']){
 
 gmi_caixa['elemento'].css({'width':imagem['largura']+'px', 'height':imagem['altura']+'px'});
 
 gmi_caixa_imagem['elemento'].css({'width':imagem['largura']+'px', 'height':imagem['altura']+'px'});
}
}
 if (gm.attr('gm_componente') == 'gmi_informacoes'){gm.find('.gmi_informacoes-centro').removeAttr('style');}
 if (gm.attr('gm_componente') == 'gmi_comentarios'){gm.find('.gmi_comentarios-centro').css('height','100%');}
 
 var gm_largura = gm.width();
 
 var gm_altura = 0;
 if (gm.attr('gm_componente') == 'gpc_modal_imagens' || gm.attr('gm_componente') == 'gml'){gm_altura = tela_altura;
}else if (gm.attr('gm_componente') == 'gpc_modal_popup' || gm.attr('gm_componente') == 'gpc_modal'){
 if(gm.attr('gm_componente') == 'gpc_modal_popup'){tela = 0;}
 gm_altura = $('.gpc_modal').height();
 var gm_fundo = $("."+id_gm);
 var height = 20;
 if (gm.attr('gm_componente') == 'gpc_modal_popup'){
 gm_altura = $('.gpc_modal_popup-centro').height();
 $('.gpc-b').each(function(){height += $(this).height();});
}else{$('.'+gpc_controle['classe_bloco']).each(function(){height += $(this).height();});}
 if (gm_altura >= tela_altura){
 $('#site').css({'height':(gm_altura+Math.abs(parseFloat($('#site').css('top')))+70)+'px'});
 gm_fundo.css({'height':(gm_altura+70)+'px'});
}else{
 $('#site').css({'height':(tela_altura+Math.abs(parseFloat($('#site').css('top'))))+'px'});
 if(gm_altura+20 >= (gm_fundo.height()-10)){gm_fundo.css({'height':(tela_altura+10)+'px'});}
 else{gm_fundo.css({'height':tela_altura+'px'});}
}
}else if (gm.attr('gm_componente') == 'gpc_modal_formulario'){gm_altura = $('.gpc_modal_formulario').height();
}else if (gm.attr('gm_componente') == 'gma_modal'){gm_altura = $('#gm-gpages_modal').height();
}else{gm.children().each(function(){gm_altura += $(this).outerHeight(true);});}
 if (gm_altura >= tela_altura){
 if (gm.attr('gm_componente') == 'gpc_modal_formulario'){gm.find('.gpc_modal_formulario-centro').css({'height':$('.gpc_modal_formulario').height()+'px'});}
 if (gm.attr('gm_componente') == 'gpc_modal'){gm.find('.gpc_modal-centro').css({'height':$('.gpc_modal').height()+'px'});}
 if (gm.attr('gm_componente') == 'gpc_modal_popup'){gm.find('.gpc_modal_popup-centro').css({'height':$('.gpc_modal_popup').height()+'px'});}
 if (gm.attr('gm_componente') == 'gml'){
 
 tela += 20;
 gm.find('.gml-centro, .gml-opcoes-lista-lateral, .gml-opcoes-lista-opcoes').css({'height':((tela_altura-(gm.find('.gml-topo').outerHeight()))-50)+'px'});
}
 if (gm.attr('gm_componente') == 'gmf'){gm.find('.gmf-centro').css({'height':((tela_altura-((gm.find('.gmf-topo').outerHeight())+(gm.find('.gmf-rodape').outerHeight())))-20)+'px'});}
 if (gm.attr('gm_componente') == 'gm_configurar_dns_completo'){gm.find('.gm_configurar_dns_completo-centro').css({'height':((tela_altura-((gm.find('.gm_configurar_dns_completo-topo').outerHeight())+(gm.find('.gm_configurar_dns_completo-rodape').outerHeight())))-20)+'px'});}
 if (gm.attr('gm_componente') == 'gpc_modal_imagens'){
 tela += 50;
 gm.find('.gpc_modal_imagens-centro, .gpc_modal_imagens-centro-pastas, .gpc_modal_imagens-centro-fotos').css({'height':((tela_altura-(gm.find('.gpc_modal_imagens-topo').outerHeight()))-120)+'px'});
}
 if (gm.attr('gm_componente') == 'guo'){gm.find('.guo-passos').css({'height':(gm_altura-(gm_altura-tela_altura)-96)+'px'});}
 if (gm.attr('gm_componente') == 'gsp'){gm.find('.gsp-opcoes').css({'height':((tela_altura-((gm.find('.gsp-topo').outerHeight())+(gm.find('.gsp-rodape').outerHeight())))-20)+'px'});}
 if (gm.attr('gm_componente') == 'gmi_informacoes'){gm.find('.gmi_informacoes-centro').css({'height':((tela_altura-((gm.find('.gmi_informacoes-topo').outerHeight())))-20)+'px'});}
 if (gm.attr('gm_componente') == 'gmi_comentarios'){gm.find('.gmi_comentarios-centro').css({'height':((tela_altura-((gm.find('.gmi_comentarios-topo').outerHeight())+(gm.find('.gmi_comentarios-rodape').outerHeight())))-20)+'px'});}
 
 if (efeitos){
 if (!gm.hasClass('gm_efeitos')){gm.addClass('gm_efeitos');}
}else{
 if (gm.hasClass('gm_efeitos')){gm.removeClass('gm_efeitos');}
}
 
 if(gm.attr('gm_componente') == 'gpc_modal_popup'){
 setTimeout(function(){
 gm.css({'top':(tela+10)+'px'}).removeClass('gm_esconder');
 $('.'+id_gm).css({'overflow':''});
},25);
}else if (gm.attr('gm_componente') == 'gma_modal'){setTimeout(function(){gm.css({'top':(tela)+'px'}).removeClass('gm_esconder');},25);}
 else{
 setTimeout(function(){
 gm.css({'top':(tela+10)+'px'}).removeClass('gm_esconder');
 if(gm.attr('gm_componente') == 'gpc_modal' && typeof gpc_controle['elementos_iniciados'][id_gm] == 'object'){
 
 if(Object.keys(gpc_controle['elementos_iniciados']).length){
 $.each(gpc_controle['elementos_iniciados'], function (i, elemento_iniciado){
 if(typeof gpc_controle['elementos_iniciados'][i].updateRect == 'function'){gpc_controle['elementos_iniciados'][i].updateRect();}
});
}
}
},25);
}
}else{
 if (gm.attr('gm_componente') == 'gpc_modal_imagens'){gm.find('.gpc_modal_imagens-centro, .gpc_modal_imagens-centro-pastas, .gpc_modal_imagens-centro-fotos').css({'height':((gm_altura-(gm.find('.gpc_modal_imagens-topo').outerHeight()))-120)+'px'});}
 if (gm.attr('gm_componente') == 'gml'){gm.find('.gml-centro, .gml-opcoes-lista-lateral, .gml-opcoes-lista-opcoes').css({'height':((tela_altura-(gm.find('.gml-topo').outerHeight()))-50)+'px'});}
 
 if (efeitos){if (!gm.hasClass('gm_efeitos')){gm.addClass('gm_efeitos');}}else{if (gm.hasClass('gm_efeitos')){gm.removeClass('gm_efeitos');}}
 
 if(gm.attr('gm_componente') == 'gpc_modal_popup'){
 setTimeout(function(){
 gm.css({'top':(((tela_altura-gm_altura)/2)+tela)+'px','bottom':'initial'}).removeClass('gm_esconder');
 $('.'+id_gm).css({'overflow':''});
},25);
}else{
 setTimeout(function(){
 gm.css({'top':(((tela_altura-gm_altura)/2)+tela)+'px','bottom':'initial'}).removeClass('gm_esconder');
 if(gm.attr('gm_componente') == 'gpc_modal' && typeof gpc_controle['elementos_iniciados'][id_gm] == 'object'){gpc_controle['elementos_iniciados'][id_gm].updateRect();}
},25);
}
}
}
}
 function FecharGM(id_gm){
 var gm = $("#"+id_gm);
 if (gm.length){
 var componente = gm.attr('gm_componente');
 if(componente == 'gpc_modal_formulario'){MostrarPreview(false);}
 if(gm.attr('id') == 'gm-plano_alteracao_pagamento' || gm.attr('id') == 'gm-plano_alteracao' || gm.attr('id') == 'gm-plano_contratou'){
 editou = false;
 editou_caixa = false;
 GLoading.carregar({'ativar':false});
 document.location.reload();
}
 if(gm.attr('gm_componente') == 'gpc_modal' && typeof gpc_controle['elementos_iniciados'][id_gm] == 'object'){
 gpc_controle['elementos_iniciados'][id_gm].destroy();
 delete gpc_controle['elementos_iniciados'][id_gm];
}
 
 var gm_fundo = $("."+id_gm);
 var tela = window.scrollY;
 var tela_altura = $(window).height();
 if (componente == 'gpc_modal'){
 tela_largura = $('#gpc-blocos_editor').width();
 tela = document.getElementById("gpc-blocos").scrollTop;
}
 
 if (!gm.hasClass('gm_efeitos')){gm.addClass('gm_efeitos');}
 
 if(componente == 'gma_modal'){gm.css({'opacity':'0'});}
 else{gm.css({'top':(tela_altura+tela)+'px'});}
 
 setTimeout(function(){gm_fundo.removeClass('gm_fundo_ativo');},100);
 
 setTimeout(function(){
 
 if($('.gm_fundo').length == 1){
 if (componente == 'gpc_modal'){
 $('.'+gpc_controle['classe_elemento_adicionar']+'[gpc_tipo="bloco"]').removeClass('esconder');
 var elemento_original = $('.gpc_modal').attr('gpc_id_elemento');
 if(gpc_controle['elementos_selecionados']['elementos_resize'] != ''){
 gpc_controle['elementos_selecionados'] ={'elementos':{}, 'elementos_resize':'', 'total' :0,'helper':{'largura':0,'altura':0,'left_original':'','top_original':'','elemento_left_original':'','elemento_top_original':'','scrollTop':$("#gpc-blocos").offset().top,'scrollLeft':$("#gpc-blocos").scrollLeft()}};
 $('#'+gpc_controle['classe_elementos_selecionados']).remove();
 $('.ui-selected').removeClass('ui-selected');
}
 setTimeout(function(){
 $('#elementos_'+elemento_original).addClass('ativo').trigger('click');
 gpc_controle['elementos_iniciados']['elemento']['target'] = $('#elementos_'+elemento_original)[0];
 gpc_controle['elementos_iniciados']['elemento'].updateRect();
 gpc_controle['elementos_iniciados']['elemento'].selfElement.style.opacity = 1;
},300);
 $('#gpc-blocos_editor-blocos').removeClass('administrador_borrar').removeAttr('style');
 $('.'+gpc_controle['classe_bloco_configurar']).remove();
}else if ($('#site').length){
 if($('#site').closest('.gmf').length){$('#administrador').removeClass('administrador_borrar').removeAttr('style');}
 else{$('#site').removeClass('site_borrar').removeAttr('style');}
}else{$('#administrador').removeClass('administrador_borrar').removeAttr('style');}
}
 
 if($('.gm_fundo').length == 1){
 if (componente == 'gpc_modal'){$('#gpc-blocos_editor').removeClass('body_bloquear');}
 else{$('body').removeClass('body_bloquear body_bloquear_site');}
}
 
 if($('.gm_fundo').length == 1){
 if(componente == 'gpc_modal'){document.getElementById("gpc-blocos").scrollTop = parseFloat(gm.attr('gm_scroll'))+$('#gpc-blocos').offset().top;}
 else{window.scroll({top:gm.attr('gm_scroll'), behavior:"auto"});}
}
 
 gm.remove();gm_fundo.remove();
 editou = false;
 editou_caixa = false;
 GLoading.carregar({'ativar':false});
 if(componente == 'gpc_modal_imagens'){$("body").css({'overflow':''});}
 if(componente == 'gpc_modal'){
 ElementosBind('todos','reiniciar');
 setTimeout(function(){
 if(typeof gpc_controle['elementos_iniciados']['elemento'] == 'object'){
 
 if(Object.keys(gpc_controle['elementos_iniciados']).length){
 $.each(gpc_controle['elementos_iniciados'], function (i, elemento_iniciado){
 if(typeof gpc_controle['elementos_iniciados'][i].updateRect == 'function'){gpc_controle['elementos_iniciados'][i].updateRect();}
});
}
}
},25);
}
},200);
}
}
 function PulsarGM(id_gm){
 $('#'+id_gm).addClass('gm_pulsar');
 setTimeout(function(){$('#'+id_gm).removeClass('gm_pulsar');},100);
}
 $(function(){
 $('body').on('click','.gm_fundo',function(){if ($(this).attr('gm_fundo_acao') == 'pulsar'){PulsarGM($(this).attr('gm_id'));}else if ($(this).attr('gm_fundo_acao') == 'fechar'){FecharGM($(this).attr('gm_id'));}});
 $('body').on('click','.gm_fechar',function(){FecharGM($(this).attr('gm_id'));});
});
'use strict';

var GModalApproval = function(){
 var _handlerBotaoEditar = null;
 var _handlerBotaoConfigurar = null;
 var _handlerBotaoConfirmar = null;
 var _handlerBotaoFechar = null;
 return{
 
 instalar :function(configuracao){
 
 if (configuracao.hasOwnProperty('barra') == false){configuracao.barra = '';}
 
 if (configuracao.barra != ''){
 
 if(GModalApproval.preferencias() == null){GModalApproval.barra(configuracao);}
 else{
 GModalApproval.botao(configuracao);
 GModalApproval.instalar_scripts(configuracao,false);
}
 
 setTimeout(function(){GModalApproval.posicionar();}, 500);
}
},
 
 barra :function(configuracao){
 
 if (configuracao.barra.hasOwnProperty('fechar') == false){configuracao.barra.fechar = false;}
 if (configuracao.barra.hasOwnProperty('cor') == false){configuracao.barra.cor = 'ffffff';}
 if (configuracao.barra.hasOwnProperty('classe') == false){configuracao.barra.classe = '';}
 if (configuracao.barra.hasOwnProperty('botao_configurar') == false){configuracao.barra.botao_configurar = false;}
 if (configuracao.barra.hasOwnProperty('botao_aceitar') == false){configuracao.barra.botao_aceitar = 'Entendi e aceito';}
 if (configuracao.barra.hasOwnProperty('texto') == false){configuracao.barra.texto = 'Usamos cookies para personalizar conteúdos e melhorar a sua experiência.';}
 
 var barra = '<div id="gpc-lgpd_texto">'+configuracao.barra.texto+'</div>';
 barra += '<div id="gpc-lgpd_botoes">';
 if(configuracao.barra.botao_configurar){barra += '<div id="gpc-lgpd_botoes-configurar" class="gpc-lgpd_botoes-botao">'+configuracao.barra.botao_configurar+'</div>';}
 barra += '<div id="gpc-lgpd_botoes-confirmar" class="gpc-lgpd_botoes-botao">'+configuracao.barra.botao_aceitar+'</div>';
 barra += "</div>";
 if(configuracao.barra.fechar){barra += '<div id="gpc-lgpd_fechar"></div>';}
 
 var g_lgpd = document.createElement("div");
 g_lgpd.id = 'gpc-lgpd';
 g_lgpd.className = 'posicionar gpc-lgpd-cor_'+configuracao.barra.cor+' '+(configuracao.barra.botao_configurar ? 'botoes' :'botao')+' '+configuracao.barra.classe;
 g_lgpd.innerHTML = barra;
 document.body.appendChild(g_lgpd);
 setTimeout(function(){GModalApproval.configurar(configuracao);}, 300);
},
 botao :function(configuracao){
 
 if(configuracao.barra.hasOwnProperty('editar_consentimento') == false){configuracao.barra.editar_consentimento = true;}
 if(configuracao.barra.editar_consentimento){
 var g_lgpd = document.getElementById("gpc-lgpd_editar");
 if(g_lgpd == null){
 
 g_lgpd = document.createElement("div");
 g_lgpd.id = 'gpc-lgpd_editar';
 g_lgpd.className = 'posicionar gtt-direita gpc-lgpd-cor_'+configuracao.barra.cor+' '+configuracao.barra.classe;
 g_lgpd.setAttribute('data-gtt','Preferências de cookies');
 document.body.appendChild(g_lgpd);
 GTooltip.instalar({'elemento' :'.gtt-direita', 'direcao' :'direita'});
 
 setTimeout(function(){GModalApproval.configurar(configuracao);}, 300);
}
}
 
 setTimeout(function(){GModalApproval.posicionar();}, 200);
},
 modal :function(configuracao){
 
 GLoading.carregar({'ativar':true});
 
 var conteudo = '';
 if (configuracao.hasOwnProperty('textos') == false){configuracao.textos = '';}
 if (configuracao.hasOwnProperty('opcoes') == false){configuracao.opcoes = '';}
 
 if(configuracao.textos != ''){
 conteudo += '<div id="gpc_modal_lgpd-titulo">';
 for (var i = 0;i < configuracao.textos.length;i++){
 if(configuracao.textos[i].tipo == 'titulo'){conteudo += '<div class="gpc_modal_lgpd-titulo-titulo">'+configuracao.textos[i].texto+'</div>';}
 if(configuracao.textos[i].tipo == 'texto'){conteudo += '<div class="gpc_modal_lgpd-titulo-texto">'+configuracao.textos[i].texto+'</div>';}
}
 conteudo += '</div>';
}
 if(configuracao.opcoes != ''){
 var cookie = GModalApproval.preferencias() || 'o:1&e:0&m:0';
 for (var i = 0;i < configuracao.opcoes.length;i++){
 if (configuracao.opcoes[i].hasOwnProperty('aviso') == false){configuracao.opcoes[i].aviso = '';}
 if (configuracao.opcoes[i].hasOwnProperty('titulo') == false){configuracao.opcoes[i].titulo = '';}
 if (configuracao.opcoes[i].hasOwnProperty('texto') == false){configuracao.opcoes[i].texto = '';}
 conteudo += '<div class="gpc_modal_lgpd-opcoes">';
 conteudo += '<div class="gpc_modal_lgpd-opcoes-protecao">';
 conteudo += '<span class="gpc_modal_lgpd-opcoes-titulo">'+configuracao.opcoes[i].titulo+'</span>';
 if(configuracao.opcoes[i].aviso != ''){conteudo += '<span class="gpc_modal_lgpd-opcoes-aviso">'+configuracao.opcoes[i].aviso+'</span>';}
 else{
 if(cookie){configuracao.opcoes[i].valor = (cookie.indexOf(configuracao.opcoes[i].id+':1') !== -1 ? true :false);}
 conteudo += '<span id="'+configuracao.opcoes[i].id+'" class="gpc_modal_lgpd-opcoes-selecao'+(configuracao.opcoes[i].valor ? ' gpc_modal_lgpd-opcoes-selecao_selecionado' :'')+'"><span class="marcador"></span></span>';
}
 conteudo += '</div>';
 conteudo += '<div class="gpc_modal_lgpd-opcoes-texto">'+configuracao.opcoes[i].texto+'</div>';
 conteudo += '</div>';
}
}
 conteudo += '<div id="gpc_modal_lgpd-confirmar">Confirmar configurações</div>';
 
 var modal ={
 'gm' :{
 'conteudos' :{
 'topo' :{'conteudo' :"<div id='gpc_modal_popup_lgpd-topo-fechar' class='gpc_modal_popup_lgpd-topo-fechar gpc_modal_popup-fechar icone-fechar'></div>", 'estilos' :'', 'extras' :''},
 'centro' :{'conteudo' :conteudo, 'estilos' :'', 'extras' :''}
},
 'classes' :'gm_lgpd',
 'estilos' :'max-width:420px;',
 'extras' :''
},
 'gm_fundo' :{
 'conteudos' :{'topo' :{'conteudo' :"<div id='gpc_modal_popup-fundo-fechar' class='gpc_modal_popup-fundo-fechar gpc_modal_popup-fechar icone-fechar'></div>"}},
 'classes' :'gpc_modal_lgpd-fundo',
 'estilos' :'overflow:hidden;',
 'extras' :'gm_fundo_acao="fechar" id="gpc_modal_lgpd-fundo"'
}
};
 
 gm_quantidade++;
 AbrirGM('gpc_modal_lgpd_'+gm_quantidade, 'gpc_modal_popup_lgpd',modal);
 
 GLoading.carregar({'ativar':false});
 var lgpd = document.getElementById("gpc-lgpd");
 if(lgpd == null){lgpd = document.getElementById("gpc-lgpd_editar");}
 lgpd.classList.add('posicionar');
 lgpd.classList.remove('posicionado');
 setTimeout(function(){
 
 var botao_confirmar = document.getElementById("gpc_modal_lgpd-confirmar");
 if(botao_confirmar != null){botao_confirmar.addEventListener("click", function(){GModalApproval.confirmar(configuracao);});}
 var fechar1 = document.getElementById("gpc_modal_popup_lgpd-topo-fechar");
 if(fechar1 != null){
 fechar1.addEventListener("click", function(){
 FecharGM('gpc_modal_lgpd_'+gm_quantidade);
 GModalApproval.posicionar();
});
}
 var fechar2 = document.getElementById("gpc_modal_popup-fundo-fechar");
 if(fechar2 != null){fechar2.addEventListener("click", function(){GModalApproval.posicionar();});}
 var fechar3 = document.getElementById("gpc_modal_lgpd-fundo");
 if(fechar3 != null){fechar3.addEventListener("click", function(){GModalApproval.posicionar();});}
 var opcoes = document.getElementsByClassName('gpc_modal_lgpd-opcoes-selecao');
 if(opcoes != null){
 for (var i = 0;i < opcoes.length;i++){
 opcoes[i].addEventListener("click", function(e){
 if(this.classList.contains('gpc_modal_lgpd-opcoes-selecao_selecionado')){this.classList.remove('gpc_modal_lgpd-opcoes-selecao_selecionado');}
 else{this.classList.add('gpc_modal_lgpd-opcoes-selecao_selecionado');}
});
}
}
},400);
},
 posicionar :function(){
 var g_lgpd = document.getElementById("gpc-lgpd");
 if(g_lgpd == null){g_lgpd = document.getElementById("gpc-lgpd_editar");}
 if(g_lgpd){
 g_lgpd.classList.add('posicionado');
 g_lgpd.classList.remove('posicionar');
}
},
 
 configurar :function(configuracao){
 
 var botao_editar = document.getElementById("gpc-lgpd_editar");
 if(botao_editar){
 if(_handlerBotaoEditar){botao_editar.removeEventListener("click", _handlerBotaoEditar);}
 _handlerBotaoEditar = function(){GModalApproval.modal(configuracao);};
 botao_editar.addEventListener("click", _handlerBotaoEditar);
}
 
 var botao_configurar = document.getElementById("gpc-lgpd_botoes-configurar");
 if(botao_configurar){
 if(_handlerBotaoConfigurar){botao_configurar.removeEventListener("click", _handlerBotaoConfigurar);}
 _handlerBotaoConfigurar = function(){GModalApproval.modal(configuracao);};
 botao_configurar.addEventListener("click", _handlerBotaoConfigurar);
}
 
 var botao_confirmar = document.getElementById("gpc-lgpd_botoes-confirmar");
 if(botao_confirmar){
 if(_handlerBotaoConfirmar){botao_confirmar.removeEventListener("click", _handlerBotaoConfirmar);}
 _handlerBotaoConfirmar = function(){GModalApproval.confirmarTodos(configuracao);};
 botao_confirmar.addEventListener("click", _handlerBotaoConfirmar);
}
 
 var botao_fechar = document.getElementById("gpc-lgpd_fechar");
 if(botao_fechar){
 if(_handlerBotaoFechar){botao_fechar.removeEventListener("click", _handlerBotaoFechar);}
 _handlerBotaoFechar = function(){GModalApproval.cancelarTodos(configuracao);};
 botao_fechar.addEventListener("click", _handlerBotaoFechar);
}
},
 confirmar :function(configuracao){
 
 var valor = 'o:1';
 
 var elementos = document.getElementsByClassName('gpc_modal_lgpd-opcoes-selecao');
 let editado = false;
 if (elementos.length){
 for (var i = 0;i < elementos.length;i++){
 valor += '&'+elementos[i].id+':'+(elementos[i].classList.contains('gpc_modal_lgpd-opcoes-selecao_selecionado') ? '1' :'0');
 if (elementos[i].classList.contains('gpc_modal_lgpd-opcoes-selecao') == true){
 for (var x = 0;x < configuracao.opcoes.length;x++){
 if (configuracao.opcoes[x].id == elementos[i].id){
 if(configuracao.opcoes[x].valor != elementos[i].classList.contains('gpc_modal_lgpd-opcoes-selecao_selecionado')){editado = true;}
 configuracao.opcoes[x].valor = elementos[i].classList.contains('gpc_modal_lgpd-opcoes-selecao_selecionado');
}
}
}
}
}
 configuracao.editado = editado;
 GModalApproval.salvar_preferencias(valor,configuracao.dominio);
 
 
 FecharGM('gpc_modal_lgpd_'+gm_quantidade);
 
 var elemento = document.getElementById('gpc-lgpd');
 if (elemento != null){
 
 elemento.remove();
 
 GModalApproval.botao(configuracao);
}
 
 GModalApproval.posicionar();
 
 GModalApproval.remover_preferencias(configuracao);
},
 confirmarTodos :function(configuracao){
 
 var valor = 'o:1';
 
 for (var x = 0;x < configuracao.opcoes.length;x++){
 if(configuracao.opcoes[x].hasOwnProperty('valor')){
 configuracao.opcoes[x].valor = true;
 valor += '&'+configuracao.opcoes[x].id+':1';
}
}
 GModalApproval.salvar_preferencias(valor,configuracao.dominio);
 GModalApproval.instalar_scripts(configuracao);
 configuracao.editado = true;
 
 var elemento = document.getElementById('gpc-lgpd');
 if(elemento != null){elemento.remove();}
 
 GModalApproval.botao(configuracao);
},
 cancelarTodos :function(configuracao){
 
 var valor = 'o:1';
 
 for (var x = 0;x < configuracao.opcoes.length;x++){
 if(configuracao.opcoes[x].hasOwnProperty('valor')){
 configuracao.opcoes[x].valor = false;
 valor += '&'+configuracao.opcoes[x].id+':0';
}
}
 configuracao.editado = true;
 GModalApproval.salvar_preferencias(valor,configuracao.dominio);
 GModalApproval.instalar_scripts(configuracao);
 
 var elemento = document.getElementById('gpc-lgpd');
 if(elemento != null){elemento.remove();}
 
 GModalApproval.botao(configuracao);
},
 
 preferencias :function(){
 
 var strNomeIgual = "gpages_cookies=";
 var cookie_array = document.cookie.split(';');
 
 for(var i = 0;i < cookie_array.length;i++){
 var cookie_string = cookie_array[i];
 while (cookie_string.charAt(0) == ' '){cookie_string = cookie_string.substring(1, cookie_string.length);}
 if (cookie_string.indexOf(strNomeIgual) != -1){return cookie_string.substring(strNomeIgual.length, cookie_string.length);}
}
 
 return null;
},
 salvar_preferencias :function(preferencias, dominio){
 
 if (dominio == undefined){dominio = '';}
 var data = new Date();
 
 data.setTime(data.getTime() + (365 * 24 * 60 * 60 * 1000));
 document.cookie = "gpages_cookies=" + preferencias + ";Expires=" + data.toGMTString() + ";Path=/;"+(dominio ? ' Domain='+dominio :'');
 
 return true;
},
 remover_preferencias :function(configuracao){
 
 if(configuracao.editado){
 var cookie_array = document.cookie.split(';');
 var cookies_limpos = '';
 for(var i = 0;i < cookie_array.length;i++){
 var cookie_string = cookie_array[i];
 while (cookie_string.charAt(0) == ' '){cookie_string = cookie_string.substring(1, cookie_string.length);}
 if (cookie_string.indexOf('gpages_') === -1){cookies_limpos += cookie_string.substring(0,cookie_string.indexOf('='))+"=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;Path=/;"+(configuracao.dominio ? ' Domain='+configuracao.dominio :'');}
 else{cookies_limpos += cookie_string;}
}
 document.cookie = cookies_limpos;
 
 setTimeout(function(){document.location.reload(true);},100);
}
},
 
 instalar_scripts :function(configuracao,loader){
 if(loader == undefined){loader = true;}
 
 let cookie = GModalApproval.preferencias() || 'o:1&e:0&m:0';
 
 if(configuracao.opcoes != ''){for (var x = 0;x < configuracao.opcoes.length;x++){configuracao.opcoes[x].valor = (cookie.indexOf(configuracao.opcoes[x].id+':1') !== -1 ? true :false);}}
 if(configuracao.hasOwnProperty('opcoes')){
 let total = Object.entries(configuracao.opcoes).length;
 for (var i = 0;i < total;i++){
 if((configuracao.opcoes[i].valor == true || configuracao.opcoes[i].valor == 'true') && configuracao.opcoes[i].hasOwnProperty('codigos')){
 let scripts = configuracao.opcoes[i]['codigos']();
 let total_scripts = Object.entries(scripts).length;
 if(total_scripts){
 let tipo = '_'+configuracao.opcoes[i]['id'];
 $('.gle_css'+tipo).removeClass('gle_css'+tipo).addClass('gle_css');
 $('.gle_scripts'+tipo).removeClass('gle_scripts'+tipo).addClass('gle_scripts');
 Object.entries(scripts).forEach(([key, value]) =>{
 if(scripts[key].hasOwnProperty('html')){
 let div = document.createElement("div");
 div.innerHTML = scripts[key]['html'];
 document.body.appendChild(div);
}
 setTimeout(function(){
 if(scripts[key].hasOwnProperty('js_interno')){
 let total_js_interno = Object.entries(scripts[key]['js_interno']).length;
 for (let y = 0;y < total_js_interno;y++){
 let script = document.createElement("script"), conteudo = scripts[key]['js_interno'][y].toString();
 conteudo = conteudo.substr(11,conteudo.length);
 conteudo = conteudo.substr(0,(conteudo.length-1));
 script.innerHTML = conteudo;
 document.body.appendChild(script);
}
}
},50);
});
}
}
}
 if(loader){GreatLoader('atualizar');}
}
}
};
}();




'use strict';

var GTooltip = function(){
 return{
 instalar :function(configuracao){
 
 if (configuracao.hasOwnProperty('elemento') == false){configuracao.elemento = '';}
 if (configuracao.hasOwnProperty('direcao') == false){configuracao.direcao = 'cima';}
 if (configuracao.direcao != 'cima' && configuracao.direcao != 'baixo' && configuracao.direcao != 'direita' && configuracao.direcao != 'esquerda'){configuracao.direcao = 'cima';}
 if (configuracao.elemento != ''){
 
 var elementos = document.querySelectorAll(configuracao.elemento);
 
 if (elementos.length){
 for (var i = 0;i < elementos.length;i++){
 elementos[i].addEventListener('mouseenter', function(){GTooltip.adicionar(this, configuracao.direcao);}, false);
 elementos[i].addEventListener('mouseout', function(){GTooltip.remover(this);}, false);
}
}
}
},
 adicionar :function(elemento, direcao){
 if (elemento.dataset.gtt != ''){
 
 var gtt = document.createElement("div");
 gtt.className = 'gtt_caixa gtt_caixa-'+direcao;
 gtt.innerHTML = '<span class="gtt_caixa-seta"></span><span class="gtt_caixa-conteudo">'+elemento.dataset.gtt+'</span>';
 document.body.appendChild(gtt);
 
 var pagina_offset = window.scrollY || window.pageYOffset;
 var elemento_offset = elemento.getBoundingClientRect();
 var gtt_width = parseFloat(getComputedStyle(gtt).width.replace("px", ""));
 var gtt_height = parseFloat(getComputedStyle(gtt).height.replace("px", ""));
 let caixa = document.querySelector('.gmf');
 let drawer = document.querySelector('#gpc-menu');
 let zindex = '';
 if(drawer != null){zindex = 9999999999999+1;}
 if(caixa != null){zindex = caixa.style.zIndex+1;}
 gtt.style.zIndex = zindex;
 
 if (direcao == 'cima'){
 
 gtt.style.top = (pagina_offset+(elemento_offset.top-gtt_height))-10+'px';
 gtt.style.left = (elemento_offset.left+(elemento.offsetWidth/2))-(gtt_width/2)+'px';
 
 var gtt_seta = gtt.querySelector('.gtt_caixa-seta');
 gtt_seta.style.zIndex = zindex;
 gtt_seta.style.bottom = '-10px';
 gtt_seta.style.left = ((gtt_width/2)-5)+'px';
}else if (direcao == 'baixo'){
 
 gtt.style.top = (pagina_offset+(elemento_offset.top+elemento.offsetHeight))+10+'px';
 gtt.style.left = (elemento_offset.left+(elemento.offsetWidth/2))-(gtt_width/2)+'px';
 
 var gtt_seta = gtt.querySelector('.gtt_caixa-seta');
 gtt_seta.style.zIndex = zindex;
 gtt_seta.style.top = '-10px';
 gtt_seta.style.left = ((gtt_width/2)-5)+'px';
}else if (direcao == 'esquerda'){
 
 gtt.style.top = (pagina_offset+(elemento_offset.top+(elemento.offsetHeight/2))-(gtt_height/2))+'px';
 gtt.style.left = (elemento_offset.left-gtt_width)-10+'px';
 
 var gtt_seta = gtt.querySelector('.gtt_caixa-seta');
 gtt_seta.style.zIndex = zindex;
 gtt_seta.style.right = '-10px';
 gtt_seta.style.top = ((gtt_height/2)-5)+'px';
}else if (direcao == 'direita'){
 
 gtt.style.top = (pagina_offset+(elemento_offset.top+(elemento.offsetHeight/2))-(gtt_height/2))+'px';
 gtt.style.left = (elemento_offset.left+elemento.offsetWidth)+10+'px';
 
 var gtt_seta = gtt.querySelector('.gtt_caixa-seta');
 gtt_seta.style.zIndex = zindex;
 gtt_seta.style.left = '-10px';
 gtt_seta.style.top = ((gtt_height/2)-5)+'px';
}
}
},
 remover :function(elemento){
 if (elemento.dataset.gtt != ''){
 
 var gtt = document.body.querySelector('.gtt_caixa');
 
 if(gtt != null || window.navigator.sayswho.toLowerCase().indexOf('ie') !== false){gtt.remove();}
}
}
};
}();'use strict';

var gsi_instancias ={};
var gsi_intervalo ={};
var timeout_resize_slider;

var GSlideImage = function(){
 return{
 iniciar:function(id){
 let instancias;
 if(id != undefined){instancias = document.querySelectorAll('#'+id+' .gsi');}
 else{instancias = document.querySelectorAll('.gsi');}
 if(instancias){
 for (let i = 0;i < instancias.length;i++){
 if(!instancias[i].querySelectorAll('.imagem').length){continue;}
 let slider, id_slider;
 slider = instancias[i].closest('.c, .conteudo');
 id_slider = 'gsi_'+slider.parentElement.getAttribute('id');
 if(gsi_intervalo.hasOwnProperty(id_slider)){
 GSlideImage.destruir(id_slider);
 GSlideImage.iniciar(slider.parentElement.getAttribute('id'));
 continue;
}
 instancias[i].setAttribute('id',id_slider);
 gsi_instancias[id_slider] ={
 'efeito' :'slide',
 'imagens' :[],
 'imagens_ordem' :[],
 'imagens_view' :parseInt(slider.getAttribute('gpc-slide_view')),
 'imagens_margin' :parseInt(slider.getAttribute('gpc-slide_view_espaco')),
 'autoplay' :(slider.getAttribute('gpc-slide_auto') == 'true' || slider.getAttribute('gpc-slide_auto') == true ? true :false),
 'transforms' :{},
 'total':(instancias[i].querySelectorAll('.imagem') ? instancias[i].querySelectorAll('.imagem').length :0),
 'slide':0,
 'tamanho':0,
 'touch_ativo':false,
 'touch_posicao_inicio':0,
 'touch_posicao_movendo':0,
 'touch_limite':0,
 'touch_slide':0,
 'touch_mover':false,
};
 
 GSlideImage.imagens(id_slider,true);
 for (let x = 0;x < gsi_instancias[id_slider]['imagens'].length;x++){
 let elemento = instancias[i].querySelector('#'+gsi_instancias[id_slider]['imagens'][x]);
 elemento.setAttribute('posicao',x);
 elemento.style.transition = '0s linear';
 if(x == (gsi_instancias[id_slider]['imagens'].length-1) && gsi_instancias[id_slider]['imagens'].length > gsi_instancias[id_slider]['imagens_view']){elemento.style.transform = 'matrix(1, 0, 0, 1, '+(gsi_instancias[id_slider]['tamanho']*-1)+', 0)';}
 else{elemento.style.transform = 'matrix(1, 0, 0, 1, '+(gsi_instancias[id_slider]['transforms'][x])+', 0)';}
 if(x < gsi_instancias[id_slider]['imagens_view']){
 elemento.classList.add('ativo');
 elemento.style.opacity = 1;
}
}
 GSlideImage.imagens_ordem(id_slider);
 let reiniciar = false;
 if(gsi_instancias[id_slider]['imagens'].length < gsi_instancias[id_slider]['imagens_view']+2){
 let y = gsi_instancias[id_slider]['imagens'].length;
 for (let x = 0;x < gsi_instancias[id_slider]['imagens'].length;x++){
 let original = instancias[i].querySelector('#'+gsi_instancias[id_slider]['imagens'][x]);
 if(original){
 let clone = document.createElement("div");
 clone.setAttribute('id','clone_'+gsi_instancias[id_slider]['imagens'][x].replace('clone_','')+y);
 clone.classList.add('gsi_clone','imagem');
 clone.setAttribute('posicao',gsi_instancias[id_slider]['imagens'].length);
 clone.style.opacity=0;
 if(original.getAttribute('ll_src') != undefined){
 clone.setAttribute('ll_src',original.getAttribute('ll_src'));
 clone.classList.add('se_slider');
}
 if(original.getAttribute('ll_src_mobile') != undefined){
 clone.setAttribute('ll_src_mobile',original.getAttribute('ll_src_mobile'));
 clone.classList.add('se_slider');
}
 if(original.getAttribute('ll_src') == undefined && original.getAttribute('ll_src_mobile') == undefined){clone.style.backgroundImage = window.getComputedStyle(original)['backgroundImage'];}
 clone.style.width = ((100-gsi_instancias[id_slider]['imagens_margin'])/gsi_instancias[id_slider]['imagens_view'])+'%';
 clone.style.transform = 'matrix(1, 0, 0, 1, '+(gsi_instancias[id_slider]['transforms'][gsi_instancias[id_slider]['imagens_view']])+', 0)';
 instancias[i].querySelector('.gsi_imagens').appendChild(clone);
}
 y++;
}
 reiniciar = true;
}
 if(reiniciar){
 GSlideImage.destruir(id_slider,false);
 GSlideImage.iniciar(slider.parentElement.getAttribute('id'));
 continue;
}
 
 let proximo = instancias[i].querySelector('.gsi_proximo');
 if(proximo){
 proximo.addEventListener('click',function(e){GSlideImage.acao(proximo.closest('.gsi').getAttribute('id'),'proximo', e);},false);
 if(gsi_instancias[id_slider]['imagens'].length <= gsi_instancias[id_slider]['imagens_view']){proximo.style.pointerEvents = 'none';}
}
 let anterior = instancias[i].querySelector('.gsi_anterior');
 if(anterior){
 anterior.addEventListener('click',function(e){GSlideImage.acao(anterior.closest('.gsi').getAttribute('id'),'anterior', e);},false);
 if(gsi_instancias[id_slider]['imagens'].length <= gsi_instancias[id_slider]['imagens_view']){anterior.style.pointerEvents = 'none';}
}
 let touch = instancias[i].querySelector('.gsi_imagens');
 if(touch){
 touch.addEventListener('mousedown',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e)},false);
 touch.addEventListener('mousemove',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e);},false);
 touch.addEventListener('mouseleave',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e);},false);
 touch.addEventListener('mouseup',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e);},false);
 touch.addEventListener('touchstart',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e)},false);
 touch.addEventListener('touchmove',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e);},false);
 touch.addEventListener('touchleave',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e)},false);
 touch.addEventListener('touchcancel',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e)},false);
 touch.addEventListener('touchend',function(e){GSlideImage.acao(touch.closest('.gsi').getAttribute('id'),'touch',e)},false);
}
 
 if(gsi_instancias[id_slider]['autoplay'] && gsi_instancias[id_slider]['imagens'].length > gsi_instancias[id_slider]['imagens_view']){gsi_intervalo[id_slider] = setInterval(function(){GSlideImage.acao(id_slider);},(4000+i));}
 else if(!gsi_instancias[id_slider]['autoplay'] && gsi_intervalo.hasOwnProperty(id_slider)){
 gsi_instancias[id_slider]['autoplay'] = false;
 clearInterval(gsi_intervalo[id_slider]);
 delete gsi_intervalo[id_slider];
}
}
}
},
 destruir:function(id,excluir_clone){
 
 if(excluir_clone == undefined){excluir_clone = true;}
 if(id != undefined && id != ''){
 if(gsi_instancias.hasOwnProperty(id)){
 
 if(gsi_intervalo.hasOwnProperty(id)){
 gsi_intervalo[id] = clearInterval(gsi_intervalo[id]);
 delete gsi_intervalo[id];
}
 
 let instancia = document.querySelector("#"+id);
 if(instancia){
 
 let ativos = instancia.querySelectorAll('.ativo');
 if(ativos.length){
 for (let x = 0;x < ativos.length;x++){
 ativos[x].classList.remove("ativo");
 ativos[x].style.opacity = 0;
 ativos[x].style.display = '';
 ativos[x].style.transform = '';
 ativos[x].style.transition = '';
}
}
 
 if(excluir_clone){
 let clones = instancia.querySelectorAll('.gsi_clone');
 if(clones.length){for (let x = 0;x < clones.length;x++){clones[x].remove();}}
}
 
 instancia.removeAttribute('id');
}
 
 delete gsi_instancias[id];
}
}else{
 
 let instancias = document.querySelectorAll(".gsi");
 if (instancias.length){for (let i = 0;i < instancias.length;i++){if(instancias[i].id != '' && instancias[i].id != undefined){GSlideImage.destruir(instancias[i].id);}}}
}
},
 pausar:function(id){
 
 let instancias;
 if(id != undefined){instancias = document.querySelectorAll('#'+id);}
 else{instancias = document.querySelectorAll('.gsi');}
 for (let i = 0;i < instancias.length;i++){
 let id_slider = instancias[i].getAttribute('id');
 if(gsi_intervalo.hasOwnProperty(id_slider)){
 gsi_intervalo[id_slider] = clearInterval(gsi_intervalo[id_slider]);
 delete gsi_intervalo[id_slider];
}
}
},
 reiniciar:function(id){
 let instancias;
 if(id != undefined){instancias = document.querySelectorAll('#'+id);}
 else{instancias = document.querySelectorAll('.gsi');}
 if(instancias){
 
 for (let i = 0;i < instancias.length;i++){
 if(instancias[i]){
 let id_slider = instancias[i].getAttribute('id');
 GSlideImage.destruir(id_slider);
 GSlideImage.iniciar(instancias[i].parentElement.getAttribute('id'));
}
}
}
},
 imagens:function(id_slider, atualizar){
 let instancias;
 if(atualizar == undefined){atualizar = false;}
 if(id_slider != undefined){instancias = document.querySelectorAll('#'+id_slider);}
 else{instancias = document.querySelectorAll('.gsi');}
 if(instancias){
 for (let i = 0;i < instancias.length;i++){
 if(instancias[i]){
 if(!instancias[i].querySelectorAll('.imagem').length){continue;}
 let id = instancias[i].getAttribute('id');
 let imagens = instancias[i].querySelectorAll('.imagem');
 let elemento;
 let width = parseFloat(window.getComputedStyle(instancias[i])['width'])/gsi_instancias[id]['imagens_view'];
 gsi_instancias[id]['tamanho'] = width;
 gsi_instancias[id]['margin'] = (gsi_instancias[id]['imagens_margin'] > 0 ? gsi_instancias[id]['imagens_margin'] :0);
 for (let x = 0;x < imagens.length;x++){
 elemento = imagens[x];
 if(elemento.classList.contains('ativo')){elemento.style.opacity = 1;}
 else{elemento.style.opacity = 0;}
 if(atualizar){elemento.style.transition = '0s linear';}
 elemento.style.width = ((100-gsi_instancias[id]['imagens_margin'])/gsi_instancias[id]['imagens_view'])+'%';
 gsi_instancias[id]['imagens'][x] = elemento.getAttribute('id');
}
 
 if(gsi_instancias[id]['imagens_view'] == 3){
 for (let x = -1;x <= gsi_instancias[id]['imagens_view'];x++){
 if(x == gsi_instancias[id]['imagens_view']){
 gsi_instancias[id]['transforms'][x] = (gsi_instancias[id]['tamanho']*x)+(gsi_instancias[id]['tamanho']*((gsi_instancias[id]['margin']*1.5)/100));
}else if(x == 0){gsi_instancias[id]['transforms'][x]= 0;}
 else{
 if(x == -1){gsi_instancias[id]['transforms'][x]= (gsi_instancias[id]['tamanho']*x)-(gsi_instancias[id]['tamanho']*((gsi_instancias[id]['margin']*.5)/100));}
 else if(x == 1){gsi_instancias[id]['transforms'][x]= (gsi_instancias[id]['tamanho']*x)+(gsi_instancias[id]['tamanho']*((gsi_instancias[id]['margin']*.5)/100));}
 else{gsi_instancias[id]['transforms'][x]= (gsi_instancias[id]['tamanho']*x)+(gsi_instancias[id]['tamanho']*(gsi_instancias[id]['margin']/100));}
}
}
}else{
 for (let x = -1;x <= gsi_instancias[id]['imagens_view'];x++){
 if(x == gsi_instancias[id]['imagens_view']){gsi_instancias[id]['transforms'][x]= (gsi_instancias[id]['tamanho']*x)+((gsi_instancias[id]['tamanho']*2)*(gsi_instancias[id]['margin']/100));}
 else if(x == 0){gsi_instancias[id]['transforms'][x]= 0;}
 else{
 if(x == -1){gsi_instancias[id]['transforms'][x]= (gsi_instancias[id]['tamanho']*x)-(gsi_instancias[id]['tamanho']*(gsi_instancias[id]['margin']/100));}
 else{gsi_instancias[id]['transforms'][x]= (gsi_instancias[id]['tamanho']*x)+(gsi_instancias[id]['tamanho']*(gsi_instancias[id]['margin']/100));}
}
}
}
 
 for (let y = 0;y < gsi_instancias[id]['imagens_ordem'].length;y++){
 for (let x = 0;x < imagens.length;x++){
 if(gsi_instancias[id]['imagens_ordem'][y] == imagens[x].getAttribute('id')){
 imagens[x].style.opacity = 1;
 imagens[x].style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][y-1]+', 0)';
 break;
}
}
}
}
}
}
},
 imagens_ordem:function(id){
 let instancia = document.querySelector("#"+id);
 if(instancia){
 if(!instancia.querySelectorAll('.imagem').length){return;}
 let elementos_mostrando = instancia.querySelectorAll('.ativo'),elementos = [];
 for (let i = 0;i < elementos_mostrando.length;i++){
 if(elementos.length){
 if(parseInt(instancia.querySelector('#'+elementos[(elementos.length-1)]).getAttribute('posicao')) < parseInt(elementos_mostrando[i].getAttribute('posicao'))){elementos.push(elementos_mostrando[i].getAttribute('id'));}
 else{elementos.unshift(elementos_mostrando[i].getAttribute('id'));}
}else{elementos[0]=elementos_mostrando[i].getAttribute('id');}
}
 
 if(elementos.length){
 let anterior, proximo, posicao = instancia.querySelector('#'+elementos[(elementos.length-1)]).getAttribute('posicao'), atual_teste = instancia.querySelector('#'+elementos[(elementos.length-1)]), continuar = true,x = 0;
 while (continuar){
 if(atual_teste.nextSibling){
 atual_teste = atual_teste.nextSibling;
}else{atual_teste = instancia.querySelector(".gsi_imagens .imagem:first-child");}
 if(!atual_teste.classList.contains('ativo') || x == (gsi_instancias[id]['total']-1)){
 continuar = false;
 proximo = atual_teste;
}
 x++;
}
 elementos.push(proximo.getAttribute('id'));
 
 posicao = instancia.querySelector('#'+elementos[0]).getAttribute('posicao');
 atual_teste = instancia.querySelector('#'+elementos[0]);
 continuar = true;
 x = 0;
 while (continuar){
 if(atual_teste.previousSibling){atual_teste = atual_teste.previousSibling;}
 else{atual_teste = instancia.querySelector(".gsi_imagens div:last-child");}
 if(!atual_teste.classList.contains('ativo') || x == (gsi_instancias[id]['total']-1)){
 continuar = false;
 anterior = atual_teste;
}
 x++;
}
 elementos.unshift(anterior.getAttribute('id'));
 
 let elementos_ordem = [];
 if(gsi_instancias[id]['imagens_view'] == 3){
 if(parseInt(instancia.querySelector('#'+elementos[3]).getAttribute('posicao')) == gsi_instancias[id]['total']-1 && parseInt(instancia.querySelector('#'+elementos[1]).getAttribute('posicao')) == 0){
 elementos_ordem[0] = elementos[0];
 if(proximo.getAttribute('posicao') == '1'){
 elementos_ordem[1] = elementos[2];
 elementos_ordem[2] = elementos[3];
 elementos_ordem[3] = elementos[1];
}else if(proximo.getAttribute('posicao') == '2'){
 elementos_ordem[1] = elementos[3];
 elementos_ordem[2] = elementos[1];
 elementos_ordem[3] = elementos[2];
}
 elementos_ordem[4] = elementos[4];
}else{elementos_ordem = elementos;}
}else if(gsi_instancias[id]['imagens_view'] == 2){
 if(parseInt(instancia.querySelector('#'+elementos[2]).getAttribute('posicao')) == gsi_instancias[id]['total']-1 && parseInt(instancia.querySelector('#'+elementos[1]).getAttribute('posicao')) == 0){
 elementos_ordem[0] = elementos[0];
 elementos_ordem[1] = elementos[2];
 elementos_ordem[2] = elementos[1];
 elementos_ordem[3] = elementos[3];
}else{elementos_ordem = elementos;}
}else{elementos_ordem = elementos;}
 gsi_instancias[id]['imagens_ordem'] = elementos_ordem;
}
}
},
 acao:function(id,acao,evento){
 if(evento == undefined){evento = null;}
 else{
 if(evento.type.substr(0,5) != 'touch' || (evento.type == 'touchmove' && gsi_instancias[id]['touch_posicao_movendo'] != 0)){
 evento.preventDefault();
 evento.stopPropagation();
}
}
 if(acao == undefined){acao = 'proximo';}
 let instancia = document.querySelector("#"+id);
 if(instancia){
 
 let proximo = instancia.querySelector('.gsi_proximo');
 let anterior = instancia.querySelector('.gsi_anterior');
 if(acao == 'proximo' || acao == 'anterior'){
 if(proximo){proximo.style.pointerEvents = 'none';}
 if(anterior){anterior.style.pointerEvents = 'none';}
 instancia.querySelector('.gsi_imagens').style.pointerEvents = 'none';
}
 let tempo = 400;
 
 if(gsi_instancias[id]['autoplay']){
 clearInterval(gsi_intervalo[id]);
 delete gsi_intervalo[id];
}
 
 if (acao == 'anterior'){
 if(gsi_instancias[id]['imagens_ordem'][0] == gsi_instancias[id]['imagens_ordem'][(gsi_instancias[id]['imagens_view']+1)]){
 let ultimo = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][0]);
 if(ultimo){
 ultimo.style.transition = '0s linear';
 ultimo.style.opacity = 0;
 ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][-1]+', 0)';
}
}
 if(gsi_instancias[id]['efeito'] == 'fade'){
 let elemento_mover;
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 elemento_mover = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 if(elemento_mover){
 elemento_mover.style.transition = 'opacity '+((tempo*40)/100).toFixed(2)+'ms linear';
 elemento_mover.style.opacity = 0;
}
}
}
 
 let elemento_mover;
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 if(i < (gsi_instancias[id]['imagens_view'] + 1) && (gsi_instancias[id]['imagens_ordem'][0] != gsi_instancias[id]['imagens_ordem'][i] || i == 0)){
 elemento_mover = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 if(elemento_mover){
 elemento_mover.style.transition = (gsi_instancias[id]['efeito'] == 'fade' ? 'opacity' :'transform')+' '+tempo+'ms linear';
 elemento_mover.classList.add('ativo');
 if(i == gsi_instancias[id]['imagens_view']){elemento_mover.classList.remove('ativo');}
 if(i > gsi_instancias[id]['imagens_view']){elemento_mover.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][gsi_instancias[id]['imagens_view']]+', 0)';}
 else{elemento_mover.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][i]+', 0)';}
 elemento_mover.style.opacity = 1;
}
}
}
 
}else if(acao == 'proximo'){
 if(gsi_instancias[id]['imagens_ordem'][0] == gsi_instancias[id]['imagens_ordem'][(gsi_instancias[id]['imagens_view']+1)]){
 let ultimo = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][(gsi_instancias[id]['imagens_view']+1)]);
 if(ultimo){
 ultimo.style.transition = '0s linear';
 ultimo.style.opacity = 0;
 ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][gsi_instancias[id]['imagens_view']]+', 0)';
}
}
 if(gsi_instancias[id]['efeito'] == 'fade'){
 let elemento_mover;
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 elemento_mover = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 if(elemento_mover){
 elemento_mover.style.transition = 'opacity '+((tempo*40)/100).toFixed(2)+'ms linear';
 elemento_mover.style.opacity = 0;
}
}
}
 
 let elemento_mover;
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 elemento_mover = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 if(elemento_mover){
 elemento_mover.style.transition = (gsi_instancias[id]['efeito'] == 'fade' ? 'opacity' :'transform')+' '+tempo+'ms linear';
 if(i <= 1){elemento_mover.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][-1]+', 0)';}
 else{elemento_mover.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][(i-2)]+', 0)';}
 if(i <= 1){elemento_mover.classList.remove('ativo');}
 else{elemento_mover.classList.add('ativo');}
 elemento_mover.style.opacity = 1;
}
}
 
}else if(acao == 'touch'){
 if((evento.type == 'mousedown' && evento.buttons == 1) || evento.type == 'touchstart'){
 gsi_instancias[id]['touch_ativo'] = true;
 instancia.querySelector(".gsi_imagens").classList.add('gsi_imagens_drag');
 if(gsi_instancias[id]['touch_mover']){clearTimeout(gsi_instancias[id]['touch_slide']);}
 gsi_instancias[id]['touch_ativo'] = true;
 
 instancia.querySelector(".gsi_proximo").style.pointerEvents = 'none';
 instancia.querySelector(".gsi_anterior").style.pointerEvents = 'none';
 instancia.querySelector(".gsi_proximo").style.opacity = 0;
 instancia.querySelector(".gsi_anterior").style.opacity = 0;
 
 gsi_instancias[id]['touch_mover'] = true;
 gsi_instancias[id]['touch_limite'] = (instancia.getClientRects()[0]['width']*.5);
 
 if (evento.type === "touchstart"){gsi_instancias[id]['touch_posicao_inicio'] = (evento.touches[0].clientX-gsi_instancias[id]['touch_posicao_inicio']);}
 else{gsi_instancias[id]['touch_posicao_inicio'] = evento.clientX - gsi_instancias[id]['touch_posicao_inicio'];}
}else if (evento.type == 'mousemove' || evento.type == 'touchmove'){
 if(gsi_instancias[id]['touch_ativo'] && gsi_instancias[id]['touch_mover']){
 
 if (evento.type === "touchmove"){
 if(evento.touches[0].clientX==gsi_instancias[id]['touch_posicao_inicio']){gsi_instancias[id]['touch_posicao_movendo'] = 0;}
 else{
 gsi_instancias[id]['touch_posicao_movendo'] = Math.log(Math.abs(evento.touches[0].clientX - gsi_instancias[id]['touch_posicao_inicio']));
 if(evento.touches[0].clientX - gsi_instancias[id]['touch_posicao_inicio'] < 0){gsi_instancias[id]['touch_posicao_movendo'] = (gsi_instancias[id]['touch_posicao_movendo']*-1);}
 gsi_instancias[id]['touch_posicao_movendo'] += (evento.touches[0].clientX-gsi_instancias[id]['touch_posicao_inicio'])*.55;
}
}else{
 if(evento.clientX==gsi_instancias[id]['touch_posicao_inicio']){gsi_instancias[id]['touch_posicao_movendo'] = 0;}
 else{
 gsi_instancias[id]['touch_posicao_movendo'] = Math.log(Math.abs(evento.clientX-gsi_instancias[id]['touch_posicao_inicio']));
 if(evento.clientX - gsi_instancias[id]['touch_posicao_inicio'] < 0){gsi_instancias[id]['touch_posicao_movendo'] = (gsi_instancias[id]['touch_posicao_movendo']*-1);}
 gsi_instancias[id]['touch_posicao_movendo'] += (evento.clientX-gsi_instancias[id]['touch_posicao_inicio'])*.55;
 
}
}
 if(gsi_instancias[id]['touch_posicao_movendo'] > 0){
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 let elemento;
 elemento = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 elemento.style.opacity = 1;
 elemento.style.transition = '';
 elemento.style.transform = 'matrix(1, 0, 0, 1, '+(gsi_instancias[id]['transforms'][(i-1)]+gsi_instancias[id]['touch_posicao_movendo'])+',0)';
}
}else{
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 let elemento;
 elemento = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 elemento.style.opacity = 1;
 elemento.style.transition = '';
 elemento.style.transform = 'matrix(1, 0, 0, 1, '+(gsi_instancias[id]['transforms'][(i-1)]+gsi_instancias[id]['touch_posicao_movendo'])+',0)';
}
}
}
}else{
 instancia.querySelector(".gsi_imagens").classList.remove('gsi_imagens_drag');
 if(gsi_instancias[id]['touch_ativo'] && gsi_instancias[id]['touch_mover']){
 let elemento;
 if(gsi_instancias[id]['touch_posicao_movendo'] >= ((gsi_instancias[id]['tamanho']*gsi_instancias[id]['imagens_view'])/6)){
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 elemento = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 elemento.style.opacity = 1;
 elemento.classList.add('ativo');
 elemento.style.transition = 'transform 400ms linear';
 if (i >= gsi_instancias[id]['imagens_view']){
 elemento.classList.remove('ativo');
 elemento.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][gsi_instancias[id]['imagens_view']]+', 0)';
}else{elemento.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][i]+', 0)';}
}
}else if (gsi_instancias[id]['touch_posicao_movendo'] <= (((gsi_instancias[id]['tamanho']*gsi_instancias[id]['imagens_view'])/6)*-1)){
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 elemento = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 elemento.style.transition = 'transform 400ms linear';
 elemento.style.opacity = 1;
 if(i <= 1){
 elemento.classList.remove('ativo');
 elemento.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][-1]+', 0)';
}else{
 elemento.classList.add('ativo');
 elemento.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][i-2]+', 0)';
}
}
}else{
 for (let i = 0;i <= (gsi_instancias[id]['imagens_view']+1);i++){
 elemento = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][i]);
 elemento.style.transition = 'transform 400ms linear';
 elemento.style.opacity = 1;
 if(i == 0){
 elemento.classList.remove('ativo');
 elemento.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][-1]+', 0)';
}else if(i == (gsi_instancias[id]['imagens_view']+1)){
 elemento.classList.remove('ativo');
 elemento.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][gsi_instancias[id]['imagens_view']]+', 0)';
}else{
 elemento.classList.add('ativo');
 elemento.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][i-1]+', 0)';
}
}
}
 gsi_instancias[id]['touch_slide'] = setTimeout(function(){
 GSlideImage.imagens_ordem(id);
 let ultimo = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][(gsi_instancias[id]['imagens_view']+1)]);
 ultimo.style.transition = '0s';
 ultimo.classList.remove('ativo');
 ultimo.style.opacity = 0;
 ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][gsi_instancias[id]['imagens_view']]+',0)';
 ultimo = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][0]);
 ultimo.style.transition = '0s';
 ultimo.classList.remove('ativo');
 ultimo.style.opacity = 0;
 ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][-1]+',0)';
 gsi_instancias[id]['touch_mover'] = false;
},tempo);
}
 instancia.querySelector(".gsi_imagens").style.pointerEvents = '';
 gsi_instancias[id]['touch_ativo'] = false;
 gsi_instancias[id]['touch_posicao_inicio'] = 0;
 gsi_instancias[id]['touch_posicao_movendo'] = 0;
 if(proximo && gsi_instancias[id]['imagens'].length > gsi_instancias[id]['imagens_view']){
 proximo.style.pointerEvents = '';
 proximo.style.opacity = '';
}
 if(anterior && gsi_instancias[id]['imagens'].length > gsi_instancias[id]['imagens_view']){
 anterior.style.pointerEvents = '';
 anterior.style.opacity = '';
}
}
}
 if(acao != 'touch'){
 let tempo_touch = (parseFloat(150)*2+parseFloat((((150*45)/100).toFixed(0))));
 gsi_instancias[id]['slide'] = setTimeout(function(){
 GSlideImage.imagens_ordem(id);
 if(acao == 'proximo'){
 let ultimo = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][(gsi_instancias[id]['imagens_view']+1)]);
 if(ultimo){
 ultimo.style.transition = '0s linear';
 ultimo.classList.remove('ativo');
 ultimo.style.opacity = 0;
 ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][gsi_instancias[id]['imagens_view']]+', 0)';
}
 if(gsi_instancias[id]['imagens_ordem'][0] != gsi_instancias[id]['imagens_ordem'][(gsi_instancias[id]['imagens_view']+1)]){
 ultimo = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][0]);
 if(ultimo){
 ultimo.style.transition = '0s linear';
 ultimo.classList.remove('ativo');
 ultimo.style.opacity = 0;
 ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][-1]+', 0)';
}
}
}else{
 let ultimo = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][(gsi_instancias[id]['imagens_view']+1)]);
 if(ultimo){
 ultimo.style.transition = '0s linear';
 ultimo.classList.remove('ativo');
 ultimo.style.opacity = 0;
}
 if(gsi_instancias[id]['imagens_ordem'][0] != gsi_instancias[id]['imagens_ordem'][(gsi_instancias[id]['imagens_view']+1)]){
 if(ultimo){ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][gsi_instancias[id]['imagens_view']]+', 0)';}
 ultimo = instancia.querySelector('#'+gsi_instancias[id]['imagens_ordem'][0]);
 if(ultimo){
 ultimo.style.transition = '0s linear';
 ultimo.classList.remove('ativo');
 ultimo.style.opacity = 0;
 ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][-1]+', 0)';
}
}else{if(ultimo){ultimo.style.transform = 'matrix(1, 0, 0, 1, '+gsi_instancias[id]['transforms'][-1]+', 0)';}}
}
 if(proximo && gsi_instancias[id]['imagens'].length > gsi_instancias[id]['imagens_view']){proximo.style.pointerEvents = '';}
 if(anterior && gsi_instancias[id]['imagens'].length > gsi_instancias[id]['imagens_view']){anterior.style.pointerEvents = '';}
 instancia.querySelector('.gsi_imagens').style.pointerEvents = '';
},tempo_touch);
}
 
 if(gsi_instancias[id]['autoplay']){gsi_intervalo[id] = setInterval(function(){GSlideImage.acao(id);},4000);}
}else{
 
 if(gsi_instancias.hasOwnProperty(id)){
 if(gsi_instancias[id]['autoplay']){
 clearInterval(gsi_intervalo[id]);
 delete gsi_intervalo[id];
}
}
}
}
}
}();
$(function(){
 GSlideImage.iniciar();
 window.addEventListener('resize', function(e){
 
 e.preventDefault();
 e.stopPropagation();
 
 var altura = window.innerHeight, largura = window.innerWidth;
 if(timeout_resize_slider){clearTimeout(timeout_resize_slider);timeout_resize_slider = null;}
 timeout_resize_slider = setTimeout(function(){
 if(altura == window.innerHeight && largura == window.innerWidth){
 let instancias = document.querySelectorAll(".gsi");
 if(instancias){
 for (let i = 0;i < instancias.length;i++){
 if(instancias[i].getAttribute('id') != '' && instancias[i].getAttribute('id') != null && instancias[i].getAttribute('id') != undefined){GSlideImage.imagens(instancias[i].getAttribute('id'),true);}
 else{GSlideImage.iniciar(instancias[i].closest('.c, .conteudo').getAttribute('id'));}
}
}
}
},500);
});
});
var gqa_status = false;
var gqa_fila = [];
var gqa_executando = false;

function ControlarFilaGQA(){
 
 if (gqa_executando){clearTimeout(gqa_executando);}
 
 gqa_executando = setInterval(function(){ExecutarFilaGQA();}, (document.hidden) ? 8000 :100);
}



function AdicionarFilaGQA(parametros){
 
 if (parametros.hasOwnProperty('verbo') == false){parametros.verbo = 'POST';}
 if (parametros.hasOwnProperty('url') == false){return false;}
 if (parametros.hasOwnProperty('uri') == false){parametros.uri = '';}
 else{
 if(typeof parametros.uri == 'object' || typeof parametros.uri == 'array'){
 parametros.uri = FormatarUriGQA(parametros.uri);
}
}
 if (parametros.hasOwnProperty('extensao') == false){parametros.extensao = 'json';}
 if (parametros.hasOwnProperty('prioridade') == false){parametros.prioridade = 'baixa';}
 if (parametros.hasOwnProperty('carregar') == false){parametros.carregar = false;}
 if (parametros.hasOwnProperty('timeout') == false){parametros.timeout = 10000;}
 
 if (parametros.prioridade == 'alta'){
 
 EnviarAjaxGQA(parametros);
}else if (parametros.prioridade == 'media'){
 
 gqa_fila.unshift([parametros]);
}else if (parametros.prioridade == 'baixa'){
 
 gqa_fila.push([parametros]);
}
}
function ExecutarFilaGQA(){
 if (gqa_status == false && gqa_fila.length){
 
 var proximo = gqa_fila.shift();
 
 gqa_status = true;
 
 EnviarAjaxGQA(proximo[0])
}
}
function EnviarAjaxGQA(parametros){
 
 if (parametros.hasOwnProperty('verbo') == false){parametros.verbo = 'POST';}
 if (parametros.hasOwnProperty('url') == false){return false;}
 if (parametros.hasOwnProperty('uri') == false){parametros.uri = '';}
 if (parametros.hasOwnProperty('extensao') == false){parametros.extensao = 'json';}
 if (parametros.hasOwnProperty('prioridade') == false){parametros.prioridade = 'baixa';}
 if (parametros.hasOwnProperty('carregar') == false){parametros.carregar = false;}
 if (parametros.hasOwnProperty('timeout') == false){parametros.timeout = 10000;}
 if (parametros.hasOwnProperty('externo') == false){parametros.externo = false;}
 if (parametros.hasOwnProperty('funcao_erro') == false){parametros.funcao_erro = '';}
 if (parametros.hasOwnProperty('funcao_sucesso') == false){parametros.funcao_sucesso = '';}
 
 if (parametros.carregar == true){GLoading.carregar({'ativar':true});}
 
 if (parametros.verbo == 'POST'){
 var url = parametros.url;
 var dados = parametros.uri;
}else{
 if (parametros.uri){
 var url = parametros.url+'?'+parametros.uri;
}else{var url = parametros.url;}
 var dados = '';
}
 
 var requisicao = new XMLHttpRequest();
 requisicao.open(parametros.verbo, url, true);
 requisicao.timeout = parametros.timeout;
 if (parametros.extensao){requisicao.responseType = parametros.extensao;}
 requisicao.withCredentials = true;
 requisicao.overrideMimeType("application/"+parametros.extensao);
 if (parametros.verbo == 'POST'){
 requisicao.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
}
 if (parametros.externo){
 requisicao.withCredentials = false;
 requisicao.setRequestHeader('Content-Type', "application/json");
 requisicao.setRequestHeader('Access-Control-Allow-Origin', '*');
 requisicao.setRequestHeader('Access-Control-Allow-Headers', "*");
 requisicao.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
}
 requisicao.onreadystatechange = function(){
 if (this.readyState == 4){
 if (this.status >= 200 && this.status < 400){
 
 if (this.responseType == 'json'){
 var resposta = this.response;
}else if (this.responseType == 'text' || this.responseType == ''){
 var resposta = this.responseText;
}else{
 var resposta = this.response;
}
 
 if (parametros.funcao_sucesso){parametros.funcao_sucesso(resposta);}
 
 GLoading.carregar({'ativar':false});
 
 gqa_status = false;
}else{
 
 if (parametros.funcao_erro){parametros.funcao_erro(this);}
 
 GLoading.carregar({'ativar':false});
 
 
 
 gqa_status = false;
}
}
};
 requisicao.send(dados);
 requisicao = null;

 

 
}
function FormatarUriGQA(post, prefixo){
 var retorno = [], post_chave, post_valor;
 for(var p in post){
 if (!post.hasOwnProperty(p)){continue;}
 if (~p.indexOf('[')){post_chave = prefixo ? prefixo + "[" + p.substring(0, p.indexOf('[')) + "]" + p.substring(p.indexOf('[')) :p;}
 else{post_chave = prefixo ? prefixo + "[" + p + "]" :p;}
 post_valor = post[p];
 retorno.push(typeof post_valor == "object" ? FormatarUriGQA(post_valor, post_chave) :encodeURIComponent(post_chave) + "=" + encodeURIComponent(post_valor));
}
 return retorno.join("&");
}
$(function(){
 
 if(document.addEventListener){document.addEventListener("visibilitychange", ControlarFilaGQA);}
 
 ControlarFilaGQA();
});'use strict';

var go_elementos = [];

var GObserver = function(){
 return{
 iniciar :function (){
 
 window.addEventListener('resize', function(){GObserver.observar(true);}, false);
 window.addEventListener('scroll', function(){GObserver.observar(true);}, false);
},
 instalar :function(configuracao){
 
 if (configuracao.hasOwnProperty('elemento') == false){configuracao.elemento = '';}
 if (configuracao.hasOwnProperty('antecipacao') == false){configuracao.antecipacao = 0;}
 if (configuracao.hasOwnProperty('executar') == false){configuracao.executar = '';}
 
 if (configuracao.elemento != ''){
 
 var elementos = document.querySelectorAll(configuracao.elemento);
 
 if (elementos.length){
 for (var i = 0;i < elementos.length;i++){
 if (elementos[i].id){
 
 var instalar ={
 'elemento' :'#'+elementos[i].id,
 'antecipacao' :configuracao.antecipacao,
 'executar' :configuracao.executar
};
 
 go_elementos.push(instalar);
}
}
 
 GObserver.observar(false);
}
}
},
 observar :function(antecipacao){
 
 if (go_elementos.length){
 
 var janela_top = window.scrollY || window.pageYOffset;
 var janela_bottom = janela_top+window.innerHeight;
 for(var i = 0;i < go_elementos.length;i++){
 
 var antecipar = (antecipacao == true ? go_elementos[i].antecipacao :0);
 var elemento = document.querySelector(go_elementos[i].elemento);
 if (elemento !== null && elemento !== undefined){
 var elemento_estilo = window.getComputedStyle(elemento);
 if (elemento_estilo.display !== 'none'){
 var elemento_top = elemento.getBoundingClientRect().top+janela_top;
 var elemento_bottom = elemento_top+elemento.clientHeight;
 
 if (elemento_bottom >= janela_top && (elemento_top-antecipar) <= janela_bottom){
 
 (function(index){go_elementos[index].executar(document.querySelector(go_elementos[index].elemento));})(i);
 
 go_elementos.splice(i, 1);
 
 this.observar(antecipacao);break;
}
}
}
}
}
}
};
}();


GObserver.iniciar();

 elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fbcd383027762':{'desktop':5.443, 'mobile':17.3159}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_57245_m':{'desktop':38.4421, 'mobile':966.914}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863633269083898':{'desktop':57.4, 'mobile':220}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f7f4338415661':{'fs':'27', 'lh':'1.1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f7f4338415661':{'desktop':67.1795, 'mobile':50.3438}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48ff70916097585':{'fs':'14', 'lh':'1.3'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48ff70916097585':{'desktop':78.5895, 'mobile':241.194}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863462428089892':{'desktop':166.012, 'mobile':679.979}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c4abef4520760119':{'fs':'16', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4abef4520760119':{'desktop':15.1432, 'mobile':25.3124}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4abd29174377096':{'desktop':-40.2779, 'mobile':7.245}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280168522716263':{'fs':'51', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280168522716263':{'desktop':49, 'mobile':32.832}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c4abbb7461685503':{'fs':'27', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4abbb7461685503':{'desktop':57.006, 'mobile':95.014}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280079745483671':{'desktop':166.738, 'mobile':896.7}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280079745437209':{'desktop':167.238, 'mobile':1227.62}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280079745466377':{'fs':'19', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280079745466377':{'desktop':184.74, 'mobile':231.007}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280079745402356':{'fs':'19', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280079745402356':{'desktop':184.742, 'mobile':567.827}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280079745434751':{'fs':'13', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280079745434751':{'desktop':216.832, 'mobile':268.483}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280079745437851':{'fs':'13', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280079745437851':{'desktop':216.332, 'mobile':605.02}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280122330266345':{'desktop':239.427, 'mobile':295.815}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280273455895884':{'desktop':241.511, 'mobile':639.038}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280079745403458':{'desktop':255.602, 'mobile':1315.81}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280079745499487':{'desktop':256.102, 'mobile':978.724}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863838448716442_m':{'desktop':444.099, 'mobile':-32.759}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280058628607433':{'desktop':530.8, 'mobile':211.16}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280073630878838':{'desktop':530.3, 'mobile':549.86}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280073630853748':{'fs':'19', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280073630853748':{'desktop':547.802, 'mobile':1245.91}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280034074139625':{'fs':'19', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280034074139625':{'desktop':548.287, 'mobile':913.87}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280073630814826':{'fs':'13', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280073630814826':{'desktop':579.894, 'mobile':1277.51}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_177280023621680227':{'fs':'11', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280023621680227':{'desktop':580.394, 'mobile':945.467}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280015340880499':{'desktop':604.556, 'mobile':969.172}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280097842252667':{'desktop':604.571, 'mobile':1304.58}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280018016672125':{'desktop':619.664, 'mobile':306.959}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_177280073630812592':{'desktop':619.164, 'mobile':648.523}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f814254355567':{'fs':'23', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f814254355567':{'desktop':58.0992, 'mobile':40.9167}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f8ba113403193':{'desktop':106.004, 'mobile':355.126}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48fea2083639395':{'fs':'29', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fea2083639395':{'desktop':113.652, 'mobile':362.925}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48fba2374545437':{'fs':'15.2883', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fba2374545437':{'desktop':118.001, 'mobile':366.994}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48fd2c460264370':{'fs':'19.6994', 'lh':'2'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fd2c460264370':{'desktop':126.946, 'mobile':81.365}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fb76879826582':{'desktop':130.591, 'mobile':372.356}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f8f7295500348':{'desktop':144.046, 'mobile':109.029}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fa0f962706836':{'desktop':144.046, 'mobile':109.081}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48fd5e472222675':{'fs':'13.133', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fd5e472222675':{'desktop':160.952, 'mobile':111.548}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fc98766616764':{'desktop':177.559, 'mobile':127.287}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f928511192915':{'fs':'19.6994', 'lh':'2'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f928511192915':{'desktop':205.437, 'mobile':147.927}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fc39511907883':{'desktop':222.697, 'mobile':163.541}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fc66357309837':{'desktop':222.697, 'mobile':163.511}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4ab9dd522766373':{'desktop':223.355, 'mobile':232.157}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f94d367211219':{'fs':'13.133', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f94d367211219':{'desktop':239.444, 'mobile':178.119}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fd8f958485479':{'desktop':257.34, 'mobile':195.492}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f977612168598':{'fs':'19.6988', 'lh':'2'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f977612168598':{'desktop':284.819, 'mobile':214.358}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4ab999150967300':{'desktop':301.99, 'mobile':299.885}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fcc4931805723':{'desktop':301.649, 'mobile':232.188}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fcf0806796665':{'desktop':301.649, 'mobile':299.855}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4aba30344597511':{'desktop':302.662, 'mobile':299.825}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f998751370522':{'fs':'13.1333', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f998751370522':{'desktop':319.983, 'mobile':244.666}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fdb9965422487':{'desktop':336.165, 'mobile':260.232}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4abb19392302057':{'desktop':336.19, 'mobile':662.323}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4abaca390932077':{'desktop':341.327, 'mobile':662.353}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f9bd408701222':{'fs':'19.6996', 'lh':'2'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f9bd408701222':{'desktop':360.107, 'mobile':281.244}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fe1b901727294':{'desktop':378.689, 'mobile':666.65}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fde4588850146':{'desktop':379.662, 'mobile':666.61}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f9e1370088308':{'fs':'13.1335', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f9e1370088308':{'desktop':395.139, 'mobile':311.456}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48fe60604053899':{'fs':'12.8705', 'lh':'1.3'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fe60604053899':{'desktop':446.364, 'mobile':662.387}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_57245_d':{'desktop':38.4421, 'mobile':966.914}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4ab672058487493':{'desktop':74.826, 'mobile':311.061}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fa92068055901':{'desktop':75.018, 'mobile':36.313}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4abc1e713773248':{'desktop':114.66, 'mobile':352.26}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863858036042798':{'fs':'44.6', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863858036042798':{'desktop':162.531, 'mobile':73.66}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f834435786218':{'fs':'23', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f834435786218':{'desktop':231.531, 'mobile':129.458}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863864775277677':{'fs':'34.2', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863864775277677':{'desktop':351.407, 'mobile':245.425}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863867529569242':{'fs':'13', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863867529569242':{'desktop':359.3, 'mobile':212.78}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863838448716442_d':{'desktop':444.099, 'mobile':-32.759}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175871712264327953':{'fs':'21', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175871712264327953':{'desktop':44.5031, 'mobile':34}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175871698114864823':{'desktop':48.5726, 'mobile':75.6828}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175871699904436523':{'desktop':48.6896, 'mobile':75.6658}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175871700469540789':{'desktop':48.6311, 'mobile':162.475}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175871701148595506':{'desktop':48.6726, 'mobile':162.493}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175871698791428277':{'desktop':57.0726, 'mobile':263.692}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175880211997144007':{'desktop':-38.8, 'mobile':305.882}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175880203344472548':{'desktop':-6.4, 'mobile':322.851}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175872299996968337':{'desktop':47.9, 'mobile':352.805}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_54485':{'desktop':63.591, 'mobile':46.8584}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_15004':{'desktop':63.591, 'mobile':46.8184}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_03731':{'desktop':64.1839, 'mobile':734.154}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175872308692045116':{'fs':'12.9177', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175872308692045116':{'desktop':66.3299, 'mobile':39.6124}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175872326249368004':{'desktop':67.0364, 'mobile':57.7748}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175880197551515566':{'desktop':104.2, 'mobile':549.546}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_64265':{'fs':'8.88844', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_64265':{'desktop':116.802, 'mobile':81.8849}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175872362299298068':{'desktop':129.7, 'mobile':409.53}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_51858':{'desktop':233.978, 'mobile':214.415}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_20715':{'desktop':233.978, 'mobile':214.405}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_12575':{'desktop':234.608, 'mobile':734.194}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_61994':{'fs':'12.9179', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_61994':{'desktop':236.881, 'mobile':207.256}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_16786':{'fs':'8.88843', 'lh':'1.4'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_16786':{'desktop':285.156, 'mobile':249.512}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_91331':{'fs':'14', 'lh':'1.3'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_91331':{'desktop':407.43, 'mobile':734.194}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c4ab8ea823037991':{'fs':'48', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4ab8ea823037991':{'desktop':42.9, 'mobile':36}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f854229435563':{'fs':'30', 'lh':'1'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f854229435563':{'desktop':46.8955, 'mobile':92}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4ab708990318524':{'desktop':122.207, 'mobile':180}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c4ab748398927298':{'fs':'16', 'lh':''}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c4ab748398927298':{'desktop':187.361, 'mobile':203.907}});blocos_posicao = Object.assign(blocos_posicao,{'b_3333149_1_175863213268d298c48f561':{'desktop':579.99, 'mobile':537.094}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48ff26358815422':{'desktop':18.8148, 'mobile':70}});elementos_css = Object.assign(elementos_css,{'e_3333149_1_175863213268d298c48f895579583534':{'fs':'11', 'lh':'2'}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48f895579583534':{'desktop':25.4907, 'mobile':151.028}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fb06782058423':{'desktop':402.994, 'mobile':205.375}});elementos_posicao = Object.assign(elementos_posicao,{'e_3333149_1_175863213268d298c48fb2d614859671':{'desktop':422.994, 'mobile':130.019}});function InserirScriptsInline(){if(!window.getCrawler()){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);if(typeof window.gtag === 'undefined'){window.gtag = function(){window.dataLayer.push(arguments);}}})(window,document,'script','dataLayer','GTM-KKSKGJSX');
var scripts = document.createElement('script');
scripts.type = 'text/javascript';
scripts.src = 'https://www.googletagmanager.com/gtag/js?id=G-LT2YF1Q799';
scripts.defer = true;
document.body.appendChild(scripts);
var scripts2 = document.createElement('script');
scripts2.type = 'text/javascript';
scripts2.innerHTML = 'window.dataLayer = window.dataLayer || [];window.gtag = function(){dataLayer.push(arguments);};gtag(\'js\', new Date());gtag(\'config\', \'G-LT2YF1Q799\');';
document.body.appendChild(scripts2);
}if(!window.getCrawler()){
}
}var scripts_estatisticas ={}, scripts_marketing ={};
scripts_estatisticas = Object.assign(scripts_estatisticas,{0:{
"html":" ","js_interno":{0:function(){if(!window.getCrawler()){
 (function(h,o,t,j,a,r){
 h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
 h._hjSettings={hjid:6436370,hjsv:6};
 a=o.getElementsByTagName('head')[0];
 r=o.createElement('script');r.async=1;
 r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
 a.appendChild(r);
 })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
}}}}});
scripts_marketing = Object.assign(scripts_marketing,{0:{
"html":" ","js_interno":{0:function(){if(!window.getCrawler()){
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());

 gtag('config', 'AW-723962976');
}}}}});
