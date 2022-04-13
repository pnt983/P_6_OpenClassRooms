async function getData(url) {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let jsonData = await response.json();
        console.log("jsonData", jsonData);
        return jsonData;
      } else {
        console.log("Reponse du servuer: ", response.status);
      } 
    } catch(error) {
      console.log(error);
    }
  }
  
//   const siteURL = "http://127.0.0.1:8000/api/v1/titles/"
//   const urlBestMovies = "?genre=sport&page_size=7"
//   let bestMovies = await getData(siteURL + urlBestMovies);
//   bestMovies = bestMovies.results
//   console.log(bestMovies[0].image_url)

// let site = "http://127.0.0.1:8000/api/v1/titles/"
// const urlComedy = "?genre=comedy&page_size=7"

let getimageMovie = async function getimageMovie(siteURL, typeMovieUrl, imageId) {
    let typeMovies = await getData(siteURL + typeMovieUrl);
    typeMovies = typeMovies.results;
    for(let i = 0; i <= 4; i++) {               // penser a remettre i <= 7
        let myImage = document.getElementById(imageId + i);
        myImage.setAttribute("src", typeMovies[i].image_url);
    }
}

const site = "http://127.0.0.1:8000/api/v1/titles/"
const urlComedy = "?genre=comedy&page_size=7"
const urlSport = "?genre=sport&page_size=7"
const urlSciFi = "?genres=Sci-Fi"


let comedy = getimageMovie(site, urlComedy, "js_comedy_")
let sport = getimageMovie(site, urlSport, "js_sport_")
let sciFi = getimageMovie(site, urlSciFi, "js_sci_fi_")

  