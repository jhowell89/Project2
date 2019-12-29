module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
    name: DataTypes.STRING
  });
  Member.associate = function(models) {
    Member.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };
  return Member;
};
