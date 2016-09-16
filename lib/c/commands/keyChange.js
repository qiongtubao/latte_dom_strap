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