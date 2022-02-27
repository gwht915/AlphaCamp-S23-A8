
const express = require('express')
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

app.get('/', (req, res) => {
  res.render('index', { restaurants: restList.results })
})


app.get('/restaurants/:rest_id', (req, res) => {
  //console.log('rest_id :',req.params.rest_id)

  const restaurant = restList.results.find(restaurant => restaurant.id.toString() === req.params.rest_id)
  
  res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
  //console.log('req.query', req.query)
  const keyword = req.query.keyword
  //console.log(keyword)
  const restaurants = restList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())) 
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
