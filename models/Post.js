module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    GroupId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'UserId' });
    Post.belongsTo(models.Group, { foreignKey: 'GroupId' });
  };

  // Post.sync({ alter: true });

  return Post;
};
