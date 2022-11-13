import mongoose from "mongoose"
import { UserInterface } from "./userModel"

export interface messageInterFace {
    content: string,
    sender: UserInterface,
    receiver: UserInterface
}

const messageSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        receiver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    }
    // {
    //     content: { type: String, required: true },
    //     sender: { type: String, required: true },
    //     receiver: { type: String, required: true },
    // }
)
const Message = mongoose.model('Message', messageSchema)
export default Message