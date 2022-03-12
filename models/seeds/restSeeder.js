const mongoose = require('mongoose')
const rest = require('../rest') // 載入 restaurant model
const restaurantList = require("../../restaurant.json").results
const db = require("../../config/mongoose")

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

//const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error! please check')
})

db.once('open', () => {
  console.log('mongodb connected!')

  rest.create(restaurantList)
    .then(()=> {
      console.log('done')
      db.close
    })
    .catch(err => console.log(err))
  
})

