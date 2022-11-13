import express from "express"
const router = express.Router()

import { authUser, getUsers, registerUser } from "../controllers/userController"

router.post('/register', registerUser)
router.post('/login', authUser)
router.get('/hello', (req, res) => {
    res.json({
        id: 'hello'
    })
})
router.get('/home', getUsers)

export default router