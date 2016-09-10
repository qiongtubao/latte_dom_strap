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