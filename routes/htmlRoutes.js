/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Member.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Member.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/members/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("post", {
        example: dbExample
      });
    });
  });

  app.get("/post", function(req, res) {
    res.render("post");
  });

  app.get("/feed", function(req, res) {
    res.render("feed");
  });
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
