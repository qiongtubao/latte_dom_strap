var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
/**
	轮播插件
	carousel
		{
			interval: Number  5000
      slide: String [prev, next] 方向
      list: Array {
        
      }
		}
*/
  var data = latte_lib.object.create({
    carousel: {
    	interval: 5000,
      slide: "prev",
    	list: [{
    		image: "https://placehold.it/1200x500?text=one",
    		text: "标签 1",
    		click: function() {
          console.log("click 1")
    		}
    	},{
        image: "https://placehold.it/1200x500?text=two",
        text: "标签 2",
        click: function() {
          console.log("click 2")
        }
      },{
        image: "https://placehold.it/1200x500?text=three",
        text: "标签 3",
        click: function() {
          console.log("click 3")
        }
      }]
    	
	}
  });
  var box = latte_dom.define("demo", data);
  console.log(data);