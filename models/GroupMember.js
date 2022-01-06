module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    GroupId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  GroupMember.associate = (models) => {
    GroupMember.belongsTo(models.Group, { foreignKey: 'GroupId' });
    GroupMember.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  // GroupMember.sync({ alter: true });

  return GroupMember;
};
