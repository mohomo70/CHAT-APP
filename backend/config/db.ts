import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
            // useCreateIndex: true,
        })
        console.log(`MonogDB connectd`)
    } catch (error) {
        console.error(`Error`)
        process.exit(1)
    }
}

export default connectDB