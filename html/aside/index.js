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
    aside: {
    	placement: "left",
    	data: {
    		
    	}
	},
	show: function() {
		this.set("alert.show", 1);
		
		setTimeout(function() {
			data.set("alert.show", 0)
;		}, 2000);
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);