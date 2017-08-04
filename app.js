let request = new Request("https://atlantic-new-tab.herokuapp.com/api/");

fetch(request).then(function(response) {
    return response.json().then(function(json){

      for (i=0; i<3; i++) {
        document.getElementsByClassName("c-tab__dek")[i].innerHTML = json[i].dek;
        document.getElementsByClassName("c-tab__title")[i].innerHTML = json[i].title;
      }
  });
});
