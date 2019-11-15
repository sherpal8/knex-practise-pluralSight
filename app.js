"use strict";

const cfg = require("./knex-config").pg; // alternatively, require('').pg
const { clearTerminalScreen, write } = require("./screen");
// create instance of knex library, with pool of 1-10 connections
const knex = require("knex")(cfg);

clearTerminalScreen();

// // .......practice for knex query........
// const promiseAuthorRows = knex
//   .select("firstname", "lastname")
//   .from("author")
//   .where("id", 1)
//   .debug(false);

// const promiseBookRows = knex
//   .select(
//     "title as books:title",
//     "rating as books:rating",
//     "title as books:title"
//   )
//   .from("book")
//   .where("author_id", 1)
//   .debug(false);

// Promise.all([promiseAuthorRows, promiseBookRows])
//   .then(function(results) {
//     const authors = results[0][0];
//     authors.books = results[1];
//     write("Success!");
//     write(authors, "json" || "pretty");
//   })
//   .catch(function(error) {
//     write("Whoops!");
//     write(error);
//   })
//   .finally(function() {
//     knex.destroy();
//   });

// ...........practice for knex.transaction........
knex
  .transaction(function(trx) {
    const doc = { firstname: "Dr", lastname: "Seuse" };
    const booksArr = [
      { title: "My Little Pony", rating: 9 },
      { title: "Nadiyah Hussain the Baker", rating: 10 },
      { title: "Why I married Posh - By David Beckham", rating: 10 }
    ];
    return trx
      .insert(doc, "id")
      .into("author")
      .then(function(idArr) {
        const newAuthorId = idArr[0];
        booksArr.forEach(function(book) {
          book.author_id = newAuthorId;
        });
        return trx.insert(booksArr).into("book");
      });
  })
  .then(function(inserts) {
    console.log(inserts.rowCount);
    write(inserts.rowCount + " new books added");
  })
  .catch(function(err) {
    console.log(err);
  })
  .finally(function() {
    knex.destroy();
  });
