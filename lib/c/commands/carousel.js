(function() {
	//暂时缺少动画效果
	var cd = function(name) {
		return document.createElement(name || "div");
	};
	var run = function(value) {
		value.timer = setTimeout(function() {
			value.get(value.get("data-slide") || "next")();
			run(value);
		}, value.get("interval"));
	}
	this.before = function(data, dom, controller) {
		var carousel = dom.attr("latte-strap-carousel");
		if(carousel) {

						var li = cd("li");
						li.setAttribute("latte-click", "change");
						li.setAttribute("latte-class", "{! active?active: !}")

					var ol = cd("ol");
					ol.className = "carousel-indicators";
					ol.setAttribute("latte-list", "list");
					ol.appendChild(li);

							var img = cd("img")
							img.setAttribute("latte-src", "{{image}}");
							var text = cd();
							text.className = "carousel-caption";
							text.setAttribute("latte-html", "{{text}}");

						var item = cd();
						item.className = "item";
						item.setAttribute("latte-class" ,"{!active?active:!}");
						item.appendChild(img);
						item.appendChild(text);

					var items = cd();
					items.className = "carousel-inner";
					items.setAttribute("latte-list", "list");
					items.appendChild(item);

					var prev = cd("a");
					prev.className = "carousel-control left"
					prev.innertHTML = "<";
					prev.setAttribute("latte-click", "prev");

					var next = cd("a");
					next.className = "carousel-control right"; 
					next.innertHTML = ">";
					next.setAttribute("latte-click", "next");
				var div = cd();
				div.className = "carousel slide";
				div.appendChild(ol);
				div.appendChild(items);
				div.appendChild(prev);
				div.appendChild(next);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
					clearTimeout(old.timer);
				}
				dom.html("");
				dom.appendChild(div);
				var changeActive = function(now, old) {
					
					if(old != null) {
						console.log(old);
						value.get("list."+old).set("active", false);
					} 
					if(now != null) {
						value.get("list."+now).set("active", true);
					} 
				};
				value.get("list").forEach(function(o) {
					//没有动画
					o.set("change", function(){
						value.set("active",value.get("list").indexOf(o));
					});
				});
				value.set("prev", function() {
					var active  = value.get("active") -1;
					if(active < 0) {
						active += value.get("list").length;
					}
					value.set("active", active);
				});
				value.set("next", function() {
					var active  = value.get("active") +1;
					if(active > value.get("list").length - 1) {
						active -= value.get("list").length;
					}
					value.set("active", active);
				});
				if(value.get("interval")) {
					run(value);
				}
				value.on("active", changeActive);
				value.set("active", value.get("active") || 0);
				Controller.createChild(dom, value);
			};
			change(data.get(carousel));
			controller.bind("data", carousel, change);
			controller.on("close", function() {
				var timer = controller.get(carousel).timer;
				if(timer) { clearTimeout(timer); }
			});
		}
	}
}).call(module.exports);