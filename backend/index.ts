import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import userRoutes from './routes/userRoutes'

dotenv.config()

connectDB()

const app: Express = express()
app.use(express.json())
app.use('/api/users', userRoutes)

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Express+TypeScript')
})

app.listen(Number(port), '172.30.106.118', () => {
    console.log('server is running')
})