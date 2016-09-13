(function() {
	//radio-inline 还没显示
	//彩色的  还没实现
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var radio = dom.attr("latte-strap-radio");	
		var radioType = dom.attr("latte-strap-radio-type");
		if(radio) {
								var inputDom = cd("input");
								inputDom.setAttribute("type", "radio");	
								inputDom.setAttribute("latte-value", "{{value}}");
								inputDom.setAttribute("latte-disabled", "disabled");
								inputDom.setAttribute("latte-click", "click");
								inputDom.setAttribute("latte-checkbox-checked", "checked");
								inputDom.setAttribute("latte-class", "{! disabled? disabled: !}");						
								inputDom.setAttribute("latte-name", "name");

								var spanDom = cd("span");
								spanDom.setAttribute("latte-html", "{{text}}");

							var labelDom = cd("label");
							if(radioType) {
								labelDom.className = "checkbox-"+radioType;
							}
							labelDom.appendChild(inputDom);
							labelDom.appendChild(spanDom);


						var radioDom = cd();
						radioDom.className = "radio";
						radioDom.appendChild(labelDom);
					var div = cd("form");
					
					div.setAttribute("latte-list", "list");
					div.appendChild(radioDom);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				dom.html("");
				var copy = div.cloneNode(true);
				dom.appendChild(copy);
				value.value = function() {
					return value.get("list."+value.get("radio")+".value");
				}

				value.get("list").forEach(function(o, index) {
					o.set("click", function() {
						value.set("radio", index);
					});
					o.set("name", value.get("name"));
				});
				var changeRadio = function(now, old) {

					value.get("list").forEach(function(o) {
						o.set("checked", false);
					});
					if(!now) { return;}
					value.set("list."+now+".checked", true);
				};
				//vlaue.get("list").on("push"); add event
				changeRadio(value.get("radio"));
				value.on("radio", changeRadio);
				Controller.createChild(dom, value);
			}
			change(data.get(radio));
			controller.bind("data", radio, change);

		}
	}
}).call(module.exports);