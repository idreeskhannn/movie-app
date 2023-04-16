(async function () {
    const response = await fetch("./data.json");
    const movies = await response.json()
 console.log("hello")
    const genreInput = document.getElementById('genre');
    const yearInput = document.getElementById('year');
    const languageInput = document.getElementById('language');
    const ratingInput = document.getElementById('rating');
    const searchBtn = document.getElementById('search');
 
    const table = document.getElementById('listItem');
 
 
    function newSearch() {
       const genreQuery = genreInput.value;
       const yearQuery = yearInput.value;
       const languageQuery = languageInput.value;
       const ratingQuery = ratingInput.value;
       let filteredResults = movies;
 
       if (!_.isEmpty(genreQuery)) {
          filteredResults = movies.filter(function (movie) {
 
             let movieGenre = movie.genres;
 
             if (Array.isArray(movie.genres)) {
                movieGenre = movie.genres.join("");
             }
 
             return movieGenre.toLowerCase().includes(genreQuery);
 
          });
       }
 
       if (!_.isEmpty(yearQuery)) {
          filteredResults = filteredResults.filter((movie) => movie.release_date.includes(yearQuery));
       }
 
       if (!_.isEmpty(ratingQuery)) {
          filteredResults = filteredResults.filter((movie) => Math.floor(movie.vote_average) == ratingQuery);
       }
 
       if (!_.isEmpty(languageQuery)) {
          filteredResults = filteredResults.filter((movie) => movie.original_language.toLowerCase() == languageQuery);
       }
 
       // console.log(filteredResults);
 
       displayResults(filteredResults)
 
    }
 
    function displayResults(filteredList) {
 
       let tableRow ;
 
 
       filteredList.forEach(movie => {
          let img = "https://image.tmdb.org/t/p/w45"
       tableRow = document.createElement('tr');
 
          let movieGenres = movie.genres;
 
          if (Array.isArray(movie.genres)) {
             movieGenres = movie.genres.join(", ");
          }
 
 
          let dateRelease = new Date(movie.release_date);
          let extractReleaseYear = dateRelease.getFullYear();
 
          table.appendChild(tableRow)
 
          tableRow.innerHTML = `
             <td>
                ${Math.round(movie.popularity)}
             </td>
             <td class= 'd-flex'>
                   <div class="thumbnail">
                   <img src="${img}${movie.poster_path}"  id="img" alt="Image">   
                   </div>
                   <div class="description w-auto">
                      <p class=" fs-5 text-primary mb-1"> ${movie.title} </p>
                      <p class="fs-small m-0 fs-6">
                         <span class=" border rounded px-2 text-white bg-dark bg-opacity-25">${movie.certification}</span>
                         <span> ${movieGenres}</span>
                      </p>
                   </div>
             </td>
             <td id="resealeYear">
                   ${extractReleaseYear}
             </td>`;
       });
    }
 
    searchBtn.addEventListener('click', newSearch)
 
 })();
 
 