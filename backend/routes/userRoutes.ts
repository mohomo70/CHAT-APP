import express from "express"
const router = express.Router()

import { authUser, registerUser } from "../controllers/userController"

router.post('/register', registerUser)
router.post('/login', authUser)
router.get('/hello', (req, res) => {
    res.json({
        id: 'hello'
    })
})

export default router