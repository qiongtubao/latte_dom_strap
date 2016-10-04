(function() {
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
			asideDom.className = "aside";
			asideDom.setAttribute("latte-class", "slide{{placement}}-transition {{placement}}");
			//asideDom.setAttribute("latte-show", "show");
			asideDom.setAttribute("latte-showFunc", "showFunc");
			asideDom.setAttribute("latte-hideFunc", "hideFunc");
			asideDom.setAttribute("latte-animationEndEvent", "animationEndEvent$back");
			asideDom.appendChild(dialogDom);
			var change = function(value, old) {
				if(!value) {return;}
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
				}
				dom.html("");
				var View = require("latte_dom/v").create;
				var copyDom = asideDom.cloneNode(true);
				var copyView = View(copyDom);
				dom.appendChild(copyDom);
				value.set("show", false);
				copyView.style("display", "none");
				value.on("show", function(v, old) {
					if(v == old) { return; }
					v ? getBackdrop().show(): getBackdrop().hide();
					
					
					if(v) {
						//copyView.style("display", "");
						copyView.classed("slideleft-enter", 1);
						value.set("animationEndEvent$back", function() {
							copyView.classed("slideleft-enter", 0);
							value.set("animationEndEvent$back",null);
						});
						copyView.style("display", "");
					}else{
						value.set("animationEndEvent$back", function() {
							copyView.classed("slideleft-leave", 0);
							value.set("animationEndEvent$back",null);
							copyView.style("display", "none");
						});
						copyView.classed("slideleft-leave", 1);
					}
				});
				value.set("showFunc", function(callback) {
					var view = this;
					callback(function() {
						view.classed("slideleft-enter", 0);
					});
					view.classed("slideleft-enter", 1);
				});
				
				value.set("hideFunc", function(callback) {
					var view = this;
					callback( function() {
						view.classed("slideleft-leave", 0);
					});
					view.classed( "slideleft-leave",1);
				});
				value.set("close", function() {
					value.set("show", false);
				});
				value.show = function() {
					value.set("show", true);
				}
				value.hide = function() {
					value.set("show", false);
				}
				Controller.createChild(dom, value);
			}
			change(data.get(aside));
			controller.bind("data",  aside, change);
		}		
	}
}).call(module.exports);
/**
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
			asideDom.className = "aside "+"slide"+placement+"-transition "+placement ;
			//asideDom.setAttribute("latte-class", "{! show? slideleft-enter: slideleft-leave !}")
			asideDom.setAttribute("latte-showFunc", "showFunc");
			asideDom.setAttribute("latte-hideFunc", "hideFunc");
			//asideDom.setAttribute("latte-class", "{{transitionClass}}")
			//asideDom.setAttribute("latte-showClass", "slideleft-enter");
			//asideDom.setAttribute("latte-hideClass", "slideleft-leave");
			//asideDom.setAttribute("latte-show", "show");
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
				value.set("show", false);
				dom.style("display", "none");
				value.on("show", function(v, old) {
					if(v == old) { return; }
					v ? getBackdrop().show(): getBackdrop().hide();
					if(v) {
						dom.style("display", "");
						setTimeout(function() {
							dom.classed("slideleft-enter", 1);
						}, 1);
						
					}else{
						view.classed( "slideleft-leave",1)
					}

									

				});
				
				value.set("showFunc", function(callback) {
					
					//value.set("transitionClass", "slideleft-enter");
					var view = this;
					
					//view.style("width", view._offsetWidth + "px");
					
					
					
					view.classed("slideleft-enter", 1);
					callback(function() {
						view.classed("slideleft-enter", 0);
					});
					
				});
				
				value.set("hideFunc", function(callback) {
					var view = this;
					
					callback( function() {
						view.classed("slideleft-leave", 0);
					});
					view.classed( "slideleft-leave",1);
				});

				value.set("close", function() {
					value.set("show", false);

				});
				value.show = function() {
					value.set("show", true);
					//getBackdrop().show();
				};
				
				Controller.createChild(dom, value);


			}
			console.log(data, aside);
			change(data.get(aside));
			controller.bind("data",  aside, change);
		}
	}
}).call(module.exports);
*/