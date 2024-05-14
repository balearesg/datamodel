import {Op, literal, Transaction, Model} from "sequelize";
import {response} from "@bgroup/data-model/response";
import {IParams, IModel} from "./interfaces/types";
import {OPERATORS_STRING, OPERATORS} from "./variables";
import {processFilters} from "./utils";
class Actions {
	_DEFAULT = {order: "timeCreated", limit: 30, start: 0, orderDesc: "desc"};
	get DEFAULT() {
		return this._DEFAULT;
	}

	set DEFAULT(value) {
		this._DEFAULT = value;
	}

	#OPERATORS_STRING = OPERATORS_STRING;
	get OPERATORS_STRING() {
		return this.#OPERATORS_STRING;
	}

	_OPERATORS = OPERATORS;

	get OPERATORS() {
		return this._OPERATORS;
	}

	_op: any = Op;
	get op() {
		return this._op;
	}

	list = async (model: IModel, params: IParams, target: string, transaction: Transaction = null) => {
		const limit = params?.limit ? parseInt(params.limit) : this._DEFAULT.limit;
		const offset = params?.start ? parseInt(params.start) : this._DEFAULT.start;
		// asc mean kind of order (DESC, ASC)
		const order = params?.order
			? [[params.order, params?.asc ?? "DESC"]]
			: [[this._DEFAULT.order, params?.asc ?? "DESC"]];

		delete params?.index;
		delete params?.accessToken;
		delete params?.asc;

		try {
			//   const filters = params?.filter ?? this.processFilters(model, params);
			const filters = params?.filter ?? processFilters(model, params?.where);
			const attributes = params?.attributes ?? Object.keys(model.rawAttributes);
			const specs: any = {
				attributes,
				order,
				offset,
				limit: limit + 1,
				where: filters,
			};
			if (params.include) specs.include = params.include;
			if (transaction) specs.transaction = params.transaction;

			const dataModel = await model.findAll(specs);
			const data = dataModel.map(item => item.get({plain: true}));

			const total = await model.count({where: filters, include: specs.include ?? undefined});

			return response.list(data, total, {limit, start: offset});
		} catch (exc) {
			console.error("error list", exc);
			return response.processError(exc, target);
		}
	};

	data = async (model: IModel, params: IParams, target: string, transaction: Transaction = null) => {
		try {
			const specs: any = {where: {id: params.id}};
			if (params.include) specs.include = params.include;
			if (transaction) specs.transaction = params.transaction;
			const dataModel = await model.findOne(specs);
			if (!dataModel) throw "RECORD_NOT_EXIST";

			const data = dataModel.get({plain: true});
			return response.data(data);
		} catch (exc) {
			return response.processError(exc, target);
		}
	};

	remove = async (model: IModel, {id}: IParams, target: string, transaction: Transaction = null) => {
		try {
			transaction ? await model.destroy({where: {id}, transaction}) : await model.destroy({where: {id}});
			return response.remove();
		} catch (error) {
			return response.processError(error, target);
		}
	};

	getValues = (model: IModel, params: IParams) => {
		const values = {};
		for (const field in params) {
			const isTime = field === "timeCreated" || field === "timeUpdated";
			if (model.rawAttributes.hasOwnProperty(field) && !isTime && params[field] !== null) {
				values[field] = params[field];
			}
		}
		return values;
	};

	create = async (model: IModel, params: IParams, target: string, transaction: Transaction = null) => {
		try {
			delete params.id;
			const values = this.getValues(model, params);

			const insert: any = transaction ? await model.create(values, {transaction}) : await model.create(values);
			return {status: true, data: {id: insert.id}};
		} catch (error) {
			return {status: false, error: {error, target}};
		}
	};

	update = async (model: IModel, params: IParams, target: string, transaction: Transaction = null) => {
		try {
			const id = params.id;
			delete params.id;
			const values = this.getValues(model, params);
			transaction
				? await model.update(values, {where: {id}, transaction})
				: await model.update(values, {where: {id}});
			return {status: true, data: {id}};
		} catch (error) {
			return {status: false, error: {error, target}};
		}
	};

	publish = async (model: IModel, params: IParams, target: string, transaction: Transaction = null) => {
		const isNew = params?.isNew || params.new || !params.id || typeof params.id === "string";
		const res = isNew
			? await this.create(model, params, target, transaction)
			: await this.update(model, params, target, transaction);

		return response.publish(res);
	};

	bulkSave = async (model: IModel, params: IParams, target: string, transaction: Transaction = null) => {
		if (!params.length) return {status: true, data: []};
		const fieldsModels = Object.keys(model.rawAttributes);
		const fieldsToTake = fieldsModels.filter(field => field !== "id");

		const objectsToCreate = params.filter(obj => !obj.id || (obj.id && typeof obj.id === "string"));
		const objectsToUpdate = params.filter(obj => obj.id && typeof obj.id === "number");

		try {
			// const promises = objectsToUpdate.map((obj) => this.update(model, obj, target));
			let updated: any = transaction
				? await model.bulkCreate(objectsToUpdate, {
						updateOnDuplicate: fieldsToTake,
						transaction,
				  })
				: await model.bulkCreate(objectsToUpdate, {
						updateOnDuplicate: fieldsToTake,
				  });
			updated = updated.map(obj => obj.get({plain: true}));
			const instancesIds = [];
			const toCreate = objectsToCreate.map(item => {
				instancesIds.push(item.id);
				delete item.id;
				return item;
			});
			const objectsCreated = await model.bulkCreate(toCreate);

			const objectsCreatedPlain = objectsCreated.map((obj: any, index: number) => {
				const record = obj.get({plain: true});
				record.__instanceId = instancesIds[index];
				return record;
			});

			const idsUpdated: IParams = updated.map(obj => obj.id);

			const records = await model.findAll({
				where: {
					id: idsUpdated,
				},
			});

			const data = records.map(record => record.get({plain: true}));

			const objects = objectsCreatedPlain.concat(data);

			return {status: true, data: {entries: objects}};
		} catch (error) {
			console.error("error bulk save", error);
			return response.processError(error, target);
		}
	};
}

export /*bundle*/
const actions = new Actions();
