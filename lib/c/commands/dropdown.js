(function() {
	//下拉菜单
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	var types = ["default", "primary", "danger", "info", "warning", "success"];
	this.before = function(data, dom, controller) {
		var dropdown = dom.attr("latte-strap-dropdown");
		if(dropdown) {
					var button = cd("button");
					button.className = "btn dropdown-toggle";
					button.setAttribute("latte-class", "btn-{{type}}");
					button.setAttribute("latte-disabled", "disabled");
					button.setAttribute("latte-html", "{{text}}");
					button.setAttribute("latte-click", "click");
						var caret = cd("span");
						caret.className = "caret"; 
					button.appendChild(caret);
							var a = cd("a");
							a.setAttribute("latte-click", "click");
							a.setAttribute("latte-html", "{{text}}");
						var li = cd("li");
						li.setAttribute("latte-class", "{!separator? divider: !}");
						li.appendChild(a);
					var dropdownMenu = cd("ul");
					dropdownMenu.className = "dropdown-menu";
					dropdownMenu.setAttribute("latte-list", "list");
					dropdownMenu.setAttribute("latte-show", "show");
					dropdownMenu.appendChild(li);
				var div = cd();
				div.className = "btn-group";
				div.setAttribute("latte-class", "{! show? open: !} {! disabled? disabled: !}");
				div.appendChild(button);
				div.appendChild(dropdownMenu);
			dom.appendChild(div);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				var clickEvent = value.get("click");
				value.set("click", function() {
					clickEvent && clickEvent.call(this);
					value.set("show", true);
					var once = function() {						
						document.removeEventListener("click", once, true);
						value.set("show", false);
					};
					document.addEventListener("click", once ,true);
				});
				value.on("type", function(now, old) {
					if(!now || types.indexOf(now) == -1) {
						return value._set("type", "default");
					}
				});
				value.set("type", value.get("type"));
				Controller.createChild(dom, value);
			}
			change(data.get(dropdown));
			controller.bind("data", dropdown, change);


		}
	}
}).call(module.exports);