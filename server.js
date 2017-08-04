require('dotenv').config()
var sitePath = process.argv[2] || ".";
var port = process.env.PORT || 5000;
var request = require('request');
var apicache = require('apicache');

var express = require('express');
var app = express();
var cache = apicache.middleware;
var async = require('async');


// Global list of stories we already ran
var stories_we_already_ran = []



app.get('/api', cache('2 hours'), (req, res) => {
  
  var selected_stories = [];
  var export_stories = [];
  
  getHomepageStories(function(stories){
    
    // Run through and pick out three stories we haven't used yet
    while(selected_stories.length < 3){
      story = stories[Math.floor(Math.random() * stories.length)]
      if( !stories_we_already_ran.find( d => d == story) ){
        selected_stories.push(story)
        stories_we_already_ran.push(story)
      }
    }
    
    // Pull full data for each selected story
    async.each(selected_stories, function(story, next){
      request({
        url: 'http://www.theatlantic.com/api/2.0/articles/' + story.ollie_id,
        headers: {
          'Authorization': 'token ' + process.env.ATLANTIC_API_TOKEN
        }
      }, (error, response, body) => {
        export_stories.push(JSON.parse(body));
        next();
      })
    }, function(err){
      if(err)
        throw err;
      
      // Send full data to endpoint
      res.json(export_stories)    
    })
    
  }); 
});

app.use(express.static(__dirname + '/' + sitePath));


app.listen(port, function() {
  console.log('server running at ' + port);
});

function getHomepageStories(callback){
  request.get('http://atlantic-homepage-tracker.herokuapp.com/api/day', function(err, res, body){

    // Get rid of lead and featured-3 slots
    data = JSON.parse(body);
    data = data.filter(d => d.name != 'lead' || (d.name != 'featured' && d.slot != 3));
    
    var stories = [];
    data.forEach( d => {
      stories = stories.concat(d.stories)
    })
    
    stories.forEach( d => {
      d.ollie_id = d.url.slice(-7).replace('/','')
    })
    
    callback(stories);
    
  });
}
