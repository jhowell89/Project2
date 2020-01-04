module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }, 
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
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
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      }
  });

  // Post.associate = function(models) {
  //   Post.hasMany(models.Comment, {
  //     onDelete: "cascade"
  //   });
  // };

  Post.associate = function(models) {
    Post.belongsTo(models.Member, {
      foreignKey: {
        allowNull: false
      }
    });
    Post.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };

  return Post;
};
