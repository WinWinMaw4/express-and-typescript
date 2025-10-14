import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Blog extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare coverImage: string | null;
  declare slug: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Blog.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    coverImage: { type: DataTypes.STRING, allowNull: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, modelName: "Blog" }
);

export default Blog;
