(function() {
	//提示框
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var tooltip = dom.attr("latte-strap-tooltip");

		if(tooltip) {
				var child = dom.children[0];
					var arrowDom = cd();
					arrowDom.className = "tooltip-arrow";
					
					var innerDom = cd();
					innerDom.setAttribute("latte-html", "{{content}}");
					innerDom.className = "tooltip-inner";

				var div = cd();
				div.setAttribute("latte-show", "show");
				div.setAttribute("latte-class", "{{local}} {{ease}}-transition");
				div.className = "tooltip block";
				div.appendChild(arrowDom);
				div.appendChild(innerDom);
				
				
			dom.appendChild(div);
			var eases = ["scale", "fade"];
			var changeLocal = function(value) {
				switch(value) {
					case "top":
						div.style["top"] = child.offsetTop - div.offsetHeight - 11 +"px";
						div.style["left"] = child.offsetLeft - div.offsetWidth / 2 + child.offsetWidth/2+"px";
					break;
					case "left":
						console.log(child.offsetTop, child.offsetHeight, div.offsetHeight);
						div.style["top"] = child.offsetTop + child.offsetHeight / 2 - div.offsetHeight / 2+ "px";
						console.log(div.offsetWidth, div.clientWidth, div.offsetHeight);
						div.style["left"] = child.offsetLeft - div.offsetWidth - 11 + "px";
					break;
					case "right":
						console.log(child.offsetTop, child.offsetHeight, div.offsetHeight);
						div.style["top"] = child.offsetTop + child.offsetHeight / 2 - div.offsetHeight / 2+ "px";
						div.style["left"] = child.offsetLeft + child.offsetWidth + "px";
					break;
					case "bottom":
						div.style["top"] = child.offsetTop  + child.offsetHeight +"px" ;
						div.style["left"] = child.offsetLeft - div.offsetWidth / 2 + child.offsetWidth/2+"px";
					break;
				}
			}
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				value.show = function() {
					value.set("show", true);
				}
				value.hide = function() {
					value.set("show", false);
				}
				value.change = function() {
					value.set("show", !value.get("show"));
				}
				value.set("local",  value.get("local") || "top");
				var ease = value.get("ease");
				if(ease == null) {
					value.set("ease", "scale");
				}
				
				Controller.createChild(dom , value);
				//最后添加才能让dom 显示后再计算长宽  不然display:none 返回的offsetWidth :0;
				value.on("show", function(now) {
					if(now) {
						changeLocal(value.get("local"));
					}
				});
				//changeLocal(value.get("local"));
			};
			change(data.get(tooltip));
			controller.bind("data", tooltip, change);
		}
	}
}).call(module.exports);