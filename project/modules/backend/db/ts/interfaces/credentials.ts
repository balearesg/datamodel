export /*bundle*/ interface ICredentials {
	name: string;
	user: string;
	password: string;
	host?: string;
	timeZone?: string | undefined | null;
	storage?: string | undefined | null;
	dialect: any;
	dialectOptions: {
		[option: string]: any;
	};
	initModels: any;
	port?: number;
	connectionString?: string;
}

export interface IOptions {
	host: string;
	dialect: any;
	storage?: string | undefined | null;
	dialectOptions: {
		[option: string]: any;
	};
	timezone?: string | undefined | null;
	logging: (msg: any) => void;
	port?: number;
}
