var express = require('express');
var router = express.Router();
var url = require('url')
var patreon = require('patreon')
var patreonAPI = patreon.default
var patreonOAuth = patreon.oauth

 
// Use the client id and secret you received when setting up your OAuth account
var CLIENT_ID = 'XXX_CLIENT_ID_XXX'
var CLIENT_SECRET = 'XXX_CLIENT_SECRET_XXX'
var patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET)
// This should be one of the fully qualified redirect_uri you used when setting up your oauth account
var redirectURL = 'https://sec-ms.green-labs.io/api/auth/patreonv1/patreonAuth'

const loginUrl = url.format({
    protocol: 'https',
    host: 'patreon.com',
    pathname: '/oauth2/authorize',
    query: {
        response_type: 'code',
        client_id: CLIENT_ID,
        redirect_uri: redirectURL,
        state: 'chill'
    }
})
 
function handleOAuthRedirectRequest(request, response) {
    var oauthGrantCode = url.parse(request.url, true).query.code
 
    patreonOAuthClient
        .getTokens(oauthGrantCode, redirectURL)
        .then(function(tokensResponse) {
            var patreonAPIClient = patreonAPI(tokensResponse.access_token)
            return patreonAPIClient('/current_user')
        })
        .then(function(result) {

            var store = result.store
            // store is a [JsonApiDataStore](https://github.com/beauby/jsonapi-datastore)
            // You can also ask for result.rawJson if you'd like to work with unparsed data
            response.end(store.findAll('user').map(user => user.serialize()))
        })
        .catch(function(err) {
            console.error('error!', err)
            response.end(err)
        })
}

router.get('/pateronLogin', function(req, res) {
    res.send(`<a href="${loginUrl}">Login with Patreon</a>`)
});

router.get('/patreonAuth', function(req, res) {
   handleOAuthRedirectRequest(req, res)
});

module.exports = router;