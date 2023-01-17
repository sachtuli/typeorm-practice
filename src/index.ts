import { DataSource } from 'typeorm'
import express from 'express'
import ormconfig_details from './ormconfig'
import { Client } from './Entities/Client'
import { Banker } from './Entities/Banker'
import { Transaction } from './Entities/Transaction'
import { createClientRouter } from './routes/create_client'
import { createBankerRouter } from './routes/create_banker'
import { createTransactionRouter } from './routes/create_transaction'
import { connectBankerToClient } from './routes/connect_banker_to_client'
import { deleteClientRouter } from './routes/delete_client'
import { fetchClientRouter } from './routes/fetch_client'


const app = express()
const main = async () => {
    try {
        const AppDataSource = new DataSource({
            "type": 'postgres',
            "host": ormconfig_details.host,
            "port": ormconfig_details.port,
            "database": ormconfig_details.database,
            "username": ormconfig_details.username,
            "password": ormconfig_details.password,
            "entities": [Client, Banker, Transaction],
            "synchronize": true
        })

        await AppDataSource.initialize()
        console.log("Data Source has been initialized!")


        app.use(express.json())
        app.use(createClientRouter)
        app.use(createBankerRouter)
        app.use(createTransactionRouter)
        app.use(connectBankerToClient)
        app.use(deleteClientRouter)
        app.use(fetchClientRouter)


        app.listen('8080', () => {
            console.log('App is running on port 8080')
        })
    } catch (err) {
        console.error("Error during Data Source initialization", err)
    }
}

main()