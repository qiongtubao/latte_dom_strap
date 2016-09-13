var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	accordion  
		{
			list: Array
			select:
		},
  
*/
  var data = latte_lib.object.create({
    checkbox: {
    	list: [{
    		text: "Left",
    		value: "left",
    		checked: 1,
        disabled:1
    	},{
    		text: "Middle",
    		value: "middle",
    		checked: 0
    	},{
    		text: "Right",
    		value: "right",
    		checked: 0
    	}]
	},
	checkClick: function() {
		var value = data.get("checkbox").value();
		console.log(value);
	},
  radio: {
    name: "radio",
    list: [{
      text: "Left",
      value: "left",
      disabled: 1
    },{
      text: "Middle",
      value: "middle",

    },{
      text: "Right",
      value: "right"
    }],
    radio: 1
  },
  radioClick: function() {
    var value = data.get("radio").value();
    console.log(value);
  }
  });
  var box = latte_dom.define("demo", data);
  console.log(data);