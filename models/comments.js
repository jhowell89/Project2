module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      comment_author: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    //   PostId: {
    //       type: DataTypes.INTEGER,
    //       allowNull:true,
    //       defaultValue: 0,
    //     //   autoIncrement: true,
    //   }
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      }
    });
  };

  return Comment;
};
