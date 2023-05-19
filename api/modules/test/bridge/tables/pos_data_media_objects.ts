import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { MediaObjects, MediaObjectsId } from './media_objects';
import type { PosData, PosDataId } from './pos_data';

export interface PosDataMediaObjectsAttributes {
  id: number;
  posId?: number;
  mediaObjectId?: number;
  creatorUserId?: number;
  modifierUserId?: number;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type PosDataMediaObjectsPk = "id";
export type PosDataMediaObjectsId = PosDataMediaObjects[PosDataMediaObjectsPk];
export type PosDataMediaObjectsOptionalAttributes = "id" | "posId" | "mediaObjectId" | "creatorUserId" | "modifierUserId" | "timeCreated" | "timeUpdated";
export type PosDataMediaObjectsCreationAttributes = Optional<PosDataMediaObjectsAttributes, PosDataMediaObjectsOptionalAttributes>;

export class PosDataMediaObjects extends Model<PosDataMediaObjectsAttributes, PosDataMediaObjectsCreationAttributes> implements PosDataMediaObjectsAttributes {
  id!: number;
  posId?: number;
  mediaObjectId?: number;
  creatorUserId?: number;
  modifierUserId?: number;
  timeCreated?: Date;
  timeUpdated?: Date;

  // PosDataMediaObjects belongsTo MediaObjects via mediaObjectId
  mediaObject!: MediaObjects;
  getMediaObject!: Sequelize.BelongsToGetAssociationMixin<MediaObjects>;
  setMediaObject!: Sequelize.BelongsToSetAssociationMixin<MediaObjects, MediaObjectsId>;
  createMediaObject!: Sequelize.BelongsToCreateAssociationMixin<MediaObjects>;
  // PosDataMediaObjects belongsTo PosData via posId
  po!: PosData;
  getPo!: Sequelize.BelongsToGetAssociationMixin<PosData>;
  setPo!: Sequelize.BelongsToSetAssociationMixin<PosData, PosDataId>;
  createPo!: Sequelize.BelongsToCreateAssociationMixin<PosData>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PosDataMediaObjects {
    return PosDataMediaObjects.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    posId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pos_data',
        key: 'id'
      },
      field: 'pos_id'
    },
    mediaObjectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'media_objects',
        key: 'id'
      },
      field: 'media_object_id'
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
    tableName: 'pos_data_media_objects',
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
        name: "fk_pos_data_pos_d_m_o_idx",
        using: "BTREE",
        fields: [
          { name: "pos_id" },
        ]
      },
      {
        name: "fk_media_objects_p_d_m_o_idx",
        using: "BTREE",
        fields: [
          { name: "media_object_id" },
        ]
      },
    ]
  });
  }
}
