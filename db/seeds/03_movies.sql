INSERT INTO movies (genre_id, title, year, price, quality, is_sold)
VALUES (1, 'Halloween', 1978, 8000, 4, FALSE),
       (1, 'Alien', 1979, 9000, 5, FALSE),
       (1, 'Tremors', 1990, 3000, 2, FALSE),
       (2, 'Taxi Driver', 1976, 6000, 3, FALSE),
       (2, 'The Fugitive', 1993, 3000, 3, FALSE),
       (2, 'GoldenEye', 1995, 3000, 4, FALSE),
       (3, 'Ghostbusters', 1984, 5000, 5, FALSE),
       (3, 'Office Space', 1999, 4000, 4, FALSE),
       (3, 'Dumb and Dumber', 1994, 5000, 5, FALSE),
       (4, 'Terminator 2: Judgement Day', 1991, 9000, 5, FALSE),
       (4, 'Predator', 1987, 6000, 4, FALSE),
       (4, 'Mad Max', 1979, 4000, 3, FALSE),
       (5, 'Stand by Me', 1986, 5000, 2, FALSE),
       (5, 'Matilda', 1996, 4000, 5, FALSE),
       (5, 'Hook', 1991, 3000, 4, FALSE),
       (6, 'Goodfellas', 1990, 7000, 4, FALSE),
       (6, 'Pulp Fiction', 1994, 9000, 5, TRUE),
       (6, 'Fargo', 1996, 8000, 3, FALSE);

-- GENRES:
-- 1 - Horror
-- 2 - Thriller
-- 3 - Comedy
-- 4 - Action
-- 5 - Family
-- 6 - Crime