const form = document.querySelector("#search-form");
// get the form element on the page

const baseUrl = "https://api.artic.edu/api/v1/artworks/search?q=";

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
  // put these actions in a function, so I can control when they fire
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
    });
}
