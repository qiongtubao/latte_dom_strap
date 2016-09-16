(function() {
	//Typeahead
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var typeahead = dom.attr("latte-strap-typeahead");
		if(typeahead) {
					var inputDom = cd("input");
					inputDom.className = "form-control";
					inputDom.setAttribute("latte-duplex", "value");
					inputDom.setAttribute("latte-keyChange", "keyChange");
					inputDom.setAttribute("latte-click", "click");
								var span = cd("span");
								span.setAttribute("latte-html", "{{name}}");

							var a = cd("a");
							a.appendChild(span);
						var li = cd("li");
						li.setAttribute("latte-click", "click");
						li.setAttribute("latte-class", "{!select ? active: !}");
						li.appendChild(a);
					var ulDom = cd("ul");
					ulDom.className = "dropdown-menu block";
					ulDom.setAttribute("latte-show", "show");
					ulDom.setAttribute("latte-list", "showList");
					ulDom.appendChild(li);
					var div = cd();
					div.style["position"] = "relative";
					div.appendChild(inputDom);
					div.appendChild(ulDom);
				dom.appendChild(div);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				var changeList = function(str) {
					var list = [];
					console.log(str);
					if(str == "" || str == null) {
						list = value.get("list");
						console.log(list.length);
					}else{
						value.get("list").forEach(function(o) {
							if(o.get("name").indexOf(str) == 0) {
								list.push(o)
							}
						});
						
					}

					
					
					value.set("showList", list);
					value.set("show", !!list.length);
					if(!!list.length) {
						document.once("click", function() {
							value.set("show", false);
						}, true);
					}
				}
				//console.log(value.get("list").filter);
				
				
				value.set("click", function() {
					changeList( value.get("value") || "");
				});
				
				value.set("keyChange", function() {
					//value.set("show", true);
					changeList(inputDom.value);

				});
				changeList(value.get("value") );
				value.set("show", false);
				Controller.createChild(dom, value);
				
			};
			change(data.get(typeahead));
			controller.bind("data", typeahead, change);

		}
	}
}).call(module.exports);