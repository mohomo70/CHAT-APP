import express from 'express'
const router = express.Router()

import { getMessage, submitMassage } from '../controllers/messageController'

router.post('/submit', submitMassage)
router.post('/messages', getMessage)

export default router