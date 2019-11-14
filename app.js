"use strict";

const cfg = require("./knex-config.js").sqlite; // alternatively, require('').sqlite
const { clearTerminalScreen, write } = require("./screen");

// create instance of knex library
const knex = require("knex")(cfg); // creates a single instance that allows a pool of 1-10 connections (to increase efficiency)

clearTerminalScreen();

const query = knex.select("title", "rating").from("book");
const sqlQueryInfo = query.toSQL();
write(sqlQueryInfo);

query.asCallback(function(err, rows) {
  if (err) {
    console.log(err);
  } else {
    write(rows, "pretty" || "json");
  }
  knex.destroy();
  console.log("Done");
});
