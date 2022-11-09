import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { UserInterface } from '../models/userModel'
import generateToken from '../utils/generateToken'

// @desc    Auth user $ get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user.id,
            name: user.name,
            token: generateToken(user.id)
        })
    } else {
        res.status(401)
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body

    const userExists = await User.findOne({ name })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        password
    })
    if (user) {
        res.status(201).json({
            name: user.name,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export { authUser, registerUser }