    

export async function getData(url) {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let jsonData = await response.json();
        return jsonData;
      } else {
        console.log("Reponse du serveur: ", response.status);
      } 
    } catch(error) {
      console.log(error);
    }
  }

export async function getMovieData(data) {
    let movieArray = []
    for (let i = 0; i <= 6; i++) {
        let dataUrl = data[i].url;
        let dataMovie = await getData(dataUrl)
        movieArray.push(dataMovie)
    }
    return movieArray
}


export async function getBestMovie(siteURL, urlSorted) {
    let theBestMovieData = await getData(siteURL + urlSorted);
    theBestMovieData = theBestMovieData.results;
    let titleMovie = theBestMovieData[0].title;
    let imageMovie = theBestMovieData[0].image_url;
    let urlMovie = theBestMovieData[0].url
    let datas = await getData(urlMovie)
    let title = document.getElementById("titre_meilleur_film").innerHTML = titleMovie;
    let myImage = document.getElementById("js_meilleurs_film");
    myImage.setAttribute("src", imageMovie);
    myImage.setAttribute("alt", "Image du film " + title)
    let descriptionMovie = document.getElementById("meilleur_film_p").innerHTML = datas.description;
    myImage.addEventListener("click", (e) => {
        openModal(e, datas);
    })
}


export class MovieImg { 
    constructor(movieData) {
        this.movieData = movieData;
        this.div = this._createDiv();
    }

    _createDiv() {
        let div = document.createElement("div");
        div.classList = "movie";
        let link = document.createElement("a");
        link.setAttribute("href", "#modal1");
        link.setAttribute("class", "js_link");
        let image = document.createElement("img");
        image.setAttribute("src", this.movieData.image_url);
        image.setAttribute("alt", "Image du film " + this.movieData.title);
        link.appendChild(image);
        link.addEventListener("click", (e) => {
            openModal(e, this.movieData);
        })
        div.appendChild(link);
        return div
    }

    addToParent(parentElement) {
        parentElement.appendChild(this.div);
    }
}

export class Carrousel {
    constructor(moviesData, title, srcButton, movieInCarrousel=4) {
        this.moviesData = moviesData;
        this.movieInCarrousel = movieInCarrousel;
        this.srcButton = srcButton
        this.section = this._createSection();
        this.divTitle = this._createDiv("title", title);
        this.movieIndex = 0;
        this.cursor = 0;
        this._addImageToSection();
    }

    _createDiv(divClass, title) {
        let div = document.createElement("div");
        div.classList = divClass;
        div.textContent = title;
        return div
    }

    _createSection() {
        let section = document.createElement("section");
        section.className = "category";
        return section
    }

    _addImageToSection() {
        this.movieIndex = this.cursor;
        for(let i = 1; i <= this.movieInCarrousel; i++) {
            let movieImage = new MovieImg(this.moviesData[this.movieIndex]);
            movieImage.addToParent(this.section);
            this.movieIndex += 1;
            if(this.movieIndex >= this.moviesData.length) {
                this.movieIndex = 0;
            }
        }
        this.cursor += 1;
        if(this.cursor >= this.moviesData.length) {
            this.cursor = 0;
        }
        let divButton = this.addButton("next_button", this.srcButton);
        this.section.appendChild(divButton);
    }
    
    addButton(buttonId, srcButton) {
        let divButton = document.createElement("div");
        divButton.className = "next_button";
        let button = document.createElement("img");
        button.setAttribute("id", buttonId);
        button.setAttribute("src", srcButton);
        button.setAttribute("alt", "Next button");
        button.onclick = () => {
            this.addNextMovie()
        }
        divButton.appendChild(button);
        return divButton
    }

    addNextMovie() {
        this.section.innerHTML = "";
        this._addImageToSection();
    }
    
    addToParent(parentElement) {
        parentElement.appendChild(this.divTitle);
        parentElement.appendChild(this.section);
    }
}


// Js pour modal 
let modal = null


