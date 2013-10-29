
/*
 * GET home page.
 */
var request = require('request'),
	jsdom = require('jsdom');

exports.index = function(req, res){
	nodeio.scrape(function() {
		

		request({ uri:'http://www.google.com' }, function (error, response, body) {
		  if (error && response.statusCode !== 200) {
		    console.log('Error when contacting google.com');
		  }
		  
		  jsdom.env({
		    html: body,
		    scripts: [
		      'http://code.jquery.com/jquery-1.5.min.js'
		    ]
		  }, function (err, window) {
		    var $ = window.jQuery;
		
		    // jQuery is now loaded on the jsdom window created from 'agent.body'
		    console.log($('body').html());
		  });
		});
		res.render('index', { title: 'Express',data : stories });
	});
	
};