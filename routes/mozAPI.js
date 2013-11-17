var request = require('request');
var mozapi = require('../lib/mozapi');

var mozAPI = {
	urlMatrics : function(req,res,next){
		var requrl = req.params.url;
		console.log(requrl);
		var url = mozapi.urlMatrics(requrl);
		console.log(url);
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body);
			}else{
				res.send(error);
			}
		});
	}
};
module.exports = mozAPI;