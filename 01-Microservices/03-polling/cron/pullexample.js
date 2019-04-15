const cron = require("node-cron");
const fs = require("fs");
const request = require('request');

cron.schedule("* * * * *", function() {
     console.log("running a task every minute");  
	 request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
  	 	console.error('error:', error); // Print the error if one occurred
  	 	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  	 	console.log('body:', body); // Print the HTML for the Google homepage.
	});
});