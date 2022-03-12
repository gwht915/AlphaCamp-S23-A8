const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/rest')

// router.get('/restaurants/new', (req, res) => {
//   return res.render('new')
// })

router.get('/', (req, res) => {
  Restaurants.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(rests => res.render('index', { restaurants: rests })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//顯示指定餐廳詳細資料
router.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log('id: ', id)
  return Restaurants.findById(id)
    .lean()
    .then((rests) => res.render('show', { restaurant: rests }))
    .catch(error => console.log(error))
})

//按餐廳名稱或類別搜尋餐廳
router.get('/search', (req, res) => {

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
router.get('/restaurants//new', (req, res) => {
  return res.render('new')
})

router.post('/restaurants', (req, res) => {
  return Restaurants.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//修改指定的餐廳資料
router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then((rests) => res.render('edit', { rests }))
    .catch(error => console.log(error))
})

router.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(rests => {
      return rests.update(req.body)
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪除指定的餐廳
router.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(rests => rests.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router