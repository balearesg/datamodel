import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ChainsAttributes {
  id: number;
  name?: string;
  businessName?: string;
  timeCreated?: string;
  timeUpdated?: string;
  timeInserted?: Date;
}

export type ChainsPk = "id";
export type ChainsId = Chains[ChainsPk];
export type ChainsOptionalAttributes = "id" | "name" | "businessName" | "timeCreated" | "timeUpdated" | "timeInserted";
export type ChainsCreationAttributes = Optional<ChainsAttributes, ChainsOptionalAttributes>;

export class Chains extends Model<ChainsAttributes, ChainsCreationAttributes> implements ChainsAttributes {
  id!: number;
  name?: string;
  businessName?: string;
  timeCreated?: string;
  timeUpdated?: string;
  timeInserted?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Chains {
    return Chains.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    businessName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'business_name'
    },
    timeCreated: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'time_created'
    },
    timeUpdated: {
      type: DataTypes.TEXT,
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
    tableName: 'chains',
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
