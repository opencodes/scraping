
/*
 * GET home page.
 */
var search     = require('./search');

module.exports = function(app){
	app.get('/',search.render);
	app.post('/search',search.scrap);	
	app.post('/yelloapi',search.findbusiness,search.getbusinessdetails,search.scrap,search.renderresult);
};
