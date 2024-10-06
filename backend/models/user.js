import {DataTypes} from 'sequelize';
import sequelize from './index.js';

const User = sequelize.define (
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: DataTypes.ENUM ('user', 'admin'),
      defaultValue: 'user',
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: user => {
        if (user.email) {
          user.email = user.email.toLowerCase ();
        }
      },
      beforeUpdate: user => {
        if (user.email) {
          user.email = user.email.toLowerCase ();
        }
      },
    },
  }
);

export default User;
