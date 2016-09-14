var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	下拉
	
*/
  var data = latte_lib.object.create({
     dropdown: {
     	list: [{
     		text:"Action",
     		click: function() {
     			console.log("click Action");
     		}
     	},{
     		text: "Another action",
     		click: function() {
     			console.log("click Another actions");
     		}
     	},{
     		text: "Something else here"
     	},{
     		separator: 1
     	},{
     		text: "Separated link"
     	}],
     	text: "Action",

     	disabled: 0
     }
  });
  var box = latte_dom.define("demo", data);
 