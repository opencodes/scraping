
/*
 * GET home page.
 */
var search     = require('./search');

module.exports = function(app){
	app.get('/',search.render);
	app.post('/search',search.scrap);	
};
