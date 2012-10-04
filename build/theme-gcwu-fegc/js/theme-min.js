/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.com/wet-boew/License-eng.txt / wet-boew.github.com/wet-boew/Licence-fra.txt
 *
 * Version: v3.1a1
 */
(function(c){var b,a;b=(typeof window.wet_boew_theme!=="undefined"&&window.wet_boew_theme!==null)?window.wet_boew_theme:{fn:{}};a={theme:"theme-gcwu-fegc",psnb:null,search:null,bcrumb:null,title:null,sft:null,gcft:null,wmms:c("#gcwu-wmms"),init:function(){b.psnb=pe.header.find("#gcwu-psnb");b.menubar=b.psnb.find(".wet-boew-menubar");b.search=pe.header.find("#gcwu-srchbx");b.bcrumb=pe.header.find("#gcwu-bc");b.title=pe.header.find("#gcwu-title");b.sft=pe.footer.find("#gcwu-sft");b.gcft=pe.footer.find("#gcwu-gcft");var e=pe.menu.navcurrent(b.menubar,b.bcrumb),d=e.parents("div.mb-sm");if(d.length>0){d.prev().children("a").addClass("nav-current")}if(pe.secnav.length>0){pe.menu.navcurrent(pe.secnav,b.bcrumb)}if(b.psnb.length>0&&b.search.length===0){b.psnb.css("width","100%")}else{if(b.psnb.length===0&&b.search.length>0){b.search.css("width","100%")}}},mobileview:function(){var n,u,r,o=pe.dic.get("%menu"),m=pe.dic.get("%search"),t=pe.dic.get("%close"),j,f,i,d,l="",p,e,k,h,g,q,s;if(b.menubar.length>0||pe.secnav.length>0||b.search.length>0){q=b.menubar.find("ul.mb-menu li");n='<div data-role="popup" data-overlay-theme="a" id="jqm-wb-mb"><div data-role="header">';f=(pe.secnav.length>0?pe.secnav.find("h2").eq(0):"");u=(b.menubar.length>0?b.psnb.children(":header"):(pe.secnav.length>0?f:b.bcrumb.children(":header")));r=u[0].innerHTML;n+="<h1>"+o+'</h1><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-left">'+t+'</a></div><div data-role="content" data-inset="true"><nav role="navigation">';if(b.bcrumb.length>0){n+='<section><div id="jqm-mb-location-text">'+b.bcrumb[0].innerHTML+"</div></section>";b.bcrumb.remove()}else{n+='<div id="jqm-mb-location-text"></div>'}if(pe.secnav.length>0){i=pe.menu.buildmobile(pe.secnav.find(".wb-sec-def"),3,"c",false,true);pe.menu.expandcollapsemobile(i,(pe.secnav.find("h3.top-section").length>0?"h4":"h3"),true,false);pe.menu.expandcollapsemobile(i,".nav-current",false,true);n+="<section><div><h2>"+f[0].innerHTML+'</h2><div data-role="controlgroup">'+i[0].innerHTML+"</div></div></section>";pe.secnav.remove()}if(b.menubar.length>0){i=pe.menu.buildmobile(q,3,"a",true,true);n+="<section><div><h2>"+r+'</h2><div data-role="controlgroup">'+i[0].innerHTML+"</div></div></section>"}n+="</nav></div></div></div>";pe.bodydiv.append(n);u.wrapInner('<a href="#jqm-wb-mb" data-rel="popup"></a>');l+='<li><a data-rel="popup" data-theme="a" data-icon="site-menu" href="#jqm-wb-mb">'+o+"</a></li>"}if(b.search.length>0){j=b.search.find(":header");d='<div data-role="popup" data-overlay-theme="a" id="jqm-wb-search"><div data-role="header"><h1>'+m+'</h1><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-left">'+t+'</a></div><div data-role="content">'+(c("<div/>").append(b.search.find("form")))[0].innerHTML+"</div></div>";pe.bodydiv.append(d);j.wrapInner('<a href="#jqm-wb-search" data-rel="popup"></a>');l+='<li><a data-rel="popup" data-theme="a" data-icon="search" href="#jqm-wb-search">'+m+"</a></li>"}if(l.length>0){p=c('<div data-role="navbar" data-iconpos="right"><ul class="wb-hide">'+l+"</ul></div>");b.title.after(p)}h=c("#gcwu-lang");if(h.length>0){e=h.find("a");g='<div data-role="navbar"><ul>';e.each(function(){g+='<li><a href="'+this.href+'" data-theme="a">'+this.innerHTML+"</a></li>"});g+="</ul></div>";h.find("#gcwu-ef-lang").replaceWith(g);h.find("#gcwu-other-lang").remove()}if(b.sft.length>0){e=b.sft.find("#gcwu-tctr a, .gcwu-col-head a");s=b.sft.children("#gcwu-sft-in");b.gcft.parent().remove()}else{s=pe.footer.find("#gcwu-tc");if(s.length>0){e=s.find("a")}}if(s.length>0){k='<div data-role="navbar"><ul>';e.each(function(){k+='<li><a href="'+this.href+'" data-theme="b">'+this.innerHTML+"</a></li>"});k+="</ul></div>";s.replaceWith(k)}pe.footer.find("footer").append(b.wmms.detach());c(document).on("pagecreate",function(){if(b.menubar.length>0){b.psnb.parent().remove()}if(b.search.length>0){b.search.parent().remove()}if(l.length>0){p.children().removeClass("wb-hide")}function v(x,w,A,z){var y;c.mobile.showPageLoadingMsg();y=c.mobile.transitionHandlers.simultaneous("pop",w,A,z);y.done(function(){c.mobile.hidePageLoadingMsg()});return y}c.mobile.transitionHandlers.loadingTransition=v;c.mobile.defaultDialogTransition="loadingTransition"});c(document).on("pageinit",function(){pe.menu.correctmobile(c("#jqm-wb-mb"))});c(document).trigger("mobileviewloaded");return}};window.wet_boew_theme=c.extend(true,b,a);return window.wet_boew_theme}(jQuery));