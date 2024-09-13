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

const appendRatingToMovie = async (array) => {
  for (let movie of array) {
    const rottenTomatoesScore = await searchApiForTitle(movie.title);
    movie.rotten_tomatoes_score = rottenTomatoesScore;
    // console.log(movie);
  }
  return array;
};

// appendRatingToMovie(test);

module.exports = { searchApiForTitle, appendRatingToMovie };