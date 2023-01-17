import express from 'express'
import { Client } from '../Entities/Client'
const router = express.Router()

router.post('/api/client', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            cardNumber,
            balance
        } = req.body

        const client = Client.create({
            first_name: firstName,
            last_name: lastName,
            email,
            card_number: cardNumber,
            balance
        })

        const response = await client.save()
        res.status(201).json({ 'Client created successfully': response })

    } catch (error) {
        res.status(400).json({ 'Client not Created': error })
    }

})



export {
    router as createClientRouter
}