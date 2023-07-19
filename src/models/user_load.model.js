import { Model, Sequelize } from 'sequelize';

export default function (sequelize) {
  class UserLoad extends Model {
    static associate(models) {
      UserLoad.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      UserLoad.belongsTo(models.Project, {
        foreignKey: 'project_id',
        as: 'project',
      });
    }
  }

  UserLoad.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      batch: Sequelize.STRING,
      assigned_hour: Sequelize.INTEGER,
      date: Sequelize.DATEONLY,
    },
    {
      sequelize,
      tableName: 'user_loads',
      modelName: 'UserLoad',
      underscored: true,
      timestamps: false,
    }
  );

  return UserLoad;
}
