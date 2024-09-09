DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE movies (
  id       SERIAL PRIMARY KEY NOT NULL,
  genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
  title    VARCHAR(255) NOT NULL,
  year     SMALLINT NOT NULL,
  price    INTEGER NOT NULL,
  quality  SMALLINT NOT NULL,
  is_sold  BOOLEAN NOT NULL DEFAULT FALSE
);

-- (Price stored in cents)
-- (Quality is 5/5 total)