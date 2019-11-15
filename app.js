"use strict";

const cfg = require("./knex-config").pg; // alternatively, require('').sqlite
const { clearTerminalScreen, write } = require("./screen");
const Treeize = require("treeize");

// create instance of knex library, with pool of 1-10 connections
const knex = require("knex")(cfg);

clearTerminalScreen();

const query = knex
  .select(
    "book.title as books:title",
    "book.rating as books:rating",
    "book.title as books:title",
    "author.firstname",
    "author.lastname"
  )
  .from("book")
  .join("author", "author.id", "book.author_id")
  .debug(false);
// const sqlQueryInfo = query.toSQL(); // alternative: `debug:true` in knex-config.js
// write(sqlQueryInfo);

query
  .then(function(rows) {
    const tree = new Treeize();
    tree.grow(rows);
    const authors = tree.getData();
    write("Success!");
    write(authors, "pretty" || "json");
  })
  .catch(function(error) {
    write("Whoops!");
    write(error);
  })
  .finally(function() {
    knex.destroy();
  });
