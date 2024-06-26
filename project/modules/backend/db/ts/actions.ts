import { Op, literal } from 'sequelize';
import { response } from '@bgroup/data-model/response';
import { IParams } from './interfaces/types';

class Actions {
	_DEFAULT = { order: 'timeCreated', limit: 30, start: 0, orderDesc: 'desc' };
	get DEFAULT() {
		return this._DEFAULT;
	}

	set DEFAULT(value) {
		this._DEFAULT = value;
	}

	#OPERATORS_STRING = {
		eq: '=',
		gt: '>',
		gte: '>=',
		lt: '<',
		lte: '<=',
		and: 'AND',
		or: 'OR',
		between: 'BETWEEN',
		like: 'LIKE',
		ne: '!=',
		notBetween: 'NOT BETWEEN',
		in: 'IN',
	};
	get OPERATORS_STRING() {
		return this.#OPERATORS_STRING;
	}

	_OPERATORS: any = Object.freeze({
		eq: Op.eq,
		gt: Op.gt,
		gte: Op.gte,
		lt: Op.lt,
		lte: Op.lte,
		and: Op.and,
		or: Op.or,
		between: Op.between,
		like: Op.substring,
		ne: Op.ne,
		notBetween: Op.notBetween,
		is: Op.is,
		in: Op.in,
		notIn: Op.notIn,
		iLike: Op.iLike,
		notILike: Op.notILike,
		notLike: Op.notLike,
		all: Op.all,
		any: Op.any,
	});

	get OPERATORS() {
		return this._OPERATORS;
	}

	_op: any = Op;
	get op() {
		return this._op;
	}

	#ArrayRegex = /^\[.*\]$/;

	isEmptyObject(value: IParams) {
		return Reflect.ownKeys(value).length === 0 && Object.keys(value).length === 0;
	}

	processValue(value: string | number, op: string) {
		return op === 'like' ? `'%${value}%'` : `'${value}'`;
	}

	processLiteral(filter: IParams, params: IParams, concatString: string) {
		const value = this.processValue(params.value, params.op);
		filter[actions.OPERATORS[params.op]] = literal(`${concatString} ${this.#OPERATORS_STRING[params.op]} ${value}`);
		return filter;
	}

	/* filter 'and' || 'or' to process items. Else set value in the field*/
	private processInternalAttributes = (model, where, fieldParent) => {
		const fields = {};
		if (fieldParent === 'and' || fieldParent === 'or') {
			const result = this.processValidations(model, where);
			return result;
		}
		for (const key in where) {
			const field = this.OPERATORS[key];
			fields[field] = where[key];
		}

		return fields;
	};

	private validIsArray = (value: string) => {
		return this.#ArrayRegex.test(value);
	};

	private processValidations = (model, where: IParams) => {
		const filters: object[] = [];

		where.forEach(elem => {
			const fields: object = {};
			const key = Object.keys(elem)[0];
			if (!model.rawAttributes.hasOwnProperty(key) && !this._OPERATORS.hasOwnProperty(key)) return;
			const fieldOrOperator = model.rawAttributes.hasOwnProperty(key) ? key : this._OPERATORS[key];
			let value =
				typeof elem[key] === 'object' && !Array.isArray(elem[key])
					? this.processInternalAttributes(model, elem[key], key)
					: Array.isArray(elem[key]) && (key === 'and' || key === 'or')
					? this.processInternalAttributes(model, elem[key], key)
					: elem[key];

			if (typeof value === 'string') {
				const op = this.validIsArray(value) ? 'in' : 'like';
				const newValue = this.validIsArray(value) ? JSON.parse(value) : value;
				value = { [this._OPERATORS[op]]: newValue };
			}
			fields[fieldOrOperator] = value;
			filters.push(fields);
		});

		return filters;
	};

	processFilters = (model, where: IParams) => {
		const filters = {};
		if (!where) return filters;
		for (const field in where) {
			if (!model.rawAttributes.hasOwnProperty(field) && !this.OPERATORS.hasOwnProperty(field)) continue;
			let fieldOrOperator = model.rawAttributes.hasOwnProperty(field) ? field : this.OPERATORS[field];
			let value =
				typeof where[field] === 'object' && !Array.isArray(where[field])
					? this.processInternalAttributes(model, where[field], field)
					: Array.isArray(where[field]) && (field === 'and' || field === 'or')
					? this.processInternalAttributes(model, where[field], field)
					: where[field];
			if (typeof value === 'string') {
				const op = this.validIsArray(value) ? 'in' : 'like';
				const newValue = this.validIsArray(value) ? JSON.parse(value) : value;
				value = { [this._OPERATORS[op]]: newValue };
			}
			filters[fieldOrOperator] = value;
		}

		return filters;
	};

	// collection

	list = async (model, params: IParams, target: string) => {
		const limit = params?.limit ? parseInt(params.limit) : this._DEFAULT.limit;
		const offset = params?.start ? parseInt(params.start) : this._DEFAULT.start;
		// asc mean kind of order (DESC, ASC)
		const order = params?.order
			? [[params.order, params?.asc ?? 'DESC']]
			: [[this._DEFAULT.order, params?.asc ?? 'DESC']];

		delete params?.index;
		delete params?.accessToken;
		delete params?.asc;

		try {
			//   const filters = params?.filter ?? this.processFilters(model, params);
			const filters = params?.filter ?? this.processFilters(model, params?.where);
			const attributes = params?.attributes ?? Object.keys(model.rawAttributes);
			const specs: any = {
				attributes,
				order,
				offset,
				limit: limit + 1,
				where: filters,
			};
			if (params.include) specs.include = params.include;

			const dataModel = await model.findAll(specs);
			const data = dataModel.map(item => item.get({ plain: true }));

			const total = await model.count({ where: filters, include: specs.include ?? undefined });

			return response.list(data, total, { limit, start: offset });
		} catch (exc) {
			console.error('error list', exc);
			return response.processError(exc, target);
		}
	};

	data = async (model, params, target: string) => {
		try {
			const specs: any = { where: { id: params.id } };
			if (params.include) specs.include = params.include;
			const dataModel = await model.findOne(specs);
			if (!dataModel) throw 'RECORD_NOT_EXIST';

			const data = dataModel.get({ plain: true });
			return response.data(data);
		} catch (exc) {
			return response.processError(exc, target);
		}
	};

	remove = async (model, { id }, target, transaction) => {
		try {
			transaction ? await model.destroy({ where: { id }, transaction }) : await model.destroy({ where: { id } });
			return response.remove();
		} catch (error) {
			return response.processError(error, target);
		}
	};

	getValues = (model, params) => {
		const values = {};
		for (const field in params) {
			const isTime = field === 'timeCreated' || field === 'timeUpdated';
			if (model.rawAttributes.hasOwnProperty(field) && !isTime && params[field] !== null) {
				values[field] = params[field];
			}
		}
		return values;
	};

	create = async (model, params: IParams, target: string, transaction) => {
		console.log('transaction action create--', transaction);
		try {
			delete params.id;
			const values = this.getValues(model, params);

			const insert = transaction ? await model.create(values, { transaction }) : await model.create(values);
			return { status: true, data: { id: insert.id } };
		} catch (error) {
			return { status: false, error: { error, target } };
		}
	};

	update = async (model, params: IParams, target: string, transaction) => {
		try {
			const id = params.id;
			delete params.id;
			const values = this.getValues(model, params);
			transaction
				? await model.update(values, { where: { id }, transaction })
				: await model.update(values, { where: { id } });
			return { status: true, data: { id } };
		} catch (error) {
			return { status: false, error: { error, target } };
		}
	};

	publish = async (model, params: IParams, target: string, transaction) => {
		const isNew = params?.isNew || params.new || !params.id || typeof params.id === 'string';
		const res = isNew
			? await this.create(model, params, target, transaction)
			: await this.update(model, params, target, transaction);

		// if (!params.id) return await this.create(model, params, target);
		// return await this.update(model, params, target);

		return response.publish(res);
	};

	bulkSave = async (model, params: IParams, target: string, transaction) => {
		if (!params.length) return { status: true, data: [] };
		const fieldsModels = Object.keys(model.rawAttributes);
		const fieldsToTake = fieldsModels.filter(field => field !== 'id');

		const objectsToCreate = params.filter(obj => !obj.id || (obj.id && typeof obj.id === 'string'));
		const objectsToUpdate = params.filter(obj => obj.id && typeof obj.id === 'number');

		try {
			// const promises = objectsToUpdate.map((obj) => this.update(model, obj, target));
			let updated = transaction
				? await model.bulkCreate(objectsToUpdate, {
						updateOnDuplicate: fieldsToTake,
						transaction,
				  })
				: await model.bulkCreate(objectsToUpdate, {
						updateOnDuplicate: fieldsToTake,
				  });
			updated = updated.map(obj => obj.get({ plain: true }));
			const instancesIds = [];
			const toCreate = objectsToCreate.map(item => {
				instancesIds.push(item.id);
				delete item.id;
				return item;
			});
			const objectsCreated = await model.bulkCreate(toCreate);

			const objectsCreatedPlain = objectsCreated.map((obj: any, index: number) => {
				const record = obj.get({ plain: true });
				record.__instanceId = instancesIds[index];
				return record;
			});

			const idsUpdated = updated.map(obj => obj.id);

			const records = await model.findAll({
				where: {
					id: idsUpdated,
				},
			});

			const data = records.map(record => record.get({ plain: true }));

			const objects = objectsCreatedPlain.concat(data);

			return { status: true, data: { entries: objects } };
		} catch (error) {
			console.error('error bulk save', error);
			return response.processError(error, target);
		}
	};
}

export /*bundle*/
const actions = new Actions();
