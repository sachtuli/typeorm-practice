import express from 'express'
import { Client } from '../Entities/Client'
import { Banker } from '../Entities/Banker'


const router = express.Router()

router.put('/api/banker/:bankerId/client/:clientId', async (req, res) => {
    const { bankerId, clientId } = req.params

    const client = await Client.findOne({
        where: {
            id: parseInt(clientId)
        }
    })

    const banker = await Banker.findOne({
        where: {
            id: parseInt(bankerId)
        },
        relations: ['clients']
    })

    if (!banker || !client) {
        return res.status(404).json({ msg: "Inavlid Input. Check BankerID/ClientID." })
    }
    else {
        if (banker.clients.length > 0) {
            banker.clients.push(client)
        } else banker.clients = [client]

        await banker.save()
        return res.status(201).json({ msg: "Banker conected to client" })
    }

})



export { router as connectBankerToClient }