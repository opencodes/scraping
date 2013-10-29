
/*
 * GET home page.
 */
var request = require('request'),
	jsdom = require('jsdom');

exports.index = function(req, res){
		
		var url = 'http://rkjha.com';
		// holder for results
		var out = {
		  'streets': []
		};
		
		jsdom.env({
		  html: url,
		  scripts: [
		    'http://code.jquery.com/jquery.js'
		  ],
		  done: function(errors, window) {
		    var $ = window.$;
		    // find all the html links to the street zip files
		    $('a').each(function(idx, elem) {
		    	console.log($(this).attr('href'));
		      // push the url (href attribute) onto the list
		      out['streets'].push( $(this).attr('href') );
		    });
		    console.log(out);
			res.render('index', { title: 'Express',data:out['streets']});
		  }
		});
		
	
};