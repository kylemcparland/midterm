DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
  id       SERIAL PRIMARY KEY NOT NULL,
  user_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE
);