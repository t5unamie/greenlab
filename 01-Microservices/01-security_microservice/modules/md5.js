// md5 hashing
var md5 = require('js-md5');

module.exports = function (password, saltvalue) 
	{
		var encrptedP = password+saltvalue
		for (var i = 1; i <= 69; i++) {
		   encrptedP = md5(encrptedP+saltvalue)
		}
		return encrptedP
	};