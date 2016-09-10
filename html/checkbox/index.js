var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	accordion  
		{
			list: Array
			select:
		}
*/
  var data = latte_lib.object.create({
    checkbox: {
    	type: "button",
    	data: {
    		"a":1,
    		"b":1,
    		"c":1
    	}
    }
  });
  var box = latte_dom.define("demo", data);
  console.log(data);