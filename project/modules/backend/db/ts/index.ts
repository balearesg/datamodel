import { Sequelize } from 'sequelize';
import { IOptions, ISettings } from './interfaces/credentials';
import { Logs } from './logs';

export /*bundle*/
class DataModel {
	_models;
	/**
	 * @returns The initialized Sequelize models.
	 */
	get models() {
		return this._models;
	}

	static #instances: Map<string, DataModel> = new Map();

	_sequelize;
	/**
	 * @returns The Sequelize instance.
	 */
	get sequelize() {
		return this._sequelize;
	}
	#logs: Logs = new Logs();
	/**
	 * Creates an instance of DataModel.
	 * It initializes the logging system and attempts to connect to the database.
	 * @param {ISettings} credentials - The database connection credentials.
	 */
	constructor(settings: ISettings) {
		this.#logs.validate();
		this.connectDB(settings);
	}

	/**
	 * Registers a log message with the internal logging system.
	 * This method is typically used as a callback for Sequelize's logging option.
	 * @param {string} msg - The message to be logged.
	 */
	registerLog = msg => {
		this.#logs.call(msg);
	};

	/**
	 * Establishes a database connection using a connection string.
	 * It initializes Sequelize with the provided connection string and dialect,
	 * sets up logging, and then initializes the models and creates relations.
	 * @param {ISettings} credentials - The database connection credentials, including a `connectionString`.
	 * @returns {{status: boolean, error?: string}} An object indicating the connection status and an error message if the connection fails.
	 */
	stringConnection = (settings: ISettings) => {
		try {
			const { dialect, initModels, connectionString } = settings;
			const sequelize = new Sequelize(connectionString, {
				dialect,
				logging: this.registerLog,
				pool: {
					acquire: 300000,
				},
			});
			this._models = initModels(sequelize);
			this._sequelize = sequelize;
			this.createRelations();
			return { status: true };
		} catch (error) {
			console.error('error stringConnection', error);
			return { status: false, error: error.message };
		}
	};

	/**
	 * Establishes a database connection.
	 * This private method acts as the primary entry point for database connection.
	 * It checks if a `connectionString` is provided; if so, it delegates to `stringConnection`.
	 * Otherwise, it constructs the connection using individual credential parameters (name, user, password, host, etc.).
	 * It initializes Sequelize, sets up models, and creates relations.
	 * @private
	 * @param {ISettings} credentials - The database connection credentials.
	 * @returns {{status: boolean, error?: string}} An object indicating the connection status and an error message if the connection fails.
	 */
	private connectDB(credentials: ISettings) {
		try {
			if (credentials.connectionString)
				return this.stringConnection(credentials);

			const {
				name,
				user,
				password,
				host,
				dialect,
				dialectOptions,
				initModels,
			} = credentials;
			const specs: IOptions = {
				host: host,
				dialect,
				dialectOptions,
				logging: this.registerLog,
				pool: {
					acquire: 300000,
				},
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

	/**
	 * Retrieves a `DataModel` instance.
	 * This static method implements a singleton-like pattern per database configuration.
	 * It checks if an instance for the given `settings` (identified by name and host) already exists.
	 * If an instance exists, it returns the existing one; otherwise, it creates a new `DataModel` instance, stores it, and then returns it.
	 * @param {ISettings} settings - The settings used to identify and potentially create the `DataModel` instance.
	 * @returns {DataModel} The `DataModel` instance corresponding to the provided settings.
	 */
	static get(settings: ISettings) {
		const id = `${settings.name}-${settings.host}`;
		if (this.#instances.has(id)) return this.#instances.get(id);
		const db = new DataModel(settings);
		this.#instances.set(id, db);
		return db;
	}

	/**
	 * Refreshes the database relations by calling `createRelations`.
	 * This method can be used to re-establish or update model associations if needed after initial setup.
	 */
	refreshRelations() {
		this.createRelations();
	}

	/**
	 * Defines the relationships between database models.
	 * This method is intended to be overridden by subclasses or extended to define foreign keys,
	 * associations (e.g., hasMany, belongsTo), and other model relationships after models are initialized.
	 * It is called internally after the Sequelize instance and models are set up.
	 * Implementations should typically be empty in the base class and contain relation definitions in derived classes.
	 */
	createRelations() {
		/* Al heredar o antes de realizar la conexión se debe setear las relaciones extras */
	}
}
