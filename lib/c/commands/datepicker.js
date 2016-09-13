(function() {
	//日历  年月日
	var cd = function(name) {
		return document.createElement(name || "div");
	}
	this.before = function(data, dom, controller) {
		var datepicker = dom.attr("latte-strap-datepicker");
		if(datepicker) {

						var inputDom = cd("input");
						inputDom.className = "form-control datepicker-input with-reset-button";
						inputDom.setAttribute("type", "text");
						inputDom.setAttribute("latte-duplex", "timeValue");
						inputDom.setAttribute("latte-click", "showDatePicker");


							var spanDom = cd("span");
							spanDom.innerHTML = "x"; 
						var closeDom = cd("button");
						closeDom.setAttribute("type", "button");
						closeDom.className = "close";
						closeDom.setAttribute("latte-show", "closeShow");
						closeDom.appendChild(spanDom);

									
										var dateCtrlLeftDom = cd("span");
										dateCtrlLeftDom.className = "datepicker-preBtn glyphicon glyphicon-chevron-left";
										dateCtrlLeftDom.setAttribute("aria-hidden", "true");
										dateCtrlLeftDom.setAttribute("latte-click", "dateCtrlLeft");
										var dateCtrlRightDom = cd("span");
										dateCtrlRightDom.className = "datepicker-nextBtn glyphicon glyphicon-chevron-right";
										dateCtrlRightDom.setAttribute("aria-hidden", "true");
										dateCtrlRightDom.setAttribute("latte-click", "dateCtrlRight");
										var dateCtrlContentDom = cd("p");
										dateCtrlContentDom.setAttribute("latte-html", "{{monthName}} {{dateShowYear}}");
										dateCtrlContentDom.setAttribute("latte-click", "dateCtrlClick");
									var dateCtrlDom = cd();
									dateCtrlDom.className = "datepicker-ctrl";
									dateCtrlDom.appendChild(dateCtrlLeftDom);
									dateCtrlDom.appendChild(dateCtrlRightDom);
									dateCtrlDom.appendChild(dateCtrlContentDom);

										var dateWeekDomListOne = cd("span");
										dateWeekDomListOne.setAttribute("latte-html", "{{day}}");

									var dateWeekDom = cd();
									dateWeekDom.className = "datepicker-weekRange";
									dateWeekDom.setAttribute("latte-list", "days");
									dateWeekDom.appendChild(dateWeekDomListOne);

										var dateOneDom = cd("span");
										dateOneDom.setAttribute("latte-html", "{{date}}");
										dateOneDom.setAttribute("latte-class", "{!gray?datepicker-item-gray: !}  {!active? datepicker-dateRange-item-active: !}")
										dateOneDom.setAttribute("latte-click", "click");
									var dateRangeDom = cd();
									dateRangeDom.className = "datepicker-dateRange";	
									dateRangeDom.setAttribute("latte-list", "dates");
									dateRangeDom.appendChild(dateOneDom);




								var dateBodyDom = cd();
								dateBodyDom.className = "datepicker-body";
								dateBodyDom.appendChild(dateCtrlDom);
								dateBodyDom.appendChild(dateWeekDom);
								dateBodyDom.appendChild(dateRangeDom);



							var dateInnnerDom = cd();
							dateInnnerDom.className = "datepicker-inner";
							dateInnnerDom.appendChild(dateBodyDom);
						var dateDom = cd();
						dateDom.className = "datepicker-popup";
						dateDom.setAttribute("latte-show", "dateShow");
						dateDom.appendChild(dateInnnerDom);

										var monthCtrlLeftDom = cd("span");
										monthCtrlLeftDom.className = "datepicker-preBtn glyphicon glyphicon-chevron-left";
										monthCtrlLeftDom.setAttribute("aria-hidden", "true");
										monthCtrlLeftDom.setAttribute("latte-click", "monthCtrlLeft");
										var monthCtrlRightDom = cd("span");
										monthCtrlRightDom.className = "datepicker-nextBtn glyphicon glyphicon-chevron-right";
										monthCtrlRightDom.setAttribute("aria-hidden", "true");
										monthCtrlRightDom.setAttribute("latte-click", "monthCtrlRight");
										var monthCtrlContentDom = cd("p");
										monthCtrlContentDom.setAttribute("latte-html", "{{monthShowYear}}");
										monthCtrlContentDom.setAttribute("latte-click", "monthCtrlClick");
									var monthCtrlDom = cd();
									monthCtrlDom.className = "datepicker-ctrl";
									monthCtrlDom.appendChild(monthCtrlLeftDom);
									monthCtrlDom.appendChild(monthCtrlRightDom);
									monthCtrlDom.appendChild(monthCtrlContentDom);

										var monthOneDom = cd("span");
										monthOneDom.setAttribute("latte-class", "{!active?datepicker-dateRange-item-active: !}");
										monthOneDom.setAttribute("latte-html", "{{month}}");
										monthOneDom.setAttribute("latte-click", "click");
									var monthRangeDom = cd();
									monthRangeDom.className = "datepicker-monthRange";
									monthRangeDom.setAttribute("latte-list", "months");
									monthRangeDom.appendChild(monthOneDom);

								var monthBodyDom = cd();
								monthBodyDom.className = "datepicker-body";
								monthBodyDom.appendChild(monthCtrlDom);
								monthBodyDom.appendChild(monthRangeDom);

							var monthInnerDom = cd();
							monthInnerDom.className = "datepicker-inner";
						var monthDom = cd();
						monthDom.className = "datepicker-popup";
						monthDom.setAttribute("latte-show", "monthShow");
						monthDom.appendChild(monthInnerDom);
						monthDom.appendChild(monthBodyDom);

										var decadeCtrlLeftDom = cd("span");
										decadeCtrlLeftDom.className = "datepicker-preBtn glyphicon glyphicon-chevron-left";
										decadeCtrlLeftDom.setAttribute("aria-hidden", "true");
										decadeCtrlLeftDom.setAttribute("latte-click", "decadeCtrlLeft");
										var decadeCtrlRightDom = cd("span");
										decadeCtrlRightDom.className = "datepicker-nextBtn glyphicon glyphicon-chevron-right";
										decadeCtrlRightDom.setAttribute("aria-hidden", "true");
										decadeCtrlRightDom.setAttribute("latte-click", "decadeCtrlRight");
										var decadeCtrlContent = cd("p");
										decadeCtrlContent.setAttribute("latte-html", "{{decadeShowStartYear}}-{{decadeShowEndYear}}");
										decadeCtrlContent.setAttribute("latte-click", "dateCtrlContent");
									var decadeCtrlDom = cd();
									decadeCtrlDom.className = "datepicker-ctrl";
									decadeCtrlDom.appendChild(decadeCtrlLeftDom);
									decadeCtrlDom.appendChild(decadeCtrlRightDom);
									decadeCtrlDom.appendChild(decadeCtrlContent);

										var decadeOneDom = cd("span");
										decadeOneDom.setAttribute("latte-class", "{!active?datepicker-dateRange-item-active: !}");
										decadeOneDom.setAttribute("latte-html", "{{year}}");
										decadeOneDom.setAttribute("latte-click", "click");
										
									var decadeRangeDom = cd();
									decadeRangeDom.className = "datepicker-monthRange decadeRange";
									decadeRangeDom.setAttribute("latte-list", "years");
									decadeRangeDom.appendChild(decadeOneDom);


								var decadeBodyDom = cd();
								decadeBodyDom.className = "datepicker-body";
								decadeBodyDom.appendChild(decadeCtrlDom);
								decadeBodyDom.appendChild(decadeRangeDom);

							var decadeInnerDom = cd();
							decadeInnerDom.className = "datepicker-inner";
						var decadeDom = cd();
						decadeDom.className = "datepicker-popup";
						decadeDom.setAttribute("latte-show", "decadeShow");
						decadeDom.appendChild(decadeInnerDom);
						decadeDom.appendChild(decadeBodyDom);



					var div = cd();
					div.className = "datepicker";
					div.appendChild(inputDom);
					div.appendChild(closeDom);
					div.appendChild(dateDom);
					div.appendChild(monthDom);
					div.appendChild(decadeDom);
				dom.appendChild(div);
			
			var change = function(value, old) {
				var Controller = require("../controller.js");
				if(old) {
					Controller.removeChild(dom, old);
					
				}
				//dom.html("");
				//dom.appendChild(copy);
				value.set("showDatePicker", function() {
					var show = value.get("dateShow"); 

					if(show) {
						value.set("dateShow", false);
					}else{

						value.showMonthModel(t.getFullYear(),t.getMonth());
						value.set('dateShow', true);
					}
					//value.set("dateShow", true);
				});
				var t = new Date(value.get("time"));
				value.on("timeValue", function(time, old) {
					
					t = new Date(time);
					
					value.set("year", t.getFullYear());				
				});	
				var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(function(i) {
					return {
						day: i
					};
				});
				value.set("days", days);
				var allMonths = ["January", "February", "March", "April", "May", 
				"June", "July", "August", "September", "October", "November", "December"];
				var months = allMonths.map(function(i, index) {
					return {
						month: i.substring(0,3),
						click: function() {
							value.showDateModel(value.get("monthShowYear"), index);
							value.set("dateShow", true);
							value.set("monthShow", false);		
						}
					}
				});
				value.set("months", months);
				
				value.on("month", function(month) {
					t.setMonth(month);
					
					//value._set('timeValue', latte_lib.format.dateFormat(format, t));
					value.set("date", t.getDate());
				});

				value.showDateModel = function(year, month) {
					
					//value.set("showYear", year);
					var o = new Date(year, month, 1);
					value.set("dateShowYear", o.getFullYear());
					value.set("dateShowMonth", o.getMonth());
					value.set("monthName", allMonths[o.getMonth()]);
					o.setDate(0);
					//value.dateShowYear = year;
					//value.dateShowMonth = month;
					var date;
					if(t.getFullYear() == year && t.getMonth() == month) {
						date = t.getDate();
					}
					var dates = [];
					
					//console.log(o.getDay());
					while(o.getDay() != 6) {
						dates.unshift({
							date: o.getDate(),
							gray:1
						});
						o.setDate(o.getDate() -1);
					}

					o.setMonth(o.getMonth() + 2);
					o.setDate(0);
					var len = o.getDate();
					//console.log(o.getMonth(), o.getDate());
					var activeData ;
					for(var i = 1; i <= len; i++) {
						(function(i) {
							var d = latte_lib.object.create({
								date: i,
								click: function() {
									t.setFullYear(year);
									t.setMonth(month);
									t.setDate(i);
									value.set('timeValue', latte_lib.format.dateFormat(format, t));
									d.set("active", 1);
									if(activeData) {
										activeData.set("active", 0);
									}
									activeData = d;
									value.set("dateShow", false);
								}
							});
							if(date && i == date) {
								d.set("active",  1);
								activeData = d;
							}
							dates.push(d);
						})(i);
						
					};
					//console.log(o.getDay());
					o.setDate(o.getDate() + 1);
					while(o.getDay() != 0) {
						dates.push({
							date: o.getDate(),
							gray: 1
						});
						o.setDate(o.getDate() + 1);
					}
					value.set("dates", dates);
				}
				value.on("date", function(date) {
					t.setDate(date);
					
					value._set('timeValue', latte_lib.format.dateFormat(format, t));
				});
				value.set("dateCtrlRight", function() {
					value.showDateModel(value.get("dateShowYear"), value.get("dateShowMonth") + 1);
				});
				value.set("dateCtrlLeft", function() {
					value.showDateModel(value.get("dateShowYear"), value.get("dateShowMonth") - 1);
				});
				value.set("dateCtrlClick", function() {
					value.showMonthModel(value.get("dateShowYear"));
					value.set("dateShow", false);
					value.set("monthShow", true);
				});
				value.showMonthModel = function(year) {
					value.set("monthShowYear", year);
					if(year == t.getFullYear()) {
						value.get("months").get(t.getMonth()).set("active", true);
					}else{
						value.get("months").get(t.getMonth()).set("active", false);
					}
				}
				value.set("monthCtrlLeft", function() {
					value.showMonthModel(value.get("monthShowYear") - 1);
				});
				value.set("monthCtrlRight", function() {
					value.showMonthModel(value.get("monthShowYear") + 1);
				});
				value.set("monthCtrlClick", function() {
					var year = value.get("monthShowYear");
					value.showDecadeModel(year - year % 10);
					value.set("monthShow", false);
					value.set("decadeShow", true);
				});
				value.showDecadeModel = function(year) {
					t.setFullYear(year);
					//value._set('timeValue', latte_lib.format.dateFormat(format, t));
					var years = [];
					

					var startYear = year, endYear = startYear + 10;
					for(var i = startYear - 1; i <= endYear ;i++) {
						(function(i) {
							var y = {
								year: i,
								click: function() {
									value.set("decadeShow", false);
									value.showMonthModel(i);
									value.set("monthShow", true);
								}
							};
							if(i == t.getFullYear()) {
								y.active = 1;
							}
							years.push(y);
						})(i);
						
					};
					value.set("years", years);
					value.set("decadeShowStartYear", startYear);
					value.set("decadeShowEndYear", endYear);	
				};
				value.set("decadeCtrlLeft", function() {
					value.showDecadeModel(value.get("decadeShowStartYear" - 10));
				});
				value.set("decadeCtrlRight", function() {
					value.showDecadeModel(value.get("decadeShowStartYear" + 10));
				});
				value.showDecadeModel(t.getFullYear() - t.getFullYear() % 10);
				var format = value.get("format") || "yyyy-MM-dd";
				value.set('timeValue', latte_lib.format.dateFormat(format, t));
				value.time = t;
				value.showDateModel(t.getFullYear(), t.getMonth());
				Controller.createChild(dom, value);
			};
			change(data.get(datepicker));
			controller.bind("data", datepicker, change);
		}
	}
	var Time = function(time) {
		this.data = new Date(time);
	};
	(function() {
		this.setMonth = function() {

		}
	}).call(Time.prototype);
}).call(module.exports);