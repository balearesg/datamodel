import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LastSurveysCoveragesAttributes {
  id: number;
  posId?: number;
  userId?: number;
  surveyId?: number;
  status?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type LastSurveysCoveragesPk = "id";
export type LastSurveysCoveragesId = LastSurveysCoverages[LastSurveysCoveragesPk];
export type LastSurveysCoveragesOptionalAttributes = "id" | "posId" | "userId" | "surveyId" | "status" | "timeCreated" | "timeUpdated";
export type LastSurveysCoveragesCreationAttributes = Optional<LastSurveysCoveragesAttributes, LastSurveysCoveragesOptionalAttributes>;

export class LastSurveysCoverages extends Model<LastSurveysCoveragesAttributes, LastSurveysCoveragesCreationAttributes> implements LastSurveysCoveragesAttributes {
  id!: number;
  posId?: number;
  userId?: number;
  surveyId?: number;
  status?: number;
  timeCreated?: Date;
  timeUpdated?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof LastSurveysCoverages {
    return LastSurveysCoverages.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    posId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'pos_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id'
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'survey_id'
    },
    status: {
      type: DataTypes.INTEGER,
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
    tableName: 'last_surveys_coverages',
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
