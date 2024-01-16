import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OutstandingSkusNamesAttributes {
  outstandingSkuNameId: number;
  skuId?: any;
  skuName?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  newSkuId?: number;
}

export type OutstandingSkusNamesPk = "outstandingSkuNameId";
export type OutstandingSkusNamesId = OutstandingSkusNames[OutstandingSkusNamesPk];
export type OutstandingSkusNamesOptionalAttributes = "outstandingSkuNameId" | "skuId" | "skuName" | "timeCreated" | "timeUpdated" | "newSkuId";
export type OutstandingSkusNamesCreationAttributes = Optional<OutstandingSkusNamesAttributes, OutstandingSkusNamesOptionalAttributes>;

export class OutstandingSkusNames extends Model<OutstandingSkusNamesAttributes, OutstandingSkusNamesCreationAttributes> implements OutstandingSkusNamesAttributes {
  outstandingSkuNameId!: number;
  skuId?: any;
  skuName?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  newSkuId?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof OutstandingSkusNames {
    return OutstandingSkusNames.init({
    outstandingSkuNameId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'outstanding_sku_name_id'
    },
    skuId: {
      type: DataTypes.BLOB,
      allowNull: true,
      field: 'sku_id'
    },
    skuName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'sku_name'
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_created'
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_updated'
    },
    newSkuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'new_sku_id'
    }
  }, {
    sequelize,
    tableName: 'outstanding_skus_names',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "outstanding_sku_name_id" },
        ]
      },
    ]
  });
  }
}
