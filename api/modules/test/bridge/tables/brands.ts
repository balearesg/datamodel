import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface BrandsAttributes {
  id: number;
  graphId?: string;
  nombre?: string;
  name?: string;
  companyId?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  timeInserted?: Date;
}

export type BrandsPk = "id";
export type BrandsId = Brands[BrandsPk];
export type BrandsOptionalAttributes = "id" | "graphId" | "nombre" | "name" | "companyId" | "timeCreated" | "timeUpdated" | "timeInserted";
export type BrandsCreationAttributes = Optional<BrandsAttributes, BrandsOptionalAttributes>;

export class Brands extends Model<BrandsAttributes, BrandsCreationAttributes> implements BrandsAttributes {
  id!: number;
  graphId?: string;
  nombre?: string;
  name?: string;
  companyId?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  timeInserted?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Brands {
    return Brands.init({
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
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(45),
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
    }
  }, {
    sequelize,
    tableName: 'brands',
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
      {
        name: "graph_id",
        using: "BTREE",
        fields: [
          { name: "graph_id" },
        ]
      },
      {
        name: "time_created",
        using: "BTREE",
        fields: [
          { name: "time_created" },
        ]
      },
      {
        name: "time_updated",
        using: "BTREE",
        fields: [
          { name: "time_updated" },
        ]
      },
      {
        name: "time_inserted",
        using: "BTREE",
        fields: [
          { name: "time_inserted" },
        ]
      },
    ]
  });
  }
}
