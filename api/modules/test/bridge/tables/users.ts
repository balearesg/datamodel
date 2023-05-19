import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsersAttributes {
  id: number;
  graphId?: string;
  name?: string;
  lastname?: string;
  email?: string;
  profileImage?: number;
  timeCreated?: string;
  timeUpdated?: string;
  timeInserted?: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "graphId" | "name" | "lastname" | "email" | "profileImage" | "timeCreated" | "timeUpdated" | "timeInserted";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  graphId?: string;
  name?: string;
  lastname?: string;
  email?: string;
  profileImage?: number;
  timeCreated?: string;
  timeUpdated?: string;
  timeInserted?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
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
    lastname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    profileImage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'profile_image'
    },
    timeCreated: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'time_created'
    },
    timeUpdated: {
      type: DataTypes.STRING(100),
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
    tableName: 'users',
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
