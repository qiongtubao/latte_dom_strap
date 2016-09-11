#accordion
	dom
		@param latte-strap-accordion-only Boolean
		@param latte-strap-accordion-select String ["panel-primary"]  
		@param latte-strap-accordion-child String ["panel-primarys"]
		@param  latte-strap-accordion  String

	data 
		@param list  Array
		@param active  Int


#affix
	dom 
		@param latte-strap-affix String
	data 
		@param list Array
			{
				href: String
				text: String
			}
		@param active Int
	