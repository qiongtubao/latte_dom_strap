


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