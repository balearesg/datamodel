import {DataModel, actions} from "data-model/db";
import { initModels } from "./tables/init-models";

const DB_HOST='34.68.201.7'
const DB_USER='tabacalera_root'
const DB_PASS='JD.t4b4c4l3r4'
const DB_NAME='dev_tabacalera_mig'
const DB_TIMEZONE='-04:00'

export /*actions*/ /*bundle*/
class Test{

    connectToDB(){
        const dbConnected: any = DataModel.connectDB({
            dbName: DB_NAME,
            dbUser: DB_USER,
            dbPass: DB_PASS,
            dbHost: DB_HOST,
            dbTimeZone: DB_TIMEZONE,
            dialect: 'mysql',
            initModels
        });

        if (!dbConnected.status) return {status: false, error: dbConnected.error};

        return {status: true};
    }
}