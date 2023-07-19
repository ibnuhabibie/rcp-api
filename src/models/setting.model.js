import { Model, Sequelize } from 'sequelize';

export default function (sequelize) {
  class Setting extends Model {}

  Setting.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      value: {
        type: Sequelize.TEXT('long'),
        get() {
          const type = this.getDataValue('type');
          const rawValue = this.getDataValue('value');

          switch (type) {
            case 'STRING':
              return rawValue;
            case 'BOOLEAN':
              return rawValue === '1';
            case 'INTEGER':
              return parseInt(rawValue);
            case 'JSON':
              return JSON.parse(rawValue);
          }
        },
      },
      type: Sequelize.ENUM('STRING', 'JSON', 'BOOLEAN', 'INTEGER'),
      section: Sequelize.ENUM('GENERAL', 'COIN'),
    },
    {
      sequelize,
      tableName: 'settings',
      modelName: 'Setting',
      underscored: true,
    }
  );

  return Setting;
}
