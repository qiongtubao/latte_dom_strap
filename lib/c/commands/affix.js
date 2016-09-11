(function() {
	//导航栏
	//暂时还没加回到顶部
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	var getXY = function(e) {
		var t=e.offsetTop;   
	    var l=e.offsetLeft;   
	    var height=e.offsetHeight;   
	    while(e=e.offsetParent){
	         t+=e.offsetTop;   
	         l+=e.offsetLeft;   
     	}
     	return {
     		x: l,
     		y: t
     	};
	}
	this.before = function(data, dom, controller) {
		var affix = dom.attr("latte-strap-affix");
		var selectClassName = dom.attr("latte-strap-affix-active") || "latte_active";
		if(affix) {
								var a = cd("a");
								a.setAttribute("latte-href", "{{href}}");
								a.setAttribute("latte-html", "{{text}}");
								a.setAttribute("latte-click", "click");
							var li = cd("li");
							li.appendChild(a);
							li.setAttribute("latte-class", "{{activeClass}}");
						var ul = cd("ul");
						ul.className = "nav";
						ul.setAttribute("latte-list", "list");
						ul.appendChild(li);
					var div = cd("nav");
					div.className = "affix";
					div.appendChild(ul);

				dom.appendChild(div);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
					var list = old.get(list)
					if(list) {
						
						window.removeEventListener("scroll", o.get("scroll"));
					}
				}
				var doms = [];
				value.get("list").forEach(function(o, index) {
					o.set("activeClass", "");					
					o.set("click", function() {
						value.set("active", index);
					});
					//var dom = document.querySelector(o.get("href"));
					doms[index] = o.get("href");
				});
				value.set("scroll", function(e) {
				
					var index 
					var domJ = 9999999999;
					doms.forEach(function(href, i) {
						var o = document.querySelector(href);
						if(!o) {
							return
						}
						var xy = getXY(o);
						var j = (xy.y - window.pageYOffset)*(xy.y - window.pageYOffset)
						 + (xy.x - window.pageXOffset) * (xy.x - window.pageXOffset)
						
						if(j < domJ) {
							domJ = j;
							index = i;
						}
					});
					value.set('active', index);
				});
				
				window.addEventListener("scroll", value.get("scroll"));
				var doSelect = function(select, old) {
					if(select == old) {
						return;
					}
					if(select == null) { return; }
					value.get("list").forEach(function(o) {
						o.set("activeClass", "");
					});
					var selectObject = value.get("list."+select);
					selectObject.set("activeClass", selectClassName);									
				}
				doSelect(value.get("active"));
				data.on( affix+".active", doSelect);
				
				dom.html("");
				var d = div.cloneNode(true);
				dom.appendChild(div);
				Controller.createChild(dom, value);
			};

			change(data.get(affix));
			controller.bind('data', affix, change);
		}
	}
	//require("latte_dom/utils/css.js").importCssString(require("./affix.css"), "latte_strap_affix_css");

}).call(module.exports);