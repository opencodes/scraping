var fs     = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var jquery = fs.readFileSync("./public/javascripts/jquery.min.js").toString();
var yelloapi = require('../lib/yelloapi');
var helper = require('../lib/helper');

var search = {
	/**
	 * Find Business
	 * @param req
	 * @param res
	 * @param next
	 */
	findbusiness : function(req,res,next){
		var url = yelloapi.FindBusiness(req.body.what,req.body.where);
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
			  var resultset = JSON.parse(body);
			  //If listing 
			  if(resultset.listings){	
				  if(resultset.listings.length == 0){ req.apilog = {status:'danger',msg:'No result found'}; next();}
				  req.apisummary = resultset.summary;
				  req.listings   = helper.getKeysArray(resultset.listings,'id');
				  req.apiresult  = helper.arr_to_obj(resultset.listings,'id');
				  req.apilog     = {status:'success',msg:resultset.listings.length +' result found for '+req.apisummary.what +' in '+req.apisummary.where};
				  console.log('findbusiness : complete moving next task'); 
				  next();				
			  }else{								
				  req.apiresult = null;
				  req.apilog = {status:'danger',msg:'Error :' + err };
				  console.log('findbusiness : complete moving next task'); 
				  next();			
			  }
			}
				  
		});
	},
	getbusinessdetails : function(req,res,next){
		var list = req.listings;
		var results  = req.apiresult;
		var k = 0;
		var x = setInterval(function() { 			
			if(k >= list.length){
			  	console.log('getbusinessdetails : Loop Complete '+k); 
			    clearInterval(x);
			    next();			    
			}else{
				var key = list[k];
				if(key !='undefined'){
					var listings = results[key];
					var url = yelloapi.GetBusinessDetails(listings.address.prov,listings.address.city,listings.name,key);
					request(url, function(error, response, body) {	
					  if (!error && response.statusCode == 200) {
					  	  	var details = JSON.parse(body);
					  	  	var id = details.id; 
					  	  	var url = (details && details.products && details.products.webUrl.length >= 1) ? details.products.webUrl[0] : '';
					  	  	console.log('getbusinessdetails : id'+id); 
					  	  	results[id].url = url; 
						  	results[id].details = details;
						  if(k == list.length -1 ){
						  	console.log('getbusinessdetails : complete moving next task'); 
						  	req.apiresult = results;						  	
						  }
						  k++;	 				  			  			
					  }
	 				  					  
					});
				}
			}
		}, 1000);      
	},	
	/**
	 * Scrapping 
	 * @param req
	 * @param res
	 * @param next
	 */
	scrap : function(req,res,next){
		var list = req.listings;
		var results  = req.apiresult;
		var k = 0;
		var x = list.length-1;
		console.log(list);
		function callrequest(k) {
					var key = list[k];
					console.log(key);
					if( results[key].url && results[key].url.length > 0){

						request(results[key].url, function(error, response, body) {

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
							  	results[key].meta = links;
								  if(k == 0){
								  	req.apiresult = results;
								  	next();
								  }else{
						  			k --;
				 				    callrequest(k);	
								  }							  		  			
						  }		 				  					  
						});
					}else{
						console.log('Invalid URL');
						if(k==0){
							req.apiresult = results;
							next();
						}else{
							k--;
							callrequest(k);	
						}						
					}

			}
			callrequest(x);

	},
	/**
	 * Render
	 * @param req
	 * @param res
	 */
	render : function(req,res){
		res.render('index',{ title: 'Yellow Page API'});
	},
	/**
	 * Render
	 * @param req
	 * @param res
	 */
	renderresult : function(req,res){		
		apiresult = (req.apiresult)?req.apiresult:{};
		//console.log('======================================= API RESULT =====================');
		//console.log(apiresult);
		//console.log('======================================= API LOG ========================');
		//console.log(req.apilog);
		res.render('result',{
			title:"Yellow Page API",
			summary : req.apisummary,
			data:apiresult,
			apilog:req.apilog
		});
	}
};
module.exports = search;