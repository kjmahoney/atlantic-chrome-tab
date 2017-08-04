let request = new Request("http://localhost:5000/api");

console.log(request);

fetch(request).then(function(response) {
  return response;
}).then(function(json){
  console.log("JSON" + json);
});
