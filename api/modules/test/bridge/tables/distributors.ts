import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DistributorsAttributes {
  id: number;
  graphId?: string;
  businessName?: string;
  name?: string;
  phone?: string;
  companyId?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  timeInserted?: Date;
}

export type DistributorsPk = "id";
export type DistributorsId = Distributors[DistributorsPk];
export type DistributorsOptionalAttributes = "id" | "graphId" | "businessName" | "name" | "phone" | "companyId" | "timeCreated" | "timeUpdated" | "timeInserted";
export type DistributorsCreationAttributes = Optional<DistributorsAttributes, DistributorsOptionalAttributes>;

export class Distributors extends Model<DistributorsAttributes, DistributorsCreationAttributes> implements DistributorsAttributes {
  id!: number;
  graphId?: string;
  businessName?: string;
  name?: string;
  phone?: string;
  companyId?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  timeInserted?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Distributors {
    return Distributors.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    graphId: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'graph_id'
    },
    businessName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'business_name'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'company_id'
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
    },
    timeInserted: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_inserted'
    }
  }, {
    sequelize,
    tableName: 'distributors',
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
