const siteUrl = "http://127.0.0.1:8000/api/v1/titles/"
const urlComedy = "?genre=comedy&page_size=7"
const urlSport = "?genre=sport&page_size=7"
const urlSciFi = "?genres=Sci-Fi&page_size=7"

export async function getData(url) {
    try {
      let response = await fetch(url);
      if (response.ok) {
        let jsonData = await response.json();
        return jsonData;            // return jsonData;
      } else {
        console.log("Reponse du serveur: ", response.status);
      } 
    } catch(error) {
      console.log(error);
    }
  }

// export async function getimageMovie(siteURL, typeMovieUrl, imageId) {
//     let typeMovies = await getData(siteURL + typeMovieUrl);
//     typeMovies = typeMovies.results;
//     for(let i = 0; i <= 3; i++) {               // penser a remettre i <= 6
//         let myImage = document.getElementById(imageId + i);
//         myImage.setAttribute("src", typeMovies[i].image_url);
//         myImage.setAttribute("alt", "Image du film " + typeMovies[i].title)
//     }
// }


export async function getBestMovie(siteURL, urlSorted) {
    let theBestMovieData = await getData(siteURL + urlSorted);
    theBestMovieData = theBestMovieData.results
    let titleMovie = theBestMovieData[0].title;
    let imageMovie = theBestMovieData[0].image_url;
    let urlMovie = theBestMovieData[0].url
    let datas = await getData(urlMovie)
    let title = document.getElementById("titre_meilleur_film").innerHTML = titleMovie;
    let myImage = document.getElementById("js_meilleurs_film");
    myImage.setAttribute("src", imageMovie);
    myImage.setAttribute("alt", "Image du film " + title)
    let descriptionMovie = document.getElementById("meilleur_film_p").innerHTML = datas.description;
}


export class MovieImg { 
    constructor(movieData) {
        this.MovieData = movieData;
        this.div = _create_div();
    }

    _createDiv() {
        console.log("je suis la")
        let div = document.createElement("div");
        div.classList = "movie";
        let link = document.createElement("a");
        link.setAttribute("href", "modal");    // remplacer modal quand la modal sera crée
        link.setAttribute("class", "js_link");
        let image = document.createElement("img");
        image.setAttribute("src", this.movieData.image_url);
        image.setAttribute("alt", "Image du film " + this.movieData.title);
        link.appendChild(image);
        link.addEventListener("click", function() {
            alert("Test pour ma futur modal");
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
        this.divTitle = this._creatediv("title", title);
        this.movieIndex = 0;
        this.cursor = 0;
        this._addImageToSection();
    }

    _createDiv(divClass, title) {
        console.log("je suis la")
        let div = document.createElement("div");
        div.classList = divClass;
        div.textContent = title;
        console.log("_createDiv", "carrousel")
        return div
    }

    _createSection() {
        let section = document.createElement("section");
        section.className = "category";
        console.log("_createSection, carrousel")
        return section
    }

    _addImageToSection() {
        console.log("je suis la")
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
        button.addEventListener("click", function() {
            this.section.innerHTML = "";
            this.addImageToSection();
        })
        divButton.appendChild(button);
        return divButton
    }
    
    addToParent(parentElement) {
        parentElement.appendChild(this.divTitle);
        parentElement.appendChild(this.section);
    }
}
