import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import userRoutes from './routes/userRoutes'
import messageRoutes from './routes/messageRoutes'

dotenv.config()

connectDB()

const app: Express = express()
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Express+TypeScript')
})

const port = process.env.PORT

app.listen(Number(port), '172.30.106.118', () => {
    console.log('server is running')
})