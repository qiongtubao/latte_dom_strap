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
    select: {
    	name: "select",
    	select: 0,
    	list: [{
    		name: "A",
    		value:"a"
    	},{
    		name: "B",
    		value: "b"
    	},{
    		name: "C",
    		value: "c"
    	}]
	},
	select2: {
		list:[{
    		name: "A",
    		value:"a"
    	},{
    		name: "B",
    		value: "b"
    	},{
    		name: "C",
    		value: "c"
    	}]
	},
	click: function() {
		console.log(this.get("select").value());
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);