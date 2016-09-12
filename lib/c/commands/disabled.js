
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
	
