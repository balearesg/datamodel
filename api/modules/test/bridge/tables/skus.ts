import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SkusAttributes {
  id: number;
  name?: string;
  units?: string;
  version?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  timeInserted?: Date;
  brandId?: string;
  nombre?: string;
  productTypeId?: number;
}

export type SkusPk = "id";
export type SkusId = Skus[SkusPk];
export type SkusOptionalAttributes = "id" | "name" | "units" | "version" | "timeCreated" | "timeUpdated" | "timeInserted" | "brandId" | "nombre" | "productTypeId";
export type SkusCreationAttributes = Optional<SkusAttributes, SkusOptionalAttributes>;

export class Skus extends Model<SkusAttributes, SkusCreationAttributes> implements SkusAttributes {
  id!: number;
  name?: string;
  units?: string;
  version?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  timeInserted?: Date;
  brandId?: string;
  nombre?: string;
  productTypeId?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Skus {
    return Skus.init({
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
    units: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    version: {
      type: DataTypes.STRING(80),
      allowNull: true
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
    timeInserted: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_inserted'
    },
    brandId: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'brand_id'
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    productTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'product_type_id'
    }
  }, {
    sequelize,
    tableName: 'skus',
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
