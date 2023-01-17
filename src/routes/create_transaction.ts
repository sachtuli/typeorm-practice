import express from 'express'
import { Client } from '../Entities/Client'
import { Transaction, TranscationTypes } from '../Entities/Transaction'

const router = express.Router()

router.post('/api/client/:clientId/transaction', async (req, res) => {

    const { clientId } = req.params

    const { type, amount } = req.body

    const client = await Client.findOne({
        where: {
            id: parseInt(clientId)
        }
    })

    if (!client) {
        return res.status(404).json({ msg: "Client not found" })
    }

    const transaction = Transaction.create({
        type,
        amount,
        client
    })

    await transaction.save()

    function addition(num1: number, num2: number) {
        return (num1 + num2)
    }

    function subtraction(num1: number, num2: number) {
        return (num1 - num2)
    }

    if (type === TranscationTypes.DEPOSIT) {
        client.balance = addition(client.balance, Number(amount))
    }
    else if (type === TranscationTypes.WITHDRAW) {
        client.balance = subtraction(client.balance, Number(amount))
    }

    await client.save()

    return res.status(201).json({ msg: "Transaction is successful" })
})


export { router as createTransactionRouter }