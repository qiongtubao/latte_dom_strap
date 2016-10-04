/**
	dom
		@param latte-strap-accordion-only boolean
		@param latte-strap-accordion-active String ["panel-primary"]  
		@param latte-strap-accordion-child String ["panel-primarys"]
		@param  latte-strap-accordion  String

	data 
		@param list
		@param active
*/
(function() {
	var cd = function() {
		var div = document.createElement("div");
		return div;
	}
	this.before = function(data, dom, controller) {
		var accordion = dom.attr("latte-strap-accordion");
		var selectClassName = dom.attr("latte-strap-accordion-active") || "panel-primary";
		var childClassName = dom.attr("latte-strap-accordion-default") || "panel-info";
		var only = dom.attr("latte-strap-accordion-only");
		if(accordion) {
								var span = document.createElement("span");
								span.setAttribute( "latte-html", "{{header}}");
						var header = cd();
						header.setAttribute("latte-click", "click");
						header.appendChild(span);
						header.className = "panel-heading accordion-toggle";
								var p = cd();
								
								
								p.setAttribute("latte-html", "{{body}}");
								
							var content = cd();
							content.className += "panel-body";
							
							content.appendChild(p);
						var body = cd();
						body.className = "panel-collapse collapse-transition";
						body.setAttribute("latte-show", "show");
						body.setAttribute("latte-showFunc", "showFunc");
						body.setAttribute("latte-hideFunc", "hideFunc");
						body.style["overflow"] = "hidden";
						body.appendChild(content);

					var child = cd();
					child.className = "panel";
					child.setAttribute("latte-class", "{{activeClass}}");
					child.appendChild(header);
					child.appendChild(body);
				var div = cd();
				//div.setAttribute("latte-class", "{{activeClass}}");
				div.appendChild(child);
				div.setAttribute("latte-list", "list");
			dom.appendChild(div);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				dom.html("");
				var d = div.cloneNode(true);
				dom.appendChild(div);

				
				value.get("list").forEach(function(o, index) {
					//if(!o.get("selectClass")) {
						o.set("activeClass", childClassName);
					//}
					
					o.set("showFunc", function() {
						var view = this;
						var height = view._offsetHeight;
						view.style("max-height", 0+"px");
						setTimeout(function() {
							view.style("max-height", height+"px");
						}, 30);
					});

					o.set("hideFunc", function() {
						var view = this;	
						view.style("max-height", 0 + "px");
					});
					o.set("show", o.get("show") || false);

					o.set("click", function() {
					
						value.set("active", index);
					});	
				});
				var doSelect = function(n, o) {
					console.log(n, o);
					if( n == o) {
						//if(only) {
						//	return;
						//}else{
							var selectObject = value.get("list."+n);
							selectObject.set("activeClass", selectObject.get("show")? childClassName: selectClassName);
							selectObject.set("show", !selectObject.get("show"));
							return;
						//}
					}
					if(o != null) {
						var oObject = value.get("list."+o);
						oObject.set("activeClass", childClassName);
						oObject.set("show", false);
					}
					
					var nObject = value.get("list."+n);
					nObject.set("activeClass", selectClassName);
					nObject.set("show", true);
				};
				//doSelect(value.get("active"));
				value.set("active", value.get("active") || 0);
				value.on("active", doSelect);
				Controller.createChild(dom, value);


			}
			change(data.get(accordion));

			controller.bind("data", accordion, change);
		}
	}
}).call(module.exports);
/**
(function(){
	
	var cd = function() {
		var div = document.createElement("div");
		return div;
	}
	this.beforeLevel = 2;
	this.before = function(data, dom, controller) {
		var accordion = dom.attr("latte-strap-accordion");
		var selectClassName = dom.attr("latte-strap-accordion-active") || "panel-primary";
		var childClassName = dom.attr("latte-strap-accordion-default") || "panel-info";
		var only = dom.attr("latte-strap-accordion-only");
		var showClassName = dom.attr("latte-strap-accordion-show");
		var transitionClass= dom.attr("latte-strap-accordion-transition");
		var hideClassName = dom.attr("latte-strap-accordion-hide");
		if(accordion) {
							var span = document.createElement("span");
								span.setAttribute( "latte-html", "{{header}}");
						var header = cd();
						header.setAttribute("latte-click", "click");
						header.appendChild(span);
						header.className = "panel-heading accordion-toggle";
								var p = cd();
								
								
								p.setAttribute("latte-html", "{{body}}");
								
							var content = cd();
							content.className += "panel-body";

							//content.className = " ";
							//content.setAttribute("latte-html", "{{body}}");
							//showClassName && content.setAttribute("latte-showClass", showClassName);
							//if(transitionClass){ content.className += " "+transitionClass; }
							//hideClassName && content.setAttribute("latte-hideClass", hideClassName);
							
							
							content.appendChild(p);
						var body = cd();
						body.className = "panel-collapse collapse-transition";
						body.setAttribute("latte-show", "show");
						body.setAttribute("latte-showFunc", "showFunc");
						body.setAttribute("latte-hideFunc", "hideFunc");
						body.style["overflow"] = "hidden";
						body.appendChild(content);

					var child = cd();
					child.className = "panel";
					child.setAttribute("latte-class", "{{activeClass}}");
					child.appendChild(header);
					child.appendChild(body);
				var div = cd();
				//div.setAttribute("latte-class", "{{activeClass}}");
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
						o.set("activeClass", childClassName);
					//}
					
					o.set("showFunc", function() {
						var view = this;
						var height = view._offsetHeight;
						view.style("max-height", 0+"px");
						setTimeout(function() {
							view.style("max-height", height+"px");
						}, 30);
					});
					o.set("hideFunc", function() {
						var view = this;	
						view.style("max-height", 0 + "px");
					});
					o.set("show", o.get("show") || false);
					o.set("click", function() {
						accirdionData.set("active", index);
					});	
				});
					var doSelect = function(select) {
						if(select == null) { return; }
						accirdionData.get("list").forEach(function(o) {
							o.set("activeClass", childClassName);
							if(only) {
								o.set("show", false);
							}
						});
						var selectObject = accirdionData.get("list."+select);
						selectObject.set("activeClass", selectClassName);
						selectObject.set("show", true);
						
					}
				doSelect(accirdionData.get("active"));
				data.on( accordion+".active", doSelect);
				
				dom.html("");
				var d = div.cloneNode(true);
				dom.appendChild(div);
				Controller.createChild(dom, value);
			};
			
			change(data.get(accordion));
			controller.bind("data", accordion, change);
			
		}
	}
	//require("latte_dom/utils/css.js").importCssString(require("./accordion.css"), "latte_layout_loading1_css");

}).call(module.exports);
*/