var db = require("../models");

module.exports = function(app) {
  app.get("/api/comment", function(req, res) {
    var query = {};
    if (req.query.post_id) {
      query.PostId = req.query.post_id;
    }
    db.Comment.findAll({
      where: query,
      include: [db.Post]
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  app.post("/api/comment", function(req, res) {
    db.Comment.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });


  app.put("/api/comment/:id", function(req, res) {
        db.Comment.update(req.body, {
          comment:req.body.comment,
          comment_author:req.body.comment_author,
          where: {
            id: req.body.id
          }
        }).then(function(dbPost) {
          res.json(dbPost);
        });
      });
}
