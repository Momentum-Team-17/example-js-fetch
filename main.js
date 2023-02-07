const form = document.querySelector("#search-form");
// get the form element on the page
const baseUrl = "https://api.artic.edu/api/v1/artworks/search?q=";
const container = document.querySelector("#artContainer");

form.addEventListener("submit", function (event) {
  // listen for the search form being submitted
  event.preventDefault();
  // prevent the page from reloading immediately, control when it reloads
  console.log(event.target);
  let term = document.querySelector("#search-text").value;
  console.log(`Search term: ${term}`);
  search(term);
});

function search(searchTerm) {
  // put these actions in a function, so I can control when they fire and the search happens
  let searchUrl = `${baseUrl}${searchTerm}`;
  // combine base url with term from form to get search url
  console.log(searchUrl);
  fetch(searchUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // authorization would also go here if we needed it
    // like API key or password
  })
    .then(function (response) {
      // response is whatever the previous action returns
      // js, when you have a response, then parse that response as json
      console.log("first .then (promise) executed");
      return response.json();
    })
    .then(function (resultData) {
      // data refers to whatever the previous action returned. In this case response.json()
      // when you have data from the above promise, console log it
      console.log("second .then executed");
      console.log("Here is what we got back from the API", resultData.data);
      buildResultsHtml(resultData.data);
      // call function to build HTML on the array I got back
    });
}

function buildResultsHtml(resultsArray) {
  // loop through the array of results and build html to display select info from each result on the page
  for (let art of resultsArray) {
    let artDiv = document.createElement("div");
    // build a div to hold the info for this result
    let titleEl = document.createElement("h2");
    titleEl.innerText = art.title;
    // for each value we want to display from this result, build an HTML element and populate it
    artDiv.appendChild(titleEl);
    // append the div for each value to the bigger div
    container.appendChild(artDiv);
    // append the div with all this result's info to the page
  }
}
