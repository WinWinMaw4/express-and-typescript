import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ContactAttributes {
  id: number;
  country_code: string;
  city: string;
  state?: string;
  country: string;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ContactCreationAttributes = Optional<ContactAttributes, "id">;

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: number;
  public country_code!: string;
  public city!: string;
  public state?: string;
  public country!: string;
  public phone!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contact.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    country_code: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Contact",
    tableName: "contacts",
    timestamps: true,
    freezeTableName: true, // exact table name
  }
);

export default Contact;
