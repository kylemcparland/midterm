const needle = require("needle");

const searchApiForTitle = (title) => {
  return needle('get', `http://www.omdbapi.com/?t=${title}&apikey=bd14a56d`)
    .then(response => {
      const movie = response.body;
      const rottenTomatoesScore = movie.Ratings[1].Value;

      return rottenTomatoesScore;
    })
    .catch(err => console.error("API failed to fetch movie:", err));
};

const fetchMovieImageFromTMDb = async (title) => {
  const apiKey = '1d6c44351fb93bbd3ea45d402d593d3c';
  try {
    const response = await needle('get', `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`);
    const data = response.body;

    if (data.results && data.results.length > 0) {
      const movie = data.results[0];
      return movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image+Available';
    }
  } catch (err) {
    console.error("API failed to fetch movie image:", err);
  }
};

const appendRatingToMovie = async (array) => {
  for (let movie of array) {
    const rottenTomatoesScore = await searchApiForTitle(movie.title);
    movie.rotten_tomatoes_score = rottenTomatoesScore;
    // console.log(movie);
  }
  return array;
};

// appendRatingToMovie(test);

module.exports = { searchApiForTitle, appendRatingToMovie, fetchMovieImageFromTMDb };
