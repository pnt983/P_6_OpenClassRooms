import {getData, getBestMovie, Carrousel, getMovieData} from "./utils.js"


const siteUrl = "http://127.0.0.1:8000/api/v1/titles/"
const urlComedy = "?sort_by=-imdb_score&genre=comedy&page_size=7"
const urlSport = "?sort_by=-imdb_score&genre=sport&page_size=7"
const urlSciFi = "?sort_by=-imdb_score&genre=Sci-Fi&page_size=7"
const urlBestMovie = "?sort_by=-imdb_score&page_size=1"
const urlSorted = "?sort_by=-imdb_score&page_size=8"
const srcButtonNext = "images/icon_suivant.png"
const srcButtonPrev = "images/icon_precedent.png"


getBestMovie(siteUrl + urlBestMovie);


let root = document.getElementById("root");


let sortedData = await getData(siteUrl + urlSorted);
sortedData = sortedData.results;
sortedData = sortedData.slice(1,8);
let sortedMoviesData = await getMovieData(sortedData);
let sortedCarroussel = new Carrousel(sortedMoviesData, "Les mieux notés", srcButtonNext, srcButtonPrev);
sortedCarroussel.addToParent(root);


let comedyData = await getData(siteUrl + urlComedy);
comedyData = comedyData.results;
let comedyMoviesData = await getMovieData(comedyData);
let comedyCarroussel = new Carrousel(comedyMoviesData, "Comedie", srcButtonNext, srcButtonPrev);
comedyCarroussel.addToParent(root);


let sportData = await getData(siteUrl + urlSport);
sportData = sportData.results;
let sportMoviesData = await getMovieData(sportData);
let sportCarrousel = new Carrousel(sportMoviesData, "Sport", srcButtonNext, srcButtonPrev);
sportCarrousel.addToParent(root);


let sciFiData = await getData(siteUrl + urlSciFi);
sciFiData = sciFiData.results;
let sciFiMoviesData = await getMovieData(sciFiData);
let sciFiCarrousel = new Carrousel(sciFiMoviesData, "Science-fiction", srcButtonNext, srcButtonPrev);
sciFiCarrousel.addToParent(root);


// pour modifier le style css de javascript

// let myTest = document.getElementById("meilleur_film_p");
// let myTest2 = getComputedStyle(myTest).getPropertyValue("font-size");
// console.log(myTest2)
// myTest.style.setProperty("font-size", "30px");