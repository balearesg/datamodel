import { Sequelize } from 'sequelize';
import { Logs } from './logs';
import { ICredentials, IOptions } from './interfaces/credentials';

export /*bundle*/
	class DataModel {
	_models;
	get models() {
		return this._models;
	}

	static #intances: Map<string, DataModel> = new Map();

	_sequelize;
	get sequelize() {
		return this._sequelize;
	}
	#logs: Logs = new Logs();
	constructor(credentials: ICredentials) {
		this.#logs.validate();

		this.connectDB(credentials);
	}

	registerLog = msg => {
		this.#logs.call(msg);
	};

	private connectDB(credentials: ICredentials) {
		try {
			const {
				name,
				user,
				password,
				host,
				timeZone,
				storage,
				dialect,
				dialectOptions,
				port,
				initModels } = credentials;
			const specs: IOptions = {
				host: host,
				dialect,
				storage,
				dialectOptions,
				timezone: timeZone,
				logging: this.registerLog,
			}
			if (port) specs.port = port
			const sequelize = new Sequelize(name, user, password, specs);
			this._models = initModels(sequelize);
			this._sequelize = sequelize;
			this.createRelations();
			return { status: true };
		} catch (error) {
			console.error('error', error);
			return { status: false, error: error.message };
		}
	}

	static get(credentials: ICredentials) {
		const id = `${credentials.name}-${credentials.host}`;
		if (this.#intances.has(id)) return this.#intances.get(id);
		const db = new DataModel(credentials);
		this.#intances.set(id, db);
		return db;
	}

	refreshRelations() {
		this.createRelations();
	}

	createRelations() {
		/* Al heredar o antes de realizar la conexión se debe setear las relaciones extras */
	}
}
