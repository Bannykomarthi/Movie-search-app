// API configuration
export const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWJlOWFkZTU4OGI0MjBjNDdjNDgyOTI1NjE3OTRjOCIsIm5iZiI6MTczNjE3Mjk3NS4wMDgsInN1YiI6IjY3N2JlNWFlNmQ3Y2EwMGU3ODcyZGNjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MAZoS11m_BXLCkkYGONk8qxIOSkM5ALs3K3zwh6z5XY",
    },
  };
  
  const form = document.getElementById("search-form");
  const movieInput = document.getElementById("movie-input");
  const movieResults = document.getElementById("movie-results");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const movieName = movieInput.value.trim();
    if (movieName) {
      fetchMovies(movieName);
      movieInput.value = ""; // Clear input field
    }
  });
  
  // Fetch movies from TMDB
  async function fetchMovies(movieName) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movieName
    )}&language=en-US&page=1`;
  
    try {
      const response = await fetch(url, API_OPTIONS);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        displayMovies(data.results);
      } else {
        movieResults.innerHTML = `<p>No results found for "${movieName}"</p>`;
      }
    } catch (error) {
      movieResults.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
  }
  
  // Display movies
  function displayMovies(movies) {
    movieResults.innerHTML = ""; // Clear previous results
    movies.forEach((movie) => {
      const movieCard = document.createElement("li");
      movieCard.classList.add("movie-card");
  
      movieCard.innerHTML = `
        <img src="${
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/150"
        }" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date || "N/A"}</p>
        <p>Rating: ${movie.vote_average || "N/A"}</p>
      `;
  
      movieResults.appendChild(movieCard);
    });
  }
  