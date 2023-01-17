import express from 'express'
import { Client } from '../Entities/Client'

const router = express.Router()

router.delete('/api/client/:clientId', async (req, res) => {
    const { clientId } = req.params

    const response = await Client.delete(clientId)
    return res.status(201).json({ msg: 'Client deletion successful.', data: response })
})


export { router as deleteClientRouter }