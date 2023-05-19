import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WhyNotQuestionsOptionsAttributes {
  whyNotQuestionOptionId: number;
  whyNotQuestionOption?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type WhyNotQuestionsOptionsPk = "whyNotQuestionOptionId";
export type WhyNotQuestionsOptionsId = WhyNotQuestionsOptions[WhyNotQuestionsOptionsPk];
export type WhyNotQuestionsOptionsOptionalAttributes = "whyNotQuestionOptionId" | "whyNotQuestionOption" | "timeCreated" | "timeUpdated";
export type WhyNotQuestionsOptionsCreationAttributes = Optional<WhyNotQuestionsOptionsAttributes, WhyNotQuestionsOptionsOptionalAttributes>;

export class WhyNotQuestionsOptions extends Model<WhyNotQuestionsOptionsAttributes, WhyNotQuestionsOptionsCreationAttributes> implements WhyNotQuestionsOptionsAttributes {
  whyNotQuestionOptionId!: number;
  whyNotQuestionOption?: string;
  timeCreated?: Date;
  timeUpdated?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof WhyNotQuestionsOptions {
    return WhyNotQuestionsOptions.init({
    whyNotQuestionOptionId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'why_not_question_option_id'
    },
    whyNotQuestionOption: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: 'why_not_question_option'
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
    }
  }, {
    sequelize,
    tableName: 'why_not_questions_options',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "why_not_question_option_id" },
        ]
      },
    ]
  });
  }
}
