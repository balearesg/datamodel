import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { PosDataMediaObjects, PosDataMediaObjectsId } from './pos_data_media_objects';

export interface PosDataAttributes {
  id: number;
  graphId?: string;
  businessName?: string;
  applicationId?: string;
  cigarCase?: string;
  contact?: string;
  emailContact?: string;
  name?: string;
  phone?: string;
  status?: number;
  locality?: string;
  sublocality?: string;
  lat?: string;
  lng?: string;
  placeId?: string;
  formattedAddress?: string;
  country?: string;
  administrativeAreaLevel1?: string;
  administrativeAreaLevel2?: string;
  timeCreated?: Date;
  posImage?: number;
  timeUpdated?: string;
  timeInserted?: Date;
  haveEmail?: string;
  havePhone?: string;
  statusHave?: number;
  chainId?: number;
  distributorId?: number;
  ownerId?: number;
  active?: number;
}

export type PosDataPk = "id";
export type PosDataId = PosData[PosDataPk];
export type PosDataOptionalAttributes = "id" | "graphId" | "businessName" | "applicationId" | "cigarCase" | "contact" | "emailContact" | "name" | "phone" | "status" | "locality" | "sublocality" | "lat" | "lng" | "placeId" | "formattedAddress" | "country" | "administrativeAreaLevel1" | "administrativeAreaLevel2" | "timeCreated" | "posImage" | "timeUpdated" | "timeInserted" | "haveEmail" | "havePhone" | "statusHave" | "chainId" | "distributorId" | "ownerId" | "active";
export type PosDataCreationAttributes = Optional<PosDataAttributes, PosDataOptionalAttributes>;

export class PosData extends Model<PosDataAttributes, PosDataCreationAttributes> implements PosDataAttributes {
  id!: number;
  graphId?: string;
  businessName?: string;
  applicationId?: string;
  cigarCase?: string;
  contact?: string;
  emailContact?: string;
  name?: string;
  phone?: string;
  status?: number;
  locality?: string;
  sublocality?: string;
  lat?: string;
  lng?: string;
  placeId?: string;
  formattedAddress?: string;
  country?: string;
  administrativeAreaLevel1?: string;
  administrativeAreaLevel2?: string;
  timeCreated?: Date;
  posImage?: number;
  timeUpdated?: string;
  timeInserted?: Date;
  haveEmail?: string;
  havePhone?: string;
  statusHave?: number;
  chainId?: number;
  distributorId?: number;
  ownerId?: number;
  active?: number;

  // PosData hasMany PosDataMediaObjects via posId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof PosData {
    return PosData.init({
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
    businessName: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'business_name'
    },
    applicationId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'application_id'
    },
    cigarCase: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'cigar_case'
    },
    contact: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    emailContact: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'email_contact'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    locality: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sublocality: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lat: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    lng: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    placeId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'place_id'
    },
    formattedAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'formatted_address'
    },
    country: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    administrativeAreaLevel1: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'administrative_area_level_1'
    },
    administrativeAreaLevel2: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'administrative_area_level_2'
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_created'
    },
    posImage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'pos_image'
    },
    timeUpdated: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'time_updated'
    },
    timeInserted: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_inserted'
    },
    haveEmail: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'have_email'
    },
    havePhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'have_phone'
    },
    statusHave: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status_have'
    },
    chainId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'chain_id'
    },
    distributorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'distributor_id'
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'owner_id'
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pos_data',
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
        name: "graph_id",
        using: "BTREE",
        fields: [
          { name: "graph_id" },
        ]
      },
      {
        name: "id",
        using: "BTREE",
        fields: [
          { name: "id" },
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
        name: "time_inserted",
        using: "BTREE",
        fields: [
          { name: "time_inserted" },
        ]
      },
    ]
  });
  }
}
