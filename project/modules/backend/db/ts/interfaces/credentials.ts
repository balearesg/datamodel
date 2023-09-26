export /*bundle*/ interface ICredentials {
	name: string;
	user: string;
	password: string;
	host: string;
	timeZone?: string | undefined | null;
	storage?: string | undefined | null;
	dialect: any;
	initModels: any;
}