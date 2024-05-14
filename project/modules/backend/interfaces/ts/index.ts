import {Model, FindOptions, DestroyOptions, CreateOptions, UpdateOptions, BulkCreateOptions} from "sequelize";
export /*bundle*/ interface IParams {
	[key: string]: any;
}
export /*bundle*/ interface IModel {
	findAll(options?: FindOptions<Model["_attributes"]>): Promise<Model[]>;
	count(options?: FindOptions<Model["_attributes"]>): Promise<Model[]>;
	findOne(options?: FindOptions<Model["_attributes"]>): Promise<Model | null>;
	destroy(options?: DestroyOptions<Model["_attributes"]>): Promise<number>;
	create(values?: Model["_creationAttributes"], options?: CreateOptions<Model["_attributes"]>): Promise<Model>;
	update(
		values: Partial<Model["_attributes"]>,
		options: UpdateOptions<Model["_attributes"]>
	): Promise<[number, Model[]]>;
	bulkCreate(
		records: Model["_creationAttributes"][],
		options?: BulkCreateOptions<Model["_attributes"]>
	): Promise<Model[]>;
	rawAttributes: Record<string, unknown>;
}
export /*bundle*/ type TRecord = Record<string, unknown>;
