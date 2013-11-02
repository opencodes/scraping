var fs     = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var jquery = fs.readFileSync("./public/javascripts/jquery.min.js").toString();
var yelloapi = require('../lib/yelloapi');

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
			  
			  if(!error && body){	
				  console.log(JSON.parse(body));
				  req.businesslist = JSON.parse(body);
				  next();				
			  }else{								
				  //console.log(err);
				  req.businesslist = null;
				  next();			
			  }
				  
		});
	},
	getbusinessdetails : function(req,res,next){
		var data = req.businesslist.listings[1];
		var url = yelloapi.GetBusinessDetails(data.address.prov,data.address.city,data.name,data.id);
		request(url, function(error, response, body) {
			  
			  if(!error && body){	
				  console.log(JSON.parse(body));
				  req.businessdetails = JSON.parse(body);
				  next();				
			  }else{								
				  //console.log(err);
				  req.result = null;
				  next();			
			  }
				  
		});
	},
	/**
	 * Scrapping 
	 * @param req
	 * @param res
	 * @param next
	 */
	scrap : function(req,res,next){
		var url = req.businessdetails.products.webUrl[0];
		if(!url || url ==''){
			next();
		}
		console.log(url);
		console.log("=================SCRAP========================")
			request({
				  uri: url,
				}, function(error, response, body) {
				  var $ = cheerio.load(body);
				  var links = [];
				  $("meta").each(function() {
				    var meta = {name : $(this).attr('name'),content : $(this).attr('content')};		    
				    links.push(meta);		    
				  });
				  var copyright = {name : 'copyright',content :$(':contains("�")').last().text().replace(/\s{2,}/g, ' ') };			  
				  links.push(copyright);
				  req.scrap = links;
				  next();
			});
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
		var data = { title: 'Yellow Page API',
				  data:req.businesslist,
				  details:req.businessdetails
				  };
		if(req.scrap){data.scrap=req.scrap;}
		res.render('result',data);
	}
};
module.exports = search;