const cfg = require("./knex-config.js").pg; // alternative, require('').sqlite for sqlite3 db

// create instance of knex library
const knex = require("knex")(cfg); // creates a single instance that allows a pool of 1-10 connections (to increase efficiency)
knex
  .select("title", "rating")
  .from("book")
  .asCallback(function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
    }
    knex.destroy();
    console.log("Done");
  });
