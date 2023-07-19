import { Model, Sequelize } from 'sequelize';

export default function (sequelize) {
  class Role extends Model {
    static associate(models) {}
  }

  Role.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'roles',
      modelName: 'Role',
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  return Role;
}
