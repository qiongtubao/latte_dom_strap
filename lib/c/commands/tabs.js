(function() {
	//tabs
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var tabs = dom.attr("latte-strap-tabs");
		if(tabs) {
							var aDom = cd("a");
							aDom.setAttribute("latte-html", "{{title}}");
						var liDom = cd("li");
						li.setAttribute("latte-click", "click");
						li.setAttribute("latte-class", "{!disabled? disabled:!} {! active? active:!}")
						liDom.appendChild(aDom);
					var ulDom = cd("ul");
					ulDom.setAttribute("latte-list", "list");
					ulDom.className = "nav nav-tabs";
					ulDom.appendChild(li);
					
						var contentDom = cd();
						contentDom.className = "tab-pane active fadein-transition";
						contentDom.setAttribute("latte-data", "content");
						contentDom.setAttribute("latte-show", "active");
					var tabsDom = cd("div");
					tabsDom.className = "tab-content";
					tabsDom.setAttribute("latte-list", "list");
					tabsDom.appendChild(contentDom);
				dom.appendChild(ulDom);
				dom.appendChild(tabsDom);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}

				Controller.create(dom, value);
			};
			change(data.get(tabs));
			controller.bind("data", tabs, change);
		}	
	}
}).call(module.exports);