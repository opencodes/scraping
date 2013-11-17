
/*
 * GET home page.
 */
var search     = require('./search');
var mozAPI     = require('./mozAPI');
var listresult       = require('./list');
var google = require('google-tools');

module.exports = function(app){
	app.get('/',listresult.checkDelay,search.render);
	app.post('/search',search.scrap);	
	app.post('/yelloapi',search.findbusiness,search.getbusinessdetails,search.scrap,search.renderresult);
	app.get('/mozapi/urlmatrics/:url',mozAPI.urlMatrics);
	app.get('/google',function(req,res){
		
		res.render('google',{ title: 'Google Page Rank'});
	});
	app.post('/google/pagerank',function(req,res){
		google.pagerank({
			  url: 'http://'+req.body.urls
			}, function(err, r) {
			    console.log(err, r);
			    res.render('google',{ title: 'Google Page Rank',pagerank:r});
		});
		
	});
};
