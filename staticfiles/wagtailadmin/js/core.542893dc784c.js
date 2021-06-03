!function(){"use strict";var t={94639:function(t,e,n){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};e.__esModule=!0;var a=o(n(73609));window.addMessage=function(t,e){a.default(".messages").addClass("new").empty().append('<ul><li class="'+t+'">'+e+"</li></ul>");var n=setTimeout((function(){a.default(".messages").addClass("appear"),clearTimeout(n)}),100)},window.escapeHtml=function(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return t.replace(/[&<>"']/g,(function(t){return e[t]}))},window.initTagField=function(t,e,n){var o=Object.assign({autocomplete:{source:e},preprocessTag:function(t){return t&&'"'!==t[0]&&t.indexOf(" ")>-1?'"'+t+'"':t}},n);a.default("#"+t).tagit(o)},window.enableDirtyFormCheck=function(t,e){var n=a.default(t),o=e.confirmationMessage||" ",i=e.alwaysDirty||!1,s=null,l=!1;n.on("submit",(function(){l=!0})),setTimeout((function(){s=n.serialize()}),1e4),window.addEventListener("beforeunload",(function(t){var e=s&&n.serialize()!==s;if(!l&&(i||e))return t.returnValue=o,o}))},a.default((function(){a.default("body").addClass("ready"),a.default(document).on("click","#nav-toggle",(function(){a.default("body").toggleClass("nav-open"),a.default("body").hasClass("nav-open")?a.default("body").removeClass("nav-closed"):a.default("body").addClass("nav-closed")})),a.default(document).on("click","#account-settings",(function(){a.default(".nav-main").toggleClass("nav-main--open-footer"),a.default(this).find("em").toggleClass("icon-arrow-down-after icon-arrow-up-after")}));var t=function(){a.default(".nav-wrapper").css("min-height",a.default(window).height())};if(t(),a.default(window).on("resize",(function(){t()})),function(){var t=a.default("[data-animated-logo-container]"),e=0,n="",o=0;function i(){t.removeClass("logo-playful").addClass("logo-serious")}t.on("mousemove",(function(a){var i,s=a.pageX;s>e?i="r":s<e&&(i="l"),i!==n&&""!==n&&(o+=1),o>8&&t.removeClass("logo-serious").addClass("logo-playful"),e=s,n=i})),t.on("mouseleave",(function(){o=0,i()})),i()}(),a.default(document).on("focus mouseover","input,textarea,select",(function(){a.default(this).closest(".field").addClass("focused"),a.default(this).closest("fieldset").addClass("focused"),a.default(this).closest("li").addClass("focused")})),a.default(document).on("blur mouseout","input,textarea,select",(function(){a.default(this).closest(".field").removeClass("focused"),a.default(this).closest("fieldset").removeClass("focused"),a.default(this).closest("li").removeClass("focused")})),window.location.hash){var e=window.location.hash.replace(/[^\w\-#]/g,"");a.default('a[href="'+e+'"]').tab("show")}if(a.default(document).on("click",".tab-nav a",(function(t){t.preventDefault(),a.default(this).tab("show"),window.history.replaceState(null,null,a.default(this).attr("href"))})),a.default(document).on("click",".tab-toggle",(function(t){t.preventDefault(),a.default('.tab-nav a[href="'+a.default(this).attr("href")+'"]').trigger("click")})),a.default(".dropdown").each((function(){var t=a.default(this);a.default(".dropdown-toggle",t).on("click",(function(e){e.stopPropagation(),t.toggleClass("open"),t.hasClass("open")?a.default(document).on("click.dropdown.cancel",(function(e){var n=e.relatedTarget||e.toElement;a.default(n).parents().is(t)||(t.removeClass("open"),a.default(document).off("click.dropdown.cancel"))})):a.default(document).off("click.dropdown.cancel")}))})),a.default(".drop-zone").on("dragover",(function(){a.default(this).addClass("hovered")})).on("dragleave dragend drop",(function(){a.default(this).removeClass("hovered")})),window.headerSearch){var n=0,o=0,i=a.default(window.headerSearch.termInput),s=i.parent();i.on("keyup cut paste change",(function(){clearTimeout(i.data("timer")),i.data("timer",setTimeout(l,200))})),i.trigger("focus");var l=function(){var t="icon-spinner",e=i.val();if(r("q").trim()!==e.trim()){s.addClass(t);var l=++o;a.default.ajax({url:window.headerSearch.url,data:{q:e},success:function(t){l>n&&(n=l,a.default(window.headerSearch.targetOutput).html(t).slideDown(800),window.history.replaceState(null,null,"?q="+e))},complete:function(){window.wagtail.ui.initDropDowns(),s.removeClass(t)}})}},r=function(t){var e=new RegExp("[\\?&]"+t+"=([^]*)").exec(window.location.search);return e?e[1]:""}}a.default(document).on("shown.bs.tab",(function(){a.default("textarea[data-autosize-on]").each((function(){autosize.update(a.default(this).get())}))})),a.default(document).on("click","button.button-longrunning",(function(){var t=a.default(this),e=a.default("em",t),n="disabledtimeout";window.cancelSpinner=function(){t.prop("disabled","").removeData(n).removeClass("button-longrunning-active"),t.data("clicked-text")&&e.text(t.data("original-text"))};var o=t.closest("form").get(0);if(!o||!o.checkValidity||o.noValidate||o.checkValidity())var i=setTimeout((function(){t.data(n)||(t.data(n,setTimeout((function(){clearTimeout(t.data(n)),cancelSpinner()}),3e4)),t.data("clicked-text")&&e.length&&(t.data("original-text",e.text()),e.text(t.data("clicked-text"))),t.addClass("button-longrunning-active").prop("disabled","true")),clearTimeout(i)}),10)}))}));var i=window.wagtail||{};i.ui||(i.ui={});var s="listing__item--active",l="icon-arrow-down",r="icon-arrow-up",u="is-open",d="click",c="[data-dropdown-toggle]",f="aria-hidden",p=13,h=32,w={dropDowns:[],closeAllExcept:function(t){var e=this.dropDowns.indexOf(t);this.dropDowns.forEach((function(t,n){n!==e&&t.state.isOpen&&t.closeDropDown()}))},add:function(t){this.dropDowns.push(t)},get:function(){return this.dropDowns},getByIndex:function(t){return this.dropDowns[t]},getOpenDropDown:function(){var t=null;return this.dropDowns.forEach((function(e){e.state.isOpen&&(t=e)})),t}};function v(t,e){t&&e||!("error"in console)?(this.el=t,this.$parent=a.default(t).parents("[data-listing-page-title]"),this.state={isOpen:!1},this.registry=e,this.clickOutsideDropDown=this.clickOutsideDropDown.bind(this),this.closeDropDown=this.closeDropDown.bind(this),this.openDropDown=this.openDropDown.bind(this),this.handleClick=this.handleClick.bind(this),this.handleKeyEvent=this.handleKeyEvent.bind(this),t.addEventListener(d,this.handleClick),t.addEventListener("keydown",this.handleKeyEvent),this.$parent.data("close",this.closeDropDown)):console.error("A dropdown was created without an element or the DropDownController.\nMake sure to pass both to your component.")}function g(){var t=new v(this,w);w.add(t)}function m(t){if(27===t.which){var e=w.getOpenDropDown();e&&e.closeDropDown()}}function D(){a.default("[data-dropdown]").each(g),a.default(document).on("keydown",m)}function b(t,e){return[].slice.call(t.querySelectorAll(e))}v.prototype={handleKeyEvent:function(t){[h,p].indexOf(t.which)>-1&&(t.preventDefault(),this.handleClick(t))},handleClick:function(t){this.state.isOpen?this.closeDropDown(t):this.openDropDown(t)},openDropDown:function(t){t.stopPropagation(),t.preventDefault();var e=this.el,n=this.$parent,o=e.querySelector(c);this.state.isOpen=!0,this.registry.closeAllExcept(this),e.classList.add(u),e.setAttribute(f,!1),o.classList.remove(l),o.classList.add(r),document.addEventListener(d,this.clickOutsideDropDown,!1),n.addClass(s)},closeDropDown:function(){this.state.isOpen=!1;var t=this.el,e=this.$parent,n=t.querySelector(c);document.removeEventListener(d,this.clickOutsideDropDown,!1),t.classList.remove(u),n.classList.add(l),n.classList.remove(r),t.setAttribute(f,!0),e.removeClass(s)},clickOutsideDropDown:function(t){var e=this.el,n=t.relatedTarget||t.toElement;a.default(n).parents().is(e)||this.closeDropDown()}},a.default(document).ready(D),i.ui.initDropDowns=D,i.ui.DropDownController=w,a.default(document).ready((function(){b(document,".button-select").forEach((function(t){var e=t.querySelector('input[type="hidden"]');b(t,".button-select__option").forEach((function(n){n.addEventListener("click",(function(o){o.preventDefault(),e.value=n.value,b(t,".button-select__option--selected").forEach((function(t){t.classList.remove("button-select__option--selected")})),n.classList.add("button-select__option--selected")}))}))}))})),window.wagtail=i},73609:function(t){t.exports=jQuery}},e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={exports:{}};return t[o].call(a.exports,a,a.exports,n),a.exports}n.m=t,n.x=function(){},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={321:0},e=[[94639,751],[90971,751]],o=function(){},a=function(a,i){for(var s,l,r=i[0],u=i[1],d=i[2],c=i[3],f=0,p=[];f<r.length;f++)l=r[f],n.o(t,l)&&t[l]&&p.push(t[l][0]),t[l]=0;for(s in u)n.o(u,s)&&(n.m[s]=u[s]);for(d&&d(n),a&&a(i);p.length;)p.shift()();return c&&e.push.apply(e,c),o()},i=self.webpackChunkwagtail=self.webpackChunkwagtail||[];function s(){for(var o,a=0;a<e.length;a++){for(var i=e[a],s=!0,l=1;l<i.length;l++){var r=i[l];0!==t[r]&&(s=!1)}s&&(e.splice(a--,1),o=n(n.s=i[0]))}return 0===e.length&&(n.x(),n.x=function(){}),o}i.forEach(a.bind(null,0)),i.push=a.bind(null,i.push.bind(i));var l=n.x;n.x=function(){return n.x=l||function(){},(o=s)()}}(),n.x()}();
//# sourceMappingURL=core.js.map