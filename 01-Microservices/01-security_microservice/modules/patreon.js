var url = require('url')
var patreon = require('patreon')
var patreonAPI = patreon.default
var patreonOAuth = patreon.oauth
 
// Use the client id and secret you received when setting up your OAuth account
var CLIENT_ID = 'ppppp'
var CLIENT_SECRET = 'pppppp'
var patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET)
 
// This should be one of the fully qualified redirect_uri you used when setting up your oauth account
var redirectURL = 'https://www.green-labs.io/patreonAuth'
 
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