var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	tabs  
		{
			list: Array
			select:
		}
*/
  var data = latte_lib.object.create({
    tabs: {
    	select: 0,
    	list: [{
    		title: "a",

    		data: {

    		}
    	}, {
    		title: "b",
    		data: {
    			
    		}
    	}]
	},
	show: function() {
		this.get("aside").show();
		/**
		setTimeout(function() {
			data.set("alert.show", 0)
;		}, 2000);
		*/
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);