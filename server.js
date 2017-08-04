require('dotenv').config()
var sitePath = process.argv[2] || ".";
var port = process.env.PORT || 5000;
var request = require('request');
var cors = require('cors')

var express = require('express');
var app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/api', (req, res) => {
  request({
    url: 'http://www.theatlantic.com/api/2.0/articles/',
    headers: {
      'Authorization': 'token ' + process.env.ATLANTIC_API_TOKEN
    }
  }, (error, response, body) => {
    body = JSON.parse(body)
    res.json(body);
  })
});

app.use(express.static(__dirname + '/' + sitePath));


app.listen(port, function() {
  console.log('server running at ' + port);
});