function createDataForModal(movieData) {
    let movieImage = document.getElementById("movie_img");
    movieImage.setAttribute("src", movieData.image_url);
    movieImage.setAttribute("alt", "Image du film" + movieData.title);
    let movieTitle = document.getElementById("movie_title");
    movieTitle.innerText = "Titre" + movieData.title;
    let movieGenre = document.getElementById("movie_genre");
    movieGenre.innerText = "Genre: " + movieData.genres;
    let movieYear = document.getElementById("movie_year");
    movieYear.innerText = "Date de sortie: " + movieData.year;
    let movieRated = document.getElementById("movie_rated");
    movieRated.innerText = "Nombre de votes: " + movieData.votes;
    let movieScore = document.getElementById("movie_score");
    movieScore.innerText = "Score: " + movieData.imdb_score;
    let movieDirector = document.getElementById("movie_director");
    movieDirector.innerText = "Realisateur: " + movieData.directors;
    let movieActors = document.getElementById("movie_actors");
    movieActors.innerText = "Acteurs : " + movieData.actors;
    let movieDuration = document.getElementById("movie_duration");
    movieDuration.innerText = "Durée : " + movieData.duration;
    let movieCountry = document.getElementById("movie_country");
    movieCountry.innerText = "Pays d'origine: " + movieData.countries;
    let boxOfficeResult = document.getElementById("movie_box_office");
    boxOfficeResult.innerText = "Résultat au Box Office: " + movieData.worldwide_gross_income;
    let descriptionMovie = document.getElementById("movie_description");
    descriptionMovie.innerText = "Résumé du film: " + movieData.long_description;
}


function appendChildAll(parentBalise, arrayForModal) {
    for(let i = 0; i < arrayForModal.length; i++) {
    parentBalise.appendChild(arrayForModal[i])
    }
}


function createDataForModalDynamique(movieData) {
    let arrayForModal = []
    let movieImage = document.createElement("img");
    movieImage.setAttribute("src", movieData.image_url);
    movieImage.setAttribute("alt", "Image du film" + movieData.title);
    let movieTitle = document.createElement("p");
    movieTitle.innerText = "Titre: " + movieData.title;
    let movieGenre = document.createElement("p");
    movieGenre.innerText = "Genre: " + movieData.genres;
    let movieYear = document.createElement("p");
    movieYear.innerText = "Date de sortie: " + movieData.year;
    let movieRated = document.createElement("p");
    movieRated.innerText = "Nombre de votes: " + movieData.votes;
    let movieScore = document.createElement("p");
    movieScore.innerText = "Score: " + movieData.imdb_score;
    let movieDirector = document.createElement("p");
    movieDirector.innerText = "Realisateur: " + movieData.directors;
    let movieActors = document.createElement("p");
    movieActors.innerText = "Acteurs : " + movieData.actors;
    let movieDuration = document.createElement("p");
    movieDuration.innerText = "Durée : " + movieData.duration;
    let movieCountry = document.createElement("p");
    movieCountry.innerText = "Pays d'origine: " + movieData.countries;
    let boxOfficeResult = document.createElement("p");
    boxOfficeResult.innerText = "Résultat au Box Office: " + movieData.worldwide_gross_income;
    let descriptionMovie = document.createElement("p");
    descriptionMovie.innerText = "Résumé du film: " + movieData.long_description;

    arrayForModal.push(movieImage, movieTitle, movieGenre, movieYear, movieRated, movieScore,
        movieDirector, movieActors, movieDuration, movieCountry, boxOfficeResult, descriptionMovie);
    let parentDiv = document.getElementById("js_movie_datas");
    appendChildAll(parentDiv, arrayForModal);
}


function addAllDataToModal(movieData) {
    createDataForModal(movieData);
    // createDataForModalDynamique(movieData)
    
    let windowModal = document.getElementById("modal1");
    windowModal.style.display = null;
    modal = windowModal
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js_modal_close").addEventListener("click", closeModal)
    modal.querySelector(".js_modal_stop").addEventListener("click", stopPropagation)
}

function openModal(e, movieData) {
    document.querySelectorAll(".js_link").forEach(a => {
        a.addEventListener("click", addAllDataToModal(movieData))
    })
}

let closeModal = function(e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js_modal_close").removeEventListener("click", closeModal)
    modal.querySelector(".js_modal_stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})
