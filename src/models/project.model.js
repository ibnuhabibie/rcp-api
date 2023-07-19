import { Model, Sequelize } from 'sequelize';

export default function (sequelize) {
  class Project extends Model {
    static associate(models) {}
  }

  Project.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      pic: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'projects',
      modelName: 'Project',
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  return Project;
}
