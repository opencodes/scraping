var fs     = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var jquery = fs.readFileSync("./public/javascripts/jquery.min.js").toString();
var yelloapi = require('../lib/yelloapi');
var helper = require('../lib/helper');

var listresult = {
	checkDelay : function(req,res,next)	{
		var urls = ['http://getbootstrap.com/','http://google.com/','http://facebook.com/','http://twitter.com/','http://linkedin.com/'];
		var k = 0;
		var x = urls.length -1;
			for (var i = x; i >= 0; i--) {
				if(k >= x){
				  	console.log('Loop Complete '+k); 
				}else{
					request(urls[k], function(error, response, body) {	
					  
					  if (!error && response.statusCode == 200) {
					  	  
					  	  var $ = cheerio.load(body);

						  console.log($("h1").length);	
						  console.log(urls[k]);

						  if(k == x){
						  	next();
						  }
						  k++;
		 				  			  			
					  }
	 				  					  
					});
				}
			};
			
		
	},
	checkScrap : function(req,res,next){
		if (!error && response.statusCode == 200) {
				  var $ = cheerio.load(body);
				  var links = [];
				  $("meta").each(function() {
				  	if($(this).attr('name') && $(this).attr('name')!=='undefined'){
				  		var meta = {name : $(this).attr('name'),content : $(this).attr('content')};		    
				    	links.push(meta);		
				  	}				    	    
				  });
				  var copyright = {name : 'copyright',content :$(':contains("�")').last().text().replace(/\s{2,}/g, ' ') };			  
				  links.push(copyright);
				  result[k].meta = links;
		}
	}
}
module.exports = listresult;