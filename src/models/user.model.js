import { compare, genSalt, hash } from 'bcrypt';
import { Model, Sequelize } from 'sequelize';

import { generateToken } from '~/helpers';

export const STATUS = {
  1: 'ACTIVE',
  2: 'INACTIVE',
};

export default function (sequelize) {
  class User extends Model {
    generateToken(expiresIn = '90d') {
      const data = { id: this.id, email: this.email, type: 'user' };
      let token = generateToken(data, expiresIn);
      this.app_token = token;
    }

    validatePassword(plainPassword) {
      return compare(plainPassword, this.password);
    }

    async hashPassword(password) {
      return await hash(password, 10);
    }

    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    }
  }

  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      avatar: {
        type: Sequelize.STRING,
        get() {
          const name = this.getDataValue('name');
          const avatar = this.getDataValue('avatar');
          let placeholder = `https://ui-avatars.com/api?name=${encodeURIComponent(
            name
          )}`;

          return avatar
            ? `${S3_URL}${encodeURIComponent(avatar)}`
            : placeholder;
        },
      },
      role_id: Sequelize.INTEGER,
      app_token: Sequelize.STRING,
      status: Sequelize.TINYINT,
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      underscored: true,
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    }
  );

  return User;
}
