(function() {
	var backdrop;
	var getBackdrop = function() {
		if(backdrop) {
			return backdrop;
		}
		var backdropDom = document.createElement("div");
		var View = require("../../v/view.js");
		backdrop = View.create(backdropDom);
		backdrop.classed({
			"latte-backdrop": 1,
			"ease-fade": 1
		});
		document.body.appendChild(backdropDom);
		backdrop.show = function() {
			if(!backdrop) {
				createBackDrop();
			}
			backdrop.style("display", "block");
			//这里需要让它之行css3的动画
			backdrop.classed("in", 1);
			return ++self.zIndex;
		}
		backdrop.hide = function() {
			backdrop.style("display", "none");
			backdrop.classed("in", 0);
		}
		backdrop.zIndex = 1040;
		return backdrop;
	}
	require("latte_dom/utils/css.js").importCssString(require("./backdrop.css"), "latte_trap_backdrop_css");

	this.get = getBackdrop;
}).call(module.exports);