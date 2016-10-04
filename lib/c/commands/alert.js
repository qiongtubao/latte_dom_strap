(function() {
	//弹窗
		var cd = function(name) {
			return document.createElement(name || "div");
		}
	this.before = function(data, dom, controller) {
		var alert = dom.attr("latte-strap-alert");
		if(alert) {
							var span = cd("span");
							span.innerHTML = "x";
						var button = cd("button");
						button.setAttribute("type", "button");
						button.setAttribute("latte-click", "click");
						button.className = "close";
						button.appendChild(span);

						var span = cd("span");
						span.className = "icon-info-circled alert-icon-float-left";
						var strong = cd("strong");
						strong.setAttribute("latte-html", "{{title}}");
						var p = cd("p");
						p.setAttribute("latte-html", "{{body}}");
					
				var div = cd();
				div.className = "fade-transition alert alert-success top fade-leave";
				div.appendChild(button);
				div.appendChild(span);
				div.appendChild(strong);
				div.appendChild(p);
				//div.style["width"] = "400px";
				div.setAttribute("latte-show", "show");
				div.setAttribute("latte-showFunc", "showFunc");
				div.setAttribute("latte-hideFunc", "hideFunc");
			dom.appendChild(div);

			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				var timer;
				value.set("click", function() {
					if(timer) {
						clearTimeout(timer);
					}
					value.set("show", false);
				});
				value.set("showFunc", function() {
					var view = this;
					view.style("opacity", 1);	
					
				});
				value.set("hideFunc", function() {
					var view = this;
					view.style("opacity", 0);
				});
				value.show = function(time) {
					if(timer) { return; }
					value.set("show", true);
					timer = setTimeout(function() {
						value.set("show", false);
						timer = null;
					}, time || 3000);
				};
				dom.html("");
				var clone = div.cloneNode(true);
				dom.appendChild(clone);
				Controller.createChild(dom, value);
			};	
			change(data.get(alert));
			controller.bind('data', alert, change);
		}
	}
}).call(module.exports);