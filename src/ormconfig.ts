import * as dotenv from 'dotenv'
dotenv.config({ path: "config/dev.env" })

const ormconfig_details = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    synchronize: false,
    logging: 'error'
};

export = ormconfig_details