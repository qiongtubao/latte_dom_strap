(function() {
	//选择
	//未完成输入型  选择
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var select = dom.attr("latte-strap-select");
		if(select) {	
								var optionDom = cd("option");
								optionDom.setAttribute("latte-value", "value");
								optionDom.setAttribute("latte-html", "{{name}}");
								
							var selectDom = cd("select");
							selectDom.className = "secret";
							selectDom.appendChild(optionDom);
							selectDom.setAttribute("latte-list", "list");
							selectDom.setAttribute("latte-name", "name");
							selectDom.style["display"] = "none";
								var btnText = cd("span");
								btnText.className = "btn-content";
								btnText.setAttribute("latte-html", "{{selectName}}");

								var caret = cd("span");
								caret.className = "caret";

							var buttonDom = cd("button");
							buttonDom.setAttribute("type", "button");
							buttonDom.className = "form-control dropdown-toggle";
							buttonDom.setAttribute("latte-click", "click");
							buttonDom.appendChild(btnText);
							buttonDom.appendChild(caret);
											var textDom = cd("span");
											textDom.setAttribute("latte-html", "{{name}}");
											var spanDom = cd("span");
											spanDom.className = "glyphicon glyphicon-ok check-mark none";
											spanDom.setAttribute("latte-class", "{! select? inline-blok: !}");

										var a = cd("a");
										a.style["cursor"] = "pointer";
										a.appendChild(textDom);
										a.appendChild(spanDom);
									var li = cd("li");
									li.appendChild(a);
									li.style["position"] = "relative";
									li.setAttribute("latte-click", "click");
								var ul = cd("ul");
								
								ul.setAttribute("latte-list", "list");
								ul.className = "dropdown-menu block";
								ul.appendChild(li);

								
							var ulDom = cd();
							//ulDom.appendChild(input);
							ulDom.appendChild(ul);
							ulDom.setAttribute("latte-show", "show");
						var dropDownDom = cd();
						dropDownDom.className = "dropdown";
						dropDownDom.appendChild(selectDom);
						dropDownDom.appendChild(buttonDom);
						dropDownDom.appendChild(ulDom);

					var div = cd();
					div.className = "btn-select";
					div.appendChild(dropDownDom)
				dom.appendChild(div);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				value.value = function() {
					var list = value.get("list");
					for(var i = 0, len = list.length; i < len; i++) {
						if(list.get(i+".select")) {
							return list.get(i+".value") || list.get(i +".name");
						}
					}
				}
				var select = function(index, old) {
					if(old != null) {
						value.set("list."+old+".select", 0);
					}
					
					value.set("list."+index+".select", 1);
					console.log(value.get("list."+index+".name"));
					value.set("selectName", value.get("list."+index+".name") );
				};
				value.on("select", select);
				value.select = function(index) {
					value.set("select", index);
					selectDom.options[index].selected = 1;
					value.set("show", false);
				}
				value.get("list").forEach(function(o, index) {
					o.set("click", function() {
						value.select(index);
					});
				});
				value.set("click", function() {
					value.set("show", !value.get("show"));
					document.once("click", function() {
						value.set("show", false);
					}, true);
				});
				value.select(value.get("select") || "0");
				Controller.createChild(dom, value);
			};
			change(data.get(select));
			controller.bind("data", select, change);
		}
	}
}).call(module.exports);