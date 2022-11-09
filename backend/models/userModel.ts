import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
export interface UserInterface {
    name: string,
    password: string
}
export interface UserInterfaceMethods {
    matchPassword(pass: string): boolean
}

type UserModel = mongoose.Model<UserInterface, {}, UserInterfaceMethods>
const userSchema = new mongoose.Schema<UserInterface, UserInterfaceMethods>({
    name: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    }
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model<UserInterface, UserModel>('User', userSchema)

export default User