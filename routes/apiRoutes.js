var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/members", function(req, res) {
    db.Member.findAll({
      include: [db.Post]
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/members/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Member.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // Create a new example
  app.post("/api/members", function(req, res) {
    db.Member.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/members/:id", function(req, res) {
    db.Member.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
