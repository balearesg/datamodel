import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StatusHaveAttributes {
  id: number;
  status?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
}

export type StatusHavePk = "id";
export type StatusHaveId = StatusHave[StatusHavePk];
export type StatusHaveOptionalAttributes = "id" | "status" | "timeCreated" | "timeUpdated" | "creatorUserId" | "modifierUserId";
export type StatusHaveCreationAttributes = Optional<StatusHaveAttributes, StatusHaveOptionalAttributes>;

export class StatusHave extends Model<StatusHaveAttributes, StatusHaveCreationAttributes> implements StatusHaveAttributes {
  id!: number;
  status?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof StatusHave {
    return StatusHave.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
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
    tableName: 'status_have',
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
