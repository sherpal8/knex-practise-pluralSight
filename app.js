"use strict";

const cfg = require("./knex-config.js").pg; // alternatively, require('').sqlite
const { clearTerminalScreen, write } = require("./screen");

// create instance of knex library, with pool of 1-10 connections
const knex = require("knex")(cfg);

clearTerminalScreen();

const query = knex.select("title", "rating").from("book");
const sqlQueryInfo = query.toSQL();
write(sqlQueryInfo);

query
  .then(function(rows) {
    write("Success!");
    write(rows, "pretty" || "json");
  })
  .catch(function(error) {
    write(error, "pretty");
  })
  .finally(function() {
    knex.destroy();
  });
