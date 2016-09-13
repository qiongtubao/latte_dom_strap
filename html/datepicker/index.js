var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	轮播插件
	
*/
  var data = latte_lib.object.create({
    datepicker: {
    	format: "yyyy-MM-dd",
    	time: "2015-06-10"	
	}
  });
  var box = latte_dom.define("demo", data);
 