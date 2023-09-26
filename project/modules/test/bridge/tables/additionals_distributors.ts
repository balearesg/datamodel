import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AdditionalsDistributorsAttributes {
  id: number;
  graphId?: string;
  name?: string;
  phone?: string;
  containerId?: string;
  companyId?: number;
  timeCreated?: Date;
  timeUpdated?: string;
  timeInserted?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
}

export type AdditionalsDistributorsPk = "id";
export type AdditionalsDistributorsId = AdditionalsDistributors[AdditionalsDistributorsPk];
export type AdditionalsDistributorsOptionalAttributes = "id" | "graphId" | "name" | "phone" | "containerId" | "companyId" | "timeCreated" | "timeUpdated" | "timeInserted" | "creatorUserId" | "modifierUserId";
export type AdditionalsDistributorsCreationAttributes = Optional<AdditionalsDistributorsAttributes, AdditionalsDistributorsOptionalAttributes>;

export class AdditionalsDistributors extends Model<AdditionalsDistributorsAttributes, AdditionalsDistributorsCreationAttributes> implements AdditionalsDistributorsAttributes {
  id!: number;
  graphId?: string;
  name?: string;
  phone?: string;
  containerId?: string;
  companyId?: number;
  timeCreated?: Date;
  timeUpdated?: string;
  timeInserted?: Date;
  creatorUserId?: number;
  modifierUserId?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof AdditionalsDistributors {
    return AdditionalsDistributors.init({
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
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    containerId: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'container_id'
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
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'time_updated'
    },
    timeInserted: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_inserted'
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
    }
  }, {
    sequelize,
    tableName: 'additionals_distributors',
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
