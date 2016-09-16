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