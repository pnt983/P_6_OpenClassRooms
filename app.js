import {getData, getBestMovie, Carrousel, MovieImg} from "./utils.js"


const siteUrl = "http://127.0.0.1:8000/api/v1/titles/"
const urlComedy = "?genre=comedy&page_size=7"
const urlSport = "?genre=sport&page_size=7"
const urlSciFi = "?genres=Sci-Fi&page_size=7"
const urlSorted = "?sort_by=-imdb_score&page_size=1"
const srcButton = "images/icon_suivant.png"



// let theBestMovie = getBestMovie()
// let bestRatingMovies = getImageBestRatingMovies()
// let comedy = getimageMovie(siteUrl, urlComedy, "js_comedy_")
// let sport = getimageMovie(siteUrl, urlSport, "js_sport_")
// let sciFi = getimageMovie(siteUrl, urlSciFi, "js_sci_fi_")

getBestMovie(siteUrl + urlSorted)

let root = document.getElementById("root")

let comedyData = await getData(siteUrl + urlComedy);
comedyData = comedyData.results;
console.log("test", comedyData)
console.log("comedyData", comedyData[0])
let comedyCarroussel = new Carrousel(comedyData, "Comedy", srcButton);
comedyCarroussel.addToParent(root)
