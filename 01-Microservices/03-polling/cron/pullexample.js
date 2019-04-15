const cron = require("node-cron");
const fs = require("fs");
const request = require('request');
const Joi = require('joi');
var dynamo = require('../modules/dynamodb');
var util   = require('util');
var _      = require('lodash');

var slowQueue = { 0 : "https://jsonplaceholder.typicode.com/posts"};

var fastQueue = dynamo.define('fastQueue', {
  hashKey : 'url',
 
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps : true,
 
  schema : {

    url   : Joi.string(),
    url_fails : Joi.number()
  }
});

dynamo.createTables(function(err) {
  if (err) {
    console.log('Error creating tables: ', err);
  } else {
    console.log('Tables has been created');
  }
});

fastQueue.create({url : "https://jsonplaceholder.typicode.com/posts", url_fails : 1 }, {}, function (error, acc) { 
	console.log( acc ); 
});
fastQueue.create({url : "https://jsonplaceholder.typicode.com/comments", url_fails : 1 }, {}, function (error, acc) { 
	console.log( acc ); 
});

// slot queue
cron.schedule("* 12 * * *", function() {
     console.log("running slowQueue");  

     for (url in slowQueue) {
     	request(url, function (error, response, body) {

     		if (response.statusCode !== 200) {
     			fastQueue[fastQueue.length] = url;
     		}

	  	 	console.error('error:', error); // Print the error if one occurred
	  	 	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  	 	console.log('body:', body); // Print the HTML for the Google homepage.
		});
     }
});

// fast
cron.schedule("* * * * *", function() {
     console.log("running FAST");  

	//var s= fastQueue.scan().where('url').equals('*').exec();
	fastQueue.scan().loadAll().exec(function (err, resp) {
	  if(err) {
	    console.log('Error running query', err);
	  } else {
	    console.log('Found', resp.Count, 'items');
	   // console.log(util.inspect(_.pluck(resp.Items, 'attrs')));
		console.log(resp.Items);

		for (s in resp.Items) {
			var result = resp.Items[s]['attrs'];
			console.log('This is item ---------', s)

			// console.log(result['url']);
			// console.log(result['url_fails']);

			request(result['url'], function (error, response, body) {

     		if (response.statusCode === 200) {
     	//		fastQueue.remove(index);
     		} else {
     			// logic to track how m any times failed
     		}

	  	 	console.error('error:', error); // Print the error if one occurred
	  	 	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  	 	console.log('body:', body); // Print the HTML for the Google homepage.
			});

		} 

	    if(resp.ConsumedCapacity) {
	      console.log('----------------------------------------------------------------------');
	      console.log('Query consumed: ', resp.ConsumedCapacity);
	    }
	  }
	});


     	
     	
    
});

