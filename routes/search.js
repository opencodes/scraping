
var fs     = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var jquery = fs.readFileSync("./public/javascripts/jquery.min.js").toString();

var search = {
	scrap : function(req,res,next){
		var url = req.body.url;
		console.log(url);
		console.log("=========================================")
			request({
				  uri: url,
				}, function(error, response, body) {
				  var $ = cheerio.load(body);
				  var links = [];
				  $("meta").each(function() {
				    var meta = {name : $(this).attr('name'),content : $(this).attr('content')};		    
				    links.push(meta);		    
				  });
				  var copyright = {name : 'copyright',content :$(':contains("©")').last().text().replace(/\s{2,}/g, ' ') };			  
				  links.push(copyright);	
				  res.render('result', { title: 'Express',data:links});
			});
	},
	render : function(req,res){
		res.render('index',{ title: 'Express'});
	}
};
module.exports = search;