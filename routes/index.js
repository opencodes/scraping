
/*
 * GET home page.
 */
var nodeio = require('node.io');

exports.index = function(req, res){
	nodeio.scrape(function() {
	    this.getHtml('http://www.rkjha.com', function(err, $) {
	        var stories = [];
	        $('a').each(function(title) {
	            stories.push($(this).attr('href'));
	        });
	        console.log(err);console.log($);
	        res.render('index', { title: 'Express',data : stories });
	    });
	});
	
};