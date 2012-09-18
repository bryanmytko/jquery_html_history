/*****************************************
jQuery plugin: htmlHistory
Simple plugin to load content via Ajax and alter the URL address bar
Author: bryanmytko | bryanmytko@gmail.com
Version 0.1 | September 2012
@options['getParam']: ajax request string
@options['content']: content container ID
*****************************************/
(function($){
	
	$.fn.htmlHistory = function(a){
		
		var href,
		options = ({
			content : 'content',
			getParam : 'ajax_req'
		}),o = $.extend({},options,a);
	
		this.click(function(e){			
		  href = $(this).attr('href')			
			$.ajax({
				url: href + '?' + o['getParam'] + '=true',
				success: function(data){
					$('#' + o['content']).html(data)
				}
			});			
			if(href != window.location){
				window.history.pushState({path: href},'',href)
			}			
			e.preventDefault()	
		});
	
	}
	
})(jQuery);