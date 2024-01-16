import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SurveysSkusAttributes {
  id: number;
  outstanding?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  modifierUserId?: number;
  skuId?: number;
  surveyId?: number;
}

export type SurveysSkusPk = "id";
export type SurveysSkusId = SurveysSkus[SurveysSkusPk];
export type SurveysSkusOptionalAttributes = "id" | "outstanding" | "timeCreated" | "timeUpdated" | "modifierUserId" | "skuId" | "surveyId";
export type SurveysSkusCreationAttributes = Optional<SurveysSkusAttributes, SurveysSkusOptionalAttributes>;

export class SurveysSkus extends Model<SurveysSkusAttributes, SurveysSkusCreationAttributes> implements SurveysSkusAttributes {
  id!: number;
  outstanding?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  modifierUserId?: number;
  skuId?: number;
  surveyId?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof SurveysSkus {
    return SurveysSkus.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    outstanding: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "0=no destacado, 1=destacado"
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
    modifierUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'modifier_user_id'
    },
    skuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'sku_id'
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'survey_id'
    }
  }, {
    sequelize,
    tableName: 'surveys_skus',
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
