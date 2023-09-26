import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Status, StatusId } from './status';

export interface SurveysHistoryAttributes {
  id: number;
  surveyId?: string;
  questionsAnswers?: object;
  posId?: string;
  userId?: string;
  lat?: string;
  lng?: string;
  status?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
  instanceId?: string;
  newPosId?: number;
  newUserId?: number;
  newSurveyId?: number;
}

export type SurveysHistoryPk = "id";
export type SurveysHistoryId = SurveysHistory[SurveysHistoryPk];
export type SurveysHistoryOptionalAttributes = "id" | "surveyId" | "questionsAnswers" | "posId" | "userId" | "lat" | "lng" | "status" | "timeCreated" | "timeUpdated" | "creatorUserId" | "modifierUserId" | "instanceId" | "newPosId" | "newUserId" | "newSurveyId";
export type SurveysHistoryCreationAttributes = Optional<SurveysHistoryAttributes, SurveysHistoryOptionalAttributes>;

export class SurveysHistory extends Model<SurveysHistoryAttributes, SurveysHistoryCreationAttributes> implements SurveysHistoryAttributes {
  id!: number;
  surveyId?: string;
  questionsAnswers?: object;
  posId?: string;
  userId?: string;
  lat?: string;
  lng?: string;
  status?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
  instanceId?: string;
  newPosId?: number;
  newUserId?: number;
  newSurveyId?: number;

  // SurveysHistory belongsTo Status via status
  statusStatus!: Status;
  getStatusStatus!: Sequelize.BelongsToGetAssociationMixin<Status>;
  setStatusStatus!: Sequelize.BelongsToSetAssociationMixin<Status, StatusId>;
  createStatusStatus!: Sequelize.BelongsToCreateAssociationMixin<Status>;

  static initModel(sequelize: Sequelize.Sequelize): typeof SurveysHistory {
    return SurveysHistory.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    surveyId: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'survey_id'
    },
    questionsAnswers: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'questions_answers'
    },
    posId: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'pos_id'
    },
    userId: {
      type: DataTypes.STRING(24),
      allowNull: true,
      field: 'user_id'
    },
    lat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lng: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'status',
        key: 'status_id'
      }
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
    instanceId: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: 'instance_id'
    },
    newPosId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'new_pos_id'
    },
    newUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'new_user_id'
    },
    newSurveyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'new_survey_id'
    }
  }, {
    sequelize,
    tableName: 'surveys_history',
    hasTrigger: true,
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
        name: "fk_status_surveys_history_idx",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "idx_survey_id_sur",
        using: "BTREE",
        fields: [
          { name: "survey_id" },
        ]
      },
      {
        name: "idx_pos_id_surv",
        using: "BTREE",
        fields: [
          { name: "pos_id" },
        ]
      },
      {
        name: "idx_user_id_surv",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "idx_time_created",
        using: "BTREE",
        fields: [
          { name: "time_created" },
        ]
      },
      {
        name: "idx_time_updated",
        using: "BTREE",
        fields: [
          { name: "time_updated" },
        ]
      },
    ]
  });
  }
}
