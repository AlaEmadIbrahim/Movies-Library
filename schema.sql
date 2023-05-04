DROP TABLE IF EXISTS favmovies;
CREATE TABLE IF NOT EXISTS favmovies(
id SERIAL PRIMARY KEY ,
title varchar(2550),
release_date varchar(2550),
poster_path varchar(2550),
overview varchar(2550)
);