var express = require('express');
var router = express.Router();
var request = require('request-json');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/names', function(req, res) {
  var client = request.createClient('http://localhost:3001');
  data = { "token": req.body.token, "role": "03-secure_microservice" };
  client.post('/api/roleCheck', data, function(error, response, body) {
    if(!error){
      console.log(response.body.success);
      if (response.body.success) {
        var json = {"firstName":"John", "lastName":"Phan"};
        res.send(JSON.stringify(json))
      } else {
        res.json({ success: false, message: 'they lied, the security guys said they are not allowed this data' });
      }
    } else {
      res.json({ success: false, message: 'broken, I am broken help me' + error });
    }
  });
});

module.exports = router;