import { Sequelize } from "sequelize";
import { Logs } from "./logs";

/* eliminar db para mantener semantica*/
interface ICredentials {
	name: string,
	user: string,
	password: string,
	host: string,
	timeZone?: string | undefined | null,
	storage?: string | undefined | null,
	dialect: any,
	initModels: any
}

export /*bundle*/
class DataModel {
	_models;
	get models() {
		return this._models;
	}

	static #intances: Map<string, DataModel> = new Map;

	_sequelize;
	get sequelize() {
		return this._sequelize;
	}
	#logs: Logs = new Logs();
	constructor(credentials: ICredentials) {

		this.#logs.validate();

		this.connectDB(credentials)
	}
	
	registerLog = msg => {
		this.#logs.call(msg);
	};
	
	private connectDB(credentials: ICredentials) {
		try{
			const { name, user, password, host, timeZone, storage, dialect, initModels } = credentials;
			const sequelize = new Sequelize(name, user, password, {
				host: host,
				dialect,
				storage,
				timezone: timeZone,
				logging: this.registerLog,
			});
			
			this._models = initModels(sequelize);
			this._sequelize = sequelize;
			this.createRelations();
			return {status: true};
		}catch(error){
			return {status: false, error: error.message};
		}
	}

	static get(credentials: ICredentials) {
		console.log("🚀 ~ file: index.ts:62 ~ DataModel ~ get ~ credentials:", credentials)
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