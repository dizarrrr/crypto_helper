import express from 'express'
import type {Application, Request, Response, NextFunction} from 'express'
import cors from 'cors'
import axios from 'axios'
import * as cheerio from 'cheerio'

const app: Application = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use((req: Request, res: Response, next) => {
    console.log("Я выполнился между получением запроса и отправкой ответа")
    next()
})


app.get('/api/assets', (req: Request, res: Response) => {
    const mockAssetsData = [
        {id: 'bitcoin', amount: 1.5, price: 60000},
        {id: 'ethereum', amount: 10, price: 3000},
    ]

    res.json(mockAssetsData)
})


app.get('/testApi/infoCoins', async (req: Request, res: Response) => {
    
})

app.post("/api/assets", (req: Request, res: Response) => {
    const newAsset = req.body
    console.log("Получен новый актив:", newAsset)

    res.status(201).json({ message: 'Asset added successfully', data: newAsset })
})


app.listen(PORT, () => {
    console.log(`server is running on http://localhost${PORT}`)
})