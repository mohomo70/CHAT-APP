import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { UserInterface } from '../models/userModel'
import generateToken from '../utils/generateToken'

// @desc    Auth user $ get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body
    try {
        const user = await User.findOne({ name })
        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user.id,
                name: user.name,
                token: generateToken(user.id)
            })
        } else {
            res.status(401).json({ message: 'Username or Password is Wrong' })
            // throw new Error('Invalid user data')
        }
    } catch (error) {
        res.status(500).json({ message: "Error" })
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body

    const userExists = await User.findOne({ name })
    if (userExists) {
        res.status(400).json({ message: " User Already exists" })
        // throw new Error('User already exists')
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
        res.status(400).json({ message: "Invalid user data" })

        // res.status(400)
        // throw new Error('Invalid user data')
    }
})

export { authUser, registerUser }