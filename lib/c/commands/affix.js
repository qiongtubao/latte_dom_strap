(function() {
	//导航栏
	this.before = function(data, dom, controller) {
		var affix = dom.attr("latte-strap-affix");
		if(affix) {
			
			//controller.bind("data", affix+".select", doSelect);
		}
	}
}).call(module.exports);