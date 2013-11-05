var helpers = {
	/**
	 * Array to object
	 * @param arr
	 * @param key
	 * @returns {___anonymous74_75}
	 */
	arr_to_obj : function(arr,key){
		var result = {};
		for(var k in arr){
			result[arr[k][key]] = arr[k];
		}
		return result;
	},
	/**
	 * Find Object length
	 * @param obj
	 * @returns
	 */
	obj_length : function (obj) {
	  var len = obj.length ? --obj.length : -1;
	    for (var k in obj)
	      len++;
	  return len;
	},
	getKeysArray : function(arr,key){
		var result = [];
		for(var k in arr){
			result.push(arr[k][key])
		}
		return result;
	}
};
module.exports = helpers;