import {IParams, IModel} from "./interfaces/types";
import {literal} from "sequelize";
import {OPERATORS_STRING, OPERATORS} from "./variables";
const ArrayRegex = /^\[.*\]$/;
export function isEmptyObject(value: IParams) {
	return Reflect.ownKeys(value).length === 0 && Object.keys(value).length === 0;
}

export function processValue(value: string | number, op: string) {
	return op === "like" ? `'%${value}%'` : `'${value}'`;
}

export function processLiteral(filter: IParams, params: IParams, concatString: string) {
	const value = this.processValue(params.value, params.op);
	filter[OPERATORS[params.op]] = literal(`${concatString} ${OPERATORS_STRING[params.op]} ${value}`);
	return filter;
}

/* filter 'and' || 'or' to process items. Else set value in the field*/
export const processInternalAttributes = (model: IModel, where: IParams, fieldParent: string) => {
	const fields = {};
	if (fieldParent === "and" || fieldParent === "or") {
		const result = processValidations(model, where);
		return result;
	}
	for (const key in where) {
		const field = OPERATORS[key];
		fields[field] = where[key];
	}

	return fields;
};

export const validIsArray = (value: string) => {
	return ArrayRegex.test(value);
};

export const processValidations = (model: IModel, where: IParams) => {
	const filters: object[] = [];

	where.forEach(elem => {
		const fields: object = {};
		const key = Object.keys(elem)[0];
		if (!model.rawAttributes.hasOwnProperty(key) && !OPERATORS.hasOwnProperty(key)) return;
		const fieldOrOperator = model.rawAttributes.hasOwnProperty(key) ? key : OPERATORS[key];
		let value =
			typeof elem[key] === "object" && !Array.isArray(elem[key])
				? processInternalAttributes(model, elem[key], key)
				: Array.isArray(elem[key]) && (key === "and" || key === "or")
				? processInternalAttributes(model, elem[key], key)
				: elem[key];

		if (typeof value === "string") {
			const op = validIsArray(value) ? "in" : "like";
			const newValue = validIsArray(value) ? JSON.parse(value) : value;
			value = {[OPERATORS[op]]: newValue};
		}
		fields[fieldOrOperator] = value;
		filters.push(fields);
	});

	return filters;
};

export const processFilters = (model: IModel, where: IParams) => {
	const filters = {};
	if (!where) return filters;
	for (const field in where) {
		if (!model.rawAttributes.hasOwnProperty(field) && !OPERATORS.hasOwnProperty(field)) continue;
		let fieldOrOperator = model.rawAttributes.hasOwnProperty(field) ? field : OPERATORS[field];
		let value =
			typeof where[field] === "object" && !Array.isArray(where[field])
				? processInternalAttributes(model, where[field], field)
				: Array.isArray(where[field]) && (field === "and" || field === "or")
				? processInternalAttributes(model, where[field], field)
				: where[field];
		if (typeof value === "string") {
			const op = validIsArray(value) ? "in" : "like";
			const newValue = validIsArray(value) ? JSON.parse(value) : value;
			value = {[OPERATORS[op]]: newValue};
		}
		filters[fieldOrOperator] = value;
	}

	return filters;
};
