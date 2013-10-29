
/*
 * GET home page.
 */
var request = require('request'),
	jsdom = require('jsdom');

exports.index = function(req, res){
		
		var url = 'http://police.uk/data';
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
		    $('#downloads .months table tr td:nth-child(2) a').each(function(idx, elem) {
		      // push the url (href attribute) onto the list
		      out['streets'].push( $(elem).attr('href') );
		    });
		  }
		});

		res.render('index', { title: 'Express'});
	
};