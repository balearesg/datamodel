import { Op } from "sequelize";
// import { Params } from "@app/trade-market/utils";
import { response } from "data-model/response";

class Actions {
  _DEFAULT = { order: "timeCreated", limit: 30, start: 0 };
  get DEFAULT() {
    return this._DEFAULT;
  }

  set DEFAULT(value) {
    this._DEFAULT = value;
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
  })
  
  get OPERATORS() {
    return this._OPERATORS;
  }

  _op: any = Op;
  get op() {
    return this._op;
  }

	private processInternalAttributes = (model, where, fieldParent) => {
		const fields = {};
		if(fieldParent === 'and' || fieldParent === 'or'){
		// const field = this.OPERATORS[fieldParent];
			return this.processValidations(model, where);
		}
		for(const key in where){
			const field = this.OPERATORS[key];
			fields[field] = where[key];
		}


		return fields;
	}

	private processValidations = (model, where) => {
		const filters: object[] = [];
		for (const key in where) {
			const fields: object = {};
			if(!model.rawAttributes.hasOwnProperty(key) && !this._OPERATORS.hasOwnProperty(key)) continue;
			const fieldOrOperator = model.rawAttributes.hasOwnProperty(key)? key : this._OPERATORS[key];
			const value = typeof where[key] ==="object" && !Array.isArray(where[key])?
				this.processInternalAttributes(model, where[key], key) : where[key];
			fields[fieldOrOperator] = value;
			filters.push(fields);
		}
		return filters;
	}

	processFilters = (model, where: any) => {
		const filters = {};
		if (!where) return filters;
		for(const field in where){
			if(!model.rawAttributes.hasOwnProperty(field) && !this.OPERATORS.hasOwnProperty(field)) continue;
			const fieldOrOperator = model.rawAttributes.hasOwnProperty(field)? field : this.OPERATORS[field];
			const value = typeof where[field] ==="object" && !Array.isArray(where[field])?
				this.processInternalAttributes(model, where[field], field) : where[field];
			filters[fieldOrOperator] = value;
		}
		
		return filters;
	}

	list = async (model, params, target: string) => {
		const limit = params?.limit ?? this._DEFAULT.limit;
		const offset = params?.start ?? this._DEFAULT.start;
		// asc mean kind of order (DESC, ASC)
		const order = params?.order ? [[params.order, params?.asc ?? "DESC"]] : [[this._DEFAULT.order, params?.asc ?? "DESC"]];

		delete params?.index;
		delete params?.accessToken;
		delete params?.asc;

		try {
      //   const filters = params?.filter ?? this.processFilters(model, params);
      const filters = params?.filter ?? this.processFilters(model, params.where);
      const attributes = params.attributes ?? model.rawAttributes;
      const dataModel = await model.findAll({
        attributes,
        order,
        offset,
        limit: limit + 1,
        where: filters,
      });

      const data = dataModel.map(item => item.get({plain: true}));

      const total = await model.count({ where: filters });

      return response.list(data, total, { limit, start: offset });
		} catch (exc) {
      console.error("error list", exc);
      return response.processError(exc, target);
		}
	};

  data = async (model, params, target: string) => {
    try {
      const dataModel = await model.findOne({ where: { id: params.id } });
      if (!dataModel) throw "RECORD_NOT_EXIST";

      const data = dataModel.get({ plain: true });

      return response.data(data);
    } catch (exc) {
      return response.processError(exc, target);
    }
  };

  remove = async ({ id }, model, target) => {
    try {
      await model.destroy({ where: { id } });
      return response.remove();
    } catch (error) {
      return response.processError(error, target);
    }
  };

  getValues = (model, params) => {
    const values = {};
    for (const field in params) {
      const isTime = field === "timeCreated" || field === "timeUpdated";
      if (params[field] && model.rawAttributes.hasOwnProperty(field) && !isTime) {
        values[field] = params[field];
      }
    }
    return values;
  };

  create = async (model, params, target: string) => {
    try {
      const values = this.getValues(model, params);
      const insert = await model.create(values);
      return { status: true, data: { id: insert.id } };
    } catch (error) {
      return { status: false, error: { error, target } };
    }
  };

  update = async (model, params, target: string) => {
    try {
      const id = params.id;
      delete params.id;
      const values = this.getValues(model, params);
      await model.update(values, { where: { id } });
      return { status: true, data: { id } };
    } catch (error) {
      return { status: false, error: { error, target } };
    }
  };

  publish = async (model, params, target) => {
    const res = params.id ? await this.update(model, params, target) : await this.create(model, params, target);
    // if (!params.id) return await this.create(model, params, target);
    // return await this.update(model, params, target);

    return response.publish(res);
  };

  bulkSave = async (model, params, target: string) => {
		if (!params.length) return { status: true, data: [] };
    const fieldsModels = Object.keys(model.rawAttributes);
    const fieldsToTake = fieldsModels.filter((field) => field !== 'id');

		const objectsToCreate = params.filter((obj) => !obj.id || (obj.id && typeof obj.id === 'string'));
		const objectsToUpdate = params.filter((obj) => obj.id && typeof obj.id === 'number');

		try {
			// const promises = objectsToUpdate.map((obj) => this.update(model, obj, target));
			let updated = await model.bulkCreate(objectsToUpdate, {
        updateOnDuplicate: fieldsToTake,
      });
      updated = updated.map((obj) => obj.get({ plain: true }));
			const instancesIds = [];
			const toCreate = objectsToCreate.map((item) => {
				instancesIds.push(item.id);
				delete item.id;
				return item;
			});
			const objectsCreated = await model.bulkCreate(toCreate);

			const objectsCreatedPlain = objectsCreated.map((obj: any, index: number) => {
				const record = obj.get({ plain: true });
				record.instanceId = instancesIds[index];
				return record;
			});

			const idsUpdated = updated.map((obj) => obj.id);

			const records = await model.findAll({
				where: {
					id: idsUpdated,
				},
			});

			const data = records.map((record) => record.get({ plain: true }));

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
