import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PosStatusAttributes {
  posStatusId: number;
  posStatus?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type PosStatusPk = "posStatusId";
export type PosStatusId = PosStatus[PosStatusPk];
export type PosStatusOptionalAttributes = "posStatusId" | "posStatus" | "timeCreated" | "timeUpdated";
export type PosStatusCreationAttributes = Optional<PosStatusAttributes, PosStatusOptionalAttributes>;

export class PosStatus extends Model<PosStatusAttributes, PosStatusCreationAttributes> implements PosStatusAttributes {
  posStatusId!: number;
  posStatus?: string;
  timeCreated?: Date;
  timeUpdated?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof PosStatus {
    return PosStatus.init({
    posStatusId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'pos_status_id'
    },
    posStatus: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'pos_status'
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
    tableName: 'pos_status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pos_status_id" },
        ]
      },
    ]
  });
  }
}
