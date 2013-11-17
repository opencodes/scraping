var config = require('../config');
var request = require('request');
var mozapi = {
		/**
		 * URL Matrics
		 * @param sourceurl
		 * @returns {String}
		 */
		urlMatrics : function(sourceurl){
			var url = "http://lsapi.seomoz.com/linkscape/url-metrics/";
			var cols = 16384;
				url+= sourceurl+"?Cols="+cols;
				url+= "&AccessID="+config.mozapi.AccessID;
				url+= "&Expires="+config.mozapi.Expires;
				url+= "&Signature="+config.mozapi.Signature;

			return url;
		},
		/**
		 * Links matrics	
		 */
		linkMatrics : function(sourceurl){
			var url = "http://lsapi.seomoz.com/linkscape/url-metrics/";
				url+= sourceurl+"?Cols=4";
				url+= "&AccessID="+config.mozapi.AccessID;
				url+= "&Expires="+config.mozapi.Expires;
				url+= "&Signature="+config.mozapi.Signature;

			return url;
		},
		
};
module.exports = mozapi;