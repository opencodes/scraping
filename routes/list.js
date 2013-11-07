var fs     = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var jquery = fs.readFileSync("./public/javascripts/jquery.min.js").toString();
var yelloapi = require('../lib/yelloapi');
var helper = require('../lib/helper');

var listresult = {
	checkDelay : function(req,res,next)	{
		var urls = [ {id:'1',url:''},{id:'2',url:'http://www.spider-barberchairs.com'},{id:'3',url:''},{id:'4',url:'http://www.9058445113.yp.ca'},{id:'5',url:'http://www.blackandwhitebarbers.com'} ];
		var x = urls.length -1;console.log(urls);
		function callrequest(k,urls) {
					console.log(k);
					if( urls[k].url.length > 0){

						request(urls[k].url, function(error, response, body) {
							console.log(error);
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
								  console.log(urls[k].url);
								  if(k == 0){
								  	next();
								  }else{
						  			k --;
				 				    callrequest(k,urls);	
								  }							  		  			
						  }else{
							  if(k == 0){
							  	next();
							  }else{
					  			k --;
			 				    callrequest(k,urls);	
							  }
						  }		 				  					  
						});
					}else{
						console.log('Invalid URL');
						if(k==0){
							next();
						}else{
							k--;
							callrequest(k,urls);	
						}						
					}

			}
			callrequest(x,urls);
			
			
		
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