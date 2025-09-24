import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Имитация задержки сервера
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Обработка формы A
app.post('/form/a', async (req, res) => {
    await delay(1000) // Имитация задержки

    const { name, email, inn, phone } = req.body

    // Вывод полученных данных в консоль
    console.log('Получены данные формы A:', {
        name,
        email,
        inn,
        phone,
        timestamp: new Date().toISOString()
    })

    // Проверка обязательных полей
    if (!name || !inn || !phone) {
        return res.status(400).json({ error: 'Заполните обязательные поля' })
    }

    // Имитация успешного ответа
    const requestId = Math.random().toString(36).substring(2, 9)
    const classifier = `form-a-${Date.now()}`

    res.json({
        requestId,
        classifier
    })
})

// Обработка формы B
app.post('/form/b', async (req, res) => {
    await delay(1000) // Имитация задержки

    const { name, surname, patronymic, birthDate, login, email } = req.body

    // Вывод полученных данных в консоль
    console.log('Получены данные формы B:', {
        name,
        surname,
        patronymic,
        birthDate,
        login,
        email,
        timestamp: new Date().toISOString()
    })

    // Проверка обязательных полей
    if (!name || !surname || !patronymic || !birthDate || !login || !email) {
        return res.status(400).json({ error: 'Заполните обязательные поля' })
    }

    // Имитация успешного ответа
    const requestId = Math.random().toString(36).substring(2, 9)
    const classifier = `form-b-${Date.now()}`

    res.json({
        requestId,
        classifier
    })
})

app.listen(PORT, () => {
    console.log(`Mock server running on http://localhost:${PORT}`)
})