(function(){
	/**
		dom
			@param latte-strap-accordion-only boolean
			@param latte-strap-accordion-select String ["panel-primary"]  
			@param latte-strap-accordion-child String ["panel-primarys"]
			@param  latte-strap-accordion  String

		data 
			@param list
			@param select
	*/
	var cd = function() {
		var div = document.createElement("div");
		return div;
	}
	this.beforeLevel = 2;
	this.before = function(data, dom, controller) {
		var accordion = dom.attr("latte-strap-accordion");
		var selectClassName = dom.attr("latte-strap-accordion-select") || "panel-primary";
		var childClassName = dom.attr("latte-strap-accordion-child") || "panel-info";
		var only = dom.attr("latte-strap-accordion-only");
		if(accordion) {
							var span = document.createElement("span");
								span.setAttribute( "latte-html", "{{header}}");
						var header = cd();
						header.setAttribute("latte-click", "click");
						header.appendChild(span);
						header.className = "panel-heading accordion-toggle";
						
							var content = cd();
							content.className = "panel-body";
							content.setAttribute("latte-html", "{{body}}");
							content.setAttribute("latte-show", "show");
						var body = cd();
						body.className = "panel-collapse collapse-transition";
						body.appendChild(content);

					var child = cd();
					child.className = "panel";
					child.setAttribute("latte-class", "{{selectClass}}");
					child.appendChild(header);
					child.appendChild(body);
				var div = cd();
				div.setAttribute("latte-class", "{{selectClass}}");
				div.appendChild(child);
				div.setAttribute("latte-list", "list");
			dom.appendChild(div);
			var change = function(value, old) {

				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);

				}
				var accirdionData = value;

				accirdionData.get("list").forEach(function(o, index) {
					//if(!o.get("selectClass")) {
						o.set("selectClass", childClassName);
					//}
					o.set("click", function() {
						accirdionData.set("select", index);
					});	
				});
					var doSelect = function(select) {
						if(select == null) { return; }
						accirdionData.get("list").forEach(function(o) {
								o.set("selectClass", childClassName);
								if(only) {
									o.set("show", false);
								}
							});
						var selectObject = accirdionData.get("list."+select);
						selectObject.set("selectClass", selectClassName);
						selectObject.set("show", true);
						console.log(selectObject.get("show"));
					}
				doSelect(accirdionData.get("select"));
				controller.bind("data", accordion+".select", doSelect);
				
				dom.html("");
				var d = div.cloneNode(true);
				dom.appendChild(div);
				Controller.createChild(dom, value);
			};
			
			change(data.get(accordion));
			controller.bind("data", accordion, change);
			
		}
	}
	require("latte_dom/utils/css.js").importCssString(require("./accordion.css"), "latte_layout_loading1_css");

}).call(module.exports);