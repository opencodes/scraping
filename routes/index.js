
/*
 * GET home page.
 */
var request = require('request')
	jsdom = require('jsdom');
var fs     = require('fs');
var jquery = fs.readFileSync("./public/javascripts/jquery.min.js").toString();

exports.index = function(req, res){
		jsdom.env({
		  html: 'http://rkjha.com/',
		  src: [
		    jquery
		  ],
		  done: function(errors, window) {
		    var $ = window.$;
		    var links = [];
		    $('a').each(function(){
		      console.log( $(this).attr('href') );
		      links.push( $(this).attr('href'));
		    });
		    res.render('index', { title: 'Express',data:links});
		  }
		});
};