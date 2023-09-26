import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CoveragesStatus, CoveragesStatusId } from './coverages_status';

export interface CoveragesHistoryAttributes {
  id: number;
  posId?: number;
  surveyId?: number;
  skuId?: number;
  sellPrice?: number;
  buyPrice?: number;
  coverageStatus?: number;
  surveyHistoryId?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
  instanceId?: string;
}

export type CoveragesHistoryPk = "id";
export type CoveragesHistoryId = CoveragesHistory[CoveragesHistoryPk];
export type CoveragesHistoryOptionalAttributes = "id" | "posId" | "surveyId" | "skuId" | "sellPrice" | "buyPrice" | "coverageStatus" | "surveyHistoryId" | "timeCreated" | "timeUpdated" | "creatorUserId" | "modifierUserId" | "instanceId";
export type CoveragesHistoryCreationAttributes = Optional<CoveragesHistoryAttributes, CoveragesHistoryOptionalAttributes>;

export class CoveragesHistory extends Model<CoveragesHistoryAttributes, CoveragesHistoryCreationAttributes> implements CoveragesHistoryAttributes {
  id!: number;
  posId?: number;
  surveyId?: number;
  skuId?: number;
  sellPrice?: number;
  buyPrice?: number;
  coverageStatus?: number;
  surveyHistoryId?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
  instanceId?: string;

  // CoveragesHistory belongsTo CoveragesStatus via coverageStatus
  coverageStatusCoveragesStatus!: CoveragesStatus;
  getCoverageStatusCoveragesStatus!: Sequelize.BelongsToGetAssociationMixin<CoveragesStatus>;
  setCoverageStatusCoveragesStatus!: Sequelize.BelongsToSetAssociationMixin<CoveragesStatus, CoveragesStatusId>;
  createCoverageStatusCoveragesStatus!: Sequelize.BelongsToCreateAssociationMixin<CoveragesStatus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CoveragesHistory {
    return CoveragesHistory.init({
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
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'survey_id'
    },
    skuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'sku_id'
    },
    sellPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'sell_price'
    },
    buyPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'buy_price'
    },
    coverageStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'coverages_status',
        key: 'coverage_status_id'
      },
      field: 'coverage_status'
    },
    surveyHistoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'survey_history_id'
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
    }
  }, {
    sequelize,
    tableName: 'coverages_history',
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
        name: "fk_status_coverages_history_idx",
        using: "BTREE",
        fields: [
          { name: "coverage_status" },
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
        name: "survey_history_id",
        using: "BTREE",
        fields: [
          { name: "survey_history_id" },
        ]
      },
      {
        name: "coverages_status",
        using: "BTREE",
        fields: [
          { name: "coverage_status" },
        ]
      },
    ]
  });
  }
}
