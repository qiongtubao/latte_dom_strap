var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	accordion  
		{
			list: Array
			active:
		}
*/
  var data = latte_lib.object.create({
    alert: {
    	type: "error",
    	title: "Well Done!",
    	body: "You successfully read this important alert message."
	},
	showAlert: function() {
		this.get("alert").show();
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);