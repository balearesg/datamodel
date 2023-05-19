import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { SurveysHistory, SurveysHistoryId } from './surveys_history';

export interface StatusAttributes {
  statusId: number;
  status?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type StatusPk = "statusId";
export type StatusId = Status[StatusPk];
export type StatusOptionalAttributes = "statusId" | "status" | "timeCreated" | "timeUpdated";
export type StatusCreationAttributes = Optional<StatusAttributes, StatusOptionalAttributes>;

export class Status extends Model<StatusAttributes, StatusCreationAttributes> implements StatusAttributes {
  statusId!: number;
  status?: string;
  timeCreated?: Date;
  timeUpdated?: Date;

  // Status hasMany SurveysHistory via status
  surveysHistories!: SurveysHistory[];
  getSurveysHistories!: Sequelize.HasManyGetAssociationsMixin<SurveysHistory>;
  setSurveysHistories!: Sequelize.HasManySetAssociationsMixin<SurveysHistory, SurveysHistoryId>;
  addSurveysHistory!: Sequelize.HasManyAddAssociationMixin<SurveysHistory, SurveysHistoryId>;
  addSurveysHistories!: Sequelize.HasManyAddAssociationsMixin<SurveysHistory, SurveysHistoryId>;
  createSurveysHistory!: Sequelize.HasManyCreateAssociationMixin<SurveysHistory>;
  removeSurveysHistory!: Sequelize.HasManyRemoveAssociationMixin<SurveysHistory, SurveysHistoryId>;
  removeSurveysHistories!: Sequelize.HasManyRemoveAssociationsMixin<SurveysHistory, SurveysHistoryId>;
  hasSurveysHistory!: Sequelize.HasManyHasAssociationMixin<SurveysHistory, SurveysHistoryId>;
  hasSurveysHistories!: Sequelize.HasManyHasAssociationsMixin<SurveysHistory, SurveysHistoryId>;
  countSurveysHistories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Status {
    return Status.init({
    statusId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'status_id'
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
    }
  }, {
    sequelize,
    tableName: 'status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
    ]
  });
  }
}
