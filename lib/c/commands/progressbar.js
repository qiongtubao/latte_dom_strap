(function() {
	//进度条
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	var types = ["success"];
	this.before = function(data, dom, controller) {
		var progressbar = dom.attr("latte-strap-progressbar");
		if(progressbar) {
					var progressbarDom = cd();
					progressbarDom.className = "progress-bar "; 
					progressbarDom.setAttribute("latte-class", "progress-bar-{{type}}");
				var div = cd();
				div.className = "progress";
				div.appendChild(progressbarDom);
			 dom.appendChild(div);

			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				value.on("value", function(o) {
					if(o < 0) {
						return value.set("value", 0);
					}
					if(o > 100) {
						return value.set("value", 100);
					}
					progressbarDom.style["width"] =  o + "%";
				});
				value.on("type", function(type) {
					if(types.indexOf(type) == -1) {
						value.set("type", "success");
					}
				});
				value.set("value",value.get("value"));
				value.set("type",value.get("type"));
				Controller.createChild(dom, value);
			};
			change(data.get(progressbar));
			controller.bind("data", progressbar, change);
		}
	}
}).call(module.exports);