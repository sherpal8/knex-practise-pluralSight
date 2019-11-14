DROP DATABASE IF EXISTS book;
CREATE DATABASE book;

\c book

CREATE TABLE author (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL
); 

INSERT INTO author (firstname, lastname)
VALUES ('J.K', 'ROWLING'), 
('GEORGE', 'MARTIN'),
('STEVEN', 'KING'),
('MARK', 'TWAIN');


CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  author_id INT REFERENCES author(id) NOT NULL,
  rating FLOAT
);

INSERT INTO book (title, author_id, rating)
VALUES ('HARRY POTTER AND THE PHILOSOPHERS STONE', 1, 8),
('HARRY POTTER AND THE CHAMBER OF SECRETS', 1, 10),
('HARRY POTTER AND THE PRISONER OF AZKABAN', 1, 9),
('A GAME OF THRONES', 2, 10),
('A CLASH OF KINDS', 2, 9),
('A STORM OF SWORDS', 2, 7);


\dt

SELECT * FROM author;
SELECT * FROM book;

\q