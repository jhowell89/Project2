var db = require("../models");

module.exports = function(app) {
  app.get("/api/members", function(req, res) {

    db.Member.findAll({
      include: [db.Post]
    }).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  app.get("/api/members/:id", function(req, res) {
    db.Member.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Member]
    }).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  app.post("/api/members", function(req, res) {
    db.Member.create(req.body).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  app.delete("/api/members/:id", function(req, res) {
    db.Member.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMember) {
      res.json(dbMember);
    });
  });

};
