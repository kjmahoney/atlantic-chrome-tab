let request = new Request("https://atlantic-new-tab.herokuapp.com/api/");

fetch(request).then(function(response) {
    return response.json().then(function(json){
      console.dir(json.results[0]);
      let dekText = json.results[0].dek;
      let titleText = json.results[0].title;
      setDek(dekText, titleText);
  });
});

const setDek = (dekText, titleText) => {
  document.getElementById("title").textContent = titleText;
  document.getElementById("dek").textContent = dekText;
}
