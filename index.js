/*

  Basic OAuth2.0 handler to test FFDC
  @Author: Pierre Quemard
  
*/

// External libs
require('dotenv').config();
var express = require('express');
var app = express();
var ClientOAuth2 = require('client-oauth2');


var ffdcAuth = new ClientOAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessTokenUri: process.env.ACCESS_URL,
    authorizationUri: process.env.AUTHORIZE_URL,
    redirectUri: process.env.RESPONSE_URL,
    scopes: []
});

app.get('/', function (req, res) {
    res.send('Pierre OAuth2.0 Server for FFDC');
    console.log(req.body);

});

app.get('/oauth2/ffdc', function (req, res) {
    var uri = ffdcAuth.code.getUri()
    res.redirect(uri)
});


app.get('/oauth2/ffdc/callback', function (req, res) {
    ffdcAuth.code.getToken(req.originalUrl)
	.then(function (user) {
	    console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
	    
	    // Refresh the current users access token.
	    user.refresh().then(function (updatedUser) {
		console.log(updatedUser !== user) //=> true
		console.log(updatedUser.accessToken)
	    })
	    
	    // Sign API requests on behalf of the current user.
	    /*
	      user.sign({
	      method: 'get',
	      url: 'http://example.com'
	      })
 	    */
	    // We should store the token into a database.
	    console.log(user.accessToken);
	    return res.send('Bearer '+user.accessToken)
	})
})

app.listen(8888, function() {
    console.log('Server is listening on port 8888');
    console.log('Go to http://localhost:8888/oauth2/ffdc to get your token');
});
