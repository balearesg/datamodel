import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CompaniesAttributes {
  id: number;
  businessName?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type CompaniesPk = "id";
export type CompaniesId = Companies[CompaniesPk];
export type CompaniesOptionalAttributes = "id" | "businessName" | "timeCreated" | "timeUpdated";
export type CompaniesCreationAttributes = Optional<CompaniesAttributes, CompaniesOptionalAttributes>;

export class Companies extends Model<CompaniesAttributes, CompaniesCreationAttributes> implements CompaniesAttributes {
  id!: number;
  businessName?: string;
  timeCreated?: Date;
  timeUpdated?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Companies {
    return Companies.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    businessName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'business_name'
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_created'
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_updated'
    }
  }, {
    sequelize,
    tableName: 'companies',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
