
/*
 * GET home page.
 */
var nodeio = require('node.io');

exports.index = function(req, res){
	nodeio.scrape(function() {
	    this.getHtml('http://www.bevinco.com', function(err, $) {
	        var stories = [];
	        $('a.title').each(function(title) {
	            stories.push(title.text);
	        });
	        console.log(stories);
	    });
	});
	res.render('index', { title: 'Express',data : stories });
};