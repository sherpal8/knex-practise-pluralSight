"use strict";

const cfg = require("./knex-config").pg; // alternatively, require('').sqlite
const { clearTerminalScreen, write } = require("./screen");

// create instance of knex library, with pool of 1-10 connections
const knex = require("knex")(cfg);

clearTerminalScreen();

const promiseAuthorRows = knex
  .select("firstname", "lastname")
  .from("author")
  .where("id", 1)
  .debug(false);

const promiseBookRows = knex
  .select(
    "title as books:title",
    "rating as books:rating",
    "title as books:title"
  )
  .from("book")
  .where("author_id", 1)
  .debug(false);

Promise.all([promiseAuthorRows, promiseBookRows])
  .then(function(results) {
    const authors = results[0][0];
    authors.books = results[1];
    write("Success!");
    write(authors, "json" || "pretty");
  })
  .catch(function(error) {
    write("Whoops!");
    write(error);
  })
  .finally(function() {
    knex.destroy();
  });
