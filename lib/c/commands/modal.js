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
				var className = dom.attr("latte-strap-modalClass") || "fade";

				modalDom.className = "modal "+className;
				modalDom.setAttribute("latte-show", "show");
				modalDom.setAttribute("latte-onlyClass", "in");
				//modalDom.setAttribute("latte-showFunc", "showFunc");
				//modalDom.setAttribute("latte-hideFunc", "hideFunc");
				//modalDom.setAttribute("latte-showClass", className);
				//modalDom.setAttribute("latte-hideClass", className);
				//modalDom.setAttribute("latte-showClass", className);
				//modalDom.setAttribute("latte-hideClass", className);
				//modalDom.setAttribute("latte-class", "{! show?in : !} ");
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
				value.set("show", false);
				value.on("show", function(n, o) {
					n? getBackdrop().show(): getBackdrop().hide();
				});

				value.set("close", function() {
					value.set("show", false);
				});
				
				value.set("showFunc", function() {
					var view = this;
					setTimeout(function() {
						view.classed("in", 1);
					},1);
					
				});
				value.set("hideFunc", function() {
					this.classed("in", 0);
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