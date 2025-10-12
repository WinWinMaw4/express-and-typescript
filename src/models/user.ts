// src/models/User.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

export interface UserAttributes {
  id: number;
  name: string;       // <- add this
  email: string;
  password: string;
  role: 'admin';
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public name!: string;    // <- add this
  public email!: string;
  public password!: string;
  public role!: 'admin';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "Admin", // optional: default if you want
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin'),
      allowNull: false,
      defaultValue: 'admin',
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

export default User;
