require('dotenv').config()
const http = require('http')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(logger('dev'))
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
	console.log(process.env.NODE_ENV)
	app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
}

app.use('/api', require('./indexRouter'))

const PORT = process.env.PORT
const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server work in port ${PORT}`))
