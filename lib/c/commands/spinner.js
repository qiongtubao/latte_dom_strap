(function() {
	/**
		遮挡loading
			@param fixed Boolean [0, 1]
			@param size  String [s, m, l ,xl]
	*/
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	var getBackdrop = require("./backdrop").get;

	this.before = function(data, dom, controller) {
		var spinnerName = dom.attr("latte-strap-spinner");
		if(spinnerName) {
						var circle = cd();
						circle.className = "spinner-circle";

						var text = cd();
						text.className = "spinner-text";
						text.setAttribute("latte-html", "{{text}}");
					var spinner = cd();
					spinner.className = "spinner-wrapper";
					spinner.appendChild(circle)
					spinner.appendChild(text);
				var div = cd();
				div.className = "spinner spinner-gritcode";
				div.setAttribute("latte-show", "show");
				div.setAttribute("latte-class", "{{size}}");
				div.appendChild(spinner);
			dom.appendChild(div);
				var change = function(value, old) {
					var Controller = require("../controller.js");
					if(old) {
						Controller.removeChild(dom, old);
					}
					value.on("show", function(value, old) {
						if(value == old) { return; }
						value ? getBackdrop().show(): getBackdrop().hide();
					});
					value.show = function() {
						value.set("show", true);
					}
					value.hide = function() {
						value.set("show", false);
						
					}	
					Controller.createChild(dom, value);
				}
			change(data.get(spinnerName));
			controller.bind("data", spinnerName, change);
		}
	}
	require("latte_dom/utils/css.js").importCssString(require("./spinner.css"), "latte_trap_spinner_css");

}).call(module.exports);