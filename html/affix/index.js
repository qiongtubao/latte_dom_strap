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
    affix: {
    	list:[{
    		href: "a"
    	},{
    		href: "b"
    	}]
    	
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);