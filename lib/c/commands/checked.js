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
	
