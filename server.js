'use strict'

const express = require("express");
const app = express();
const port = 3000;
const dataMovie = require("./Movie Data/data.json");


app.get("/", handleHomePage);

function handleHomePage(req , res) {
    let newMovie = new Movie(dataMovie.title , dataMovie.poster_path , dataMovie.overview);
     res.json(newMovie);
    };

app.get("/favorite", HandlefavoritePage);

function HandlefavoritePage(req, res) {
  res.send("Welcome to Favorite Page");
};

function Movie(title, poster_path, overview) {

  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;

};

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

app.listen(port,()=>{

});


