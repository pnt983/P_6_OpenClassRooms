const siteUrl = "http://127.0.0.1:8000/api/v1/titles/"
const urlComedy = "?genre=comedy&page_size=7"
const urlSport = "?genre=sport&page_size=7"
const urlSciFi = "?genres=Sci-Fi&page_size=7"

async function getData(url) {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let jsonData = await response.json();
        return jsonData;
      } else {
        console.log("Reponse du servuer: ", response.status);
      } 
    } catch(error) {
      console.log(error);
    }
  }

let getimageMovie = async function getimageMovie(siteURL, typeMovieUrl, imageId) {
    let typeMovies = await getData(siteURL + typeMovieUrl);
    typeMovies = typeMovies.results;
    for(let i = 0; i <= 3; i++) {               // penser a remettre i <= 6
        let myImage = document.getElementById(imageId + i);
        myImage.setAttribute("src", typeMovies[i].image_url);
        myImage.setAttribute("alt", "Image du film " + typeMovies[i].title)
    }
}


let getBestScoreMovie = async function getBestScoreMovie() {
    try {
        let scoreMovies = await getData(siteUrl + "?imdb_score_min=9" + "&page_size=50");
        // console.log(scoreMovies.count)
        scoreMovies = scoreMovies.results;
        let table = []
        for(let i = 0; i <= 49; i++) {
            if(table.length === 0){
                table.push(scoreMovies[i])
            } else {
                if(parseFloat(scoreMovies[i].imdb_score) > parseFloat(table[0].imdb_score)) {
                    table.pop()
                    table.push(scoreMovies[i])
                } else {
                    // pass
                }
            }
        }
        return table
    } catch(error) {
        console.log(error);
      }
}


let bestMovie = async function getBestMovie() {
    let getInfosMovie = await getBestScoreMovie();
    let titleMovie = getInfosMovie[0].title;
    let imageMovie = getInfosMovie[0].image_url;
    let urlMovie = getInfosMovie[0].url
    let datas = await getData(urlMovie)
    let title = document.getElementById("titre_meilleur_film").innerHTML = titleMovie;
    let myImage = document.getElementById("js_meilleurs_film");
    myImage.setAttribute("src", imageMovie);
    myImage.setAttribute("alt", "Image du film " + title)
    let descriptionMovie = document.getElementById("meilleur_film_p").innerHTML = datas.description;
}


let getBestRatingMovies = async function getBestRatingMovies() {
    try {
        let scoreMovies = await getData(siteUrl + "?imdb_score_min=9" + "&page_size=50");
        // console.log(scoreMovies.count)
        scoreMovies = scoreMovies.results;
        let table = []
        for(let i = 0; i <= 49; i++) {
            if(table.length <= 3){
                table.push(scoreMovies[i])
            } else {
                let sortTable = table.sort((a, b) => b.imdb_score - a.imdb_score);
                if(parseFloat(scoreMovies[i].imdb_score) > parseFloat(table[0].imdb_score)) {
                    table.pop()
                    table.push(scoreMovies[i])
                } else {
                    // pass
                }
            }
        }
        return table
    } catch(error) {
        console.log(error);
      }
}

let getImageBestRatingMovies = async function getImageBestRatingMovies() {
    let arrayMovies = await getBestRatingMovies()
    for(let i = 0; i <= 3; i++) {           // penser a remettre i <= 6
        let myImage = document.getElementById("js_meilleurs_notes_" + i);
        myImage.setAttribute("src", arrayMovies[i].image_url);
        myImage.setAttribute("alt", "Image du film " + arrayMovies[i].title)
    }
}

let theBestMovie = bestMovie()
let bestRatingMovies = getImageBestRatingMovies()
let comedy = getimageMovie(siteUrl, urlComedy, "js_comedy_")
let sport = getimageMovie(siteUrl, urlSport, "js_sport_")
let sciFi = getimageMovie(siteUrl, urlSciFi, "js_sci_fi_")
