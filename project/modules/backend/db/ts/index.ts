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

	stringConnection = (credentials: ICredentials) => {
		try {
			const { dialect, initModels, connectionString } = credentials;
			console.log('credentials', credentials);
			const sequelize = new Sequelize(connectionString, {
				dialect,
				logging: this.registerLog,
			});
			console.log('seq', sequelize);
			this._models = initModels(sequelize);
			this._sequelize = sequelize;
			this.createRelations();
			return { status: true };
		} catch (error) {
			console.error('error stringConnection', error);
			return { status: false, error: error.message };
		}
	};

	private connectDB(credentials: ICredentials) {
		try {
			if (credentials.connectionString) return this.stringConnection(credentials);

			const { name, user, password, host, dialect, dialectOptions, initModels } = credentials;
			const specs: IOptions = {
				host: host,
				dialect,
				dialectOptions,
				logging: this.registerLog,
			};
			if (credentials.port) specs.port = credentials.port;
			if (credentials.storage) specs.storage = credentials.storage;
			if (credentials.timeZone) specs.timezone = credentials.timeZone;
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
