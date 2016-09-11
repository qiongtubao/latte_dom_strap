
(function(define) {'use strict'
define("latte_dom/c/commands/accordion.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function(){
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/affix.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	//暂时还没加回到顶部
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	var getXY = function(e) {
		var t=e.offsetTop;   
	    var l=e.offsetLeft;   
	    var height=e.offsetHeight;   
	    while(e=e.offsetParent){
	         t+=e.offsetTop;   
	         l+=e.offsetLeft;   
     	}
     	return {
     		x: l,
     		y: t
     	};
	}
	this.before = function(data, dom, controller) {
		var affix = dom.attr("latte-strap-affix");
		var selectClassName = dom.attr("latte-strap-affix-active") || "latte_active";
		if(affix) {
								var a = cd("a");
								a.setAttribute("latte-href", "{{href}}");
								a.setAttribute("latte-html", "{{text}}");
								a.setAttribute("latte-click", "click");
							var li = cd("li");
							li.appendChild(a);
							li.setAttribute("latte-class", "{{activeClass}}");
						var ul = cd("ul");
						ul.className = "nav";
						ul.setAttribute("latte-list", "list");
						ul.appendChild(li);
					var div = cd("nav");
					div.className = "affix";
					div.appendChild(ul);

				dom.appendChild(div);
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
					var list = old.get(list)
					if(list) {
						
						window.removeEventListener("scroll", o.get("scroll"));
					}
				}
				var doms = [];
				value.get("list").forEach(function(o, index) {
					o.set("activeClass", "");					
					o.set("click", function() {
						value.set("active", index);
					});
					//var dom = document.querySelector(o.get("href"));
					doms[index] = o.get("href");
				});
				value.set("scroll", function(e) {
				
					var index 
					var domJ = 9999999999;
					doms.forEach(function(href, i) {
						var o = document.querySelector(href);
						if(!o) {
							return
						}
						var xy = getXY(o);
						var j = (xy.y - window.pageYOffset)*(xy.y - window.pageYOffset)
						 + (xy.x - window.pageXOffset) * (xy.x - window.pageXOffset)
						
						if(j < domJ) {
							domJ = j;
							index = i;
						}
					});
					value.set('active', index);
				});
				
				window.addEventListener("scroll", value.get("scroll"));
				var doSelect = function(select, old) {
					if(select == old) {
						return;
					}
					if(select == null) { return; }
					value.get("list").forEach(function(o) {
						o.set("activeClass", "");
					});
					var selectObject = value.get("list."+select);
					selectObject.set("activeClass", selectClassName);									
				}
				doSelect(value.get("active"));
				data.on( affix+".active", doSelect);
				
				dom.html("");
				var d = div.cloneNode(true);
				dom.appendChild(div);
				Controller.createChild(dom, value);
			};

			change(data.get(affix));
			controller.bind('data', affix, change);
		}
	}
	//require("latte_dom/utils/css.js").importCssString(require("./affix.css"), "latte_strap_affix_css");

}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/alert.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/aside.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/buttonGroup.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/carousel.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/checkbox.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/datepicker.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/dropdown.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/modal.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/popover.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/progressbar.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/radio.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/select.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
	define("latte_dom/c/commands/spinner.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='@keyframes spin {	100% {		transform: rotate(360deg);	}}.spinner-gritcode {    top: 0;    left: 0;    bottom: 0;    right: 0;    z-index: 9998;    position: absolute;    width: 100%;    text-align: center;    background: rgba(255, 255, 255, 0.9);}.spinner-gritcode .spinner-wrapper {    position: absolute;    top: 50%;    left: 50%;    transform: translate(-50%, -50%);    -ms-transform: translate(-50%, -50%);}.spinner-gritcode.s .spinner-circle {    width: 1.5em;    height: 1.5em;}.spinner-gritcode.m .spinner-circle {    width: 2em;    height: 2em;}.spinner-gritcode.x .spinner-circle {    width: 2.5em;    height: 2.5em;}.spinner-gritcode.xl .spinner-circle {    width: 3.5em;    height: 3.5em;}.spinner-gritcode .spinner-circle {    position: relative;    border: 4px solid #ccc;    border-right-color: #337ab7;    border-radius: 50%;    display: inline-block;    animation: spin 0.6s linear;    animation-iteration-count: infinite;    width: 3em;    height: 3em;    z-index: 2;}.spinner-gritcode .spinner-text {    position: relative;    text-align: center;    margin-top: 0.5em;    z-index: 2;    width: 100%;    font-size: 95%;    color: #337ab7;}'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/spinner.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	/**
		遮挡loading
			@param fixed Boolean [0, 1]
			@param size  String [s, m, l ,xl]
	*/
	this.before = function(data, dom, controller) {
		var spinner = dom.attr("latte-strap-spinner");
		if(spinner) {
					var circle = cd();
					circle.className = "spinner-circle";

					var text = cd();
					text.className = "spinner-text";
					text.setAttribute("latte-html", "{{text}}");
				var spinner = cd();
				spinner.className = "spinner-wrapper";
			var div = cd();
			div.className = "spinner spinner-gritcode";
			div.setAttribute("latte-class", "{{size}}")
			div.appendChild(spinner);
			dom.appendChild(div);
				var change = function() {
					dom.html("");
					dom.appendChild(div);
					Controller.createChild(dom);
				}
			controller.bind("data", spinner, change);
		}
	}
	
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/tabs.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/tooltip.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/typeahead.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });