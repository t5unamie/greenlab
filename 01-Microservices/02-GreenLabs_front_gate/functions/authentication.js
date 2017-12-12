module.exports = {
  roleCheck: function (token) {
  	var request = require('request');
    request(
    { method: 'PUT'
    , uri: 'http://localhost:3000/roleCheck'
    , content-type: 'application/json'
    , body: JSON.stringify({token: token})
    }
  , function (error, response, body) {
      if(response.statusCode == 201){
        console.log('Role checked')
      } else {
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
    }
  )
  }
};