var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	popover  
		{
			title: String  可空
			content: String
			local: String  [top, left, right, bottom]

		}
*/
  var data = latte_lib.object.create({
    progressbar: {
    	value: 10,
    	type: "info"
	},
	click: function() {
		
		this.set("progressbar.value",this.get("progressbar.value")+10 )
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);