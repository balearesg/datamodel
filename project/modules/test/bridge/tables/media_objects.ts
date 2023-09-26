import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { PosDataMediaObjects, PosDataMediaObjectsId } from './pos_data_media_objects';

export interface MediaObjectsAttributes {
  id: number;
  posId?: number;
  entity?: string;
  directory?: string;
  mediaType?: number;
  cover?: number;
  intern?: number;
  languageId?: string;
  metaData?: string;
  description?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;
}

export type MediaObjectsPk = "id";
export type MediaObjectsId = MediaObjects[MediaObjectsPk];
export type MediaObjectsOptionalAttributes = "id" | "posId" | "entity" | "directory" | "mediaType" | "cover" | "intern" | "languageId" | "metaData" | "description" | "timeCreated" | "timeUpdated" | "creatorUserId" | "modifierUserId";
export type MediaObjectsCreationAttributes = Optional<MediaObjectsAttributes, MediaObjectsOptionalAttributes>;

export class MediaObjects extends Model<MediaObjectsAttributes, MediaObjectsCreationAttributes> implements MediaObjectsAttributes {
  id!: number;
  posId?: number;
  entity?: string;
  directory?: string;
  mediaType?: number;
  cover?: number;
  intern?: number;
  languageId?: string;
  metaData?: string;
  description?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  creatorUserId?: number;
  modifierUserId?: number;

  // MediaObjects hasMany PosDataMediaObjects via mediaObjectId
  posDataMediaObjects!: PosDataMediaObjects[];
  getPosDataMediaObjects!: Sequelize.HasManyGetAssociationsMixin<PosDataMediaObjects>;
  setPosDataMediaObjects!: Sequelize.HasManySetAssociationsMixin<PosDataMediaObjects, PosDataMediaObjectsId>;
  addPosDataMediaObject!: Sequelize.HasManyAddAssociationMixin<PosDataMediaObjects, PosDataMediaObjectsId>;
  addPosDataMediaObjects!: Sequelize.HasManyAddAssociationsMixin<PosDataMediaObjects, PosDataMediaObjectsId>;
  createPosDataMediaObject!: Sequelize.HasManyCreateAssociationMixin<PosDataMediaObjects>;
  removePosDataMediaObject!: Sequelize.HasManyRemoveAssociationMixin<PosDataMediaObjects, PosDataMediaObjectsId>;
  removePosDataMediaObjects!: Sequelize.HasManyRemoveAssociationsMixin<PosDataMediaObjects, PosDataMediaObjectsId>;
  hasPosDataMediaObject!: Sequelize.HasManyHasAssociationMixin<PosDataMediaObjects, PosDataMediaObjectsId>;
  hasPosDataMediaObjects!: Sequelize.HasManyHasAssociationsMixin<PosDataMediaObjects, PosDataMediaObjectsId>;
  countPosDataMediaObjects!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof MediaObjects {
    return MediaObjects.init({
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
    entity: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    directory: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mediaType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'media_type'
    },
    cover: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    intern: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    languageId: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'language_id'
    },
    metaData: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'meta_data'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'media_objects',
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
