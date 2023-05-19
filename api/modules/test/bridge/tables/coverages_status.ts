import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CoveragesHistory, CoveragesHistoryId } from './coverages_history';

export interface CoveragesStatusAttributes {
  coverageStatusId: number;
  coverageStatus?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type CoveragesStatusPk = "coverageStatusId";
export type CoveragesStatusId = CoveragesStatus[CoveragesStatusPk];
export type CoveragesStatusOptionalAttributes = "coverageStatusId" | "coverageStatus" | "timeCreated" | "timeUpdated";
export type CoveragesStatusCreationAttributes = Optional<CoveragesStatusAttributes, CoveragesStatusOptionalAttributes>;

export class CoveragesStatus extends Model<CoveragesStatusAttributes, CoveragesStatusCreationAttributes> implements CoveragesStatusAttributes {
  coverageStatusId!: number;
  coverageStatus?: string;
  timeCreated?: Date;
  timeUpdated?: Date;

  // CoveragesStatus hasMany CoveragesHistory via coverageStatus
  coveragesHistories!: CoveragesHistory[];
  getCoveragesHistories!: Sequelize.HasManyGetAssociationsMixin<CoveragesHistory>;
  setCoveragesHistories!: Sequelize.HasManySetAssociationsMixin<CoveragesHistory, CoveragesHistoryId>;
  addCoveragesHistory!: Sequelize.HasManyAddAssociationMixin<CoveragesHistory, CoveragesHistoryId>;
  addCoveragesHistories!: Sequelize.HasManyAddAssociationsMixin<CoveragesHistory, CoveragesHistoryId>;
  createCoveragesHistory!: Sequelize.HasManyCreateAssociationMixin<CoveragesHistory>;
  removeCoveragesHistory!: Sequelize.HasManyRemoveAssociationMixin<CoveragesHistory, CoveragesHistoryId>;
  removeCoveragesHistories!: Sequelize.HasManyRemoveAssociationsMixin<CoveragesHistory, CoveragesHistoryId>;
  hasCoveragesHistory!: Sequelize.HasManyHasAssociationMixin<CoveragesHistory, CoveragesHistoryId>;
  hasCoveragesHistories!: Sequelize.HasManyHasAssociationsMixin<CoveragesHistory, CoveragesHistoryId>;
  countCoveragesHistories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof CoveragesStatus {
    return CoveragesStatus.init({
    coverageStatusId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'coverage_status_id'
    },
    coverageStatus: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'coverage_status'
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
    tableName: 'coverages_status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "coverage_status_id" },
        ]
      },
    ]
  });
  }
}
