import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db"; // your Sequelize instance

interface BannerAttributes {
  id: number;
  link: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type BannerCreationAttributes = Optional<BannerAttributes, "id">;

class Banner extends Model<BannerAttributes, BannerCreationAttributes>
  implements BannerAttributes {
  public id!: number;
  public link!: string;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Banner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Banner",
    tableName: "Banners",
  }
);

export default Banner;
