
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
// 引用 body-parser
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
// 引用路由器
const routes = require('./routes')

const app = express()
const port = 3000

//require express-handlebars here
const expHbs = require('express-handlebars')
//const restList = require('./restaurant.json')

// 將 request 導入路由器
require('./config/mongoose')

//setting template engine
app.engine('handlebars', expHbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected(db Open)!')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
