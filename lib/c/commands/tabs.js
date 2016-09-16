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
						liDom.setAttribute("latte-click", "click");
						liDom.setAttribute("latte-class", "{!disabled? disabled:!} {! active? active: !}")
						liDom.appendChild(aDom);
					var ulDom = cd("ul");
					ulDom.setAttribute("latte-list", "list");
					ulDom.className = "nav nav-tabs";
					ulDom.appendChild(liDom);
								var contentBody = cd();
								contentBody.setAttribute("latte-data", "content");
							
						var contentDom = cd();
						contentDom.setAttribute("latte-show", "active");
						contentDom.className = "tab-pane active fadein-transition";
						//contentDom.setAttribute("latte-data", "content");
						//contentDom.setAttribute("latte-show", "active");
					var tabsDom = cd("div");
					tabsDom.className = "tab-content";
					//tabsDom.setAttribute("latte-list", "list");
					//tabsDom.appendChild(contentDom);
				dom.appendChild(ulDom);
				dom.appendChild(tabsDom);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}

				var select = function(index, oldIndex) {
					if(oldIndex != null) {
						value.set("list."+oldIndex+".active" , 0);
					}
					value.set("list."+index+".active", 1);
				};
				value.on("select", select);
				tabsDom.innerHTML = "";
				value.get("list").forEach(function(o, index) {
					if(o.get("html")) {				
						var copyDom = contentDom.cloneNode(true);
						copyDom.setAttribute("latte-data", "list."+index);
						var bodyCopy = contentBody.cloneNode(true);
						bodyCopy.innerHTML = o.get("html");
						copyDom.appendChild(bodyCopy);
						tabsDom.appendChild(copyDom);
					}
					o.set("click", function() {
						value.set("select",index);
					});
				});
				value.set( "select",value.get("select") || 0);
				Controller.createChild(dom, value);
			};
			change(data.get(tabs));
			controller.bind("data", tabs, change);
		}	
	}
}).call(module.exports);