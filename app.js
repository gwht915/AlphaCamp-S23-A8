
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
// 引用 body-parser
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 

const app = express()
const port = 3000

//require express-handlebars here
const expHbs = require('express-handlebars')
const restList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', expHbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const Restaurants = require('./models/rest') // 載入 Todo model
// Restaurants 首頁
app.get('/', (req, res) => {
  Restaurants.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(rests => res.render('index', { restaurants: rests })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//顯示指定餐廳詳細資料
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log('id: ', id)
  return Restaurants.findById(id)
    .lean()
    .then((rests) => res.render('show', { restaurant: rests }))
    .catch(error => console.log(error))
})

//按餐廳名稱或類別搜尋餐廳
app.get('/search', (req, res) => {
  
  const keyword = req.query.keyword
  if (!keyword) {
    return res.redirect("/")
  }
  
  return Restaurants.find({})
    .lean()
    // .then(rests => res.render('index', {restaurants: rests.filter(restaurant => {
    //   return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
    //     restaurant.category.toLowerCase().includes(keyword.toLowerCase()) )
    // }), keyword: keyword }) )
    .then(rests => {
      const filterData = rests.filter(restaurant => {
        return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      })
      res.render('index', { restaurants: filterData, keyword: keyword })
    })
    .catch(error => console.log(error))
})

//增加新的餐廳
app.get('/restaurants//new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  return Restaurants.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//修改指定的餐廳資料
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then((rests) => res.render('edit', { rests }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(rests => {
      return rests.update(req.body)
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// app.post('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   Restaurants.findByIdAndUpdate(id, req.body)
//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch(error => console.log(error))
// })

//刪除指定的餐廳
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(rests => rests.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
