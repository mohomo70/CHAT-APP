import asyncHandler from 'express-async-handler'
import Message from '../models/messagesModel'
import { UserInterface } from '../models/userModel'

const submitMassage = asyncHandler(async (req, res) => {
    const { content, receiver, sender: s } = req.body
    const sender = s.id
    const message = await Message.create({
        content,
        receiver,
        sender,
    })
    if (message) {
        res.status(201).json({
            message: 'message is sent'
        })
    } else {
        res.status(400).json({ message: "message is not sending" })

        // res.status(400)
        // throw new Error('Invalid user data')
    }
})

const getMessage = asyncHandler(async (req, res) => {
    const { user, reciever } = req.body
    // const id = user.id
    console.log(reciever)
    const messages = await Message.find({ $or: [{ $and: [{ receiver: reciever._id }, { sender: user.id }] }, { $and: [{ sender: reciever._id }, { receiver: user.id }] }] }).populate('receiver', 'name').populate('sender', 'name')
    if (messages) {
        res.status(201).json({
            messages
        })
    } else {
        res.status(400).json({ message: "error in reading messages from database" })
    }
})

export { submitMassage, getMessage }
