(function() {

	var cd = function(name) {
		return document.createElement(name || "div");
	}	
	this.before = function(data, dom, controller) {
		var checkbox = dom.attr("latte-strap-checkbox");
		var type = dom.attr("latte-strap-checkbox-type");
		if(checkbox) {
								var inputDom = cd("input");
								inputDom.setAttribute("type", "checkbox");
								inputDom.setAttribute("latte-value", "{{value}}");
								inputDom.setAttribute("latte-disabled", "disabled");
								inputDom.setAttribute("latte-checkbox-checked", "checked");
								//暂时未添加class 判断以及运算  表达式
								inputDom.setAttribute("latte-class", "{! disabled? disabled: !}");
								var spanDom = cd("span");
								spanDom.setAttribute("latte-html", "{{text}}");

							var label = cd("label");	
							label.appendChild(inputDom);
							label.appendChild(spanDom);
						var checkboxDom = cd();
						checkboxDom.className = "checkbox";
						checkboxDom.appendChild(label);

						var div = cd();
						
						div.setAttribute("latte-list", "list");
						div.appendChild(checkboxDom);
						//固定inline 
					dom.appendChild(div);
				var change = function(value, old) {
					var Controller = require("../controller.js");
					if(old) {
						Controller.removeChild(dom, old);
					}
					dom.html("");
					dom.appendChild(div);
					value.value = function() {
						var map = [];
						 value.get("list").forEach(function(o){
							if(o.get("checked")) {
								map.push(o.get("value"));
							}
						});
						 return map;
					}
					Controller.createChild(dom, value);
				}
			change(data.get(checkbox));
			controller.bind("data", checkbox, change);
		}
	}
}).call(module.exports);