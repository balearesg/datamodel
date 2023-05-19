import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SurveysAttributes {
  id: number;
  graphId?: string;
  name?: string;
  questions?: string;
  popQuestion?: string;
  productType?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
}

export type SurveysPk = "id";
export type SurveysId = Surveys[SurveysPk];
export type SurveysOptionalAttributes = "id" | "graphId" | "name" | "questions" | "popQuestion" | "productType" | "timeCreated" | "timeUpdated" | "creatorUserId" | "modifierUserId";
export type SurveysCreationAttributes = Optional<SurveysAttributes, SurveysOptionalAttributes>;

export class Surveys extends Model<SurveysAttributes, SurveysCreationAttributes> implements SurveysAttributes {
  id!: number;
  graphId?: string;
  name?: string;
  questions?: string;
  popQuestion?: string;
  productType?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Surveys {
    return Surveys.init({
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
    questions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    popQuestion: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'pop_question'
    },
    productType: {
      type: DataTypes.STRING(450),
      allowNull: true,
      field: 'product_type'
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
    }
  }, {
    sequelize,
    tableName: 'surveys',
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
        name: "graph_id_idx",
        using: "BTREE",
        fields: [
          { name: "graph_id" },
        ]
      },
    ]
  });
  }
}
