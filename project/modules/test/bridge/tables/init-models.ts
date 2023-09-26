import type { Sequelize } from "sequelize";
import { AdditionalsDistributors as _AdditionalsDistributors } from "./additionals_distributors";
import type { AdditionalsDistributorsAttributes, AdditionalsDistributorsCreationAttributes } from "./additionals_distributors";
import { Brands as _Brands } from "./brands";
import type { BrandsAttributes, BrandsCreationAttributes } from "./brands";
import { Chains as _Chains } from "./chains";
import type { ChainsAttributes, ChainsCreationAttributes } from "./chains";
import { Companies as _Companies } from "./companies";
import type { CompaniesAttributes, CompaniesCreationAttributes } from "./companies";
import { CoveragesHistory as _CoveragesHistory } from "./coverages_history";
import type { CoveragesHistoryAttributes, CoveragesHistoryCreationAttributes } from "./coverages_history";
import { CoveragesStatus as _CoveragesStatus } from "./coverages_status";
import type { CoveragesStatusAttributes, CoveragesStatusCreationAttributes } from "./coverages_status";
import { Distributors as _Distributors } from "./distributors";
import type { DistributorsAttributes, DistributorsCreationAttributes } from "./distributors";
import { LastSurveysCoverages as _LastSurveysCoverages } from "./last_surveys_coverages";
import type { LastSurveysCoveragesAttributes, LastSurveysCoveragesCreationAttributes } from "./last_surveys_coverages";
import { MediaObjects as _MediaObjects } from "./media_objects";
import type { MediaObjectsAttributes, MediaObjectsCreationAttributes } from "./media_objects";
import { OutstandingSkusNames as _OutstandingSkusNames } from "./outstanding_skus_names";
import type { OutstandingSkusNamesAttributes, OutstandingSkusNamesCreationAttributes } from "./outstanding_skus_names";
import { PosData as _PosData } from "./pos_data";
import type { PosDataAttributes, PosDataCreationAttributes } from "./pos_data";
import { PosDataMediaObjects as _PosDataMediaObjects } from "./pos_data_media_objects";
import type { PosDataMediaObjectsAttributes, PosDataMediaObjectsCreationAttributes } from "./pos_data_media_objects";
import { PosStatus as _PosStatus } from "./pos_status";
import type { PosStatusAttributes, PosStatusCreationAttributes } from "./pos_status";
import { ProductTypes as _ProductTypes } from "./product_types";
import type { ProductTypesAttributes, ProductTypesCreationAttributes } from "./product_types";
import { Skus as _Skus } from "./skus";
import type { SkusAttributes, SkusCreationAttributes } from "./skus";
import { Status as _Status } from "./status";
import type { StatusAttributes, StatusCreationAttributes } from "./status";
import { StatusHave as _StatusHave } from "./status_have";
import type { StatusHaveAttributes, StatusHaveCreationAttributes } from "./status_have";
import { Surveys as _Surveys } from "./surveys";
import type { SurveysAttributes, SurveysCreationAttributes } from "./surveys";
import { SurveysHistory as _SurveysHistory } from "./surveys_history";
import type { SurveysHistoryAttributes, SurveysHistoryCreationAttributes } from "./surveys_history";
import { SurveysSkus as _SurveysSkus } from "./surveys_skus";
import type { SurveysSkusAttributes, SurveysSkusCreationAttributes } from "./surveys_skus";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";
import { WhyNotQuestionsOptions as _WhyNotQuestionsOptions } from "./why_not_questions_options";
import type { WhyNotQuestionsOptionsAttributes, WhyNotQuestionsOptionsCreationAttributes } from "./why_not_questions_options";

export {
  _AdditionalsDistributors as AdditionalsDistributors,
  _Brands as Brands,
  _Chains as Chains,
  _Companies as Companies,
  _CoveragesHistory as CoveragesHistory,
  _CoveragesStatus as CoveragesStatus,
  _Distributors as Distributors,
  _LastSurveysCoverages as LastSurveysCoverages,
  _MediaObjects as MediaObjects,
  _OutstandingSkusNames as OutstandingSkusNames,
  _PosData as PosData,
  _PosDataMediaObjects as PosDataMediaObjects,
  _PosStatus as PosStatus,
  _ProductTypes as ProductTypes,
  _Skus as Skus,
  _Status as Status,
  _StatusHave as StatusHave,
  _Surveys as Surveys,
  _SurveysHistory as SurveysHistory,
  _SurveysSkus as SurveysSkus,
  _Users as Users,
  _WhyNotQuestionsOptions as WhyNotQuestionsOptions,
};

