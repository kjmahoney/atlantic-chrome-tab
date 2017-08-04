var sitePath = process.argv[2] || ".";
var port = process.env.PORT || 5000;
var request = require('request');

var express = require('express');
var app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/api', (req, res) => {
  request('http://localhost:9001/api/2.0/articles/', (error, response, body) => {
    body = JSON.parse(body)
    res.json(body);
  })
});

app.use(express.static(__dirname + '/' + sitePath));


app.listen(port, function() {
  console.log('server running at ' + port);
});
