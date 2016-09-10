var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	轮播插件
	carousel
		{
			interval: Number  5000
			pause  : String,
			wrap: Boolean  true 
		}
*/
  var data = latte_lib.object.create({
    carousel: {
    	interval: 5000,
    	list: [{
    		image: "",
    		text: "",
    		click: function() {

    		}
    	}],
    	
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);