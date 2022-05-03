import {getData, getBestMovie, Carrousel, getMovieData} from "./utils.js"


const siteUrl = "http://127.0.0.1:8000/api/v1/titles/"
const urlComedy = "?sort_by=-imdb_score&genre=comedy&page_size=7"
const urlSport = "?sort_by=-imdb_score&genre=sport&page_size=7"
const urlSciFi = "?sort_by=-imdb_score&genre=Sci-Fi&page_size=7"
const urlBestMovie = "?sort_by=-imdb_score&page_size=1"
const urlSorted = "?sort_by=-imdb_score&page_size=8"
const srcButton = "images/icon_suivant.png"


getBestMovie(siteUrl + urlBestMovie);


let root = document.getElementById("root");


let sortedData = await getData(siteUrl + urlSorted);
sortedData = sortedData.results;
sortedData = sortedData.slice(1,8);
let sortedMoviesData = await getMovieData(sortedData);
let sortedCarroussel = new Carrousel(sortedMoviesData, "Les mieux notés", srcButton);
sortedCarroussel.addToParent(root);


let comedyData = await getData(siteUrl + urlComedy);
comedyData = comedyData.results;
let comedyMoviesData = await getMovieData(comedyData);
let comedyCarroussel = new Carrousel(comedyMoviesData, "Comedie", srcButton);
comedyCarroussel.addToParent(root);


let sportData = await getData(siteUrl + urlSport);
sportData = sportData.results;
let sportMoviesData = await getMovieData(sportData);
let sportCarrousel = new Carrousel(sportMoviesData, "Sport", srcButton);
sportCarrousel.addToParent(root);


let sciFiData = await getData(siteUrl + urlSciFi);
sciFiData = sciFiData.results;
let sciFiMoviesData = await getMovieData(sciFiData);
let sciFiCarrousel = new Carrousel(sciFiMoviesData, "Science-fiction", srcButton);
sciFiCarrousel.addToParent(root);


// let test = await getData(siteUrl + urlBestMovie);
// test = test.results;
// // console.log("test", test);
// let urlTest = test[0].url
// let otherTest = await getData(urlTest);
// console.log("otherTest", otherTest);
