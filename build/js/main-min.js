jQuery.fn.exists=function(){return $(this).length},gsap.registerPlugin(ScrollTrigger);let timeline=gsap.timeline(),timelineNav=new TimelineMax,status=0;var lastClick=0;const projectFunc={objAd:function(e,t){$(e).exists()&&$(e).each(function(e){$(t).append(this)})},showNav:function(){$(".header__menu--tablet").exists()&&timelineNav.to(".header__menu--tablet",{x:0,autoAlpha:1}).fromTo(".header__item",{autoAlpha:0,y:-20},{y:0,autoAlpha:1,stagger:.3,ease:"power1.out"})},removeNotice:function(e,t){setTimeout(function(){gsap.to(t,{autoAlpha:0,height:0,duration:1,onComplete:function(){e.removeChild(t)}})},1e3)},showNotice:function(e,t,i){let a=document.querySelector(".notice__container"),s=document.createElement("div"),o=document.createElement("div"),n=document.createElement("div");setTimeout(function(){s.classList.add("notice__bloc"),o.classList.add("notice__qty"),n.classList.add("notice__text"),o.textContent="add"==t?`+${i}`:`-${i}`,n.textContent=e,s.appendChild(o),s.appendChild(n),a.appendChild(s),timeline.to(s,{y:0,autoAlpha:1,duration:1})}),setTimeout(function(){timeline.to(s,{autoAlpha:0,duration:1,y:-35,onComplete:projectFunc.removeNotice(a,s)})},2e3)},addCart:function(){projectFunc.showNotice(),console.log("Товар добавлен!")},removeCart:function(){console.log("Товар удалён!")},hideNav:function(){$(".header__menu--tablet").exists()&&(gsap.set(".header__item",{autoAlpha:0}),gsap.to(".header__menu--tablet",{x:100,autoAlpha:0,duration:.8,ease:"power2.out"}),timelineNav.clear())},objReturn:function(e,t){if($(e).exists()){return $(e).html(),$(e)}},showCard:function(e,t){let i=$(e).find(".popup-card"),a="";$(i).each(function(e){e==t&&(a=$(this))}),timeline.fromTo(".overlay-card",{autoAlpha:0},{autoAlpha:1,duration:.3,ease:"power2.out"},"+=0.3").to(a,{scale:1,autoAlpha:1,duration:.8,ease:"power2.out"})},hideCard:function(){timeline.clear(),gsap.to(".popup-card",{autoAlpha:0,duration:.2,ease:"power2.out"}),gsap.to(".overlay-card",{autoAlpha:0,delay:.2})},hideBasket:function(){timeline.clear(),gsap.set([".popup-basket .btn",".popup-basket__icon",".popup-basket__title",".popup-basket__item",".popup-basket__text",".popup-basket__sum",".popup-basket__hide"],{autoAlpha:0}),gsap.set([".popup-basket__icon",".popup-basket__title"],{scale:0}),gsap.set(".popup-basket__item",{autoAlpha:0,y:-20}),gsap.set(".popup-basket__text",{autoAlpha:0,xPercent:-20}),gsap.set(".popup-basket__sum",{autoAlpha:0,xPercent:20}),gsap.set(".popup-basket__hide",{autoAlpha:0}),gsap.to(".popup-basket",{xPercent:120,duration:.5,ease:"power2.out"}),gsap.to(".overlay-basket",{autoAlpha:0}),$("html").removeClass("locked"),document.body.style.overflow="auto"},showBasket:function(){timeline.fromTo(".overlay-basket",{autoAlpha:0},{autoAlpha:1,duration:.3,ease:"power2.out"},"+=0.3").fromTo(".popup-basket",{xPercent:120,autoAlpha:1},{xPercent:0,duration:.6,ease:"power2.out"}).to(".popup-basket__hide",{autoAlpha:1}).to([".popup-basket__icon",".popup-basket__title"],{scale:1,ease:"power2.out",stagger:.4,autoAlpha:1}).to(".popup-basket__item",{autoAlpha:1,y:0,stagger:.3,ease:"power2.out"}).to([".popup-basket__sum",".popup-basket__text"],{autoAlpha:1,xPercent:0}).to(".popup-basket .btn",{autoAlpha:1,duration:.3}),$("html").addClass("locked"),document.body.style.overflow="hidden"}};$(document).ready(function(){$(".plus, .minus, .js-calc").each((e,t)=>{t.parentNode.replaceChild(t.cloneNode(!0),t),t.remove()});function e(e){let t=$(e).attr("data-cart-id");if(!t)return;let i=$(e).find(".js_cart-item__name").text(),a=$(e).find(".js_cart-item__text").text(),s=$(e).find(".js_cart-item__image").attr("src"),o=$(e).find(".js_cart-item__weight").text(),n=$(e).find(".js_cart-item__cost").text();$(e).find(".js_cart-item__delete").click(()=>{cart.setItem(t,0)});$(e).find(".js_cart-item__inputs").each((e,c)=>{$(c).find(".plus, .js-calc").on("click",function(){cart.addItem(t,1,i,s,o,a,n)}),$(c).find(".minus").on("click",function(){cart.addItem(t,-1)}),$(window).on("cartUpdated",()=>{let e=cart.getItem(t).count;$(c).find(".quantity__field").val(e),e>0?($(c).find(".js-calc").hide(),$(c).find(".quantity").css({display:"flex",opacity:1,visibility:"inherit"})):($(c).find(".quantity").hide(),$(c).find(".js-calc").show())})}),$(e).find(".popup-card").each(function(e,t){$(t).find("img").attr("src",s),$(t).find(".js_popup-card_title").text(i),$(t).find(".js_popup-card_weight").text(o),$(t).find(".js_popup-card_content").text(a)})}function t(e,t){let i=()=>{cart.addItem(t,-1)};$(e).find(".quantity").each(function(e,a){$(a).find(".plus").on("click",function(){cart.addItem(t,1),console.log(cart.items)}),$(a).find(".minus").on("click",i)}),$(e).each(function(){$(this).find(".js_cart-item__remove").on("click",function(){return cart.deleteItem(t),!1})})}if($(window).on("cartUpdated",()=>{$(".js_cart-total__count").text(cart.total.count),$(".js_cart-total__cost").text(`${cart.total.cost}`)}),$(".js_cart-item").each((t,i)=>{e(i)}),$(".js-cart_list").each((e,i)=>{$(window).on("cartUpdated",()=>{for(id in $(i).find(".js-cart_list__item").remove(),cart.items){let e=$(i).find(".js-cart_list__template").clone();$(e).removeClass("js-cart_list__template"),$(e).addClass("js-cart_list__item"),$(e).attr("data-id",id),$(e).attr("style","");let t=cart.items[id].image,a=cart.items[id].name,s=cart.items[id].cost,o=cart.items[id].count,n=cart.items[id].weight;$(e).find("img").attr("src",t),$(e).find(".js_cart-item__name").text(a),$(e).find(".js_cart-item__weight").text(n),$(e).find(".js_cart-item__cost").text(s),$(e).find(".quantity.js_cart-item__quantity input").val(o),$(i).append($(e)),$(".popup-basket__items").mCustomScrollbar("destroy"),$(".popup-basket__items").mCustomScrollbar({theme:"minimal-dark"})}$(".js-cart_list__item").each(function(e,i){t(i,$(this).data("id"))})})}),$(".basket__items").each((e,i)=>{$(window).on("cartUpdated",()=>{for(id in $(i).find(".js-basket_list__item").remove(),cart.items){let e=$(i).find(".js-basket_list__template").clone();$(e).removeClass("js-basket_list__template"),$(e).addClass("js-basket_list__item"),$(e).attr("data-id",id),$(e).attr("style","");let t=cart.items[id].image,a=cart.items[id].name,s=cart.items[id].cost,o=cart.items[id].count,n=cart.items[id].weight;$(e).find("img").attr("src",t),$(e).find(".js_basket-item__name").text(a),$(e).find(".js_basket-item__weight").text(n),$(e).find(".js_basket-item__cost").text(s),$(e).find(".quantity input").val(o),$(i).append($(e))}$(".js-basket_list__item").each(function(e,i){t(i,$(this).data("id"))})})}),$(".basket__items").each((e,i)=>{$(window).on("cartUpdated",()=>{for(id in $(i).find(".js-basket_list__item").remove(),cart.items){let e=$(i).find(".js-basket_list__template").clone();$(e).removeClass("js-basket_list__template"),$(e).addClass("js-basket_list__item"),$(e).attr("data-id",id),$(e).attr("style","");let t=cart.items[id].image,a=cart.items[id].name,s=cart.items[id].cost,o=cart.items[id].count,n=cart.items[id].weight;$(e).find("img").attr("src",t),$(e).find(".js_basket-item__name").text(a),$(e).find(".js_basket-item__weight").text(n),$(e).find(".js_basket-item__cost").text(s),$(e).find(".quantity input").val(o),$(i).append($(e))}$(".js-basket_list__item").each(function(e,i){t(i,$(this).data("id"))})})}),$(".js-order_list").each((e,t)=>{$(window).on("cartUpdated",()=>{for(id in $(t).find(".js-order_list__item").remove(),cart.items){console.log(id);let e=$(t).find(".js-order_list__template").clone();$(e).removeClass("js-order_list__template"),$(e).addClass("js-order_list__item"),$(e).attr("style","");let i=cart.items[id].name,a=cart.items[id].cost,s=cart.items[id].count;$(e).find(".js_order-item__name").text(i),$(e).find(".js_order-item__cost").text(a),$(e).find(".js_order-item__count").text(`${s} шт`),$(t).append($(e)),console.log($(e))}})}),cart.refresh(),$(".advice__slider").exists())try{new Swiper(".advice__slider",{slidesPerView:3,spaceBetween:40,pagination:{el:".advice__slider .pagination",clickable:!0},speed:400,navigation:{nextEl:".advice__slider .arr--next",prevEl:".advice__slider .arr--prev"},breakpoints:{320:{slidesPerView:1,spaceBetween:20},601:{slidesPerView:2,spaceBetween:20},769:{slidesPerView:3,spaceBetween:20},1025:{slidesPerView:3,spaceBetween:40},1280:{slidesPerView:3,spaceBetween:40}}});$(window).on("resize load",function(){$(this).width()<=600?n(".advice__content",60):n(".advice__content",200)})}catch(e){console.log(e)}function i(e,t){gsap.to(e,{autoAlpha:1,height:t+20,ease:"power1.out",duration:.5}),gsap.to(".menu__btn i",{scaleY:-1,duration:.5})}function a(e){gsap.timeline();gsap.to(e,{autoAlpha:0,height:0,ease:"power1.out",duration:.5}),gsap.to(".menu__btn i",{scaleX:1,scaleY:1,ease:"power1.out",duration:.5})}function s(e){if($(e).exists())if($(e).hasClass("menu__item"))try{let t=0;return $(e).each(function(){t+=$(this).outerHeight()}),$(this).width()>600&&$(this).width()<=900?t/=2:($(this).width(),t-=20),t}catch(e){console.log(e)}else if($(e).hasClass("header__in"))try{let t=0;return $(e).each(function(){t+=$(this).outerHeight()}),t}catch(e){console.log(e)}}if($("#gallery").exists()&&$("#gallery").lightGallery(),$(".header__item").exists()&&$(".header__item").each(function(){$(this).hover(function(){$(this).css({color:"#FF9F1C",transition:"1s ease"})},function(){$(this).css("color","#2F2C2C")})}),$(".burger").exists()&&$(".burger").on("click",function(){$(this).toggleClass("burger--active"),$(".burger").hasClass("burger--active")?projectFunc.showNav():(projectFunc.hideNav(),a(".header__list"),$(".js-list").removeClass("mf-show"))}),$(".js-list").exists()&&$(".js-list").on("click",function(){if($(this).toggleClass("mf-show"),$(this).hasClass("mf-show")){i(".header__list",s(".header__in")-20)}else a(".header__list")}),$(".gallery__grid").exists()){let e=new TimelineMax({scrollTrigger:{trigger:"#gallery",start:"top-=40%",end:"bottom-=20% center",scrub:!0}});gsap.set(".gallery__item",{x:-30,autoAlpha:0}),e.to(".gallery__item",{autoAlpha:1,x:0,stagger:1})}if($(".about-slider").exists()){new Swiper(".about-slider",{slidesPerView:2,spaceBetween:30,loop:!0,speed:500,autoplay:{delay:5e3},pagination:{el:".swiper-pagination",type:"progressbar"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{320:{slidesPerView:3,spaceBetween:15},501:{slidesPerView:3.4,spaceBetween:15},841:{slidesPerView:1.2,spaceBetween:30},1025:{slidesPerView:2,spaceBetween:30},1280:{slidesPerView:2,spaceBetween:30}}})}if($(".popup-card__close").exists()&&$(".popup-card__close").on("click",function(e){e.stopPropagation(),projectFunc.hideCard(),$(".dish").removeClass("dish--active")}),$(".set__item").exists()&&$(".set__item").each(function(e){$(this).on("click",function(t){let i=t.target;return"use"===i.tagName||"svg"===i.tagName||i.classList.contains("quantity")||i.classList.contains("btn")||projectFunc.showCard(".set__items",e),!1})}),$(".menu__btn").exists())try{$(".menu__btn").on("click",function(){if($(this).toggleClass("mf-show"),$(this).hasClass("mf-show")){i(".menu__cover",s(".menu__item"))}else a(".menu__cover")})}catch(e){console.log(e)}if($(".menu").exists()&&$(window).on("resize load",function(){i(".menu__cover",s(".menu__item"))}),$(".js-basket").exists())try{const e=document.querySelector(".js-basket");projectFunc.hideBasket(),e.addEventListener("mouseenter",function(){status||($(".header__inner").hasClass("mf-scroll")&&$(".header__inner").addClass("locked"),$(".overlay-basket").exists()&&(projectFunc.showBasket(),status=1))})}catch(e){console.log(e)}if($("#scene_about").exists())try{let e=document.getElementById("scene_about");new Parallax(e,{hoverOnly:!0,relativeInput:!0})}catch(e){console.log(e)}if($("#scene_contacts").exists())try{let e=document.getElementById("scene_contacts");new Parallax(e,{hoverOnly:!0,relativeInput:!0})}catch(e){console.log(e)}if($("#scene").exists())try{let e=document.getElementById("scene"),t=new Parallax(e,{hoverOnly:!0,relativeInput:!0});$(window).on("resize load",function(){if($(this).width()<=1024)t.destroy();else{new Parallax(e,{hoverOnly:!0,relativeInput:!0})}})}catch(e){console.log(e)}if($(".offer__slider .btn").exists()){projectFunc.objReturn(".offer__slider .btn");$(window).on("resize load",function(){$(this).width()<=600&&projectFunc.objAd(".offer__slider .btn","#offer__all")})}if($(".about__left .btn").exists()){let e=projectFunc.objReturn(".about__left .btn");$(window).on("resize load",function(){$(this).width()<=840?projectFunc.objAd(".about__left .btn",".about__include"):projectFunc.objAd(e," .about__basic")})}if($(".overlay-basket").exists())try{$(".overlay-basket").click(function(e){-1!=e.target.className.indexOf("overlay-basket")&&(projectFunc.hideBasket(),$("html").css("overflow","auto"),status=0)})}catch(e){console.log(e)}if($(".overlay-card").exists()&&$(".overlay-card").click(function(e){-1!=e.target.className.indexOf("overlay-card")&&(projectFunc.hideCard(),$("html").css("overflow","auto"))}),$(".popup-basket__hide").exists()&&$(".popup-basket__hide").on("click",function(){projectFunc.hideBasket(),status=0}),$(".header__inner").exists)try{let e=$(window),t=$(".header__inner"),i=t.offset().top;e.on("scroll",function(){(window.pageYOffset||document.documentElement.scrollTop)>i?t.addClass("mf-scroll"):(t.removeClass("mf-scroll"),t.removeClass("locked"))})}catch(e){console.log(e)}$(window).on("resize load",function(){$(this).width()<=1235&&$(".category__cover").exists()&&$(".category__cover").mCustomScrollbar({theme:"minimal-dark",axis:"x"})}),$(".popup-basket__items").exists()&&$(".popup-basket__items").mCustomScrollbar({theme:"minimal-dark"});var o=function(){let e,t=o.width;return void 0===t&&((e=document.createElement("div")).innerHTML='<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>',e=e.firstChild,document.body.appendChild(e),t=o.width=e.offsetWidth-e.clientWidth,document.body.removeChild(e)),t};function n(e,t){if(e.length>0){let i=document.querySelectorAll(e);for(let e=0;e<i.length;e++)c(i[e],t)}}function c(e,t){let i=e.textContent;var a=i.slice(0,t);a.length<i.length&&(a+="..."),e.textContent=a}if($(window).on("resize load",function(){document.querySelector("html").style.setProperty("--wScroll",o()+"px")}),n(".offer__txt",100),$(window).on("resize load",function(){$(this).width()<=600?n(".set__content",50):n(".set__content",300)}),$(".offer__slider").exists())try{const e=window.matchMedia("(min-width:601px)");let t;const i=function(){if(!0!==e.matches)return!1===e.matches?a():void 0;void 0!==t&&t.destroy(!0,!0)},a=function(){t=new Swiper(".offer__slider",{slidesPerView:1,spaceBetween:10,pagination:{el:".offer__pagination",clickable:!0},speed:400})};$(window).on("resize load",function(){e.addListener(i),i()})}catch(e){console.log(e)}if($(".dish-slider").exists()){gsap.set($(".dish__box").find(".dish__image"),{scale:0,opacity:0}),gsap.set($(".dish__box:first-child").find(".dish__image"),{scale:1,opacity:1}),gsap.set([$(".dish__article"),$(".dish__weight")],{y:-30,opacity:0}),gsap.set([$(".dish__article")[0],$(".dish__weight")[0]],{y:0,opacity:1}),gsap.set($(".dish__text--word"),{y:-30,opacity:0}),gsap.set($(".dish__text--word")[0],{y:0,opacity:1}),gsap.set($(".dish__price"),{x:-30,opacity:0}),gsap.set($(".dish__price")[0],{x:0,opacity:1}),gsap.set($(".dish__box .btn--small"),{x:30,opacity:0}),gsap.set($(".dish__box .btn--small")[0],{x:0,opacity:1});new Swiper(".dish-slider",{slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},speed:400,navigation:{nextEl:".dish .arr--next",prevEl:".dish .arr--prev"},pagination:{el:".dish__pagination",clickable:!0},on:{slideChangeTransitionEnd:function(){gsap.timeline();let e=this.activeIndex;$(".dish__box").each(function(t){if(t!=e)gsap.set($(".dish__image")[t],{scale:0,opacity:0}),gsap.set($(".dish__text--word")[t],{y:-30,opacity:0}),gsap.set([$(".dish__article")[t],$(".dish__weight")[t]],{y:-30,opacity:0}),gsap.set($(".dish__price")[t],{x:-30,opacity:0}),gsap.set($(".dish__info .btn--small")[t],{x:30,opacity:0});else{gsap.timeline().to($(".dish__image")[t],{scale:1,opacity:1,duration:1}).to($(".dish__article")[t],{opacity:1,y:0,duration:.3}).to($(".dish__weight")[t],{opacity:1,y:0,duration:.3},"=0").to($(".dish__text--word")[t],{opacity:1,y:0,duration:.3}).to($(".dish__price")[t],{opacity:1,x:0,duration:.3}).to($(".dish__info .btn--small")[t],{x:0,opacity:1,duration:.3},"-=0.6")}})}}})}if($("#scene_comment").exists()){let e=document.getElementById("scene_comment");new Parallax(e,{hoverOnly:!0,relativeInput:!0})}if($("#scene_dish").exists()){let e=document.getElementById("scene_dish");new Parallax(e,{hoverOnly:!0,relativeInput:!0})}if($(".bildboard__slider").exists()){let e=new Swiper(".bildboard__slider",{slidesPerView:1,spaceBetween:10,effect:"fade",fadeEffect:{crossFade:!0},pagination:{el:".bildboard__pagination",clickable:!0}}),t=new Swiper(".bildboard__bg",{slidesPerView:1,spaceBetween:10,effect:"fade",fadeEffect:{crossFade:!0}});e.controller.control=t,t.controller.control=e}if($(".comment__slider").exists()){new Swiper(".comment__slider",{slidesPerView:2,spaceBetween:40,loop:!0,pagination:{el:".comment .pagination",clickable:!0},speed:400,navigation:{nextEl:".comment .arr--next",prevEl:".comment .arr--prev"},autoHeight:!0,breakpoints:{320:{slidesPerView:1,spaceBetween:20},769:{slidesPerView:2,spaceBetween:20},1280:{slidesPerView:2,spaceBetween:40}}})}if($(window).on("load",function(){if($("#map").exists()){ymaps.ready(function(){var e=new ymaps.Map("map",{center:[57.098137,65.613029],zoom:17,controls:[]}),t=new ymaps.Placemark(e.getCenter(),{},{iconLayout:"default#image",iconImageHref:"/img/icon/marker.png",iconImageSize:[90,90],iconImageOffset:[-5,-38],openBalloonOnClick:!1,hasHint:!1,hasBalloon:!1,cursor:"INHERIT"});e.geoObjects.add(t),e.behaviors.disable("scrollZoom");var i=e.getGlobalPixelCenter();e.setGlobalPixelCenter([i[0]+400,i[1]]),$(this).width()>880&&$(this).width()<=1024?(e.setGlobalPixelCenter([i[0]+300,i[1]]),e.container.fitToViewport()):$(this).width()>768&&$(this).width()<=880?(e.setGlobalPixelCenter([i[0]+200,i[1]-200]),e.container.fitToViewport()):$(this).width()>600&&$(this).width()<=768?(e.setGlobalPixelCenter([i[0]+200,i[1]-200]),e.container.fitToViewport()):$(this).width()>500&&$(this).width()<=600?(e.setGlobalPixelCenter([i[0]+230,i[1]-200]),e.container.fitToViewport()):$(this).width()>400&&$(this).width()<=500?(e.setGlobalPixelCenter([i[0]+290,i[1]-250]),e.container.fitToViewport()):$(this).width()>319&&$(this).width()<=400&&(e.setGlobalPixelCenter([i[0]+380,i[1]-250]),e.container.fitToViewport())})}}),$(".tab__info").exists()){document.querySelectorAll(".tab__info"),document.querySelectorAll(".tab__content");const e=gsap.timeline();let t=document.querySelectorAll(".tab__info"),i=document.querySelector(".tab__header"),a=document.querySelectorAll(".tab__content");t[0].classList.add("tab__info--active");for(let e=0;e<a.length;e++)0!=e&&gsap.set(a[e],{autoAlpha:0,display:"none"});function l(i){for(let s=i;s<a.length;s++)a[s].classList.remove("show"),a[s].classList.add("hide"),t[s].classList.remove("tab__info--active"),$(window).width()>=881?e.fromTo(a[s],{autoAlpha:1,display:"bloc",xPercent:0},{autoAlpha:0,display:"none",ease:"power2.out",xPercent:100}):e.fromTo(a[s],{autoAlpha:1,display:"bloc"},{autoAlpha:0,display:"none",ease:"power2.out"})}function r(i){a[i].classList.contains("hide")&&(a[i].classList.remove("hide"),a[i].classList.add("show"),t[i].classList.add("tab__info--active"),$(window).width()>=881?(console.log("201"),e.fromTo(a[i],{autoAlpha:0,display:"none",xPercent:100},{autoAlpha:1,display:"block",xPercent:0,duration:1,ease:"back"})):e.fromTo(a[i],{autoAlpha:0,display:"none"},{autoAlpha:1,display:"block",duration:1,ease:"back"}))}l(1),i.addEventListener("click",function(e){let i=e.target;if(i&&i.classList.contains("tab__info"))for(let e=0;e<t.length;e++)if(t[e].classList.remove("tab__info--active"),i==t[e]){l(0),r(e);break}})}if($(".js-tab-btn").extend()&&$(".js-tab-btn").on("click",function(){$(".tab__case").toggleClass("tab__case--active")}),$(".about-service__item").exists()&&$(".about-service__item").each(function(){$(this).on("click",function(){var e=$(this).attr("href");return void 0!==e&&""!==e&&$("html").animate({scrollTop:$(e).offset().top},500),!1})}),$(".header__link").exists()&&$(".header__link").each(function(){$(this).on("click",function(){let e=$(this).attr("href");return void 0!==e&&""!==e&&$("html").animate({scrollTop:$(e).offset().top},1e3),!1})}),$(".about-service__item").exists())try{$(".about-service__item").each(function(){$(this).on("click",function(){const e=$(this).data("val");if($(".tab__item input").exists()){const t=document.querySelector(".tab__text");$(".tab__item input").each(function(){if($(this).data("val")==e){document.querySelectorAll(".tab__info");l(0),r(1),$(this).attr("checked","checked"),t.textContent=$(this).siblings("label")[0].textContent}else $(this).removeAttr("checked","checked")})}})})}catch(e){console.log(e)}if($(".tab__item label").exists()){const e=document.querySelectorAll(".tab__item label"),t=document.querySelector(".tab__text");e.forEach(function(e){e.addEventListener("click",function(){t.textContent=this.textContent,$(".tab__case").toggleClass("tab__case--active")})})}if($(".js-bcg-parallax").exists())try{new TimelineMax({scrollTrigger:{trigger:".js-bcg-parallax",start:"top bottom",end:"bottom-=130%",scrub:!0}}).set(".js-bcg",{y:"-220"}).set(".js-content-wrapper",{autoAlpha:0}).set(".about-advantage__item",{autoAlpha:0,x:"-30"}).to(".js-bcg",35,{y:0}).to(".js-content-wrapper",8,{autoAlpha:1}).to(".about-advantage__item",8,{x:0,autoAlpha:1,stagger:5})}catch(e){console.log(e)}$(".popup-card").exists()&&$(".popup-card").on("click",function(e){e.stopPropagation()})}),function(){var e=JSON.parse(window.localStorage.getItem("cart")||"{}");window.cart=new class{refresh(){window.localStorage.setItem("cart",JSON.stringify(e)),window.dispatchEvent(new Event("cartUpdated")),console.log(1)}setItem(t,i,a,s,o,n,c){if(!t)throw"Товару нужен id!";if(i<=0)delete e[t];else{let l=this.getItem(t);console.log("set item"),e[t]={name:a||l.name,image:s||l.image,text:n||l.text,weight:o||l.weight,cost:c||l.cost,count:i||l.count}}this.refresh()}deleteItem(t){delete e[t],this.refresh()}addItem(e,t,i,a,s,o,n){t=this.getItem(e).count+t,this.setItem(e,t,i,a,s,o,n)}getItem(t){return t&&e[t]||{name:"",imgage:"",text:"",weight:0,cost:0,count:0}}get items(){return e}get total(){let t=0,i=0;for(let a in e)t+=parseInt(e[a].cost)*parseInt(e[a].count),i++;return{cost:t,count:i}}},window.addEventListener("storage",function(){e=JSON.parse(window.localStorage.getItem("cart")||"{}"),window.dispatchEvent(new Event("cartUpdated"))})}();