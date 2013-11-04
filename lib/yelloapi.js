var config = require('../config');
var request = require('request');
var yelloapi = {
	/**
	 * Find Business
	 * @param what
	 * @param where
	 * @param callback
	 */
	FindBusiness : function(what,where){
		var data = {status : false, msg : ''};
		if(!what || what!=''){ data.msg = "What field cand be empty or null.";}
		if(!what || what!=''){ data.msg = "Where field cand be empty or null.";}
		params = {
			what : what,
			where : where,
			fmt : 'JSON',
			pg : '1',
			pgLen : '5',
			apikey : config.yelloapi.sandbox_apikey,
			UID : '127.0.0.1'
	    };
		tail = [];
		for(var key  in params) {
		    tail.push(key + "=" + encodeURIComponent(params[key]));
		}
		url =  config.yelloapi.host+"FindBusiness/?" + tail.join("&");
		//console.log("================== FindBusiness ====================="); 
		//console.log("URL : "+url);
		return url;
	},
	/**
	 * Get Business Detail
	 * @param prov
	 * @param city
	 * @param bus_name
	 * @param listingid
	 * @param callback
	 */
	GetBusinessDetails : function(prov,city,bus_name,listingid){
		var data = {status : false, msg : ''};
		if(!prov || prov!=''){ data.msg = "Prov field cand be empty or null.";}
		if(!city || city!=''){ data.msg = "City field cand be empty or null.";}
		if(!bus_name || bus_name!=''){ data.msg = "Business Name empty.";}
		if(!listingid || listingid!=''){ data.msg = "Listingid field cand be empty or null.";}
		params = {
			prov : prov,
			city : city,
			'bus-name' : bus_name,
			listingId : listingid,
			fmt : 'JSON',
			apikey : config.yelloapi.sandbox_apikey,
			UID : '127.0.0.1'
		}
		tail = [];
		for(var key  in params) {
		    tail.push(key + "=" + encodeURIComponent(params[key]));
		}
		url =  config.yelloapi.host+"GetBusinessDetails/?" + tail.join("&");
		
		//console.log(url);
		//console.log("================ GetBusinessDetails ======================="); 
		return url;
	}
	
		
};
module.exports = yelloapi;