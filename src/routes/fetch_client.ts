import express from 'express'
import { Client } from '../Entities/Client'

const router = express.Router()

router.get('/api/clients/:clientId', async (req, res) => {
    try {

        const { clientId } = req.params
        const client = await Client
            .createQueryBuilder()
            .select('client')
            .from(Client, 'client')
            .leftJoinAndSelect('client.transactions', 'transactions')
            // .leftJoinAndSelect('client.bankers_clients', "banker", 'bankers_clients.client = :id', {
            //     id: parseInt(clientId)
            // })
            .where("client.id = :id", { id: parseInt(clientId) })
            .andWhere('client.active = true')
            .getOne()

        if (!client) {
            return res.status(402).json({ msg: 'No client Found' })
        }
        return res.status(201).json({ data: client })
    } catch (error) {
        console.log(error)
        return res.status(500).json({err: 'Error occured while processing request.'})
    }
})


export { router as fetchClientRouter }