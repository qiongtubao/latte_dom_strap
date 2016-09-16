require("latte_dom/utils/css.js").importCssString(require("./index.css"), "latte_trap_css");


document.once = function(type, func, option) {
	var onceFunc = function() {
		func();
		document.removeEventListener(type, onceFunc, option);
	}
	document.addEventListener(type, onceFunc, option);
}