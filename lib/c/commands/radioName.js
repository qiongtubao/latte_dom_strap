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