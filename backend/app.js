const express = require('express')
require('dotenv').config()
const http = require('http')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const hbs = require('hbs')

const app = express()
const APP_NAME = process.env.APP_NAME

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(logger('dev'))
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
	console.log(process.env.NODE_ENV)
	app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
}

const publicPath = path.join(__dirname, 'public')
const uploadsPath = path.join(__dirname, 'uploads')

app.use(express.static(publicPath))
app.use(`/${APP_NAME}`,express.static(publicPath))
app.use('/uploads', express.static(uploadsPath))
app.use('/api', require('./src/indexRouter'))
app.use(`/${APP_NAME}/api`, require('./src/indexRouter'))

app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'))
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', hbs)

const PORT = process.env.PORT
const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server work in port ${PORT}`))
