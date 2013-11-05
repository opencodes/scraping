
/*
 * GET home page.
 */
var search     = require('./search');
var listresult       = require('./list');

module.exports = function(app){
	app.get('/',listresult.checkDelay,search.render);
	app.post('/search',search.scrap);	
	app.post('/yelloapi',search.findbusiness,search.getbusinessdetails,search.scrap,search.renderresult);
};
