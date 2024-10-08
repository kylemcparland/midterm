DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id       SERIAL PRIMARY KEY NOT NULL,
  user_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content  TEXT NOT NULL,
  room_id  INTEGER NOT NULL
);