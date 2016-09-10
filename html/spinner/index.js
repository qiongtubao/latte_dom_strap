var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	spinner  
		{
			size: String
			select:
		}
*/
  var data = latte_lib.object.create({
    spinner: {
    	text: "hello",
    	size: "x",
    	fixed: 1
	},
	show: function() {
		this.set("spinner.show", 1);
		setTimeout(function() {
			this.set("spinner.show", 0);
		}, 2000);
		
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);