export type {
  AdditionalsDistributorsAttributes,
  AdditionalsDistributorsCreationAttributes,
  BrandsAttributes,
  BrandsCreationAttributes,
  ChainsAttributes,
  ChainsCreationAttributes,
  CompaniesAttributes,
  CompaniesCreationAttributes,
  CoveragesHistoryAttributes,
  CoveragesHistoryCreationAttributes,
  CoveragesStatusAttributes,
  CoveragesStatusCreationAttributes,
  DistributorsAttributes,
  DistributorsCreationAttributes,
  LastSurveysCoveragesAttributes,
  LastSurveysCoveragesCreationAttributes,
  MediaObjectsAttributes,
  MediaObjectsCreationAttributes,
  OutstandingSkusNamesAttributes,
  OutstandingSkusNamesCreationAttributes,
  PosDataAttributes,
  PosDataCreationAttributes,
  PosDataMediaObjectsAttributes,
  PosDataMediaObjectsCreationAttributes,
  PosStatusAttributes,
  PosStatusCreationAttributes,
  ProductTypesAttributes,
  ProductTypesCreationAttributes,
  SkusAttributes,
  SkusCreationAttributes,
  StatusAttributes,
  StatusCreationAttributes,
  StatusHaveAttributes,
  StatusHaveCreationAttributes,
  SurveysAttributes,
  SurveysCreationAttributes,
  SurveysHistoryAttributes,
  SurveysHistoryCreationAttributes,
  SurveysSkusAttributes,
  SurveysSkusCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
  WhyNotQuestionsOptionsAttributes,
  WhyNotQuestionsOptionsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const AdditionalsDistributors = _AdditionalsDistributors.initModel(sequelize);
  const Brands = _Brands.initModel(sequelize);
  const Chains = _Chains.initModel(sequelize);
  const Companies = _Companies.initModel(sequelize);
  const CoveragesHistory = _CoveragesHistory.initModel(sequelize);
  const CoveragesStatus = _CoveragesStatus.initModel(sequelize);
  const Distributors = _Distributors.initModel(sequelize);
  const LastSurveysCoverages = _LastSurveysCoverages.initModel(sequelize);
  const MediaObjects = _MediaObjects.initModel(sequelize);
  const OutstandingSkusNames = _OutstandingSkusNames.initModel(sequelize);
  const PosData = _PosData.initModel(sequelize);
  const PosDataMediaObjects = _PosDataMediaObjects.initModel(sequelize);
  const PosStatus = _PosStatus.initModel(sequelize);
  const ProductTypes = _ProductTypes.initModel(sequelize);
  const Skus = _Skus.initModel(sequelize);
  const Status = _Status.initModel(sequelize);
  const StatusHave = _StatusHave.initModel(sequelize);
  const Surveys = _Surveys.initModel(sequelize);
  const SurveysHistory = _SurveysHistory.initModel(sequelize);
  const SurveysSkus = _SurveysSkus.initModel(sequelize);
  const Users = _Users.initModel(sequelize);
  const WhyNotQuestionsOptions = _WhyNotQuestionsOptions.initModel(sequelize);

  CoveragesHistory.belongsTo(CoveragesStatus, { as: "coverageStatusCoveragesStatus", foreignKey: "coverageStatus"});
  CoveragesStatus.hasMany(CoveragesHistory, { as: "coveragesHistories", foreignKey: "coverageStatus"});
  PosDataMediaObjects.belongsTo(MediaObjects, { as: "mediaObject", foreignKey: "mediaObjectId"});
  MediaObjects.hasMany(PosDataMediaObjects, { as: "posDataMediaObjects", foreignKey: "mediaObjectId"});
  PosDataMediaObjects.belongsTo(PosData, { as: "po", foreignKey: "posId"});
  PosData.hasMany(PosDataMediaObjects, { as: "posDataMediaObjects", foreignKey: "posId"});
  SurveysHistory.belongsTo(Status, { as: "statusStatus", foreignKey: "status"});
  Status.hasMany(SurveysHistory, { as: "surveysHistories", foreignKey: "status"});

  return {
    AdditionalsDistributors: AdditionalsDistributors,
    Brands: Brands,
    Chains: Chains,
    Companies: Companies,
    CoveragesHistory: CoveragesHistory,
    CoveragesStatus: CoveragesStatus,
    Distributors: Distributors,
    LastSurveysCoverages: LastSurveysCoverages,
    MediaObjects: MediaObjects,
    OutstandingSkusNames: OutstandingSkusNames,
    PosData: PosData,
    PosDataMediaObjects: PosDataMediaObjects,
    PosStatus: PosStatus,
    ProductTypes: ProductTypes,
    Skus: Skus,
    Status: Status,
    StatusHave: StatusHave,
    Surveys: Surveys,
    SurveysHistory: SurveysHistory,
    SurveysSkus: SurveysSkus,
    Users: Users,
    WhyNotQuestionsOptions: WhyNotQuestionsOptions,
  };
}
