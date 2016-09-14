var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	重要的一点是修改了 .modal {display:block;}
	modal
	footer: Array[Button],
	title: String,
	body: Object,
	暂时还没添加显示动画
	type: String [ease, ....]
*/
  var data = latte_lib.object.create({
     modal: {
     	footer: [{
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
     		text: "Separated link"
     	}],
     	body: {
     		p:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
     	},
     	title: "hello",
     	type: "",
     },
     showModal: function() {
     	this.get("modal").show();
     }
  });
  var box = latte_dom.define("demo", data);
 