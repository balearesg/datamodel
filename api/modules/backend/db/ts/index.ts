import { Sequelize } from "sequelize";
import { Logs } from "./logs";

interface ICredentials {
	dbName: string,
	dbUser: string,
	dbPass: string,
	dbHost: string,
	dbTimeZone?,
	storage?: string
	dialect: any,
	initModels: any
}

class Model {
	_models;
	get models() {
		return this._models;
	}

	_sequelize;
	get sequelize() {
		return this._sequelize;
	}
	#logs: Logs = new Logs();
	constructor() {

		this.#logs.validate();

		
	}
	
	registerLog = msg => {
		this.#logs.call(msg);
	};
	
	connectDB(credentials: ICredentials) {
		try{
			const { dbName, dbUser, dbPass, dbHost, dbTimeZone, storage, dialect, initModels } = credentials;
			const sequelize = new Sequelize(dbName, dbUser, dbPass, {
				host: dbHost,
				dialect,
				storage,
				timezone: dbTimeZone,
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

	refreshRelations() {
		this.createRelations();
	}

	createRelations() {
		/* Al heredar o antes de realizar la conexión se debe setear las relaciones extras */
    }
}

export /*bundle*/
const DataModel = new Model();
