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
			  var resultset = JSON.parse(body);
			  //If listing 
			  if(resultset.listings){	
				  if(resultset.listings.length == 0){ req.apilog = {status:'danger',msg:'No result found'}; next();}
				  req.apisummary = resultset.summary;
				  req.apiresult = helper.arr_to_obj(resultset.listings,'id');
				  req.apilog = {status:'success',msg:resultset.listings.length +' result found for '+req.apisummary.what +' in '+req.apisummary.where};
				  next();				
			  }else{								
				  req.apiresult = null;
				  req.apilog = {status:'danger',msg:'Error :' + err };
				  next();			
			  }
				  
		});
	},
	/**
	 * Get Business Details
	 * @param req
	 * @param res
	 * @param next
	 */
	getbusinessdetails : function(req,res,next){
		//If result
		var result = req.apiresult;
		if(!result || helper.obj_length(result) < 1){next();}
		// iterate for each result
		var counter = helper.obj_length(result);
		console.log('getbusinessdetails : length = '+ counter);
		for(var k in result){
			var listings = result[k];
			var url = yelloapi.GetBusinessDetails(listings.address.prov,listings.address.city,listings.name,k);			
			request(url, function(error, response, body) {	
				  var details = JSON.parse(body);	
				  if(!error && body){
				  	  if (!details.error) {	
					  	result[k].details = JSON.parse(body);
					  }					  			
				  }else{								
					   //console.log(err);
					   result[k].details = null;
 				  } 				  
 				  console.log('getbusinessdetails : counter = '+counter);

 				  if (counter==0) { 				  	
 				  	console.log('getbusinessdetails : Details : Loop Complete'); 
 				  	req.apiresult = result;
 				  	next();
 				  };
 				  counter--;					  
			});
		}	
	},
	/**
	 * Scrapping 
	 * @param req
	 * @param res
	 * @param next
	 */
	scrap : function(req,res,next){
		if(!req.apiresult){next();}
		var result = req.apiresult;
		var counter = helper.obj_length(result);

		console.log('Scrap result length :'+counter);

		for(var k in result){
			var url = (result[k].details)?result[k].details.products.webUrl[0]:'';
			console.log('Scrap URL: '+ url);
			//If URL
			if (url && url!='') {
				request({ uri: url}, function(error, response, body) {
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
				  if (counter==0) { 
						req.apiresult = result; 
						console.log('Scrap : Loop Complete'); 
						next();
				  };
				  counter --;					  
				});
			}else{
				if (counter==0) { 
						req.apiresult = result; 
						console.log('Scrap : Loop Complete'); 
						next();
				}
				counter --;
			}
				
		}	
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
		/*console.log('======================================= API RESULT =====================');
		console.log(apiresult);
		console.log('======================================= API LOG ========================');
		console.log(req.apilog);*/
		res.render('result',{
			title:"Yellow Page API",
			summary : req.apisummary,
			data:apiresult,
			apilog:req.apilog
		});
	}
};
module.exports = search;