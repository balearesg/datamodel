import { DataModel, actions } from '@bgroup/data-model/db';
import { initModels } from './tables/init-models';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_TIMEZONE } = process.env;

export /*actions*/ /*bundle*/
	class Test {
	connectToDB() {
		const dbConnected: any = DataModel.connectDB({
			dbName: DB_NAME,
			dbUser: DB_USER,
			dbPass: DB_PASS,
			dbHost: DB_HOST,
			dbTimeZone: DB_TIMEZONE,
			dialect: 'mysql',
			initModels,
		});

		if (!dbConnected.status) return { status: false, error: dbConnected.error };

		return { status: true };
	}
}
