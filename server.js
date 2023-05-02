'use strict'

require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const dataMovie = require("./Movie Data/data.json");
const movieKey = process.env.API_KEY;
const axios = require("axios");

app.get("/", handleHomePage);

function handleHomePage(req , res) {
    let newMovie = new Movie(dataMovie.title , dataMovie.poster_path , dataMovie.overview);
     res.json(newMovie);
    };

app.get("/favorite", HandlefavoritePage);

function HandlefavoritePage(req, res) {
  res.send("Welcome to Favorite Page");
};

function Movie(id, name, release, poster, overview) {
  this.id = id;
  this.title = name;
  this.release_date = release;
  this.poster_date = poster;
  this.overview = overview;
};

app.get("/trending", handelTrending);

async function handelTrending(req, res) {
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${movieKey}`;
  let recipesFromAPI = await axios.get(url);
  let recipes = recipesFromAPI.data.results.map((item) => {
    return new Movie(
      item.id,
      item.title,
      item.release_date,
      item.poster_path,
      item.overview
    );
  });
  res.send(recipes);
};

app.get("/search", handleSearch);

function handleSearch(req, res) {
  let searchMovieName = req.query.query; // query = search Movie by query Name
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchMovieName}`;
  axios.get(url).then((result) => {
    res.send(result.data);
  });
}

app.get("/upcoming", handelupcoming);

async function handelupcoming(req, res) {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${movieKey}&language=en-US&page=1`;
  let recipesFromAPI = await axios.get(url);
  let recipes = recipesFromAPI.data.results.map((item) => {
    return new Movie(
      item.id,
      item.title,
      item.release_date,
      item.poster_path,
      item.overview
    );
  });
  res.send(recipes);
}
app.get("/latest", handellatest);

function handellatest(req, res) {
  const url = `https://api.themoviedb.org/3/movie/latest?api_key=${movieKey}&language=en-US`;
  axios.get(url).then((result) => {
    res.send(result.data);
  });
}

app.use(handleError500);

function handleError500(req, res) {
  const error500 = {
    status: 500,
    responseText: "Sorry, something went wrong",
  };
  res.status(500).send(error500);
}

app.use(handleError404);

function handleError404(req, res) {
    const error404 = {
      status: 404,
      responseText: "page not found error",
    };
  res.status(404).send(error404);
}

  app.listen(port, () => {

  });