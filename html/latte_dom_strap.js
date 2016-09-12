
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
	//aside
	var backdrop;
	var getBackdrop = function() {
		if(backdrop) {
			return backdrop;
		}
		var backdropDom = document.createElement("div");
		var View = require("../../v/view.js");
		backdrop = View.create(backdropDom);
		backdrop.classed({
			"aside-backdrop": 1,
			"ease-fade": 1
		});
		document.body.appendChild(backdropDom);
		backdrop.show = function() {
			if(!backdrop) {
				createBackDrop();
			}
			backdrop.style("display", "block");
			//这里需要让它之行css3的动画
			backdrop.classed("in", 1);
			return ++self.zIndex;
		}
		backdrop.hide = function() {
			backdrop.style("display", "none");
			backdrop.classed("in", 0);
		}
		backdrop.zIndex = 1040;
		return backdrop;
	}
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var aside = dom.attr("latte-strap-aside");
		var placement = dom.attr("latte-aside-placement") || "left";
		if(aside) {		
						var bodyDom = cd();
						bodyDom.setAttribute("latte-data", "data");
						bodyDom.className += " aside-body";
								var spanDom = cd("span");
								spanDom.innerHTML  = "x";
							var closeDom = cd("button");
							closeDom.className = "close";
							closeDom.setAttribute("latte-click", "close");
							closeDom.appendChild(spanDom);

							var titleDom = cd("h4");
							titleDom.className = "aside-title";
							titleDom.setAttribute("latte-html", "{{title}}");
						var headerDom = cd();
						headerDom.className = "aside-header";
						headerDom.appendChild(closeDom);
						headerDom.appendChild(titleDom);
					var contentDom = cd();
					contentDom.appendChild(headerDom);


					contentDom.appendChild(bodyDom);
					contentDom.className = "aside-content";

				var dialogDom = cd();
				dialogDom.className = "aside-dialog";
				dialogDom.appendChild(contentDom);
			var asideDom = cd();
			//先固定吧 之后在看情况是不是要变成动态的
			asideDom.className = "aside "+"slide"+placement+"-transition "+placement ;;
			asideDom.setAttribute("latte-show", "show");
			asideDom.appendChild(dialogDom);
			var b ;
			while(b = dom.children[0]) {
				dom.removeChild(b);	
				bodyDom.appendChild(b);
			}
			var change = function(value, old) {
				if(!value) {return;}
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				dom.html("");
				var copyDom = asideDom.cloneNode(true);
				dom.appendChild(copyDom);
				value.on("show", function(value, old) {
					if(value == old) { return; }
					value ? getBackdrop().show(): getBackdrop().hide();
				});
				value.set("close", function() {
					value.set("show", false);
				});
				value.show = function() {
					value.set("show", true);
					getBackdrop().show();
				};
				Controller.createChild(dom, value);
			}
			console.log(data, aside);
			change(data.get(aside));
			controller.bind("data",  aside, change);
		}
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/buttonGroups/radio.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	this.create = function(data, dom, controller) {
		
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/checked.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
	(function() {
		this.after = function(data, dom, controller) {
			var checked = dom.attr("latte-checkbox-checked");
			if(checked) {
				
				var click = function(event) {
					//console.log(dom.node().checked);
					data._set(checked, dom.node().checked);
				};
				var change = function(value) {
					//dom.attr("checked", value);
					dom.node().checked = value;
				};
				change(data.get(checked));
				controller.bind("data", checked, change);
				controller.bind("view", "click", click);
			}
		};
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
define("latte_dom/c/commands/disabled.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {

	(function() {
		this.after = function(data, dom, controller) {
			var disabled = dom.attr("latte-disabled");
			if(disabled) {
				var change = function(value, old) {
					value ? dom.attr("disabled", true): dom.attr("disabled");
				}
				change(data.get(disabled));
				controller.bind("data", disabled, change);
			}
		};
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
	//暂时没有绑定name 限定   
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var radio = dom.attr("latte-strap-radio");	
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/radioName.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	this.after = function(data, dom, controller) {
		var name =  dom.attr("latte-name");
		if(name) {
			
			var change = function(value, old) {
				dom.node().name = value;
			};
			change(data.get(name));
			controller.bind("data", name, change);
		}
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
				var change = function(value, old) {
					if(old) {
						Controller.removeChild(dom, old);
					}
					dom.html("");
					dom.appendChild(div);
					Controller.createChild(dom, value);
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
	//
	this.before = function(data, dom, controller) {
		
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });