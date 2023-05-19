import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductTypesAttributes {
  id: number;
  name?: string;
  graphId?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
  timeInserted?: Date;
}

export type ProductTypesPk = "id";
export type ProductTypesId = ProductTypes[ProductTypesPk];
export type ProductTypesOptionalAttributes = "id" | "name" | "graphId" | "timeCreated" | "timeUpdated" | "creatorUserId" | "modifierUserId" | "timeInserted";
export type ProductTypesCreationAttributes = Optional<ProductTypesAttributes, ProductTypesOptionalAttributes>;

export class ProductTypes extends Model<ProductTypesAttributes, ProductTypesCreationAttributes> implements ProductTypesAttributes {
  id!: number;
  name?: string;
  graphId?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
  timeInserted?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof ProductTypes {
    return ProductTypes.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    graphId: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'graph_id'
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
    creatorUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'creator_user_id'
    },
    modifierUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'modifier_user_id'
    },
    timeInserted: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_inserted'
    }
  }, {
    sequelize,
    tableName: 'product_types',
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
