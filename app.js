let request = new Request("https://atlantic-new-tab.herokuapp.com/api/");

// let request = ['a', 'b', 'c']

fetch(request).then(function(response) {
    return response.json().then(function(json){
      console.dir(json.results[0]);
      let dekText = json.results[0].dek;
      let titleText = json.results[0].title;
      setDek(dekText, titleText);
  });
});

document.getElementsByClassName("c-tab__dek")[0].textContent = 'kevin';

const setDek = (dekText, titleText) => {
  document.getElementById("title").textContent = titleText;
  document.getElementById("dek").textContent = dekText;
}
