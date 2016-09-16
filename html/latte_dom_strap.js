
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
	var getBackdrop = require("./backdrop").get;
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
define("latte_dom/c/commands/backdrop.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
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
	this.get = getBackdrop;
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
	//暂时缺少动画效果
	var cd = function(name) {
		return document.createElement(name || "div");
	};
	var run = function(value) {
		value.timer = setTimeout(function() {
			value.get(value.get("slide") || "next")();
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
							img.setAttribute("latte-click", "click");
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/checkbox.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//checkbox-inline 还没显示
	//彩色的  还没实现
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
	//日历  年月日
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var datepicker = dom.attr("latte-strap-datepicker");
		if(datepicker) {

						var inputDom = cd("input");
						inputDom.className = "form-control datepicker-input with-reset-button";
						inputDom.setAttribute("type", "text");
						inputDom.setAttribute("latte-duplex", "timeValue");
						inputDom.setAttribute("latte-click", "showDatePicker");


							var spanDom = cd("span");
							spanDom.innerHTML = "x"; 
						var closeDom = cd("button");
						closeDom.setAttribute("type", "button");
						closeDom.className = "close";
						closeDom.setAttribute("latte-show", "closeShow");
						closeDom.appendChild(spanDom);

									
										var dateCtrlLeftDom = cd("span");
										dateCtrlLeftDom.className = "datepicker-preBtn glyphicon glyphicon-chevron-left";
										dateCtrlLeftDom.setAttribute("aria-hidden", "true");
										dateCtrlLeftDom.setAttribute("latte-click", "dateCtrlLeft");
										var dateCtrlRightDom = cd("span");
										dateCtrlRightDom.className = "datepicker-nextBtn glyphicon glyphicon-chevron-right";
										dateCtrlRightDom.setAttribute("aria-hidden", "true");
										dateCtrlRightDom.setAttribute("latte-click", "dateCtrlRight");
										var dateCtrlContentDom = cd("p");
										dateCtrlContentDom.setAttribute("latte-html", "{{monthName}} {{dateShowYear}}");
										dateCtrlContentDom.setAttribute("latte-click", "dateCtrlClick");
									var dateCtrlDom = cd();
									dateCtrlDom.className = "datepicker-ctrl";
									dateCtrlDom.appendChild(dateCtrlLeftDom);
									dateCtrlDom.appendChild(dateCtrlRightDom);
									dateCtrlDom.appendChild(dateCtrlContentDom);

										var dateWeekDomListOne = cd("span");
										dateWeekDomListOne.setAttribute("latte-html", "{{day}}");

									var dateWeekDom = cd();
									dateWeekDom.className = "datepicker-weekRange";
									dateWeekDom.setAttribute("latte-list", "days");
									dateWeekDom.appendChild(dateWeekDomListOne);

										var dateOneDom = cd("span");
										dateOneDom.setAttribute("latte-html", "{{date}}");
										dateOneDom.setAttribute("latte-class", "{!gray?datepicker-item-gray: !}  {!active? datepicker-dateRange-item-active: !}")
										dateOneDom.setAttribute("latte-click", "click");
									var dateRangeDom = cd();
									dateRangeDom.className = "datepicker-dateRange";	
									dateRangeDom.setAttribute("latte-list", "dates");
									dateRangeDom.appendChild(dateOneDom);




								var dateBodyDom = cd();
								dateBodyDom.className = "datepicker-body";
								dateBodyDom.appendChild(dateCtrlDom);
								dateBodyDom.appendChild(dateWeekDom);
								dateBodyDom.appendChild(dateRangeDom);



							var dateInnnerDom = cd();
							dateInnnerDom.className = "datepicker-inner";
							dateInnnerDom.appendChild(dateBodyDom);
						var dateDom = cd();
						dateDom.className = "datepicker-popup";
						dateDom.setAttribute("latte-show", "dateShow");
						dateDom.appendChild(dateInnnerDom);

										var monthCtrlLeftDom = cd("span");
										monthCtrlLeftDom.className = "datepicker-preBtn glyphicon glyphicon-chevron-left";
										monthCtrlLeftDom.setAttribute("aria-hidden", "true");
										monthCtrlLeftDom.setAttribute("latte-click", "monthCtrlLeft");
										var monthCtrlRightDom = cd("span");
										monthCtrlRightDom.className = "datepicker-nextBtn glyphicon glyphicon-chevron-right";
										monthCtrlRightDom.setAttribute("aria-hidden", "true");
										monthCtrlRightDom.setAttribute("latte-click", "monthCtrlRight");
										var monthCtrlContentDom = cd("p");
										monthCtrlContentDom.setAttribute("latte-html", "{{monthShowYear}}");
										monthCtrlContentDom.setAttribute("latte-click", "monthCtrlClick");
									var monthCtrlDom = cd();
									monthCtrlDom.className = "datepicker-ctrl";
									monthCtrlDom.appendChild(monthCtrlLeftDom);
									monthCtrlDom.appendChild(monthCtrlRightDom);
									monthCtrlDom.appendChild(monthCtrlContentDom);

										var monthOneDom = cd("span");
										monthOneDom.setAttribute("latte-class", "{!active?datepicker-dateRange-item-active: !}");
										monthOneDom.setAttribute("latte-html", "{{month}}");
										monthOneDom.setAttribute("latte-click", "click");
									var monthRangeDom = cd();
									monthRangeDom.className = "datepicker-monthRange";
									monthRangeDom.setAttribute("latte-list", "months");
									monthRangeDom.appendChild(monthOneDom);

								var monthBodyDom = cd();
								monthBodyDom.className = "datepicker-body";
								monthBodyDom.appendChild(monthCtrlDom);
								monthBodyDom.appendChild(monthRangeDom);

							var monthInnerDom = cd();
							monthInnerDom.className = "datepicker-inner";
						var monthDom = cd();
						monthDom.className = "datepicker-popup";
						monthDom.setAttribute("latte-show", "monthShow");
						monthDom.appendChild(monthInnerDom);
						monthDom.appendChild(monthBodyDom);

										var decadeCtrlLeftDom = cd("span");
										decadeCtrlLeftDom.className = "datepicker-preBtn glyphicon glyphicon-chevron-left";
										decadeCtrlLeftDom.setAttribute("aria-hidden", "true");
										decadeCtrlLeftDom.setAttribute("latte-click", "decadeCtrlLeft");
										var decadeCtrlRightDom = cd("span");
										decadeCtrlRightDom.className = "datepicker-nextBtn glyphicon glyphicon-chevron-right";
										decadeCtrlRightDom.setAttribute("aria-hidden", "true");
										decadeCtrlRightDom.setAttribute("latte-click", "decadeCtrlRight");
										var decadeCtrlContent = cd("p");
										decadeCtrlContent.setAttribute("latte-html", "{{decadeShowStartYear}}-{{decadeShowEndYear}}");
										decadeCtrlContent.setAttribute("latte-click", "dateCtrlContent");
									var decadeCtrlDom = cd();
									decadeCtrlDom.className = "datepicker-ctrl";
									decadeCtrlDom.appendChild(decadeCtrlLeftDom);
									decadeCtrlDom.appendChild(decadeCtrlRightDom);
									decadeCtrlDom.appendChild(decadeCtrlContent);

										var decadeOneDom = cd("span");
										decadeOneDom.setAttribute("latte-class", "{!active?datepicker-dateRange-item-active: !}");
										decadeOneDom.setAttribute("latte-html", "{{year}}");
										decadeOneDom.setAttribute("latte-click", "click");
										
									var decadeRangeDom = cd();
									decadeRangeDom.className = "datepicker-monthRange decadeRange";
									decadeRangeDom.setAttribute("latte-list", "years");
									decadeRangeDom.appendChild(decadeOneDom);


								var decadeBodyDom = cd();
								decadeBodyDom.className = "datepicker-body";
								decadeBodyDom.appendChild(decadeCtrlDom);
								decadeBodyDom.appendChild(decadeRangeDom);

							var decadeInnerDom = cd();
							decadeInnerDom.className = "datepicker-inner";
						var decadeDom = cd();
						decadeDom.className = "datepicker-popup";
						decadeDom.setAttribute("latte-show", "decadeShow");
						decadeDom.appendChild(decadeInnerDom);
						decadeDom.appendChild(decadeBodyDom);



					var div = cd();
					div.className = "datepicker";
					div.appendChild(inputDom);
					div.appendChild(closeDom);
					div.appendChild(dateDom);
					div.appendChild(monthDom);
					div.appendChild(decadeDom);
				dom.appendChild(div);
			
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
					
				}
				//dom.html("");
				//dom.appendChild(copy);
				value.set("showDatePicker", function() {
					var show = value.get("dateShow"); 

					if(show) {
						value.set("dateShow", false);
					}else{

						value.showMonthModel(t.getFullYear(),t.getMonth());
						value.set('dateShow', true);
					}
					//value.set("dateShow", true);
				});
				var t = new Date(value.get("time"));
				value.on("timeValue", function(time, old) {
					
					t = new Date(time);
					
					value.set("year", t.getFullYear());				
				});	
				var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(function(i) {
					return {
						day: i
					};
				});
				value.set("days", days);
				var allMonths = ["January", "February", "March", "April", "May", 
				"June", "July", "August", "September", "October", "November", "December"];
				var months = allMonths.map(function(i, index) {
					return {
						month: i.substring(0,3),
						click: function() {
							value.showDateModel(value.get("monthShowYear"), index);
							value.set("dateShow", true);
							value.set("monthShow", false);		
						}
					}
				});
				value.set("months", months);
				
				value.on("month", function(month) {
					t.setMonth(month);
					
					//value._set('timeValue', latte_lib.format.dateFormat(format, t));
					value.set("date", t.getDate());
				});

				value.showDateModel = function(year, month) {
					
					//value.set("showYear", year);
					var o = new Date(year, month, 1);
					value.set("dateShowYear", o.getFullYear());
					value.set("dateShowMonth", o.getMonth());
					value.set("monthName", allMonths[o.getMonth()]);
					o.setDate(0);
					//value.dateShowYear = year;
					//value.dateShowMonth = month;
					var date;
					if(t.getFullYear() == year && t.getMonth() == month) {
						date = t.getDate();
					}
					var dates = [];
					
					//console.log(o.getDay());
					while(o.getDay() != 6) {
						dates.unshift({
							date: o.getDate(),
							gray:1
						});
						o.setDate(o.getDate() -1);
					}

					o.setMonth(o.getMonth() + 2);
					o.setDate(0);
					var len = o.getDate();
					//console.log(o.getMonth(), o.getDate());
					var activeData ;
					for(var i = 1; i <= len; i++) {
						(function(i) {
							var d = latte_lib.object.create({
								date: i,
								click: function() {
									t.setFullYear(year);
									t.setMonth(month);
									t.setDate(i);
									value.set('timeValue', latte_lib.format.dateFormat(format, t));
									d.set("active", 1);
									if(activeData) {
										activeData.set("active", 0);
									}
									activeData = d;
									value.set("dateShow", false);
								}
							});
							if(date && i == date) {
								d.set("active",  1);
								activeData = d;
							}
							dates.push(d);
						})(i);
						
					};
					//console.log(o.getDay());
					o.setDate(o.getDate() + 1);
					while(o.getDay() != 0) {
						dates.push({
							date: o.getDate(),
							gray: 1
						});
						o.setDate(o.getDate() + 1);
					}
					value.set("dates", dates);
				}
				value.on("date", function(date) {
					t.setDate(date);
					
					value._set('timeValue', latte_lib.format.dateFormat(format, t));
				});
				value.set("dateCtrlRight", function() {
					value.showDateModel(value.get("dateShowYear"), value.get("dateShowMonth") + 1);
				});
				value.set("dateCtrlLeft", function() {
					value.showDateModel(value.get("dateShowYear"), value.get("dateShowMonth") - 1);
				});
				value.set("dateCtrlClick", function() {
					value.showMonthModel(value.get("dateShowYear"));
					value.set("dateShow", false);
					value.set("monthShow", true);
				});
				value.showMonthModel = function(year) {
					value.set("monthShowYear", year);
					if(year == t.getFullYear()) {
						value.get("months").get(t.getMonth()).set("active", true);
					}else{
						value.get("months").get(t.getMonth()).set("active", false);
					}
				}
				value.set("monthCtrlLeft", function() {
					value.showMonthModel(value.get("monthShowYear") - 1);
				});
				value.set("monthCtrlRight", function() {
					value.showMonthModel(value.get("monthShowYear") + 1);
				});
				value.set("monthCtrlClick", function() {
					var year = value.get("monthShowYear");
					value.showDecadeModel(year - year % 10);
					value.set("monthShow", false);
					value.set("decadeShow", true);
				});
				value.showDecadeModel = function(year) {
					t.setFullYear(year);
					//value._set('timeValue', latte_lib.format.dateFormat(format, t));
					var years = [];
					

					var startYear = year, endYear = startYear + 10;
					for(var i = startYear - 1; i <= endYear ;i++) {
						(function(i) {
							var y = {
								year: i,
								click: function() {
									value.set("decadeShow", false);
									value.showMonthModel(i);
									value.set("monthShow", true);
								}
							};
							if(i == t.getFullYear()) {
								y.active = 1;
							}
							years.push(y);
						})(i);
						
					};
					value.set("years", years);
					value.set("decadeShowStartYear", startYear);
					value.set("decadeShowEndYear", endYear);	
				};
				value.set("decadeCtrlLeft", function() {
					value.showDecadeModel(value.get("decadeShowStartYear" - 10));
				});
				value.set("decadeCtrlRight", function() {
					value.showDecadeModel(value.get("decadeShowStartYear" + 10));
				});
				value.showDecadeModel(t.getFullYear() - t.getFullYear() % 10);
				var format = value.get("format") || "yyyy-MM-dd";
				value.set('timeValue', latte_lib.format.dateFormat(format, t));
				value.time = t;
				value.showDateModel(t.getFullYear(), t.getMonth());
				Controller.createChild(dom, value);
			};
			change(data.get(datepicker));
			controller.bind("data", datepicker, change);
		}
	}
	var Time = function(time) {
		this.data = new Date(time);
	};
	(function() {
		this.setMonth = function() {

		}
	}).call(Time.prototype);
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
	define("latte_dom/c/commands/index.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='.block {	display: block;}.none {	display: none;}'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
require("latte_dom/utils/css.js").importCssString(require("./index.css"), "latte_trap_css");


document.once = function(type, func, option) {
	var onceFunc = function() {
		func();
		document.removeEventListener(type, onceFunc, option);
	}
	document.addEventListener(type, onceFunc, option);
}
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/keyChange.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	this.after = function(data, dom, controller) {
		
		var keyChange = dom.attr("latte-keyChange");
		if(keyChange) {
			var addEvents = function(now, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.remove(dom, old);
				}

				
				var keyUp = function(event) {
					now.call(data, dom.attr("value"));
				};
				
				controller.bind("view", "keyup", keyUp, true);
				
				//Controller.create(dom, now);
			};
			addEvents(data.get(keyChange));
			controller.bind("data", keyChange, addEvents);
		}	

	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/modal.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//弹窗
	var cd = function(name) {
		return document.createElement(name || "div");
	};
	var getBackdrop = require("./backdrop").get;
	this.before = function(data, dom, controller) {
		var modal = dom.attr("latte-strap-modal");
		if(modal){
			var child = dom.children[0];
			dom.removeChild(child);
								var span = cd("span");
								span.innerHTML = "x";
								var closeButton = cd("button");
								closeButton.className = "close";
								closeButton.setAttribute("latte-click", "close");
								closeButton.appendChild(span);
								var titleDom = cd("h4");
								titleDom.className = "modal-title";
								titleDom.setAttribute("latte-html", "{{title}}");

							var headerDom = cd();
							headerDom.className = "modal-header";
							headerDom.appendChild(closeButton);
							headerDom.appendChild(titleDom);

							var bodyDom = cd();
							bodyDom.className = "modal-body";
							bodyDom.appendChild(child);
							bodyDom.setAttribute("latte-data", "body");

								var footerOne = cd("button");
								footerOne.className = "btn btn-default";
								footerOne.setAttribute("latte-html", "{{text}}");
								footerOne.setAttribute("latte-click", "click");
							var footerDom = cd();
							footerDom.className = "modal-footer";
							footerDom.setAttribute("latte-list", "footer");
							footerDom.appendChild(footerOne);

						var contentDom = cd();
						contentDom.className = "modal-content";
						contentDom.appendChild(headerDom);
						contentDom.appendChild(bodyDom);
						contentDom.appendChild(footerDom);

					var dialogDom = cd();
					dialogDom.className = "modal-dialog";
					dialogDom.appendChild(contentDom);
				var modalDom = cd();
				modalDom.className = "modal";
				modalDom.setAttribute("latte-show", "show");
				modalDom.appendChild(dialogDom);
				//dom.classed("modal", 1);
				//dom.attr("latte-show", "show");
				//dom.appendChild(dialogDom);
			dom.appendChild(modalDom);
			//dom.style("height", "100%");
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				value.on("show", function(n, o) {
					n? getBackdrop().show(): getBackdrop().hide();
				});
				value.set("close", function() {
					value.set("show", false);
				});
				//console.log(value, dom);
				value.show = function() {
					value.set("show", true);
				};
				Controller.createChild(dom, value);
			};
			change(data.get(modal));
			controller.bind("data", modal, change);
		}
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/popover.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//提示框
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var popover = dom.attr("latte-strap-popover");

		if(popover) {
				var child = dom.children[0];
					var arrowDom = cd();
					arrowDom.className = "arrow";
					var titleDom = cd("h3");
					titleDom.className = "popover-title";
					titleDom.setAttribute("latte-html", "{{title}}");
					titleDom.setAttribute("latte-class", "{!title?block:none!}");
					var contentDom = cd();
					contentDom.setAttribute("latte-html", "{{content}}");
					contentDom.className = "popover-content";

				var div = cd();
				div.setAttribute("latte-show", "show");
				div.setAttribute("latte-class", "{{local}} {{ease}}-transition");
				div.className = "popover ";
				div.appendChild(arrowDom);
				div.appendChild(titleDom);
				div.appendChild(contentDom);
				console.log(child.offsetLeft);
				
			dom.appendChild(div);
				
			var changeLocal = function(value) {
				switch(value) {
					case "top":
						div.style["top"] = child.offsetTop - div.offsetHeight - 11 +"px";
						div.style["left"] = child.offsetLeft - div.offsetWidth / 2 + child.offsetWidth/2+"px";
					break;
					case "left":
						console.log(child.offsetTop, child.offsetHeight, div.offsetHeight);
						div.style["top"] = child.offsetTop + child.offsetHeight / 2 - div.offsetHeight / 2+ "px";
						console.log(div.offsetWidth, div.clientWidth, div.offsetHeight);
						div.style["left"] = child.offsetLeft - div.offsetWidth - 11 + "px";
					break;
					case "right":
						console.log(child.offsetTop, child.offsetHeight, div.offsetHeight);
						div.style["top"] = child.offsetTop + child.offsetHeight / 2 - div.offsetHeight / 2+ "px";
						div.style["left"] = child.offsetLeft + child.offsetWidth + "px";
					break;
					case "bottom":
						div.style["top"] = child.offsetTop  + child.offsetHeight +"px" ;
						div.style["left"] = child.offsetLeft - div.offsetWidth / 2 + child.offsetWidth/2+"px";
					break;
				}
			}
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				value.show = function() {
					value.set("show", true);
				}
				value.hide = function() {
					value.set("show", false);
				}
				value.change = function() {
					value.set("show", !value.get("show"));
				}
				value.set("local",  value.get("local") || "top");
				var ease = value.get("ease");
				if(ease == null) {
					value.set("ease", "fade");
				}
				
				Controller.createChild(dom , value);
				//最后添加才能让dom 显示后再计算长宽  不然display:none 返回的offsetWidth :0;
				value.on("show", function(now) {
					if(now) {
						changeLocal(value.get("local"));
					}
				});
				//changeLocal(value.get("local"));
			};
			change(data.get(popover));
			controller.bind("data", popover, change);
		}
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/progressbar.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function() {
	//进度条
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	var types = ["success"];
	this.before = function(data, dom, controller) {
		var progressbar = dom.attr("latte-strap-progressbar");
		if(progressbar) {
					var progressbarDom = cd();
					progressbarDom.className = "progress-bar "; 
					progressbarDom.setAttribute("latte-class", "progress-bar-{{type}}");
				var div = cd();
				div.className = "progress";
				div.appendChild(progressbarDom);
			 dom.appendChild(div);

			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				value.on("value", function(o) {
					if(o < 0) {
						return value.set("value", 0);
					}
					if(o > 100) {
						return value.set("value", 100);
					}
					progressbarDom.style["width"] =  o + "%";
				});
				value.on("type", function(type) {
					if(types.indexOf(type) == -1) {
						value.set("type", "success");
					}
				});
				value.set("value",value.get("value"));
				value.set("type",value.get("type"));
				Controller.createChild(dom, value);
			};
			change(data.get(progressbar));
			controller.bind("data", progressbar, change);
		}
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/radio.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
	//提示框
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var tooltip = dom.attr("latte-strap-tooltip");

		if(tooltip) {
				var child = dom.children[0];
					var arrowDom = cd();
					arrowDom.className = "tooltip-arrow";
					
					var innerDom = cd();
					innerDom.setAttribute("latte-html", "{{content}}");
					innerDom.className = "tooltip-inner";

				var div = cd();
				div.setAttribute("latte-show", "show");
				div.setAttribute("latte-class", "{{local}} {{ease}}-transition");
				div.className = "tooltip block";
				div.appendChild(arrowDom);
				div.appendChild(innerDom);
				
				
			dom.appendChild(div);
			var eases = ["scale", "fade"];
			var changeLocal = function(value) {
				switch(value) {
					case "top":
						div.style["top"] = child.offsetTop - div.offsetHeight - 11 +"px";
						div.style["left"] = child.offsetLeft - div.offsetWidth / 2 + child.offsetWidth/2+"px";
					break;
					case "left":
						console.log(child.offsetTop, child.offsetHeight, div.offsetHeight);
						div.style["top"] = child.offsetTop + child.offsetHeight / 2 - div.offsetHeight / 2+ "px";
						console.log(div.offsetWidth, div.clientWidth, div.offsetHeight);
						div.style["left"] = child.offsetLeft - div.offsetWidth - 11 + "px";
					break;
					case "right":
						console.log(child.offsetTop, child.offsetHeight, div.offsetHeight);
						div.style["top"] = child.offsetTop + child.offsetHeight / 2 - div.offsetHeight / 2+ "px";
						div.style["left"] = child.offsetLeft + child.offsetWidth + "px";
					break;
					case "bottom":
						div.style["top"] = child.offsetTop  + child.offsetHeight +"px" ;
						div.style["left"] = child.offsetLeft - div.offsetWidth / 2 + child.offsetWidth/2+"px";
					break;
				}
			}
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				value.show = function() {
					value.set("show", true);
				}
				value.hide = function() {
					value.set("show", false);
				}
				value.change = function() {
					value.set("show", !value.get("show"));
				}
				value.set("local",  value.get("local") || "top");
				var ease = value.get("ease");
				if(ease == null) {
					value.set("ease", "scale");
				}
				
				Controller.createChild(dom , value);
				//最后添加才能让dom 显示后再计算长宽  不然display:none 返回的offsetWidth :0;
				value.on("show", function(now) {
					if(now) {
						changeLocal(value.get("local"));
					}
				});
				//changeLocal(value.get("local"));
			};
			change(data.get(tooltip));
			controller.bind("data", tooltip, change);
		}
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/typeahead.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/value.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {



	/**
		<img latte-src="i"></img>
		一般绑定的是src
		单项

		音频有问题
	*/
	var LatteObject = require("../../m/data.js")
		, latte_lib = require("latte_lib");
	var Command = {};
	(function() {
		this.after = function(data, view, controller) {
			var stringContent = view.attr("latte-value");
			
			if(stringContent) {
				var change = function(value) {
					view.attr("value", value)
				};
				change(data.get(stringContent));
				controller.bind("data", stringContent, change);
			}

		};
	}).call(Command);
	
	module.exports = Command;
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });