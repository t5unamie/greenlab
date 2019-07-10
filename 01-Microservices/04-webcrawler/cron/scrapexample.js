const cron = require("node-cron");
const fs = require("fs");
const request = require('request');
const Joi = require('joi');
const cheerio = require('cheerio');
var dynamo = require('../modules/dynamodb');
var util   = require('util');
var _      = require('lodash');


var dataScraped = dynamo.define('dataScraped', {
  hashKey : 'url',
 
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps : true,
 
  schema : {

    url   : Joi.string(),
    rank : Joi.number(),
    title: Joi.string(),
    points: Joi.number(),
    username: Joi.string(),
    comments: Joi.number()
  }
});

dynamo.createTables(function(err) {
  if (err) {
    console.log('Error creating tables: ', err);
  } else {
    console.log('Tables has been created');
  }
});

request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('span.comhead').each(function(i, element){
      // Select the previous element
      var a = $(this).prev();
      // Get the rank by parsing the element two levels above the "a" element
      var rank = a.parent().parent().text();
      // Parse the link title
      var title = a.text();
      // Parse the href attribute from the "a" element
      var url = a.attr('href');
      // Get the subtext children from the next row in the HTML table.
      var subtext = a.parent().parent().next().children('.subtext').children();
      // Extract the relevant data from the children
      var points = $(subtext).eq(0).text();
      var username = $(subtext).eq(1).text();
      var comments = $(subtext).eq(2).text();
      // Our parsed meta data object
      var metadata = {
        rank: parseInt(rank),
        title: title,
        url: url,
        points: parseInt(points),
        username: username,
        comments: parseInt(comments)
      };
      // Push meta-data into dynamo
      dataScraped.create( metadata , {}, function (error, acc) { console.log(metadata); });
    });
  }
});

