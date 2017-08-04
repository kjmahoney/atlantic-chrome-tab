require('dotenv').config()
var sitePath = process.argv[2] || ".";
var port = process.env.PORT || 5000;
var request = require('request');
var apicache = require('apicache');

var express = require('express');
var app = express();
var cache = apicache.middleware;

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/api', cache('2 hours'), (req, res) => {
  request({
    url: 'http://www.theatlantic.com/api/2.0/articles/',
    headers: {
      'Authorization': 'token ' + process.env.ATLANTIC_API_TOKEN
    }
  }, (error, response, body) => {
    data = JSON.parse(body).results;
    data = data.slice(0,3)
    res.json(data);
  })
});

app.use(express.static(__dirname + '/' + sitePath));


app.listen(port, function() {
  console.log('server running at ' + port);
});
