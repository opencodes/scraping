
/*
 * GET home page.
 */
var nodeio = require('node.io');

exports.index = function(req, res){
	nodeio.scrape(function() {
	    this.getHtml('http://www.bevinco.com', function(err, $) {
	        var stories = [];
	        $('a').each(function(title) {
	            stories.push($(this).attr('href'));
	        });
	        console.log(stories);
	        res.render('index', { title: 'Express',data : stories });
	    });
	});
	
};