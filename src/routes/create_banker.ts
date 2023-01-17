import express from 'express'
import { Banker } from '../Entities/Banker'
const router = express.Router()

router.post('/api/banker', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            cardNumber,
            employeeNumber
        } = req.body

        const banker = Banker.create({
            first_name: firstName,
            last_name: lastName,
            email,
            card_number: cardNumber,
            employee_number: employeeNumber
        })

        const response = await banker.save()
        res.status(201).json({ 'Banker created successfully': response })

    } catch (error) {
        res.status(400).json({ 'Banker not Created': error })
    }

})



export {
    router as createBankerRouter
}