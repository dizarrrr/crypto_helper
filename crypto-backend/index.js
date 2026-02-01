import express from 'express'
import cors from 'cors'
import axios from 'axios'
import * as cheerio from 'cheerio'


const fetchInfoCoins = async () => {
    try {
        const {data} = await axios.get("https://www.coingecko.com/")
        const $ = cheerio.load(data)


        const titlesCoins = []
        const nameTagTableForCoins = "tbody[x-ref='tableBody'] tr"
        const classesDivTitleCoins = ".tw-text-gray-700.dark\\:tw-text-moon-100.tw-font-semibold.tw-text-sm.tw-leading-5"

        $(nameTagTableForCoins).each((i, el) => {
            const nameDiv = $(el).find(`div${classesDivTitleCoins}`)

            if (nameDiv.length > 0) {
                let titleCoin = nameDiv.text().trim().replaceAll('\n', '').split(" ")
                titleCoin = titleCoin[0] + " " + titleCoin.at(-1)
                titlesCoins.push({titleCoin})
            }
        })

        return titlesCoins

    } catch (error) {
        console.log(`Ошибка: ${error.message}`)
    }
}

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())


app.get('/api/assets', (req, res) => {
    const mockAssetsData = [
        {id: 'bitcoin', amount: 1.5, price: 60000},
        {id: 'ethereum', amount: 10, price: 3000},
    ]

    res.json(mockAssetsData)
})


app.get('/testApi/infoCoins', async (req, res) => {
    const infoCoins = await fetchInfoCoins()

    res.send(infoCoins)
})

app.post("/api/assets", (req, res) => {
    const newAsset = req.body
    console.log("Получен новый актив:", newAsset)

    res.status(201).json({ message: 'Asset added successfully', data: newAsset })
})


app.listen(PORT, () => {
    console.log(`server is running on http://localhost${PORT}`)
})