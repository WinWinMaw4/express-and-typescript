import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Package extends Model {
  public id!: number;
  public title!: string;
  public price!: number;
  public description!: string;
  public coverImage!: string | null;
}

Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Package",
    tableName: "packages",
  }
);

export default Package;
